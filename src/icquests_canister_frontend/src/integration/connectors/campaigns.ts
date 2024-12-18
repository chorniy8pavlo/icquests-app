import { getActor } from '@/utils/ic';
import { AnonymousIdentity } from '@dfinity/agent';
import { idlFactory } from '../idl';
import { Campaign } from '../entities/campaign';

export class CampaignConnector {
  async getCampaigns(): Promise<Campaign[]> {
    const actor = await getActor(
      'lyo6x-saaaa-aaaao-qjwlq-cai',
      new AnonymousIdentity(),
      idlFactory
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = (await actor.getAllCampaigns()) as any[];
    console.log({ result });

    return result?.map(
      (c) => new Campaign(c.id, c.title, c.description, c.image, c.logo)
    );
  }
}

export const campaignConnector = new CampaignConnector();
