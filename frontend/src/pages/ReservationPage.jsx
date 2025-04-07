import React from "react"
import { useNavigate } from "react-router-dom"

export default function ReservationPage() {
  const navigate = useNavigate()

  const cards = [
    {
      title: "LES EVENEMENTS",
      features: [
        "Développement des compétences pratiques.",
        "Création d'opportunités de réseautage professionnel.",
        "Apprentissage interactif.",
        "Promotion de l'innovation et de la créativité.",
        "Fourniture d'un environnement adapté à tous les niveaux.",
        "Encadrement par des experts spécialisés.",
      ],
      buttonText: "Réservez",
    },
    {
      title: "LES ATELIERS",
      features: [
        "Développement des compétences pratiques.",
        "Création d'opportunités de réseautage professionnel.",
        "Apprentissage interactif.",
        "Promotion de l'innovation et de la créativité.",
        "Fourniture d'un environnement adapté à tous les niveaux.",
        "Encadrement par des experts spécialisés.",
      ],
      buttonText: "Inscrire-vous",
    },
    {
      title: "L'ESPACES",
      features: [
        "Développement des compétences pratiques.",
        "Création d'opportunités de réseautage professionnel.",
        "Apprentissage interactif.",
        "Promotion de l'innovation et de la créativité.",
        "Fourniture d'un environnement adapté à tous les niveaux.",
        "Encadrement par des experts spécialisés.",
      ],
      buttonText: "Réservez",
    },
  ]

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white py-12 px-4">
      <div className="container mx-auto">
        <h1 className="text-center text-2xl md:text-3xl mb-8 text-[#FDF8F5]">
          Participez à nos ateliers culturels et éducatifs, réservez vos espaces de travail collaboratif,
          <br />
          ou organisez vos événements dans un cadre qui inspire la créativité.
        </h1>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-[#FDF8F5] rounded-lg p-8 text-[#8B4513] transform hover:scale-105 transition-transform duration-300"
            >
              <h2 className="text-2xl font-serif font-bold mb-6 text-center">{card.title}</h2>
              <ul className="space-y-4 mb-8">
                {card.features.map((feature, idx) => (
                  <li key={idx} className="text-sm">
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="text-center">
                <button
                  onClick={() => navigate("/calendar")}
                  className="bg-[#8B4513] text-white px-8 py-2 rounded-md hover:bg-[#6d3710] transition-colors duration-300"
                >
                  {card.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}