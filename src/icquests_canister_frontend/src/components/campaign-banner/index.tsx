'use client';
import Image from 'next/image';
import { Chip } from '../chip/chips';
import { ICampaignUI } from '@/types';

export default function CampaignBanner({
  campaign,
  className,
}: {
  campaign: ICampaignUI;
  className?: string;
}) {
  const {
    background,
    completedQuestsByUser,
    createdDate,
    earnedXPByUser,
    logo,
    subtitle,
    title,
    totalQuests,
    totalXP,
  } = campaign;

  return (
    <div
      className={`p-[32px] rounded-lg bg-cover ${className}`}
      style={{ backgroundImage: `url(${background})` }}
    >
      <Image
        className="rounded-xl"
        src={logo}
        alt="Logo"
        width={100}
        height={100}
      />
      <p className="font-semibold text-[28px] leading-8 mt-6 text-white">
        {title}
      </p>
      <p className="text-sm font-medium text-white/70 leading-[21px] mt-3 md:max-w-[500px]">
        {subtitle}
      </p>
      <div className="mt-[100px] flex flex-wrap items-center gap-[10px]">
        <Chip icon="time" text={`Created ${createdDate}`} />
        <Chip
          icon="quests"
          text={`${completedQuestsByUser}/${totalQuests} quests`}
        />
        <Chip icon="reward" text={`${earnedXPByUser}/${totalXP}`} />
      </div>
    </div>
  );
}
