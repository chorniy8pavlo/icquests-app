'use client';

import QuestCard from '@/components/quest-card';
import { getQuests } from '@/integration';
import { IQuest } from '@/types';
import { Spinner } from '@nextui-org/react';
import useSWR from 'swr';

export default function AllQuests() {
  const { data: questsData, error: questsError } = useSWR<IQuest[]>(
    ['quests'],
    () => getQuests()
  );

  if (questsError) return <div className="h-screen">Error loading quests</div>;
  if (!questsData)
    return (
      <div className="h-screen flex items-center justify-center flex-col">
        <span>Loading quests...</span>
        <Spinner className="mt-5" />
      </div>
    );

  return (
    <div className="min-h-screen">
      <p className="px-3 max-w-[1392px] mx-auto mt-[35px] pb-5 text-2xl font-semibold">
        All quests
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-3 max-w-[1392px] mx-auto pb-10">
        {questsData?.map((quest) => (
          <div key={quest.getUI().id}>
            <QuestCard quest={quest} />
          </div>
        ))}
      </div>
    </div>
  );
}
