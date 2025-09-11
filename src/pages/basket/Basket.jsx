import { useNavigate } from "react-router-dom";
import styles from "./basket.module.css";
import { useSelector, useDispatch } from "react-redux";
import OrderForm from "../../components/orderForm/OrderForm";
import SectionHeader from "../../components/sectionHeader/SectionHeader";
import {BASE_URL} from '../../../constants'
import summary from "../../utils/summary";

import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../../redux/slice/bastetSlice";

function Basket() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.basket.items);
  const navigate = useNavigate();
const sum = summary(cartItems);
  return (
    <div className={styles.basketContainer}>
      <SectionHeader
        title="Shopping cart"
        buttonText="Back to the store"
        onClick={() => navigate("/products")}
      />
      {cartItems.length === 0 ? (
        <div className={styles.noProducts}>
          <p className={styles}>
            Looks like you have no items in your basket currently.
          </p>
          <button
            className={styles.homeBtn}
            onClick={() => {
              navigate("/");
            }}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className={styles.basketSection}>
          <ul className={styles.productsList}>
            {cartItems.map((item) => (
              <li key={item.id} className={styles.product}>
                <img
                  src={`${BASE_URL}${item.image}`}
                  alt={item.title}
                  className={styles.productImg}
                />
                <div className={styles.productInfo}>
                  <div className={styles.productTitle}>
                    <h3>{item.title}</h3>
                    <button
                      onClick={() => {
                        dispatch(removeFromCart(item.id));
                      }}
                      style={{
                        fontSize: "20px",
                        border: "none",
                        marginRight: "10px",
                      }}
                    >
                      X
                    </button>
                  </div>
                  <div className={styles.countProductSection}>
                    <div className={styles.countProduct}>
                      <button
                        onClick={() => {
                          dispatch(decrementQuantity(item.id));
                        }}
                        className={styles.left}
                      >
                        -
                      </button>
                      <span className={styles.quantity}>{item.quantity}</span>
                      <button
                        onClick={() => {
                          dispatch(incrementQuantity(item.id));
                        }}
                        className={styles.right}
                      >
                        +
                      </button>
                    </div>

                    <div className={styles.divPrice}>
                      {item.discont_price ? (
                        <>
                          <span className={styles.price}>
                            ${item.discont_price * item.quantity}
                          </span>
                          <span className={styles.discont_price}>
                            ${item.price}
                          </span>
                        </>
                      ) : (
                        <span className={styles.price}>${item.price}</span>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className={styles.orderSending}>
            <div className={styles.orderSendingTitle}>
              <h3>Order details</h3>
              <p className={styles.quantityItem}>
                {sum.totalQuantity > 1
                  ? `${sum.totalQuantity} items `
                  : `${sum.totalQuantity} item `}
              </p>
              <div className={styles.summary}>
                <p>Total</p>
                <span>${sum.totalPrice},00</span>
              </div>
            </div>
            <OrderForm />
          </div>
        </div>
      )}
    </div>
  );
}

export default Basket;
