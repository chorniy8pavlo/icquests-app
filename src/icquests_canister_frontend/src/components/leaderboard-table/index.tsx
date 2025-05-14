'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { User, CheckCircle, ArrowUp, ArrowDown } from 'lucide-react';
import PhotoXP from '../../assets/svgs/photo-xp.svg';
import CupGold from '../../assets/svgs/cup-gold.svg';
import CupBronze from '../../assets/svgs/cup-bronze.svg';
import CupSilver from '../../assets/svgs/cup-silver.svg';
import useSWR from 'swr';
import { userConnector } from '@/integration/connectors/user';
import Web3Loader from '@/components/web3-loader';
import { useState } from 'react';

const getCupImage = (rank: number) => {
  switch (rank) {
    case 1:
      return { img: CupGold, alt: 'Gold Cup' };
    case 2:
      return { img: CupSilver, alt: 'Silver Cup' };
    case 3:
      return { img: CupBronze, alt: 'Bronze Cup' };
    default:
      return null;
  }
};

export default function LeaderBoardTable() {
  const [sortBy, setSortBy] = useState<'rank' | 'quests' | 'xp'>('xp');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  const { data, error, isLoading } = useSWR('allUsers', () =>
    userConnector.getAllUsers()
  );

  const handleSort = (column: 'rank' | 'quests' | 'xp') => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('desc');
    }
  };

  const sortedData = data ? [...data].sort((a, b) => {
    if (sortBy === 'rank') {
      // Always sort by XP for rank, direction changes order
      if (sortDirection === 'asc') {
        return a.xpBalance < b.xpBalance ? -1 : a.xpBalance > b.xpBalance ? 1 : 0;
      } else {
        return b.xpBalance < a.xpBalance ? -1 : b.xpBalance > a.xpBalance ? 1 : 0;
      }
    } else if (sortBy === 'quests') {
      return sortDirection === 'asc'
        ? a.completedQuests.length - b.completedQuests.length
        : b.completedQuests.length - a.completedQuests.length;
    } else { // xp
      if (sortDirection === 'asc') {
        return a.xpBalance < b.xpBalance ? -1 : a.xpBalance > b.xpBalance ? 1 : 0;
      } else {
        return b.xpBalance < a.xpBalance ? -1 : b.xpBalance > a.xpBalance ? 1 : 0;
      }
    }
  }) : [];

  if (error) {
    return (
      <div className="bg-black/30 border border-white/10 p-8 rounded-xl text-center">
        <h2 className="text-xl font-bold mb-4">Error Loading Leaderboard</h2>
        <p className="text-white/70">
          There was an error loading leaderboard data.
        </p>
      </div>
    );
  }

  if (isLoading || !data) {
    return <Web3Loader message="Loading leaderboard..." />;
  }

  const SortIcon = ({ active }: { active: boolean }) => (
    <div className="flex flex-col ml-1">
      <ArrowUp size={10} className={`${active && sortDirection === 'asc' ? 'text-primary' : 'text-white/40'} -mb-1`} />
      <ArrowDown size={10} className={`${active && sortDirection === 'desc' ? 'text-primary' : 'text-white/40'}`} />
    </div>
  );

  return (
    <div className="mb-10">
      {/* Table Header */}
      <div className="bg-secondary/20 backdrop-blur-sm border border-white/10 p-4 rounded-t-xl">
        <div className="flex items-center justify-between font-medium text-white/80">
          <div className="flex-1 flex items-center gap-4">
            <button 
              onClick={() => handleSort('rank')} 
              className={`flex items-center text-sm uppercase font-semibold transition-colors ${sortBy === 'rank' ? 'text-primary' : 'text-white/70 hover:text-white'}`}
            >
              Rank
              <SortIcon active={sortBy === 'rank'} />
            </button>
            <div className="text-sm uppercase font-medium text-white/70 ml-28">Wallet</div>
          </div>
          <div className="flex items-center gap-10">
            <button 
              onClick={() => handleSort('quests')} 
              className={`flex items-center text-sm uppercase font-semibold transition-colors ${sortBy === 'quests' ? 'text-primary' : 'text-white/70 hover:text-white'}`}
            >
              Quests
              <SortIcon active={sortBy === 'quests'} />
            </button>
            <button 
              onClick={() => handleSort('xp')} 
              className={`flex items-center text-sm uppercase font-semibold transition-colors ${sortBy === 'xp' ? 'text-primary' : 'text-white/70 hover:text-white'}`}
            >
              XP
              <SortIcon active={sortBy === 'xp'} />
            </button>
          </div>
        </div>
      </div>

      {/* Table Body */}
      <div className="overflow-hidden rounded-b-xl border-b border-l border-r border-white/10">
        {sortedData.length === 0 ? (
          <div className="bg-black/30 p-8 text-center">
            <p className="text-xl text-white/70">
              No users found on the leaderboard yet.
            </p>
          </div>
        ) : (
          <div>
            {sortedData.map(({ principal, completedQuests, xpBalance }, index) => {
              const cup = getCupImage(index + 1);
              const isTopThree = index < 3;
              
              return (
                <motion.div
                  key={`${principal}-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`relative ${
                    isTopThree ? 'bg-black/40' : 'bg-black/20'
                  } hover:bg-black/50 backdrop-blur-sm transition-all py-4 px-5 flex items-center justify-between border-t border-white/5 group`}
                >
                  {isTopThree && (
                    <div className="absolute inset-0 opacity-10 overflow-hidden">
                      <div 
                        className="absolute -right-20 -top-20 w-40 h-40 bg-primary rounded-full blur-[80px]"
                      ></div>
                    </div>
                  )}
                  
                  <div className="flex-1 flex items-center gap-4">
                    <div className="w-16 flex items-center justify-center">
                      {cup ? (
                        <div className="p-1.5 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center w-10 h-10">
                          <Image src={cup.img} alt={cup.alt} width={24} height={24} />
                        </div>
                      ) : (
                        <p className="text-base font-semibold font-mono w-10 text-center text-white/70">
                          {(index + 1).toString().padStart(2, '0')}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-3 ml-2">
                      <div className="w-9 h-9 rounded-full bg-primary/10 border border-white/10 flex items-center justify-center">
                        <User size={16} className="text-white/70" />
                      </div>
                      <p className="font-medium truncate max-w-[180px] text-sm md:text-base">
                        {principal}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-10">
                    <div className="flex items-center gap-2 w-16 justify-end">
                      <p className="font-medium text-base">{completedQuests.length}</p>
                      <CheckCircle size={16} className="text-primary/70" />
                    </div>
                    
                    <div className="flex items-center gap-2 w-20 justify-end">
                      <p className="font-semibold text-base">{xpBalance}</p>
                      <Image src={PhotoXP} alt="XP" className="w-4 h-4" />
                    </div>
                  </div>
                  
                  {/* Hover indicator */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom"></div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// Export calculated stats
export const useLeaderboardStats = () => {
  const { data } = useSWR('allUsers', () => userConnector.getAllUsers());
  
  if (!data) return { isLoading: true, stats: { totalXP: 0, activeUsers: 0, completedQuests: 0 } };
  
  return {
    isLoading: false,
    stats: {
      totalXP: data.reduce((sum, user) => sum + Number(user.xpBalance), 0),
      activeUsers: data.length,
      completedQuests: data.reduce((sum, user) => sum + user.completedQuests.length, 0)
    }
  };
};
