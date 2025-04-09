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