'use client';

import Image from 'next/image';
import Link from 'next/link';
import Logo from '../../assets/svgs/logo.svg';

export default function Footer() {
  return (
    <footer className="py-10 bg-secondary border-t border-white/5">
      <div className="container mx-auto px-4 md:px-8 max-w-[1392px]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Logo and description - 4 columns */}
          <div className="md:col-span-4">
            <Image src={Logo} alt="IC Quests Logo" className="mb-4" />
            <p className="text-sm text-white/60 mb-6">
              The ultimate platform for learning about Internet Computer through interactive quests and rewards.
            </p>
            
            {/* Social Media Links */}
            <div className="flex gap-4 mb-6">
              <a href="https://twitter.com/icquests" target="_blank" rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-primary/20 flex items-center justify-center transition-colors border border-white/10 hover:border-primary/30">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/70 hover:text-primary">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a href="https://t.me/icquests" target="_blank" rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-primary/20 flex items-center justify-center transition-colors border border-white/10 hover:border-primary/30">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/70 hover:text-primary">
                  <path d="M21.5 7.5C22 14 17 18.5 9.5 18.5C6.5 18.5 3.5 17.5 2 16L7.5 16C10 16 11.5 14 11.5 14C11.5 14 9 12 6.5 13.5C4 15 2.5 13.5 2 9.5L3.5 10.5C1.5 2.5 10 0.5 10 0.5C8.5 3 9 4.5 9 4.5C9 4.5 12 2.5 15 3.5C18 4.5 21.5 7.5 21.5 7.5Z"></path>
                </svg>
              </a>
              <a href="https://discord.gg/icquests" target="_blank" rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-primary/20 flex items-center justify-center transition-colors border border-white/10 hover:border-primary/30">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/70 hover:text-primary">
                  <path d="M9 8l3 8l3-8"></path>
                  <path d="M12 8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1z"></path>
                  <circle cx="12" cy="16" r=".5"></circle>
                  <path d="M19 2H5a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm-9 16.5a.5 .5 0 1 1 .5 -.5a.5 .5 0 0 1-.5 .5zm1-6.5a1 1 0 0 1-1 1a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1a1 1 0 0 1 1 1v2zm3-1.9l-3 8l-3-8l1.1-.4l1.9 5.2l1.9-5.2l1.1 .4z"></path>
                </svg>
              </a>
              <a href="https://github.com/icquests" target="_blank" rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-primary/20 flex items-center justify-center transition-colors border border-white/10 hover:border-primary/30">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/70 hover:text-primary">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Quick Links - 2 columns */}
          <div className="md:col-span-2">
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-white/60 hover:text-primary">Home</Link></li>
              <li><Link href="/all-quests" className="text-sm text-white/60 hover:text-primary">All Quests</Link></li>
              <li><Link href="/leaderboard" className="text-sm text-white/60 hover:text-primary">Leaderboard</Link></li>
            </ul>
          </div>
          
          {/* Resources - 2 columns */}
          <div className="md:col-span-2">
            <h4 className="font-semibold text-lg mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-white/60 hover:text-primary">Documentation</Link></li>
              <li><Link href="#" className="text-sm text-white/60 hover:text-primary">API</Link></li>
              <li><Link href="#" className="text-sm text-white/60 hover:text-primary">Support</Link></li>
            </ul>
          </div>
          
          {/* Newsletter - 4 columns */}
          <div className="md:col-span-4">
            <h4 className="font-semibold text-lg mb-4">Stay Updated</h4>
            <p className="text-sm text-white/60 mb-4">
              Subscribe to our newsletter for the latest updates on quests, rewards, and Internet Computer news.
            </p>
            
            <form className="flex flex-col space-y-3">
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full bg-black/20 border border-white/10 rounded-lg py-3 px-4 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent"
                  required
                />
              </div>
              <button 
                type="submit" 
                className="bg-primary hover:bg-primary/90 text-black font-medium py-3 px-4 rounded-lg text-sm transition-colors flex items-center justify-center"
              >
                Subscribe
              </button>
            </form>
            
            <p className="text-xs text-white/40 mt-3">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from IC Quests.
            </p>
          </div>
        </div>
        
        <div className="border-t border-white/5 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-white/40">© 2024-{new Date().getFullYear()} ICQuests. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="text-sm text-white/40 hover:text-primary">Privacy Policy</Link>
            <Link href="#" className="text-sm text-white/40 hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 