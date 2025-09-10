import styles from "./GetDiscount.module.css";
import pets from "../../assets/images/form.png";
import Form from "../form/Form";

export default function GetDiscount() {
  return (
    <div className={styles.container}>
      <h2>5% off on the first order</h2>
      <div className={styles.form}>
        <img src={pets} alt="pets" />
        <Form />
      </div>
    </div>
  );
}
