import React, { useState } from 'react';
import { DashboardLayout } from '../../components/Layout';
import * as Icons from '../../components/Icons';
import { useAuth } from '../../services/authService';
import { MOCK_COURSES, MOCK_SESSIONS } from '../../constants';
import { UserRole } from '../../types';

const TrainerReports: React.FC = () => {
  const { getAllUsers } = useAuth();
  const trainers = getAllUsers().filter(u => u.role === UserRole.TRAINER);
  const [selectedTrainerId, setSelectedTrainerId] = useState<string | null>(null);

  // Helper to get stats for a trainer
  const getTrainerStats = (trainerName: string) => {
    const courses = MOCK_COURSES.filter(c => c.instructorName === trainerName);
    const totalStudents = courses.reduce((sum, c) => sum + c.studentsEnrolled, 0);
    const courseIds = courses.map(c => c.id);
    const sessions = MOCK_SESSIONS.filter(s => courseIds.includes(s.courseId));
    const completedSessions = sessions.filter(s => new Date(s.startTime) < new Date());
    
    return {
      coursesCount: courses.length,
      studentsCount: totalStudents,
      sessionsCount: completedSessions.length,
      sessionsList: sessions
    };
  };

  const selectedTrainer = trainers.find(t => t.id === selectedTrainerId);
  const selectedStats = selectedTrainer ? getTrainerStats(selectedTrainer.name) : null;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="animate-fade-in-up">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Trainer Attendance & Reports</h1>
          <p className="text-gray-500 dark:text-gray-400">Monitor trainer performance, student allocation, and session delivery.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Trainer List */}
          <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden animate-fade-in-up animate-delay-100 h-fit">
             <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
               <h3 className="font-bold text-gray-900 dark:text-white">Trainers ({trainers.length})</h3>
             </div>
             <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-[600px] overflow-y-auto">
                {trainers.map(trainer => {
                  const stats = getTrainerStats(trainer.name);
                  return (
                    <button 
                      key={trainer.id}
                      onClick={() => setSelectedTrainerId(trainer.id)}
                      className={`w-full text-left p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-between ${selectedTrainerId === trainer.id ? 'bg-brand-50 dark:bg-brand-900/30 border-l-4 border-brand-600' : ''}`}
                    >
                       <div className="flex items-center">
                          <img src={trainer.avatarUrl} alt={trainer.name} className="w-10 h-10 rounded-full mr-3 object-cover" />
                          <div>
                             <p className="font-medium text-gray-900 dark:text-white">{trainer.name}</p>
                             <p className="text-xs text-gray-500 dark:text-gray-400">{stats.coursesCount} Courses • {stats.studentsCount} Students</p>
                          </div>
                       </div>
                       <Icons.ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>
                  );
                })}
             </div>
          </div>

          {/* Details View */}
          <div className="lg:col-span-2 space-y-6 animate-fade-in-up animate-delay-200">
             {selectedTrainer && selectedStats ? (
               <>
                 {/* Summary Cards */}
                 <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 text-center">
                       <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold">Total Students</p>
                       <p className="text-2xl font-bold text-brand-600 dark:text-brand-400">{selectedStats.studentsCount}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 text-center">
                       <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold">Active Courses</p>
                       <p className="text-2xl font-bold text-brand-600 dark:text-brand-400">{selectedStats.coursesCount}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 text-center">
                       <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold">Sessions Conducted</p>
                       <p className="text-2xl font-bold text-brand-600 dark:text-brand-400">{selectedStats.sessionsCount}</p>
                    </div>
                 </div>

                 {/* Session List */}
                 <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                       <h3 className="font-bold text-gray-900 dark:text-white">Session History</h3>
                       <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Verified Attendance</span>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-900">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Session</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Course</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Duration</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                          {selectedStats.sessionsList.length > 0 ? selectedStats.sessionsList.map(session => (
                            <tr key={session.id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                 {new Date(session.startTime).toLocaleDateString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                 {session.title}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                 {MOCK_COURSES.find(c => c.id === session.courseId)?.title}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                 {session.durationMinutes} mins
                              </td>
                            </tr>
                          )) : (
                            <tr><td colSpan={4} className="px-6 py-4 text-center text-gray-500">No sessions recorded yet.</td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                 </div>
               </>
             ) : (
               <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-white dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
                  <Icons.User className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Select a Trainer</h3>
                  <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">Click on a trainer from the list to view their attendance, student count, and session reports.</p>
               </div>
             )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TrainerReports;