import { React, useState, useEffect } from "react";
import "../assets/static/css/loading.css"
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { useQuery, useMutation, isLoading } from "react-query";
import { convertRupiah } from "../utils/Utils";
import { useDebounce } from "use-debounce";

import Navbar from "../components/Navbar";

import imgEmpty from "../assets/static/media/empty.svg";

// import { useQuery } from "react-query";
import { API, setAuthToken } from "../config/api";

const Product = () => {
  const title = "Products";
  document.title = "Dumbmers | " + title;

  const [selectCategory, setSelectCategory] = useState("All");
  const [searchFilter, setSearchFilter] = useState("");
  // const [products, setProducts] = useState([]);
  // const [showProduct, setShowProducts] = useState();
  const [value] = useDebounce(searchFilter, 1000);

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
            <input type="text" name="search" onChange={handleChangeSearch} placeholder="Search" style={{ width: "40vw" }} />
          </div>

          <div className="form" style={{ width: "20vw" }}>
            <select onChange={changeCategory}>
              <option value="All">All</option>
              {categories?.map((item) => (
                <option value={item.name}>{item.name}</option>
              ))}
            </select>
          </div>
        </div>

        {!loadingProduct ? (
          <>
            {products?.length !== 0 ? (
              <div className=" products mt-5 d-flex flex-wrap gap-3 mt-4 justify-content-md-around justify-content-center">
                {filterByWord?.map((item, index) => (
                  <div key={index}>
                    <Card as={Link} to={`/detail-product/${item.id}`} className="card-product" style={{ textDecoration: "none", color: "white" }}>
                      <Card.Img  variant="top" src={item.image} className="image-product" style={{ minHeight: "50px" }} />
                      <Card.Body>
                        <Card.Title className="text-var-red text-decoration-none">{`${item.name.slice(0, 16)}`}</Card.Title>
                        <span>{`${convertRupiah.format(item.price)}`}</span>
                        <br />
                        <span>Stock : {item.qty}</span>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center">
                <img src={imgEmpty} style={{ width: "40%" }} alt="empty" />
                <div className="mt-4">No Data Product</div>
              </div>
            )}
          </>
        ) : (
          <>
            <div class="spinner mt-5">
              <div class="bounce1"></div>
              <div class="bounce2"></div>
              <div class="bounce3"></div>
            </div>
            <p className="text-center">Get Product...</p>
          </>
        )}
      </div>
    </>
  );
};

export default Product;
