'use client';

import { getQuests } from '@/integration';
import { IQuest } from '@/types';
import useSWR from 'swr';
import QuestCard from '../quest-card';
import CampaignBanner from '../campaign-banner';
import { Spinner } from '@nextui-org/react';

const CampaignPage = ({ id }: { id: string }) => {
  const { data: questsData, error: questsError } = useSWR<IQuest[]>(
    [id, 'quests'],
    ([id]) => getQuests(String(id))
  );

  if (questsError)
    return (
      <div className="h-screen flex items-center justify-center">
        Error loading quests
      </div>
    );

  if (!questsData)
    return (
      <div className="h-screen flex items-center justify-center flex-col">
        <span>Loading quests...</span>
        <Spinner className="mt-5" />
      </div>
    );

  return (
    <div className="min-h-screen">
      <div className="max-w-[1392px] mx-auto pt-10">
        {questsData?.length && (
          <CampaignBanner campaign={questsData[0].getCampaignUI()} />
        )}
      </div>
      <p className="px-3 max-w-[1392px] mx-auto mt-[35px] pb-5 text-2xl font-semibold">
        Available quests
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-3 max-w-[1392px] mx-auto pb-10">
        {questsData.map((quest) => (
          <QuestCard key={quest.getUI().id} quest={quest} />
        ))}
      </div>
    </div>
  );
};
export default CampaignPage;
