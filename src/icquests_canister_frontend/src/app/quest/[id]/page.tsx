import QuestDetailsClient from '@/components/quest-page';

export async function generateStaticParams() {
    return [
      { id: '1' },
      { id: '2' },
      { id: '3' },
      { id: '4' },
      { id: '5' },
    ];
}


export default async function QuestDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  return <QuestDetailsClient id={id} />;
} 