
import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Lazy loading des composants
const Header = lazy(() => import("./components/Header"));
const Slider = lazy(() => import("./components/Slider"));
const EventSlider = lazy(() => import("./components/EventSlider"));
const About = lazy(() => import("./components/About"));
const WorkshopSlider = lazy(() => import("./components/WorkshopSlider"));
const Gallery = lazy(() => import("./components/Gallery"));
const Footer = lazy(() => import("./components/Footer"));
const Connexion = lazy(() => import("./pages/Connexion"));
const Inscription = lazy(() => import("./pages/Inscription"));
const ReservationPage = lazy(() => import("./pages/ReservationPage"));
const CalendarPage = lazy(() => import("./pages/CalendarPage"));
const Atelier = lazy(() => import("./pages/Atelier"));
const Contact = lazy(() => import("./components/Contact"));
const CCO = lazy(() => import("./pages/CCO"));
const Evenements = lazy(() => import("./pages/Evenements"));
const Espaces = lazy(() => import("./pages/Espaces"));
const Bibliotheque = lazy(() => import("./pages/Bibliotheque"));

// Page d'accueil
function Home() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Slider />
      <EventSlider />
      <About />
      <WorkshopSlider />
      <Gallery />
      <Footer />
    </Suspense>
  );
}

// Composant de chargement animé avec DaisyUI
function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-screen">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );
}

// Page 404
function NotFound() {
  return (
    <div className="text-center py-16">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-gray-600 mt-4">Page non trouvée</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="font-sans">
        {/* Routes principales */}
        <Routes>
          

          {/* Routes avec Header */}
          <Route
            path="/*"
            element={
              <>
                <Suspense fallback={<LoadingSpinner />}>
                  <Header />
                </Suspense>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/Acceuil" element={<Home />} />
                  <Route
                    path="/CCO"
                    element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <CCO />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/Espaces"
                    element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <Espaces />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/Evenements"
                    element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <Evenements />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/Ateliers"
                    element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <Atelier />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/Contact"
                    element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <Contact />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/connexion"
                    element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <Connexion />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/inscription"
                    element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <Inscription />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/reservation"
                    element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <ReservationPage />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/calendar"
                    element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <CalendarPage />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/Bibliotheque"
                    element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <Bibliotheque />
                      </Suspense>
                    }
                  />
                  {/* Fallback Route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;