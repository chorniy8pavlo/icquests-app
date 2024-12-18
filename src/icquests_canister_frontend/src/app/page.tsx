'use client';

import CampaignBanner from '@/components/campaign-banner';
import { getActiveCampaigns } from '@/integration';
import { ICampaign } from '@/types';
import { Spinner } from '@nextui-org/react';
import Link from 'next/link';
import useSWR from 'swr';

export default function Home() {
  const { data, error } = useSWR<ICampaign[]>('campaigns', getActiveCampaigns);

  if (error) return <div>Error loading campaigns</div>;
  if (!data)
    return (
      <div className="h-screen flex items-center justify-center flex-col">
        <span>Loading campaigns...</span>
        <Spinner className="mt-5" />
      </div>
    );

  return (
    <div className="min-h-screen">
      <p className="px-3 max-w-[1392px] mx-auto mt-[35px] pb-5 text-2xl font-semibold">
        Active campaigns
      </p>
      <div className="grid grid-cols-1 px-3 md:grid-cols-2 gap-6 max-w-[1392px] mx-auto mt-5 pb-10">
        {data?.map((item, index) => {
          return (
            <Link
              className={index === 0 ? 'md:col-span-2' : ''}
              href={`/campaign/${item.getUI().id}`}
              key={item.getUI().id}
            >
              <CampaignBanner campaign={item.getUI()} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
