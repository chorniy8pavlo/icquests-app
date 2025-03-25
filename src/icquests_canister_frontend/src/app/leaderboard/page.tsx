'use client';

import LeaderBoardTable from '@/components/leaderboard-table';
import Link from 'next/link';

const Leaderboard = () => {
  return (
    <div className="min-h-screen py-8 bg-dark">
      <div className="px-3 max-w-[1392px] mx-auto">
        <div className="flex items-center mb-6">
          <div className="text-white/60">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">Leaderboard</span>
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>

        <LeaderBoardTable />
      </div>
    </div>
  );
};

export default Leaderboard;
