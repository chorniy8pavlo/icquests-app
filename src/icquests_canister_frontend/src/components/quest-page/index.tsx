'use client';

import { getQuests } from '@/integration';
import { IQuest } from '@/types';
import useSWR, { mutate } from 'swr';
import { useState } from 'react';
import { useAuth, useIdentity } from '@nfid/identitykit/react';
import { userConnector } from '@/integration/connectors/user';
import {
  Breadcrumbs,
  QuestHeader,
  QuestDescription,
  RelatedQuests,
  NavigationLinks,
  QuestLoading,
  QuestError,
  QuestNotFound,
  QuestSkeleton,
  CampaignBanner,
  QuestRewards,
} from './components';

// Utility function to handle cache invalidation with proper types
const revalidateCache = (userId?: string) => {
  if (userId) {
    mutate([userId, 'user']);
  }
  mutate(['quests']);
};

export default function QuestDetailsClient({ id }: { id: string }) {
  const [isLoading, setIsLoading] = useState(false);

  // Fetch quests data
  const {
    data: questsData,
    error: questsError,
    isLoading: isQuestsLoading,
  } = useSWR<IQuest[]>(['quests'], () => getQuests());

  // User authentication
  const { user } = useAuth();
  const identity = useIdentity();
  const { data: userData, isLoading: isUserLoading } = useSWR(
    user ? [user?.principal.toString(), 'user'] : null,
    ([id]) => userConnector.getUser(id)
  );

  // Show skeleton loader while fetching data
  if ((isQuestsLoading || isUserLoading) && !questsData) {
    return <QuestSkeleton />;
  }

  // Handle loading and error states
  if (questsError) return <QuestError />;
  if (!questsData) return <QuestLoading />;

  const quest = questsData.find((q) => String(q.getUI().id) === String(id));
  if (!quest) return <QuestNotFound />;

  const { title, subtitle, description, reward, status, participantsCount,difficulty,estimatedTime,prerequisites,tags } = quest.getUI();
  const campaign = quest.getCampaignUI();
  const isCompleted = userData?.completedQuests.includes(BigInt(Number(id)));

  const verifyCompletion = async () => {
    if (!user?.principal || !identity)
      return alert('Please connect your wallet first');

    setIsLoading(true);
    const res = await quest.verifyCompletion(identity);

    if (res) {
      revalidateCache(user?.principal.toString());
    }

    setIsLoading(false);
  };

  const breadcrumbPaths = [
    { label: 'Home', href: '/' },
    { label: 'All Quests', href: '/all-quests' },
    { label: campaign.title, href: `/campaign/${campaign.id}` },
    { label: title },
  ];

  return (
    <div className="min-h-screen py-8 bg-dark">
      <div className="px-3 max-w-[1392px] mx-auto">
        <Breadcrumbs paths={breadcrumbPaths} backUrl="/all-quests" />

        <CampaignBanner
          campaign={{
            ...campaign,
            description: campaign.subtitle,
            participants: participantsCount
          }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <QuestHeader
              title={title}
              subtitle={subtitle}
              dateCreated="Jul 15, 2023"
              estimatedTime={estimatedTime}
              categories={tags}
            />

            <QuestDescription
              description={description}
              status={status}
              prerequisites={prerequisites}
            />
          </div>

          <div className="lg:col-span-1">
            <QuestRewards
              reward={reward}
              isCompleted={isCompleted}
              isLoading={isLoading}
              status={status}
              onVerify={verifyCompletion}
              difficulty={difficulty}
            />
          </div>
        </div>

        <RelatedQuests
          quests={questsData}
          currentQuestId={id}
          campaignId={campaign.id}
        />

        <NavigationLinks
          campaignId={campaign.id}
          campaignTitle={campaign.title}
        />
      </div>
    </div>
  );
}
