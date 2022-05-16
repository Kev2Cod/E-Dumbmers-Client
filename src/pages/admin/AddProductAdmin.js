import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "react-query";

import NavbarAdmin from "../../components/NavbarAdmin";

import { API } from "../../config/api";
import CheckBox from "../../components/form/CheckBox";

const AddProductAdmin = () => {
  const navigate = useNavigate();

  const title = "Product Admin";
  document.title = "Dumbmers | " + title;

  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [categoryId, setCategoryId] = useState([]); //Save the selected category id
  const [preview, setPreview] = useState(null); // For image preview
  const [form, setForm] = useState({
    image: "",
    name: "",
    desc: "",
    price: "",
    qty: "",
  }); // store product data

  // Fetching category data
  const { data: categories } = useQuery("categoryCache", async () => {
    const config = {
      headers: {
        Authorization: "Basic " + localStorage.token,
      },
    };
    const response = await API.get("/categories", config);
    return response.data.categories;
  });

  // For handle if category selected
  const handleChangeCategoryId = (e) => {
    const id = e.target.value;
    const checked = e.target.checked;

    if (checked) {
      // Save category id if checked
      setCategoryId([...categoryId, parseInt(id)]);
    } else {
      // Delete category id from variable if unchecked
      let newCategoryId = categoryId.filter((categoryIdItem) => {
        return categoryIdItem !== id;
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
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };


  const handleSubmit = useMutation(async (e) => {
    setLoadingSubmit(true);
    try {
      e.preventDefault();
      console.log(form);

      // Configuration
      const config = {
        headers: {
          Authorization: "Basic " + localStorage.token,
          "Content-type": "multipart/form-data",
        },
      };

      console.log(form);

      // Store data with FormData as Object
      const formData = new FormData();
      formData.set("image", form.image[0], form.image[0].name);
      formData.set("name", form.name);
      formData.set("desc", form.desc);
      formData.set("price", form.price);
      formData.set("qty", form.qty);
      formData.set("categoryId", categoryId);

      console.log(formData.data);

      // Insert Product Data
      const response = await API.post("/product", formData, config);
      console.log(response);

      setLoadingSubmit(false);
      navigate("/products-admin");
    } catch (error) {
      console.log(error);
      setLoadingSubmit(false);
    }
  });

  return (
    <>
      <NavbarAdmin />
      <div className="container">
        <form onSubmit={(e) => handleSubmit.mutate(e)} className="mt-3">
          <h5 className="text-start mb-4">Add Product</h5>
          {preview && (
            <div>
              <img
                src={preview}
                style={{
                  maxWidth: "150px",
                  maxHeight: "150px",
                  objectFit: "cover",
                  marginBlock: "1rem",
                }}
                alt={preview}
              />
            </div>
          )}

          <div class="mb-3">
            <input id="upload" type="file" name="image" onChange={handleChange} hidden required />
            <label htmlFor="upload" className="btn bg-var-red text-white">
              Upload Image
            </label>
          </div>
          <div className="input-group mb-3">
            <input type="text" placeholder="Nama Product" name="name" onChange={handleChange} className="form-control bg-var-dark text-white border-form" required/>
          </div>
          <div className="input-group mb-3">
            <textarea className="form-control bg-var-dark text-white border-form" placeholder="Description" name="desc" onChange={handleChange} rows="5" required></textarea>
          </div>

          <div className="input-group mb-3">
            <input type="number" placeholder="Price" name="price" onChange={handleChange} className="form-control bg-var-dark text-white border-form" required/>
          </div>
          <div className="input-group mb-3">
            <input type="number" placeholder="Stock" name="qty" onChange={handleChange} className="form-control bg-var-dark text-white border-form" required/>
          </div>

          <div className="card-form-input mt-4 px-2 py-1 pb-2">
            <div className="text-secondary mb-1" style={{ fontSize: "15px" }}>
              Category
            </div>
            {categories?.map((item) => (
              <label key={item.id} className="checkbox-inline me-4">
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

export default AddProductAdmin;
