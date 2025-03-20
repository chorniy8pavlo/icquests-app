'use client';

import Image from 'next/image';
import BannerImage from '../../assets/images/bg-banner.jpg';
import PhotoXp from '../../assets/svgs/photo-xp.svg';
import Tick from '../../assets/svgs/tick.svg';
import { IQuest } from '@/types';
import { useState } from 'react';
import { Spinner } from '@nextui-org/react';
import { useAuth } from '@nfid/identitykit/react';
import useSWR from 'swr';
import { userConnector } from '@/integration/connectors/user';
import { useRouter } from 'next/navigation';

export default function QuestCard({ quest }: { quest: IQuest }) {
  const [isLoading] = useState(false);
  const { id, subtitle, title, reward } = quest.getUI();
  const campaign = quest.getCampaignUI();
  const router = useRouter();

  const { user } = useAuth();
  const { data } = useSWR(
    user ? [user?.principal.toString(), 'user'] : null,
    ([id]) => userConnector.getUser(id)
  );

  const handleStartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/quest/${id}`);
  };

  return (
    <>
      <div className="flip-card relative cursor-pointer" onClick={() => router.push(`/quest/${id}`)}>
        {isLoading && (
          <div className="z-[1000] rounded-xl absolute w-full h-full backdrop-blur-lg flex items-center justify-center">
            <Spinner />
          </div>
        )}

        <div className="p-8 rounded-xl text-white bg-cover bg-left"
          style={{
            backgroundImage: `url(${BannerImage.src})`,
          }}
        >
          <div className="flex gap-4 items-center">
            <Image
              className="rounded-xl"
              src={campaign.logo}
              alt="Logo"
              width={64}
              height={64}
            />
            <p className="font-semibold text-[18px] leading-8">
              {campaign.title}
            </p>
          </div>

          <p className="font-semibold text-[28px] leading-8 mt-6">{title}</p>
          <p className="text-sm font-medium text-white/70 leading-[21px] mt-3">
            {subtitle}
          </p>

          <div className="flex items-center gap-4 mt-[36px]">
            {data?.completedQuests.includes(BigInt(Number(id))) ? (
              <div className="bg-white/10 h-12 py-2 px-4 text-sm rounded-2xl font-semibold flex items-center gap-2">
                <Image src={Tick} alt="Tick icon" width={16} height={16} />
                Completed
              </div>
            ) : (
              <button
                onClick={handleStartClick}
                className="bg-white/10 h-12 py-2 px-4 hover:bg-white/20 text-sm rounded-2xl font-semibold flex items-center gap-2"
              >
                View details
              </button>
            )}

            <div className="flex items-center gap-1">
              <Image src={PhotoXp} alt="XP icon" width={16} height={16} />
              <p>{reward}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
