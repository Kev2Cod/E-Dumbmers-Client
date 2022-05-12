import axios from "axios";

// buat base URL
export const API = axios.create({
  baseURL: process.env.SERVER_URL || "https://e-dumbmerch.herokuapp.com/api/v1" ||  "http://localhost:5000/api/v1/",
});
// process.env.SERVER_URL || "https://e-dumbmerch.herokuapp.com/api/v1" ||

// Set Authorization Token Header
export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};
