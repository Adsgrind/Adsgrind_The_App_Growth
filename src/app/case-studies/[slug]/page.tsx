"use client";

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, TrendingUp, Shield, Globe2, 
  Zap, BarChart3, Target, Activity, CheckCircle2, 
  Cpu, Database, ShieldCheck, Layers, Eye
} from 'lucide-react';
import { Button, Counter } from '@/components/ui';
import Image from 'next/image';

const CASE_STUDIES_DATA = {
  'fintech-cpa-mastery': {
    title: "Mastering CPA: Pay Only for Performance",
    industry: "Fintech Mobile App",
    type: "CPA User Acquisition",
    heroImage: "/images/blog_cpa_mastery.png",
    challenge: "The client was acquiring high volumes of installs but conversion quality was low and CAC continued rising across Tier-1 GEOs.",
    solution: [
      "Rebuilt acquisition funnel for high-intent event tracking",
      "Optimized event-based targeting to filter low-quality users",
      "Implemented LTV-focused bidding logic via proprietary engine",
      "Deployed real-time CPA optimization across 500+ publisher nodes",
      "Automated budget re-routing to top-performing conversion clusters"
    ],
    metrics: [
      { label: "Verified Conversions", value: 38, suffix: "K+", icon: <CheckCircle2 size={20} /> },
      { label: "CAC Reduction", value: 42, suffix: "%", icon: <TrendingUp size={20} /> },
      { label: "ROAS Achieved", value: 3.4, suffix: "x", icon: <Zap size={20} /> },
      { label: "Conversion Quality", value: 218, suffix: "%", icon: <Activity size={20} /> }
    ],
    dashboardTitle: "Conversion Intelligence Dashboard",
    dashboardTheme: "orange",
    sections: [
      {
        title: "Campaign Overview",
        content: "We initiated a full-funnel audit to identify leakage points in the user journey. By shifting the focus from 'Installs' to 'Funded Accounts', we realigned the performance algorithms toward high-value events."
      },
      {
        title: "Optimization Strategy",
        content: "Our team deployed the Adsgrind CPA Engine to monitor unit economics in real-time. This allowed us to aggressively scale profitable sources while instantly pausing nodes that failed to meet the target ROAS threshold."
      }
    ]
  },
  'gaming-fraud-prevention': {
    title: "Fraud Prevention in Performance Marketing",
    industry: "Gaming / Ad-Tech",
    type: "Fraud Prevention & Auditing",
    heroImage: "/images/blog_fraud_prevention.png",
    challenge: "The client was losing budget due to click spam, bot traffic, and low-quality installs from multiple traffic channels.",
    solution: [
      "Implemented proprietary fraud detection filters at the node level",
      "Blocked suspicious device patterns and emulators in real-time",
      "Enabled real-time traffic auditing via security intelligence API",
      "Optimized source-level quality scoring to identify elite publishers",
      "Removed non-human traffic clusters automatically"
    ],
    metrics: [
      { label: "Fraud Rate", value: 0.2, suffix: "%", icon: <ShieldCheck size={20} /> },
      { label: "Retention Quality", value: 61, suffix: "%", icon: <TrendingUp size={20} /> },
      { label: "Wasted Spend Saved", value: 47, suffix: "%", icon: <Zap size={20} /> },
      { label: "Verified Human", value: 99.8, suffix: "%", icon: <CheckCircle2 size={20} /> }
    ],
    dashboardTitle: "Security Intelligence Interface",
    dashboardTheme: "orange",
    sections: [
      {
        title: "Fraud Detection Workflow",
        content: "We deployed a multi-layered verification protocol that analyzes device fingerprinting, behavioral patterns, and attribution timing to eliminate sophisticated bot nets."
      },
      {
        title: "Campaign Monitoring",
        content: "Using our Live Monitoring System, we provided the client with total visibility into every install, backed by cryptographic verification logs for 100% audit accuracy."
      }
    ]
  },
  'saas-global-expansion': {
    title: "Global Traffic Trends: Beyond Tier 1 Markets",
    industry: "SaaS / Mobile Apps",
    type: "Global Expansion & GEO Scaling",
    heroImage: "/images/blog_global_traffic.png",
    challenge: "The client relied heavily on expensive Tier-1 traffic and struggled to scale profitably across new international markets.",
    solution: [
      "Expanded into high-growth emerging GEOs (India, SEA, Middle East)",
      "Localized creatives and landing page funnels for regional relevance",
      "Optimized CPI strategy by region using market-specific benchmarks",
      "Deployed GEO-specific audience segmentation via network layer",
      "Scaled profitable traffic clusters across 20+ active regions"
    ],
    metrics: [
      { label: "GEOs Activated", value: 20, suffix: "+", icon: <Globe2 size={20} /> },
      { label: "Blended CPI Lower", value: 53, suffix: "%", icon: <TrendingUp size={20} /> },
      { label: "Install Growth", value: 2.8, suffix: "x", icon: <Zap size={20} /> },
      { label: "ROAS Increase", value: 31, suffix: "%", icon: <BarChart3 size={20} /> }
    ],
    dashboardTitle: "Global Infrastructure Analytics",
    dashboardTheme: "orange",
    sections: [
      {
        title: "Global Expansion Strategy",
        content: "By tapping into Tier-2 and Tier-3 GEOs with high smartphone penetration, we unlocked massive volume at a fraction of the cost of US/EU markets."
      },
      {
        title: "Traffic Routing",
        content: "Our global routing engine optimized traffic flow based on real-time CPM and conversion rates in each specific region, ensuring maximum efficiency for every dollar spent."
      }
    ]
  }
};

