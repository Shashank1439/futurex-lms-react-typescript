import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as Icons from '../../components/Icons';
import { MOCK_COURSES } from '../../constants';

const StudentLMS: React.FC = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = MOCK_COURSES.find(c => c.id === courseId);
  const [activeModule, setActiveModule] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (!course) return <div>Course not found</div>;

  const modules = [
    { title: 'Introduction & Setup', duration: '45m', completed: true },
    { title: 'Core Concepts Deep Dive', duration: '1h 20m', completed: true },
    { title: 'Advanced Patterns', duration: '2h 10m', completed: false, active: true },
    { title: 'Real-world Project', duration: '3h 30m', completed: false },
    { title: 'Deployment & CI/CD', duration: '1h 45m', completed: false },
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-80' : 'w-0'} bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 flex flex-col`}>
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="font-bold text-gray-900 dark:text-white truncate" title={course.title}>{course.title}</h2>
          <button onClick={() => navigate('/student/courses')} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
             <Icons.X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
           {modules.map((mod, idx) => (
             <div 
               key={idx} 
               onClick={() => setActiveModule(idx)}
               className={`p-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer transition-colors ${idx === activeModule ? 'bg-brand-50 dark:bg-brand-900/20 border-l-4 border-l-brand-600' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}
             >
                <div className="flex justify-between items-start mb-1">
                   <span className={`text-sm font-medium ${idx === activeModule ? 'text-brand-700 dark:text-brand-400' : 'text-gray-700 dark:text-gray-200'}`}>
                     {idx + 1}. {mod.title}
                   </span>
                   {mod.completed && <Icons.CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />}
                </div>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                   <Icons.PlayCircle className="w-3 h-3 mr-1" /> {mod.duration}
                </div>
             </div>
           ))}
        </div>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
           <div className="flex justify-between text-xs mb-1 text-gray-600 dark:text-gray-400">
              <span>Course Progress</span>
              <span>40%</span>
           </div>
           <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
               <div className="bg-green-500 h-2 rounded-full" style={{ width: '40%' }}></div>
           </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
         {/* Top Bar */}
         <div className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4">
            <div className="flex items-center">
               <button onClick={() => setSidebarOpen(!sidebarOpen)} className="mr-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                  <Icons.Menu className="w-6 h-6" />
               </button>
               <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-200 truncate">{modules[activeModule].title}</h1>
            </div>
            <div className="flex items-center space-x-4">
               <button className="flex items-center text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-brand-600">
                  <Icons.MessageSquare className="w-4 h-4 mr-2" /> Q&A
               </button>
               <button className="bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-700 shadow">
                  Next Lesson <Icons.ChevronRight className="w-4 h-4 inline ml-1" />
               </button>
            </div>
         </div>

         {/* Video Player Area */}
         <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-black">
            <div className="max-w-5xl mx-auto w-full aspect-video bg-gray-900 rounded-xl shadow-2xl flex items-center justify-center relative group">
               {/* Mock Video Placeholder */}
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
                  <div className="w-full bg-gray-700/50 h-1.5 rounded-full mb-4 overflow-hidden">
                     <div className="bg-red-600 h-full w-1/3"></div>
                  </div>
                  <div className="flex justify-between items-center text-white">
                     <div className="flex items-center space-x-6">
                        <button><Icons.PlayCircle className="w-8 h-8" /></button>
                        <button><Icons.Volume2 className="w-6 h-6" /></button>
                        <span className="text-sm">12:30 / 45:00</span>
                     </div>
                     <div className="flex items-center space-x-4">
                        <button className="text-sm font-bold">CC</button>
                        <button><Icons.Settings className="w-5 h-5" /></button>
                        <button><Icons.Maximize className="w-5 h-5" /></button>
                     </div>
                  </div>
               </div>
               <Icons.PlayCircle className="w-20 h-20 text-white opacity-80 group-hover:scale-110 transition-transform cursor-pointer" />
            </div>

            <div className="max-w-5xl mx-auto mt-8 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
               <div className="flex space-x-6 border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
                  <button className="text-brand-600 dark:text-brand-400 font-bold border-b-2 border-brand-600 pb-4 -mb-4.5">Overview</button>
                  <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 font-medium pb-4">Resources</button>
                  <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 font-medium pb-4">Notes</button>
               </div>
               <div className="prose dark:prose-invert max-w-none">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">About this lesson</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                     In this module, we will explore the advanced patterns used in modern development. 
                     We cover Higher Order Components, Render Props, and Custom Hooks in detail. 
                     Make sure you have completed the prerequisites before proceeding.
                  </p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default StudentLMS;