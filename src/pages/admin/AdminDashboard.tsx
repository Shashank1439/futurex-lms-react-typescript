import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/Layout';
import * as Icons from '../../components/Icons';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CHART_DATA_MONTHLY } from '../../constants';

const StatCard: React.FC<{ title: string; value: string; trend: string; icon: React.ElementType; positive?: boolean }> = ({ title, value, trend, icon: Icon, positive = true }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex items-center justify-between transition-colors duration-200 hover:shadow-md hover:-translate-y-0.5">
    <div>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</h3>
      <p className={`text-xs mt-2 font-medium ${positive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
        {trend} vs last month
      </p>
    </div>
    <div className={`p-3 rounded-lg ${positive ? 'bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400' : 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400'}`}>
      <Icon className="w-6 h-6" />
    </div>
  </div>
);

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleExport = () => {
    // Generate CSV Content
    const headers = "Month,Revenue\n";
    const rows = CHART_DATA_MONTHLY.map(d => `${d.name},${d.value}`).join("\n");
    const csvContent = "data:text/csv;charset=utf-8," + headers + rows;
    
    // Trigger Download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "monthly_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    alert("Report exported successfully!");
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="animate-fade-in-up">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Overview</h1>
          <p className="text-gray-500 dark:text-gray-400">Track institute performance and growth.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up animate-delay-100">
          <StatCard title="Total Students" value="2,450" trend="+12%" icon={Icons.Users} />
          <StatCard title="Total Revenue" value="$124k" trend="+8%" icon={Icons.CreditCard} />
          <StatCard title="Active Courses" value="48" trend="+2" icon={Icons.BookOpen} />
          <StatCard title="Instructor Rating" value="4.8" trend="+0.1" icon={Icons.CheckCircle} />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in-up animate-delay-200">
           <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-200">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Revenue & Enrollments</h3>
              <div className="h-72">
                 <ResponsiveContainer width="100%" height="100%">
                   <AreaChart data={CHART_DATA_MONTHLY} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                      <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.2} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f3f4f6', borderRadius: '8px' }}
                        itemStyle={{ color: '#fff' }}
                      />
                      <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                   </AreaChart>
                 </ResponsiveContainer>
              </div>
           </div>

           <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-200">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                 <button 
                   onClick={() => navigate('/admin/users')}
                   className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                 >
                    <span className="flex items-center space-x-3">
                       <Icons.User className="text-gray-400 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors" />
                       <span className="font-medium text-sm text-gray-700 dark:text-gray-200 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">Manage Students</span>
                    </span>
                    <Icons.ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors" />
                 </button>

                 <button 
                   onClick={() => navigate('/admin/manage-courses')}
                   className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                 >
                    <span className="flex items-center space-x-3">
                       <Icons.Video className="text-gray-400 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors" />
                       <span className="font-medium text-sm text-gray-700 dark:text-gray-200 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">Manage Courses</span>
                    </span>
                    <Icons.ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors" />
                 </button>

                 <button 
                   onClick={() => navigate('/admin/reviews')}
                   className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                 >
                    <span className="flex items-center space-x-3">
                       <Icons.MessageSquare className="text-gray-400 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors" />
                       <span className="font-medium text-sm text-gray-700 dark:text-gray-200 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">Review Approvals</span>
                    </span>
                    <div className="flex items-center space-x-2">
                       <span className="bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">New</span>
                       <Icons.ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors" />
                    </div>
                 </button>

                 <button 
                   onClick={handleExport}
                   className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                 >
                    <span className="flex items-center space-x-3">
                       <Icons.FileText className="text-gray-400 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors" />
                       <span className="font-medium text-sm text-gray-700 dark:text-gray-200 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">Export Reports</span>
                    </span>
                    <Icons.Download className="w-4 h-4 text-gray-400 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors" />
                 </button>
              </div>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;