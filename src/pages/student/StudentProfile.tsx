import React, { useState, useEffect, useRef } from 'react';
import { DashboardLayout } from '../../components/Layout';
import { useAuth } from '../../services/authService';
import * as Icons from '../../components/Icons';

const StudentProfile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    avatarUrl: '',
    bio: ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);
  const [passwordMessage, setPasswordMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        avatarUrl: user.avatarUrl || '',
        bio: user.bio || ''
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  // Resize and compress image to avoid LocalStorage limits
  const resizeAndCompressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const elem = document.createElement('canvas');
          const maxWidth = 300; // Resize to max 300px width/height
          const maxHeight = 300;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }

          elem.width = width;
          elem.height = height;
          const ctx = elem.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          // Compress to JPEG with 0.7 quality
          resolve(elem.toDataURL('image/jpeg', 0.7)); 
        };
        img.onerror = (error) => reject(error);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setMessage({ type: 'error', text: 'Please upload an image file.' });
        return;
      }
      
      try {
        const base64 = await resizeAndCompressImage(file);
        setFormData(prev => ({ ...prev, avatarUrl: base64 }));
      } catch (error) {
        console.error(error);
        setMessage({ type: 'error', text: 'Failed to process image.' });
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setMessage({ type: 'error', text: 'Name and Email are required.' });
      return;
    }

    try {
      updateUser(formData);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      // Clear message after 3 seconds
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update profile. Storage might be full.' });
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'All fields are required.' });
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'New passwords do not match.' });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordMessage({ type: 'error', text: 'Password must be at least 6 characters long.' });
      return;
    }

    // Simulate API call success
    setPasswordMessage({ type: 'success', text: 'Password changed successfully!' });
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setTimeout(() => setPasswordMessage(null), 3000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Profile</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage your account information and security settings.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sidebar Info Card */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 text-center">
              <div className="relative inline-block group cursor-pointer" onClick={handleFileClick}>
                <img 
                  src={formData.avatarUrl || `https://ui-avatars.com/api/?name=${formData.name}&background=random`} 
                  alt={formData.name} 
                  className="w-32 h-32 rounded-full object-cover border-4 border-gray-50 dark:border-gray-700 mx-auto transition-opacity group-hover:opacity-75"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <Icons.Upload className="w-8 h-8 text-white drop-shadow-lg" />
                </div>
                <button 
                  type="button"
                  className="absolute bottom-0 right-0 p-2 bg-brand-600 text-white rounded-full hover:bg-brand-700 shadow-md transition-colors"
                >
                  <Icons.Camera className="w-4 h-4" />
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  className="hidden" 
                  accept="image/*"
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Click to upload new photo</p>
              
              <h3 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">{formData.name}</h3>
              <p className="text-brand-600 dark:text-brand-400 font-medium text-sm">{user?.role}</p>
              
              <div className="mt-6 text-left space-y-3">
                 <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                   <Icons.BookOpen className="w-4 h-4 mr-3" />
                   <span>2 Active Courses</span>
                 </div>
                 <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                   <Icons.CheckCircle className="w-4 h-4 mr-3" />
                   <span>88% Attendance</span>
                 </div>
                 <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                   <Icons.Calendar className="w-4 h-4 mr-3" />
                   <span>Joined Sept 2023</span>
                 </div>
              </div>
            </div>
          </div>

          {/* Forms Column */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Personal Details Form */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Personal Details</h3>
              </div>
              
              <div className="p-6">
                {message && (
                  <div className={`mb-6 p-4 rounded-md ${message.type === 'success' ? 'bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-100' : 'bg-red-50 text-red-700 dark:bg-red-900 dark:text-red-100'}`}>
                    {message.text}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Icons.User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="focus:ring-brand-500 focus:border-brand-500 block w-full pl-10 sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md py-2 border transition-colors"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Icons.MessageSquare className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="focus:ring-brand-500 focus:border-brand-500 block w-full pl-10 sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md py-2 border transition-colors"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Icons.Phone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="phone"
                          id="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="focus:ring-brand-500 focus:border-brand-500 block w-full pl-10 sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md py-2 border transition-colors"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                    </div>
                    
                    <div className="sm:col-span-6">
                      <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Bio</label>
                      <div className="mt-1">
                        <textarea
                          id="bio"
                          name="bio"
                          rows={3}
                          value={formData.bio}
                          onChange={handleChange}
                          className="shadow-sm focus:ring-brand-500 focus:border-brand-500 block w-full sm:text-sm border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md p-2 transition-colors"
                          placeholder="Brief description about yourself..."
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-5">
                    <button
                      type="button"
                      onClick={() => setFormData({
                        name: user?.name || '',
                        email: user?.email || '',
                        phone: user?.phone || '',
                        avatarUrl: user?.avatarUrl || '',
                        bio: user?.bio || ''
                      })}
                      className="bg-white dark:bg-gray-700 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 mr-3 transition-colors"
                    >
                      Reset
                    </button>
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Security Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                  <Icons.Shield className="w-5 h-5 mr-2 text-brand-600 dark:text-brand-400" />
                  Security
                </h3>
              </div>
              
              <div className="p-6">
                {passwordMessage && (
                  <div className={`mb-6 p-4 rounded-md ${passwordMessage.type === 'success' ? 'bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-100' : 'bg-red-50 text-red-700 dark:bg-red-900 dark:text-red-100'}`}>
                    {passwordMessage.text}
                  </div>
                )}
                
                <form onSubmit={handlePasswordSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-6">
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Current Password</label>
                      <input
                        type="password"
                        name="currentPassword"
                        id="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        className="mt-1 focus:ring-brand-500 focus:border-brand-500 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md py-2 border px-3 transition-colors"
                        placeholder="••••••••"
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
                      <input
                        type="password"
                        name="newPassword"
                        id="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        className="mt-1 focus:ring-brand-500 focus:border-brand-500 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md py-2 border px-3 transition-colors"
                        placeholder="••••••••"
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm New Password</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        className="mt-1 focus:ring-brand-500 focus:border-brand-500 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md py-2 border px-3 transition-colors"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-5">
                     <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-900 dark:bg-gray-600 hover:bg-gray-800 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors"
                    >
                      Change Password
                    </button>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentProfile;