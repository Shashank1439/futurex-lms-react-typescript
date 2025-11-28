import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Review, ReviewStatus } from '../types';

interface ReviewContextType {
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date' | 'status'>) => void;
  updateReviewStatus: (id: string, status: ReviewStatus) => void;
  deleteReview: (id: string) => void;
  getApprovedReviews: () => Review[];
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

const MOCK_REVIEWS: Review[] = [
  {
    id: 'r1',
    studentId: 's1',
    studentName: 'Alex Johnson',
    studentAvatar: 'https://picsum.photos/200',
    rating: 5,
    comment: 'The Full Stack course completely changed my career path. The live sessions with Sarah were incredibly detailed and helpful.',
    date: '2025-01-15',
    status: 'APPROVED',
    courseName: 'Full Stack React Development'
  },
  {
    id: 'r2',
    studentId: 's2',
    studentName: 'Emily Davis',
    studentAvatar: 'https://picsum.photos/203',
    rating: 4,
    comment: 'Great content and platform. I loved the UI/UX design module. The only thing I wish is that we had more offline meetups.',
    date: '2025-02-02',
    status: 'APPROVED',
    courseName: 'UI/UX Design Bootcamp'
  },
  {
    id: 'r3',
    studentId: 's3',
    studentName: 'Michael Chen',
    studentAvatar: 'https://picsum.photos/204',
    rating: 5,
    comment: 'FutureX is hands down the best LMS I have used. The recorded sessions feature saved me when I missed classes due to work.',
    date: '2025-02-10',
    status: 'APPROVED',
    courseName: 'Data Science with Python'
  }
];

export const ReviewProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  // Load from local storage or use mock data
  useEffect(() => {
    const storedReviews = localStorage.getItem('futurex_reviews');
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    } else {
      setReviews(MOCK_REVIEWS);
    }
  }, []);

  // Save to local storage whenever reviews change
  useEffect(() => {
    if (reviews.length > 0) {
      localStorage.setItem('futurex_reviews', JSON.stringify(reviews));
    }
  }, [reviews]);

  const addReview = (reviewData: Omit<Review, 'id' | 'date' | 'status'>) => {
    const newReview: Review = {
      ...reviewData,
      id: `r${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      status: 'PENDING'
    };
    setReviews(prev => [newReview, ...prev]);
  };

  const updateReviewStatus = (id: string, status: ReviewStatus) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  const deleteReview = (id: string) => {
    setReviews(prev => prev.filter(r => r.id !== id));
  };

  const getApprovedReviews = () => {
    return reviews.filter(r => r.status === 'APPROVED');
  };

  return React.createElement(
    ReviewContext.Provider,
    { value: { reviews, addReview, updateReviewStatus, deleteReview, getApprovedReviews } },
    children
  );
};

export const useReviews = () => {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error('useReviews must be used within a ReviewProvider');
  }
  return context;
};