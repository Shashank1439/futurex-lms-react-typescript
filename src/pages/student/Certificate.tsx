import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/Layout';
import { useAuth } from '../../services/authService';
import { MOCK_COURSES } from '../../constants';
import * as Icons from '../../components/Icons';

const Certificate: React.FC = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const course = MOCK_COURSES.find(c => c.id === courseId);
  const studentName = user?.name || 'Student Name';
  const completionDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  if (!course) {
    return (
      <DashboardLayout>
        <div className="text-center py-20">
          <h3 className="text-lg font-medium text-gray-900">Certificate not found</h3>
          <button onClick={() => navigate('/student/courses')} className="mt-4 text-brand-600 hover:underline">
            Back to Courses
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row justify-end items-center gap-4 print:hidden">
          <div className="flex space-x-3">
            <button 
              onClick={() => window.print()}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 font-medium hover:bg-gray-50 transition"
            >
              <Icons.FileText className="w-4 h-4 mr-2" /> Print
            </button>
            <button className="flex items-center px-4 py-2 bg-brand-600 rounded-lg text-white font-medium hover:bg-brand-700 transition">
              <Icons.Download className="w-4 h-4 mr-2" /> Download PDF
            </button>
          </div>
        </div>

        {/* Certificate Container */}
        <div className="bg-white text-center p-1 shadow-2xl overflow-hidden relative print:shadow-none print:w-full print:h-screen print:flex print:items-center print:justify-center">
          
          {/* Border Design */}
          <div className="border-8 border-double border-brand-900 p-10 h-full flex flex-col items-center justify-center relative bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]">
            
            {/* Corner Ornaments (CSS shapes) */}
            <div className="absolute top-4 left-4 w-16 h-16 border-t-4 border-l-4 border-brand-600"></div>
            <div className="absolute top-4 right-4 w-16 h-16 border-t-4 border-r-4 border-brand-600"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 border-b-4 border-l-4 border-brand-600"></div>
            <div className="absolute bottom-4 right-4 w-16 h-16 border-b-4 border-r-4 border-brand-600"></div>

            {/* Logo */}
            <div className="mb-8">
               <span className="text-4xl font-bold text-brand-700 tracking-wider">Future<span className="text-brand-500">X</span></span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 uppercase tracking-widest mb-4">
              Certificate of Completion
            </h1>
            
            <p className="text-lg text-gray-500 font-serif italic mb-8">
              This certificate is proudly presented to
            </p>

            {/* Student Name */}
            <div className="border-b-2 border-gray-400 px-12 pb-2 mb-8 min-w-[300px]">
               <h2 className="text-3xl md:text-5xl font-cursive text-brand-800 font-bold" style={{ fontFamily: 'cursive' }}>
                 {studentName}
               </h2>
            </div>

            <p className="text-lg text-gray-500 font-serif italic mb-6">
              For successfully completing the comprehensive course
            </p>

            {/* Course Name */}
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12 max-w-3xl">
              {course.title}
            </h3>

            {/* Footer / Signatures */}
            <div className="w-full grid grid-cols-3 gap-8 mt-8 items-end">
              <div className="flex flex-col items-center">
                 <div className="w-40 border-b border-gray-400 mb-2"></div>
                 <p className="text-sm font-bold text-gray-900 uppercase">Date</p>
                 <p className="text-sm text-gray-600">{completionDate}</p>
              </div>

              <div className="flex flex-col items-center justify-center">
                 <div className="w-24 h-24 bg-brand-600 text-white rounded-full flex items-center justify-center shadow-inner mb-4 print:mb-0">
                    <Icons.Award className="w-12 h-12" />
                 </div>
                 <p className="text-xs text-brand-800 font-bold uppercase tracking-widest mt-2">Verified</p>
              </div>

              <div className="flex flex-col items-center">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Signature_sample.svg/1200px-Signature_sample.svg.png" alt="Signature" className="h-12 object-contain mb-2 opacity-80" />
                 <div className="w-40 border-b border-gray-400 mb-2"></div>
                 <p className="text-sm font-bold text-gray-900 uppercase">{course.instructorName}</p>
                 <p className="text-xs text-gray-500 uppercase">Lead Instructor</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Certificate;