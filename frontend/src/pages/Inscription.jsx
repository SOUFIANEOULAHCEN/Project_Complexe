import React, { useState } from "react";
import axios from "axios";

export default function Inscription({ onClose }) {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [motDePass, setMotDePass] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:80/Backend/utilisateurs.php",
        { nom, prenom, email, MotDePass: motDePass }
      );

      if (response.data.id) {
        alert("Inscription réussie !");
        onClose();
      } else if (response.data.error) {
        alert("Erreur lors de l'inscription : " + response.data.error);
      } else {
        alert("Erreur lors de l'inscription : Réponse inattendue du serveur");
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error.response ? error.response.data : error.message);
      alert("Une erreur s'est produite lors de l'inscription : " + (error.response ? error.response.data.error : error.message));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="nom" className="block text-sm font-medium text-[#6b4530] mb-1">
          Nom :
        </label>
        <input
          type="text"
          id="nom"
          className="w-full px-3 py-2 border border-[#d97706] bg-white text-[#6b4530] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d97706]"
          placeholder="Entrez votre nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="prenom" className="block text-sm font-medium text-[#6b4530] mb-1">
          Prénom :
        </label>
        <input
          type="text"
          id="prenom"
          className="w-full px-3 py-2 border border-[#d97706] bg-white text-[#6b4530] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d97706]"
          placeholder="Entrez votre prénom"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-[#6b4530] mb-1">
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
        <label htmlFor="password" className="block text-sm font-medium text-[#6b4530] mb-1">
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
        S'inscrire
      </button>
    </form>
  );
}