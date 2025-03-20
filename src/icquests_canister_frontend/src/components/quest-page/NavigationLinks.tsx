import Link from 'next/link';
import { Compass, LayoutGrid, Trophy } from 'lucide-react';

type NavigationLinksProps = {
  campaignId: string;
  campaignTitle: string;
};

export const NavigationLinks = ({
  campaignId,
  campaignTitle,
}: NavigationLinksProps) => {
  return (
    <div className="mt-12 pt-8 border-t border-white/5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <NavigationCard
          href="/all-quests"
          title="Browse All Quests"
          description="Discover more quests and earn XP"
          icon={<Compass size={18} className="text-primary" />}
        />

        <NavigationCard
          href={`/campaign/${campaignId}`}
          title="View Campaign"
          description={`See all quests in ${campaignTitle}`}
          icon={<LayoutGrid size={18} className="text-primary" />}
        />

        <NavigationCard
          href="/leaderboard"
          title="Leaderboard"
          description="See top performers and rankings"
          icon={<Trophy size={18} className="text-primary" />}
        />
      </div>
    </div>
  );
};

type NavigationCardProps = {
  href: string;
  title: string;
  description: string;
  icon: React.ReactNode;
};

const NavigationCard = ({
  href,
  title,
  description,
  icon,
}: NavigationCardProps) => {
  return (
    <Link
      href={href}
      className="bg-secondary p-4 rounded-lg border border-white/5 hover:bg-secondary/90 transition-colors flex items-center gap-3"
    >
      <div className="p-2 rounded bg-dark">{icon}</div>

      <div>
        <p className="font-medium text-sm text-white">{title}</p>
        <p className="text-white/50 text-xs mt-0.5">{description}</p>
      </div>
    </Link>
  );
};