const DataDashboard = ({ title, type }: { title: string, type: string }) => {
  return (
    <div className="bg-surface-2 border border-white/5 rounded-[3rem] overflow-hidden p-1 shadow-orange-glow">
       <div className="bg-black/40 p-6 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
             </div>
             <span className="text-[10px] text-white/30 font-bold uppercase tracking-widest ml-4">CASE_STUDY_INTEL_{type.toUpperCase()}</span>
          </div>
          <div className="flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
             <span className="text-[9px] text-brand-orange font-bold uppercase tracking-widest">Active Analysis</span>
          </div>
       </div>

       <div className="p-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-12">
             <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
                <div className="text-[10px] text-white/30 font-bold uppercase tracking-widest mb-2">Primary KPI</div>
                <div className="text-3xl font-bold text-white mb-1">99.8%</div>
                <div className="text-[9px] text-green-500 font-bold uppercase tracking-widest">Target Met</div>
             </div>
             <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
                <div className="text-[10px] text-white/30 font-bold uppercase tracking-widest mb-2">Efficiency Index</div>
                <div className="text-3xl font-bold text-white mb-1">+42.5%</div>
                <div className="text-[9px] text-brand-orange font-bold uppercase tracking-widest">Optimized</div>
             </div>
             <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
                <div className="text-[10px] text-white/30 font-bold uppercase tracking-widest mb-2">Growth Vector</div>
                <div className="text-3xl font-bold text-white mb-1">3.4x</div>
                <div className="text-[9px] text-white/20 font-bold uppercase tracking-widest">ROI Multiplier</div>
             </div>
          </div>

          <div className="h-80 relative border-l border-b border-white/10 flex items-end gap-2 px-6 pb-6 overflow-hidden">
             <div className="absolute inset-0 bg-grid opacity-10" />
             <div className="absolute inset-0 bg-gradient-to-t from-brand-orange/5 to-transparent" />
             {[35, 55, 45, 80, 60, 95, 75, 88, 65, 92, 85, 100].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h}%` }}
                  transition={{ delay: i * 0.05, duration: 1 }}
                  className="flex-1 bg-brand-orange/20 rounded-t-sm relative group"
                >
                   <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-orange shadow-[0_0_15px_#FF6B00]" />
                </motion.div>
             ))}
             
             {/* Floating UI Elements */}
             <motion.div 
               animate={{ y: [0, -10, 0] }}
               transition={{ repeat: Infinity, duration: 5 }}
               className="absolute top-10 right-10 p-4 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl"
             >
                <div className="flex items-center gap-3 mb-2">
                   <Activity size={14} className="text-brand-orange" />
                   <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Pulse Status</span>
                </div>
                <div className="text-lg font-bold text-white">Scaling Active</div>
             </motion.div>
          </div>
       </div>
    </div>
  );
};

export default function CaseStudyPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const data = CASE_STUDIES_DATA[slug as keyof typeof CASE_STUDIES_DATA];

  if (!data) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Investigation Not Found</h1>
          <Button onClick={() => router.push('/blog')}>Return to Feed</Button>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-black min-h-screen pt-32 pb-48">
      <div className="container mx-auto px-6">
        {/* Back Navigation */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.back()}
          className="flex items-center gap-2 text-white/30 hover:text-brand-orange transition-colors mb-12 uppercase text-[10px] font-bold tracking-[0.3em]"
        >
          <ArrowLeft size={16} /> Back to Performance Feed
        </motion.button>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-4 mb-8">
               <span className="px-4 py-1.5 rounded-full border border-brand-orange/30 bg-brand-orange/5 text-brand-orange text-[10px] font-bold uppercase tracking-[0.3em]">
                 {data.type}
               </span>
               <span className="text-white/20 text-[10px] font-bold uppercase tracking-widest">{data.industry}</span>
            </div>
            <h1 className="text-4xl md:text-7xl font-bold text-white uppercase tracking-tight leading-[0.9] mb-10">
              {data.title.split(': ')[0]}:<br />
              <span className="text-white/40">{data.title.split(': ')[1]}</span>
            </h1>
            <p className="text-white/50 text-xl leading-relaxed max-w-2xl mb-12">
              {data.challenge}
            </p>
            <div className="grid grid-cols-2 gap-8 py-10 border-y border-white/5">
               {data.metrics.map((m, i) => (
                 <div key={i} className="flex flex-col">
                    <div className="flex items-center gap-3 text-brand-orange mb-2">
                       {m.icon}
                       <span className="text-[10px] text-white/30 font-bold uppercase tracking-widest">{m.label}</span>
                    </div>
                    <div className="text-3xl font-bold text-white">
                      <Counter value={m.value} />{m.suffix}
                    </div>
                 </div>
               ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/10 group"
          >
             <Image 
               src={data.heroImage} 
               alt={data.title} 
               fill 
               className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" 
             />
             <div className="absolute inset-0 bg-brand-orange/10 mix-blend-color group-hover:opacity-0 transition-opacity" />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
             
             {/* Overlay Badge */}
             <div className="absolute bottom-10 left-10 p-6 bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl">
                <div className="text-[10px] text-brand-orange font-bold uppercase tracking-widest mb-1">Status</div>
                <div className="text-xl font-bold text-white">Case Verified</div>
             </div>
          </motion.div>
        </div>

        {/* Solution Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-32">
           <div className="lg:col-span-4">
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight mb-8">Operational<br />Infrastructure.</h2>
              <div className="space-y-4">
                 {data.solution.map((s, i) => (
                   <div key={i} className="flex gap-4 group">
                      <div className="w-5 h-5 rounded-full border border-brand-orange/30 flex items-center justify-center text-brand-orange group-hover:bg-brand-orange group-hover:text-black transition-all shrink-0 mt-1">
                         <Zap size={10} fill="currentColor" />
                      </div>
                      <span className="text-white/40 text-sm leading-relaxed">{s}</span>
                   </div>
                 ))}
              </div>
           </div>

           <div className="lg:col-span-8">
              <div className="space-y-12 mb-20">
                 {data.sections.map((s, i) => (
                   <div key={i}>
                      <h3 className="text-lg font-bold text-brand-orange uppercase tracking-widest mb-4">{s.title}</h3>
                      <p className="text-white/50 text-lg leading-relaxed max-w-3xl">{s.content}</p>
                   </div>
                 ))}
              </div>
              
              {/* Dashboard Visualization */}
              <DataDashboard title={data.dashboardTitle} type={slug.split('-')[0]} />
           </div>
        </div>

        {/* Live Tracking Visual - Extra Polish */}
        <div className="relative py-24 bg-surface-2 border border-white/5 rounded-[4rem] overflow-hidden group">
           <div className="absolute inset-0 bg-grid opacity-10" />
           <div className="container mx-auto px-10 relative z-10">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                 <div className="max-w-xl">
                    <span className="text-brand-orange text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">Final Audit</span>
                    <h2 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-tight leading-none mb-8">Verification<br /><span className="text-white/40 italic">Complete.</span></h2>
                    <p className="text-white/40 text-lg">Every campaign metric delivered in this study has been verified by our internal audit layer and is backed by raw attribution logs.</p>
                 </div>
                 <div className="grid grid-cols-2 gap-10">
                    <div className="p-8 bg-black/40 border border-white/10 rounded-3xl text-center group-hover:border-brand-orange/20 transition-all">
                       <div className="text-[10px] text-white/20 font-bold uppercase tracking-widest mb-2">Campaign LTV</div>
                       <div className="text-3xl font-bold text-white">Positive</div>
                    </div>
                    <div className="p-8 bg-black/40 border border-white/10 rounded-3xl text-center group-hover:border-brand-orange/20 transition-all">
                       <div className="text-[10px] text-white/20 font-bold uppercase tracking-widest mb-2">Scale Status</div>
                       <div className="text-3xl font-bold text-white">100% Opt.</div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* CTA Footer */}
        <div className="mt-32 text-center">
           <span className="text-white/20 text-[10px] font-bold uppercase tracking-[0.5em] mb-10 block">Ready to replicate these results?</span>
           <button 
             onClick={() => router.push('/contact')}
             className="px-16 py-6 bg-brand-orange text-black text-xs font-bold uppercase tracking-[0.4em] hover:bg-brand-orange-light shadow-orange-glow transition-all"
           >
             Start Performance Audit
           </button>
        </div>
      </div>
    </main>
  );
}
