"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const Loader = () => {
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setProgress(prev => (prev < 100 ? prev + 1 : 100));
    }, 35);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#000000] overflow-hidden">
      
      {/* 1. BACKGROUND INFRASTRUCTURE */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Dynamic Orange Atmosphere */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-brand-orange/[0.03] blur-[160px] rounded-full"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Technical Data Grid */}
        <div className="absolute inset-0 opacity-[0.03] bg-grid-sm" />

        {/* Ambient Moving Gradient */}
        <motion.div 
          animate={{ 
            opacity: [0.1, 0.2, 0.1],
            rotate: [0, 360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-tr from-brand-orange/[0.05] via-transparent to-white/[0.02]"
        />

        {/* Cinematic Particles */}
        <div className="absolute inset-0">
          {mounted && [...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-[1px] h-[1px] bg-white rounded-full opacity-[0.1]"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -60, 0],
                opacity: [0.05, 0.2, 0.05],
              }}
              transition={{
                duration: 6 + Math.random() * 6,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>
      </div>

      {/* 2. CORE IDENTITY LAYER */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-lg px-6">
        {/* Logo with Sweep Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative w-24 h-24 mb-10 group"
        >
          <div className="absolute inset-0 bg-brand-orange/20 blur-2xl rounded-full opacity-50 animate-pulse" />
          <img 
            src="/logo/2ccbcd53-e176-41fc-b3cb-70c3f0620511.jpg" 
            alt="ADSGRIND"
            className="w-full h-full object-contain grayscale brightness-[2.5] contrast-[1.2] mix-blend-screen relative z-10 rounded-full"
          />
          {/* Light Sweep Effect */}
          <motion.div 
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 z-20"
          />
        </motion.div>

        {/* Brand Architecture */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="font-sans font-black text-4xl sm:text-5xl tracking-[-0.04em] text-white uppercase leading-none mb-2"
          >
            ADSGRIND
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-[9px] font-bold tracking-[0.6em] text-white/40 uppercase ml-1"
          >
            THE APP GROWTH
          </motion.p>
        </div>

        {/* Technical Progress Section */}
        <div className="w-64 space-y-4">
          <div className="flex items-center justify-between">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-[8px] font-bold text-white/30 uppercase tracking-[0.3em]"
            >
              Preparing Growth Infrastructure
            </motion.span>
            <span className="text-[8px] font-bold text-brand-orange tabular-nums">{progress}%</span>
          </div>

          {/* Premium Progress Bar */}
          <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden relative">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-brand-orange shadow-orange-glow relative z-10"
            />
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="absolute inset-0 h-full bg-brand-orange/40 blur-[4px]"
            />
          </div>
        </div>

        {/* Active Node Status */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-16 flex items-center gap-2"
        >
          <div className="w-1 h-1 rounded-full bg-brand-orange" />
          <span className="text-[7px] font-bold text-white/20 uppercase tracking-[0.4em]">Intelligence_Node · Verified</span>
        </motion.div>
      </div>
      
      {/* Cinematic Grain Overlay */}
      <div className="absolute inset-0 z-30 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};
