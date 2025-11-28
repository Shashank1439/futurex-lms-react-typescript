import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './services/authService';
import { ThemeProvider } from './components/ThemeContext';
import { ReviewProvider } from './services/reviewService';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CourseCatalog from './pages/CourseCatalog';
import LiveClassroom from './pages/LiveClassroom';
import About from './pages/About';
import Contact from './pages/Contact';

// Student
import StudentDashboard from './pages/student/StudentDashboard';
import StudentProfile from './pages/student/StudentProfile';
import StudentCourses from './pages/student/StudentCourses';
import StudentLMS from './pages/student/StudentLMS';
import StudentAnalytics from './pages/student/StudentAnalytics';
import StudentPayments from './pages/student/StudentPayments';
import InvoiceDetails from './pages/student/InvoiceDetails';
import AddPaymentMethod from './pages/student/AddPaymentMethod';
import Certificate from './pages/student/Certificate';
import StudentReviews from './pages/student/StudentReviews';

// Trainer
import TrainerDashboard from './pages/trainer/TrainerDashboard';
import TrainerBatches from './pages/trainer/TrainerBatches';
import TrainerMaterials from './pages/trainer/TrainerMaterials';
import SessionHistory from './pages/trainer/SessionHistory';

// Admin
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageCourses from './pages/admin/ManageCourses';
import ManageUsers from './pages/admin/ManageUsers';
import ManageReviews from './pages/admin/ManageReviews';
import TrainerReports from './pages/admin/TrainerReports';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ReviewProvider>
          <Router>
            <ScrollToTop />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/courses" element={<CourseCatalog />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<div className="p-10 text-center dark:text-white">FAQ Page Placeholder</div>} />
              <Route path="/terms" element={<div className="p-10 text-center dark:text-white">Terms of Service Placeholder</div>} />

              {/* Student Routes */}
              <Route path="/student/dashboard" element={<StudentDashboard />} />
              <Route path="/student/profile" element={<StudentProfile />} />
              <Route path="/student/courses" element={<StudentCourses />} />
              <Route path="/student/course/:courseId" element={<StudentLMS />} />
              <Route path="/student/analytics" element={<StudentAnalytics />} />
              <Route path="/student/reviews" element={<StudentReviews />} />
              <Route path="/student/payments" element={<StudentPayments />} />
              <Route path="/student/payment-methods/add" element={<AddPaymentMethod />} />
              <Route path="/student/invoice/:id" element={<InvoiceDetails />} />
              <Route path="/student/certificate/:courseId" element={<Certificate />} />
              <Route path="/student/*" element={<Navigate to="/student/dashboard" replace />} />
              
              {/* Trainer Routes */}
              <Route path="/trainer/dashboard" element={<TrainerDashboard />} />
              <Route path="/trainer/profile" element={<StudentProfile />} />
              <Route path="/trainer/batches" element={<TrainerBatches />} />
              <Route path="/trainer/materials" element={<TrainerMaterials />} />
              <Route path="/trainer/history" element={<SessionHistory />} />
              <Route path="/trainer/*" element={<Navigate to="/trainer/dashboard" replace />} />
              
              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/manage-courses" element={<ManageCourses />} />
              <Route path="/admin/users" element={<ManageUsers />} />
              <Route path="/admin/reviews" element={<ManageReviews />} />
              <Route path="/admin/reports" element={<TrainerReports />} />
              <Route path="/admin/*" element={<Navigate to="/admin/dashboard" replace />} />

              {/* Shared Interactive Routes */}
              <Route path="/classroom/:sessionId" element={<LiveClassroom />} />

              {/* Catch all */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </ReviewProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;