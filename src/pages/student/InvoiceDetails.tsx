import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/Layout';
import * as Icons from '../../components/Icons';

const InvoiceDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock Data based on ID (In a real app, fetch from API)
  const invoiceData = {
    id: id || 'INV-001',
    date: 'Sep 15, 2023',
    dueDate: 'Sep 15, 2023',
    status: 'PAID',
    studentName: 'Alex Johnson',
    studentEmail: 'alex@student.futurex.com',
    studentAddress: '123 Learner Way, Springfield, IL',
    items: [
      { desc: 'Full Stack React Development - Course Enrollment', qty: 1, price: 499.00 },
      { desc: 'Platform Fee', qty: 1, price: 10.00 }
    ],
    subtotal: 509.00,
    tax: 40.72, // 8%
    total: 549.72
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        
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

        {/* Invoice Paper */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 sm:p-12 print:shadow-none print:border-none">
          
          {/* Header */}
          <div className="flex justify-between items-start border-b border-gray-100 pb-8 mb-8">
            <div>
              <div className="text-3xl font-bold text-brand-700 mb-2">Future<span className="text-brand-500">X</span></div>
              <p className="text-gray-500 text-sm">
                123 Tech Park Avenue<br />
                Silicon Valley, CA 94025<br />
                support@futurex.com
              </p>
            </div>
            <div className="text-right">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">INVOICE</h1>
              <p className="text-gray-500 font-medium">#{invoiceData.id}</p>
              <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase bg-green-100 text-green-800">
                {invoiceData.status}
              </div>
            </div>
          </div>

          {/* Bill To / Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Billed To</h3>
              <div className="text-gray-900 font-medium">{invoiceData.studentName}</div>
              <div className="text-gray-500 text-sm">{invoiceData.studentEmail}</div>
              <div className="text-gray-500 text-sm">{invoiceData.studentAddress}</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Date Issued</h3>
                <div className="text-gray-900 font-medium">{invoiceData.date}</div>
              </div>
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Due Date</h3>
                <div className="text-gray-900 font-medium">{invoiceData.dueDate}</div>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="mb-8">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-0 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-0 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Qty</th>
                  <th className="px-0 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Unit Price</th>
                  <th className="px-0 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {invoiceData.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="px-0 py-4 text-sm text-gray-900 font-medium">{item.desc}</td>
                    <td className="px-0 py-4 text-right text-sm text-gray-500">{item.qty}</td>
                    <td className="px-0 py-4 text-right text-sm text-gray-500">${item.price.toFixed(2)}</td>
                    <td className="px-0 py-4 text-right text-sm text-gray-900 font-medium">${(item.qty * item.price).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex justify-end">
              <div className="w-full sm:w-1/2 lg:w-1/3 space-y-3">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Subtotal</span>
                  <span>${invoiceData.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Tax (8%)</span>
                  <span>${invoiceData.tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between text-base font-bold text-gray-900">
                  <span>Total</span>
                  <span>${invoiceData.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-12 text-center text-xs text-gray-400 border-t border-gray-100 pt-8">
            <p>Thank you for choosing FutureX. This is a computer-generated invoice.</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InvoiceDetails;