import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../services/authService';
import { useTheme } from './ThemeContext';
import { UserRole } from '../types';
import * as Icons from './Icons';

// --- Components ---

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  active: boolean;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, to, active, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
      active
        ? 'bg-brand-600 text-white shadow-md'
        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
    }`}
  >
    <Icon className="w-5 h-5" />
    <span className="font-medium">{label}</span>
  </Link>
);

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors focus:outline-none"
      title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
    >
      {theme === 'light' ? <Icons.Moon className="w-5 h-5" /> : <Icons.Sun className="w-5 h-5" />}
    </button>
  );
};

export const BackBar: React.FC<{ className?: string }> = ({ className = '' }) => {
  const navigate = useNavigate();
  return (
    <div className={`mb-4 animate-fade-in-up ${className}`}>
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors group cursor-pointer"
        >
          <div className="p-2 rounded-full group-hover:bg-gray-100 dark:group-hover:bg-gray-700 mr-2 transition-colors">
             <Icons.ArrowRight className="w-5 h-5 transform rotate-180" />
          </div>
          <span className="font-medium text-sm">Back</span>
        </button>
      </div>
  );
};

export const PublicNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const handleDashboardRedirect = () => {
    if (!user) return;
    switch (user.role) {
      case UserRole.STUDENT: navigate('/student/dashboard'); break;
      case UserRole.TRAINER: navigate('/trainer/dashboard'); break;
      case UserRole.ADMIN: navigate('/admin/dashboard'); break;
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-brand-700 dark:text-brand-400">Future<span className="text-brand-500">X</span></span>
            </div>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link to="/" className="text-gray-900 dark:text-gray-200 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-brand-500 text-sm font-medium cursor-pointer transition-colors">Home</Link>
              <Link to="/courses" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-brand-500 text-sm font-medium cursor-pointer transition-colors">Courses</Link>
              <Link to="/about" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-brand-500 text-sm font-medium cursor-pointer transition-colors">About</Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            {isAuthenticated ? (
              <button
                onClick={handleDashboardRedirect}
                className="bg-brand-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-brand-700 transition shadow-sm"
              >
                Go to Dashboard
              </button>
            ) : (
              <div className="flex items-center space-x-3">
                 <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 font-medium text-sm transition-colors cursor-pointer">
                   Login
                 </Link>
                 <Link to="/register" className="bg-brand-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-brand-700 transition shadow-sm hover:shadow cursor-pointer">
                   Register
                 </Link>
              </div>
            )}
          </div>
          <div className="-mr-2 flex items-center md:hidden space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
            >
              {isOpen ? <Icons.X className="h-6 w-6" /> : <Icons.Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="pt-2 pb-3 space-y-1 px-4">
            <Link to="/" className="block text-base font-medium text-gray-700 dark:text-gray-200 hover:text-brand-600 hover:bg-gray-50 dark:hover:bg-gray-700 px-3 py-2 rounded-md cursor-pointer">Home</Link>
            <Link to="/courses" className="block text-base font-medium text-gray-700 dark:text-gray-200 hover:text-brand-600 hover:bg-gray-50 dark:hover:bg-gray-700 px-3 py-2 rounded-md cursor-pointer">Courses</Link>
            <Link to="/about" className="block text-base font-medium text-gray-700 dark:text-gray-200 hover:text-brand-600 hover:bg-gray-50 dark:hover:bg-gray-700 px-3 py-2 rounded-md cursor-pointer">About</Link>
            {!isAuthenticated && (
              <>
                <Link to="/login" className="block text-base font-medium text-gray-700 dark:text-gray-200 hover:text-brand-600 hover:bg-gray-50 dark:hover:bg-gray-700 px-3 py-2 rounded-md cursor-pointer">Login</Link>
                <Link to="/register" className="block text-base font-medium text-brand-600 dark:text-brand-400 hover:bg-gray-50 dark:hover:bg-gray-700 px-3 py-2 rounded-md cursor-pointer">Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const role = user.role;
  const basePath = role === UserRole.STUDENT ? '/student' : role === UserRole.TRAINER ? '/trainer' : '/admin';

  const getLinks = () => {
    if (role === UserRole.STUDENT) {
      return [
        { label: 'Dashboard', to: `${basePath}/dashboard`, icon: Icons.LayoutDashboard },
        { label: 'My Courses', to: `${basePath}/courses`, icon: Icons.BookOpen },
        { label: 'Analytics', to: `${basePath}/analytics`, icon: Icons.BarChart },
        { label: 'Reviews', to: `${basePath}/reviews`, icon: Icons.Star },
        { label: 'Profile', to: `${basePath}/profile`, icon: Icons.User },
        { label: 'Payments', to: `${basePath}/payments`, icon: Icons.CreditCard },
      ];
    } else if (role === UserRole.TRAINER) {
      return [
        { label: 'Dashboard', to: `${basePath}/dashboard`, icon: Icons.LayoutDashboard },
        { label: 'My Batches', to: `${basePath}/batches`, icon: Icons.Users },
        { label: 'Class History', to: `${basePath}/history`, icon: Icons.Clock },
        { label: 'Materials', to: `${basePath}/materials`, icon: Icons.FileText },
      ];
    } else {
      return [
        { label: 'Dashboard', to: `${basePath}/dashboard`, icon: Icons.LayoutDashboard },
        { label: 'Courses', to: `${basePath}/manage-courses`, icon: Icons.BookOpen },
        { label: 'Users', to: `${basePath}/users`, icon: Icons.Users },
        { label: 'Reviews', to: `${basePath}/reviews`, icon: Icons.MessageSquare },
        { label: 'Reports', to: `${basePath}/reports`, icon: Icons.FileText },
      ];
    }
  };

  const links = getLinks();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex transition-colors duration-200">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 fixed h-full z-10 transition-colors duration-200">
        <div className="flex items-center justify-between h-16 border-b border-gray-200 dark:border-gray-700 px-4">
           <span className="text-2xl font-bold text-brand-700 dark:text-brand-400 cursor-pointer" onClick={() => navigate('/')}>Future<span className="text-brand-500">X</span></span>
           <ThemeToggle />
        </div>
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {links.map((link) => (
            <SidebarItem
              key={link.to}
              {...link}
              active={location.pathname === link.to}
            />
          ))}
        </div>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center mb-4">
            <img src={user.avatarUrl} alt="User" className="h-8 w-8 rounded-full mr-3 object-cover" />
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{user.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user.role.toLowerCase()}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <Icons.LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-20 flex justify-between items-center px-4 h-16 transition-colors duration-200">
         <span className="text-xl font-bold text-brand-700 dark:text-brand-400 cursor-pointer" onClick={() => navigate('/')}>Future<span className="text-brand-500">X</span></span>
         <div className="flex items-center space-x-2">
           <ThemeToggle />
           <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-700 dark:text-gray-200">
             {mobileMenuOpen ? <Icons.X /> : <Icons.Menu />}
           </button>
         </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-white dark:bg-gray-800 z-30 pt-20 px-4 md:hidden">
          <div className="space-y-2">
            {links.map((link) => (
              <SidebarItem
                key={link.to}
                {...link}
                active={location.pathname === link.to}
                onClick={() => setMobileMenuOpen(false)}
              />
            ))}
             <button
              onClick={() => { logout(); setMobileMenuOpen(false); }}
              className="w-full flex items-center space-x-3 px-4 py-3 text-red-600"
            >
              <Icons.LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 md:ml-64 pt-16 md:pt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-gray-900 dark:text-gray-100">
          <BackBar />
          {children}
        </div>
      </main>
    </div>
  );
};