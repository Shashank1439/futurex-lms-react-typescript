import React, { useState } from 'react';
import { DashboardLayout } from '../../components/Layout';
import { useReviews } from '../../services/reviewService';
import * as Icons from '../../components/Icons';
import { ReviewStatus } from '../../types';

const ManageReviews: React.FC = () => {
  const { reviews, updateReviewStatus, deleteReview } = useReviews();
  const [filter, setFilter] = useState<'ALL' | ReviewStatus>('ALL');

  const filteredReviews = filter === 'ALL' ? reviews : reviews.filter(r => r.status === filter);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="animate-fade-in-up">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Reviews</h1>
          <p className="text-gray-500 dark:text-gray-400">Approve, reject, or delete student reviews.</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-2 border-b border-gray-200 dark:border-gray-700 pb-1 animate-fade-in-up animate-delay-100">
          {['ALL', 'PENDING', 'APPROVED', 'REJECTED'].map((status) => (
             <button
               key={status}
               onClick={() => setFilter(status as any)}
               className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors duration-200 ${
                 filter === status 
                  ? 'bg-white dark:bg-gray-800 border-b-2 border-brand-600 text-brand-600 dark:text-brand-400' 
                  : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
               }`}
             >
               {status.charAt(0) + status.slice(1).toLowerCase()}
             </button>
          ))}
        </div>

        {/* Reviews Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden animate-fade-in-up animate-delay-200">
           <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
             <thead className="bg-gray-50 dark:bg-gray-900">
               <tr>
                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Student / Course</th>
                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Rating & Comment</th>
                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
               </tr>
             </thead>
             <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
               {filteredReviews.length > 0 ? filteredReviews.map((review, idx) => (
                 <tr 
                    key={review.id} 
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150 animate-fade-in-up"
                    style={{ animationDelay: `${idx * 50}ms`, animationFillMode: 'both' }}
                  >
                   <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                         <img src={review.studentAvatar || `https://ui-avatars.com/api/?name=${review.studentName}`} alt="" className="h-8 w-8 rounded-full mr-3" />
                         <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{review.studentName}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[150px]">{review.courseName || 'General'}</div>
                         </div>
                      </div>
                   </td>
                   <td className="px-6 py-4">
                      <div className="flex text-yellow-400 mb-1">
                         {[...Array(5)].map((_, i) => (
                           <Icons.Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-current' : 'text-gray-300 dark:text-gray-600'}`} />
                         ))}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{review.comment}</p>
                   </td>
                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{review.date}</td>
                   <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                       review.status === 'APPROVED' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                       review.status === 'REJECTED' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                       'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                     }`}>
                       {review.status}
                     </span>
                   </td>
                   <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        {review.status !== 'APPROVED' && (
                          <button 
                            onClick={() => updateReviewStatus(review.id, 'APPROVED')}
                            className="p-1 text-green-600 hover:bg-green-100 rounded transition-colors" title="Approve"
                          >
                             <Icons.CheckCircle className="w-5 h-5" />
                          </button>
                        )}
                        {review.status !== 'REJECTED' && (
                          <button 
                             onClick={() => updateReviewStatus(review.id, 'REJECTED')}
                             className="p-1 text-yellow-600 hover:bg-yellow-100 rounded transition-colors" title="Reject"
                          >
                             <Icons.X className="w-5 h-5" />
                          </button>
                        )}
                        <button 
                           onClick={() => { if(confirm('Delete review?')) deleteReview(review.id) }}
                           className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors" title="Delete"
                        >
                           <Icons.Trash className="w-5 h-5" />
                        </button>
                      </div>
                   </td>
                 </tr>
               )) : (
                 <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                       No reviews found in this category.
                    </td>
                 </tr>
               )}
             </tbody>
           </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ManageReviews;