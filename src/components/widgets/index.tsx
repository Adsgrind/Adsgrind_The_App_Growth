"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Bot, X, MessageSquare } from 'lucide-react';
import { cn } from '@/components/ui';
import { getChatResponse } from '@/app/actions/chat';

export const WhatsAppButton = () => {
  return (
    <motion.a
      href="https://wa.me/919625982835?text=Hi%20ADSGRIND%2C%20I%27d%20like%20to%20inquire%20about%20your%20services."
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1, y: -4 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-24 md:right-24 z-40 w-14 h-14 bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-full flex items-center justify-center text-white shadow-[0_10px_25px_-5px_rgba(37,211,102,0.5),0_8px_10px_-6px_rgba(0,0,0,0.1)] cursor-pointer overflow-hidden group"
    >
      {/* Gloss effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <svg className="w-8 h-8 relative z-10" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 15.5 17.38 18.23 13.88 18.23C13.83 18.23 13.78 18.23 13.73 18.23C13.68 18.23 13.64 18.21 13.59 18.19L11.53 17.53L10.94 17.9L8.46 19.49L9.12 17.06L9.36 16.17L8.74 15.42C7.81 14.3 7.32 12.92 7.32 11.92C7.32 8.41 10.21 5.51 13.72 5.51" />
      </svg>
      
      <span className="absolute top-1 right-1 flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-white opacity-20"></span>
      </span>
    </motion.a>
  );
};

export const AIChatbot = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [messages, setMessages] = React.useState([
    { id: 1, text: "Hello! I'm your ADSGRIND growth assistant. How can I help you scale your business today?", sender: 'bot' }
  ]);
  const [isTyping, setIsTyping] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = { id: Date.now(), text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Get real AI response
    try {
      const response = await getChatResponse(inputValue);
      const botResponse = { 
        id: Date.now() + 1, 
        text: response, 
        sender: 'bot' 
      };
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      const botResponse = { 
        id: Date.now() + 1, 
        text: "I'm sorry, I encountered an error. Please try again.", 
        sender: 'bot' 
      };
      setMessages(prev => [...prev, botResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1, y: -4 }}
        whileTap={{ scale: 0.9 }}
        className="w-14 h-14 bg-gradient-brand rounded-full flex items-center justify-center text-white shadow-[0_10px_25px_-5px_rgba(157,80,187,0.5),0_8px_10px_-6px_rgba(0,0,0,0.1)] relative overflow-hidden group"
      >
        {/* Gloss effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="relative z-10"
        >
          {isOpen ? (
            <X size={24} />
          ) : (
            <Bot size={28} />
          )}
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="absolute bottom-20 right-0 w-[calc(100vw-2rem)] sm:w-[28rem] h-[30rem] sm:h-[32rem] bg-slate-900/98 backdrop-blur-2xl border border-white/10 rounded-3xl p-0 flex flex-col overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] z-50"
          >
            {/* Header */}
            <div className="p-5 bg-gradient-brand flex items-center justify-between shadow-lg relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-xl border border-white/10 shadow-inner">
                  <Bot size={24} className="text-white drop-shadow-sm" />
                </div>
                <div>
                  <h4 className="text-base font-black tracking-wider uppercase italic text-white">ADSGRIND AI</h4>
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-success opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-success"></span>
                    </span>
                    <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest">Growth Expert Active</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setMessages([{ id: 1, text: "Hello! I'm your ADSGRIND growth assistant. How can I help you scale your business today?", sender: 'bot' }])}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all border border-white/5"
                title="Clear Chat"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-5 flex flex-col gap-5 overflow-y-auto bg-slate-950/40 custom-scrollbar">
              {messages.map((msg) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  key={msg.id}
                  className={cn(
                    "rounded-2xl px-5 py-4 text-sm max-w-[85%] leading-relaxed shadow-lg relative group",
                    msg.sender === 'user' 
                      ? "bg-gradient-to-br from-brand-primary to-brand-orange self-end rounded-tr-none text-white font-medium" 
                      : "bg-white/5 border border-white/10 self-start rounded-tl-none text-slate-100 backdrop-blur-sm"
                  )}
                >
                  {msg.text}
                  <div className={cn(
                    "absolute top-0 w-3 h-3",
                    msg.sender === 'user' ? "-right-2 bg-brand-orange" : "-left-2 bg-white/5"
                  )} style={{ clipPath: msg.sender === 'user' ? 'polygon(0 0, 0 100%, 100% 0)' : 'polygon(0 0, 100% 100%, 100% 0)' }}></div>
                </motion.div>
              ))}
              
              {isTyping && (
                <div className="flex flex-col gap-2 self-start max-w-[85%]">
                  <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-none p-4 text-sm flex gap-1.5 shadow-sm items-center">
                    <span className="w-2 h-2 rounded-full bg-brand-primary animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-2 h-2 rounded-full bg-brand-orange animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-2 h-2 rounded-full bg-brand-purple animate-bounce"></span>
                  </div>
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest ml-1">AI is thinking...</span>
                </div>
              )}
              <div ref={messagesEndRef} className="h-2" />
            </div>

            {/* Input Area */}
            <div className="p-5 border-t border-white/10 bg-slate-900/90 backdrop-blur-md">
              <div className="flex gap-3 items-end">
                <div className="relative flex-1">
                  <textarea
                    rows={1}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="Type your growth question..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-brand-primary/50 transition-all placeholder:text-slate-500 text-white resize-none max-h-32 min-h-[56px] custom-scrollbar pr-12 shadow-inner"
                    style={{ height: 'auto' }}
                  />
                  <div className="absolute right-3 bottom-3 flex gap-2">
                    <button 
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isTyping}
                      className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center text-white transition-all shadow-xl active:scale-90",
                        inputValue.trim() ? "bg-gradient-brand hover:brightness-110" : "bg-white/10 text-white/30 cursor-not-allowed"
                      )}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"></path><path d="M22 2 11 13"></path></svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-3 text-[9px] text-center text-slate-600 font-medium uppercase tracking-tight">
                Powered by ADSGRIND Intelligence • Always scaling
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

