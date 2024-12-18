// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import CampaignPage from '@/components/campaign-page';
import React from 'react';

export async function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }];
}

export default async function Campaigns({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <CampaignPage id={id} />
    </>
  );
}
