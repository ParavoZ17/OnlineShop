import whatsapp from "../../assets/icons/WhatsApp.svg";
import instagram from "../../assets/icons/instagram.svg";
import map from "../../assets/images/map.jpg";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer>
      <h2 className={styles.footer_title}>Contact</h2>
      <div className={styles.container}>
        <div className={styles.contactContainer}>
          <p className={styles.title}>Phone</p>
          <p className={styles.info}>+49 30 915-88492</p>
        </div>
        <div className={styles.contactContainer}>
          <p className={styles.title}>Socials</p>
          <div className={styles.socialIcons}>
            <a href="https://web.whatsapp.com/"><img src={whatsapp} alt="whatsapp" /></a>
            <a href="https://www.instagram.com/"><img src={instagram} alt="instagram" /></a>
          </div>
        </div>
        <div className={styles.contactContainer}>
          <p className={styles.title}>Address</p>
          <p className={styles.info}>
            Wallstraẞe 9-13, 10179 Berlin, Deutschland
          </p>
        </div>

        <div className={styles.contactContainer}>
          <p className={styles.title}>Working Hours</p>
          <p className={styles.info}>24 hours a day</p>
        </div>
      </div>
      <img src={map} alt="map" />
    </footer>
  );
}

export default Footer;
