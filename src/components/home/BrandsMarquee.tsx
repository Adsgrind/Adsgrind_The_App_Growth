"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const brands = [
  { name: 'Albert', logo: '/images/albert.jpeg' },
  { name: 'Betterment', logo: '/images/betterment.jpeg' },
  { name: 'FloatMe', logo: '/images/floatme.jpeg' },
  { name: 'Remitly', logo: '/images/remitly.jpeg' },
  { name: 'Sendwave', logo: '/images/sendwave.jpeg' },
  { name: 'Super.com', logo: '/images/super.com.jpeg' },
];

const BrandLogo = ({ brand }: { brand: typeof brands[0] }) => {
  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      className="relative group cursor-pointer flex-shrink-0 px-10 md:px-16"
    >
      <div className="flex flex-col items-center">
        <div className="relative w-28 h-10 md:w-40 md:h-14 transition-all duration-700 ease-out">
          {/* Logo Wrapper */}
          <motion.div 
            variants={{
              initial: { filter: 'grayscale(1)', opacity: 0.4, scale: 1 },
              hover: { filter: 'grayscale(0)', opacity: 1, scale: 1.05 }
            }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Image
              src={brand.logo}
              alt={brand.name}
              fill
              sizes="(max-width: 768px) 112px, 160px"
              className="object-contain"
            />
          </motion.div>

          {/* Luxury Glossy Sweep Effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-lg">
             <motion.div 
               variants={{
                 initial: { x: '-150%', skewX: -25, opacity: 0 },
                 hover: { x: '250%', skewX: -25, opacity: 1 }
               }}
               transition={{ duration: 1.2, ease: "easeInOut" }}
               className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent z-10"
             />
          </div>

          {/* Ambient Orange Glow */}
          <motion.div 
            variants={{
              initial: { opacity: 0, scale: 0.8 },
              hover: { opacity: 1, scale: 1 }
            }}
            transition={{ duration: 0.7 }}
            className="absolute -inset-6 bg-brand-orange/5 blur-2xl rounded-full -z-10" 
          />
        </div>

        {/* Brand Name Reveal - ONLY on Hover */}
        <div className="mt-6 h-4 flex items-center justify-center overflow-hidden">
           <motion.span 
             variants={{
               initial: { opacity: 0, y: 10 },
               hover: { opacity: 1, y: 0 }
             }}
             transition={{ duration: 0.5, ease: "easeOut" }}
             className="text-[9px] md:text-[10px] font-bold text-white uppercase tracking-[0.3em] whitespace-nowrap pointer-events-none"
           >
             {brand.name}
           </motion.span>
        </div>
      </div>
    </motion.div>
  );
};

export const BrandsMarquee = () => {
  return (
    <section className="py-20 md:py-32 bg-[#000000] relative overflow-hidden border-y border-white/5">
      <div className="container mx-auto px-6 mb-16 text-center relative z-10">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-brand-orange text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block"
        >
          Institutional Trust
        </motion.span>
        <h2 className="text-2xl md:text-3xl font-bold text-white/80 uppercase tracking-tight">
          Powering Global App <span className="text-white/20">Growth Entities</span>
        </h2>
      </div>

      <div className="relative z-10 w-full pause-on-hover">
        <div className="flex overflow-hidden">
          <div className="flex flex-nowrap items-center py-4 animate-marquee-infinite">
            {/* Double the list for seamless loop */}
            {[...brands, ...brands, ...brands, ...brands, ...brands, ...brands].map((brand, idx) => (
              <BrandLogo key={`${brand.name}-${idx}`} brand={brand} />
            ))}
          </div>
        </div>

        {/* Side Fades - Premium Glass Feel */}
        <div className="absolute inset-y-0 left-0 w-32 md:w-80 bg-gradient-to-r from-black via-black/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 md:w-80 bg-gradient-to-l from-black via-black/80 to-transparent z-20 pointer-events-none" />
      </div>

      {/* Ambient Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/2 bg-brand-orange/5 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
};
