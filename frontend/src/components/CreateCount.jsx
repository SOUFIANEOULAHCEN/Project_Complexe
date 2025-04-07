export default function CreateCount() {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        {/* Conteneur principal */}
        <div className="flex w-11/12 max-w-4xl overflow-hidden rounded-lg shadow-lg">
          
  
          {/* Section de connexion */}
          <div className="flex-1 bg-white p-8">
            <h2 className="mb-6 text-2xl font-semibold text-[#8B4513] flex items-center gap-2">
               Créer un Compte
            </h2>
            <form>
              {/* Champ email */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Adresse e-mail
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 focus:border-[#8B4513] focus:ring-[#8B4513]"
                  placeholder="Entrez votre e-mail"
                />
              </div>
              {/* Champ mot de passe */}
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mot de passe
                </label>
                <input
                  type="password"
                  id="password"
                  className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 focus:border-[#8B4513] focus:ring-[#8B4513]"
                  placeholder="Entrez votre mot de passe"
                />
              </div>
              
              {/* Bouton de connexion */}
              <button
                type="submit"
                className="w-full rounded-md bg-[#8B4513] px-4 py-2 text-white hover:bg-[#713a10] transition"
              >
                Se connecter
              </button>
            </form>
          </div>

          {/* Section de bienvenue */}
          <div className="relative flex-1 bg-[#8B4513] text-white">
            {/* Image de fond */}
            <img
              src="/path-to-your-image.jpg"
              alt="Complexe Culturel"
              className="absolute inset-0 h-full w-full object-cover opacity-70"
            />
            {/* Contenu */}
            <div className="relative flex h-full flex-col items-center justify-center p-8">
              <h1 className="mb-4 text-3xl font-bold">Bienvenue</h1>
              <p className="text-center text-lg">
                Au Complexe Culturel de Ouarzazate, votre porte d’entrée vers un
                voyage culturel unique
              </p>
            </div>
          </div>

        </div>
      </div>
    );
  }
  