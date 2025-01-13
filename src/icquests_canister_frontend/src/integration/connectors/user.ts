import { getActor } from '@/utils/ic';
import { AnonymousIdentity } from '@dfinity/agent';
import { idlFactory } from '../idl';
import { IUser } from '@/types';

export class UserConnector {
  async getUser(principal: string): Promise<IUser> {
    const actor = await getActor(
      'lyo6x-saaaa-aaaao-qjwlq-cai',
      new AnonymousIdentity(),
      idlFactory
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = (await actor.getUser(principal)) as IUser[];

    return result[0];
  }

  async getAllUsers(): Promise<IUser[]> {
    const actor = await getActor(
      'lyo6x-saaaa-aaaao-qjwlq-cai',
      new AnonymousIdentity(),
      idlFactory
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = (await actor.getAllUsers()) as IUser[];
    console.log({result})
    return result.sort((a, b) => Number(b.xpBalance) - Number(a.xpBalance));
  }
}

export const userConnector = new UserConnector();
