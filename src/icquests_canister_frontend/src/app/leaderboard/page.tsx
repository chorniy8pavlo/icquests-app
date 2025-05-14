'use client';

import LeaderBoardTable, { useLeaderboardStats } from '@/components/leaderboard-table';
import Breadcrumbs from '@/components/breadcrumbs';
import { motion } from "motion/react";
import { Trophy, Star, Users, ArrowUp } from 'lucide-react';

const Leaderboard = () => {
  const breadcrumbPaths = [
    { label: 'Home', href: '/' },
    { label: 'Leaderboard' }
  ];
  
  // Use the stats hook to get dynamic leaderboard stats
  const { stats, isLoading: statsLoading } = useLeaderboardStats();

  // Format numbers with commas for display
  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Section with Background */}
      <div 
        className="relative py-8 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(25,26,31,0.9), rgba(0,0,0,0.95)), url('/grid-pattern.svg')`,
          backgroundColor: '#191A1F',
          backgroundSize: '40px',
          backgroundRepeat: 'repeat'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-secondary/20"></div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-1 max-w-[1392px]">
          <Breadcrumbs paths={breadcrumbPaths} backUrl="/" backLabel="Back to home" />
          
          <motion.div 
            className="mt-8 max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/20 font-medium py-1.5 px-4 text-sm rounded-full border border-primary/30 mb-4">
              <Trophy size={16} className="text-primary" />
              <span className="text-primary">Top Questers</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Leaderboard</h1>
            <p className="text-lg text-white/80 mb-8">
              Discover the top-performing quest completers in the Internet Computer ecosystem. Compete with others and earn your place among the elite.
            </p>
          </motion.div>
          
          {/* Stats Cards */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-black/30 backdrop-blur-sm border border-white/5 rounded-lg p-4 flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/20 flex-shrink-0">
                <Trophy size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-sm text-white/60">Total XP Awarded</p>
                <p className="text-xl font-bold">
                  {statsLoading ? (
                    <span className="inline-block w-24 h-6 bg-white/10 animate-pulse rounded"></span>
                  ) : (
                    formatNumber(stats.totalXP)
                  )}
                </p>
              </div>
            </div>
            
            <div className="bg-black/30 backdrop-blur-sm border border-white/5 rounded-lg p-4 flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/20 flex-shrink-0">
                <Users size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-sm text-white/60">Active Participants</p>
                <p className="text-xl font-bold">
                  {statsLoading ? (
                    <span className="inline-block w-24 h-6 bg-white/10 animate-pulse rounded"></span>
                  ) : (
                    formatNumber(stats.activeUsers)
                  )}
                </p>
              </div>
            </div>
            
            <div className="bg-black/30 backdrop-blur-sm border border-white/5 rounded-lg p-4 flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/20 flex-shrink-0">
                <Star size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-sm text-white/60">Completed Quests</p>
                <p className="text-xl font-bold">
                  {statsLoading ? (
                    <span className="inline-block w-24 h-6 bg-white/10 animate-pulse rounded"></span>
                  ) : (
                    formatNumber(stats.completedQuests)
                  )}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Leaderboard Table Section */}
      <div className="bg-black py-12">
        <div className="container mx-auto px-4 md:px-8 max-w-[1392px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Top Performers</h2>
              <div className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg text-sm text-white/80 cursor-pointer transition-colors">
                <span>Monthly</span>
                <ArrowUp size={14} className="rotate-45" />
              </div>
            </div>
            
            <div className="bg-secondary/30 rounded-xl border border-white/5 overflow-hidden shadow-lg">
              <LeaderBoardTable />
            </div>
            
            <p className="text-white/50 text-sm mt-4 text-center">
              Leaderboard rankings are updated every 24 hours. Complete more quests to improve your ranking!
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
