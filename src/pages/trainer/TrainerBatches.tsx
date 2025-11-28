import React from 'react';
import { DashboardLayout } from '../../components/Layout';
import * as Icons from '../../components/Icons';
import { MOCK_COURSES } from '../../constants';

const TrainerBatches: React.FC = () => {
  // Simulate courses assigned to this trainer
  const myBatches = MOCK_COURSES.slice(0, 3);

  const handleCreateBatch = () => {
     alert("Batch Creation Wizard would open here. (Mock)");
  };

  const handleViewStudents = (title: string) => {
     alert(`Showing student list for ${title}... (Mock)`);
  };

  const handleSchedule = (title: string) => {
     alert(`Opening scheduler for ${title}... (Mock)`);
  };

  return (
    <DashboardLayout>
       <div className="space-y-6">
         <div className="flex justify-between items-center animate-fade-in-up">
           <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Batches</h1>
              <p className="text-gray-500 dark:text-gray-400">Manage your active courses and students.</p>
           </div>
           <button 
              onClick={handleCreateBatch}
              className="bg-brand-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-brand-700 shadow-md hover:scale-105 transition-transform"
           >
              Create New Batch
           </button>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up animate-delay-100">
           {myBatches.map(batch => (
             <div key={batch.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="h-32 relative group">
                   <img src={batch.image} alt={batch.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                   <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <h3 className="text-white font-bold text-lg px-4 text-center">{batch.title}</h3>
                   </div>
                </div>
                <div className="p-5 space-y-4">
                   <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Students</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{batch.studentsEnrolled}</span>
                   </div>
                   <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Next Class</span>
                      <span className="font-semibold text-brand-600 dark:text-brand-400">{batch.nextBatchDate || 'TBA'}</span>
                   </div>
                   <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Progress</span>
                      <span className="font-semibold text-gray-900 dark:text-white">Week 4 / 12</span>
                   </div>

                   <div className="border-t border-gray-100 dark:border-gray-700 pt-4 flex space-x-2">
                      <button 
                        onClick={() => handleViewStudents(batch.title)}
                        className="flex-1 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 py-2 rounded-md text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                      >
                        View Students
                      </button>
                      <button 
                        onClick={() => handleSchedule(batch.title)}
                        className="flex-1 bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 py-2 rounded-md text-sm font-medium hover:bg-brand-100 dark:hover:bg-brand-900/50 transition-colors"
                      >
                        Schedule
                      </button>
                   </div>
                </div>
             </div>
           ))}
         </div>
       </div>
    </DashboardLayout>
  );
};

export default TrainerBatches;