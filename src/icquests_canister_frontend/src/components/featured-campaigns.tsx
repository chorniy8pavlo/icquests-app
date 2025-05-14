'use client';

import { getActiveCampaigns } from '@/integration';
import { ICampaign } from '@/types';
import { useAuth } from '@nfid/identitykit/react';
import { Award } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import useSWR from 'swr';
import Logo from '../assets/svgs/logo.svg';
import PhotoXp from '../assets/svgs/photo-xp.svg';

// Define the UI object structure returned by getUI()
interface CampaignUI {
  id: string;
  title: string;
  subtitle: string;
  background: string;
  logo: string;
  totalQuests: number;
  totalXP: number;
  category: string;
  partnerUrl: string;
  completedQuestsByUser: number;
  earnedXPByUser: number;
}

export default function FeaturedCampaigns() {
  const { user } = useAuth();
  const { data, error, isLoading } = useSWR<ICampaign[]>(
    ['campaigns', user], 
    () => getActiveCampaigns(user)
  );

  if (error) {
    return (
      <div className="bg-white/5 p-8 rounded-xl text-center">
        <h3 className="text-xl font-bold mb-4">Error Loading Campaigns</h3>
        <p className="text-white/70 mb-6">
          There was an error loading campaign details.
        </p>
      </div>
    );
  }

  if (isLoading || !data) {
    return (
      <div className="h-60 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-white/70">Loading campaigns...</p>
        </div>
      </div>
    );
  }

  // Show only first 3 campaigns
  const featuredCampaigns = data.slice(0, 3);

  if (featuredCampaigns.length === 0) {
    return (
      <div className="bg-white/5 p-8 rounded-xl text-center">
        <h3 className="text-xl font-bold mb-4">No Campaigns Available</h3>
        <p className="text-white/70 mb-6">
          Check back soon for new quests and campaigns.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {featuredCampaigns.map((campaign) => {
        // Get the campaign UI data using the campaign's getUI method
        const campaignUI = campaign.getUI() as CampaignUI;
        
        // Format category for display (capitalize first letter)
        const displayCategory = campaignUI.category.charAt(0).toUpperCase() + campaignUI.category.slice(1);
        
        return (
          <Link 
            key={campaignUI.id}
            href={`/campaign/${campaignUI.id}`}
            className="relative overflow-hidden rounded-xl bg-cover bg-center group h-[320px] transition-transform hover:scale-[1.02]"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8)), url(${campaignUI.background || ''})`,
              backgroundColor: '#191A1F'
            }}
          >
            <div className="p-6 h-full flex flex-col">
              <div className="flex items-center gap-4 mb-auto">
                <div className="w-12 h-12 rounded-xl bg-secondary border border-white/10 flex items-center justify-center">
                  <Image 
                    src={campaignUI.logo || Logo} 
                    alt={campaignUI.title} 
                    width={24} 
                    height={24} 
                    unoptimized={!!campaignUI.logo}
                  />
                </div>
                <div className="bg-primary/20 font-medium py-1 px-3 text-xs rounded-full flex items-center border border-primary/30">
                  <span className="text-primary">{displayCategory}</span>
                </div>
              </div>
              
              <div className="mt-auto">
                <h3 className="font-bold text-xl mb-2">{campaignUI.title}</h3>
                <p className="text-sm text-white/80 mb-4 line-clamp-2">
                  {campaignUI.subtitle}
                </p>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Image src={PhotoXp} alt="XP" width={14} height={14} />
                      <span className="text-xs">{campaignUI.totalXP} XP</span>
                    </div>
                    <span className="text-white/30">|</span>
                    <div className="flex items-center gap-1">
                      <Award size={14} />
                      <span className="text-xs">{campaignUI.totalQuests} Quests</span>
                    </div>
                  </div>
                  
                  <div className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
} 