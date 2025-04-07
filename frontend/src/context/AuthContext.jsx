// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
// import * as jwt_decode from 'jwt-decode';
import { jwtDecode } from 'jwt-decode';
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // contient { id, typeUser, email }
  const [accessToken, setAccessToken] = useState(null);

  const login = async (email, password) => {
    const res = await axios.post(
      "http://localhost:3000/api/auth/login",
      { email, password },
      { withCredentials: true }
    );

    const token = res.data.accessToken;
    setAccessToken(token);
    // const decoded = jwt_decode(token);
    const decoded = jwtDecode(token);
    setUser(decoded); // { id, typeUser, email }
    return decoded; // pour l’utiliser après
  };

  const logout = async () => {
    await axios.post(
      "http://localhost:3000/api/auth/logout",
      {},
      { withCredentials: true }
    );
    setUser(null);
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
