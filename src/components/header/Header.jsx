import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/icons/logo.svg";
import styles from "./Header.module.css";
import CartIcon from "../cartIcon/CartIcon";

function Header() {
  const getNavClass = ({ isActive }) =>
    isActive ? styles.activeLink : styles.link;
  return (
    <header className={styles.header}>
      <Link to="/" style={{ width: 70, height: 70, display: "inline-block" }}>
        <img src={logo} alt="Logo" width="70" height="70" />
      </Link>
      <nav className={styles.nav}>
        <NavLink to="/" end className={getNavClass}>
          Main Page
        </NavLink>
        <NavLink to="/categories" className={getNavClass}>
          Categories
        </NavLink>
        <NavLink to="/products" className={getNavClass}>
          All products
        </NavLink>
        <NavLink to="sales" className={getNavClass}>
          All sales
        </NavLink>
      </nav>
      <Link to="/basket">
       <CartIcon/>
      </Link>
    </header>
  );
}

export default Header;
