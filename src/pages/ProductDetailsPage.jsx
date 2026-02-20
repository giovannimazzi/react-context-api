import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosArrowDropleft } from "react-icons/io";
import { IoIosArrowDropright } from "react-icons/io";

const productsApiUrl = "https://fakestoreapi.com/products";
const productApiUrl = "https://fakestoreapi.com/products/:id";

export default function ProductDetailsPage() {
  const { id } = useParams();

  const [product, setProduct] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  const [nearIds, setNearIds] = useState({ prevId: null, nextId: null });

  const navigate = useNavigate();

  useEffect(() => {
    getProductData();
  }, [id]);

  const getProductData = () => {
    setLoading(true);
    setError("");

    axios
      .get(productApiUrl.replace(":id", id))
      .then((res) => {
        setProduct(res.data);
        if (!res.data?.id) {
          navigate("/products");
        } else {
          getPrevNextId();
        }
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => setLoading(false));
  };

  const getPrevNextId = () => {
    axios
      .get(productsApiUrl)
      .then((res) => {
        const currentId = Number(id);
        const idsArray = res.data.map((p) => p.id);
        const idIndex = idsArray.indexOf(currentId);
        let prevId;
        let nextId;
        if (idIndex != -1) {
          prevId = idIndex === 0 ? null : idsArray[idIndex - 1];
          nextId =
            idIndex === idsArray.length - 1 ? null : idsArray[idIndex + 1];
        } else {
          prevId = null;
          nextId = null;
        }
        setNearIds({ prevId, nextId });
      })
      .catch(setNearIds({ prevId: null, nextId: null }));
  };

  const changeProduct = (newId) => {
    navigate("/products/" + newId);
  };

  if (loading) {
    return (
      <>
        <div className="spinner-border text-info" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <h2 className="h6">Loading...</h2>
      </>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger">{"ERROR: " + error.message}</div>
    );
  }

  return (
    <>
      <h2 className="h1 text-primary">DETTAGLI PRODOTTO</h2>
      <div className="d-flex justify-content-between align-items-baseline">
        <button
          className="btn border-0"
          disabled={!nearIds.prevId}
          onClick={() => changeProduct(nearIds.prevId)}
        >
          <IoIosArrowDropleft className="fs-1" />
        </button>
        <h3 className="mt-5">{product.title}</h3>
        <button
          className="btn border-0"
          disabled={!nearIds.nextId}
          onClick={() => changeProduct(nearIds.nextId)}
        >
          <IoIosArrowDropright className="fs-1 " />
        </button>
      </div>
      <div className="w-75 mx-auto ratio ratio-16x9">
        <img
          src={product.image}
          alt={product.title}
          className="object-fit-contain"
        />
      </div>
      <h4 className="text-muted">
        {product.category} - € {product.price?.toFixed(2)}
      </h4>
      <span>⭐{product.rating?.rate}</span>{" "}
      <span>👁️‍🗨️{product.rating?.count}</span>
      <p className="mt-4">{product.description}</p>
    </>
  );
}
