"use client"

import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay, EffectCoverflow } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/effect-coverflow"

const events = [
  {
    id: 1,
    image: "/assets/event1.jpg",
    title: "Festival Tizouran",
    date: "20-21 Octobre 2024",
    location: "Ouarzazate"
  },
  {
    id: 2,
    image: "/assets/event2.jpg",
    title: "Festival du Tapis",
    date: "15-20 Mai 2024",
    location: "Zagora"
  },
  {
    id: 3,
    image: "/assets/event3.jpg",
    title: "Festival Igrar",
    date: "8-10 Mai 2024",
    location: "Tinghir"
  },
  {
    id: 4,
    image: "/assets/event4.jpg",
    title: "Festival D'ahwach",
    date: "24-26 Septembre 2024",
    location: "Taroudant"
  },
  {
    id: 5,
    image: "/assets/event5.jpg",
    title: "Festival Ayeed Asgas",
    date: "13-15 Janvier 2024",
    location: "Errachidia"
  },
  {
    id: 6,
    image: "/assets/event3.jpg",
    title: "Festival du Tapish",
    date: "24-26 Septembre 2024",
    location: "Marrakech"
  },
  {
    id: 7,
    image: "/assets/event3.jpg",
    title: "Festival du Tapish",
    date: "24-26 Septembre 2024",
    location: "Marrakech"
  },
  {
    id: 8,
    image: "/assets/event3.jpg",
    title: "Festival du Tapish",
    date: "24-26 Septembre 2024",
    location: "Marrakech"
  },
  {
    id: 9,
    image: "/assets/event5.jpg",
    title: "Festival Ayeed Asgas",
    date: "13-15 Janvier 2024",
    location: "Errachidia"
  },

]

export default function EventSlider() {
  return (
    <>
    {/* Styles intégrés */}
    <style jsx global>{`
      .swiper-pagination-bullet {
        width: 0.75rem;
        height: 0.75rem;
        background-color: rgb(139, 69, 19);
        opacity: 0.3;
        transition: all 300ms;
      }
      .swiper-pagination-bullet-active {
        background-color: rgb(139, 69, 19);
        opacity: 1;
        width: 1.5rem;
        border-radius: 0.5rem;
      }
    `}</style>

    <section className="py-20 bg-gradient-to-b from-[#FDF8F5] to-[#F5E9DC]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-[#8B4513] mb-4">Nos Événements Culturels</h2>
          <p className="text-lg text-[#6B4D3D] max-w-2xl mx-auto">
            Découvrez les festivals qui célèbrent la richesse de notre patrimoine
          </p>
        </div>
        
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          spaceBetween={30}
          slidesPerView={1}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          pagination={{ 
            clickable: true,
            dynamicBullets: true
          }}
          autoplay={{ 
            delay: 4000,
            disableOnInteraction: false
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
            slideShadows: true,
          }}
          breakpoints={{
            640: { 
              slidesPerView: 2,
              coverflowEffect: {
                rotate: 5,
                stretch: 0,
                depth: 100,
                modifier: 1,
              }
            },
            1024: { 
              slidesPerView: 3,
              coverflowEffect: {
                rotate: 5,
                stretch: 0,
                depth: 100,
                modifier: 1,
              }
            },
          }}
          className="relative pb-16"
        >
          {events.map((event) => (
            <SwiperSlide key={event.id}>
              <div className="relative group cursor-pointer h-full">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-xl z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  className="w-full h-[450px] object-cover rounded-xl shadow-xl transition-all duration-500 group-hover:scale-95"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold text-[#8B4513] mb-1">{event.title}</h3>
                    <div className="flex items-center text-[#6B4D3D] text-sm">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="mr-3">{event.date}</span>
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}

          {/* Custom Navigation */}
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
        </Swiper>

        <div className="text-center mt-8">
          <button className="px-8 py-3 bg-[#8B4513] hover:bg-[#6B4D3D] text-white font-medium rounded-full shadow-md hover:shadow-lg transition-all duration-300">
            Voir tous les événements
          </button>
        </div>
      </div>
    </section>
    </>
  )
}