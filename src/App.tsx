import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { HealthAnalysisPage } from './pages/HealthAnalysisPage';
import { DietPlansPage } from './pages/DietPlansPage';
import { ChatPage } from './pages/ChatPage';
import { ProfilePage } from './pages/ProfilePage';
import { ProjectInfoPage } from './pages/ProjectInfoPage';

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="health" element={<HealthAnalysisPage />} />
            <Route path="diet" element={<DietPlansPage />} />
            <Route path="chat" element={<ChatPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="project" element={<ProjectInfoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
