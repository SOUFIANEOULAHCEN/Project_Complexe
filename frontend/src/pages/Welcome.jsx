import React from "react"
import { Sparkles } from "lucide-react"

export default function WelcomeScreen() {
  return (
    <div className="flex min-h-screen">
      {/* Left Side - Create Account Form */}
      <div className="w-1/2 p-8 flex flex-col">
        <div className="flex items-center gap-2 text-[#824B26] mb-8">
          <Sparkles className="h-5 w-5" />
          <h2 className="text-xl font-semibold">Creer un Compte</h2>
        </div>

        <form className="space-y-6 max-w-md">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#824B26] mb-2">
              Adresse e-mail
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border border-[#824B26] rounded-md focus:outline-none focus:ring-2 focus:ring-[#824B26]"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#824B26] mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border border-[#824B26] rounded-md focus:outline-none focus:ring-2 focus:ring-[#824B26]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#824B26] text-white py-2 px-4 rounded-md hover:bg-[#6e3d20] transition-colors"
          >
            Cree compte
          </button>
        </form>
      </div>

      {/* Right Side - Welcome Message */}
      <div className="w-1/2 relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/cultural-complex.jpg)`,
          }}
        >
          <div className="absolute inset-0 bg-[#824B26] bg-opacity-50" />
        </div>

        <div className="relative h-full flex flex-col items-center justify-center text-white p-8 text-center">
          <div className="flex gap-2 mb-4">
            <Sparkles className="h-6 w-6" />
            <Sparkles className="h-6 w-6" />
          </div>

          <h1 className="text-4xl font-bold mb-4">Bienvenue</h1>

          <p className="text-lg max-w-md">
            Au Complexe Culturel de Ouarzazate, votre porte d'entrée vers un voyage culturel unique
          </p>
        </div>
      </div>
    </div>
  )
}

