import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/Layout';
import * as Icons from '../../components/Icons';

const TRANSACTIONS = [
  { id: 'TXN-1001', date: '2023-09-15', course: 'Full Stack React Development', amount: 499.00, status: 'Completed', method: 'Credit Card •••• 4242' },
  { id: 'TXN-1002', date: '2023-08-01', course: 'Python for Beginners', amount: 199.00, status: 'Completed', method: 'PayPal' },
  { id: 'TXN-1003', date: '2023-10-10', course: 'AWS Certification', amount: 350.00, status: 'Pending', method: 'Bank Transfer' },
];

const StudentPayments: React.FC = () => {
  const navigate = useNavigate();

  const handleDownload = () => {
    // Generate simple CSV
    const csvContent = "data:text/csv;charset=utf-8," 
        + "ID,Date,Course,Amount,Status\n"
        + TRANSACTIONS.map(e => `${e.id},${e.date},${e.course},${e.amount},${e.status}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 animate-fade-in-up">
          <div>
             <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Payments & Invoices</h1>
             <p className="text-gray-500 dark:text-gray-400">Manage your billing history and payment methods.</p>
          </div>
          <button 
            onClick={() => navigate('/student/payment-methods/add')}
            className="bg-brand-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-brand-700 shadow-md flex items-center justify-center transition hover:-translate-y-0.5"
          >
             <Icons.Plus className="w-5 h-5 mr-2" /> Add Payment Method
          </button>
        </div>

        {/* Saved Methods Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up animate-delay-100">
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-6 text-white shadow-lg relative overflow-hidden group">
             <div className="relative z-10 flex flex-col h-full justify-between min-h-[140px]">
                <div className="flex justify-between items-start">
                  <Icons.CreditCard className="w-8 h-8 opacity-90" />
                  <span className="bg-white/20 text-xs px-2 py-1 rounded backdrop-blur-sm">Default</span>
                </div>
                <div>
                  <p className="font-mono text-xl tracking-wider mb-1">•••• •••• •••• 4242</p>
                  <p className="text-xs text-gray-400">Expires 12/25</p>
                </div>
             </div>
             <Icons.CreditCard className="absolute -bottom-4 -right-4 w-32 h-32 text-white opacity-5 transform rotate-12" />
          </div>
          
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm flex flex-col justify-center items-center text-center hover:border-brand-300 dark:hover:border-brand-500 transition cursor-pointer group" onClick={() => navigate('/student/payment-methods/add')}>
             <div className="w-12 h-12 bg-brand-50 dark:bg-brand-900/30 rounded-full flex items-center justify-center text-brand-600 dark:text-brand-400 mb-3 group-hover:bg-brand-100 dark:group-hover:bg-brand-900 transition">
                <Icons.Plus className="w-6 h-6" />
             </div>
             <h3 className="text-gray-900 dark:text-white font-medium">Add New Card</h3>
             <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Secure payment integration</p>
          </div>
        </div>

        {/* Recent Transactions Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden animate-fade-in-up animate-delay-200">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50/50 dark:bg-gray-900/50">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Transaction History</h3>
            <button onClick={handleDownload} className="text-sm text-brand-600 dark:text-brand-400 font-medium hover:text-brand-800 dark:hover:text-brand-300 flex items-center">
               <Icons.Download className="w-4 h-4 mr-1" /> Download All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date & ID</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Course / Item</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Method</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {TRANSACTIONS.map((txn) => (
                  <tr key={txn.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                       <div className="text-sm font-medium text-gray-900 dark:text-white">{txn.date}</div>
                       <div className="text-xs text-gray-500 dark:text-gray-400 font-mono">{txn.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 font-medium">{txn.course}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <div className="p-1.5 bg-gray-100 dark:bg-gray-700 rounded mr-2">
                           <Icons.CreditCard className="w-3 h-3 text-gray-600 dark:text-gray-300" />
                        </div>
                        {txn.method}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-white">${txn.amount.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        txn.status === 'Completed' 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200 border border-green-200 dark:border-green-800' 
                          : 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200 border border-yellow-200 dark:border-yellow-800'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 self-center ${txn.status === 'Completed' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                        {txn.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => navigate(`/student/invoice/${txn.id}`)}
                        className="text-gray-500 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 flex items-center justify-end w-full transition"
                      >
                        <Icons.FileText className="w-4 h-4 mr-1" /> Invoice
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {TRANSACTIONS.length > 5 && (
             <div className="p-4 border-t border-gray-200 dark:border-gray-700 text-center">
               <button className="text-sm font-medium text-brand-600 dark:text-brand-400 hover:text-brand-800 dark:hover:text-brand-300">View All Transactions</button>
             </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentPayments;