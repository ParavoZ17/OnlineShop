import styles from './productPrice.module.css'


export default function ProductPrice({ price, discontPrice }) {
  if (discontPrice) {
    return (
      <>
        <span className={styles.price}>${discontPrice}</span>
        <span className={styles.discont_price}>${price}</span>
      </>
    );
  }
  return <span className={styles.price}>${price}</span>;
}