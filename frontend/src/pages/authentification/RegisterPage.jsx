// src/pages/RegisterPage.jsx
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Modal from "@/components/Modal";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [typeUser] = useState("user");

  /* -------------------------------------------------------------------------- */
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  /* -------------------------------------------------------------------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        { nom, email, password, typeUser },
        { withCredentials: true }
      );

      if (response.status === 201) {
        setSuccess("Inscription réussie ! Veuillez vous connecter.");
      }
      if (response.status === 400) {
        setError("Tous les champs sont requis.");
      }
      if (response.status === 409) {
        setError("Utilisateur déjà inscrit.");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Erreur lors de l'inscription";
      setError(errorMessage);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-100">
      {error && (
        <Modal message={error} type="error" onClose={() => setError("")} />
      )}

      {success && (
        <Modal
          message={success}
          type="success"
          onClose={() => {
            setSuccess("");
            navigate("/login");
          }}
          
        />
      )}

      <div className="flex flex-col gap-6">
        <Card className="overflow-hidden p-0">
          <CardContent className="grid p-0 md:grid-cols-2 text-primary">
            <form onSubmit={handleSubmit} className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="text-center">
                  <h1 className="text-2xl font-bold">Créer un compte</h1>
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="name">Nom</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Jean Dupont"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    required
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="exemple@mail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  S'inscrire
                </Button>

                <div className="text-center text-sm">
                  Vous avez déjà un compte ?{" "}
                  <Link
                    to="/login"
                    className="underline underline-offset-4 text-primary hover:text-secondary/80"
                  >
                    Se connecter
                  </Link>
                </div>
              </div>
            </form>

            <div className="bg-muted relative hidden md:block">
              <img
                src="/placeholder.svg"
                alt="Illustration d'inscription"
                className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
