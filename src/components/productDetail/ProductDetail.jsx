import styles from "./ProductDetail.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slice/bastetSlice";
import DescriptionModal from "../descriptionModal/DescriptionModal";
import {BASE_URL} from '../../../constants'
import { toast } from "react-toastify";

export default function ProductDetail({ product }) {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(product.quantity || 1);
  const [openModal, setOpenModal] = useState(false);

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
     toast.success(`${product.title} add in basket!`);
  };

  return (
    <div className={styles.product_container}>
      <img src={`${BASE_URL}${product.image}`} alt={product.title} />
      <div className={styles.details}>
        <h3 className={styles.title}>{product.title}</h3>
        <div>
          {product.discont_price ? (
            <div className={styles.prices}>
              <span className={styles.main_price}>
                ${product.discont_price}
              </span>
              <span className={styles.second_price}>${product.price}</span>
              {product.discont_price && (
                <div className={styles.discontBadge}>
                  -
                  {Math.floor(
                    ((product.price - product.discont_price) / product.price) *
                      100,
                  )}
                  %
                </div>
              )}
            </div>
          ) : (
            <span className={styles.main_price}>${product.price}</span>
          )}
        </div>

        <div className={styles.add_product_container}>
          <div className={styles.countProduct}>
            <button onClick={decrement} className={styles.left}>
              -
            </button>
            <span className={styles.quantity}>{quantity}</span>
            <button onClick={increment} className={styles.right}>
              +
            </button>
          </div>
          <button
            type="button"
            className={styles.submitBtn}
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
        </div>

        <h4>Description</h4>
        <p className={styles.productDescrition}>{product.description}</p>
        <div className={styles.readme}>
          <button onClick={() => setOpenModal(true)}>Read more</button>
        </div>
      </div>
      <DescriptionModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        description={product.description}
      />
    </div>
  );
}
