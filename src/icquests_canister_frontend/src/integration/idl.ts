// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
export const idlFactory = ({ IDL }) => {
  const Campaign = IDL.Record({
    'id' : IDL.Nat,
    'title' : IDL.Text,
    'logo' : IDL.Text,
    'description' : IDL.Text,
    'isActive' : IDL.Bool,
    'category' : IDL.Text,
    'image' : IDL.Text,
    'partnerUrl' : IDL.Text,
  });
  const Quest = IDL.Record({
    'id' : IDL.Nat,
    'title' : IDL.Text,
    'prerequisites' : IDL.Text,
    'difficulty' : IDL.Nat,
    'tags' : IDL.Vec(IDL.Text),
    'campaignId' : IDL.Nat,
    'description' : IDL.Text,
    'rewardXp' : IDL.Nat,
    'estimatedTime' : IDL.Text,
    'subtitle' : IDL.Text,
  });
  const UserData = IDL.Record({
    'principal' : IDL.Text,
    'completedQuests' : IDL.Vec(IDL.Nat),
    'xpBalance' : IDL.Nat,
  });
  const SupportedStandard = IDL.Record({ 'url' : IDL.Text, 'name' : IDL.Text });
  const Icrc28TrustedOriginsResponse = IDL.Record({
    'trusted_origins' : IDL.Vec(IDL.Text),
  });
  return IDL.Service({
    'addCampaign' : IDL.Func([Campaign], [IDL.Text], []),
    'addQuest' : IDL.Func([Quest], [IDL.Text], []),
    'deleteCampaign' : IDL.Func([IDL.Nat], [IDL.Text], []),
    'deleteQuest' : IDL.Func([IDL.Nat], [IDL.Text], []),
    'getAllCampaigns' : IDL.Func([], [IDL.Vec(Campaign)], ['query']),
    'getAllQuests' : IDL.Func([], [IDL.Vec(Quest)], ['query']),
    'getAllUsers' : IDL.Func([], [IDL.Vec(UserData)], ['query']),
    'getCampaign' : IDL.Func([IDL.Nat], [IDL.Opt(Campaign)], ['query']),
    'getQuest' : IDL.Func([IDL.Nat], [IDL.Opt(Quest)], ['query']),
    'getUser' : IDL.Func([IDL.Text], [IDL.Opt(UserData)], []),
    'getUserBalance' : IDL.Func([IDL.Text], [IDL.Nat], []),
    'get_supported_standards' : IDL.Func(
        [],
        [IDL.Vec(SupportedStandard)],
        ['query'],
      ),
    'get_trusted_origins' : IDL.Func([], [Icrc28TrustedOriginsResponse], []),
    'icrc28_trusted_origins' : IDL.Func([], [Icrc28TrustedOriginsResponse], []),
    'updateCampaign' : IDL.Func([Campaign], [IDL.Text], []),
    'updateQuest' : IDL.Func([Quest], [IDL.Text], []),
    'verify' : IDL.Func([IDL.Nat], [IDL.Text], []),
  });
};
export const init = () => { return []; };
