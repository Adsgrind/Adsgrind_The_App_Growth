"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { sendContactEmail } from '@/app/actions/contact';
import { cn } from '@/lib/utils';

const auditSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  website: z.string().url('Invalid URL (include https://)'),
  budget: z.string().min(1, 'Budget selection is required'),
  goal: z.string().min(1, 'Goal selection is required'),
  message: z.string().optional(),
});

type AuditFormData = z.infer<typeof auditSchema>;

export default function ContactPage() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm<AuditFormData>({
    resolver: zodResolver(auditSchema),
  });

  const onSubmit = async (data: AuditFormData) => {
    try {
      // Mapping the new form data to the existing email action format
      const result = await sendContactEmail({
        name: data.name,
        email: data.email,
        company: data.website,
        budget: data.budget,
        message: `Goal: ${data.goal}${data.message ? `\n\nNotes: ${data.message}` : ''}`,
      });
      
      if (!result.success) {
        alert(result.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('An unexpected error occurred.');
    }
  };

  return (
    <main className="bg-black min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="max-w-5xl mb-24 text-center mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="px-4 py-1.5 rounded-full border border-brand-orange/30 bg-brand-orange/5 text-brand-orange text-[10px] font-bold uppercase tracking-[0.3em] inline-block mb-8">
              Deployment
            </span>
            <h1 className="font-display font-bold text-5xl md:text-8xl mb-10 uppercase text-white leading-none tracking-tight">
              Get Your Free<br /><span className="text-white/40 font-light italic">Growth Audit.</span>
            </h1>
            <p className="text-white/50 text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto font-medium">
              Join the apps already scaling with Adsgrind infrastructure. Get a custom scaling roadmap within 24 hours.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-48">
          {/* Contact Information */}
          <div className="lg:col-span-5 space-y-12">
             <div className="p-8 bg-surface-2 border border-white/5 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-orange/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
                <h2 className="text-2xl font-bold text-white uppercase tracking-tight mb-8">Hub Connect</h2>
                <div className="space-y-8">
                   <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-brand-orange/10 rounded-xl flex items-center justify-center text-brand-orange flex-shrink-0">
                         <Mail size={18} />
                      </div>
                      <div>
                         <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-1">Email Infrastructure</div>
                         <div className="text-white font-bold">business@adsgrind.com</div>
                      </div>
                   </div>
                   <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-brand-orange/10 rounded-xl flex items-center justify-center text-brand-orange flex-shrink-0">
                         <MessageCircle size={18} />
                      </div>
                      <div>
                         <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-1">Direct Comms</div>
                         <div className="text-white font-bold">+91 96259 82835</div>
                      </div>
                   </div>
                   <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-brand-orange/10 rounded-xl flex items-center justify-center text-brand-orange flex-shrink-0">
                         <MapPin size={18} />
                      </div>
                      <div>
                         <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-1">Operational Center</div>
                         <div className="text-white font-bold leading-relaxed">Bhajanpura, Delhi 110053<br />India</div>
                      </div>
                   </div>
                </div>
             </div>

             <div className="bg-brand-orange/5 border border-brand-orange/10 rounded-3xl p-8">
                <div className="text-brand-orange text-sm font-bold italic mb-2">"Limited onboarding slots each month"</div>
                <p className="text-white/40 text-[11px] font-bold uppercase tracking-[0.2em]">Next available audit cycle: May 2024</p>
             </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
             <div className="bg-surface-2 border border-white/5 p-8 md:p-12 rounded-[2.5rem] shadow-orange-glow relative">
                {isSubmitSuccessful ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-20 text-center"
                  >
                     <div className="w-20 h-20 bg-brand-orange/10 border border-brand-orange/20 rounded-full flex items-center justify-center mx-auto mb-10">
                        <CheckCircle2 size={40} className="text-brand-orange" />
                     </div>
                     <h2 className="text-3xl font-bold text-white uppercase tracking-tight mb-6">Transmission Received</h2>
                     <p className="text-white/40 text-lg mb-10">A growth specialist will contact you within 24 hours to initiate your audit.</p>
                     <button 
                       onClick={() => reset()}
                       className="px-8 py-4 bg-brand-orange text-black text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-brand-orange-light transition-all"
                     >
                       Send New Request
                     </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Full Name</label>
                        <input
                          {...register('name')}
                          placeholder="John Doe"
                          className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-white focus:border-brand-orange transition-all outline-none"
                        />
                        {errors.name && <p className="text-brand-orange text-[10px] uppercase font-bold tracking-widest">{errors.name.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Email Address</label>
                        <input
                          {...register('email')}
                          placeholder="john@company.com"
                          className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-white focus:border-brand-orange transition-all outline-none"
                        />
                        {errors.email && <p className="text-brand-orange text-[10px] uppercase font-bold tracking-widest">{errors.email.message}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">App / Website URL</label>
                      <input
                        {...register('website')}
                        placeholder="https://yourbrand.com"
                        className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-white focus:border-brand-orange transition-all outline-none"
                      />
                      {errors.website && <p className="text-brand-orange text-[10px] uppercase font-bold tracking-widest">{errors.website.message}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Monthly Budget</label>
                        <select
                          {...register('budget')}
                          className={cn(
                            "w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-white focus:border-brand-orange transition-all outline-none appearance-none cursor-pointer",
                            !register('budget').name && "text-white/20"
                          )}
                        >
                          <option value="">Select Budget</option>
                          <option value="5k-20k">$5k - $20k</option>
                          <option value="20k-50k">$20k - $50k</option>
                          <option value="50k-100k">$50k - $100k</option>
                          <option value="100k+">$100k+</option>
                        </select>
                        {errors.budget && <p className="text-brand-orange text-[10px] uppercase font-bold tracking-widest">{errors.budget.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Primary Goal</label>
                        <select
                          {...register('goal')}
                          className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-white focus:border-brand-orange transition-all outline-none appearance-none cursor-pointer"
                        >
                          <option value="">Select Goal</option>
                          <option value="Scale Installs">Scale Installs</option>
                          <option value="Optimize ROI">Optimize ROI/ROAS</option>
                          <option value="Fraud Prevention">Fraud Prevention</option>
                          <option value="Global Expansion">Global Expansion</option>
                        </select>
                        {errors.goal && <p className="text-brand-orange text-[10px] uppercase font-bold tracking-widest">{errors.goal.message}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Additional Requirements</label>
                       <textarea
                         {...register('message')}
                         rows={4}
                         placeholder="Any specific targets or markets..."
                         className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-white focus:border-brand-orange transition-all outline-none resize-none"
                       ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-5 bg-brand-orange text-black text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-brand-orange-light shadow-orange-glow transition-all flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? 'Transmitting...' : 'Request Growth Audit'} <ArrowRight size={16} />
                    </button>
                  </form>
                )}
             </div>
          </div>
        </div>

        {/* Map Section */}
        <section className="mb-20">
           <div className="mb-16 text-center">
              <span className="text-brand-orange text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">Operational Center</span>
              <h2 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-tight leading-none">Global HQ.</h2>
           </div>
           <div className="relative h-[500px] bg-surface-1 rounded-[3rem] overflow-hidden border border-white/5">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13998.403565656565!2d77.2625!3d28.7058!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfb63897d9e87%3A0x6444444444444444!2sBhajanpura%2C%20Delhi%20110053!5e0!3m2!1sen!2sin!4v1714690000000!5m2!1sen!2sin"
                className="absolute inset-0 w-full h-full border-0 grayscale invert brightness-50 contrast-125 opacity-40"
                loading="lazy"
              ></iframe>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <div className="relative">
                    <div className="w-16 h-16 bg-brand-orange/20 rounded-full flex items-center justify-center relative">
                       <div className="absolute inset-0 bg-brand-orange/40 animate-ping rounded-full" />
                       <MapPin className="text-brand-orange" size={32} />
                    </div>
                    <div className="mt-4 px-6 py-2 bg-brand-orange text-black text-[10px] font-bold uppercase tracking-[0.4em] rounded-full shadow-orange-glow">ADSGRIND HQ</div>
                 </div>
              </div>
           </div>
        </section>
      </div>
    </main>
  );
}
