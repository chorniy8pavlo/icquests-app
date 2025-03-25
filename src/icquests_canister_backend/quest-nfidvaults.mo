import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Debug "mo:base/Debug";
import Error "mo:base/Error";

module {
    /**
     * ==========================================
     *                Types
     * ==========================================
     */
    public type VaultType = {
        #Pro;
        #Light;
    };

    public type Conf = {
        destination_address : Text;
        initial_cycles_balance : Nat;
        origins : [Text];
        repo_canister_id : Text;
        icp_price : Nat64;
    };

    public type CreateResult = {
        canister_id : Principal;
    };

    public type Result = {
        #Ok : CreateResult;
        #Err : Text;
    };

    public type VaultCanister = {
        initiator : Principal;
        canister_id : Principal;
        block_number : Nat64;
        vault_type : VaultType;
    };

    public type Result_1 = {
        #Ok : Null;
        #Err : Text;
    };

    /**
     * ==========================================
     *        External Canister Interface
     * ==========================================
     */
    public type NFIDVaultsActor = actor {
        canister_balance : query () -> async Nat64;
        create_canister_call : (Nat64, ?VaultType) -> async Result;
        get_all_canisters : query () -> async [VaultCanister];
        get_config : query () -> async Conf;
        get_trusted_origins_certified : query () -> async {
            certificate : [Nat8];
            witness : [Nat8];
            response : [Text];
        };
        update_canister_self : (Text) -> async Result_1;
    };

    /**
     * ==========================================
     *        Quest Verification Function
     * ==========================================
     */
    public func verify(caller : Principal) : async Bool {
        let externalCanister = actor ("4bgdx-hqaaa-aaaar-qaeqq-cai") : NFIDVaultsActor;
        let userPrincipal = Principal.toText(caller);

        try {
            let canisters = await externalCanister.get_all_canisters();
            for (vault in canisters.vals()) {
                // example we received array of vaults ids.
                let initiatorText = Principal.toText(vault.initiator);

                if (initiatorText == userPrincipal) {
                    // we map and check if user id is in array
                    return true;
                };
            };
            return false;
        } catch (e) {
            Debug.print(Error.message(e));
            return false;
        };
    };

};
