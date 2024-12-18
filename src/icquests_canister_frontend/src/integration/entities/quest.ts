import { ICampaignUI, IQuest, IQuestUI, QuestStatus } from '@/types';
import { DelegationIdentity } from '@dfinity/identity';
import { Campaign } from './campaign';
import { getActor } from '@/utils/ic';
import { idlFactory } from '../idl';

export class Quest implements IQuest {
  constructor(
    public id: string,
    private title: string,
    private subtitle: string,
    private description: string,
    private status: QuestStatus,
    private reward: number,
    private campaign?: Campaign
  ) {}

  getUI(): IQuestUI {
    return {
      id: this.id,
      title: this.title,
      subtitle: this.subtitle,
      description: this.description,
      status: this.status,
      reward: this.reward,
      campaign: this.campaign,
    };
  }

  getCampaignUI(): ICampaignUI {
    if (!this.campaign) throw new Error('Campaign not provided');
    return this.campaign.getUI();
  }

  async verifyCompletion(identity: DelegationIdentity): Promise<boolean> {
    const actor = await getActor(
      'lyo6x-saaaa-aaaao-qjwlq-cai',
      identity,
      idlFactory
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = (await actor.verify(this.id)) as boolean;
    console.log('verify', { result });
    return result;
  }
}
