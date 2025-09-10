import Hero from "../../components/hero/Hero";
import CategoryList from "../../components/CategoryList/CategoryList.jsx";

import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import styles from "./Main.module.css";

import ProductsList from "../../components/productsList/ProductsList.jsx";
import SectionHeader from "../../components/SectionHeader/SectionHeader.jsx";
import GetDiscount from "../../components/getDiscount/GetDiscount.jsx";

function Main() {
  const navigate = useNavigate();

  const {
    data: categoriesData,
    status: categoriesStatus,
    error: categoriesError,
  } = useSelector((state) => state.categories);

  const {
    data: productsData,
    status: productsStatus,
    error: productsError,
  } = useSelector((state) => state.products);

  return (
    <>
      <Hero />
      <div className={styles.container}>
        
        {categoriesStatus === "loading" && <p>Loading...</p>}
        {categoriesStatus === "failed" && <p>Error: {categoriesError}</p>}
        {categoriesStatus === "succeeded" && (
          <CategoryList categories={categoriesData} limit={4} />
        )}
      </div>
      <GetDiscount />
      <div className={styles.container}>
        {productsStatus === "loading" && <p>Loading...</p>}
        {productsStatus === "failed" && <p>Error: {productsError}</p>}
        {productsStatus === "succeeded" && (
          <ProductsList products={productsData} mode="main" />
        )}
      </div>
    </>
  );
}

export default Main;
