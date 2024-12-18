// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
export const idlFactory = ({ IDL }) => {
  const Campaign = IDL.Record({
    id: IDL.Nat,
    title: IDL.Text,
    logo: IDL.Text,
    createdDate: IDL.Nat,
    description: IDL.Text,
    isActive: IDL.Bool,
    image: IDL.Text,
  });
  const Quest = IDL.Record({
    id: IDL.Nat,
    title: IDL.Text,
    campaignId: IDL.Nat,
    description: IDL.Text,
    rewardXp: IDL.Nat,
    subtitle: IDL.Text,
  });
  const UserData = IDL.Record({
    principal: IDL.Text,
    completedQuests: IDL.Vec(IDL.Nat),
    xpBalance: IDL.Nat,
  });
  return IDL.Service({
    addCampaign: IDL.Func([Campaign], [IDL.Text], []),
    addQuest: IDL.Func([Quest], [IDL.Text], []),
    deleteCampaign: IDL.Func([IDL.Nat], [IDL.Text], []),
    deleteQuest: IDL.Func([IDL.Nat], [IDL.Text], []),
    getAllCampaigns: IDL.Func([], [IDL.Vec(Campaign)], ['query']),
    getAllQuests: IDL.Func([], [IDL.Vec(Quest)], ['query']),
    getAllUsers: IDL.Func([], [IDL.Vec(UserData)], ['query']),
    getCampaign: IDL.Func([IDL.Nat], [IDL.Opt(Campaign)], ['query']),
    getQuest: IDL.Func([IDL.Nat], [IDL.Opt(Quest)], ['query']),
    getUser: IDL.Func([IDL.Text], [IDL.Opt(UserData)], []),
    getUserBalance: IDL.Func([IDL.Text], [IDL.Nat], []),
    updateCampaign: IDL.Func([Campaign], [IDL.Text], []),
    verify: IDL.Func([IDL.Nat], [IDL.Text], []),
  });
};
export const init = () => {
  return [];
};
