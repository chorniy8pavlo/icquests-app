'use client';

import QuestCard from '@/components/quest-card';
import { getQuests } from '@/integration';
import { IQuest } from '@/types';
import useSWR from 'swr';
import Link from 'next/link';
import Web3Loader from '@/components/web3-loader';

export default function AllQuests() {
  const { data: questsData, error: questsError } = useSWR<IQuest[]>(
    ['quests'],
    () => getQuests()
  );

  if (questsError)
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="bg-white/5 p-8 rounded-xl text-center">
          <h2 className="text-xl font-bold mb-4">Error Loading Quests</h2>
          <p className="text-white/70 mb-6">
            There was an error loading quests.
          </p>
          <Link
            href="/"
            className="inline-block bg-white/10 hover:bg-white/20 py-2 px-4 rounded text-white transition-colors"
          >
            Go back home
          </Link>
        </div>
      </div>
    );

  if (!questsData)
    return <Web3Loader message="Loading quests..." minDisplayTime={2500} />;

  return (
    <div className="min-h-screen py-8 bg-dark">
      <div className="px-3 max-w-[1392px] mx-auto">
        <div className="flex items-center mb-6">
          <div className="text-white/60">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">All Quests</span>
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-6">All Quests</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-10">
          {questsData?.map((quest) => (
            <div
              key={quest.getUI().id}
              className="transition-transform hover:scale-[1.02]"
            >
              <QuestCard quest={quest} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
