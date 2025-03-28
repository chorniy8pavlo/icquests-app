import CampaignPage from '@/components/campaign-page';
import { getActiveCampaigns } from '@/integration';
import React from 'react';

export async function generateStaticParams() {
  const campaigns = await getActiveCampaigns();
  return campaigns.map((campaign) => ({
    id: String(campaign.getUI().id),
  }));
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

