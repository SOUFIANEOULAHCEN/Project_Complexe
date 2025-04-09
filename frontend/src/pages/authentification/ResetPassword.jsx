import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:3000/api/auth/reset-password/${token}`, {
        password,
      });
      setMessage(res.data.message);
      setTimeout(() => navigate("/login"), 3000); // Redirige après 3 secondes
    } catch (err) {
      setMessage(err.response?.data?.message || "Erreur");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Réinitialiser le mot de passe</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Nouveau mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        <button className="bg-green-600 text-white p-2 rounded w-full">Valider</button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}
