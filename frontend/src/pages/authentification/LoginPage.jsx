// src/pages/LoginPage.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { LoginForm } from "../../components/login-form";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const decoded = await login(email, password);
      const { typeUser } = decoded;

      if (typeUser === "admin") navigate("/dashboard/admin");
      else if (typeUser === "superadmin") navigate("/dashboard/superadmin");
      else navigate("/dashboard/user");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-100">
      <LoginForm
        handleSubmit={handleSubmit}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        navigate={navigate}
        className="w-1/2 "
      />
    </div>
  );
};

export default LoginPage;
