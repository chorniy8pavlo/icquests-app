import Image from 'next/image';
import { Spinner } from '@nextui-org/react';
import PhotoXp from '@/assets/svgs/photo-xp.svg';
import { Trophy, Clock, CheckCircle2 } from 'lucide-react';

type QuestRewardsProps = {
  reward: number;
  isCompleted?: boolean;
  isLoading: boolean;
  status?: string;
  onVerify: () => Promise<void>;
  difficulty?: number;
};

export const QuestRewards = ({
  reward,
  isCompleted = false,
  isLoading,
  status,
  onVerify,
  difficulty = 2,
}: QuestRewardsProps) => {
  return (
    <div className="bg-secondary rounded-xl overflow-hidden border border-white/5">
      <div className="p-5 border-b border-white/5">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-white text-sm flex items-center gap-2">
            QUEST STATUS
            {isCompleted && <CheckCircle2 size={14} className="text-primary" />}
          </h3>
        </div>
      </div>

      <div className="p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          {/* Reward Card */}
          <div className="bg-dark rounded-lg p-4 border border-white/5">
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 p-2 rounded-md">
                <Image src={PhotoXp} alt="XP icon" width={20} height={20} />
              </div>
              <div>
                <p className="text-xs text-white/50">Reward</p>
                <div className="flex items-baseline gap-1">
                  <p className="text-xl font-medium">{reward}</p>
                  <p className="text-sm text-primary">XP</p>
                </div>
              </div>
            </div>
          </div>

          {/* Difficulty Card */}
          <div className="bg-dark rounded-lg p-4 border border-white/5">
            <p className="text-xs text-white/50 mb-2">Difficulty</p>
            <div className="flex gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 w-5 rounded-sm ${
                    i < difficulty ? 'bg-primary' : 'bg-white/10'
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-white/40">
              {difficulty <= 1
                ? 'Beginner'
                : difficulty <= 3
                ? 'Intermediate'
                : 'Advanced'}
            </p>
          </div>
        </div>

        {/* Quest Progress */}
        {/* <div className="mb-5"> */}
          {/* <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-white/50">Completion</p>
            <p className="text-xs font-medium">
              {isCompleted ? (
                <span className="text-primary">Completed</span>
              ) : status === 'inactive' ? (
                <span className="text-amber-400">Inactive</span>
              ) : (
                <span className="text-primary">In Progress</span>
              )}
            </p>
          </div> */}

          {/* <div className="w-full bg-dark rounded-full h-1.5">
            <div
              className={`h-1.5 rounded-full ${
                isCompleted
                  ? 'bg-primary'
                  : status === 'inactive'
                  ? 'bg-amber-500/50'
                  : 'bg-primary/50'
              }`}
              style={{
                width: isCompleted
                  ? '100%'
                  : status === 'inactive'
                  ? '5%'
                  : '50%',
              }}
            ></div>
          </div> */}
        {/* </div> */}

        {/* Action Button */}
        <div className="mt-6">
          {status === 'inactive' ? (
            <div className="w-full bg-dark text-amber-400 py-2 px-4 rounded text-xs flex items-center justify-center gap-2 border border-white/5">
              <Clock size={14} />
              <span>Quest currently inactive</span>
            </div>
          ) : isCompleted ? (
            <div className="w-full bg-dark text-primary py-2 px-4 rounded text-xs flex items-center justify-center gap-2 border border-white/5">
              <Trophy size={14} />
              <span>Rewards earned</span>
            </div>
          ) : (
            <button
              onClick={onVerify}
              disabled={isLoading || status === 'inactive'}
              className="w-full py-2 px-4 rounded text-sm font-medium flex items-center justify-center gap-1.5 transition-colors bg-primary hover:bg-primary/90 text-white disabled:bg-gray-700 disabled:text-white/50"
            >
              {isLoading ? (
                <>
                  <Spinner size="sm" color="white" />
                  <span>Verifying...</span>
                </>
              ) : (
                <span>Verify & Claim XP</span>
              )}
            </button>
          )}
        </div>

        {/* Status Message */}
        {!isCompleted && status !== 'inactive' && (
          <p className="text-white/40 text-center text-xs mt-3">
            Complete this quest to earn {reward} XP
          </p>
        )}
      </div>
    </div>
  );
};
