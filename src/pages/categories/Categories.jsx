
import {  useSelector } from "react-redux";

import CategoryList from "../../components/CategoryList/CategoryList";

function Categories() {
    
    const { data: categoriesData, status, error } = useSelector((state) => state.categories);

   

    if (status === "loading") return <p>Loading...</p>;
    if (status === "failed") return <p>Error: {error}</p>;

    return (
        <div>
            <h2 style={{marginBottom: "40px"}}>Categories</h2>
            <CategoryList categories={categoriesData} />
        </div>
    );
}

export default Categories;
