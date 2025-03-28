import { IQuest } from '@/types';
import { campaignConnector } from './connectors/campaigns';
import { questConnector } from './connectors/quests';
import { Campaign } from './entities/campaign';
import { Principal } from '@dfinity/principal';
import { SubAccount } from '@dfinity/ledger-icp';

export const getActiveCampaigns = async (user?: {
  principal: Principal;
  subAccount?: SubAccount;
} | undefined): Promise<Campaign[]> => {
  const data = await campaignConnector.getCampaigns(user?.principal.toString());
  return data;
};

export const getCampaignById = async (
  id: string,
  user?: {
    principal: Principal;
    subAccount?: SubAccount;
  } | undefined
): Promise<Campaign | undefined> => {
  const campaigns = await getActiveCampaigns(user);
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
