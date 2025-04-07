export default function About() {
  return (
    <section className="py-20 bg-gradient-to-b from-[#F9F5F0] to-[#F0E6D8]">
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .floating-image {
          animation: float 6s ease-in-out infinite;
        }
        .text-shadow {
          text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
        }
      `}</style>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Texte avec animation */}
          <div className="lg:w-1/2 space-y-8">
            <h2 className="text-4xl md:text-5xl font-serif text-[#8B4513] text-shadow">
              Complexe Culturel
              <br />
              <span className="text-[#6B4D3D]">OUARZAZATE</span>
            </h2>
            
            <div className="space-y-6">
              <p className="text-[#6B4D3D] text-lg leading-relaxed transition-all duration-500 hover:bg-white/50 hover:p-4 hover:rounded-xl">
                Le Complexe Culturel de Ouarzazate valorise la culture et les talents locaux en accueillant divers 
                événements artistiques et culturels. Pour répondre à l'évolution des besoins, il adopte un système 
                numérique pour moderniser la gestion, améliorer la visibilité et renforcer la participation citoyenne.
              </p>
              
              <p className="text-[#6B4D3D] text-lg leading-relaxed transition-all duration-500 hover:bg-white/50 hover:p-4 hover:rounded-xl">
                Ce lieu emblématique aspire à devenir un espace de rencontre et d'échange, favorisant la créativité 
                et l'engagement communautaire à travers des programmes innovants.
              </p>
            </div>

            <button className="relative overflow-hidden px-8 py-3 bg-[#8B4513] text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group">
              <span className="relative z-10 flex items-center">
                Découvrir notre histoire
                <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" 
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
              <span className="absolute inset-0 bg-[#6B4D3D] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></span>
            </button>
          </div>

          {/* Images avec effets */}
          <div className="lg:w-1/2 grid grid-cols-2 gap-6 relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500">
              <img
                src="/assets/atelier-theater.jpg"
                alt="Atelier Théâtre"
                loading="lazy"
                className="w-full h-[400px] object-cover transition-transform duration-700 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                <span className="text-white text-lg font-medium translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  Atelier Théâtre
                </span>
              </div>
            </div>
            
            <div className="relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 floating-image">
              <img
                src="/assets/library.jpg"
                alt="Bibliothèque Culturelle"
                loading="lazy"
                className="w-full h-[400px] object-cover transition-transform duration-700 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                <span className="text-white text-lg font-medium translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  Bibliothèque
                </span>
              </div>
            </div>
            
            {/* Élément décoratif */}
            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-[#8B4513]/20 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  )
}