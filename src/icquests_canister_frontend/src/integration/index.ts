import { IQuest } from '@/types';
import { campaignConnector } from './connectors/campaigns';
import { questConnector } from './connectors/quests';
import { Campaign } from './entities/campaign';

export const getActiveCampaigns = async (): Promise<Campaign[]> => {
  const data = await campaignConnector.getCampaigns();
  return data;
};

export const getCampaignById = async (
  id: string
): Promise<Campaign | undefined> => {
  const campaigns = await getActiveCampaigns();
  const data = campaigns.find((c) => c.id === id);
  return data;
};

export const getQuests = async (campaignId?: string): Promise<IQuest[]> => {
  const data = await questConnector.getQuests();

  if (campaignId) {
    return data.filter((q) => q.getCampaignUI().id == campaignId);
  }

  return data;
};
