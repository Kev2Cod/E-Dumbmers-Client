import { useContext, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./assets/static/css/style.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { UserContext } from "./context/userContext";

import { Auth, Product, ProfilePage, UpdateProfile, DetailProduct, CategoryAdmin, ProductAdmin, Complain, ComplainAdmin, AddCategoryAdmin, AddProductAdmin, UpdateCategoryAdmin, UpdateProductAdmin } from "./pages";
// import PrivateRoute from "./components/PrivateRoute";
import { Error } from "./pages/Error";

import { setAuthToken, API } from "./config/api";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const navigate = useNavigate();
  // Init user context
  const [state, dispatch] = useContext(UserContext);

  useEffect(() => {
    // Redirect Auth
    if (state.isLogin === false) {
      navigate("/auth");
    } else {
      if (state.user.status === "admin") {
        navigate("/complain-admin");
      } else if (state.user.status === "customers") {
        navigate("/");
      }
    }
  }, [state]);

  console.log(state);

  // Create function for "check user token"
  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      // Get user data
      let payload = response.data.data.user;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  // Call functin check user with useEffect didMount

  return (
    <div className="App">
      <Routes>
        {/* <Route path="/" element={<PrivateRoute />}>
        </Route> */}
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Product />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/update-profile/:id" element={<UpdateProfile/>} />
        <Route path="/category-admin/*" element={<CategoryAdmin />}/>
        <Route path="/products-admin" element={<ProductAdmin />} />
        <Route path="/add-product" element={<AddProductAdmin />} />
        <Route path="/add-category" element={<AddCategoryAdmin />} />
        <Route path="/complain" element={<Complain />} />
        <Route path="/complain-admin" element={<ComplainAdmin />} />
        <Route path="/detail-product/:id" element={<DetailProduct />} />
        <Route path="/update-category/:id" element={<UpdateCategoryAdmin />} />
        <Route path="/update-product/:id" element={<UpdateProductAdmin />} />
        <Route path="/detail-product/:id" element={<DetailProduct />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
