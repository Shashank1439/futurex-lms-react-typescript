import React, { useState } from 'react';
import { DashboardLayout } from '../../components/Layout';
import CourseCard from '../../components/CourseCard';
import { MOCK_COURSES } from '../../constants';
import * as Icons from '../../components/Icons';
import { useNavigate } from 'react-router-dom';

const StudentCourses: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');
  const navigate = useNavigate();

  // Simulate filtering: First 2 are active, last 1 is completed
  const activeCourses = MOCK_COURSES.slice(0, 2);
  const completedCourses = MOCK_COURSES.slice(2, 3);

  const displayedCourses = activeTab === 'active' ? activeCourses : completedCourses;

  const handleAction = (courseId: string) => {
    if (activeTab === 'active') {
      navigate(`/student/course/${courseId}`);
    } else {
      navigate(`/student/certificate/${courseId}`);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Courses</h1>
          <p className="text-gray-500 dark:text-gray-400">Track your progress and continue learning.</p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('active')}
              className={`${
                activeTab === 'active'
                  ? 'border-brand-500 text-brand-600 dark:text-brand-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center transition-colors`}
            >
              <Icons.BookOpen className="w-4 h-4 mr-2" />
              Active Courses ({activeCourses.length})
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`${
                activeTab === 'completed'
                  ? 'border-brand-500 text-brand-600 dark:text-brand-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center transition-colors`}
            >
              <Icons.CheckCircle className="w-4 h-4 mr-2" />
              Completed ({completedCourses.length})
            </button>
          </nav>
        </div>

        {/* Content */}
        {displayedCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
            {displayedCourses.map(course => (
              <CourseCard
                key={course.id}
                course={{...course, progress: activeTab === 'active' ? course.progress : 100}}
                actionLabel={activeTab === 'active' ? "Continue Learning" : "View Certificate"}
                showProgress={true}
                onAction={handleAction}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-lg border border-dashed border-gray-300 dark:border-gray-700 animate-fade-in-up">
            <Icons.BookOpen className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No courses found</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">You haven't {activeTab === 'active' ? 'enrolled in' : 'completed'} any courses yet.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default StudentCourses;