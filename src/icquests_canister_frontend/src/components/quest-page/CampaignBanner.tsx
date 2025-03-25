import Image from 'next/image';
import Link from 'next/link';
import { Users, ExternalLink } from 'lucide-react';

type CampaignBannerProps = {
  campaign: {
    background: string;
    id: string;
    title: string;
    logo: string;
    description?: string;
    participants?: number;
    websiteUrl?: string;
  };
};

export const CampaignBanner = ({ campaign }: CampaignBannerProps) => {
  return (
    <div
      className="p-6 rounded-xl bg-cover bg-center mb-6 relative overflow-hidden group"
      style={{
        backgroundImage: `linear-gradient(rgba(13,17,23,0.8), rgba(13,17,23,0.95)), url(${campaign.background})`,
      }}
    >
      {/* Subtle hover effect */}
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="flex flex-col md:flex-row md:items-center gap-5 relative z-10">
        <div className="flex gap-4 items-center">
          <Image
            className="rounded-lg border border-white/10"
            src={campaign.logo}
            alt={`${campaign.title} logo`}
            width={70}
            height={70}
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-semibold text-xl text-white">
                {campaign.title}
              </h2>
              {campaign.websiteUrl && (
                <a
                  href={campaign.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-white transition-colors"
                >
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
            <p className="text-white/60 mt-1 max-w-2xl text-sm">
              {campaign.description || 'Complete quests to earn rewards'}
            </p>
            <div className="flex items-center gap-6 mt-2">
              <Link
                href={`/campaign/${campaign.id}`}
                className="text-primary hover:text-primary/80 transition-colors text-sm flex items-center gap-1"
              >
                <span>View all campaign quests</span>
                <span className="text-xs">→</span>
              </Link>

              {campaign.participants && (
                <div className="flex items-center gap-2 text-white/50 text-sm">
                  <Users size={14} />
                  <span>
                    {campaign.participants.toLocaleString()} participants
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
