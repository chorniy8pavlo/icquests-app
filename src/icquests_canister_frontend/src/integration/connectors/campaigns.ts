import { getActor } from '@/utils/ic';
import { AnonymousIdentity } from '@dfinity/agent';
import { idlFactory } from '../idl';
import { Campaign } from '../entities/campaign';
import { questConnector } from './quests';
import { RawCampaign } from '@/types';
import { userConnector } from './user';

export class CampaignConnector {
  async getCampaigns(userPrincipal?: string): Promise<Campaign[]> {
    const actor = await getActor(
      'lyo6x-saaaa-aaaao-qjwlq-cai',
      new AnonymousIdentity(),
      idlFactory
    );


    const result = (await actor.getAllCampaigns()) as RawCampaign[];
    const allQuests = await questConnector.getQuests(false)
    const user = userPrincipal ? await userConnector.getUser(userPrincipal) : undefined;


    return result?.map(
      (c) => new Campaign(
        String(c.id), 
        c.title, 
        c.description, 
        c.image, 
        c.logo, 
        c.partnerUrl,
        c.category || 'General', // Default category if not provided
        allQuests.filter((q) => String(q.getCampaignId()) === String(c.id)),
        user
      )
    );
  }
}

export const campaignConnector = new CampaignConnector();
