import Image from 'next/image';
import Link from 'next/link';
import PhotoXp from '@/assets/svgs/photo-xp.svg';
import { IQuest } from '@/types';
import { ArrowRight } from 'lucide-react';

type RelatedQuestsProps = {
  quests: IQuest[];
  currentQuestId: string;
  campaignId: string;
};

export const RelatedQuests = ({
  quests,
  currentQuestId,
  campaignId,
}: RelatedQuestsProps) => {
  const relatedQuests = quests
    .filter(
      (q) =>
        q.getCampaignUI().id === campaignId &&
        String(q.getUI().id) !== String(currentQuestId)
    )
    .slice(0, 3);

  if (relatedQuests.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-medium text-white">Related Quests</h2>
        <Link
          href={`/campaign/${campaignId}`}
          className="text-primary hover:text-primary/80 flex items-center gap-1 transition-colors text-sm"
        >
          <span>View all</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {relatedQuests.map((quest) => {
          const { id, title, subtitle, reward, status } = quest.getUI();
          const isCompleted = false; // This would come from user data

          return (
            <Link
              href={`/quest/${id}`}
              key={id}
              className="bg-secondary p-4 rounded-lg hover:bg-secondary/90 border border-white/5 transition-colors"
            >
              {/* Status Badge */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5">
                  <Image src={PhotoXp} alt="XP icon" width={14} height={14} />
                  <span className="text-primary text-sm">{reward} XP</span>
                </div>
                {status === 'inactive' ? (
                  <span className="text-xs py-0.5 px-1.5 bg-dark text-amber-400 rounded">
                    Inactive
                  </span>
                ) : isCompleted ? (
                  <span className="text-xs py-0.5 px-1.5 bg-dark text-primary rounded">
                    Completed
                  </span>
                ) : (
                  <span className="text-xs py-0.5 px-1.5 bg-dark text-primary rounded">
                    Available
                  </span>
                )}
              </div>

              <h3 className="font-medium text-base text-white mb-1">{title}</h3>
              <p className="text-white/50 text-xs mb-3 line-clamp-2">
                {subtitle}
              </p>

              <div className="text-xs text-primary mt-auto">View quest →</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
