import React, { useState } from 'react';
import { DashboardLayout } from '../../components/Layout';
import * as Icons from '../../components/Icons';
import { MOCK_COURSES } from '../../constants';
import { Course, CourseMode } from '../../types';

const ManageCourses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>(MOCK_COURSES);
  const [showModal, setShowModal] = useState(false);
  const [newCourse, setNewCourse] = useState<Partial<Course>>({
    title: '',
    instructorName: '',
    category: '',
    price: 0,
    mode: CourseMode.ONLINE
  });

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this course?')) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourse.title || !newCourse.instructorName) return;
    
    const course: Course = {
      ...newCourse as Course,
      id: `c${Date.now()}`,
      rating: 0,
      studentsEnrolled: 0,
      duration: '8 Weeks',
      image: `https://picsum.photos/600/400?random=${Date.now()}`
    };
    
    setCourses([...courses, course]);
    setShowModal(false);
    setNewCourse({ title: '', instructorName: '', category: '', price: 0, mode: CourseMode.ONLINE });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center animate-fade-in-up">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Courses</h1>
            <p className="text-gray-500 dark:text-gray-400">Create, edit, and archive courses.</p>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="bg-brand-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-brand-700 flex items-center shadow-md hover:scale-105 transition-transform"
          >
            <Icons.Plus className="w-5 h-5 mr-2" /> Add Course
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden animate-fade-in-up animate-delay-100">
           <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
             <thead className="bg-gray-50 dark:bg-gray-900">
               <tr>
                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Course Title</th>
                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Instructor</th>
                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</th>
                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Price</th>
                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Students</th>
                 <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
               </tr>
             </thead>
             <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
               {courses.map(course => (
                 <tr key={course.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                   <td className="px-6 py-4 whitespace-nowrap">
                     <div className="flex items-center">
                       <div className="h-10 w-10 flex-shrink-0">
                         <img className="h-10 w-10 rounded-md object-cover" src={course.image} alt="" />
                       </div>
                       <div className="ml-4">
                         <div className="text-sm font-medium text-gray-900 dark:text-white">{course.title}</div>
                         <div className="text-xs text-gray-500 dark:text-gray-400">{course.mode}</div>
                       </div>
                     </div>
                   </td>
                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{course.instructorName}</td>
                   <td className="px-6 py-4 whitespace-nowrap">
                     <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                       {course.category}
                     </span>
                   </td>
                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">${course.price}</td>
                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{course.studentsEnrolled}</td>
                   <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                     <button className="text-brand-600 hover:text-brand-900 dark:hover:text-brand-400 mr-4">Edit</button>
                     <button onClick={() => handleDelete(course.id)} className="text-red-600 hover:text-red-900 dark:hover:text-red-400">Delete</button>
                   </td>
                 </tr>
               ))}
               {courses.length === 0 && (
                 <tr><td colSpan={6} className="px-6 py-4 text-center text-gray-500">No courses available.</td></tr>
               )}
             </tbody>
           </table>
        </div>

        {/* Add Course Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm animate-fade-in-up">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
               <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900">
                 <h3 className="text-lg font-bold text-gray-900 dark:text-white">Add New Course</h3>
                 <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-white">
                    <Icons.X className="w-5 h-5" />
                 </button>
               </div>
               <form onSubmit={handleAdd} className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Course Title</label>
                    <input 
                      type="text" 
                      required
                      value={newCourse.title}
                      onChange={e => setNewCourse({...newCourse, title: e.target.value})}
                      className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-brand-500 focus:ring-brand-500 py-2 px-3 border"
                      placeholder="e.g., Advanced React Patterns"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Instructor</label>
                      <input 
                        type="text" 
                        required
                        value={newCourse.instructorName}
                        onChange={e => setNewCourse({...newCourse, instructorName: e.target.value})}
                        className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-brand-500 focus:ring-brand-500 py-2 px-3 border"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                      <input 
                        type="text" 
                        required
                        value={newCourse.category}
                        onChange={e => setNewCourse({...newCourse, category: e.target.value})}
                        className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-brand-500 focus:ring-brand-500 py-2 px-3 border"
                        placeholder="Development"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price ($)</label>
                      <input 
                        type="number" 
                        required
                        value={newCourse.price}
                        onChange={e => setNewCourse({...newCourse, price: Number(e.target.value)})}
                        className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-brand-500 focus:ring-brand-500 py-2 px-3 border"
                        placeholder="499"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mode</label>
                      <select 
                        value={newCourse.mode}
                        onChange={e => setNewCourse({...newCourse, mode: e.target.value as CourseMode})}
                        className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-brand-500 focus:ring-brand-500 py-2 px-3 border"
                      >
                         {Object.values(CourseMode).map(m => <option key={m} value={m}>{m}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="pt-2">
                    <button 
                      type="submit" 
                      className="w-full bg-brand-600 text-white py-2 rounded-lg font-medium hover:bg-brand-700 shadow-md"
                    >
                      Create Course
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

export default ManageCourses;