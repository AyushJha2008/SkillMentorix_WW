import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AITutorChat from './pages/ai-tutor-chat';
import UserDashboard from './pages/user-dashboard';
import ThreadDiscussion from './pages/thread-discussion';
import CommunityForum from './pages/community-forum';
import QuizInterface from './pages/quiz-interface';
import ProgressAnalytics from './pages/progress-analytics';
import LoginScreen from './pages/login-screen';
import RegisterScreen from './pages/register-screen';
import UserProfileSettings from './pages/user-profie-setting/index.jsx';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AITutorChat />} />
        <Route path="/ai-tutor-chat" element={<AITutorChat />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/thread-discussion" element={<ThreadDiscussion />} />
        <Route path="/community-forum" element={<CommunityForum />} />
        <Route path="/quiz-interface" element={<QuizInterface />} />
        <Route path="/progress-analytics" element={<ProgressAnalytics />} />
        <Route path="/login-screen" element={<LoginScreen />} />
        <Route path="/register-screen" element={<RegisterScreen />} />
        <Route path="/user-profile-settings" element={<UserProfileSettings />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;