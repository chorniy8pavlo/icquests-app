import { Actor, ActorMethod, HttpAgent, Identity } from '@dfinity/agent';
import { IDL } from '@dfinity/candid';
import { Ed25519KeyIdentity } from '@dfinity/identity';

export const getIdentity = (seed: string): Ed25519KeyIdentity => {
  const seedEncoded = new TextEncoder().encode(seed);
  return Ed25519KeyIdentity.generate(seedEncoded);
};

export const getActor = async (
  canisterId: string,
  identity: Identity,
  idl: IDL.InterfaceFactory
): Promise<Record<string, ActorMethod>> => {
  const agent: HttpAgent = new HttpAgent({
    host: 'https://ic0.app',
    identity: identity,
  });
  await agent.fetchRootKey();
  return Actor.createActor(idl, { agent, canisterId: canisterId });
};
