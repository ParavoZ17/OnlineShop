import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./components/layout/Layout";
import { useDispatch } from "react-redux";

import Home from "./pages/main/Main";
import Products from "./pages/products/Products";
import Basket from "./pages/basket/Basket";
import Sales from "./pages/sales/Sales";
import NotFoundPage from "./pages/notFoundPage/NotfoundPge";
import Categories from "./pages/categories/Categories";

import { fetchCategories } from "./redux/slice/categoriesSlice";
import { fetchProducts } from "./redux/slice/productSlice";
import ProductsList from "./components/productsList/ProductsList";
import { useSelector } from "react-redux";

export default function App() {
  const { data: productsData } = useSelector((state) => state.products);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products">
          <Route index element={<Products />} />
          <Route path=":id" element={<Products />} />
        </Route>
        <Route path="sales" element={<Sales />} />
        <Route path="categories">
          <Route index element={<Categories />} />
          <Route
            path=":id"
            element={<ProductsList mode="category" products={productsData} />}
          />
        </Route>
        <Route path="basket" element={<Basket />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
