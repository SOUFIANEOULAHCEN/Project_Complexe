// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
// import * as jwt_decode from 'jwt-decode';
import { jwtDecode } from 'jwt-decode';
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Configurer axios
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = 'http://localhost:3000/api';

  // Vérifier l'authentification au chargement
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('/users/profile');
        setUser(response.data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('/auth/login', { email, password });
      setUser(response.data.user);
      return response.data.user;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.post('/auth/logout');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateProfile = async (userData) => {
    try {
      const response = await axios.put('/users/profile', userData);
      setUser(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  if (loading) {
    return <div>Chargement...</div>; // Ou votre composant de chargement
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout,
      updateProfile,
      isAuthenticated: !!user,
      isAdmin: user?.typeUser === 'admin',
      isSuperAdmin: user?.typeUser === 'superadmin'
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
