// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import LoginPage from "./pages/authentification/LoginPage";
import DashboardUser from "./pages/Dashboards/DashboardUser";
import DashboardAdmin from "./pages/Dashboards/DashboardAdmin";
import DashboardSuperAdmin from "./pages/Dashboards/DashboardSuperAdmin";

const ProtectedRoute = ({ children, roles }) => {
  const { user } = useAuth(); //useContext(AuthContext);
  if (!user) return <Navigate to="/login" />;
  if (!roles.includes(user.typeUser)) return <Navigate to="/" />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard/user"
            element={
              <ProtectedRoute roles={["user"]}>
                <DashboardUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/admin"
            element={
              <ProtectedRoute roles={["admin"]}>
                <DashboardAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/superadmin"
            element={
              <ProtectedRoute roles={["superadmin"]}>
                <DashboardSuperAdmin />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
