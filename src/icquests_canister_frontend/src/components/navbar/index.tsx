'use client';

import { useState } from 'react';
import Image from 'next/image';
import Logo from '../../assets/svgs/logo.svg';
import Link from 'next/link';
import { ConnectWalletButton } from '../connect-wallet-button';
import { usePathname } from 'next/navigation';
import { useAuth } from '@nfid/identitykit/react';
import PhotoXp from '../../assets/svgs/photo-xp.svg';
import useSWR from 'swr';
import { userConnector } from '@/integration/connectors/user';

export default function Navbar() {
  const currentPath = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const { user } = useAuth();
  const { data } = useSWR(
    user ? [user?.principal.toString(), 'user'] : null,
    ([id]) => userConnector.getUser(id)
  );

  return (
    <div className="bg-secondary text-white sticky top-0 z-50">
      <div className="flex items-center justify-between font-sans leading-[21px] py-[14px] px-3 max-w-[1392px] mx-auto">
        <div className="flex items-center gap-[19px] font-medium">
          <Link href="/">
            <Image src={Logo} alt="Logo" />
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link
              href="/"
              className={`${
                currentPath === '/' || currentPath.startsWith('/campaign/')
                  ? 'text-primary'
                  : 'hover:underline'
              }`}
            >
              All Campaigns
            </Link>
            <Link
              href="/all-quests"
              className={`${
                currentPath === '/all-quests'
                  ? 'text-primary'
                  : 'hover:underline'
              }`}
            >
              All Quests
            </Link>
            <Link
              href="/leaderboard"
              className={`${
                currentPath === '/leaderboard'
                  ? 'text-primary'
                  : 'hover:underline'
              }`}
            >
              Leaderboard
            </Link>
            <Link
              href="/landing"
              className={`${
                currentPath === '/landing'
                  ? 'text-primary'
                  : 'hover:underline'
              }`}
            >
              Landing Page
            </Link>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-[30px]">
          {typeof data !== 'undefined' && (
            <div className="flex items-center gap-1">
              <Image src={PhotoXp} alt="XP icon" width={16} height={16} />
              <p>{data?.xpBalance}</p>
            </div>
          )}
          <ConnectWalletButton />
        </div>
        <div className="flex md:hidden gap-3">
          <ConnectWalletButton />
          <button onClick={toggleMenu} className=" text-2xl">
            ☰
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-secondary px-4 py-3 text-sm space-y-4">
          <Link
            href="/"
            className={`${
              currentPath === '/' || currentPath.startsWith('/campaign/')
                ? 'text-primary'
                : 'hover:underline'
            }`}
          >
            All Campaigns
          </Link>
          <Link
            href="/all-quests"
            className={`${
              currentPath === '/all-quests' ? 'text-primary' : 'hover:underline'
            }`}
          >
            All Quests
          </Link>
          <Link
            href="/leaderboard"
            className={`${
              currentPath === '/leaderboard'
                ? 'text-primary'
                : 'hover:underline'
            }`}
          >
            Leaderboard
          </Link>
          <Link
            href="/landing"
            className={`${
              currentPath === '/landing'
                ? 'text-primary'
                : 'hover:underline'
            }`}
          >
            Landing Page
          </Link>
          <ConnectWalletButton />
        </div>
      )}
    </div>
  );
}
