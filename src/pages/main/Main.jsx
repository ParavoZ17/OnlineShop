  import Hero from "../../components/hero/Hero";
  import CategoryList from "../../components/CategoryList/CategoryList.jsx";
  
  import { useSelector } from "react-redux";

  import { useNavigate } from "react-router-dom";
  import styles from './Main.module.css'

 
import ProductsList from "../../components/productsList/ProductsList.jsx";
import SectionHeader from "../../components/SectionHeader/SectionHeader.jsx";
import Form from "../../components/form/Form.jsx";

  function Main() {
    //   const navigate = useNavigate();
    

      
    //   const { data: categoriesData, status: categoriesStatus, error: categoriesError } = useSelector((state) => state.categories);


    
    //   const { data: productsData, status: productsStatus, error: productsError } = useSelector((state) => state.products);
      


      return (
          <>
              {/* <Hero />
              <div className={styles.container}>
                  <SectionHeader
        title="Categories"
        buttonText="All Categories"
        onClick={() => navigate('/categories')}
      />

                  {categoriesStatus === "loading" && <p>Loading...</p>}
                  {categoriesStatus === "failed" && <p>Error: {categoriesError}</p>}
                  {categoriesStatus === "succeeded" && (
                      <CategoryList categories={categoriesData} limit={4} />
                  )}
              </div>
              <div className={styles.container}>
                   <SectionHeader
        title="Sale"
        buttonText="All Sales"
        onClick={() => navigate('/sales')}
      />

                  {productsStatus === "loading" && <p>Loading...</p>}
                  {productsStatus === "failed" && <p>Error: {productsError}</p>}
                  {productsStatus === "succeeded" && (
                      <ProductsList products={productsData} mode='main'/>
                  )}
              </div> */}
              <Form/>
          </>
      );
  }

  export default Main;
