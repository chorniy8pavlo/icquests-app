import { ICampaign } from '@/types';

export class Campaign implements ICampaign {
  constructor(
    public id: string,
    private title: string,
    private description: string,
    private background: string,
    private logo: string,
    private partnerUrl: string
  ) {}

  getUI() {
    return {
      id: this.id,
      background: this.background,
      logo: this.logo,
      title: this.title,
      subtitle: this.description,
      createdDate: 'today',
      totalQuests: 1,
      completedQuestsByUser: 0,
      totalXP: 15,
      earnedXPByUser: 0,
      partnerUrl: this.partnerUrl
    };
  }
}
