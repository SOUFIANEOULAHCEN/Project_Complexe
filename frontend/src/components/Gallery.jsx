export default function Gallery() {
  const images = [
    {
      id: 1,
      src: "/src/assets/computer.jpeg",
      alt: "Laboratoire Informatique",
      category: "Équipements"
    },
    {
      id: 2,
      src: "/src/assets/library.jfif",
      alt: "Espace Bibliothèque",
      category: "Lieux"
    },
    {
      id: 3,
      src: "/src/assets/theater2.jpg",
      alt: "Salle de Théâtre",
      category: "Événements"
    },
    {
      id: 4,
      src: "/src/assets/study.jpeg",
      alt: "Zone d'Étude",
      category: "Lieux"
    },
    {
      id: 5,
      src: "/src/assets/workspace.jpeg",
      alt: "Espace Atelier",
      category: "Équipements"
    },
    {
      id: 6,
      src: "/src/assets/meeting.jpg",
      alt: "Salle de Réunion",
      category: "Lieux"
    },
    {
      id: 7,
      src: "/src/assets/theater.jpeg",
      alt: "Auditorium Principal",
      category: "Événements"
    },
    {
      id: 8,
      src: "/src/assets/creative.jfif",
      alt: "Espace Créatif",
      category: "Ateliers"
    },
    {
      id: 9,
      src: "/src/assets/reading.jfif",
      alt: "Coin Lecture",
      category: "Lieux"
    },
    {
      id: 10,
      src: "/src/assets/art.jpeg",
      alt: "Studio d'Art",
      category: "Ateliers"
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-[#F9F5F0] to-[#F0E6D8]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif text-[#8B4513] mb-3">
            Galeries du Complexe
          </h2>
          <p className="text-lg text-[#6B4D3D] max-w-2xl mx-auto">
            Découvrez nos espaces culturels à travers ces instantanés
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {images.map((image, index) => (
            <div
              key={image.id}
              className={`
                relative group overflow-hidden rounded-xl shadow-lg
                ${index === 2 ? "lg:col-span-2" : ""}
                ${index === 5 ? "lg:row-span-2" : ""}
              `}
            >
              {/* Conteneur d'image optimisé */}
              <div className="aspect-[3/2] w-full bg-gray-100">
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                  style={{
                    objectPosition: 'center',
                    backfaceVisibility: 'hidden',
                    transform: 'translateZ(0)'
                  }}
                />
              </div>
              
              {/* Overlay amélioré */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="inline-block px-3 py-1 mb-2 text-xs font-semibold text-[#8B4513] bg-white rounded-full">
                    {image.category}
                  </span>
                  <h3 className="text-xl font-bold text-white">{image.alt}</h3>
                  <button 
                    className="mt-3 px-4 py-2 text-sm font-medium text-white bg-[#8B4513]/90 hover:bg-[#8B4513] rounded-lg transition-all duration-200 flex items-center"
                    aria-label={`Voir ${image.alt}`}
                  >
                    Voir plus
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <button className="px-8 py-3 bg-[#8B4513] hover:bg-[#6B4D3D] text-white font-medium rounded-full shadow-md hover:shadow-lg transition-all duration-300">
            Voir toute la galerie
          </button>
        </div>
      </div>
    </section>
  )
}