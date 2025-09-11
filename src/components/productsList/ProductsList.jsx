import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/slice/bastetSlice";
import { Link, useParams } from "react-router-dom";
import styles from "./ProductsList.module.css";
import { useNavigate } from "react-router-dom";
import SectionHeader from "../SectionHeader/SectionHeader";
import { useState } from "react";

export default function ProductsList({ products, mode }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: categoriesData } = useSelector((state) => state.categories);
  const cartItems = useSelector((state) => state.basket.items);
  const dispatch = useDispatch();

  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [discounted, setDiscounted] = useState(false);
  const [sortBy, setSortBy] = useState("default");

  const findetCategory = categoriesData.find((p) => p.id === Number(id));
  let filtered = products;

  if (mode === "main") {
    filtered = products
      .filter((product) => product.discont_price)
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
  }

  if (mode === "sale") {
    filtered = products.filter((p) => p.discont_price);
  }

  if (mode === "category") {
    filtered = products.filter((p) => p.categoryId === Number(id));
  }

  filtered = filtered.filter((p) => {
    if (priceFrom && p.price < +priceFrom) return false;
    if (priceTo && p.price > +priceTo) return false;
    if (discounted && !p.discont_price) return false;
    return true;
  });

  filtered = [...filtered].sort((a, b) => {
    const priceA = a.discont_price ?? a.price;
    const priceB = b.discont_price ?? b.price;

    if (sortBy === "priceAsc") return priceA - priceB;
    if (sortBy === "priceDesc") return priceB - priceA;
    if (sortBy === "newest")
      return new Date(b.createdAt) - new Date(a.createdAt);
    return 0;
  });

  let title;
  if (mode === "main") {
    title = (
      <SectionHeader
        title="Sale"
        buttonText="All Sales"
        onClick={() => navigate("/sales")}
      />
    );
  } else if (mode === "sale") {
    title = "Discounted items";
  } else if (mode === "category") {
    title = findetCategory ? findetCategory.title : "Категорія";
  } else {
    title = "All Products";
  }

  const isInCart = (productId) =>
    cartItems.some((item) => item.id === productId);

  return (
    <div style={mode !== "main" ? { padding: "40px 40px 80px 40px" } : {}}>
      {typeof title === "string" && (
        <h2 className={styles.sectionTitle}>{title}</h2>
      )}
      {typeof title !== "string" && title}

      {mode !== "main" && (
        <div className={styles.filters}>
          <label>
            Price
            <input
              type="number"
              placeholder="from"
              value={priceFrom}
              onChange={(e) => setPriceFrom(e.target.value)}
            />
            <input
              type="number"
              placeholder="to"
              value={priceTo}
              onChange={(e) => setPriceTo(e.target.value)}
            />
          </label>

          {mode !== "sale" && (
            <label>
              Discounted items
              <input
                type="checkbox"
                checked={discounted}
                onChange={(e) => setDiscounted(e.target.checked)}
              />
            </label>
          )}

          <label>
            Sorted
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="default">by default</option>
              <option value="priceAsc">Price ↑</option>
              <option value="priceDesc">Price ↓</option>
              <option value="newest">Newest</option>
            </select>
          </label>
        </div>
      )}

      <ul className={styles.product_list}>
        {filtered.map((product) => {
          const added = isInCart(product.id);

          return (
            <li key={product.id}>
              <Link
                to={`/products/${product.id}`}
                className={styles.productLink}
              >
                {product.discont_price && (
                  <div className={styles.discontBadge}>
                    -
                    {Math.floor(
                      ((product.price - product.discont_price) /
                        product.price) *
                        100,
                    )}
                    %
                  </div>
                )}
                <img
                  src={`http://localhost:3333${product.image}`}
                  alt={product.title}
                  className={styles.productImg}
                />
                <button
                  className={`${styles.addBtn} ${added ? styles.added : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    if (!added) dispatch(addToCart(product));
                  }}
                >
                  {added ? "Added" : "Add to cart"}
                </button>
                <div className={styles.productInfo}>
                  <p className={styles.productTitle}>{product.title}</p>
                  <div>
                    {product.discont_price ? (
                      <>
                        <span className={styles.price}>
                          ${product.discont_price}
                        </span>
                        <span className={styles.discont_price}>
                          ${product.price}
                        </span>
                      </>
                    ) : (
                      <span className={styles.price}>${product.price}</span>
                    )}
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
