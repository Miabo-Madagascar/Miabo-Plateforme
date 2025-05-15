import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layouts
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StudentDashboard from './pages/dashboard/StudentDashboard';
import TutorDashboard from './pages/dashboard/TutorDashboard';
import ParentDashboard from './pages/dashboard/ParentDashboard';
import MatchingPage from './pages/MatchingPage';
import TestsPage from './pages/TestsPage';
import MessagingPage from './pages/MessagingPage';
import TutorTrainingPage from './pages/TutorTrainingPage';
import PlanningToolsPage from './pages/PlanningToolsPage';
import NotFoundPage from './pages/NotFoundPage';

// Context
import { UserProvider } from './context/UserContext';
import ProfilePage from './pages/ProfilePage';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
          <h2 className="mt-4 text-xl font-medium text-gray-700">Chargement...</h2>
        </div>
      </div>
    );
  }

  return (
    <UserProvider>
      <AnimatePresence mode="wait">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>

          {/* Protected dashboard routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="student" element={<StudentDashboard />} />
            <Route path="tutor" element={<TutorDashboard />} />
            <Route path="parent" element={<ParentDashboard />} />
            <Route path="matching" element={<MatchingPage />} />
            <Route path="tests" element={<TestsPage />} />
            <Route path="messaging" element={<MessagingPage />} />
            <Route path="training" element={<TutorTrainingPage />} />
            <Route path="planning" element={<PlanningToolsPage />} />
			<Route path="profile" element={<ProfilePage />} />
          </Route>

          {/* 404 route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AnimatePresence>
    </UserProvider>
  );
}

export default App;
