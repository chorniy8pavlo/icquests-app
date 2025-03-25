'use client';

import Image from 'next/image';
import PhotoXp from '../../assets/svgs/photo-xp.svg';
import { IQuest } from '@/types';
import { useState } from 'react';
import { Spinner } from '@nextui-org/react';
import { useAuth } from '@nfid/identitykit/react';
import useSWR from 'swr';
import { userConnector } from '@/integration/connectors/user';
import { useRouter } from 'next/navigation';
import { Clock, Award, BookOpen, ChevronRight, Tag, CheckCircleIcon } from 'lucide-react';


export default function QuestCard({ quest }: { quest: IQuest }) {
  const [isLoading] = useState(false);
  const {
    id,
    subtitle,
    title,
    reward,
    status,
    estimatedTime,
    tags,
  } = quest.getUI();
  const campaign = quest.getCampaignUI();
  const router = useRouter();

  const { user } = useAuth();
  const { data } = useSWR(
    user ? [user?.principal.toString(), 'user'] : null,
    ([id]) => userConnector.getUser(id)
  );

  const isCompleted = data?.completedQuests.includes(BigInt(Number(id)));

  const handleStartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/quest/${id}`);
  };

  return (
    <div
      className="relative overflow-hidden h-full cursor-pointer bg-secondary hover:bg-secondary/80 transition-all border border-white/5 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-1"
      onClick={() => router.push(`/quest/${id}`)}
    >
      {isLoading && (
        <div className="z-[1000] rounded-xl absolute w-full h-full backdrop-blur-lg flex items-center justify-center">
          <Spinner />
        </div>
      )}

      {/* Quest banner image */}
      <div
        className="h-32 bg-cover bg-center relative"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6)), url(${campaign.background})`,
        }}
      >
        <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex gap-3 items-center">
            <Image
              className="rounded-xl border border-white/10"
              src={campaign.logo}
              alt={campaign.title}
              width={40}
              height={40}
            />
            <p className="font-medium text-sm text-white/90 truncate">
              {campaign.title}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col h-[calc(100%-8rem)]">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {tags &&
            tags.length > 0 &&
            tags.slice(0, 2).map((tag, index) => (
              <div
                key={index}
                className="inline-flex items-center gap-1 bg-white/5 px-2 py-1 rounded-md"
              >
                <Tag size={10} strokeWidth={2.5} />
                <span className="text-xs font-medium">{tag}</span>
              </div>
            ))}
        </div>

        {/* Title and subtitle */}
        <h3 className="font-semibold text-xl mb-2 line-clamp-2">{title}</h3>
        <p className="text-sm font-normal text-white/70 mb-4 line-clamp-2">
          {subtitle}
        </p>

        {/* Quest details */}
        <div className="mt-auto space-y-3">
          <div className="grid grid-cols-2 gap-3 mt-3">
            {/* Estimated time */}
            <div className="flex items-center gap-2 bg-white/5 p-2 rounded-lg">
              <Clock size={14} className="text-primary" />
              <span className="text-xs font-medium">{estimatedTime}</span>
            </div>

            {/* XP reward */}
            <div className="flex items-center gap-2 bg-white/5 p-2 rounded-lg">
              <Image src={PhotoXp} alt="XP" width={14} height={14} />
              <span className="text-xs font-medium">{reward} XP</span>
            </div>
          </div>

          {/* Action button */}
          <div className="pt-3">
            {isCompleted ? (
              <div className="bg-primary/10 py-2 px-4 text-sm rounded-lg font-medium flex items-center justify-center gap-2 text-primary">
                <CheckCircleIcon className="w-4 h-4" />
                Completed
              </div>
            ) : (
              <button
                onClick={handleStartClick}
                className="w-full bg-primary/80 hover:bg-primary transition-colors py-2 px-4 text-sm rounded-lg font-medium flex items-center justify-center gap-2"
              >
                {status === 'inactive' ? (
                  <>
                    <BookOpen size={14} />
                    View Details
                  </>
                ) : (
                  <>
                    <Award size={14} />
                    Start Quest <ChevronRight size={14} />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
