import { ICampaignUI, IQuest, IQuestUI, QuestStatus } from '@/types';
import { DelegationIdentity } from '@dfinity/identity';
import { Campaign } from './campaign';
import { getActor } from '@/utils/ic';
import { idlFactory } from '../idl';

export type VerificationResult = {
  status: 'QUEST_COMPLETED' | 'QUEST_ALREADY_COMPLETED' | 'QUEST_NOT_VERIFIED' | 'USER_NOT_FOUND' | 'ERROR';
  success: boolean;
  message: string;
};

export class Quest implements IQuest {
  constructor(
    public id: string,
    private title: string,
    private subtitle: string,
    private description: string,
    private status: QuestStatus,
    private reward: number,
    private difficulty: number,
    private prerequisites: string,
    private tags: string[],
    private estimatedTime: string,
    private participantsCount: number,
    private campaignId: string,
    private campaign?: Campaign,
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
      difficulty: this.difficulty,
      prerequisites: this.prerequisites,
      tags: this.tags,
      estimatedTime: this.estimatedTime,
      participantsCount: this.participantsCount,
    };
  }

  getCampaignUI(): ICampaignUI {
    if (!this.campaign) throw new Error('Campaign not provided');
    return this.campaign.getUI();
  }

  getCampaignId(): string {
    return this.campaignId;
  }

  async verifyCompletion(identity: DelegationIdentity): Promise<VerificationResult> {
    try {
      const actor = await getActor(
        'lyo6x-saaaa-aaaao-qjwlq-cai',
        identity,
        idlFactory
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = (await actor.verify(Number(this.id))) as string;
      
      // Handle different response statuses
      switch (result) {
        case 'QUEST_COMPLETED':
          return {
            status: 'QUEST_COMPLETED',
            success: true,
            message: 'Congratulations! Quest completed successfully!'
          };
        case 'QUEST_ALREADY_COMPLETED':
          return {
            status: 'QUEST_ALREADY_COMPLETED',
            success: false,
            message: 'You have already completed this quest.'
          };
        case 'QUEST_NOT_VERIFIED':
          return {
            status: 'QUEST_NOT_VERIFIED',
            success: false,
            message: 'Quest requirements have not been met. Please complete all tasks and try again.'
          };
        case 'USER_NOT_FOUND':
          return {
            status: 'USER_NOT_FOUND',
            success: false,
            message: 'User not found. Please ensure your wallet is properly connected.'
          };
        default:
          return {
            status: 'ERROR',
            success: false,
            message: 'An unexpected error occurred. Please try again later.'
          };
      }
    } catch (error) {
      console.error('Verification error:', error);
      return {
        status: 'ERROR',
        success: false,
        message: 'An error occurred during verification. Please try again later.'
      };
    }
  }
}
