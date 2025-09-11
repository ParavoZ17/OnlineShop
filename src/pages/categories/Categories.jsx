import { useSelector } from "react-redux";
import styles from "./Categories.module.css";
import CategoryList from "../../components/categoryList/CategoryList";

function Categories() {
  const {
    data: categoriesData,
    status,
    error,
  } = useSelector((state) => state.categories);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div className={styles.container}>
      <h2 style={{ marginBottom: "40px" }}>Categories</h2>
      <CategoryList categories={categoriesData} />
    </div>
  );
}

export default Categories;
