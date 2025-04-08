import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";

const Slider = () => {
  return (
    <>
    {/* Styles inline */}
    <style jsx global>{`
      .swiper-pagination-bullet {
        width: 0.75rem;
        height: 0.75rem;
        background-color: rgba(255, 255, 255, 0.5);
        transition: all 300ms;
      }
      .swiper-pagination-bullet-active {
        background-color: #D4A017;
        width: 1.5rem;
        opacity: 1;
        border-radius: 0.5rem;
      }
    `}</style>

    <Swiper
      modules={[Navigation, Pagination, Autoplay, EffectFade]}
      spaceBetween={0}
      slidesPerView={1}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }}
      pagination={{ 
        clickable: true,
        el: '.swiper-pagination',
        type: 'bullets',
        bulletClass: 'swiper-pagination-bullet',
        bulletActiveClass: 'swiper-pagination-bullet-active'
      }}
      autoplay={{ 
        delay: 5000,
        disableOnInteraction: false
      }}
      effect="fade"
      fadeEffect={{
        crossFade: true
      }}
      speed={1000}
      loop={true}
      className="h-[700px] relative group"
    >
      {/* Custom Navigation Arrows */}
      <div className="swiper-button-next hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white bg-opacity-30 hover:bg-opacity-50 transition-all duration-300 group-hover:opacity-100 opacity-0">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
      <div className="swiper-button-prev hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white bg-opacity-30 hover:bg-opacity-50 transition-all duration-300 group-hover:opacity-100 opacity-0">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </div>

      {/* Custom Pagination */}
      <div className="swiper-pagination !bottom-8"></div>

      {/* Slide 1 */}
      <SwiperSlide className="relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70 z-10"></div>
        <img 
          src="/src/assets/theater3.jpg" 
          alt="Slide 1" 
          className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out swiper-lazy"
          loading="lazy"
        />
        <div className="absolute inset-0 flex items-center justify-center flex-col text-center text-white p-6 z-20">
          <div className="max-w-4xl space-y-6 transform transition-all duration-700 translate-y-8 opacity-0 swiper-slide-active:translate-y-0 swiper-slide-active:opacity-100">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-shadow-lg">
              Complexe Culturel <span className="text-[#D4A017]">de Ouarzazate</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto opacity-90">
              Un espace dédié à la culture et aux arts vivants
            </p>
            <button
              className="px-8 py-3 bg-[#D4A017] hover:bg-[#c1910e] text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 mt-6 transform hover:scale-105"
              onClick={() => alert('Réservation en cours...')}
            >
              Réserver maintenant
              <svg className="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </SwiperSlide>
      
      {/* Slide 2 */}
      <SwiperSlide className="relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70 z-10"></div>
        <img 
          src="/src/assets/atelier-theater.jpg" 
          alt="Slide 2" 
          className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out swiper-lazy"
          loading="lazy"
        />
        <div className="absolute inset-0 flex items-center justify-center flex-col text-center text-white p-6 z-20">
          <div className="max-w-4xl space-y-6 transform transition-all duration-700 translate-y-8 opacity-0 swiper-slide-active:translate-y-0 swiper-slide-active:opacity-100">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-shadow-lg">
              Ateliers <span className="text-[#D4A017]">Créatifs</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto opacity-90">
              Découvrez nos programmes de formation et d'expression artistique
            </p>
            <button
              className="px-8 py-3 bg-[#D4A017] hover:bg-[#c1910e] text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 mt-6 transform hover:scale-105"
              onClick={() => alert('Réservation en cours...')}
            >
              Voir les ateliers
              <svg className="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </SwiperSlide>
      
      {/* Slide 3 */}
      <SwiperSlide className="relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70 z-10"></div>
        <img 
          src="/src/assets/theater5.jpg" 
          alt="Slide 3" 
          className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out swiper-lazy"
          loading="lazy"
        />
        <div className="absolute inset-0 flex items-center justify-center flex-col text-center text-white p-6 z-20">
          <div className="max-w-4xl space-y-6 transform transition-all duration-700 translate-y-8 opacity-0 swiper-slide-active:translate-y-0 swiper-slide-active:opacity-100">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-shadow-lg">
              Événements <span className="text-[#D4A017]">Culturels</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto opacity-90">
              Une programmation riche et diversifiée toute l'année
            </p>
            <button
              className="px-8 py-3 bg-[#D4A017] hover:bg-[#c1910e] text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 mt-6 transform hover:scale-105"
              onClick={() => alert('Réservation en cours...')}
            >
              Voir le calendrier
              <svg className="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
    
    </>
    
  );
};

export default Slider;