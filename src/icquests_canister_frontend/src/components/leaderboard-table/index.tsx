'use client';

import Image from 'next/image';
import People from '../../assets/svgs/people.svg';
import PhotoXP from '../../assets/svgs/photo-xp.svg';
import CupGold from '../../assets/svgs/cup-gold.svg';
import CupBronze from '../../assets/svgs/cup-bronze.svg';
import CupSilver from '../../assets/svgs/cup-silver.svg';
import useSWR from 'swr';
import { userConnector } from '@/integration/connectors/user';
import Web3Loader from '@/components/web3-loader';

const getCupImage = (rank: number) => {
  switch (rank) {
    case 1:
      return { img: CupGold, alt: 'Gold Cup' };
    case 2:
      return { img: CupSilver, alt: 'Silver Cup' };
    case 3:
      return { img: CupBronze, alt: 'Bronze Cup' };
    default:
      return null;
  }
};

export default function LeaderBoardTable() {
  const { data, error, isLoading } = useSWR('allUsers', () =>
    userConnector.getAllUsers()
  );

  if (error) {
    return (
      <div className="bg-white/5 p-8 rounded-xl text-center">
        <h2 className="text-xl font-bold mb-4">Error Loading Leaderboard</h2>
        <p className="text-white/70">
          There was an error loading leaderboard data.
        </p>
      </div>
    );
  }

  if (isLoading || !data) {
    return <Web3Loader message="Loading leaderboard..." />;
  }

  return (
    <div className="mb-10">
      <div className="bg-secondary/60 p-4 rounded-xl mb-4">
        <div className="flex items-center justify-between font-medium text-white/80">
          <div className="flex items-center gap-[163px]">
            <p className="text-sm uppercase">Rank</p>
            <p className="text-sm uppercase">Wallet</p>
          </div>
          <div className="flex items-center gap-[86px]">
            <p className="text-sm uppercase">Quests Passed</p>
            <p className="text-sm uppercase">XP Rating</p>
          </div>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="bg-secondary p-8 rounded-xl text-center">
          <p className="text-xl text-white/70">
            No users found on the leaderboard yet.
          </p>
        </div>
      ) : (
        data.map(({ principal, completedQuests, xpBalance }, index) => {
          const cup = getCupImage(index + 1);
          return (
            <div
              key={`${principal}-${index}`}
              className="bg-secondary hover:bg-secondary/80 transition-colors py-4 px-5 flex items-center justify-between rounded-xl mb-3"
            >
              <div className="flex items-center gap-[148px]">
                {cup ? (
                  <Image src={cup.img} alt={cup.alt} />
                ) : (
                  <p className="text-lg font-semibold font-mono w-[47px]">
                    {(index + 1).toString().padStart(3, '0')}
                  </p>
                )}
                <div className="flex items-center gap-[17px]">
                  <Image src={People} alt="User Icon" className="w-5 h-5" />
                  <p className="font-sans uppercase truncate max-w-[200px]">
                    {principal}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-[175px] text-lg font-sans">
                <p>{completedQuests.length}</p>
                <div className="flex items-center gap-2">
                  <p>{xpBalance}</p>
                  <Image src={PhotoXP} alt="XP Icon" />
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
