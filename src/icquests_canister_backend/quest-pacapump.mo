import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Debug "mo:base/Debug";
import Error "mo:base/Error";

// This is a generated Motoko binding.
// Please use `import service "ic:canister_id"` instead to call canisters on the IC if possible.

module {
    public type Account = { owner : Principal; subaccount : ?Blob };
    public type BondingCurveChart = { id : Text; data : [PriceData] };
    public type BondingCurveConfig = {
        migration_fee : Float;
        trade_fee : Float;
        migrate_canister : Text;
    };
    public type BondingCurveRecordResponse = {
        id : Text;
        market_cap_in_icp : Float;
        state : BondingCurveState;
        icp_amount : Nat64;
        price : Float;
        token_left : Nat64;
        token_sold : Nat64;
    };
    public type BondingCurveState = { #Active; #Migrated; #Migrating };
    public type BondingCurveTransaction = {
        id : Text;
        ts : Nat64;
        token_amount : Nat64;
        rate : Float;
        type_ : Text;
        ledger_txs : [LedgerTx];
        wallet : Principal;
        icp_amount : Nat64;
    };
    public type BondingCurveTx = {
        ts : Nat64;
        status : Text;
        bonding_curve_tx : BondingCurveTransaction;
    };
    public type BondingCurveTxs = { id : Text; txs : [BondingCurveTransaction] };
    public type CanisterArgs = { #Upgrade : UpgradeArgs; #Init : InitArgs };
    public type CanisterError = {
        #InvalidPoolPid;
        #HandleLogicError : Text;
        #EmptyDescription;
        #InvalidCreatorPid;
        #EmptySymbol;
        #EmptyLogo;
        #EmptyName;
        #AnonymousCall;
        #InvalidTokenPid;
    };
    public type ChangeArchiveOptions = {
        num_blocks_to_archive : ?Nat64;
        max_transactions_per_response : ?Nat64;
        trigger_threshold : ?Nat64;
        more_controller_ids : ?[Principal];
        max_message_size_bytes : ?Nat64;
        cycles_for_archive_creation : ?Nat64;
        node_max_memory_size_bytes : ?Nat64;
        controller_id : ?Principal;
    };
    public type ChangeFeeCollector = { #SetTo : Account; #Unset };
    public type ChargeCreateFeeTx = {
        ts : Nat64;
        status : Text;
        ledger_txs : [LedgerTx];
    };
    public type Comment = {
        id : Text;
        user_pid : Text;
        created_at : Nat64;
        comment : Text;
        pacapump_id : Text;
        image : Text;
    };
    public type CommentInput = {
        created_at : Nat64;
        comment : Text;
        pacapump_id : Text;
        image : Text;
    };
    public type Config = {
        bonding_curve_config : BondingCurveConfig;
        factory_config : FactoryConfig;
        default_icrc_token_wasm_name : Text;
        fee_config : FeeConfig;
    };
    public type CreateEvent = {
        creator : Text;
        token_id : Text;
        token_symbol : Text;
        token_address : Text;
    };
    public type CreatePacapumpTx = {
        ts : Nat64;
        status : Text;
        creator : Principal;
        pacapump_id : Text;
        ledger_txs : [LedgerTx];
    };
    public type Event = {
        #Buy : TradeEvent;
        #Migrate : MigrateEvent;
        #Sell : TradeEvent;
        #Create : CreateEvent;
    };
    public type FactoryConfig = {
        initial_cycles_balance : Nat;
        dao_admin : Text;
        cycles_manager_canister : Text;
        default_admin : Text;
    };
    public type FeatureFlags = { icrc2 : Bool };
    public type FeeConfig = {
        creation_fee : Nat64;
        fee_wallet : Text;
        token_fee_canister_id : Text;
    };
    public type Filter = { filter_type : Text };
    public type Icrc21ConsentInfo = {
        metadata : Icrc21ConsentMessageMetadata;
        consent_message : Icrc21ConsentMessage;
    };
    public type Icrc21ConsentMessage = {
        #LineDisplayMessage : { pages : [Icrc21LineDisplayPage] };
        #GenericDisplayMessage : Text;
    };
    public type Icrc21ConsentMessageMetadata = {
        utc_offset_minutes : ?Int16;
        language : Text;
    };
    public type Icrc21ConsentMessageRequest = {
        arg : Blob;
        method : Text;
        user_preferences : Icrc21ConsentMessageSpec;
    };
    public type Icrc21ConsentMessageSpec = {
        metadata : Icrc21ConsentMessageMetadata;
        device_spec : ?Icrc21DeviceSpec;
    };
    public type Icrc21DeviceSpec = {
        #GenericDisplay;
        #LineDisplay : { characters_per_line : Nat16; lines_per_page : Nat16 };
    };
    public type Icrc21Error = {
        #GenericError : { description : Text; error_code : Nat };
        #InsufficientPayment : Icrc21ErrorInfo;
        #UnsupportedCanisterCall : Icrc21ErrorInfo;
        #ConsentMessageUnavailable : Icrc21ErrorInfo;
    };
    public type Icrc21ErrorInfo = { description : Text };
    public type Icrc21LineDisplayPage = { lines : [Text] };
    public type Icrc21SupportedStandard = { url : Text; name : Text };
    public type Icrc28TrustedOriginsResponse = { trusted_origins : [Text] };
    public type InitArgs = {
        initial_cycles_balance : Nat;
        bonding_curve_migration_fee : Float;
        dao_admin : Text;
        cycles_manager_canister : Text;
        migrate_canister : Text;
        icrc_token_wasm_name : Text;
        creation_fee : Nat64;
        fee_wallet : Text;
        token_fee_canister_id : Text;
        bonding_curve_trade_fee : Float;
    };
    public type LedgerTx = {
        to : Account;
        ts : Nat64;
        fee : ?Nat64;
        block_id : Text;
        from : Account;
        memo : ?Text;
        canister_id : Text;
        amount : Nat64;
    };
    public type MemorySize = { stable_ : Nat64; heap : Nat64 };
    public type MetadataValue = {
        #Int : Int;
        #Nat : Nat;
        #Blob : Blob;
        #Text : Text;
    };
    public type MigrateEvent = { token_symbol : Text; token_address : Text };
    public type MigrateTx = {
        ts : Nat64;
        status : Text;
        token_id : Text;
        ledger_txs : [LedgerTx];
    };
    public type PacapumpFee = {
        migration_fee : Float;
        trade_fee : Float;
        create_fee : Nat64;
    };
    public type PriceData = {
        id : Text;
        ts : Nat64;
        low : Float;
        high : Float;
        close : Float;
        open : Float;
    };
    public type RefundTx = {
        ts : Nat64;
        status : Text;
        refund_to : Principal;
        ledger_txs : [LedgerTx];
    };
    public type Result = { #Ok : BondingCurveTransaction; #Err : Text };
    public type Result_1 = { #Ok; #Err : CanisterError };
    public type Result_2 = { #Ok : TokenRecord; #Err : CanisterError };
    public type Result_3 = { #Ok : ?TokenRecord; #Err : CanisterError };
    public type Result_4 = { #Ok : Icrc21ConsentInfo; #Err : Icrc21Error };
    public type Result_5 = { #Ok : Text; #Err : Text };
    public type Result_6 = { #Ok : Nat64; #Err : Text };
    public type Result_7 = { #Ok : Config; #Err : Text };
    public type TokenRecord = {
        id : Text;
        creator : Text;
        market_cap : Float;
        twitter : ?Text;
        logo : Text;
        name : Text;
        description : Text;
        created_at : Nat64;
        website : ?Text;
        token_pid : Text;
        price : Float;
        pool_pid : Text;
        telegram : ?Text;
        symbol : Text;
    };
    public type TokenRecordInput = {
        twitter : ?Text;
        logo : Text;
        name : Text;
        buy_amount : ?Nat64;
        description : Text;
        website : ?Text;
        logo_url : Text;
        telegram : ?Text;
        symbol : Text;
    };
    public type TokenUpgradeArgs = {
        change_archive_options : ?ChangeArchiveOptions;
        token_symbol : ?Text;
        transfer_fee : ?Nat;
        metadata : ?[(Text, MetadataValue)];
        accounts_overflow_trim_quantity : ?Nat64;
        change_fee_collector : ?ChangeFeeCollector;
        max_memo_length : ?Nat16;
        token_name : ?Text;
        feature_flags : ?FeatureFlags;
    };
    public type TradeEvent = {
        token_symbol : Text;
        token_address : Text;
        wallet : Text;
        amount : Nat64;
    };
    public type Tx = {
        #RefundTx : RefundTx;
        #BondingCurve : BondingCurveTx;
        #MigrateTx : MigrateTx;
        #ChargeCreateFee : ChargeCreateFeeTx;
        #CreatePacapump : CreatePacapumpTx;
    };
    public type UpgradeArgs = {
        initial_cycles_balance : ?Nat;
        bonding_curve_migration_fee : ?Float;
        dao_admin : ?Text;
        cycles_manager_canister : ?Text;
        migrate_canister : ?Text;
        icrc_token_wasm_name : ?Text;
        creation_fee : ?Nat64;
        fee_wallet : ?Text;
        token_fee_canister_id : ?Text;
        default_admin : ?Text;
        bonding_curve_trade_fee : ?Float;
    };
    public type User = {
        pid : Text;
        token_created : [Text];
        token_hold : [Text];
    };

    public type PacaPumpActor = actor {
        add_admin : shared Text -> async Text;
        add_authorised : shared Text -> async Text;
        add_wasm_chunk : shared (Blob, Text) -> async ();
        admin_config : shared query () -> async Config;
        buy : shared (Text, Nat64) -> async Result;
        clear_old_wasm : shared Text -> async ();
        comment : shared CommentInput -> async Result_1;
        create_pacapump : shared TokenRecordInput -> async Result_2;
        get_all_available_wasms : shared query () -> async [Text];
        get_chart : shared query Text -> async BondingCurveChart;
        get_create_event : shared query () -> async ?Event;
        get_cycles : shared query () -> async Nat64;
        get_fee : shared query () -> async PacapumpFee;
        get_icp_balance : shared ?Text -> async Nat;
        get_king_of_the_zoo : shared query () -> async ?Event;
        get_migrated_list : shared query () -> async [TokenRecord];
        get_pacapump_tx : shared query Text -> async ?BondingCurveTxs;
        get_progress : shared query Text -> async ?BondingCurveRecordResponse;
        get_token_by_pid : shared query Text -> async Result_3;
        get_total_tokens : shared query () -> async Nat64;
        get_trade_event : shared query () -> async ?Event;
        get_tx : shared query (?Nat64, ?Nat64) -> async [Tx];
        get_user : shared query () -> async ?User;
        get_user_by_pid : shared query Text -> async ?User;
        icrc10_supported_standards : shared query () -> async [
            Icrc21SupportedStandard
        ];
        icrc21_canister_call_consent_message : shared Icrc21ConsentMessageRequest -> async Result_4;
        icrc28_trusted_origins : shared () -> async Icrc28TrustedOriginsResponse;
        is_wasm_existing : shared Text -> async Bool;
        list_admins : shared query () -> async [Text];
        list_authorised : shared query () -> async [Text];
        list_comments : shared query (Text, Nat64, Nat64) -> async [Comment];
        list_tokens : shared query (Nat64, Nat64, ?Filter) -> async [TokenRecord];
        memory_size : shared query () -> async MemorySize;
        migrate_to_kong_swap : shared Text -> async Result_5;
        query_status : shared Nat64 -> async Text;
        quote : shared query (Text, Text, Nat64) -> async Result_6;
        remove_admin : shared Text -> async Text;
        remove_authorised : shared Text -> async Text;
        sell : shared (Text, Nat64) -> async Result;
        transfer : shared (?Text, Text) -> async Result_5;
        update_admin_config : shared ?CanisterArgs -> async Result_7;
        update_status : shared (Text, BondingCurveState) -> async Result_5;
        update_wasm : shared (Text, Text, ?TokenUpgradeArgs) -> async Result_5;
    };

    /**
     * ==========================================
     *        Quest Verification Function
     * ==========================================
     */
    public func verify(caller : Principal) : async Bool {
        let externalCanister = actor ("xxiwu-qiaaa-aaaam-qcbha-cai") : PacaPumpActor;
        let userPrincipal = Principal.toText(caller);

        try {
            let user = await externalCanister.get_user_by_pid(userPrincipal);
            switch (user) {
                case (?u) {
                    return u.token_created.size() > 0;
                };
                case null {
                    return false;
                };
            };
        } catch (e) {
            Debug.print(Error.message(e));
            return false;
        };
    };

};
