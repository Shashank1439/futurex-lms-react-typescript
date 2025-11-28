import React, { useState, useRef } from 'react';
import { DashboardLayout } from '../../components/Layout';
import * as Icons from '../../components/Icons';

const MOCK_FILES = [
  { id: 1, name: 'React_Hooks_Cheatsheet.pdf', size: '1.2 MB', date: '2023-10-15', type: 'pdf' },
  { id: 2, name: 'Advanced_State_Management.pptx', size: '4.5 MB', date: '2023-10-18', type: 'ppt' },
  { id: 3, name: 'Project_Starter_Code.zip', size: '12 MB', date: '2023-10-20', type: 'zip' },
];

const TrainerMaterials: React.FC = () => {
  const [files, setFiles] = useState(MOCK_FILES);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleDelete = (id: number) => {
    if(confirm('Are you sure you want to delete this file?')) {
      setFiles(files.filter(f => f.id !== id));
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      // Simulate upload delay
      setTimeout(() => {
        setFiles(prev => [{
          id: Date.now(),
          name: file.name,
          size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
          date: new Date().toISOString().split('T')[0],
          type: file.name.split('.').pop() || 'file'
        }, ...prev]);
        setUploading(false);
      }, 1500);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
         <div className="flex justify-between items-center animate-fade-in-up">
            <div>
               <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Study Materials</h1>
               <p className="text-gray-500 dark:text-gray-400">Upload and manage resources for your students.</p>
            </div>
            <button 
              onClick={handleUploadClick}
              disabled={uploading}
              className="bg-brand-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-brand-700 flex items-center shadow-md transition-all disabled:opacity-50"
            >
               {uploading ? <Icons.Clock className="w-5 h-5 mr-2 animate-spin" /> : <Icons.Upload className="w-5 h-5 mr-2" />} 
               {uploading ? 'Uploading...' : 'Upload New File'}
            </button>
            <input 
               type="file" 
               ref={fileInputRef} 
               className="hidden" 
               onChange={handleFileChange}
            />
         </div>

         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 animate-fade-in-up animate-delay-100">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
               {files.map(file => (
                 <li key={file.id} className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                    <div className="flex items-center">
                       <div className="w-10 h-10 bg-gray-100 dark:bg-gray-900 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400 mr-4">
                          <Icons.FileText className="w-6 h-6" />
                       </div>
                       <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{file.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{file.size} • Uploaded on {file.date}</p>
                       </div>
                    </div>
                    <div className="flex space-x-2">
                       <button className="p-2 text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition" title="Download">
                          <Icons.Download className="w-5 h-5" />
                       </button>
                       <button 
                         onClick={() => handleDelete(file.id)}
                         className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition"
                         title="Delete"
                        >
                          <Icons.Trash className="w-5 h-5" />
                       </button>
                    </div>
                 </li>
               ))}
               {files.length === 0 && (
                 <li className="p-8 text-center text-gray-500 dark:text-gray-400">No files uploaded yet.</li>
               )}
            </ul>
         </div>
      </div>
    </DashboardLayout>
  );
};

export default TrainerMaterials;