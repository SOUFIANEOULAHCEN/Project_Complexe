"use client"

import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

const workshops = [
  {
    id: 1,
    title: "Atelier de Peinture",
    image: "/src/assets/art.jpeg",
    description: "Découvrez l'art de la peinture et exprimez votre créativité",
    category: "Arts Visuels"
  },
  {
    id: 2,
    title: "Atelier de Musique",
    image: "/src/assets/music.jpg",
    description: "Apprenez à jouer des instruments avec nos professeurs expérimentés",
    category: "Musique"
  },
  {
    id: 3,
    title: "Atelier de Théâtre",
    image: "/src/assets/atelier-theater.jpg",
    description: "Explorez l'art dramatique et développez votre confiance en scène",
    category: "Arts de la Scène"
  },
  {
    id: 4,
    title: "Atelier de Danse",
    image: "/src/assets/danse.jpg",
    description: "Initiez-vous à différents styles de danse dans une ambiance conviviale",
    category: "Danse"
  },
]

export default function WorkshopSlider() {
  return (
    <section className="py-20 bg-gradient-to-b from-[#F9F5F0] to-[#F0E6D8]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-[#8B4513] mb-4">Nos Ateliers Culturels</h2>
          <p className="text-xl text-[#6B4D3D] max-w-2xl mx-auto">
            Découvrez nos ateliers animés par des professionnels passionnés
          </p>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          pagination={{ 
            clickable: true,
            el: '.swiper-pagination',
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active'
          }}
          autoplay={{ 
            delay: 4000,
            disableOnInteraction: false
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="relative pb-16"
        >
          {workshops.map((workshop) => (
            <SwiperSlide key={workshop.id}>
              <div className="group relative h-full overflow-hidden rounded-xl shadow-lg transition-all duration-500 hover:shadow-xl">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src={workshop.image || "/placeholder.svg"}
                    alt={workshop.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                    <span className="inline-block px-3 py-1 mb-2 text-xs font-semibold text-[#8B4513] bg-white rounded-full">
                      {workshop.category}
                    </span>
                    <h3 className="text-white text-xl font-semibold mb-2">{workshop.title}</h3>
                    <p className="text-white/90 text-sm">{workshop.description}</p>
                    <button className="mt-4 px-4 py-2 text-sm font-medium text-white bg-[#8B4513]/90 hover:bg-[#8B4513] rounded-lg transition-colors duration-300">
                      En savoir plus
                    </button>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm p-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-lg font-bold text-[#8B4513]">{workshop.title}</h3>
                </div>
              </div>
            </SwiperSlide>
          ))}

          {/* Navigation personnalisée */}
          <div className="swiper-button-next hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white/80 hover:bg-white text-[#8B4513] shadow-lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <div className="swiper-button-prev hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white/80 hover:bg-white text-[#8B4513] shadow-lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </div>

          {/* Pagination personnalisée */}
          <div className="swiper-pagination !bottom-0"></div>
        </Swiper>
      </div>

      {/* Styles pour Swiper */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background-color: rgba(139, 69, 19, 0.3);
          transition: all 0.3s;
        }
        .swiper-pagination-bullet-active {
          background-color: #8B4513;
          width: 24px;
          border-radius: 6px;
        }
      `}</style>
    </section>
  )
}