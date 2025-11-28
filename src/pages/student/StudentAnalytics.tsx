import React from 'react';
import { DashboardLayout } from '../../components/Layout';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Legend } from 'recharts';
import * as Icons from '../../components/Icons';

const PERFORMANCE_DATA = [
  { subject: 'React', score: 85, avg: 70 },
  { subject: 'Node.js', score: 78, avg: 72 },
  { subject: 'Database', score: 92, avg: 68 },
  { subject: 'UI/UX', score: 88, avg: 75 },
  { subject: 'DevOps', score: 65, avg: 60 },
];

const TIME_SPENT_DATA = [
  { day: 'Mon', hours: 2.5 },
  { day: 'Tue', hours: 4.0 },
  { day: 'Wed', hours: 1.5 },
  { day: 'Thu', hours: 3.0 },
  { day: 'Fri', hours: 5.0 },
  { day: 'Sat', hours: 6.5 },
  { day: 'Sun', hours: 2.0 },
];

const StudentAnalytics: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Performance Analytics</h1>
          <p className="text-gray-500">Detailed insights into your learning journey.</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                <Icons.CheckCircle className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Avg. Quiz Score</p>
                <h3 className="text-2xl font-bold text-gray-900">81.6%</h3>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
             <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg text-green-600">
                <Icons.Calendar className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Attendance</p>
                <h3 className="text-2xl font-bold text-gray-900">92%</h3>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
             <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg text-purple-600">
                <Icons.Clock className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Learning Hours</p>
                <h3 className="text-2xl font-bold text-gray-900">124h</h3>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
             <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg text-yellow-600">
                <Icons.Award className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Certificates</p>
                <h3 className="text-2xl font-bold text-gray-900">1</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Quiz Performance */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Quiz Performance vs Average</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={PERFORMANCE_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="subject" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="score" name="My Score" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="avg" name="Class Avg" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Time Spent */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
             <h3 className="text-lg font-bold text-gray-900 mb-6">Study Time (Last 7 Days)</h3>
             <div className="h-80">
               <ResponsiveContainer width="100%" height="100%">
                 <LineChart data={TIME_SPENT_DATA}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Line type="monotone" dataKey="hours" stroke="#8b5cf6" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                 </LineChart>
               </ResponsiveContainer>
             </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentAnalytics;