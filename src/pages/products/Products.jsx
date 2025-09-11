import ProductsList from "../../components/productsList/ProductsList";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductDetail from "../../components/productDetail/ProductDetail";

function Products() {
  const { id } = useParams();
  const {
    data: productsData,
    status: productsStatus,
    error: productsError,
  } = useSelector((state) => state.products);

  if (productsStatus === "loading") {
    return <p>Loading...</p>;
  }

  if (productsStatus === "failed") {
    return <p>Error: {productsError}</p>;
  }

  if (id) {
    const product = productsData.find((item) => item.id === Number(id));

    if (!product) {
      return <p>Продукт не знайдено</p>;
    }

    return <ProductDetail product={product} />;
  }

  return <ProductsList products={productsData} />;
}

export default Products;
