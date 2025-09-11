import { Link } from "react-router-dom";
import styles from "./CategoryList.module.css";
import SectionHeader from "../sectionHeader/SectionHeader";
import { useNavigate } from "react-router-dom";

export default function CategoryList({ categories, limit }) {
  const navigate = useNavigate();
  const displayedCategories = limit
    ? [...categories].sort(() => Math.random() - 0.5).slice(0, limit)
    : categories;

  return (
    <>
      {limit ? (
        <SectionHeader
          title="Categories"
          buttonText="All Categories"
          onClick={() => navigate("/categories")}
        />
      ) : (
        ""
      )}
      <ul className={styles.list}>
        {displayedCategories.map((category) => (
          <li key={category.id}>
            <Link to={`/categories/${category.id}`}>
              <img
                src={`http://localhost:3333${category.image}`}
                alt={category.title}
                className={styles.categoryImg}
              />
              <p>{category.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
