import Hero from "../../components/hero/Hero";
import CategoryList from "../../components/categoryList/CategoryList.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import styles from "./Main.module.css";

import ProductsList from "../../components/productsList/ProductsList.jsx";

import GetDiscount from "../../components/getDiscount/GetDiscount.jsx";

function Main() {
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
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default Main;
