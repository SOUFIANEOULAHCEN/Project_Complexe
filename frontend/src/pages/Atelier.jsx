import { useState, useEffect, useRef } from "react";
import Footer from "../components/Footer";
import bibliotheque from '../assets/img/imgAtelier/bibliotheque.jfif';
import theatre from '../assets/img/imgAtelier/theatre.jpg';
import musique from '../assets/img/imgAtelier/musique.jpg';
import pientre from '../assets/img/imgAtelier/pientre.jpeg';
import informatique from '../assets/img/imgAtelier/informatique.jpg';
import etrangere from '../assets/img/imgAtelier/etrangere.jpg';
import prof2 from '../assets/img/imgAtelier/prof2.jpg';
import prof5 from '../assets/img/imgAtelier/prof5.jpg';
import prof11 from '../assets/img/imgAtelier/prof11.jpg';
import prof3 from '../assets/img/imgAtelier/prof3.jpg';
import prof6 from '../assets/img/imgAtelier/prof6.jpg';
import Image_de_centre from '../assets/img/imgAtelier/Image_de_centre.jpeg';

function Atelier() {
  // Données pour les ateliers
  const items = [
    {
      title: "Bibliothèque",
      description: "Plongez dans un monde de connaissance et d'imagination",
      image: bibliotheque,
    },
    {
      title: "Théâtre",
      description: "Découvrez l'art dramatique et exprimez votre créativité sur scène",
      image: theatre,
    },
    {
      title: "Musique",
      description: "Explorez l'univers musical et découvrez de nouveaux sons",
      image: musique,
    },
    {
      title: "Peinture",
      description: "Exprimez vos émotions à travers l'art visuel",
      image: pientre,
    },
    {
      title: "Informatique",
      description: "Découvrez les technologies numériques et développez vos compétences",
      image: informatique,
    },
    {
      title: "Langues Étrangères",
      description: "Apprenez de nouvelles langues pour élargir vos horizons",
      image: etrangere,
    },
  ];

  // Données pour l'équipe
  const teamMembers = [
    {
      name: "Hafsa Stifa",
      role: "Langues Étrangères",
      image: prof2,
    },
    {
      name: "Mohammed Louahi",
      role: "Peinture",
      image: prof11,
    },
    {
      name: "Meryem Elkhyat",
      role: "Théâtre",
      image: prof11,
    },
    {
      name: "Soufian Oulahssane",
      role: "Musique",
      image: prof5,
    },
    {
      name: "Hafsa Loukili",
      role: "Peinture",
      image: prof3,
    },
    {
      name: "Imad Dalal",
      role: "Informatique",
      image: prof6,
    },
  ];

  // État et logique pour le slider des ateliers
  const [currentIndexAteliers, setCurrentIndexAteliers] = useState(0);
  const intervalRefAteliers = useRef(null);

  const nextSlideAteliers = () => {
    setCurrentIndexAteliers((prevIndex) =>
      prevIndex + 3 >= items.length ? 0 : prevIndex + 3
    );
  };

  const prevSlideAteliers = () => {
    setCurrentIndexAteliers((prevIndex) =>
      prevIndex - 3 < 0 ? Math.floor((items.length - 1) / 3) * 3 : prevIndex - 3
    );
  };

  // État et logique pour le slider de l'équipe
  const [currentIndexEquipe, setCurrentIndexEquipe] = useState(0);
  const intervalRefEquipe = useRef(null);

  const nextSlideEquipe = () => {
    setCurrentIndexEquipe((prevIndex) =>
      prevIndex + 1 >= teamMembers.length ? 0 : prevIndex + 1
    );
  };

  const prevSlideEquipe = () => {
    setCurrentIndexEquipe((prevIndex) =>
      prevIndex - 1 < 0 ? teamMembers.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    intervalRefAteliers.current = setInterval(() => {
      nextSlideAteliers();
    }, 5000);

    intervalRefEquipe.current = setInterval(() => {
      nextSlideEquipe();
    }, 6000);

    return () => {
      if (intervalRefAteliers.current) clearInterval(intervalRefAteliers.current);
      if (intervalRefEquipe.current) clearInterval(intervalRefEquipe.current);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#F9F5F0] to-[#F0E6D8]">
      {/* Section Hero */}
      <div className="relative h-[80vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={Image_de_centre}
            alt="CCO Ouarzazate"
            className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
        </div>
        <div className="relative z-10 flex h-full items-center justify-center text-center px-4">
          <div className="max-w-4xl animate-fade-in-up">
            <h1 className="mb-6 text-5xl font-bold text-white md:text-6xl lg:text-7xl">
              Ateliers Culturels
            </h1>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
              Découvrez nos espaces d'apprentissage et de création
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="/accueil"
                className="inline-block bg-[#8B4513] hover:bg-[#6e3d20] text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Accueil
              </a>
              <a
                href="/cc0"
                className="inline-block bg-transparent border-2 border-white hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300"
              >
                Nos Ateliers
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Section Ateliers */}
      <section id="ateliers" className="py-20">
        <div className="container mx-auto px-4">
          <div className="relative mb-16 text-center">
            <h1 className="text-7xl md:text-8xl lg:text-[8rem] font-bold select-none text-white/80 [-webkit-text-stroke:2px_rgba(139,69,19,0.3)]">
              Ateliers
            </h1>
            <h2 className="text-4xl md:text-5xl font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#8B4513]">
              Nos Ateliers
            </h2>
          </div>
          
          <p className="text-lg text-[#6B4D3D] text-center max-w-3xl mx-auto mb-12">
            Le Complexe Culturel OUARZAZATE propose divers ateliers créatifs et éducatifs pour tous les âges.
            Rejoignez-nous pour apprendre et créer dans une ambiance conviviale.
          </p>
          
          <div className="relative max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((item, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <span className="text-white text-lg font-medium translate-y-4 hover:translate-y-0 transition-transform duration-300">
                        {item.title}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#8B4513] mb-3">{item.title}</h3>
                    <p className="text-[#6B4D3D] mb-4">{item.description}</p>
                    <button className="px-4 py-2 text-sm font-medium text-[#8B4513] border border-[#8B4513] rounded-lg hover:bg-[#8B4513] hover:text-white transition-colors duration-300">
                      En savoir plus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section Équipe */}
      <section id="equipe" className="py-20 bg-[#8B4513]/10">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-[#8B4513]">Notre Équipe d'Animateurs</h2>
          <p className="text-lg text-[#6B4D3D] text-center max-w-3xl mx-auto mb-12">
            Des professionnels passionnés animent chaque atelier, apportant expertise et créativité pour offrir une expérience d'apprentissage enrichissante.
          </p>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div 
                  key={index}
                  className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${index % 2 === 0 ? 'animate-float' : ''}`}
                >
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-[#8B4513] mb-1">{member.name}</h3>
                    <p className="text-[#6B4D3D] mb-4">{member.role}</p>
                    <div className="flex justify-center space-x-3">
                      <a href="#" className="text-[#8B4513] hover:text-[#6B4D3D] transition-colors duration-300">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                        </svg>
                      </a>
                      <a href="#" className="text-[#8B4513] hover:text-[#6B4D3D] transition-colors duration-300">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.09.682-.217.682-.48 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.293 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Atelier;