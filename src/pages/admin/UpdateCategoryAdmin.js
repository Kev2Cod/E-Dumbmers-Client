import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";

import { API } from "../../config/api";

const UpdateCategoryAdmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState({ name: "" });

  const title = "Category admin";
  document.title = "DumbMerch | " + title;

  // useEffect(() => {
  //   const fecthData = async () => {
  //     const response = await API.get(`/category/${id}`);
  //     console.log(response.data.data.category.name);
  //     setCategory({ name: response.data.data.category.name });
  //   };
  //   fecthData();
  // }, [category]);

  let { refecth } = useQuery("categoryCache", async () => {
    const response = await API.get(`/category/${id}`);
    setCategory({ name: response.data.data.category.name });
  });

  const handleChange = (e) => {
    setCategory({
      ...category,
      name: e.target.value,
    });
  };
  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          Authorization: "Basic " + localStorage.token,
          "Content-type": "application/json",
        },
      };

      // Data Body
      const body = JSON.stringify(category);

      // Kirim data categry ke database
      await API.patch('/category/' + id, body, config);
      navigate("/category-admin");

    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div className="container">
      <h3 className="text-start mb-3 mt-5">Edit Category</h3>
      <form onSubmit={(e) => handleSubmit.mutate(e)} style={{ marginTop: "3rem" }}>
        <div className="input-group mb-3">
          <input type="text" value={category.name} onChange={handleChange} className="form-control bg-var-dark text-white border-form" />
        </div>
        <button type="submit" className="btn bg-var-green text-white fw-bold container mt-5">
          Save
        </button>
      </form>
    </div>
  );
};

export default UpdateCategoryAdmin;
