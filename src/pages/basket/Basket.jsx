import { useNavigate } from "react-router-dom";
import styles from "./basket.module.css";
import { useSelector, useDispatch } from "react-redux";
import  Form  from "../../components/form/Form";

import { decrementQuantity, incrementQuantity, removeFromCart } from "../../redux/slice/bastetSlice";

function Basket() {
    const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.basket.items);
  const navigate = useNavigate();
  console.log(cartItems);
  return (
    <div className={styles.basketContainer}>
      <h2 className={styles.titleBasket}>Shopping cart</h2>
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
                  src={`http://localhost:3333${item.image}`}
                  alt={item.title}
                  className={styles.productImg}
                />
        <div className={styles.productInfo}>
      <div className={styles.productTitle}>
      <h3>{item.title}</h3>
      <button onClick={()=>{dispatch(removeFromCart(item.id))}} style={{fontSize:"20px", border:'none'}}>X</button>
      </div> 
      <div className={styles.countProductSection} >
      <div className={styles.countProduct}>
        <button onClick={()=>{dispatch(decrementQuantity(item.id))}} className={styles.left}>-</button>
        <span className={styles.quantity}>{item.quantity}</span>
        <button onClick={()=>{dispatch(incrementQuantity(item.id))}} className={styles.right}>+</button>
      </div>
      <div className={styles.divPrice}>
      <span className={styles.price}>${item.price}</span><span className={styles.discont_price}>${item.discont_price}</span>
      </div>
      </div>
    </div>
              </li>
            ))}
          </ul>
          <div className={styles.orderSending}>
            <p></p>
            <Form/>
          </div>
        </div>
      )}
      
    </div>
  );
}

export default Basket;
