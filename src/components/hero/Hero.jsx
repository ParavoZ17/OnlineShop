import styles from "./Hero.module.css";
import { useNavigate } from "react-router-dom";
function Hero() {
  const navigate = useNavigate();
  return (
    <div className={styles.hero}>
      <h1>Amazing Discounts on Pets Products!</h1>
      <button onClick={() => navigate("/sales")}>Check out</button>
    </div>
  );
}

export default Hero;
