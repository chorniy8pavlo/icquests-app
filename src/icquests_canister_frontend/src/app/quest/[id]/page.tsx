import QuestDetailsClient from '@/components/quest-page';
import { getQuests } from '@/integration';

export async function generateStaticParams() {
  const quests = await getQuests();
  return quests.map((quest) => ({
    id: String(quest.getUI().id),
  }));
}


export default async function QuestDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  return <QuestDetailsClient id={id} />;
} 