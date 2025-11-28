import React, { useState } from 'react';
import { PublicNavbar, BackBar } from '../components/Layout';
import CourseCard from '../components/CourseCard';
import { MOCK_COURSES } from '../constants';
import * as Icons from '../components/Icons';
import { CourseMode, UserRole } from '../types';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../services/authService';

const CourseCatalog: React.FC = () => {
  const [filterMode, setFilterMode] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  const filteredCourses = MOCK_COURSES.filter(course => {
    const matchesMode = filterMode === 'all' || course.mode === filterMode;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesMode && matchesSearch;
  });

  const handleEnroll = (courseId: string) => {
     if (user && user.role === UserRole.STUDENT) {
        // In a real app, this would call an API to enroll
        alert("Enrollment successful! Redirecting to your dashboard...");
        navigate('/student/dashboard');
     } else if (user) {
        alert("Only Students can enroll in courses.");
     } else {
        alert("Please login to enroll in a course.");
        navigate('/login');
     }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <PublicNavbar />
      
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <BackBar />
           <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Browse Courses</h1>
           
           <div className="flex flex-col md:flex-row gap-4 justify-between">
              {/* Search */}
              <div className="relative max-w-md w-full">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icons.Search className="h-5 w-5 text-gray-400" />
                 </div>
                 <input
                   type="text"
                   className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-brand-500 focus:border-brand-500 sm:text-sm transition-colors"
                   placeholder="Search courses, categories..."
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                 />
              </div>

              {/* Filters */}
              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                 <button 
                   onClick={() => setFilterMode('all')}
                   className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filterMode === 'all' ? 'bg-brand-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                 >
                   All Courses
                 </button>
                 {Object.values(CourseMode).map(mode => (
                   <button
                     key={mode}
                     onClick={() => setFilterMode(mode)}
                     className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filterMode === mode ? 'bg-brand-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                   >
                     {mode}
                   </button>
                 ))}
              </div>
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
         {filteredCourses.length > 0 ? (
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up">
             {filteredCourses.map(course => (
               <CourseCard 
                  key={course.id} 
                  course={course} 
                  actionLabel="Enroll Now"
                  onAction={handleEnroll}
               />
             ))}
           </div>
         ) : (
           <div className="text-center py-20 animate-fade-in-up">
              <Icons.BookOpen className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No courses found</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Try adjusting your search or filters.</p>
           </div>
         )}
      </div>
    </div>
  );
};

export default CourseCatalog;