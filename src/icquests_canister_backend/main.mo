import TrieMap "mo:base/TrieMap";
import Nat "mo:base/Nat";
import Hash "mo:base/Hash";
import Text "mo:base/Text";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";
import Array "mo:base/Array";
import Bool "mo:base/Bool";
import Utils "utils";

import QuestNFIDVaults "./quest-nfidvaults";
import QuestPacapump "./quest-pacapump";
import QuestKongswap "./quest-kongswap";
import QuestSonic "./quest-sonic";
import QuestICPTopup "./quest-icptopup";

actor {
  /**
   * ==========================================
   *                Types Section
   * ==========================================
   */
  type Quest = {
    id : Nat;
    title : Text;
    subtitle : Text;
    description : Text;
    rewardXp : Nat;
    campaignId : Nat;
    tags : [Text];
    estimatedTime : Text;
    difficulty : Nat;
    prerequisites : Text;
  };

  type Campaign = {
    id : Nat;
    title : Text;
    image : Text;
    description : Text;
    logo : Text;
    isActive : Bool;
    partnerUrl : Text;
    category : Text;
  };

  type UserData = {
    principal : Text;
    xpBalance : Nat;
    completedQuests : [Nat];
  };

  /**
   * ==========================================
   *                State Section
   * ==========================================
   */
  stable var campaignsStore : [(Nat, Campaign)] = [];
  stable var questsStore : [(Nat, Quest)] = [];
  stable var usersStore : [(Text, UserData)] = [];

  var campaigns : TrieMap.TrieMap<Nat, Campaign> = TrieMap.TrieMap<Nat, Campaign>(Nat.equal, Hash.hash);
  var quests : TrieMap.TrieMap<Nat, Quest> = TrieMap.TrieMap<Nat, Quest>(Nat.equal, Hash.hash);
  var users : TrieMap.TrieMap<Text, UserData> = TrieMap.TrieMap<Text, UserData>(Text.equal, Text.hash);

  system func preupgrade() {
    campaignsStore := Iter.toArray(campaigns.entries());
    questsStore := Iter.toArray(quests.entries());
    usersStore := Iter.toArray(users.entries());
  };

  system func postupgrade() {
    campaigns := TrieMap.TrieMap<Nat, Campaign>(Nat.equal, Hash.hash);
    for (entry in campaignsStore.vals()) {
      campaigns.put(entry.0, entry.1);
    };

    quests := TrieMap.TrieMap<Nat, Quest>(Nat.equal, Hash.hash);
    for (entry in questsStore.vals()) {
      quests.put(entry.0, entry.1);
    };

    users := TrieMap.TrieMap<Text, UserData>(Text.equal, Text.hash);
    for (entry in usersStore.vals()) {
      users.put(entry.0, entry.1);
    };

  };

  /**
   * ==========================================
   *                Campaign Section
   * ==========================================
   */
  public query func getAllCampaigns() : async [Campaign] {
    return Iter.toArray(campaigns.vals());
  };

  public query func getCampaign(id : Nat) : async ?Campaign {
    return campaigns.get(id);
  };

  public func addCampaign(campaign : Campaign) : async Text {
    if (campaigns.get(campaign.id) != null) {
      return "Campaign with this ID already exists.";
    };
    campaigns.put(campaign.id, campaign);
    return "Campaign added successfully.";
  };

  public func updateCampaign(campaign : Campaign) : async Text {
    if (campaigns.get(campaign.id) == null) {
      return "Campaign not found.";
    };
    campaigns.put(campaign.id, campaign);
    return "Campaign updated successfully.";
  };

  public func deleteCampaign(id : Nat) : async Text {
    if (campaigns.get(id) == null) {
      return "Campaign not found.";
    };
    campaigns.delete(id);
    return "Campaign deleted successfully.";
  };

  /**
   * ==========================================
   *                Quests Section
   * ==========================================
   */
  public query func getAllQuests() : async [Quest] {
    return Iter.toArray(quests.vals());
  };

  public query func getQuest(id : Nat) : async ?Quest {
    return quests.get(id);
  };

  public func addQuest(quest : Quest) : async Text {
    if (quests.get(quest.id) != null) {
      return "Quest with this ID already exists.";
    };

    let newQuest = {
      id = quest.id;
      title = quest.title;
      subtitle = quest.subtitle;
      description = quest.description;
      rewardXp = quest.rewardXp;
      campaignId = quest.campaignId;
      tags = quest.tags;
      estimatedTime = quest.estimatedTime;
      difficulty = quest.difficulty;
      prerequisites = quest.prerequisites;
    };

    quests.put(quest.id, newQuest);
    return "Quest added successfully.";
  };

  public func updateQuest(quest : Quest) : async Text {
    if (quests.get(quest.id) == null) {
      return "Quest not found.";
    };
    quests.put(quest.id, quest);
    return "Quest updated successfully.";
  };

  public func deleteQuest(id : Nat) : async Text {
    if (quests.get(id) == null) {
      return "Quest not found.";
    };
    quests.delete(id);
    return "Quest deleted successfully.";
  };

  /**
   * ==========================================
   *                Users Section
   * ==========================================
   */
  public func getUser(principal : Text) : async ?UserData {
    let existingUser = users.get(principal);
    switch (existingUser) {
      case (?user) {
        return ?user;
      };
      case null {
        let newUser = {
          principal = principal;
          xpBalance = 0;
          completedQuests = [];
        };

        users.put(principal, newUser);

        return ?newUser;
      };
    };
    return users.get(principal);
  };

  public query func getAllUsers() : async [UserData] {
    return Iter.toArray(users.vals());
  };

  public func getUserBalance(principal : Text) : async Nat {
    let existingUser = users.get(principal);
    switch (existingUser) {
      case (?user) {
        return user.xpBalance;
      };
      case null {
        let newUser = {
          principal = principal;
          xpBalance = 0;
          completedQuests = [];
        };

        users.put(principal, newUser);

        return 0;
      };
    };
  };

  public shared (message) func verify(questId : Nat) : async Text {
    let userPrincipal = message.caller;
    let userOption = await getUser(Principal.toText(userPrincipal));

    switch (userOption) {
      case (?user) {
        let completedUserQuests = user.completedQuests;
        let questCompletedByUser = Array.find<Nat>(completedUserQuests, func x = x == questId);

        switch (questCompletedByUser) {
          case (?_) {
            return "QUEST_ALREADY_COMPLETED";
          };
          case null {
            let isVerified = switch (questId) {
              case (1) {
                await QuestNFIDVaults.verify(userPrincipal);
              };
              case (2) {
                await QuestKongswap.verify(userPrincipal);
              };
              case (3) {
                await QuestPacapump.verify(userPrincipal);
              };
              case (4) {
                await QuestSonic.verify(userPrincipal);
              };
              case (5) {
                await QuestICPTopup.verify(userPrincipal);
              };
              case (_) {
                // For any other quest IDs, verification fails
                false;
              };
            };

            switch (isVerified) {
              case true {
                switch (quests.get(questId)) {
                  case (?quest) {
                    let updatedQuest = {
                      id = quest.id;
                      title = quest.title;
                      subtitle = quest.subtitle;
                      description = quest.description;
                      rewardXp = quest.rewardXp;
                      campaignId = quest.campaignId;
                      tags = quest.tags;
                      estimatedTime = quest.estimatedTime;
                      difficulty = quest.difficulty;
                      prerequisites = quest.prerequisites;
                    };
                    quests.put(questId, updatedQuest);

                    let updatedUser = {
                      principal = user.principal;
                      xpBalance = user.xpBalance + quest.rewardXp;
                      completedQuests = Array.append<Nat>(user.completedQuests, [questId]);
                    };
                    users.put(user.principal, updatedUser);
                  };
                  case null {
                    // Quest not found, no action needed
                  };
                };

                return "QUEST_COMPLETED";
              };
              case false {
                return "QUEST_NOT_VERIFIED";
              };
            };
          };
        };
      };
      case null {
        return "USER_NOT_FOUND";
      };
    };
  };

  public query func get_supported_standards() : async [Utils.SupportedStandard] {
    return Utils.icrc10_supported_standards();
  };

  public func get_trusted_origins() : async Utils.Icrc28TrustedOriginsResponse {
    return Utils.icrc28_trusted_origins();
  };

  public func icrc28_trusted_origins() : async Utils.Icrc28TrustedOriginsResponse {
    return Utils.icrc28_trusted_origins();
  };
};
