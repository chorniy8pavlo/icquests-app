import { ICampaign, IUser } from '@/types';
import { Quest } from './quest';

export class Campaign implements ICampaign {
  constructor(
    public id: string,
    private title: string,
    private description: string,
    private background: string,
    private logo: string,
    private partnerUrl: string,
    private category: string,
    private quests = [] as Quest[],
    private user?: IUser
  ) {}

  getUI() {
    const completedByUser = this.user?.completedQuests.filter(q => this.quests.some(c => c.getUI().id.toString() === q.toString()))?.length
    const totalXP = this.quests.reduce((acc, quest) => acc + Number(quest.getUI().reward), 0)
    const earnedXPByUser = this.quests.filter(q => this.user?.completedQuests.includes(BigInt(q.getUI().id))).reduce((acc, quest) => acc + Number(quest.getUI().reward), 0)

    return {
      id: this.id,
      background: this.background,
      logo: this.logo,
      title: this.title,
      subtitle: this.description,
      totalQuests: this.quests.length,
      partnerUrl: this.partnerUrl,
      category: this.category,
      completedQuestsByUser: completedByUser ?? 0,
      totalXP,
      earnedXPByUser,
    };
  }
}
