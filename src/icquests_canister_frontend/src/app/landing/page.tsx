'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from "motion/react";
import { ArrowRight, Award, Check, Users } from 'lucide-react';
import PhotoXp from '../../assets/svgs/photo-xp.svg';
import FeaturedCampaigns from '../../components/featured-campaigns';
import useSWR from 'swr';
import { getActiveCampaigns } from '@/integration';
import { ICampaign } from '@/types';
import { useAuth } from '@nfid/identitykit/react';

export default function LandingPage() {
  const { user } = useAuth();
  
  // Fetch campaigns data from API
  const { data: campaigns, error, isLoading } = useSWR<ICampaign[]>(
    ['campaigns', user], 
    () => getActiveCampaigns(user)
  );

  // Extract unique partners from campaign data
  const partners = campaigns ? [...new Map(
    campaigns
      .filter(campaign => {
        const ui = campaign.getUI();
        return ui.logo && ui.partnerUrl;
      })
      .map(campaign => {
        const ui = campaign.getUI();
        return [ui.title, {
          name: ui.title,
          logo: ui.logo,
          url: ui.partnerUrl
        }];
      })
  ).values()] : [];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div 
        className="relative min-h-screen flex items-center bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(25,26,31,0.7), rgba(0,0,0,0.9)), url('/hero-pattern.svg')`,
          backgroundColor: '#191A1F',
          backgroundSize: '120px',
          backgroundRepeat: 'repeat'
        }}
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-black/40 to-secondary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        ></motion.div>
        
        <div className="container mx-auto px-4 md:px-8 pt-16 relative z-1 max-w-[1392px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[80vh]">
            {/* Left Column - Text Content */}
            <div className="space-y-8 mt-8 lg:mt-0">
              <motion.div 
                className="inline-flex items-center gap-2 bg-primary/20 font-medium py-1.5 px-4 text-sm rounded-full border border-primary/30"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-primary">Powered by Internet Computer</span>
              </motion.div>
              
              <motion.h1 
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Complete <span className="text-primary">Quests.</span> <br />
                Earn <span className="text-primary">Rewards.</span>
              </motion.h1>
              
              <motion.p 
                className="text-xl text-white/80 max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Explore the Internet Computer ecosystem through interactive challenges and build your on-chain identity.
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-4 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Link 
                  href="/all-quests"
                  className="flex items-center gap-2 bg-primary hover:bg-primary/90 transition-colors py-4 px-8 rounded-lg text-black font-semibold shadow-lg text-lg relative overflow-hidden group"
                >
                  <span className="relative z-10">Start Questing</span>
                  <ArrowRight size={20} className="relative z-10" />
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </Link>
                
                <Link 
                  href="#how-it-works"
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors py-4 px-8 rounded-lg text-white font-semibold shadow-lg text-lg"
                >
                  <span>Learn More</span>
                </Link>
              </motion.div>
              
              <motion.div 
                className="flex flex-wrap gap-6 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-full bg-primary/20">
                    <Check size={16} className="text-primary" />
                  </div>
                  <span className="text-sm md:text-base text-white/80">100% On-Chain</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-full bg-primary/20">
                    <Users size={16} className="text-primary" />
                  </div>
                  <span className="text-sm md:text-base text-white/80">Growing Community</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-full bg-primary/20">
                    <Image src={PhotoXp} alt="XP" width={16} height={16} className="text-primary" />
                  </div>
                  <span className="text-sm md:text-base text-white/80">Earn XP Rewards</span>
                </div>
              </motion.div>
            </div>
            
            {/* Right Column - Quest Cards */}
            <div className="hidden lg:block relative">
              <div className="relative">
                {/* Stack of quest cards with perspective effect */}
                <div className="perspective-1000 h-[500px] relative flex items-center justify-center">
                  {/* Quest Card 3 (bottom) */}
                  <motion.div 
                    className="absolute transform rotate-[-8deg] translate-x-[-70px] translate-y-[20px] w-[320px]"
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: -70 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    whileHover={{ y: 15, rotate: -5, transition: { duration: 0.3 } }}
                  >
                    <div className="bg-secondary/60 backdrop-blur-md rounded-xl border border-white/10 shadow-xl p-5 transition-all hover:shadow-2xl">
                      <div className="flex justify-between items-start mb-3">
                        <div className="bg-primary/10 p-3 rounded-lg">
                          <Award size={24} className="text-primary" />
                        </div>
                        <div className="bg-black/40 px-3 py-1 rounded-md text-xs">Advanced</div>
                      </div>
                      <h3 className="text-xl font-bold mb-2">Smart Contracts</h3>
                      <p className="text-sm text-white/70 mb-3">Build and deploy your first smart contract on the Internet Computer</p>
                      <div className="bg-white/10 h-1.5 rounded-full w-full mb-2">
                        <div className="bg-primary h-full rounded-full w-[25%]"></div>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-white/50">25% completed</span>
                        <span className="text-primary">+500 XP</span>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Quest Card 2 (middle) */}
                  <motion.div 
                    className="absolute transform rotate-[5deg] translate-x-[50px] translate-y-[-10px] w-[320px] z-10"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 50 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    whileHover={{ y: -20, rotate: 8, transition: { duration: 0.3 } }}
                  >
                    <div className="bg-secondary/80 backdrop-blur-md rounded-xl border border-white/10 shadow-xl p-5 transition-all hover:shadow-2xl">
                      <div className="flex justify-between items-start mb-3">
                        <div className="bg-primary/10 p-3 rounded-lg">
                          <Award size={24} className="text-primary" />
                        </div>
                        <div className="bg-black/40 px-3 py-1 rounded-md text-xs">Intermediate</div>
                      </div>
                      <h3 className="text-xl font-bold mb-2">NFID Integration</h3>
                      <p className="text-sm text-white/70 mb-3">Learn how to integrate Internet Identity into your applications</p>
                      <div className="bg-white/10 h-1.5 rounded-full w-full mb-2">
                        <div className="bg-primary h-full rounded-full w-[70%]"></div>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-white/50">70% completed</span>
                        <span className="text-primary">+300 XP</span>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Quest Card 1 (top, completed) */}
                  <motion.div 
                    className="absolute transform translate-y-[-40px] w-[320px] z-20"
                    initial={{ opacity: 0, y: -80 }}
                    animate={{ opacity: 1, y: -40 }}
                    transition={{ duration: 0.7 }}
                    whileHover={{ y: -55, transition: { duration: 0.3 } }}
                  >
                    <div className="bg-black/40 backdrop-blur-md rounded-xl border border-primary/30 shadow-xl p-5 transition-all hover:shadow-2xl">
                      <div className="flex justify-between items-start mb-3">
                        <div className="bg-primary/20 p-3 rounded-lg">
                          <Award size={24} className="text-primary" />
                        </div>
                        <div className="bg-primary/20 px-3 py-1 rounded-md text-xs text-primary">Beginner</div>
                      </div>
                      <h3 className="text-xl font-bold mb-2">IC Basics</h3>
                      <p className="text-sm text-white/70 mb-3">Introduction to the Internet Computer Protocol</p>
                      <div className="bg-white/10 h-1.5 rounded-full w-full mb-2">
                        <div className="bg-primary h-full rounded-full w-full"></div>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-primary/20 flex items-center justify-center">
                            <Check size={6} className="text-primary" />
                          </div>
                          <span className="text-primary">Completed</span>
                        </div>
                        <span className="text-primary font-bold">+100 XP</span>
                      </div>
                      
                      {/* Completion badge */}
                      <motion.div 
                        className="absolute -top-3 -right-3 w-12 h-12 bg-primary rounded-full flex items-center justify-center border-4 border-black"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 260, 
                          damping: 20, 
                          delay: 0.8 
                        }}
                      >
                        <Check size={20} className="text-black" />
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
                
                {/* Animated light beams */}
                <motion.div 
                  className="absolute -top-20 -right-20 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] -z-10"
                  animate={{ 
                    opacity: [0.5, 0.8, 0.5],
                    scale: [0.8, 1.1, 0.8],
                  }}
                  transition={{ 
                    duration: 8, 
                    repeat: Infinity,
                    repeatType: "reverse" 
                  }}
                ></motion.div>
                <motion.div 
                  className="absolute -bottom-20 -left-20 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] -z-10"
                  animate={{ 
                    opacity: [0.3, 0.6, 0.3],
                    scale: [0.9, 1.2, 0.9],
                  }}
                  transition={{ 
                    duration: 10, 
                    repeat: Infinity,
                    repeatType: "reverse" 
                  }}
                ></motion.div>
                
                {/* Add perspective and other necessary styles */}
                <style jsx global>{`
                  .perspective-1000 {
                    perspective: 1000px;
                  }
                `}</style>
              </div>
            </div>
          </div>
          
          {/* Stats Bar */}
          <motion.div 
            className="mt-8 lg:mt-16 mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 p-6 bg-secondary/50 backdrop-blur-md rounded-xl border border-white/5">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">50+</p>
                <p className="text-sm text-white/60 mt-1">Available Quests</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">10K+</p>
                <p className="text-sm text-white/60 mt-1">Active Users</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">100K+</p>
                <p className="text-sm text-white/60 mt-1">XP Rewarded</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* How It Works Section */}
      <div id="how-it-works" className="py-24 relative overflow-hidden" style={{
        background: `radial-gradient(ellipse at 50% 5%, rgba(149, 201, 1, 0.15), transparent 50%),
                    linear-gradient(to bottom, #191A1F, #121317)`,
      }}>
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black to-transparent opacity-40"></div>
        
        <motion.div 
          className="absolute top-10 right-10 w-40 h-40 bg-primary/10 rounded-full filter blur-3xl"
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
        ></motion.div>
        
        <motion.div 
          className="absolute bottom-10 left-10 w-40 h-40 bg-primary/10 rounded-full filter blur-3xl"
          animate={{ y: [10, -10, 10] }}
          transition={{ duration: 7, repeat: Infinity, repeatType: "reverse" }}
        ></motion.div>
        
        {/* Decorative pattern */}
        <motion.div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url("/grid-pattern.svg")',
            backgroundSize: '40px 40px'
          }}
          animate={{ 
            backgroundPosition: ['0px 0px', '20px 20px'],
          }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        ></motion.div>
        
        <div className="container mx-auto px-4 md:px-8 max-w-[1280px] relative z-10">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="inline-flex items-center justify-center gap-2 bg-primary/10 rounded-full px-4 py-2 border border-primary/20 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Award size={16} className="text-primary" />
              </div>
              <span className="text-sm font-medium text-primary">The Journey</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-5">How IC Quests Works</h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Complete quests, earn XP, and build your skills on the Internet Computer ecosystem
              with our easy-to-follow process.
            </p>
          </motion.div>
          
          {/* Journey Map - Desktop (hidden on mobile) */}
          <div className="hidden lg:block relative">
            
            {/* Step Boxes along the journey path */}
            <div className="flex flex-col items-center">
              {/* Step 1 Box */}
              <motion.div 
                className="w-full mb-40 flex"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="w-[45%] pr-10 text-right flex flex-col justify-center">
                  <div className="inline-block bg-primary/10 rounded-full px-4 py-1 text-sm text-primary mb-4 border border-primary/20">Step 1</div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">Connect Your Wallet</h3>
                  <p className="text-white/70 text-base leading-relaxed">Sign in with your Internet Identity to start your journey. No wallet? No problem! You can create one in just a few clicks.</p>
                </div>
                
                <div className="w-[55%] pl-10">
                  {/* UI Mockup */}
                  <div className="bg-black/40 rounded-xl overflow-hidden border border-white/10 transform transition-all hover:-translate-y-1 hover:shadow-xl shadow-xl w-[85%] mx-auto">
                    <div className="h-10 bg-black/50 flex items-center px-4">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-primary/70"></div>
                        <div className="w-3 h-3 rounded-full bg-white/20"></div>
                        <div className="w-3 h-3 rounded-full bg-white/20"></div>
                      </div>
                      <div className="flex-1"></div>
                      <div className="text-xs text-white/50">Connect Wallet</div>
                    </div>
                    <div className="p-8 bg-gradient-to-br from-secondary to-black/40 flex items-center justify-center">
                      <div className="bg-black/30 rounded-lg p-8 flex flex-col items-center max-w-xs mx-auto">
                        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                          <Users size={30} className="text-primary" />
                        </div>
                        <div className="text-center mb-6">
                          <h4 className="text-xl font-semibold mb-2">Welcome to IC Quests</h4>
                          <p className="text-sm text-white/60">Connect to start your journey</p>
                        </div>
                        <button className="bg-primary text-black font-medium text-sm py-3 px-6 rounded-lg w-full flex items-center justify-center">
                          <span>Connect Wallet</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Step 2 Box */}
              <motion.div 
                className="w-full mb-40 flex"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="w-[55%] pr-10">
                  {/* UI Mockup */}
                  <div className="bg-black/40 rounded-xl overflow-hidden border border-white/10 transform transition-all hover:-translate-y-1 hover:shadow-xl shadow-xl w-[85%] mx-auto">
                    <div className="h-10 bg-black/50 flex items-center px-4">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-primary/70"></div>
                        <div className="w-3 h-3 rounded-full bg-white/20"></div>
                        <div className="w-3 h-3 rounded-full bg-white/20"></div>
                      </div>
                      <div className="flex-1"></div>
                      <div className="text-xs text-white/50">Browse Quests</div>
                    </div>
                    <div className="p-8 bg-gradient-to-br from-secondary to-black/40">
                      <div className="space-y-4">
                        <div className="bg-black/30 rounded-lg p-4 flex items-center transition-all hover:bg-black/40 cursor-pointer border border-white/5">
                          <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mr-5">
                            <Award size={24} className="text-primary" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-base mb-1">Internet Computer Basics</h4>
                            <p className="text-xs text-white/50">Beginner • 3 Quests • 200 XP</p>
                          </div>
                          <div className="bg-white/10 w-10 h-10 rounded-full flex items-center justify-center">
                            <ArrowRight size={18} />
                          </div>
                        </div>
                        
                        <div className="bg-black/30 rounded-lg p-4 flex items-center transition-all hover:bg-black/40 cursor-pointer border border-white/5">
                          <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mr-5">
                            <Award size={24} className="text-primary" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-base mb-1">DeFi Applications</h4>
                            <p className="text-xs text-white/50">Intermediate • 5 Quests • 500 XP</p>
                          </div>
                          <div className="bg-white/10 w-10 h-10 rounded-full flex items-center justify-center">
                            <ArrowRight size={18} />
                          </div>
                        </div>
                        
                        <div className="bg-black/30 rounded-lg p-4 flex items-center transition-all hover:bg-black/40 cursor-pointer border border-white/5">
                          <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mr-5">
                            <Award size={24} className="text-primary" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-base mb-1">Smart Contract Development</h4>
                            <p className="text-xs text-white/50">Advanced • 7 Quests • 1000 XP</p>
                          </div>
                          <div className="bg-white/10 w-10 h-10 rounded-full flex items-center justify-center">
                            <ArrowRight size={18} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="w-[45%] pl-10 flex flex-col justify-center">
                  <div className="inline-block bg-primary/10 rounded-full px-4 py-1 text-sm text-primary mb-4 border border-primary/20">Step 2</div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">Choose Your Quests</h3>
                  <p className="text-white/70 text-base leading-relaxed">Browse through various campaigns and quests. Start with beginner-friendly options and progress to more advanced challenges as you build your skills.</p>
                </div>
              </motion.div>
              
              {/* Step 3 Box */}
              <motion.div 
                className="w-full flex"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="w-[45%] pr-10 text-right flex flex-col justify-center">
                  <div className="inline-block bg-primary/10 rounded-full px-4 py-1 text-sm text-primary mb-4 border border-primary/20">Step 3</div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">Earn Rewards</h3>
                  <p className="text-white/70 text-base leading-relaxed">Complete quests to earn XP and climb the leaderboard. Your accomplishments are recorded on-chain and visible to the community.</p>
                </div>
                
                <div className="w-[55%] pl-10">
                  {/* UI Mockup */}
                  <div className="bg-black/40 rounded-xl overflow-hidden border border-white/10 transform transition-all hover:-translate-y-1 hover:shadow-xl shadow-xl w-[85%] mx-auto">
                    <div className="h-10 bg-black/50 flex items-center px-4">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-primary/70"></div>
                        <div className="w-3 h-3 rounded-full bg-white/20"></div>
                        <div className="w-3 h-3 rounded-full bg-white/20"></div>
                      </div>
                      <div className="flex-1"></div>
                      <div className="text-xs text-white/50">Quest Completed</div>
                    </div>
                    <div className="p-8 bg-gradient-to-br from-secondary to-black/40 flex items-center justify-center">
                      <div className="bg-black/30 rounded-lg p-8 flex flex-col items-center max-w-xs mx-auto text-center">
                        <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-6 relative">
                          <div className="absolute inset-0 rounded-full border-4 border-primary animate-ping opacity-20"></div>
                          <Image src={PhotoXp} alt="XP" width={36} height={36} />
                        </div>
                        <h4 className="text-xl font-semibold mb-2">Quest Completed!</h4>
                        <p className="text-sm text-white/60 mb-5">You&apos;ve earned 100 XP for completing this quest</p>
                        <div className="w-full bg-white/10 h-4 rounded-full mb-6">
                          <div className="bg-primary h-full rounded-full w-[60%]"></div>
                        </div>
                        <div className="flex gap-4 w-full">
                          <button className="bg-white/10 hover:bg-white/15 flex-1 text-white font-medium text-sm py-3 px-4 rounded-lg transition-colors">View Quest</button>
                          <button className="bg-primary hover:bg-primary/90 text-black flex-1 font-medium text-sm py-3 px-4 rounded-lg transition-colors">Continue</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Mobile Journey - Vertical Timeline (visible only on mobile) */}
          <div className="lg:hidden">
            <div className="relative border-l-2 border-dashed border-primary/50 ml-6 pl-10 pb-6">
              {/* Step 1 */}
              <div className="mb-20 relative">
                {/* <div className="absolute -left-[44px] top-0 flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 border-2 border-primary">
                  <div className="w-8 h-8 rounded-full bg-primary text-black text-sm font-bold flex items-center justify-center">1</div>
                </div> */}
                
                <div className="inline-block bg-primary/10 rounded-full px-4 py-1 text-sm text-primary mb-3 border border-primary/20">Step 1</div>
                <h3 className="text-2xl font-bold mb-3">Connect Your Wallet</h3>
                <p className="text-base text-white/70 mb-5">Sign in with your Internet Identity to start your journey.</p>
                
                {/* Mobile UI Mockup */}
                <div className="bg-black/40 rounded-lg overflow-hidden border border-white/10 shadow-lg">
                  <div className="h-8 bg-black/50 flex items-center px-3">
                    <div className="flex space-x-1.5">
                      <div className="w-2 h-2 rounded-full bg-primary/70"></div>
                      <div className="w-2 h-2 rounded-full bg-white/20"></div>
                    </div>
                    <div className="flex-1"></div>
                  </div>
                  <div className="p-5 bg-gradient-to-br from-secondary to-black/40">
                    <div className="bg-black/30 rounded-lg p-5 flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                        <Users size={24} className="text-primary" />
                      </div>
                      <p className="text-sm font-medium mb-2 text-center">Welcome to IC Quests</p>
                      <div className="w-full bg-primary py-2.5 rounded-md text-center text-black text-sm font-medium">
                        Connect Wallet
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="mb-20 relative">
                {/* <div className="absolute -left-[44px] top-0 flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 border-2 border-primary">
                  <div className="w-8 h-8 rounded-full bg-primary text-black text-sm font-bold flex items-center justify-center">2</div>
                </div> */}
                
                <div className="inline-block bg-primary/10 rounded-full px-4 py-1 text-sm text-primary mb-3 border border-primary/20">Step 2</div>
                <h3 className="text-2xl font-bold mb-3">Choose Your Quests</h3>
                <p className="text-base text-white/70 mb-5">Browse through various campaigns and quests.</p>
                
                {/* Mobile UI Mockup */}
                <div className="bg-black/40 rounded-lg overflow-hidden border border-white/10 shadow-lg">
                  <div className="h-8 bg-black/50 flex items-center px-3">
                    <div className="flex space-x-1.5">
                      <div className="w-2 h-2 rounded-full bg-primary/70"></div>
                      <div className="w-2 h-2 rounded-full bg-white/20"></div>
                    </div>
                    <div className="flex-1"></div>
                  </div>
                  <div className="p-5 bg-gradient-to-br from-secondary to-black/40">
                    <div className="space-y-3">
                      <div className="bg-black/30 rounded-lg p-3 flex items-center">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                          <Award size={16} className="text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">IC Basics</p>
                          <p className="text-xs text-white/50">Beginner • 200 XP</p>
                        </div>
                        <div className="bg-white/10 w-7 h-7 rounded-full flex items-center justify-center">
                          <ArrowRight size={12} />
                        </div>
                      </div>
                      <div className="bg-black/30 rounded-lg p-3 flex items-center">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                          <Award size={16} className="text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">DeFi Apps</p>
                          <p className="text-xs text-white/50">Intermediate • 500 XP</p>
                        </div>
                        <div className="bg-white/10 w-7 h-7 rounded-full flex items-center justify-center">
                          <ArrowRight size={12} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="relative">
                {/* <div className="absolute -left-[44px] top-0 flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 border-2 border-primary">
                  <div className="w-8 h-8 rounded-full bg-primary text-black text-sm font-bold flex items-center justify-center">3</div>
                </div> */}
                
                <div className="inline-block bg-primary/10 rounded-full px-4 py-1 text-sm text-primary mb-3 border border-primary/20">Step 3</div>
                <h3 className="text-2xl font-bold mb-3">Earn Rewards</h3>
                <p className="text-base text-white/70 mb-5">Complete quests to earn XP and climb the leaderboard.</p>
                
                {/* Mobile UI Mockup */}
                <div className="bg-black/40 rounded-lg overflow-hidden border border-white/10 shadow-lg">
                  <div className="h-8 bg-black/50 flex items-center px-3">
                    <div className="flex space-x-1.5">
                      <div className="w-2 h-2 rounded-full bg-primary/70"></div>
                      <div className="w-2 h-2 rounded-full bg-white/20"></div>
                    </div>
                    <div className="flex-1"></div>
                  </div>
                  <div className="p-5 bg-gradient-to-br from-secondary to-black/40">
                    <div className="bg-black/30 rounded-lg p-5 flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4 relative">
                        <div className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-20"></div>
                        <Image src={PhotoXp} alt="XP" width={24} height={24} />
                      </div>
                      <p className="text-sm font-medium mb-1">Quest Completed!</p>
                      <p className="text-xs text-white/60 mb-3">+100 XP earned</p>
                      <div className="w-full bg-white/10 h-2 rounded-full mb-3">
                        <div className="bg-primary h-full rounded-full w-[60%]"></div>
                      </div>
                      <div className="w-full bg-primary py-2 rounded-md text-center text-black text-sm font-medium">
                        Continue
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-20 text-center">
            <Link 
              href="/all-quests"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 transition-colors py-3 px-8 rounded-lg text-black font-medium shadow-lg text-base"
            >
              <span>Explore Quests</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Campaigns Section */}
      <div className="py-20 relative overflow-hidden">
        {/* Pattern Background */}
        <div className="absolute inset-0 bg-black" style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.97), rgba(0,0,0,0.93)), url('/hex-pattern.svg')`,
          backgroundSize: '200px',
          backgroundPosition: 'center'
        }}></div>
        
        {/* Light beams */}
        <div className="absolute top-0 left-1/4 w-[300px] h-[300px] rounded-full bg-primary/5 blur-[100px]"></div>
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full bg-primary/5 blur-[100px]"></div>
        
        <div className="container mx-auto px-4 md:px-8 max-w-[1392px] relative z-10">
          <div className="flex justify-between items-end mb-10">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 border border-primary/20 mb-4">
                <span className="text-sm font-medium text-primary">Discover</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Campaigns</h2>
              <p className="text-lg text-white/70 max-w-2xl">
                Explore our most popular quest campaigns and start earning rewards
              </p>
            </div>
            <Link href="/" className="hidden md:flex items-center gap-1 text-primary hover:underline">
              <span>View all</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="mb-10">
            <FeaturedCampaigns />
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link href="/" className="inline-flex items-center gap-1 text-primary hover:underline">
              <span>View all campaigns</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* Community Section */}
      <div className="py-20 relative overflow-hidden">
        {/* Visual background elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#191A1F] to-[#121317]"></div>
        
        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[10%] left-[10%] w-20 h-20 rounded-full bg-primary/10 opacity-40"></div>
          <div className="absolute top-[30%] right-[20%] w-16 h-16 rounded-full bg-primary/20 opacity-30"></div>
          <div className="absolute bottom-[20%] left-[30%] w-24 h-24 rounded-full bg-primary/10 opacity-20"></div>
          <div className="absolute bottom-[10%] right-[10%] w-32 h-32 rounded-full bg-primary/10 opacity-20"></div>
          
          {/* Animated dots pattern */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `radial-gradient(circle, #95C901 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-8 max-w-[1392px] relative z-10">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 border border-primary/20 mb-4">
              <Users size={16} className="text-primary" />
              <span className="text-sm font-medium text-primary">Community</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Growing Community</h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              See what users are saying about their experience with IC Quests
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Testimonial 1 */}
            <div className="bg-black/30 p-6 rounded-xl border border-white/5 transition-all hover:border-primary/30">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Users size={18} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Alex Thompson</h4>
                  <p className="text-white/50 text-sm">Web3 Developer</p>
                </div>
              </div>
              <p className="text-white/80 text-sm">
                &quot;IC Quests helped me understand the Internet Computer ecosystem in a fun and engaging way. The hands-on experience was invaluable for my development journey.&quot;
              </p>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-black/30 p-6 rounded-xl border border-white/5 transition-all hover:border-primary/30">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Users size={18} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Maria Rodriguez</h4>
                  <p className="text-white/50 text-sm">Blockchain Enthusiast</p>
                </div>
              </div>
              <p className="text-white/80 text-sm">
                &quot;The gamified approach makes learning complex concepts so much easier. I&apos;ve earned over 5000 XP and learned tons about smart contracts along the way!&quot;
              </p>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-black/30 p-6 rounded-xl border border-white/5 transition-all hover:border-primary/30">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Users size={18} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">James Wilson</h4>
                  <p className="text-white/50 text-sm">dApp Developer</p>
                </div>
              </div>
              <p className="text-white/80 text-sm">
                &quot;IC Quests provides the perfect balance of challenge and learning. The step-by-step quests helped me build my first decentralized application from scratch.&quot;
              </p>
            </div>
          </div>
          
          {/* Integrated dApps */}
          <motion.div 
            className="mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 items-center justify-items-center">
              {isLoading ? (
                // Loading state - show skeleton placeholders
                Array(5).fill(0).map((_, i) => (
                  <div 
                    key={`skeleton-${i}`} 
                    className="bg-black/30 p-5 rounded-xl border border-white/5 h-24 w-full flex items-center justify-center"
                  >
                    <div className="w-20 h-8 bg-white/10 animate-pulse rounded"></div>
                  </div>
                ))
              ) : error ? (
                // Error state
                <div className="col-span-full text-center py-6 text-white/60">
                  <p>Failed to load partner data</p>
                </div>
              ) : partners.length > 0 ? (
                // Partners found - render the list
                partners.map((partner, index) => (
                  <div 
                    key={`partner-${partner.name}-${index}`} 
                    className="bg-black/30 p-5 rounded-xl border border-white/5 hover:border-primary/30 transition-all h-24 w-full flex items-center justify-center group"
                  >
                    <Link href={partner.url || '#'} target="_blank" rel="noopener noreferrer">
                      <Image 
                        src={partner.logo || '/placeholder-logo.svg'} 
                        alt={partner.name} 
                        width={100} 
                        height={40} 
                        className="object-contain max-h-12 filter grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" 
                      />
                    </Link>
                  </div>
                ))
              ) : (
                // Fallback to default partner logos when no data available
                <>
                  {/* NFID */}
                  <div className="bg-black/30 p-5 rounded-xl border border-white/5 hover:border-primary/30 transition-all h-24 w-full flex items-center justify-center group">
                    <Image 
                      src="/dapps/nfid.svg" 
                      alt="NFID" 
                      width={100} 
                      height={40} 
                      className="object-contain max-h-12 filter grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" 
                    />
                  </div>
                  
                  {/* ICPTopUp */}
                  <div className="bg-black/30 p-5 rounded-xl border border-white/5 hover:border-primary/30 transition-all h-24 w-full flex items-center justify-center group">
                    <Image 
                      src="/dapps/icptopup.svg" 
                      alt="ICP TopUp" 
                      width={100} 
                      height={40} 
                      className="object-contain max-h-12 filter grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" 
                    />
                  </div>
                  
                  {/* Odin */}
                  <div className="bg-black/30 p-5 rounded-xl border border-white/5 hover:border-primary/30 transition-all h-24 w-full flex items-center justify-center group">
                    <Image 
                      src="/dapps/odin-logo.svg" 
                      alt="Odin" 
                      width={100} 
                      height={40} 
                      className="object-contain max-h-12 filter grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" 
                    />
                  </div>
                  
                  {/* Sonic */}
                  <div className="bg-black/30 p-5 rounded-xl border border-white/5 hover:border-primary/30 transition-all h-24 w-full flex items-center justify-center group">
                    <Image 
                      src="/dapps/sonic-logo.jpg" 
                      alt="Sonic" 
                      width={100} 
                      height={40} 
                      className="object-contain max-h-12 filter grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" 
                    />
                  </div>
                  
                  {/* Kong */}
                  <div className="bg-black/30 p-5 rounded-xl border border-white/5 hover:border-primary/30 transition-all h-24 w-full flex items-center justify-center group">
                    <Image 
                      src="/dapps/kong-logo.jpg" 
                      alt="Kong" 
                      width={100} 
                      height={40} 
                      className="object-contain max-h-12 filter grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" 
                    />
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-black" style={{
          backgroundImage: `radial-gradient(circle at 30% 50%, rgba(149, 201, 1, 0.08), transparent 30%), 
                           radial-gradient(circle at 70% 50%, rgba(149, 201, 1, 0.08), transparent 30%)`,
        }}></div>
        
        <div className="container mx-auto px-4 md:px-8 max-w-[1392px] relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {/* User CTA - Left Column */}
            <motion.div 
              className="bg-gradient-to-r from-secondary/80 to-secondary rounded-2xl p-8 md:p-10 border border-white/5 relative overflow-hidden"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {/* Animated glow elements */}
              <motion.div 
                className="absolute top-0 right-0 w-[200px] h-[200px] bg-primary/10 rounded-full blur-[100px] opacity-70"
                animate={{ 
                  opacity: [0.5, 0.8, 0.5],
                  scale: [0.8, 1.1, 0.8],
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity,
                  repeatType: "reverse" 
                }}
              ></motion.div>
              
              {/* Diagonal pattern */}
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: `repeating-linear-gradient(45deg, #95C901, #95C901 1px, transparent 1px, transparent 10px)`,
              }}></div>
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 border border-primary/20 mb-6">
                  <Award size={16} className="text-primary" />
                  <span className="text-sm font-medium text-primary">For Questers</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Your Quest?</h2>
                <p className="text-base md:text-lg text-white/70 mb-6">
                  Join thousands of users learning about the Internet Computer and earning rewards through interactive quests.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="/all-quests"
                    className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 transition-colors py-3 px-6 rounded-lg text-black font-medium shadow-lg"
                  >
                    <span>Start Questing</span>
                    <ArrowRight size={18} />
                  </Link>
                  
                </div>
              </div>
            </motion.div>

            {/* Developer CTA - Right Column */}
            <motion.div 
              className="bg-gradient-to-r from-secondary/80 to-secondary rounded-2xl p-8 md:p-10 border border-white/5 relative overflow-hidden"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {/* Animated glow elements */}
              <motion.div 
                className="absolute top-0 right-0 w-[200px] h-[200px] bg-primary/10 rounded-full blur-[100px] opacity-70"
                animate={{ 
                  opacity: [0.5, 0.8, 0.5],
                  scale: [0.8, 1.1, 0.8],
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity,
                  repeatType: "reverse" 
                }}
              ></motion.div>
              
              {/* Diagonal pattern */}
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: `repeating-linear-gradient(45deg, #95C901, #95C901 1px, transparent 1px, transparent 10px)`,
              }}></div>
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 border border-primary/20 mb-6">
                  <Users size={16} className="text-primary" />
                  <span className="text-sm font-medium text-primary">For Developers</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Want to List Your dApp?</h2>
                <p className="text-base md:text-lg text-white/70 mb-6">
                  Partner with IC Quests to showcase your application to our engaged community. 
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="#"
                    className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 transition-colors py-3 px-6 rounded-lg text-black font-medium shadow-lg"
                  >
                    <span>Integration docs</span>
                    <ArrowRight size={18} />
                  </Link>
                  
                  <Link 
                    href="#"
                    className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 transition-colors py-3 px-6 rounded-lg text-white font-medium shadow-lg"
                  >
                    <span>Contact Us</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
} 