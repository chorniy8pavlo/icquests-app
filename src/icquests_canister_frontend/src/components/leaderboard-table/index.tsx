'use client';

import Image from 'next/image';
import People from '../../assets/svgs/people.svg';
import PhotoXP from '../../assets/svgs/photo-xp.svg';
import CupGold from '../../assets/svgs/cup-gold.svg';
import CupBronze from '../../assets/svgs/cup-bronze.svg';
import CupSilver from '../../assets/svgs/cup-silver.svg';
import useSWR from 'swr';
import { userConnector } from '@/integration/connectors/user';

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
  const { data } = useSWR('allUsers', () => userConnector.getAllUsers());

  return (
    <div className="max-w-[1392px] mx-auto mt-[45px]">
      <div className="flex items-center justify-between">
        <p className="font-sans text-2xl leading-9 font-semibold">
          Leaderboard
        </p>
        {/* <input
          className="bg-black text-lightGrayTransparent/50 focus:text-white border-b-2 border-white focus:outline-none focus:border-white px-3 py-2"
          placeholder="Search by wallet / rank"
        /> */}
      </div>

      <div className="flex items-center justify-between mt-[34px] font-ibmMono">
        <div className="flex items-center gap-[163px]">
          <p className="text-lg font-bold uppercase">rank</p>
          <p className="text-lg font-bold uppercase">wallet</p>
        </div>
        <div className="flex items-center gap-[86px]">
          <p className="text-lg font-bold uppercase">QUESTS PASSED</p>
          <p className="text-lg font-bold uppercase">xp rating</p>
        </div>
      </div>

      {data?.map(({ principal, completedQuests, xpBalance }, index) => {
        const cup = getCupImage(index + 1);
        return (
          <div
            key={`${principal}-${index}`}
            className="bg-secondary py-2 px-5 flex items-center justify-between rounded-[20px] mt-[26px]"
          >
            <div className="flex items-center gap-[148px]">
              {cup ? (
                <Image src={cup.img} alt={cup.alt} />
              ) : (
                <p className="text-lg font-semibold font-ibmMono w-[47px]">
                  00{index + 1}
                </p>
              )}
              <div className="flex items-center gap-[17px]">
                <Image src={People} alt="" />
                <p className="font-sans uppercase">
                  {/* {truncateString(principal, 6, 4)} */}
                  {principal}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-[175px] text-lg font-sans">
              <p>{completedQuests.length}</p>
              <div className="flex items-center gap-2">
                <p>{xpBalance}</p>
                <Image src={PhotoXP} alt="" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
