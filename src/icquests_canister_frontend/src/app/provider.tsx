'use client';

import { IdentityKitProvider } from '@nfid/identitykit/react';
import { ReactNode } from 'react';
import '@nfid/identitykit/react/styles.css';
import { IdentityKitAuthType, NFIDW } from '@nfid/identitykit';
import { NextUIProvider } from '@nextui-org/react';

interface ProviderProps {
  children: ReactNode;
}

const Provider = ({ children }: ProviderProps) => {
  console.log({ NFIDW });
  return (
    <IdentityKitProvider
      signers={[
        NFIDW
      ]}
      onConnectFailure={() => {}}
      onConnectSuccess={() => {}}
      onDisconnect={() => {}}
      authType={IdentityKitAuthType.DELEGATION}
      signerClientOptions={{
        targets: ['lyo6x-saaaa-aaaao-qjwlq-cai'],
        derivationOrigin: 'https://kjeai-kiaaa-aaaao-qjwoa-cai.raw.icp0.io',
      }}
    >
      <NextUIProvider>{children}</NextUIProvider>
    </IdentityKitProvider>
  );
};

export default Provider;
