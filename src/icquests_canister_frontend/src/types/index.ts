import { Campaign } from '@/integration/entities/campaign';
import { Identity } from '@dfinity/agent';
import { VerificationResult } from '@/integration/entities/quest';

export type QuestStatus = 'active' | 'completed' | 'inactive';
export type CampaignStatus = 'active' | 'inactive';

export interface IQuestUI {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  status: QuestStatus;
  reward: number;
  campaign?: Campaign;
  participantsCount: number;
  tags: string[];
  estimatedTime: string;
  difficulty: number;
  prerequisites: string;
}
export interface ICampaignUI {
  id: string;
  background: string;
  logo: string;
  title: string;
  subtitle: string;
  totalQuests: number;
  completedQuestsByUser: number;
  totalXP: number;
  earnedXPByUser: number;
  partnerUrl: string;
  category: string;
}

export interface IUser {
  principal: string;
  xpBalance: number;
  completedQuests: bigint[];
}

export interface IQuest {
  getUI(): IQuestUI;
  getCampaignUI(): ICampaignUI;
  verifyCompletion(identity: Identity): Promise<VerificationResult>;
}

export interface ICampaign {
  getUI(): ICampaignUI;
}


export interface RawCampaign {
  id: number;
  title : string;
  image : string;
  description : string;
  logo : string;
  isActive : boolean;
  partnerUrl : string;
  category : string;
}