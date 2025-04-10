<<<<<<< HEAD
// src/App.js
import { BrowserRouter as Router, Routes, Route ,Navigate} from 'react-router-dom';
import SuperAdminLayout from './pages/Dashboards/superAdminDash/SuperAdminLayout';
import Dashboard from './pages/Dashboards/superAdminDash/Dashboard';
import Users from './pages/Dashboards/superAdminDash/Users';
import Events from './pages/Dashboards/superAdminDash/Events';
import Talents from './pages/Dashboards/superAdminDash/Talents';
import Media from './pages/Dashboards/superAdminDash/Media';
import Chatbot from './pages/Dashboards/superAdminDash/Chatbot';
import News from './pages/Dashboards/superAdminDash/News';
import System from './pages/Dashboards/superAdminDash/System';
import Reports from './pages/Dashboards/superAdminDash/Reports';
import Calendar from './pages/Dashboards/superAdminDash/Calendar';
import Workshops from './pages/Dashboards/superAdminDash/Workshops';
import Spaces from './pages/Dashboards/superAdminDash/Spaces';
import Reservations from './pages/Dashboards/superAdminDash/Reservations';
import Comments from './pages/Dashboards/superAdminDash/Comments';

function App() {
  return (
    <Router>
      <Routes>

      <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path='/' element={<SuperAdminLayout />}>'
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="events" element={<Events />} />
          <Route path="talents" element={<Talents />} />
          <Route path="media" element={<Media />} />
          <Route path="chatbot" element={<Chatbot />} />
          <Route path="news" element={<News />} />
          <Route path="system" element={<System />} />
          <Route path="reports" element={<Reports />} />
         
          <Route path="calendar" element={<Calendar />} />
          <Route path="workshops" element={<Workshops />} />
          <Route path="spaces" element={<Spaces />} />
          <Route path="reservations" element={<Reservations />} />
          <Route path="comments" element={<Comments />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
=======
// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import LoginPage from "./pages/authentification/LoginPage";
import DashboardUser from "./pages/Dashboards/DashboardUser";
import DashboardAdmin from "./pages/Dashboards/DashboardAdmin";
import DashboardSuperAdmin from "./pages/Dashboards/DashboardSuperAdmin";
import ForgotPassword from "./pages/authentification/ForgotPassword";
import ResetPassword from "./pages/authentification/ResetPassword";

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
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
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
>>>>>>> b03dd2b0c4201a5321cd90704e1d0ee4675f55b4
