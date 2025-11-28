
import React, { useState } from 'react';
import { DashboardLayout } from '../../components/Layout';
import * as Icons from '../../components/Icons';
import { useAuth } from '../../services/authService';

const ManageUsers: React.FC = () => {
  const { getAllUsers, createTrainer } = useAuth();
  const users = getAllUsers();
  
  const [showModal, setShowModal] = useState(false);
  const [newTrainer, setNewTrainer] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleCreateTrainer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTrainer.name || !newTrainer.email || !newTrainer.password) return;
    
    // Pass password to the service
    createTrainer(newTrainer.name, newTrainer.email, newTrainer.password);
    
    setShowModal(false);
    setNewTrainer({ name: '', email: '', password: '' });
    setMessage('Trainer account created successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center animate-fade-in-up">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Users</h1>
            <p className="text-gray-500 dark:text-gray-400">View and manage student and trainer accounts.</p>
          </div>
          <div className="flex space-x-2">
            <button className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center transition-colors">
               <Icons.Filter className="w-5 h-5 mr-2" /> Filter
            </button>
            <button 
              onClick={() => setShowModal(true)}
              className="bg-brand-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-brand-700 flex items-center shadow-lg transition-transform hover:scale-105"
            >
              <Icons.Plus className="w-5 h-5 mr-2" /> Add Trainer
            </button>
          </div>
        </div>

        {message && (
          <div className="bg-green-100 dark:bg-green-900 border border-green-200 dark:border-green-700 text-green-700 dark:text-green-100 px-4 py-3 rounded animate-fade-in-up">
            <div className="flex items-center">
               <Icons.CheckCircle className="w-5 h-5 mr-2" />
               {message}
            </div>
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden animate-fade-in-up animate-delay-100">
           <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
             <thead className="bg-gray-50 dark:bg-gray-900">
               <tr>
                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">User</th>
                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Role</th>
                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Phone</th>
                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                 <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
               </tr>
             </thead>
             <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
               {users.map((user, idx) => (
                 <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                   <td className="px-6 py-4 whitespace-nowrap">
                     <div className="flex items-center">
                       <div className="h-10 w-10 flex-shrink-0">
                         <img className="h-10 w-10 rounded-full object-cover" src={user.avatarUrl} alt="" />
                       </div>
                       <div className="ml-4">
                         <div className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</div>
                         <div className="text-xs text-gray-500 dark:text-gray-400">{user.email}</div>
                       </div>
                     </div>
                   </td>
                   <td className="px-6 py-4 whitespace-nowrap">
                     <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                       user.role === 'ADMIN' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' : 
                       user.role === 'TRAINER' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                     }`}>
                       {user.role}
                     </span>
                   </td>
                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{user.phone || 'N/A'}</td>
                   <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                       Active
                      </span>
                   </td>
                   <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                     <button className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
                        <Icons.Settings className="w-5 h-5" />
                     </button>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
        </div>

        {/* Add Trainer Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm animate-fade-in-up">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
               <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900">
                 <h3 className="text-lg font-bold text-gray-900 dark:text-white">Create New Trainer</h3>
                 <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-white">
                    <Icons.X className="w-5 h-5" />
                 </button>
               </div>
               <form onSubmit={handleCreateTrainer} className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={newTrainer.name}
                      onChange={e => setNewTrainer({...newTrainer, name: e.target.value})}
                      className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-brand-500 focus:ring-brand-500 py-2 px-3 border"
                      placeholder="Jane Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={newTrainer.email}
                      onChange={e => setNewTrainer({...newTrainer, email: e.target.value})}
                      className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-brand-500 focus:ring-brand-500 py-2 px-3 border"
                      placeholder="trainer@futurex.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Initial Password</label>
                    <input 
                      type="password" 
                      required
                      value={newTrainer.password}
                      onChange={e => setNewTrainer({...newTrainer, password: e.target.value})}
                      className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-brand-500 focus:ring-brand-500 py-2 px-3 border"
                      placeholder="••••••••"
                    />
                  </div>
                  <div className="pt-2">
                    <button 
                      type="submit" 
                      className="w-full bg-brand-600 text-white py-2 rounded-lg font-medium hover:bg-brand-700 shadow-md"
                    >
                      Create Account
                    </button>
                  </div>
               </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ManageUsers;
