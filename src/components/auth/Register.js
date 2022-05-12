import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";

// import useMutation from react-query
import { useMutation } from "react-query";

// Get API config
import { API } from "../../config/api";

const Register = () => {
  const navigate = useNavigate();

  const title = "Register";
  document.title = "Dumbmers | " + title;

  // Create variabel for store data with useState
  const [loadingSubmit, setLoadingSubmit] = useState(false); // for loading button
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  // dikeluarkan
  const { name, email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value, //? name
    });
  };

  const handleSubmit = useMutation(async (e) => {
    // Set loading true
    setLoadingSubmit(true);
    try {
      e.preventDefault();

      // Configuration Content-type
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // convert data menjadi string, untuk dikirim ke database
      const body = JSON.stringify(form);

      // Insert data user to database
      const response = await API.post("/register", body, config);

      // Set loading false
      setLoadingSubmit(false);

      setMessage("Register Success");

      if (response.data.status === "Success") {
        const alert = (
          <Alert variant="success" className="py-1">
            {response.data.message}
          </Alert>
        );

        setForm({
          name: "",
          email: "",
          password: "",
        });
        setMessage(alert);
      } else {
        // Set loading false
        setLoadingSubmit(false);
        const alert = (
          <Alert variant="danger" className="py-1">
            {response.data.message}
          </Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1 text-center">
          <span className="blink">Failed</span>
        </Alert>
      );
      setLoadingSubmit(false);
      setMessage(alert);
      console.log(error);
    }
  });

  return (
    <>
      <div className="card-auth p-4">
        <h3 className="mb-3 ">Register</h3>
        {message}
        <form onSubmit={(e) => handleSubmit.mutate(e)}>
          <div className="form mb-3">
            <input type="text" placeholder="Full Name" name="name" onChange={handleChange} value={name} required />
          </div>
          <div className="form mb-3">
            <input type="Email" placeholder="Email" name="email" onChange={handleChange} value={email} required />
          </div>
          <div className="form mb-3">
            <input type="password" placeholder="Password" name="password" onChange={handleChange} value={password} required />
          </div>
          <div className="d-grid">
            {!loadingSubmit ? (
              <>
                <button className="btn-red" type="submit">
                  Register
                </button>
              </>
            ) : (
              <>
                <button className="btn-red blink" disabled>Wait...</button>
              </>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
