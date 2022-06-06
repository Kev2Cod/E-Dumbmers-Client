import { React, useState, useEffect } from "react";
import "../assets/static/css/loading.css";
import { Card } from "react-bootstrap";
import { useQuery, useMutation, isLoading } from "react-query";
import { useDebounce } from "use-debounce";

// Skeleton
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import Navbar from "../components/Navbar";

import imgEmpty from "../assets/static/media/empty.svg";

// import { useQuery } from "react-query";
import { API, setAuthToken } from "../config/api";
import CardProduct from "../components/card/CardProduct";

const Product = () => {
  const title = "Products";
  document.title = "Dumbmers | " + title;

  const [selectCategory, setSelectCategory] = useState("All");
  const [searchFilter, setSearchFilter] = useState("");
  // const [products, setProducts] = useState([]);
  // const [showProduct, setShowProducts] = useState();
  const [value] = useDebounce(searchFilter, 500);

  // fetching products
  let {
    data: products,
    isLoading: loadingProduct,
    isError,
    error,
  } = useQuery("productCahce", async () => {
    const response = await API.get("/products");
    return response.data.data;
  });

  // fetching categories
  let { data: categories, isLoading: loadingCategories } = useQuery("categoriesCache", async () => {
    const response = await API.get("/categories");
    return response.data.categories;
  });

  const filterByWord = products?.filter((item) => {
    //if no input the return the original
    if (value === "") {
      return item;
    }
    //return the item which contains the user input
    else {
      return item.name?.toLowerCase().includes(value);
    }
  });

  console.log("filter Products: ", filterByWord);

  const changeCategory = (e) => {
    const lowerCase = e.target?.value.toLowerCase();
    setSelectCategory(lowerCase);
  };

  const handleChangeSearch = (e) => {
    let lowerCase = e.target?.value.toLowerCase();
    setSearchFilter(lowerCase);
  };

  return (
    <>
      <Navbar title={title} />
      <div className="container mt-4 mb-lg-0 mb-5">
        <div className="d-flex align-items-center">
          <span className="text-var-red fw-bold fs-4 me-3">Products</span>

          <div className="form ms-auto me-3">
            <input type="text" name="search" onChange={handleChangeSearch} placeholder="Search Product" style={{ width: "50vw" }} />
          </div>
        </div>

        {/* Card */}
        <div className="products mt-5 d-flex flex-wrap gap-3 mt-4 justify-content-md-start justify-content-center ">
          {!loadingProduct ? (
            <>
              {products?.length !== 0 ? (
                <>
                  {filterByWord?.map((item) => (
                    <CardProduct id={item.id} image={item.image} nameProduct={item.name} price={item.price} qty={item.qty} />
                  ))}
                </>
              ) : (
                <div className="text-center">
                  <img src={imgEmpty} style={{ width: "40%" }} alt="empty" />
                  <div className="mt-4">No Data Product</div>
                </div>
              )}
            </>
          ) : (
            <>
              <SkeletonTheme baseColor="#202020" highlightColor="#444">
                <Card className="card-product" style={{ textDecoration: "none", color: "white" }}>
                  <div style={{ minHeight: "120px" }}>
                    <Skeleton height={`100%`} />
                  </div>
                  <Card.Body>
                    <Card.Title className="text-var-red text-decoration-none">
                      <Skeleton width={`100%`} />
                    </Card.Title>
                    <span>
                      <Skeleton width={`90%`} />
                    </span>
                    <p style={{ marginTop: "5px" }}>
                      <Skeleton width={`30%`} />
                    </p>
                  </Card.Body>
                </Card>
                <Card className="card-product" style={{ textDecoration: "none", color: "white" }}>
                  <div style={{ minHeight: "120px" }}>
                    <Skeleton height={`100%`} />
                  </div>
                  <Card.Body>
                    <Card.Title className="text-var-red text-decoration-none">
                      <Skeleton width={`100%`} />
                    </Card.Title>
                    <span>
                      <Skeleton width={`90%`} />
                    </span>
                    <p style={{ marginTop: "5px" }}>
                      <Skeleton width={`30%`} />
                    </p>
                  </Card.Body>
                </Card>
                <Card className="card-product" style={{ textDecoration: "none", color: "white" }}>
                  <div style={{ minHeight: "120px" }}>
                    <Skeleton height={`100%`} />
                  </div>
                  <Card.Body>
                    <Card.Title className="text-var-red text-decoration-none">
                      <Skeleton width={`100%`} />
                    </Card.Title>
                    <span>
                      <Skeleton width={`90%`} />
                    </span>
                    <p style={{ marginTop: "5px" }}>
                      <Skeleton width={`30%`} />
                    </p>
                  </Card.Body>
                </Card>
              </SkeletonTheme>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Product;
