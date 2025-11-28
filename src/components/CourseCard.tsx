import React from 'react';
import { Course } from '../types';
import * as Icons from './Icons';

interface CourseCardProps {
  course: Course;
  onAction: (courseId: string) => void;
  actionLabel: string;
  showProgress?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onAction, actionLabel, showProgress }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={course.image} 
          alt={course.title} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
        />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-brand-600 shadow-sm">
          {course.mode}
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-medium text-brand-600 dark:text-brand-400 uppercase tracking-wide">{course.category}</span>
          <div className="flex items-center text-yellow-500 text-sm bg-yellow-50 dark:bg-yellow-900/20 px-1.5 py-0.5 rounded">
            <Icons.Monitor className="w-3 h-3 mr-1" />
            <span>{course.rating}</span>
          </div>
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-brand-600 transition-colors">{course.title}</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 flex-1 line-clamp-3">{course.description}</p>
        
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4 space-x-4">
          <div className="flex items-center">
            <Icons.User className="w-4 h-4 mr-1" />
            <span>{course.instructorName}</span>
          </div>
          <div className="flex items-center">
            <Icons.Calendar className="w-4 h-4 mr-1" />
            <span>{course.duration}</span>
          </div>
        </div>

        {showProgress && course.progress !== undefined && (
          <div className="mb-4">
             <div className="flex justify-between text-xs mb-1 text-gray-600 dark:text-gray-300">
               <span>Progress</span>
               <span>{course.progress}%</span>
             </div>
             <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
               <div className="bg-brand-500 h-2 rounded-full animate-[width_1s_ease-out]" style={{ width: `${course.progress}%` }}></div>
             </div>
          </div>
        )}

        <div className="flex items-center justify-between mt-auto">
          {!showProgress && (
             <span className="text-xl font-bold text-gray-900 dark:text-white">${course.price}</span>
          )}
          <button
            onClick={() => onAction(course.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              showProgress 
              ? 'w-full bg-brand-100 dark:bg-brand-900 text-brand-700 dark:text-brand-300 hover:bg-brand-200 dark:hover:bg-brand-800' 
              : 'bg-brand-600 text-white hover:bg-brand-700 ml-auto shadow-md hover:shadow-lg'
            }`}
          >
            {actionLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;