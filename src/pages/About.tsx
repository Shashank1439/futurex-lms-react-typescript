import React from 'react';
import { PublicNavbar, BackBar } from '../components/Layout';
import * as Icons from '../components/Icons';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <PublicNavbar />
      
      {/* Hero */}
      <div className="bg-brand-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BackBar className="mb-8 text-white hover:text-gray-200" />
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl">About FutureX</h1>
            <p className="mt-4 text-xl text-brand-100 max-w-3xl mx-auto">
                We are on a mission to democratize education and empower the next generation of tech leaders through accessible, high-quality learning experiences.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-4">
                Founded in 2023, FutureX started with a simple idea: education should be engaging, accessible, and practical. We bridge the gap between theoretical knowledge and industry demands.
              </p>
              <p className="text-lg text-gray-600">
                Whether you are looking to start a new career, upskill, or explore a passion, we provide the tools, mentorship, and community you need to succeed.
              </p>
            </div>
            <div className="mt-10 lg:mt-0">
               <img 
                 src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                 alt="Team working" 
                 className="rounded-xl shadow-lg"
               />
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-brand-600">10k+</div>
              <div className="mt-2 text-gray-600 font-medium">Students</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-brand-600">50+</div>
              <div className="mt-2 text-gray-600 font-medium">Expert Trainers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-brand-600">100+</div>
              <div className="mt-2 text-gray-600 font-medium">Courses</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-brand-600">95%</div>
              <div className="mt-2 text-gray-600 font-medium">Employment Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;