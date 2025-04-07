import axios from "axios";
import React, { useState } from "react";

export default function Connexion({ onClose }) {
  const [email, setEmail] = useState("");
  const [motDePass, setMotDePass] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const adminResponse = await axios.get(
        `http://localhost:80/Backend/admin.php`,
        { params: { email, password: motDePass } }
      );

      console.log("Réponse Admin :", adminResponse.data); // Debug

      if (adminResponse.data.success) {
        alert("Connexion réussie en tant qu'administrateur !");
        window.location.href = "/dashboard-admin"; // Redirection
        onClose();
      } else {
        const userResponse = await axios.get(
          `http://localhost:80/Backend/utilisateurs.php`,
          { params: { email, password: motDePass } }
        );

        console.log("Réponse Utilisateur :", userResponse.data); // Debug

        if (userResponse.data.success) {
          console.log("idUser", userResponse.data.idUser);
          localStorage.setItem("idUser", userResponse.data.idUser);

          alert("Connexion réussie en tant qu'utilisateur !");
          window.location.href = "/dashboard-user"; // Redirection
          onClose();
        } else {
          alert("Email ou mot de passe incorrect.");
        }
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      alert("Une erreur s'est produite lors de la connexion.");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-[#6b4530] mb-1"
        >
          Email :
        </label>
        <input
          type="email"
          id="email"
          className="w-full px-3 py-2 border border-[#d97706] bg-white text-[#6b4530] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d97706]"
          placeholder="Entrez votre email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-[#6b4530] mb-1"
        >
          Mot de passe :
        </label>
        <input
          type="password"
          id="password"
          className="w-full px-3 py-2 border border-[#d97706] bg-white text-[#6b4530] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d97706]"
          placeholder="Entrez votre mot de passe"
          value={motDePass}
          onChange={(e) => setMotDePass(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-[#d97706] text-white py-2 rounded-lg hover:bg-[#b45309] focus:outline-none focus:ring-2 focus:ring-[#b45309]"
      >
        Se connecter
      </button>
    </form>
  );
}