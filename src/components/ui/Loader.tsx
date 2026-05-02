"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Loader = () => {
  const [isVisible, setIsVisible] = useState(true);

  // We'll manage visibility from the layout, but this component can handle its own internal timing if needed
  // For now, let's just make it a beautiful, standalone animation that can be controlled externally or via timer.

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050505] overflow-hidden">
      {/* Cinematic Ambient Background: Brand Theme Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Primary Ambient Light: Brand Orange */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#FF5800]/10 blur-[180px] rounded-full"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {/* Secondary Accents: Brand Red & Purple */}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#9D50BB]/5 blur-[140px] rounded-full opacity-40" />
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-[#EE1D23]/8 blur-[120px] rounded-full opacity-30" />
      </div>

      {/* Branded Infrastructure Grid */}
      <div className="absolute inset-0 w-full h-full -z-10 opacity-[0.02] [background-image:linear-gradient(rgba(238,29,35,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(238,29,35,0.05)_1px,transparent_1px)] [background-size:60px_60px]" />

      <div className="relative flex flex-col items-center justify-center">
        {/* Orbital Technical Rings */}
        {[1, 2, 3].map((i) => (
          <motion.div
            key={`ring-${i}`}
            className="absolute rounded-full border border-white/[0.03] pointer-events-none"
            style={{
              width: i * 220,
              height: i * 220,
            }}
            animate={{
              rotate: i % 2 === 0 ? 360 : -360,
            }}
            transition={{
              duration: 35 + i * 15,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {/* Brand Status Nodes */}
            <div 
              className={`absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${i === 2 ? 'bg-[#FF5800]' : 'bg-white/10'}`}
              style={{
                boxShadow: i === 2 ? '0 0 15px rgba(255,88,0,0.6)' : 'none'
              }}
            />
          </motion.div>
        ))}

        {/* Ambient Data Ripples: Brand Red */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={`ripple-${i}`}
            className="absolute rounded-full border border-[#EE1D23]/10"
            initial={{ width: 150, height: 150, opacity: 0.4, scale: 0.8 }}
            animate={{
              width: 900,
              height: 900,
              opacity: 0,
              scale: 1.8,
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: i * 2.5,
              ease: "easeOut",
            }}
          />
        ))}

        {/* Central Identity: The ADSGRIND Core */}
        <div className="relative z-10 flex items-center justify-center">
          {/* Branded Atmospheric Glow */}
          <motion.div
            className="absolute w-44 h-44 bg-[#EE1D23]/15 rounded-full blur-[90px]"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Logo Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative"
          >
            <motion.div
              className="relative w-32 h-32 rounded-full overflow-hidden border border-white/20 shadow-[0_0_60px_rgba(238,29,35,0.15)] p-1 bg-[#050505]/90 backdrop-blur-3xl"
              animate={{
                scale: [1, 1.05, 1],
                boxShadow: [
                  "0 0 40px rgba(238,29,35,0.1)",
                  "0 0 70px rgba(238,29,35,0.25)",
                  "0 0 40px rgba(238,29,35,0.1)"
                ]
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <img 
                src="/logo/2ccbcd53-e176-41fc-b3cb-70c3f0620511.jpg" 
                alt="ADSGRIND Growth Engine"
                className="w-full h-full object-cover rounded-full opacity-90"
              />
              
              {/* Internal HUD Loop: Brand Orange */}
              <motion.div
                className="absolute inset-0 rounded-full border-t-2 border-[#FF5800]/40"
                animate={{ rotate: 360 }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>

            {/* Branded Sync Pulse */}
            <motion.div
              className="absolute inset-0 rounded-full border border-[#FF5800]/40"
              animate={{
                scale: [1, 1.6],
                opacity: [0.5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: 2,
                ease: "easeOut",
              }}
            />
          </motion.div>
        </div>

        {/* Data Convergence Flow: Branded Palette */}
        <div className="absolute inset-0 w-[900px] h-[900px] -z-10">
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className={`absolute w-[2px] h-[2px] rounded-full ${i % 3 === 0 ? 'bg-[#EE1D23]' : i % 3 === 1 ? 'bg-[#FF5800]' : 'bg-[#9D50BB]'} opacity-40`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [(Math.random() - 0.5) * 800, 0],
                y: [(Math.random() - 0.5) * 800, 0],
                opacity: [0, 1, 0],
                scale: [0.5, 1.3, 0.5],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 7,
                ease: "easeIn",
              }}
            />
          ))}
        </div>

        {/* Branded Metadata Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1.5 }}
          className="mt-48 text-center"
        >
          <div className="text-[10px] text-white/20 font-bold uppercase tracking-[1.2em] mb-6">
            Initializing Adsgrind System
          </div>
          <div className="flex items-center justify-center gap-6">
            <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-[#EE1D23]/30" />
            <div className="flex items-center gap-4">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={`node-${i}`}
                  className={`w-1 h-1 rounded-full ${i === 1 ? 'bg-[#FF5800]' : 'bg-[#EE1D23]'}`}
                  animate={{
                    opacity: [0.1, 1, 0.1],
                    scale: [1, 1.8, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.6,
                  }}
                />
              ))}
            </div>
            <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-[#FF5800]/30" />
          </div>
        </motion.div>
      </div>
      
      {/* Cinematic Grain Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};
