import React from 'react';
import { DashboardLayout } from '../../components/Layout';
import * as Icons from '../../components/Icons';
import { MOCK_SESSIONS, MOCK_COURSES } from '../../constants';
import { useAuth } from '../../services/authService';

const SessionHistory: React.FC = () => {
  const { user } = useAuth();
  
  // Find courses taught by this trainer
  const myCourseIds = MOCK_COURSES.filter(c => c.instructorName === user?.name).map(c => c.id);
  
  // Find sessions for those courses
  const mySessions = MOCK_SESSIONS.filter(s => myCourseIds.includes(s.courseId))
    .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime()); // Sort desc

  const getCourseName = (id: string) => MOCK_COURSES.find(c => c.id === id)?.title || 'Unknown Course';

  const isPast = (dateStr: string) => new Date(dateStr) < new Date();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="animate-fade-in-up">
          <h1 className="text-2xl font-bold text-gray-900">Class History & Attendance</h1>
          <p className="text-gray-500">Record of sessions you have conducted.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up animate-delay-100">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
             <div className="flex items-center">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-lg mr-4">
                   <Icons.Video className="w-6 h-6" />
                </div>
                <div>
                   <p className="text-sm text-gray-500">Total Sessions</p>
                   <p className="text-2xl font-bold">{mySessions.length}</p>
                </div>
             </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
             <div className="flex items-center">
                <div className="p-3 bg-green-100 text-green-600 rounded-lg mr-4">
                   <Icons.Clock className="w-6 h-6" />
                </div>
                <div>
                   <p className="text-sm text-gray-500">Hours Taught</p>
                   <p className="text-2xl font-bold">
                     {(mySessions.reduce((acc, curr) => acc + curr.durationMinutes, 0) / 60).toFixed(1)} hrs
                   </p>
                </div>
             </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
             <div className="flex items-center">
                <div className="p-3 bg-purple-100 text-purple-600 rounded-lg mr-4">
                   <Icons.Users className="w-6 h-6" />
                </div>
                <div>
                   <p className="text-sm text-gray-500">Active Batches</p>
                   <p className="text-2xl font-bold">{myCourseIds.length}</p>
                </div>
             </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-fade-in-up animate-delay-200">
           <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h3 className="font-bold text-gray-900">Session Log</h3>
           </div>
           <div className="overflow-x-auto">
             <table className="min-w-full divide-y divide-gray-200">
               <thead className="bg-white">
                 <tr>
                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Session Title</th>
                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                 </tr>
               </thead>
               <tbody className="bg-white divide-y divide-gray-200">
                 {mySessions.map((session) => {
                   const past = isPast(session.startTime);
                   return (
                     <tr key={session.id} className="hover:bg-gray-50">
                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(session.startTime).toLocaleDateString()} <br/>
                          <span className="text-gray-500 text-xs">{new Date(session.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                       </td>
                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{session.title}</td>
                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{getCourseName(session.courseId)}</td>
                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{session.durationMinutes} mins</td>
                       <td className="px-6 py-4 whitespace-nowrap">
                          {session.isLive ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 animate-pulse">
                              Live Now
                            </span>
                          ) : past ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Completed
                            </span>
                          ) : (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              Scheduled
                            </span>
                          )}
                       </td>
                     </tr>
                   );
                 })}
                 {mySessions.length === 0 && (
                   <tr>
                     <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No session history found.</td>
                   </tr>
                 )}
               </tbody>
             </table>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SessionHistory;