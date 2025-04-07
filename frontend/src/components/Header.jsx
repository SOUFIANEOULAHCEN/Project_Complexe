import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import complex_logo_final_brown from "../assets/img/logo/complex_logo_final_brown.png";
import france from "../assets/img/france.png";
import morocco from "../assets/img/morocco.png";
import Connexion from "../pages/Connexion";
import Inscription from "../pages/Inscription";
import background from "../assets/img/background.webp";

export default function Header() {
  const [isConnexionModalOpen, setConnexionModalOpen] = useState(false);
  const [showConnexion, setShowConnexion] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const openConnexionModal = () => {
    setConnexionModalOpen(true);
    setShowConnexion(true);
  };

  const closeModal = () => {
    setConnexionModalOpen(false);
  };

  const handleReservationClick = () => {
    navigate("/reservation");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <div className="bg-white shadow-md sticky top-0 z-40">
      {/* Barre de navigation principale */}
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Logo - Centré verticalement */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img
              className="h-12 w-auto transition-transform hover:scale-105"
              src={complex_logo_final_brown}
              alt="Logo CCO"
            />
          </Link>
        </div>

        {/* Menu desktop */}
        <div className="hidden lg:flex items-center space-x-8">
          {/* Liens de navigation */}
          <div className="flex space-x-8">
            <Link
              to="/Acceuil"
              className="text-[#824B26] hover:text-[#6e3d20] font-medium transition-colors duration-200 relative group"
            >
              Accueil
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#824B26] transition-all duration-300 group-hover:w-full"></span>
            </Link>

            {/* Dropdown CCO */}
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-1 text-[#824B26] hover:text-[#6e3d20] font-medium transition-colors duration-200 group"
              >
                <span>CCO</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="absolute left-0 mt-2 w-56 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <div className="py-1">
                    <Link
                      to="/CCO"
                      className="block px-4 py-2 text-sm text-[#824B26] hover:bg-[#F8F1E9]"
                    >
                      CCO
                    </Link>
                    <Link
                      to="/Espaces"
                      className="block px-4 py-2 text-sm text-[#824B26] hover:bg-[#F8F1E9]"
                    >
                      Espaces
                    </Link>
                    <Link
                      to="/Bibliotheque"
                      className="block px-4 py-2 text-sm text-[#824B26] hover:bg-[#F8F1E9]"
                    >
                      Bibliothèque
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/Evenements"
              className="text-[#824B26] hover:text-[#6e3d20] font-medium transition-colors duration-200 relative group"
            >
              Événements
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#824B26] transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link
              to="/Ateliers"
              className="text-[#824B26] hover:text-[#6e3d20] font-medium transition-colors duration-200 relative group"
            >
              Ateliers
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#824B26] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              to="/Talents"
              className="text-[#824B26] hover:text-[#6e3d20] font-medium transition-colors duration-200 relative group"
            >
              <span className="relative">
                Talents
                <span className="absolute -top-1 -right-2.5 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4A017] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#D4A017]"></span>
                </span>
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#824B26] transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link
              to="/Contact"
              className="text-[#824B26] hover:text-[#6e3d20] font-medium transition-colors duration-200 relative group"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#824B26] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

          {/* Séparateur */}
          <div className="h-8 w-px bg-gray-200 mx-2"></div>

          {/* Langues et boutons */}
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <img src={morocco} alt="Maroc" className="h-6 w-auto rounded-full border border-gray-200" />
              <img src={france} alt="France" className="h-6 w-auto rounded-full border border-gray-200" />
            </div>

            <button
              onClick={openConnexionModal}
              className="px-4 py-2 bg-[#824B26] text-white rounded-md hover:bg-[#6e3d20] transition-colors duration-200 font-medium shadow-sm"
            >
              Connexion
            </button>

            <button
              onClick={handleReservationClick}
              className="px-4 py-2 border border-[#824B26] text-[#824B26] rounded-md hover:bg-[#F8F1E9] transition-colors duration-200 font-medium shadow-sm"
            >
              Réserver
            </button>
          </div>
        </div>

        {/* Bouton menu mobile */}
        <div className="lg:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-[#824B26] focus:outline-none"
            aria-label="Menu"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Menu mobile */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white shadow-lg">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <Link
              to="/Acceuil"
              className="block px-4 py-2 text-[#824B26] hover:bg-[#F8F1E9] rounded-md"
              onClick={toggleMobileMenu}
            >
              Accueil
            </Link>

            <div>
              <button
                onClick={toggleDropdown}
                className="flex items-center justify-between w-full px-4 py-2 text-[#824B26] hover:bg-[#F8F1E9] rounded-md"
              >
                <span>CCO</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="pl-6 mt-1 space-y-1">
                  <Link
                    to="/CCO"
                    className="block px-4 py-2 text-sm text-[#824B26] hover:bg-[#F8F1E9] rounded-md"
                    onClick={toggleMobileMenu}
                  >
                    CCO
                  </Link>
                  <Link
                    to="/Espaces"
                    className="block px-4 py-2 text-sm text-[#824B26] hover:bg-[#F8F1E9] rounded-md"
                    onClick={toggleMobileMenu}
                  >
                    Espaces
                  </Link>
                  <Link
                    to="/Bibliotheque"
                    className="block px-4 py-2 text-sm text-[#824B26] hover:bg-[#F8F1E9] rounded-md"
                    onClick={toggleMobileMenu}
                  >
                    Bibliothèque
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/Evenements"
              className="block px-4 py-2 text-[#824B26] hover:bg-[#F8F1E9] rounded-md"
              onClick={toggleMobileMenu}
            >
              Événements
            </Link>

            <Link
              to="/Ateliers"
              className="block px-4 py-2 text-[#824B26] hover:bg-[#F8F1E9] rounded-md"
              onClick={toggleMobileMenu}
            >
              Ateliers
            </Link>

            <Link
              to="/Talents"
              className="block px-4 py-2 text-[#824B26] hover:bg-[#F8F1E9] rounded-md relative"
              onClick={toggleMobileMenu}
            >
              <span className="flex items-center">
                Talents
                <span className="ml-2 inline-block h-2 w-2 rounded-full bg-[#D4A017]"></span>
              </span>
            </Link>

            <Link
              to="/Contact"
              className="block px-4 py-2 text-[#824B26] hover:bg-[#F8F1E9] rounded-md"
              onClick={toggleMobileMenu}
            >
              Contact
            </Link>

            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <img src={morocco} alt="Maroc" className="h-6 w-auto rounded-full border border-gray-200" />
                <img src={france} alt="France" className="h-6 w-auto rounded-full border border-gray-200" />
              </div>

              <button
                onClick={() => {
                  openConnexionModal();
                  toggleMobileMenu();
                }}
                className="w-full px-4 py-2 mb-2 bg-[#824B26] text-white rounded-md hover:bg-[#6e3d20] transition-colors duration-200 font-medium"
              >
                Connexion
              </button>

              <button
                onClick={() => {
                  handleReservationClick();
                  toggleMobileMenu();
                }}
                className="w-full px-4 py-2 border border-[#824B26] text-[#824B26] rounded-md hover:bg-[#F8F1E9] transition-colors duration-200 font-medium"
              >
                Réserver
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de connexion/inscription (identique à votre version) */}
      {isConnexionModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white w-11/12 md:w-2/3 lg:w-1/2 rounded-lg shadow-xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div
                className="p-8 w-full md:w-1/2 flex flex-col items-center justify-center relative"
                style={{
                  backgroundImage: `url(${background})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-black opacity-40"></div>
                <div className="relative z-10 text-white text-center">
                  <h2 className="text-3xl font-extrabold mb-6">Bienvenue</h2>
                  <p className="text-lg max-w-md">
                    Au Complexe Culturel de Ouarzazate, votre porte d'entrée vers un voyage culturel unique.
                  </p>
                </div>
              </div>

              <div className="w-full md:w-1/2 p-6 md:p-8">
                <button
                  onClick={closeModal}
                  className="absolute top-3 right-3 text-[#824B26] hover:text-[#6e3d20] text-2xl font-bold"
                >
                  &times;
                </button>
                <h2 className="text-2xl font-bold text-center text-[#824B26] mb-6">
                  {showConnexion ? "Connectez-vous" : "Inscrivez-vous"}
                </h2>
                {showConnexion ? (
                  <Connexion onClose={closeModal} />
                ) : (
                  <Inscription onClose={closeModal} />
                )}
                <button
                  onClick={() => setShowConnexion(!showConnexion)}
                  className="mt-4 text-[#824B26] hover:text-[#6e3d20] text-sm font-medium text-center w-full"
                >
                  {showConnexion
                    ? "Vous n'avez pas de compte ? Créez-en un ici."
                    : "Vous avez déjà un compte ? Connectez-vous ici."}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}