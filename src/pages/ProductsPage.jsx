import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useBudget } from "../contexts/BudgetContext";

const productsApiUrl = "https://fakestoreapi.com/products";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  const { budgetMode } = useBudget();

  useEffect(() => {
    axios
      .get(productsApiUrl)
      .then((res) => {
        budgetMode
          ? setProducts(res.data.filter((p) => Number(p.price) <= 30))
          : setProducts(res.data);
      })
      .catch((e) => alert("ERRORE richiesta API: \n\n" + e.message));
  }, [budgetMode]);

  return (
    <>
      <h2 className="h1 text-primary">PRODOTTI</h2>
      <div className="row row-cols-1 row-cols-lg-2 g-5 mt-5">
        {products.map((prod) => (
          <ProductCard key={prod.id} item={prod} />
        ))}
      </div>
    </>
  );
}
