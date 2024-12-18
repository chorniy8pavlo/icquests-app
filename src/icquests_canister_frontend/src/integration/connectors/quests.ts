import { getActor } from '@/utils/ic';
import { AnonymousIdentity } from '@dfinity/agent';
import { idlFactory } from '../idl';

import { Quest } from '../entities/quest';
import { campaignConnector } from './campaigns';

export class QuestsConnector {
  async getQuests(): Promise<Quest[]> {
    const actor = await getActor(
      'lyo6x-saaaa-aaaao-qjwlq-cai',
      new AnonymousIdentity(),
      idlFactory
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = (await actor.getAllQuests()) as any[];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const campaigns = await campaignConnector.getCampaigns();

    return result?.map((c) => {
      const questCampaign = campaigns.find((camp) => camp.id === c.campaignId);
      return new Quest(
        c.id,
        c.title,
        c.subtitle,
        c.description,
        c.status,
        c.rewardXp,
        questCampaign
      );
    });
  }
}

export const questConnector = new QuestsConnector();
