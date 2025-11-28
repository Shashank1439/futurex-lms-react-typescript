
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../services/authService';
import { UserRole } from '../types';
import * as Icons from '../components/Icons';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [role, setRole] = useState<UserRole>(UserRole.STUDENT);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, password, role);
    if (success) {
      if (role === UserRole.STUDENT) navigate('/student/dashboard');
      else if (role === UserRole.TRAINER) navigate('/trainer/dashboard');
      else if (role === UserRole.ADMIN) navigate('/admin/dashboard');
    } else {
      setError('Invalid email or password for the selected role.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center text-brand-600 mb-4 cursor-pointer" onClick={() => navigate('/')}>
           <Icons.BookOpen className="w-12 h-12" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to FutureX
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Welcome back! Please enter your details.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 animate-fade-in-up">
          
          {/* Role Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <button 
              onClick={() => { setRole(UserRole.STUDENT); setError(''); }}
              className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${role === UserRole.STUDENT ? 'border-brand-600 text-brand-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              Student
            </button>
            <button 
              onClick={() => { setRole(UserRole.TRAINER); setError(''); }}
              className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${role === UserRole.TRAINER ? 'border-brand-600 text-brand-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              Trainer
            </button>
            <button 
              onClick={() => { setRole(UserRole.ADMIN); setError(''); }}
              className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${role === UserRole.ADMIN ? 'border-brand-600 text-brand-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              Admin
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
             {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm flex items-center">
                <Icons.X className="w-4 h-4 mr-2" /> {error}
              </div>
             )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icons.MessageSquare className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="focus:ring-brand-500 focus:border-brand-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 border transition-colors"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icons.Shield className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="focus:ring-brand-500 focus:border-brand-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 border transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-colors"
            >
               Login as {role.charAt(0) + role.slice(1).toLowerCase()}
            </button>
          </form>

          {/* Demo Hint */}
          <div className="mt-6 p-3 bg-blue-50 text-blue-800 text-xs rounded border border-blue-100">
             <p className="font-bold mb-1">Demo Credentials:</p>
             {role === UserRole.STUDENT && <p>Email: alex@student.futurex.com</p>}
             {role === UserRole.TRAINER && <p>Email: sarah@trainer.futurex.com</p>}
             {role === UserRole.ADMIN && <p>Email: admin@futurex.com</p>}
             <p>Password: password</p>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  New to FutureX?
                </span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link to="/register" className="font-medium text-brand-600 hover:text-brand-500">
                Register as Student
              </Link>
            </div>
            
            <div className="mt-4 text-center">
               <button
                  onClick={() => navigate('/')}
                  className="text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  Back to Home
                </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
