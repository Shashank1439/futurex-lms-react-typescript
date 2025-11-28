import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/Layout';
import * as Icons from '../../components/Icons';

const AddPaymentMethod: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    cardNumber: '',
    expiry: '',
    cvc: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Simple formatters could go here
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/student/payments');
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Add Payment Method</h1>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-8">
            
            {/* Visual Card Preview */}
            <div className="mb-8 relative w-full max-w-sm mx-auto h-56 bg-gradient-to-br from-brand-700 to-brand-900 rounded-2xl shadow-xl text-white p-6 flex flex-col justify-between transform transition hover:scale-105 duration-300">
              <div className="flex justify-between items-start">
                 <Icons.CreditCard className="w-10 h-10 opacity-80" />
                 <span className="font-mono text-lg italic opacity-70">Debit</span>
              </div>
              <div className="space-y-6">
                 <div className="font-mono text-2xl tracking-widest drop-shadow-md">
                    {formData.cardNumber || '•••• •••• •••• ••••'}
                 </div>
                 <div className="flex justify-between items-end">
                    <div>
                       <div className="text-xs opacity-70 uppercase tracking-wider">Card Holder</div>
                       <div className="font-medium tracking-wide uppercase">{formData.name || 'YOUR NAME'}</div>
                    </div>
                    <div>
                       <div className="text-xs opacity-70 uppercase tracking-wider text-right">Expires</div>
                       <div className="font-mono">{formData.expiry || 'MM/YY'}</div>
                    </div>
                 </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                <div className="relative">
                   <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500 sm:text-sm transition"
                    placeholder="John Doe"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icons.User className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                <div className="relative">
                  <input
                    type="text"
                    name="cardNumber"
                    required
                    maxLength={19}
                    value={formData.cardNumber}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500 sm:text-sm font-mono transition"
                    placeholder="0000 0000 0000 0000"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icons.CreditCard className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="expiry"
                      required
                      maxLength={5}
                      value={formData.expiry}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500 sm:text-sm transition"
                      placeholder="MM/YY"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                       <Icons.Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CVC / CWW</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="cvc"
                      required
                      maxLength={3}
                      value={formData.cvc}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500 sm:text-sm transition"
                      placeholder="123"
                    />
                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                       <Icons.Shield className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Processing...' : 'Save Card'}
                </button>
                <p className="mt-4 text-center text-xs text-gray-500 flex justify-center items-center">
                   <Icons.Shield className="w-3 h-3 mr-1" /> Secure 256-bit SSL encrypted payment
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AddPaymentMethod;