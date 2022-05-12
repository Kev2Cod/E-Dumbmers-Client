import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import NavbarAdmin from "../../components/NavbarAdmin";
import { API } from "../../config/api";

const AddCategoryAdmin = () => {
  // console.clear()
  const navigate = useNavigate();
  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const [category, setCategory] = useState("");

  const title = "Category Admin";
  document.title = "Dumbmers | " + title;

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    setLoadingSubmit(true)
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
      setLoadingSubmit(false)
      navigate('/category-admin')
    } catch (error) {
      setLoadingSubmit(false)
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

export default AddCategoryAdmin;
