import React, { useState } from 'react';
import { PublicNavbar, BackBar } from '../components/Layout';
import * as Icons from '../components/Icons';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PublicNavbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BackBar />
        <div className="text-center mb-16">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Contact Us</h1>
          <p className="mt-4 text-lg text-gray-600">
            Have questions? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Get in Touch</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Icons.MapPin className="h-6 w-6 text-brand-600" />
                </div>
                <div className="ml-4">
                  <p className="font-medium text-gray-900">Headquarters</p>
                  <p className="text-gray-600">123 Tech Park Avenue,<br />Silicon Valley, CA 94025</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Icons.Phone className="h-6 w-6 text-brand-600" />
                </div>
                <div className="ml-4">
                  <p className="font-medium text-gray-900">Phone</p>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                  <p className="text-sm text-gray-500">Mon-Fri 9am to 6pm PST</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Icons.MessageSquare className="h-6 w-6 text-brand-600" />
                </div>
                <div className="ml-4">
                  <p className="font-medium text-gray-900">Email</p>
                  <p className="text-gray-600">support@futurex.com</p>
                  <p className="text-gray-600">partnerships@futurex.com</p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <h4 className="font-medium text-gray-900 mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {['Twitter', 'Facebook', 'LinkedIn', 'Instagram'].map((social) => (
                  <button key={social} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-brand-100 hover:text-brand-600 transition">
                    <span className="sr-only">{social}</span>
                    <Icons.ArrowRight className="w-4 h-4 transform -rotate-45" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-10">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <Icons.CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Message Sent!</h3>
                <p className="mt-2 text-gray-600">Thank you for reaching out. We will get back to you within 24 hours.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-brand-600 font-medium hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 py-3 px-4 border"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 py-3 px-4 border"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                  <select
                    id="subject"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 py-3 px-4 border"
                  >
                    <option>General Inquiry</option>
                    <option>Course Support</option>
                    <option>Billing Question</option>
                    <option>Partnership Opportunity</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 py-3 px-4 border"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-brand-600 text-white py-3 px-4 rounded-md font-medium hover:bg-brand-700 transition shadow-sm"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;