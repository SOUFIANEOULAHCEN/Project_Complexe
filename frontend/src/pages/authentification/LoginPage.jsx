// src/pages/LoginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Modal from "@/components/Modal";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  /* -------------------------------------------------------------------------- */
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  /* -------------------------------------------------------------------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const decoded = await login(email, password);
      const { typeUser } = decoded;
      setSuccess("Connexion réussie ! Redirection en cours...");

      setTimeout(() => {
        if (typeUser === "admin") navigate("/dashboard-admin");
        else if (typeUser === "superadmin") navigate("/dashboard-superadmin");
        else navigate("/dashboard-user");
      }, 1500); // petite pause pour laisser le temps à l'utilisateur de voir le message
    } catch (err) {
      setError(err?.response?.data?.message || "Échec de la connexion");
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
            // Si tu veux naviguer manuellement sans délai ici
            // navigate("/dashboard/...");
          }}
        />
      )}
      <div className="flex flex-col gap-6">
        <Card className="overflow-hidden p-0">
          <CardContent className="grid p-0 md:grid-cols-2 text-primary">
            <form onSubmit={handleSubmit} className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold text-primary">
                    Bon retour parmi nous
                  </h1>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    type="email"
                    placeholder="m@exemple.com"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Mot de passe</Label>
                    <a
                      href="/forgot-password"
                      className="ml-auto text-sm underline-offset-2 hover:underline"
                    >
                      Mot de passe oublié ?
                    </a>
                  </div>
                  <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    type="password"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Connexion
                </Button>

                <div className="text-center text-sm">
                  Vous n'avez pas de compte ?{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/register")}
                    className="underline underline-offset-4 text-primary hover:text-secondary/80"
                  >
                    S'inscrire
                  </button>
                </div>
              </div>
            </form>
            <div className="bg-muted relative hidden md:block">
              <img
                src="/placeholder.svg"
                alt="Image"
                className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
