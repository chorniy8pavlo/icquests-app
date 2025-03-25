import { ICampaign } from '@/types';

export class Campaign implements ICampaign {
  constructor(
    public id: string,
    private title: string,
    private description: string,
    private background: string,
    private logo: string,
    private partnerUrl: string,
    private category: string,
    private createdDate: string = 'today',
    private totalQuests: number = 1,
    private completedQuestsByUser: number = 0,
    private totalXP: number = 15,
    private earnedXPByUser: number = 0
  ) {}

  getUI() {
    return {
      id: this.id,
      background: this.background,
      logo: this.logo,
      title: this.title,
      subtitle: this.description,
      createdDate: this.createdDate,
      totalQuests: this.totalQuests,
      completedQuestsByUser: this.completedQuestsByUser,
      totalXP: this.totalXP,
      earnedXPByUser: this.earnedXPByUser,
      partnerUrl: this.partnerUrl,
      category: this.category
    };
  }
}
