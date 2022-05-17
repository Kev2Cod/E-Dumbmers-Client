import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import Navbar from "../components/Navbar";

import { API } from "../config/api";

import imgBlank from "../assets/img/Blank-Person.png";

const UpdateProfile = () => {
  const title = "Profile";
  document.title = "Dumbmers | " + title;

  const { id } = useParams();
  const navigate = useNavigate();

  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [preview, setPreview] = useState(null); // For image preview
  const [form, setForm] = useState({
    name: "",
    phone: "",
    gender: "",
    address: "",
    image: "",
  });

    // Fetching detail product data by id from database
    useEffect(() => {
      const fetchProfile = async () => {
        const config = {
          headers: {
            Authorization: "Basic " + localStorage.token,
          },
        };

        const response = await API.get(`/user/${id}`);
        console.log(response);
        setForm({
          name: response.data.user.name,
          phone: response.data.user.profile.phone,
          gender: response.data.user.profile.gender,
          address: response.data.user.profile.address,
          image: response.data.user.profile.image,
        });
      };
      fetchProfile();
    }, []);

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

      console.log("ini form: ",form)

      // Configuration
      const config = {
        headers: {
          Authorization: "Basic " + localStorage.token,
          "Content-type": "multipart/form-data",
        },
      };

      // Store data with FormData as Object
      const formData = new FormData();
      if (form?.image) {
        formData.set("image", form.image[0], form.image[0]?.name);
      } 
      formData.set("name", form.name);
      formData.set("phone", form.phone);
      formData.set("gender", form.gender);
      formData.set("address", form.address);

      // Insert Profile data
      const response = await API.patch("/profile", formData, config);
      console.log(response)
      setLoadingSubmit(false);
      navigate("/profile");
    } catch (error) {
      setLoadingSubmit(false);
      console.log(error);
    }
  });

  return (
    <>
      <Navbar />
      <div className="container">
        <form onSubmit={(e) => handleSubmit.mutate(e)} className="mt-3">
          <h5 className="text-start mb-4">Edit Profile</h5>
          {!preview ? (
            <div>
              <img
                src={form.image ? form.image : imgBlank}
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
                src={preview}
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
          <div className="form mb-3">
            <input type="text" placeholder="Nama" name="name" value={form?.name} onChange={handleChange} className="form-control bg-var-dark text-white border-form" required/>
          </div>
          <div className="form mb-3">
            <input type="number" placeholder="Phone" name="phone" value={form?.phone} onChange={handleChange} className="form-control bg-var-dark text-white border-form" required/>
          </div>

          <div className="form mb-3">
            <select value={form?.gender} name="gender" onChange={handleChange} className="form-select bg-var-dark text-white border-form" required>
              <option value="" selected>Gender</option>
              <option value="Male">Male</option>
              <option value="Famale">Famale</option>
            </select>
          </div>
          <div className="form ">
            <textarea className="form-control bg-var-dark text-white border-form" placeholder="Address" name="address" value={form?.address} onChange={handleChange} rows="5" required></textarea>
          </div>

          {!loadingSubmit ? (
            <>
              <button type="submit" className="btn-green text-white fw-bold container my-4">
                Save
              </button>
            </>
          ) : (
            <>
              <button className="btn-green blink text-white fw-bold container my-4" disable>
                Process....
              </button>
            </>
          )}
        </form>
      </div>
    </>
  );
};

export default UpdateProfile;
