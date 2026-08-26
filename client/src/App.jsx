import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';

// Common Components
import HeaderBanner from './components/common/HeaderBanner';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ProtectedRoute from './components/common/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CitizenDashboard from './pages/CitizenDashboard';
import SchemesList from './pages/SchemesList';
import SchemeDetail from './pages/SchemeDetail';
import RecommendationEngine from './pages/RecommendationEngine';
import EligibilityWizard from './pages/EligibilityWizard';
import ApplyScheme from './pages/ApplyScheme';
import ApplicationTrack from './pages/ApplicationTrack';
import OfficerDashboard from './pages/OfficerDashboard';
import ApplicationVerify from './pages/ApplicationVerify';
import AdminDashboard from './pages/AdminDashboard';
import AdminSchemeManage from './pages/AdminSchemeManage';
import GrievancePortal from './pages/GrievancePortal';
import ServiceLocator from './pages/ServiceLocator';
import ProfileSettings from './pages/ProfileSettings';

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <HeaderBanner />
            <Navbar />

            <main className="flex-1">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/schemes" element={<SchemesList />} />
                <Route path="/schemes/:id" element={<SchemeDetail />} />
                <Route path="/recommendations" element={<RecommendationEngine />} />
                <Route path="/eligibility-checker" element={<EligibilityWizard />} />
                <Route path="/service-locator" element={<ServiceLocator />} />

                {/* Citizen Routes */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute allowedRoles={['CITIZEN']}>
                      <CitizenDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/apply/:schemeId"
                  element={
                    <ProtectedRoute allowedRoles={['CITIZEN']}>
                      <ApplyScheme />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute allowedRoles={['CITIZEN']}>
                      <ProfileSettings />
                    </ProtectedRoute>
                  }
                />

                {/* Shared Citizen & Officer Routes */}
                <Route
                  path="/applications/:id"
                  element={
                    <ProtectedRoute allowedRoles={['CITIZEN', 'OFFICER', 'ADMIN']}>
                      <ApplicationTrack />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/grievances"
                  element={
                    <ProtectedRoute allowedRoles={['CITIZEN', 'OFFICER', 'ADMIN']}>
                      <GrievancePortal />
                    </ProtectedRoute>
                  }
                />

                {/* Officer Portal Routes */}
                <Route
                  path="/officer-portal"
                  element={
                    <ProtectedRoute allowedRoles={['OFFICER', 'ADMIN']}>
                      <OfficerDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/officer/verify/:id"
                  element={
                    <ProtectedRoute allowedRoles={['OFFICER', 'ADMIN']}>
                      <ApplicationVerify />
                    </ProtectedRoute>
                  }
                />

                {/* Admin Portal Routes */}
                <Route
                  path="/admin-portal"
                  element={
                    <ProtectedRoute allowedRoles={['ADMIN']}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/schemes"
                  element={
                    <ProtectedRoute allowedRoles={['ADMIN']}>
                      <AdminSchemeManage />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>

            <Footer />
          </div>
        </Router>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
