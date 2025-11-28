import React, { useState, useRef, useEffect } from 'react';
import * as Icons from './Icons';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Hi! Welcome to FutureX. How can I help you today?', sender: 'bot' }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      let botResponseText = "Thanks for your message! Our team will get back to you shortly.";
      
      const lowerInput = userMessage.text.toLowerCase();
      if (lowerInput.includes('course') || lowerInput.includes('learn')) {
        botResponseText = "We offer a wide range of courses in Development, Data Science, and Design. Check out our Courses page!";
      } else if (lowerInput.includes('price') || lowerInput.includes('cost')) {
        botResponseText = "Our courses start from $299. You can view detailed pricing on each course page.";
      } else if (lowerInput.includes('contact') || lowerInput.includes('support')) {
         botResponseText = "You can reach us at support@futurex.com or call +1 (555) 123-4567.";
      } else if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
         botResponseText = "Hello there! Ready to start learning?";
      }

      const botResponse: Message = { id: Date.now() + 1, text: botResponseText, sender: 'bot' };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col transition-all duration-200 ease-in-out transform origin-bottom-right">
          {/* Header */}
          <div className="bg-brand-600 p-4 flex justify-between items-center text-white">
            <div className="flex items-center space-x-2">
              <Icons.MessageCircle className="w-5 h-5" />
              <span className="font-bold">FutureX Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-brand-700 p-1 rounded">
              <Icons.X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 h-80 overflow-y-auto bg-gray-50 dark:bg-gray-900 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-lg text-sm ${
                    msg.sender === 'user'
                      ? 'bg-brand-600 text-white rounded-br-none'
                      : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-700 dark:text-white border-none rounded-lg focus:ring-2 focus:ring-brand-500 text-sm"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="bg-brand-600 text-white p-2 rounded-lg hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icons.Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-brand-600 hover:bg-brand-700 text-white rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-brand-300"
      >
        {isOpen ? <Icons.X className="w-6 h-6" /> : <Icons.MessageCircle className="w-7 h-7" />}
      </button>
    </div>
  );
};

export default Chatbot;