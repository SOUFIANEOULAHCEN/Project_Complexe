// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from "./context/AuthContext";
import LoginPage from "./pages/authentification/LoginPage";
import DashboardUser from "./pages/Dashboards/DashboardUser";
import DashboardAdmin from "./pages/Dashboards/DashboardAdmin";
import DashboardSuperAdmin from "./pages/Dashboards/DashboardSuperAdmin";
import ForgotPassword from "./pages/authentification/ForgotPassword";
import ResetPassword from "./pages/authentification/ResetPassword";
import RegisterPage from "./pages/authentification/RegisterPage";
import { Toaster } from './pages/miniComponents/Toaster';
import UserSection from './pages/miniComponents/UserSection';
import SpaceSection from './pages/miniComponents/SpaceSection';
import ReservationSection from './pages/miniComponents/ReservationSection';
import CommentsSection from './pages/miniComponents/CommentsSection';
import DashboardContent from './pages/miniComponents/DashboardContent';
import ReportsSection from './pages/miniComponents/ReportsSection';
import mockData from './mockData.json';
import AtelierSection from './pages/miniComponents/AtelierSection';

const ProtectedRoute = ({ children, roles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.typeUser)) {
    return <Navigate to="/dashboard-admin" replace />;
  }

  return children;
};

// Layout pour le dashboard admin
const AdminLayout = () => {
  return (
    <ProtectedRoute roles={['admin', 'superadmin']}>
      <DashboardAdmin>
        <Outlet />
      </DashboardAdmin>
    </ProtectedRoute>
  );
};

// Layout pour le dashboard superadmin
const SuperAdminLayout = () => {
  return (
    <ProtectedRoute roles={['superadmin']}>
      <DashboardSuperAdmin>
        <Outlet />
      </DashboardSuperAdmin>
    </ProtectedRoute>
  );
};

// Layout pour le dashboard utilisateur
const UserLayout = () => {
  return (
    <ProtectedRoute roles={['user']}>
      <DashboardUser>
        <Outlet />
      </DashboardUser>
    </ProtectedRoute>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-background">
          <Routes>
            {/* Routes publiques */}
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Routes du dashboard admin */}
            <Route path="/dashboard-admin" element={<AdminLayout />}>
              <Route path="atelier" element={<AtelierSection />} />
              <Route path="users" element={<UserSection />} />
              <Route path="spaces" element={<SpaceSection />} />
              <Route path="reservations" element={<ReservationSection />} />
              <Route path="comments" element={<CommentsSection />} />
              <Route path="calendar" element={<div>Calendrier</div>} />
              <Route path="system" element={<div>Système</div>} />
              <Route path="reports" element={<ReportsSection />} />
            </Route>

            {/* Routes du dashboard superadmin */}
            <Route path="/dashboard-superadmin" element={<SuperAdminLayout />}>
              <Route index element={<div>Tableau de bord Super Admin</div>} />
              {/* Ajoutez ici les routes spécifiques au superadmin */}
            </Route>

            {/* Routes du dashboard utilisateur */}
            <Route path="/dashboard-user" element={<UserLayout />}>
              <Route index element={<div>Tableau de bord Utilisateur</div>} />
              {/* Ajoutez ici les routes spécifiques à l'utilisateur */}
            </Route>

            {/* Route par défaut */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
