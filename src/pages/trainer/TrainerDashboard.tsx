import React from 'react';
import { DashboardLayout } from '../../components/Layout';
import * as Icons from '../../components/Icons';
import { MOCK_SESSIONS } from '../../constants';
import { useNavigate } from 'react-router-dom';

const TrainerDashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleInstantMeeting = () => {
    const sessionId = `instant-${Date.now()}`;
    navigate(`/classroom/${sessionId}`);
  };

  return (
    <DashboardLayout>
       <div className="space-y-8">
         <div className="flex flex-col md:flex-row justify-between items-center gap-4 animate-fade-in-up">
            <div>
               <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Trainer Dashboard</h1>
               <p className="text-gray-500 dark:text-gray-400">Manage your classes and students.</p>
            </div>
            <button 
               onClick={handleInstantMeeting}
               className="bg-brand-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-brand-700 flex items-center gap-2 shadow-md hover:scale-105 transition-transform"
            >
               <Icons.Video className="w-4 h-4" /> Start Instant Meeting
            </button>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in-up animate-delay-100">
            {/* Schedule */}
            <div className="lg:col-span-2 space-y-6">
               <h3 className="text-lg font-bold text-gray-900 dark:text-white">Today's Schedule</h3>
               <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700">
                  {MOCK_SESSIONS.map(session => (
                    <div key={session.id} className="p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                       <div className="flex items-start space-x-4">
                          <div className={`p-3 rounded-lg ${session.isLive ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-200' : 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200'}`}>
                             <Icons.Video className="w-6 h-6" />
                          </div>
                          <div>
                             <h4 className="font-bold text-gray-900 dark:text-white">{session.title}</h4>
                             <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center mt-1">
                                <Icons.Calendar className="w-3 h-3 mr-1" />
                                {new Date(session.startTime).toLocaleString()} • {session.durationMinutes} mins
                             </p>
                             {session.isLive && (
                                <span className="inline-block mt-2 px-2 py-0.5 rounded text-xs font-bold bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-200 animate-pulse">
                                  LIVE NOW
                                </span>
                             )}
                          </div>
                       </div>
                       <button 
                         onClick={() => navigate(`/classroom/${session.id}`)}
                         className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                           session.isLive 
                           ? 'bg-brand-600 text-white border-transparent hover:bg-brand-700 shadow-md' 
                           : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                         }`}
                       >
                          {session.isLive ? 'Join Class' : 'Prepare'}
                       </button>
                    </div>
                  ))}
                  {MOCK_SESSIONS.length === 0 && (
                     <div className="p-6 text-center text-gray-500 dark:text-gray-400">No classes scheduled for today.</div>
                  )}
               </div>
            </div>

            {/* Side Stats */}
            <div className="space-y-6">
               <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Pending Assignments</h3>
                  <div className="space-y-4">
                     {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center justify-between text-sm group cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded transition-colors">
                           <span className="text-gray-600 dark:text-gray-300">Assignment #{i} - React Basics</span>
                           <span className="font-bold text-brand-600 dark:text-brand-400 group-hover:underline">12 pending</span>
                        </div>
                     ))}
                  </div>
                  <button className="w-full mt-4 text-center text-brand-600 dark:text-brand-400 text-sm font-medium hover:underline">
                     View All Submissions
                  </button>
               </div>

               <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-xl text-white shadow-md transform transition hover:scale-105 duration-300">
                   <h3 className="font-bold mb-2">Upload Materials</h3>
                   <p className="text-sm opacity-90 mb-4">Share notes, PDFs, or recordings with your batch.</p>
                   <button 
                      onClick={() => navigate('/trainer/materials')}
                      className="w-full bg-white text-indigo-600 py-2 rounded-lg text-sm font-bold hover:bg-gray-100 transition-colors"
                   >
                      Go to Materials
                   </button>
               </div>
            </div>
         </div>
       </div>
    </DashboardLayout>
  );
};

export default TrainerDashboard;