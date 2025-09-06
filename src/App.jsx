import './App.css'
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/main/Main";
import Products from "./pages/products/Products";

import Basket from './pages/basket/Basket';
import Sales from './pages/sales/Sales';
import NotFoundPage from './pages/notFoundPage/NotfoundPge';
import Categories from './pages/categories/Categories';

export default function App() {
  return (
    <Routes >
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="sales" element={<Sales />} />
        <Route path="categories" element={<Categories />} />
        <Route path="basket" element={<Basket />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
