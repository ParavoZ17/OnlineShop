import ProductsList from "../../components/productsList/ProductsList"
import { useSelector } from "react-redux";



function Products (){
    const { data: productsData, status: productsStatus, error: productsError } = useSelector((state) => state.products);

    if (productsStatus === "loading") return <p>Loading...</p>;
    if (productsStatus === "failed") return <p>Error: {productsError}</p>;

    return (
        <ProductsList products={productsData} />
    )

}

export default Products
