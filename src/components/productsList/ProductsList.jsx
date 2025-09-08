import styles from './ProductsList.module.css'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';




export default function ProductsList ({products, mode}){
 const { id } = useParams();
const { data: categoriesData } = useSelector((state) => state.categories);

const findetCategory = categoriesData.find((p) => p.id === Number(id));

let filtered = products;

// Фільтрація по режимам
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

// Заголовок
let title;
if (mode === "main") {
  title = null; // нічого не показуємо
} else if (mode === "sale") {
  title = "Discounted items";
} else if (mode === "category") {
  title = findetCategory ? findetCategory.title : "Категорія";
} else {
  title = "All Products";
}

return (
  <>
    {title && <h2 className={styles.sectionTitle}>{title}</h2>}
    <ul className={styles.product_list}>
      {filtered.map((product) => (
        <li key={product.id}>
          <Link to={`/product/${product.id}`} className={styles.productLink}>
            {product.discont_price && (
              <div className={styles.discontBadge}>
                -{Math.floor(((product.price - product.discont_price) / product.price) * 100)}%
              </div>
            )}
            <img
              src={`http://localhost:3333${product.image}`}
              alt={product.title}
              className={styles.productImg}
            />
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
      ))}
    </ul>
  </>
);
}