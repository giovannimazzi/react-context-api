import { BrowserRouter, Routes, Route } from "react-router-dom";

import DefaultLayout from "./layouts/DefaultLayout";
import HomePage from "./pages/HomePage";
import AboutUsPage from "./pages/AboutUsPage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import NotFoundPage from "./pages/NotFoundPage";
import { BudgetProvider } from "./contexts/BudgetContext";

export default function App() {
  return (
    <BudgetProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route index Component={HomePage} />
            <Route path="/about-us" Component={AboutUsPage} />
            <Route path="/products" Component={ProductsPage} />
            <Route path="/products/:id" Component={ProductDetailsPage} />
            <Route path="*" Component={NotFoundPage} />
          </Route>
        </Routes>
      </BrowserRouter>
    </BudgetProvider>
  );
}
