'use client';

import Image from 'next/image';
import BannerImage from '../../assets/images/bg-banner.jpg';
import PhotoXp from '../../assets/svgs/photo-xp.svg';
import Tick from '../../assets/svgs/tick.svg';
import { IQuest } from '@/types';
import { useState } from 'react';
import { Spinner } from '@nextui-org/react';
import { useAuth, useIdentity } from '@nfid/identitykit/react';
import Markdown from 'react-markdown';
import useSWR, { mutate } from 'swr';
import { userConnector } from '@/integration/connectors/user';

export default function QuestCard({ quest }: { quest: IQuest }) {
  const [isStarted, setIsStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { id, subtitle, title, reward, description } = quest.getUI();
  const campaign = quest.getCampaignUI();

  const { user } = useAuth();
  const { data } = useSWR(
    user ? [user?.principal.toString(), 'user'] : null,
    ([id]) => userConnector.getUser(id)
  );
  const identity = useIdentity();

  const verifyCompletion = async () => {
    if (!user?.principal || !identity)
      return alert('Please connect your wallet first');
    setIsLoading(true);
    const res = await quest.verifyCompletion(identity);
    if (res) {
      mutate((key) => Array.isArray(key) && key[1] === 'user');
      mutate((key) => Array.isArray(key) && key[1] === 'quests');
      mutate('quests');
    }
    setIsLoading(false);
    setIsStarted(false);
  };

  return (
    <>
      <div className={`flip-card ${isStarted && 'started'} relative`}>
        {isLoading && (
          <div className="z-[1000] rounded-xl absolute w-full h-full backdrop-blur-lg flex items-center justify-center">
            <Spinner />
          </div>
        )}

        <div className="flip-card-inner">
          <div
            key={`${id}`}
            className="p-8 rounded-lg text-white bg-cover bg-left flip-card-front"
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
                <button className="bg-white/10 h-12 py-2 px-4 text-sm rounded-2xl font-semibold flex items-center gap-2 cursor-default">
                  <Image src={Tick} alt="Tick icon" width={16} height={16} />
                  Completed
                </button>
              ) : (
                <button
                  onClick={() => setIsStarted(true)}
                  className="bg-white/10 h-12 py-2 px-4 hover:underline text-sm rounded-2xl font-semibold flex items-center gap-2"
                >
                  Get started
                </button>
              )}

              <div className="flex items-center gap-1">
                <Image src={PhotoXp} alt="XP icon" width={16} height={16} />
                <p>{reward}</p>
              </div>
            </div>
          </div>

          <div
            key={`${id}-back`}
            className="p-8 rounded-lg text-white bg-cover bg-left flip-card-back"
            style={{
              backgroundImage: `url(${BannerImage.src})`,
            }}
          >
            <p className="font-semibold text-[28px] leading-8 mt-6">{title}</p>
            <div className="text-white/70 text-sm leading-[21px] font-medium mt-3">
              <Markdown
                components={{
                  a: (props) => (
                    <a className="underline hover:text-primary" {...props}>
                      {props.children}
                    </a>
                  ),
                  ol: (props) => (
                    <ol className="list-decimal list-inside" {...props} />
                  ),
                }}
              >
                {description.replace(/\\n/g, '\n')}
              </Markdown>
            </div>

            <div className="flex items-center gap-4 mt-[54px]">
              <button
                onClick={verifyCompletion}
                className="bg-white/10 h-12 py-2 px-4 hover:underline text-sm rounded-2xl font-semibold flex items-center gap-2"
              >
                Verify completion
              </button>

              <div className="flex items-center gap-1">
                <Image src={PhotoXp} alt="XP icon" width={16} height={16} />
                <p>{reward}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
