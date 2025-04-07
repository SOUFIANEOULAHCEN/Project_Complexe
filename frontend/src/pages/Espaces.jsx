import React from "react";
import Footer from "../components/Footer";

const Espaces = () => {
    const espaces = [
        {
          id: 1,
          titre: "Salle de théâtre",
          description:
            "Un espace dédié aux spectacles, aux représentations théâtrales et aux événements artistiques.",
          image: "/IMGCCO/WhatsApp Image 2025-01-21 at 18.00.18_086f0463.jpg",
        },
        {
          id: 2,
          titre: "Salle d'exposition",
          description:
            "Un lieu spacieux pour accueillir des expositions artistiques, des galeries et des événements culturels.",
          image: "/IMGCCO/EXPL.png",
        },
        {
          id: 3,
          titre: "La bibliothèque",
          description:
            "Un endroit calme et inspirant, offrant une large sélection de livres pour tous les passionnés de lecture.",
          image: "/IMGCCO/biblio.jpeg",
        },
        {
          id: 4,
          titre: "Salle d'informatique",
          description:
            "Un espace équipé de postes informatiques pour le travail, l'étude et la recherche en ligne.",
          image: "/IMGCCO/Grande salle de formation.jpeg",
        },
        {
          id: 5,
          titre: "Espace musique",
          description:
            "Un espace dédié à la pratique de la musique, avec des instruments et des équipements de qualité.",
          image: "/IMGCCO/WhatsApp Image 2025-01-21 at 18.15.15_94829c1d.jpg",
        },
        {
          id: 6,
          titre: "Salle des réunions",
          description:
            "Une salle professionnelle équipée pour des réunions, des discussions de groupe et des présentations.",
          image: "/IMGCCO/WhatsApp Image 2025-01-21 at 18.17.29_4aada3b3.jpg",
        },
        {
          id: 7,
          titre: "Le café culturel",
          description:
            "Un lieu convivial où l'on peut déguster une boisson tout en échangeant autour de sujets culturels.",
          image: "/IMGCCO/,.jpeg",
        },
        {
          id: 8,
          titre: "Salle de peinture",
          description:
            "Un espace lumineux et inspirant, équipé pour les ateliers de peinture et les créations artistiques.",
          image: "public/IMGCCO/download (3).jfif",
        },
      ];
      
      
  return (
    <div className="w-full bg-white">
        
     
      <div className="relative h-[70vh] overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="public/IMGCCO/complexeculturel.jpg"
                        alt="CCO Ouarzazate"
                        className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/50" />
                </div>
                <div className="relative z-10 flex h-full items-center justify-center text-center">
                    <div className="px-4">
                        <h1 className="mb-6 text-5xl font-bold text-white md:text-6xl" >
                        Espaces
                        </h1>
                        
                        <div className="mt-6">
                            <a
                                href="/accueil"
                                className="inline-block bg-[#8B4513] text-white font-semibold py-1 px-3 rounded-md hover:bg-[#6e3d20] transition duration-300"
                            >
                                Accueil
                            </a>
                            <a
                                href="/cc0"
                                className="ml-4 inline-block bg-[#8B4513] text-white font-semibold py-1 px-3 rounded-md hover:bg-[#6e3d20] transition duration-300"
                            >
                                Espaces
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <br /><br />
            <div className="mx-auto max-w-7xl px-4 py-16 bg-[#FDF8F5]">
          
          <div className="space-y-8">
            {espaces.map((espace, index) => (
              <div
                key={espace.id}
                className={`flex flex-col ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } items-center gap-6 bg-white rounded-lg shadow-lg overflow-hidden`}
              >
                {/* Image */}
                <div className="relative w-96 h-96">
                  <img
                    src={espace.image}
                    alt={espace.titre}
                    className="absolute inset-0 w-full h-full object-cover "
                  />
                </div>
                {/* Contenu */}
                <div className="flex-1 p-6 text-center">
                  <div className="flex justify-center items-center mb-4">
                    <div className="w-3 h-3 bg-[#824B26] rounded-full mr-2"></div>
                    <div className="w-full h-0.5 bg-[#824B26]"></div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4" style={{ color: "#824B26" }}>
                    {espace.titre}
                  </h3>
                  <p className="text-gray-700" style={{ color: "#824B26" }}>
                    {espace.description}
                  </p>
                  {/* Bouton réserver */}
                  <button className="bg-[#824B26] text-white font-semibold py-1 px-3 rounded-md hover:bg-[#6e3d20] mt-4">
                    Réserver
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
       <br /><br />
       <Footer/>
    </div>
  );
};

export default Espaces;