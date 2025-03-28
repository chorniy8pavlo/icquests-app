'use client';

import { getActiveCampaigns, getQuests } from '@/integration';
import { ICampaign, IQuest } from '@/types';
import useSWR from 'swr';
import QuestCard from '../quest-card';
import CampaignBanner from '../campaign-banner';
import Link from 'next/link';
import Web3Loader from '../web3-loader';
import Breadcrumbs from '../breadcrumbs';
import { useAuth } from '@nfid/identitykit/react';

const CampaignPage = ({ id }: { id: string }) => {
  const { user } = useAuth();
  const { data: questsData, error: questsError } = useSWR<IQuest[]>(
    [id, 'quests'],
    ([id]) => getQuests(String(id))
  );
  const { data, error, isLoading: isLoadingCampaign } = useSWR<ICampaign[]>(['campaigns', user], () => getActiveCampaigns(user));

  
  if (questsError || error)
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="bg-white/5 p-8 rounded-xl text-center">
          <h2 className="text-xl font-bold mb-4">Error Loading Campaign</h2>
          <p className="text-white/70 mb-6">
            There was an error loading campaign details.
          </p>
          <Link
            href="/all-quests"
            className="inline-block bg-white/10 hover:bg-white/20 py-2 px-4 rounded text-white transition-colors"
          >
            Go to all quests
          </Link>
        </div>
      </div>
    );

  if (isLoadingCampaign || !questsData)
    return <Web3Loader message="Loading campaign..." />;

  const campaign = data?.find((item) => String(item.getUI().id) === id)?.getUI();

  if (!campaign) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="bg-white/5 p-8 rounded-xl text-center">
          <h2 className="text-xl font-bold mb-4">Campaign Not Found</h2>
          <p className="text-white/70 mb-6">
            We couldn&apos;t find the campaign you&apos;re looking for.
          </p>
          <Link
            href="/all-quests"
            className="inline-block bg-white/10 hover:bg-white/20 py-2 px-4 rounded text-white transition-colors"
          >
            Go to all quests
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 bg-dark">
      <div className="px-3 max-w-[1392px] mx-auto">
        <Breadcrumbs 
          paths={[
            { label: 'Home', href: '/' },
            { label: 'All Quests', href: '/all-quests' },
            { label: campaign.title }
          ]} 
          backUrl="/all-quests" 
          backLabel="Back to all quests" 
        />

        <CampaignBanner campaign={campaign} />

        <h2 className="mt-8 mb-6 text-2xl font-semibold">Available Quests</h2>

        {questsData.length === 0 ? (
          <div className="bg-secondary p-8 rounded-xl text-center my-6">
            <p className="text-xl text-white/70">
              No quests available in this campaign yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-10">
            {questsData.map((quest) => (
              <div
                key={quest.getUI().id}
                className="transition-transform hover:scale-[1.02]"
              >
                <QuestCard quest={quest} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CampaignPage;
