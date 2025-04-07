import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";

const events = [
  {
    id: 1,
    title: "Festival Izouran",
    description:
      "Un événement culturel et artistique unique qui célèbre les racines et les traditions amazighes dans toute leur richesse.",
    image: "/src/assets/event1.jpg",
  },
  {
    id: 2,
    title: "Festival du Tapis Ouazguiti",
    description:
      "Une célébration culturelle mettant en lumière l'art ancestral du tissage de tapis, emblème du patrimoine amazigh.",
    image: "/src/assets/event2.jpg",
  },
  {
    id: 3,
    title: "Festival Ahwach",
    description:
      "Célébration de l’art amazigh à travers la danse, la musique et les chants traditionnels.",
    image: "/src/assets/event3.jpg",
  },
  {
    id: 4,
    title: "Journée du Patrimoine des Aits",
    description:
      "Une journée dédiée à la valorisation du patrimoine des Aits au Ksar Aït Benhaddou.",
    image: "/src/assets/event1.jpg",
  },
  {
    id: 5,
    title: "Festival Ahwach Haut Atlas",
    description:
      "Un festival célébrant les arts amazighs avec des performances de danse et musique traditionnelles.",
    image: "/src/assets/event4.jpg",
  },
  {
    id: 6,
    title: "Festival Izouran",
    description:
      "Un événement culturel et artistique unique qui célèbre les racines et les traditions amazighes dans toute leur richesse.",
    image: "/src/assets/event2.jpg",
  },
  {
    id: 7,
    title: "Festival du Tapis Ouazguiti",
    description:
      "Une célébration culturelle mettant en lumière l'art ancestral du tissage de tapis, emblème du patrimoine amazigh.",
    image: "/src/assets/event2.jpg",
  },
  {
    id: 8,
    title: "Festival Ahwach",
    description:
      "Célébration de l’art amazigh à travers la danse, la musique et les chants traditionnels.",
    image: "/src/assets/event5.jpg",
  },
];

const Evenements = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerSlide = 4;


  useEffect(() => {
    const totalPages = Math.ceil(events.length / cardsPerSlide);
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === totalPages - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-white" >
      
      <div className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/src/assets/img/background.webp"
            alt="CCO Ouarzazate"
            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 flex h-full items-center justify-center text-center">
          <div className="px-4">
            <h1 className="mb-6 text-5xl font-bold text-white md:text-6xl" >
              Evenements
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
                Evenements
              </a>
            </div>
          </div>
        </div>
      </div> <br />

      <div className="relative mb-16 text-center">
                <h1
                    className="text-[8rem] font-bold select-none [text-shadow:_1px_1px_#8B4513] [-webkit-text-stroke:_2px_rgba(139,69,19,0.5)] text-white"
                >
                    Les Evenements
                </h1>
                <h2
                    className="text-5xl font-bold absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{ color: "#8B4513" }}
                >
                    Les Evenements
                </h2>
            </div>
      <p className="max-w-3xl mx-auto text-center text-muted-foreground mb-11 -mt-8"
                style={{ color: "#8B4513" }}>Découvrez une riche programmation d'événements qui célèbre la diversité artistique, les traditions ancestrales et l'innovation culturelle. Festivals, expositions, spectacles et bien plus encore vous attendent pour des moments uniques et inoubliables.</p>
      <div className="relative overflow-hidden bg-[#FDF8F5] py-16">
        {/* Slider */}
        <div
          className="flex transition-transform duration-1000 ease-in-out"
          style={{
            transform: `translateX(-${(currentIndex * 100) / cardsPerSlide}%)`,
            width: `${(events.length / cardsPerSlide) * 100}%`,
          }}
        >
          {events.map((event) => (
            <div
              key={event.id}
              className="w-1/4 flex flex-col items-center justify-center px-4"
            >
              <div className="relative group bg-white shadow-2xl rounded-lg overflow-hidden transform hover:scale-105 transition duration-500">
                <div className="relative w-full h-[400px]">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Overlay affiché au survol */}
                <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <h3 className="text-2xl font-semibold text-center">{event.title}</h3>

                  <p className="text-center text-base mt-4 px-4">
                    {event.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Points de navigation */}
        <div className="flex justify-center mt-6">
          {Array.from({ length: Math.ceil(events.length / cardsPerSlide) }).map((_, index) => (
            <button
              key={index}
              className={`h-3 w-3 rounded-full mx-2 ${currentIndex === index ? "bg-gray-800" : "bg-gray-400 hover:bg-gray-600"}`}
              onClick={() => setCurrentIndex(index)}
              
            ></button>
          ))}
        </div>

      </div>
      <br /><br />
      <Footer/>
    </div>
  );
};

export default Evenements;