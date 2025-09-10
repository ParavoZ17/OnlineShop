// import styles from './ProductsList.module.css'
// import { Link, useParams } from 'react-router-dom'
// import { useSelector, useDispatch } from 'react-redux';
// import { addToCart } from '../../redux/slice/bastetSlice';

// export default function ProductsList ({products, mode}){
// const { id } = useParams();
// const { data: categoriesData } = useSelector((state) => state.categories);

// const findetCategory = categoriesData.find((p) => p.id === Number(id));

// let filtered = products;

// if (mode === "main") {
//   filtered = products
//     .filter((product) => product.discont_price)
//     .sort(() => 0.5 - Math.random())
//     .slice(0, 4);
// }

// if (mode === "sale") {
//   filtered = products.filter((p) => p.discont_price);
// }

// if (mode === "category") {
//   filtered = products.filter((p) => p.categoryId === Number(id));
// }

// const dispatch = useDispatch();
//   const cartItems = useSelector((state) => state.cart.items);

//   const isInCart = (productId) => cartItems.some((item) => item.id === productId);

// let title;
// if (mode === "main") {
//   title = null;
// } else if (mode === "sale") {
//   title = "Discounted items";
// } else if (mode === "category") {
//   title = findetCategory ? findetCategory.title : "Категорія";
// } else {
//   title = "All Products";
// }

// return (
//   <>
//     {title && <h2 className={styles.sectionTitle}>{title}</h2>}
//     <ul className={styles.product_list}>
//       {filtered.map((product) => (
//         <li key={product.id}>
//           <Link to={`/product/${product.id}`} className={styles.productLink}>
//             {product.discont_price && (
//               <div className={styles.discontBadge}>
//                 -{Math.floor(((product.price - product.discont_price) / product.price) * 100)}%
//               </div>
//             )}
//             <img
//               src={`http://localhost:3333${product.image}`}
//               alt={product.title}
//               className={styles.productImg}
//             />
//             <button className={styles.addBtn}>Add to cart</button>
//             <div className={styles.productInfo}>
//               <p className={styles.productTitle}>{product.title}</p>
//               <div>
//                 <span className={styles.price}>${product.price}</span>
//                 {product.discont_price && (
//                   <span className={styles.discont_price}>
//                     ${product.discont_price}
//                   </span>
//                 )}
//               </div>
//             </div>
//           </Link>
//         </li>
//       ))}
//     </ul>
//   </>
// );
// }

import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/slice/bastetSlice";
import { Link, useParams } from "react-router-dom";
import styles from "./ProductsList.module.css";
import { useNavigate } from "react-router-dom";
import SectionHeader from "../SectionHeader/SectionHeader";

export default function ProductsList({ products, mode }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: categoriesData } = useSelector((state) => state.categories);
  const cartItems = useSelector((state) => state.basket.items);
  const dispatch = useDispatch();

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

  let title;
  if (mode === "main") {
    title = (<SectionHeader
          title="Sale"
          buttonText="All Sales"
          onClick={() => navigate("/sales")}
        />)
  } else if (mode === "sale") {
    title = "Discounted items";
  } else if (mode === "category") {
    title = findetCategory ? findetCategory.title : "Категорія";
  } else {
    title = "All Products";
  }

  const isInCart = (productId) =>
    cartItems.some((item) => item.id === productId);
  console.log(cartItems);
  return (
    <div
  style={
    mode !== "main"
      ? { padding: "40px 40px 80px 40px" }
      : {}
  }>
      {typeof title === "string" && (
      <h2 className={styles.sectionTitle}>{title}</h2>
    )}

    
    {typeof title !== "string" && title}
      <ul className={styles.product_list}>
        {filtered.map((product) => {
          const added = isInCart(product.id);

          return (
            <li key={product.id}>
              <Link
                to={`/product/${product.id}`}
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
                    <span className={styles.price}>${product.price}</span>
                    {product.discont_price && (
                      <span className={styles.discont_price}>
                        ${product.discont_price}
                      </span>
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
