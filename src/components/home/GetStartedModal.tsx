"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, Loader2, Building2, User, Mail, MessageSquare, ChevronDown, Zap, Target, ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button, cn } from '@/components/ui';
import { sendContactEmail } from '@/app/actions/contact';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  company: z.string().min(2, 'Company name is required'),
  email: z.string().email('Please enter a valid email address'),
  budget: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GetStartedModal({ isOpen, onClose }: GetStartedModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const result = await sendContactEmail({
        ...data,
        budget: data.budget || 'Not Specified',
      });

      if (result.success) {
        setIsSuccess(true);
        setTimeout(() => {
          onClose();
          setTimeout(() => {
            setIsSuccess(false);
            reset();
          }, 500);
        }, 3000);
      } else {
        setError(result.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Failed to send message. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Premium Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
          />

          {/* Background Ambient Glows */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
             <motion.div 
               animate={{ 
                 scale: [1, 1.2, 1],
                 opacity: [0.1, 0.2, 0.1] 
               }}
               transition={{ duration: 8, repeat: Infinity }}
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-orange/10 blur-[160px] rounded-full"
             />
          </div>

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 200 }}
            className="relative w-full max-w-[550px] overflow-hidden rounded-[2.5rem] bg-[#050505] border border-white/5 shadow-orange-glow"
          >
            {/* Animated Light Reflection */}
            <motion.div 
              animate={{ x: ['-200%', '200%'] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-orange/20 to-transparent pointer-events-none"
            />

            <div className="relative p-8 sm:p-12">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-8 right-8 p-3 rounded-xl bg-white/5 text-white/30 hover:text-white transition-all hover:scale-110 active:scale-95 z-50"
              >
                <X size={20} />
              </button>

              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <div className="mb-12">
                      <div className="flex items-center gap-3 mb-4">
                         <div className="w-8 h-8 rounded-lg bg-brand-orange/10 flex items-center justify-center text-brand-orange border border-brand-orange/20">
                            <Target size={16} />
                         </div>
                         <span className="text-brand-orange text-[9px] font-bold uppercase tracking-[0.4em]">Audit Protocol</span>
                      </div>
                      <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-3 uppercase tracking-tighter leading-none">
                        GET STARTED.
                      </h2>
                      <p className="text-white/40 text-sm font-medium">
                        Specify your growth objective for a custom analysis.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                      {/* Name & Company Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 ml-2">Full Name</label>
                          <div className="relative group">
                            <User className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-orange/40 group-focus-within:text-brand-orange transition-colors" size={16} />
                            <input
                              {...register('name')}
                              type="text"
                              placeholder="Name"
                              className={cn(
                                "w-full bg-white/[0.03] border border-white/5 rounded-2xl px-14 py-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-brand-orange/50 focus:bg-white/[0.05] transition-all tracking-wide",
                                errors.name && "border-red-500/50"
                              )}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 ml-2">Company</label>
                          <div className="relative group">
                            <Building2 className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-orange/40 group-focus-within:text-brand-orange transition-colors" size={16} />
                            <input
                              {...register('company')}
                              type="text"
                              placeholder="Entity"
                              className={cn(
                                "w-full bg-white/[0.03] border border-white/5 rounded-2xl px-14 py-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-brand-orange/50 focus:bg-white/[0.05] transition-all tracking-wide",
                                errors.company && "border-red-500/50"
                              )}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Email Field */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 ml-2">Enterprise Email</label>
                        <div className="relative group">
                          <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-orange/40 group-focus-within:text-brand-orange transition-colors" size={16} />
                          <input
                            {...register('email')}
                            type="email"
                            placeholder="john@example.com"
                            className={cn(
                              "w-full bg-white/[0.03] border border-white/5 rounded-2xl px-14 py-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-brand-orange/50 focus:bg-white/[0.05] transition-all tracking-wide",
                              errors.email && "border-red-500/50"
                            )}
                          />
                        </div>
                      </div>

                      {/* Budget Field */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 ml-2">Monthly Growth Budget</label>
                        <div className="relative group">
                          <Zap className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-orange/40 group-focus-within:text-brand-orange transition-colors" size={16} />
                          <select
                            {...register('budget')}
                            className="w-full bg-[#0A0A0A] border border-white/5 rounded-2xl px-14 py-4 text-sm text-white focus:outline-none focus:border-brand-orange/50 focus:bg-white/[0.05] transition-all appearance-none cursor-pointer tracking-wide"
                          >
                            <option value="" className="bg-[#0A0A0A]">Select budget scale</option>
                            <option value="<$5k" className="bg-[#0A0A0A]">$5,000 - $20,000</option>
                            <option value="$20k-$50k" className="bg-[#0A0A0A]">$20,000 - $50,000</option>
                            <option value="$50k-$100k" className="bg-[#0A0A0A]">$50,000 - $100,000</option>
                            <option value="$100k+" className="bg-[#0A0A0A]">$100,000+</option>
                          </select>
                          <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" size={18} />
                        </div>
                      </div>

                      {/* Message Field */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 ml-2">Growth Objectives</label>
                        <div className="relative group">
                          <MessageSquare className="absolute left-5 top-5 text-brand-orange/40 group-focus-within:text-brand-orange transition-colors" size={16} />
                          <textarea
                            {...register('message')}
                            rows={4}
                            placeholder="Describe your current scale challenges..."
                            className={cn(
                              "w-full bg-white/[0.03] border border-white/5 rounded-2xl px-14 py-5 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-brand-orange/50 focus:bg-white/[0.05] transition-all resize-none tracking-wide",
                              errors.message && "border-red-500/50"
                            )}
                          />
                        </div>
                      </div>

                      {error && (
                        <motion.div 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 rounded-xl bg-red-500/5 border border-red-500/20 text-red-400 text-xs font-bold text-center"
                        >
                          {error}
                        </motion.div>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group relative w-full h-16 bg-brand-orange text-black font-bold rounded-2xl overflow-hidden shadow-orange-glow transition-all active:scale-[0.98]"
                      >
                         <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                         <div className="relative flex items-center justify-center gap-3">
                            {isSubmitting ? (
                              <>
                                <Loader2 size={18} className="animate-spin" />
                                <span className="uppercase text-[11px] tracking-[0.3em]">Processing Audit...</span>
                              </>
                            ) : (
                              <>
                                <span className="uppercase text-[11px] tracking-[0.3em]">Request Growth Audit</span>
                                <motion.div
                                  animate={{ x: [0, 5, 0] }}
                                  transition={{ repeat: Infinity, duration: 2 }}
                                >
                                  <ArrowRight size={18} />
                                </motion.div>
                              </>
                            )}
                         </div>
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-20 text-center"
                  >
                    <div className="relative mb-10">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
                        className="w-24 h-24 rounded-3xl bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center text-brand-orange"
                      >
                        <CheckCircle2 size={48} />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 rounded-full bg-brand-orange/20 blur-2xl"
                      />
                    </div>
                    <h3 className="text-3xl font-display font-bold text-white mb-4 uppercase tracking-tight italic">Protocol Initiated.</h3>
                    <p className="text-white/40 max-w-[320px] text-sm leading-relaxed">
                      Our engineering team is analyzing your request. A senior performance strategist will contact you within 24 hours.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
