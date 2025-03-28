'use client';
import Image from 'next/image';
import { ICampaignUI } from '@/types';
import {
  ExternalLink,
  Tag,
  Trophy,
  Users,
  Info,
} from 'lucide-react';
import { Progress, Tooltip } from '@nextui-org/react';
import RewardIcon from '../../assets/svgs/reward.svg';

export default function CampaignBanner({
  campaign,
  className,

}: {
  campaign: ICampaignUI;
  className?: string;
  showDetailsLink?: boolean;
}) {
  const {
    background,
    completedQuestsByUser,
    earnedXPByUser,
    logo,
    subtitle,
    title,
    totalQuests,
    totalXP,
    partnerUrl,
    category,
  } = campaign;

  // For participants count, we'll use a fallback if it's not in the type
  const participants =
    'participants' in campaign ? String(campaign.participants || '') : null;

  // Calculate completion percentage
  const completionPercentage =
    totalQuests > 0
      ? Math.round((completedQuestsByUser / totalQuests) * 100)
      : 0;

  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-cover bg-center group ${className}`}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.9)), url(${background})`,
      }}
    >
      {/* Content wrapper with gradient overlay */}
      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          {/* Left section - Campaign info */}
          <div className="flex flex-col md:max-w-[60%]">
            <div className="flex items-center gap-4 mb-4">
              <Image
                className="rounded-xl border-2 border-white/20 shadow-lg"
                src={logo}
                alt={title}
                width={64}
                height={64}
              />

              <div className="flex flex-wrap gap-2">
                <div className="bg-primary/20 font-medium py-1 px-3 text-xs rounded-full flex items-center gap-1 border border-primary/30">
                  <Tag size={12} className="text-primary" />
                  <span className="text-primary">{category}</span>
                </div>

                {participants && (
                  <div className="bg-white/10 font-medium py-1 px-3 text-xs rounded-full flex items-center gap-1">
                    <Users size={12} />
                    <span>{participants} participants</span>
                  </div>
                )}
              </div>
            </div>

            <h2 className="font-bold text-2xl md:text-3xl mb-2 text-white">
              {title}
            </h2>

            <p className="text-sm font-medium text-white/80 mb-4 line-clamp-2 md:line-clamp-3">
              {subtitle}
            </p>
          </div>

          {/* Right section - Actions and stats */}
          <div className="w-full md:w-auto flex flex-col items-start gap-3">
            <div className="flex flex-wrap gap-2">
              {partnerUrl && (
                <a
                  href={partnerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors py-2 px-4 rounded-lg text-sm font-medium shadow-md"
                >
                  <span>Visit website</span>
                  <ExternalLink size={14} strokeWidth={2.5} />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Progress bars */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {/* Quests Progress */}
          <div className="bg-black/30 backdrop-blur-sm p-4 rounded-lg border border-white/10">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <Trophy size={16} className="text-primary" />
                <span className="text-sm font-medium">Quest Progress</span>
              </div>
              <Tooltip content="Completed quests out of total available quests">
                <div className="cursor-help">
                  <Info size={14} className="text-white/60" />
                </div>
              </Tooltip>
            </div>

            <div className="mb-2">
              <Progress
                size="md"
                radius="sm"
                value={completionPercentage}
                color="primary"
                showValueLabel={true}
                classNames={{
                  track: 'bg-white/10 rounded-xl',
                  value: 'text-xs font-medium',
                }}
                label={`${completedQuestsByUser}/${totalQuests} quests`}
              />
            </div>
          </div>

          {/* XP Progress */}
          <div className="bg-black/30 backdrop-blur-sm p-4 rounded-lg border border-white/10">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <Image src={RewardIcon} alt="XP" width={16} height={16} />
                <span className="text-sm font-medium">XP Progress</span>
              </div>
              <Tooltip content="XP earned out of total available XP in this campaign">
                <div className="cursor-help">
                  <Info size={14} className="text-white/60" />
                </div>
              </Tooltip>
            </div>

            <div className="mb-2">
              <Progress
                size="md"
                radius="sm"
                value={completionPercentage}
                color="primary"
                showValueLabel={true}
                classNames={{
                  track: 'bg-white/10 rounded-xl',
                  value: 'text-xs font-medium',
                }}
                label={`${earnedXPByUser}/${totalXP} XP`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
