import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";

import { API } from "../../config/api";

const UpdateCategoryAdmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loadingSubmit, setLoadingSubmit] = useState(false);
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
    setLoadingSubmit(true);
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
      await API.patch("/category/" + id, body, config);
      setLoadingSubmit(false);
      navigate("/category-admin");
    } catch (error) {
      setLoadingSubmit(false);
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
  );
};

export default UpdateCategoryAdmin;
