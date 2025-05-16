import TrieMap "mo:base/TrieMap";
import Nat "mo:base/Nat";
import Hash "mo:base/Hash";
import Text "mo:base/Text";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";
import Array "mo:base/Array";
import Bool "mo:base/Bool";
import Float "mo:base/Float";
import Utils "utils";
import Error "mo:base/Error";

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
  stable var adminsStore : [Text] = [];

  var campaigns : TrieMap.TrieMap<Nat, Campaign> = TrieMap.TrieMap<Nat, Campaign>(Nat.equal, Hash.hash);
  var quests : TrieMap.TrieMap<Nat, Quest> = TrieMap.TrieMap<Nat, Quest>(Nat.equal, Hash.hash);
  var users : TrieMap.TrieMap<Text, UserData> = TrieMap.TrieMap<Text, UserData>(Text.equal, Text.hash);
  var admins : [Text] = [];

  system func preupgrade() {
    campaignsStore := Iter.toArray(campaigns.entries());
    questsStore := Iter.toArray(quests.entries());
    usersStore := Iter.toArray(users.entries());
    adminsStore := admins;
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

    admins := adminsStore;
  };

  /**
   * ==========================================
   *               Admin Section
   * ==========================================
   */

  // Check if a principal is an admin
  private func isAdmin(caller : Principal) : Bool {
    let callerText = Principal.toText(caller);
    return Array.find<Text>(admins, func x = x == callerText) != null;
  };

  // Initialize the first admin - only callable during deployment
  public shared (msg) func initializeAdmin() : async Text {
    if (admins.size() > 0) {
      return "Admin already initialized";
    };

    admins := Array.append<Text>(admins, [Principal.toText(msg.caller)]);
    return "Admin initialized successfully";
  };

  // Add a new admin - only callable by existing admins
  public shared (msg) func addAdmin(newAdmin : Text) : async Text {
    if (not isAdmin(msg.caller)) {
      throw Error.reject("Unauthorized: Only admins can add new admins");
    };

    if (Array.find<Text>(admins, func x = x == newAdmin) != null) {
      return "Principal is already an admin";
    };

    admins := Array.append<Text>(admins, [newAdmin]);
    return "Admin added successfully";
  };

  // Remove an admin - only callable by existing admins
  public shared (msg) func removeAdmin(adminToRemove : Text) : async Text {
    if (not isAdmin(msg.caller)) {
      throw Error.reject("Unauthorized: Only admins can remove admins");
    };

    // Cannot remove the last admin
    if (admins.size() <= 1) {
      return "Cannot remove the last admin";
    };

    admins := Array.filter<Text>(admins, func x = x != adminToRemove);
    return "Admin removed successfully";
  };

  // Get all admins - only callable by existing admins
  public shared (msg) func getAllAdmins() : async [Text] {
    if (not isAdmin(msg.caller)) {
      throw Error.reject("Unauthorized: Only admins can view all admins");
    };

    return admins;
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

  public shared (msg) func addCampaign(campaign : Campaign) : async Text {
    if (not isAdmin(msg.caller)) {
      throw Error.reject("Unauthorized: Only admins can add campaigns");
    };

    if (campaigns.get(campaign.id) != null) {
      return "Campaign with this ID already exists.";
    };
    campaigns.put(campaign.id, campaign);
    return "Campaign added successfully.";
  };

  public shared (msg) func updateCampaign(campaign : Campaign) : async Text {
    if (not isAdmin(msg.caller)) {
      throw Error.reject("Unauthorized: Only admins can update campaigns");
    };

    if (campaigns.get(campaign.id) == null) {
      return "Campaign not found.";
    };
    campaigns.put(campaign.id, campaign);
    return "Campaign updated successfully.";
  };

  public shared (msg) func deleteCampaign(id : Nat) : async Text {
    if (not isAdmin(msg.caller)) {
      throw Error.reject("Unauthorized: Only admins can delete campaigns");
    };

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

  public shared (msg) func addQuest(quest : Quest) : async Text {
    if (not isAdmin(msg.caller)) {
      throw Error.reject("Unauthorized: Only admins can add quests");
    };

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

  public shared (msg) func updateQuest(quest : Quest) : async Text {
    if (not isAdmin(msg.caller)) {
      throw Error.reject("Unauthorized: Only admins can update quests");
    };

    if (quests.get(quest.id) == null) {
      return "Quest not found.";
    };
    quests.put(quest.id, quest);
    return "Quest updated successfully.";
  };

  public shared (msg) func deleteQuest(id : Nat) : async Text {
    if (not isAdmin(msg.caller)) {
      throw Error.reject("Unauthorized: Only admins can delete quests");
    };

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

  // Fetches the XP rate (XP per completed quest) for a given user
  public func fetchXPRate(principal : Text) : async Nat {
    let userOption = users.get(principal);

    switch (userOption) {
      case (?user) {
        if (Array.size(user.completedQuests) == 0) {
          return 0;
        };

        // Calculate average XP per completed quest
        return user.xpBalance / Array.size(user.completedQuests);
      };
      case null {
        return 0;
      };
    };
  };

  // Gets the user's position on the leaderboard (sorted by XP balance)
  public func fetchLeaderboardPosition(principal : Text) : async ?Nat {
    let allUsers = Iter.toArray(users.vals());

    // Sort users by XP balance in descending order
    let sortedUsers = Array.sort<UserData>(
      allUsers,
      func(a, b) {
        if (a.xpBalance > b.xpBalance) {
          return #less;
        } else if (a.xpBalance < b.xpBalance) {
          return #greater;
        } else {
          return #equal;
        };
      },
    );

    // Find the position of the specified user
    var position : Nat = 0;
    for (user in sortedUsers.vals()) {
      position += 1;
      if (user.principal == principal) {
        return ?position;
      };
    };

    return null; // User not found
  };
};
