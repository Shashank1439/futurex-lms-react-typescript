import React from 'react';
import { DashboardLayout } from '../../components/Layout';
import { MOCK_COURSES, MOCK_SESSIONS, CHART_DATA_ATTENDANCE } from '../../constants';
import CourseCard from '../../components/CourseCard';
import { useNavigate } from 'react-router-dom';
import * as Icons from '../../components/Icons';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const enrolledCourses = MOCK_COURSES.slice(0, 2); // Simulating enrolled courses

  // Find next live session
  const nextSession = MOCK_SESSIONS.find(s => s.isLive) || MOCK_SESSIONS[0];

  const handleContinueCourse = (courseId: string) => {
    navigate(`/student/course/${courseId}`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        
        {/* Welcome & Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-brand-600 to-brand-700 rounded-xl p-6 text-white shadow-lg col-span-1 md:col-span-2 relative overflow-hidden animate-fade-in-up">
             <div className="relative z-10">
               <h2 className="text-2xl font-bold mb-2">Welcome back, Alex!</h2>
               <p className="opacity-90 mb-6">You have a live class scheduled for today.</p>
               {nextSession && (
                 <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg border border-white/20 inline-block w-full sm:w-auto hover:bg-white/20 transition-colors">
                   <div className="flex items-center space-x-3">
                      <div className="bg-red-500 animate-ping absolute inline-flex h-3 w-3 rounded-full opacity-75"></div>
                      <div className="bg-red-500 relative inline-flex rounded-full h-3 w-3"></div>
                      <div>
                        <p className="font-semibold text-sm">{nextSession.title}</p>
                        <p className="text-xs opacity-75">Started {new Date(nextSession.startTime).toLocaleTimeString()}</p>
                      </div>
                      <button 
                        onClick={() => navigate(`/classroom/${nextSession.id}`)}
                        className="ml-auto bg-white text-brand-700 px-4 py-2 rounded-md text-sm font-bold shadow hover:bg-gray-100 transition-transform hover:scale-105"
                      >
                        Join Now
                      </button>
                   </div>
                 </div>
               )}
             </div>
             <Icons.BookOpen className="absolute right-0 bottom-0 w-32 h-32 text-white opacity-10 transform translate-x-4 translate-y-4" />
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 animate-fade-in-up animate-delay-100">
             <h3 className="text-gray-500 dark:text-gray-400 font-medium text-sm mb-4">Overall Attendance</h3>
             <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={CHART_DATA_ATTENDANCE}>
                    <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      cursor={{fill: 'transparent'}} 
                      contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} 
                    />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                       {CHART_DATA_ATTENDANCE.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.value > 85 ? '#22c55e' : '#3b82f6'} />
                        ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
             </div>
             <p className="text-center text-sm font-bold text-gray-700 dark:text-gray-200 mt-2">88% Average</p>
          </div>
        </div>

        {/* Enrolled Courses */}
        <div className="animate-fade-in-up animate-delay-200">
           <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">My Learning</h2>
              <button onClick={() => navigate('/student/courses')} className="text-brand-600 dark:text-brand-400 text-sm font-medium hover:underline">View All</button>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-enter">
             {enrolledCourses.map(course => (
               <CourseCard 
                 key={course.id} 
                 course={course} 
                 actionLabel="Continue" 
                 showProgress
                 onAction={handleContinueCourse}
               />
             ))}
             {/* Add a "Find more" card */}
             <div onClick={() => navigate('/courses')} className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 hover:border-brand-500 dark:hover:border-brand-500 hover:text-brand-500 dark:hover:text-brand-500 transition-all cursor-pointer min-h-[300px] hover:shadow-lg hover:-translate-y-1">
                <Icons.Search className="w-8 h-8 mb-2" />
                <span className="font-medium">Browse New Courses</span>
             </div>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;