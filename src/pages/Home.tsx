import React from 'react';
import { PublicNavbar } from '../components/Layout';
import { Link, useNavigate } from 'react-router-dom';
import * as Icons from '../components/Icons';
import { MOCK_COURSES } from '../constants';
import CourseCard from '../components/CourseCard';
import Chatbot from '../components/Chatbot';
import { useReviews } from '../services/reviewService';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { getApprovedReviews } = useReviews();
  const reviews = getApprovedReviews();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <PublicNavbar />
      
      {/* Hero Section */}
      <div className="relative bg-brand-900 dark:bg-brand-950 text-white overflow-hidden transition-colors duration-200">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Students learning" 
            className="w-full h-full object-cover opacity-20 animate-[pulse_10s_ease-in-out_infinite]"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 animate-fade-in-up">
            Unlock Your Potential with <span className="text-brand-400">FutureX</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl animate-fade-in-up animate-delay-100">
            Industry-leading courses, expert mentors, and a community dedicated to your growth. Start your journey today.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in-up animate-delay-200">
            <Link to="/courses" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-brand-900 bg-white hover:bg-gray-50 md:text-lg transition-transform hover:scale-105 shadow-lg cursor-pointer">
              Explore Courses
            </Link>
            <Link to="/login" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-600 hover:bg-brand-700 md:text-lg transition-transform hover:scale-105 shadow-lg cursor-pointer">
              Join Now
            </Link>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-base text-brand-600 dark:text-brand-400 font-semibold tracking-wide uppercase">Why Choose Us</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              A Better Way to Learn
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 stagger-enter">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="w-12 h-12 bg-brand-100 dark:bg-brand-900 rounded-lg flex items-center justify-center text-brand-600 dark:text-brand-400 mb-4">
                <Icons.Video className="w-6 h-6 animate-float" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Live Interactive Classes</h3>
              <p className="text-gray-600 dark:text-gray-300">Real-time interaction with trainers, screen sharing, and instant Q&A resolution.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="w-12 h-12 bg-brand-100 dark:bg-brand-900 rounded-lg flex items-center justify-center text-brand-600 dark:text-brand-400 mb-4">
                <Icons.Users className="w-6 h-6 animate-float animate-delay-100" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Expert Mentorship</h3>
              <p className="text-gray-600 dark:text-gray-300">Learn from industry veterans who have worked with top tech companies.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="w-12 h-12 bg-brand-100 dark:bg-brand-900 rounded-lg flex items-center justify-center text-brand-600 dark:text-brand-400 mb-4">
                <Icons.CheckCircle className="w-6 h-6 animate-float animate-delay-200" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Certified Learning</h3>
              <p className="text-gray-600 dark:text-gray-300">Earn recognized certificates upon completion to boost your resume.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Courses */}
      <div className="py-16 bg-white dark:bg-gray-900 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex justify-between items-end mb-8 animate-fade-in-up">
             <div>
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Featured Courses</h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Hand-picked by our experts.</p>
             </div>
             <Link to="/courses" className="text-brand-600 dark:text-brand-400 font-medium hover:text-brand-700 dark:hover:text-brand-300 flex items-center group cursor-pointer">
               View all <Icons.ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
             </Link>
           </div>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-enter">
             {MOCK_COURSES.slice(0, 4).map(course => (
               <CourseCard 
                 key={course.id} 
                 course={course} 
                 actionLabel="View Details"
                 onAction={() => navigate('/courses')} 
               />
             ))}
           </div>
        </div>
      </div>

      {/* Reviews / Testimonials Section */}
      <div className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-base text-brand-600 dark:text-brand-400 font-semibold tracking-wide uppercase">Testimonials</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Student Success Stories
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-enter">
            {reviews.length > 0 ? reviews.slice(0, 6).map((review) => (
              <div key={review.id} className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700 flex flex-col h-full group">
                <div className="flex items-center space-x-1 text-yellow-500 mb-4 group-hover:scale-105 transition-transform origin-left">
                  {[...Array(5)].map((_, i) => (
                    <Icons.Star 
                      key={i} 
                      className={`w-5 h-5 ${i < review.rating ? 'fill-current' : 'text-gray-300 dark:text-gray-600'}`} 
                    />
                  ))}
                </div>
                <div className="relative">
                  <span className="absolute -top-2 -left-2 text-4xl text-gray-200 dark:text-gray-700 font-serif">"</span>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 flex-1 italic relative z-10 pl-4">{review.comment}</p>
                </div>
                
                <div className="flex items-center mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                  <img 
                    src={review.studentAvatar || `https://ui-avatars.com/api/?name=${review.studentName}&background=random`} 
                    alt={review.studentName} 
                    className="w-10 h-10 rounded-full object-cover mr-3 ring-2 ring-transparent group-hover:ring-brand-500 transition-all"
                  />
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{review.studentName}</p>
                    {review.courseName && (
                      <p className="text-xs text-brand-600 dark:text-brand-400">{review.courseName}</p>
                    )}
                  </div>
                </div>
              </div>
            )) : (
               <div className="col-span-full text-center text-gray-500 animate-pulse">
                  No reviews yet. Be the first to share your experience!
               </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-12 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 stagger-enter">
          <div>
            <span className="text-2xl font-bold text-white">Future<span className="text-brand-500">X</span></span>
            <p className="mt-4 text-gray-400 text-sm">Empowering the next generation of tech leaders through accessible, high-quality education.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Platform</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/courses" className="hover:text-white transition-colors">Browse Courses</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/instructors" className="hover:text-white transition-colors">Instructors</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Support</h4>
             <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQs</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="flex items-center"><Icons.MessageSquare className="w-4 h-4 mr-2" /> support@futurex.com</li>
              <li className="flex items-center"><Icons.Phone className="w-4 h-4 mr-2" /> +1 (555) 123-4567</li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Chatbot Widget */}
      <Chatbot />
    </div>
  );
};

export default Home;