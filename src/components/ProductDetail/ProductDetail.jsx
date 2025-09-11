import styles from "./ProductDetail.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { incrementQuantity} from "../../redux/slice/bastetSlice";

export default function ProductDetail({ product }) {
const dispatch = useDispatch();

const [quantity, setQuantity] = useState(product.quantity || 1);
 const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className={styles.product_container}>
      <img src={`http://localhost:3333${product.image}`} alt={product.title} />
      <div className={styles.details}>
        <h3>{product.title}</h3>
        <div className={styles.prices}>
          {product.discont_price ? (
            <div>
              <span className={styles.main_price}>${product.discont_price}</span>
              <span className={styles.second_price}>${product.price}</span>
            </div>
          ) : (
            <span className={styles.main_price}>${product.price}</span>
          )}
        </div>
        {product.discont_price && (
          <div className={styles.discontBadge}>
            -
            {Math.floor(
              ((product.price - product.discont_price) / product.price) * 100,
            )}
            %
          </div>
        )}
        <div className={styles.countProduct}>
          <button onClick={decrement} className={styles.left}>
            -
          </button>
          <span className={styles.quantity}>{quantity}</span>
          <button onClick={increment} className={styles.right}>
            +
          </button>
        </div>
        <button type='submit' className={styles.btn_submit}>Add to cart</button>
        <h4>Description</h4>
        <p>{product.description}</p>
      </div>
    </div>
  );
}
