import { createContext, useReducer } from "react";

export const UserContext = createContext();

// init state
const initialState = {
  isLogin: false,
  user: {},
  // idAdmin: false
};

// Memasukan data
const reducer = (state, action) => {
  const { type, payload } = action; // type untuk kondisi, payload untuk tempat datanya
  switch (type) {
    case "USER_SUCCESS":
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", payload.token);
      return {
        isLogin: true,
        user: payload,
      };

    case "AUTH_ERROR":
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        isLogin: false,
        user: {},
      };
    default:
      throw new Error();
  }
};

// Buat UserContextProvider agar bisa digunakan disemua komponen
export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <UserContext.Provider value={[state, dispatch]}>{children}</UserContext.Provider>;
};
