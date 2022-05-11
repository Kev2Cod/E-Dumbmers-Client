import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import NavbarAdmin from "../../components/NavbarAdmin";
import { API } from "../../config/api";

const AddCategoryAdmin = () => {
  // console.clear()
  const navigate = useNavigate();
  const [category, setCategory] = useState("");

  const title = "Category Admin";
  document.title = "Dumbmers | " + title;

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
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
      const body = JSON.stringify({name: category})
      console.log(body)

      // Kirim data categry ke database
      const response = await API.post("/category", body, config)
      navigate('/category-admin')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <NavbarAdmin />
      <div className="container">
        <h3 className="text-start mb-3 mt-5">Add Category</h3>
        <form onSubmit={handleSubmit} style={{ marginTop: "3rem" }}>
          <div className="input-group mb-3">
            <input type="text" className="form-control bg-var-dark text-white border-form" onChange={handleChange} value={category} name="category" placeholder="Category" required/>
          </div>
          <button className="btn bg-var-green text-white fw-bold container mt-5">Save</button>
        </form>
      </div>
      
    </>
  );
};

export default AddCategoryAdmin;
