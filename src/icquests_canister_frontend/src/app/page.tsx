'use client';

import CampaignBanner from '@/components/campaign-banner';
import { getActiveCampaigns } from '@/integration';
import { ICampaign } from '@/types';
import Link from 'next/link';
import useSWR from 'swr';
import Web3Loader from '@/components/web3-loader';

export default function Home() {
  const { data, error } = useSWR<ICampaign[]>('campaigns', getActiveCampaigns);

  if (error)
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="bg-white/5 p-8 rounded-xl text-center">
          <h2 className="text-xl font-bold mb-4">Error Loading Campaigns</h2>
          <p className="text-white/70 mb-6">
            There was an error loading campaign details.
          </p>
        </div>
      </div>
    );

  if (!data)
    return <Web3Loader message="Loading campaigns..." minDisplayTime={2500} />;

  return (
    <div className="min-h-screen py-8 bg-dark">
      <div className="px-3 max-w-[1392px] mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Welcome to IC Quests</h1>
          <p className="text-white/70">
            Complete quests, earn rewards, and climb the leaderboard
          </p>
        </div>

        <h2 className="text-2xl font-semibold mb-6">Active Campaigns</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-10">
          {data?.map((item, index) => {
            return (
              <Link
                className={`transition-transform hover:scale-[1.02] ${
                  index === 0 ? 'md:col-span-2' : ''
                }`}
                href={`/campaign/${item.getUI().id}`}
                key={item.getUI().id}
              >
                <CampaignBanner campaign={item.getUI()} />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
