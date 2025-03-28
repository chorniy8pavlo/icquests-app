'use client';

import LeaderBoardTable from '@/components/leaderboard-table';
import Breadcrumbs from '@/components/breadcrumbs';

const Leaderboard = () => {
  const breadcrumbPaths = [
    { label: 'Home', href: '/' },
    { label: 'Leaderboard' }
  ];

  return (
    <div className="min-h-screen py-8 bg-dark">
      <div className="px-3 max-w-[1392px] mx-auto">
        <Breadcrumbs paths={breadcrumbPaths} backUrl="/" backLabel="Back to home" />

        <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>

        <LeaderBoardTable />
      </div>
    </div>
  );
};

export default Leaderboard;
