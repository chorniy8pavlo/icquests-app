'use client';

import { ConnectWallet } from '@nfid/identitykit/react';
import React from 'react';

export const ConnectWalletButton = () => {
  return (
    <ConnectWallet
      connectButtonComponent={(cmp) => (
        <button
          className={`bg-primary rounded-xl h-[36px] w-[168px] text-sm font-extrabold hover:underline text-white`}
          onClick={cmp.onClick}
          type="button"
        >
          Connect Wallet
        </button>
      )}
    />
  );
};
