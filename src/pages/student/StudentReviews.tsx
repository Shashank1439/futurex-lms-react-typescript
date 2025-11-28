import React, { useState } from 'react';
import { DashboardLayout } from '../../components/Layout';
import { useAuth } from '../../services/authService';
import { useReviews } from '../../services/reviewService';
import { MOCK_COURSES } from '../../constants';
import * as Icons from '../../components/Icons';

const StudentReviews: React.FC = () => {
  const { user } = useAuth();
  const { addReview, reviews } = useReviews();
  
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    rating: 5,
    comment: '',
    courseName: MOCK_COURSES[0].title
  });
  const [successMsg, setSuccessMsg] = useState('');

  // Filter reviews by this student
  const myReviews = reviews.filter(r => r.studentId === user?.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    addReview({
      studentId: user.id,
      studentName: user.name,
      studentAvatar: user.avatarUrl,
      rating: formData.rating,
      comment: formData.comment,
      courseName: formData.courseName
    });

    setFormData({ rating: 5, comment: '', courseName: MOCK_COURSES[0].title });
    setShowForm(false);
    setSuccessMsg('Review submitted successfully! It is pending approval.');
    setTimeout(() => setSuccessMsg(''), 5000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 animate-fade-in-up">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Reviews</h1>
            <p className="text-gray-500 dark:text-gray-400">Share your learning experience with the community.</p>
          </div>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="bg-brand-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-brand-700 flex items-center shadow-lg transition-transform hover:scale-105"
          >
            {showForm ? <Icons.X className="w-5 h-5 mr-2" /> : <Icons.Plus className="w-5 h-5 mr-2" />} 
            {showForm ? 'Cancel' : 'Write a Review'}
          </button>
        </div>

        {successMsg && (
          <div className="bg-green-100 dark:bg-green-900 border border-green-200 dark:border-green-700 text-green-700 dark:text-green-100 px-4 py-3 rounded relative animate-fade-in-up">
             <span className="block sm:inline">{successMsg}</span>
          </div>
        )}

        {/* Add Review Form */}
        {showForm && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 animate-scale-in origin-top">
             <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Write a Review</h3>
             <form onSubmit={handleSubmit} className="space-y-4">
               <div>
                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select Course</label>
                 <select
                    value={formData.courseName}
                    onChange={(e) => setFormData({...formData, courseName: e.target.value})}
                    className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-brand-500 focus:ring-brand-500 py-2 px-3 border transition-colors"
                 >
                    {MOCK_COURSES.map(c => (
                      <option key={c.id} value={c.title}>{c.title}</option>
                    ))}
                 </select>
               </div>
               
               <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rating</label>
                  <div className="flex space-x-2">
                     {[1, 2, 3, 4, 5].map((star) => (
                       <button
                         key={star}
                         type="button"
                         onClick={() => setFormData({...formData, rating: star})}
                         className="focus:outline-none transition-transform hover:scale-125 duration-200"
                       >
                         <Icons.Star 
                            className={`w-8 h-8 ${star <= formData.rating ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'}`} 
                         />
                       </button>
                     ))}
                  </div>
               </div>

               <div>
                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Feedback</label>
                 <textarea
                   required
                   rows={4}
                   value={formData.comment}
                   onChange={(e) => setFormData({...formData, comment: e.target.value})}
                   placeholder="What did you like about the course?"
                   className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-brand-500 focus:ring-brand-500 py-2 px-3 border transition-colors"
                 />
               </div>

               <div className="flex justify-end">
                 <button 
                   type="submit" 
                   className="bg-brand-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-brand-700 shadow-md hover:shadow-lg transition-all"
                 >
                   Submit Review
                 </button>
               </div>
             </form>
          </div>
        )}

        {/* My Reviews List */}
        <div className="grid grid-cols-1 gap-4 stagger-enter">
           {myReviews.length > 0 ? (
             myReviews.map(review => (
               <div key={review.id} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-start mb-2">
                     <div>
                        <h4 className="font-bold text-lg text-gray-900 dark:text-white">{review.courseName}</h4>
                        <div className="flex text-yellow-400 text-sm my-1">
                          {[...Array(5)].map((_, i) => (
                            <Icons.Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-gray-300 dark:text-gray-600'}`} />
                          ))}
                        </div>
                     </div>
                     <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                       review.status === 'APPROVED' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                       review.status === 'REJECTED' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                       'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                     }`}>
                       {review.status}
                     </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 italic">"{review.comment}"</p>
                  <p className="text-xs text-gray-400 mt-4">Submitted on {review.date}</p>
               </div>
             ))
           ) : (
             <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 animate-fade-in-up">
                <Icons.MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-gray-900 dark:text-white font-medium">No reviews yet</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">You haven't submitted any reviews.</p>
             </div>
           )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentReviews;