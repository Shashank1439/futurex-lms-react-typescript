import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as Icons from '../components/Icons';

const LiveClassroom: React.FC = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [micOn, setMicOn] = useState(false);
  const [videoOn, setVideoOn] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [messages, setMessages] = useState<{user: string, text: string}[]>([
    { user: 'System', text: 'Welcome to the Live Class! Please keep your mic muted when not speaking.' },
    { user: 'Sarah Connor', text: 'We will start in 2 minutes.' }
  ]);
  const [inputMsg, setInputMsg] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    setMessages([...messages, { user: 'Me', text: inputMsg }]);
    setInputMsg('');
  };

  return (
    <div className="h-screen bg-gray-900 flex flex-col text-white overflow-hidden">
      {/* Header */}
      <div className="h-14 bg-gray-800 flex items-center justify-between px-4 border-b border-gray-700">
        <div className="flex items-center space-x-2">
           <div className="bg-red-600 w-2 h-2 rounded-full animate-pulse"></div>
           <span className="font-semibold text-sm">LIVE: React Hooks Deep Dive</span>
           <span className="text-gray-400 text-xs ml-2">00:45:12</span>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-700 rounded-lg">
           <Icons.Users className="w-5 h-5" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Stage */}
        <div className="flex-1 p-4 flex flex-col relative">
           <div className="flex-1 bg-black rounded-xl overflow-hidden relative flex items-center justify-center">
             {/* Placeholder for Screen Share / Video */}
             <div className="text-center">
               <div className="w-24 h-24 bg-brand-600 rounded-full mx-auto flex items-center justify-center text-3xl font-bold mb-4">
                 SC
               </div>
               <h3 className="text-xl font-medium">Sarah Connor is presenting</h3>
               <p className="text-gray-500 mt-2">Screen share active</p>
             </div>
             
             {/* Floating Trainer Video */}
             <div className="absolute top-4 right-4 w-48 h-32 bg-gray-800 rounded-lg border border-gray-700 shadow-lg overflow-hidden">
                <img src="https://picsum.photos/201" alt="Trainer" className="w-full h-full object-cover" />
                <div className="absolute bottom-1 left-2 text-xs bg-black/50 px-1 rounded">Trainer</div>
             </div>
           </div>

           {/* Controls Bar */}
           <div className="h-16 mt-4 flex items-center justify-center space-x-4">
              <button 
                onClick={() => setMicOn(!micOn)}
                className={`p-4 rounded-full ${micOn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-600 hover:bg-red-700'} transition`}
              >
                {micOn ? <Icons.Mic className="w-6 h-6" /> : <Icons.MicOff className="w-6 h-6" />}
              </button>
              
              <button 
                onClick={() => setVideoOn(!videoOn)}
                className={`p-4 rounded-full ${videoOn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-600 hover:bg-red-700'} transition`}
              >
                {videoOn ? <Icons.Camera className="w-6 h-6" /> : <Icons.CameraOff className="w-6 h-6" />}
              </button>

              <button className="p-4 rounded-full bg-gray-700 hover:bg-gray-600 transition">
                 <Icons.Monitor className="w-6 h-6" />
              </button>

              <button 
                onClick={() => navigate(-1)}
                className="px-6 py-3 rounded-full bg-red-600 hover:bg-red-700 font-bold ml-8"
              >
                Leave Class
              </button>
           </div>
        </div>

        {/* Sidebar (Chat/Participants) */}
        {sidebarOpen && (
          <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
             <div className="flex border-b border-gray-700">
               <button className="flex-1 py-3 text-sm font-medium border-b-2 border-brand-500 text-brand-500">Chat</button>
               <button className="flex-1 py-3 text-sm font-medium text-gray-400 hover:text-gray-200">People (24)</button>
             </div>
             
             <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, idx) => (
                  <div key={idx} className="flex flex-col">
                     <span className="text-xs font-bold text-gray-400">{msg.user}</span>
                     <span className="text-sm bg-gray-700 p-2 rounded-lg mt-1 inline-block self-start">
                       {msg.text}
                     </span>
                  </div>
                ))}
             </div>

             <div className="p-4 border-t border-gray-700">
               <form onSubmit={handleSend} className="flex gap-2">
                 <input 
                   type="text" 
                   value={inputMsg}
                   onChange={(e) => setInputMsg(e.target.value)}
                   placeholder="Type a message..."
                   className="flex-1 bg-gray-700 border-none rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-brand-500 text-white"
                 />
                 <button type="submit" className="bg-brand-600 p-2 rounded-md hover:bg-brand-700">
                   <Icons.ArrowRight className="w-4 h-4" />
                 </button>
               </form>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveClassroom;