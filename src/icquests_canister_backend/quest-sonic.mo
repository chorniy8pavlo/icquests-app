import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Debug "mo:base/Debug";
import Error "mo:base/Error";

// This is a generated Motoko binding.
// Please use `import service "ic:canister_id"` instead to call canisters on the IC if possible.

module {
    public type DetailValue = {
        #I64 : Int64;
        #U64 : Nat64;
        #Vec : [DetailValue];
        #Slice : Blob;
        #TokenIdU64 : Nat64;
        #Text : Text;
        #True;
        #False;
        #Float : Float;
        #Principal : Principal;
    };
    public type Event = {
        time : Nat64;
        operation : Text;
        details : [(Text, DetailValue)];
        caller : Principal;
    };
    public type GetBucketResponse = { witness : ?Witness; canister : Principal };
    public type GetNextCanistersResponse = {
        witness : ?Witness;
        canisters : [Principal];
    };
    public type GetTokenTransactionsArg = {
        token_id : Nat64;
        page : ?Nat32;
        witness : Bool;
    };
    public type GetTransactionResponse = {
        #Delegate : (Principal, ?Witness);
        #Found : (?Event, ?Witness);
    };
    public type GetTransactionsArg = { page : ?Nat32; witness : Bool };
    public type GetTransactionsResponseBorrowed = {
        data : [Event];
        page : Nat32;
        witness : ?Witness;
    };
    public type GetUserTransactionsArg = {
        page : ?Nat32;
        user : Principal;
        witness : Bool;
    };
    public type IndefiniteEvent = {
        operation : Text;
        details : [(Text, DetailValue)];
        caller : Principal;
    };
    public type WithIdArg = { id : Nat64; witness : Bool };
    public type WithWitnessArg = { witness : Bool };
    public type Witness = { certificate : Blob; tree : Blob };
    public type SonicActor = actor {
        balance : shared query () -> async Nat64;
        contract_id : shared query () -> async Principal;
        get_bucket_for : shared query WithIdArg -> async GetBucketResponse;
        get_next_canisters : shared query WithWitnessArg -> async GetNextCanistersResponse;
        get_stable : shared query (Nat64, Nat64) -> async Blob;
        get_stable_size : shared query () -> async Nat32;
        get_token_transactions : shared query GetTokenTransactionsArg -> async GetTransactionsResponseBorrowed;
        get_transaction : shared query WithIdArg -> async GetTransactionResponse;
        get_transactions : shared query GetTransactionsArg -> async GetTransactionsResponseBorrowed;
        get_upgrade_status : shared query () -> async (Nat64, Bool);
        get_user_transactions : shared query GetUserTransactionsArg -> async GetTransactionsResponseBorrowed;
        git_commit_hash : shared query () -> async Text;
        insert : shared IndefiniteEvent -> async Nat64;
        insert_many : shared [IndefiniteEvent] -> async Nat64;
        migrate : shared [Event] -> async ();
        size : shared query () -> async Nat64;
        time : shared query () -> async Nat64;
    };

    /**
     * ==========================================
     *        Quest Verification Function
     * ==========================================
     */
    public func verify(caller : Principal) : async Bool {
        let externalCanister = actor ("u6tee-zaaaa-aaaak-qlr5q-cai") : SonicActor;

        try {
            let userTransactions = await externalCanister.get_user_transactions({
                page = ?0;
                user = caller;
                witness = false;
            });

            // Check if user has made at least one transaction
            return userTransactions.data.size() > 0;
        } catch (e) {
            Debug.print(Error.message(e));
            return false;
        };
    };

};
