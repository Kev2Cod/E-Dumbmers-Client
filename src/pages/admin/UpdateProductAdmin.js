import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import NavbarAdmin from "../../components/NavbarAdmin";

import { API } from "../../config/api";
import CheckBox from "../../components/form/CheckBox";

const UpdateProductAdmin = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const title = "Product Admin";
  document.title = "Dumbmers | " + title;

  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [categories, setCategories] = useState([]); //Store all category data
  const [categoryId, setCategoryId] = useState([]); //Save the selected category id
  const [preview, setPreview] = useState(null); //For image preview
  const [product, setProduct] = useState({}); //Store product data
  const [form, setForm] = useState({
    image: "",
    name: "",
    desc: "",
    price: "",
    qty: "",
  }); //Store product data

  // Fetching detail product data by id from database
  let { refetchProduct } = useQuery("productCache", async () => {
    const config = {
      headers: {
        Authorization: "Basic " + localStorage.token,
      },
    };
    const response = await API.get("/product/" + id, config);
    setForm({
      image: response.data.data.image,
      name: response.data.data.name,
      desc: response.data.data.desc,
      price: response.data.data.price,
      qty: response.data.data.qty,
    });
    setProduct(response.data.data);
  });

  // Fetching category data
  let { refetchCategories } = useQuery("categoriesCache", async () => {
    const config = {
      headers: {
        Authorization: "Basic " + localStorage.token,
      },
    };

    const response = await API.get("/categories", config);
    console.log(response);
    setCategories(response.data.categories);
  });

  // For handle if category selected
  const handleChangeCategoryId = (e) => {
    const id = e.target.value;
    const checked = e.target.checked;

    if (checked == true) {
      // Save category id if checked
      setCategoryId([...categoryId, parseInt(id)]);
    } else {
      // Delete category id from variable if unchecked
      let newCategoryId = categoryId.filter((categoryIdItem) => {
        return categoryIdItem != id;
      });
      setCategoryId(newCategoryId);
    }
  };

  // Handle change data on form
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === "file") {
      setPreview(e.target.files);
    }
  };

  const handleSubmit = useMutation(async (e) => {
    setLoadingSubmit(true);
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          Authorization: "Basic " + localStorage.token,
          "Content-type": "multipart/form-data",
        },
      };

      // Store data with FormData as object
      const formData = new FormData();
      if (preview) {
        formData.set("image", preview[0], preview[0]?.name);
      }
      formData.set("name", form.name);
      formData.set("desc", form.desc);
      formData.set("price", form.price);
      formData.set("qty", form.qty);
      formData.set("categoryId", categoryId);

      // Insert product data

      const response = await API.patch(`/product/${product.id}`, formData, config);
      console.log(response.data);
      setLoadingSubmit(false);

      navigate("/product-admin");
    } catch (error) {
      setLoadingSubmit(false);
      console.log(error);
    }
  });

  useEffect(() => {
    const newCategoryId = product?.categories?.map((item) => {
      return item.id;
    });

    setCategoryId(newCategoryId);
  }, [product]);

  return (
    <>
      <NavbarAdmin />
      <div className="container">
        <form onSubmit={(e) => handleSubmit.mutate(e)} className="mt-3">
          <h5 className="text-start mb-4">Add Product</h5>
          {!preview ? (
            <div>
              <img
                src={form.image}
                style={{
                  maxWidth: "150px",
                  maxHeight: "150px",
                  objectFit: "cover",
                  marginBlock: "1rem",
                }}
                alt=""
              />
            </div>
          ) : (
            <div>
              <img
                src={URL.createObjectURL(preview[0])}
                style={{
                  maxWidth: "150px",
                  maxHeight: "150px",
                  objectFit: "cover",
                  marginBlock: "1rem",
                }}
                alt=""
              />
            </div>
          )}

          <div class="mb-3">
            <input id="upload" type="file" name="image" onChange={handleChange} hidden />
            <label htmlFor="upload" className="btn bg-var-red text-white">
              Upload Image
            </label>
          </div>
          <div className="input-group mb-3">
            <input type="text" placeholder="Nama Product" name="name" value={form?.name} onChange={handleChange} className="form-control bg-var-dark text-white border-form" />
          </div>
          <div className="input-group mb-3">
            <textarea className="form-control bg-var-dark text-white border-form" placeholder="Description" name="desc" value={form?.desc} onChange={handleChange} rows="5"></textarea>
          </div>

          <div className="input-group mb-3">
            <input type="number" placeholder="Price" name="price" value={form?.price} onChange={handleChange} className="form-control bg-var-dark text-white border-form" />
          </div>
          <div className="input-group mb-3">
            <input type="number" placeholder="Stock" name="qty" value={form?.qty} onChange={handleChange} className="form-control bg-var-dark text-white border-form" />
          </div>

          <div className="card-form-input mt-4 px-2 py-1 pb-2">
            <div className="text-secondary mb-1" style={{ fontSize: "15px" }}>
              Category
            </div>
            {categories?.map((item) => (
              <label className="checkbox-inline me-4" key={item.id}>
                <CheckBox categoryId={categoryId} value={item.id} handleChangeCategoryId={handleChangeCategoryId} />
                <span className="ms-2">{item.name}</span>
              </label>
            ))}
          </div>

          {!loadingSubmit ? (
            <>
              <button type="submit" className="btn-green text-white fw-bold container my-3">
                Save
              </button>
            </>
          ) : (
            <>
              <button type="submit" className="btn-green blink text-white fw-bold container my-3" disable>
                Process....
              </button>
            </>
          )}
        </form>
      </div>
    </>
  );
};

export default UpdateProductAdmin;
