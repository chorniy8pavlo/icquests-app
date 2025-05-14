import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Debug "mo:base/Debug";
import Error "mo:base/Error";

module {
    public type AdminDumpCanisterLeaderboardResponse = {
        db : [(CanisterId, CanisterLeaderboardEntry)];
        topNAmount : Nat;
        topNAllTime : [(TopNCanistersDBKey, CanisterId)];
    };
    public type AdminDumpLoggerArgs = {
        startKey : Text;
        limit : Nat;
        ascending : Bool;
        endKey : Text;
    };
    public type AdminDumpLoggerResponse = {
        results : [(Text, LogEntry)];
        nextKey : ?Text;
    };
    public type AdminDumpRequestDBResponse = [(Nat, [RequestStateEntry])];
    public type AdminDumpStatusVariables = {
        topupTakeRate : Float;
        inProgressActionCounts : { topups : Nat };
        batchTopupsLocked : Bool;
    };
    public type AdminDumpTransactionHistoryArgs = {
        startKey : Text;
        limit : Nat;
        ascending : Bool;
        endKey : Text;
    };
    public type AdminDumpTransactionHistoryResponse = {
        results : [Transaction];
        nextKey : ?Text;
    };
    public type AdminDumpUserCanistersDataModelResponse = {
        userToCanisterMap : [(Text, UserCanister)];
        canisterToUserToppersIndex : [(Principal, [Principal])];
    };
    public type AdminDumpUserLeaderboardResponse = {
        db : [(UserPrincipalId, UserLeaderboardEntry)];
        topNAmount : Nat;
        topNAllTime : [(TopNUsersDBKey, UserPrincipalId)];
    };
    public type AdminGetCurrentSweepAmountResponse = { #ok : Nat; #err : Text };
    public type AdminGetHealthStatsResponse = {
        memory : Nat;
        heapMemory : Nat;
        cycles : Nat;
    };
    public type AdminSweepProfitsResponse = { #ok : Nat; #err : Text };
    public type AsyncBatchTopupArgs = {
        e8sToTransfer : Nat;
        canistersToTopup : [TopupTarget];
    };
    public type AsyncBatchTopupResponse = { #ok : Nat; #err : Text };
    public type BatchTopupArgs = {
        e8sToTransfer : Nat;
        canistersToTopup : [TopupTarget];
    };
    public type BatchTopupResponse = {
        #ok : MintTopupOk__1;
        #err : MintTopupError__1;
    };
    public type BlockIndex = Nat64;
    public type BlockIndex__1 = Nat64;
    public type CanisterId = Principal;
    public type CanisterLeaderboardEntry = {
        canisterId : Principal;
        cyclesToppedUp : Nat;
    };
    public type CreateUserArgs = { newUserProfile : NewUserProfileInput };
    public type CreateUserResponse = { #ok; #err : Text };
    public type GetCanistersToppedUpByUserIdResponse = {
        results : [(Text, UserCanister)];
        nextKey : ?Text;
    };
    public type GetCustomerTransactionsArgs = {
        startKey : Text;
        limit : Nat;
        ascending : Bool;
        caller : Principal;
        endKey : Text;
    };
    public type GetCustomerTransactionsResponse = {
        results : [Transaction];
        nextKey : ?Text;
    };
    public type GetInProgressActionCountsResponse = {
        topups : Nat;
        canistersBeingToppedUp : Nat;
    };
    public type GetLatestRequestStateById = ?MintTopupRequestState;
    public type GetRequestStateHistoryByIdResponse = [RequestStateEntry];
    public type GetUsersThatHaveToppedUpCanisterResponse = [UserCanister];
    public type ICRC10SupportedStandards = [{ url : Text; name : Text }];
    public type LogEntry = {
        id : Text;
        timestampInNs : Nat;
        message : Text;
        index : Nat;
    };
    public type MintTopupAsyncError = {
        #other : Text;
        #too_low_amount : Text;
        #transfer_from_error : TransferFromError;
        #notify_topup_error_failed_refund : Text;
        #transfer_error : TransferError;
        #uncaught_transfer_from_error : Text;
        #notify_topup_error_with_refund : Text;
        #notify_topup_error : { transferBlockIndex : Nat; error : NotifyError };
        #uncaught_notify_error : { transferBlockIndex : Nat; error : Text };
        #uncaught_transfer_error : Text;
    };
    public type MintTopupAsyncOk = {
        cyclesReceived : Nat;
        blockIndex : Nat;
        totalIcpSpent : Nat;
        totalIcpBurned : Nat;
        transactions : [Transaction];
    };
    public type MintTopupError = {
        #other : Text;
        #too_low_amount : Text;
        #transfer_from_error : TransferFromError;
        #notify_topup_error_failed_refund : Text;
        #transfer_error : TransferError;
        #uncaught_transfer_from_error : Text;
        #notify_topup_error_with_refund : Text;
        #notify_topup_error : { transferBlockIndex : Nat; error : NotifyError };
        #uncaught_notify_error : { transferBlockIndex : Nat; error : Text };
        #uncaught_transfer_error : Text;
    };
    public type MintTopupError__1 = {
        #other : Text;
        #too_low_amount : Text;
        #transfer_from_error : TransferFromError;
        #notify_topup_error_failed_refund : Text;
        #transfer_error : TransferError;
        #uncaught_transfer_from_error : Text;
        #notify_topup_error_with_refund : Text;
        #notify_topup_error : { transferBlockIndex : Nat; error : NotifyError };
        #uncaught_notify_error : { transferBlockIndex : Nat; error : Text };
        #uncaught_transfer_error : Text;
    };
    public type MintTopupOk = {
        cyclesReceived : Nat;
        blockIndex : Nat;
        totalIcpSpent : Nat;
        totalIcpBurned : Nat;
        transactions : [Transaction];
    };
    public type MintTopupOk__1 = {
        cyclesReceived : Nat;
        blockIndex : Nat;
        totalIcpSpent : Nat;
        totalIcpBurned : Nat;
        transactions : [Transaction];
    };
    public type MintTopupRequestState = {
        #icpTransferredToCMC : Nat;
        #refundedIcpToCustomer : Nat;
        #started;
        #cyclesSentToCanisters;
        #error : MintTopupAsyncError;
        #success : MintTopupAsyncOk;
        #icpTransferredFromCustomer : Nat;
        #icpBurned : Nat;
    };
    public type NewUserProfileInput = {
        bio : ?Text;
        username : Text;
        displayName : ?Text;
        email : ?Text;
    };
    public type NotifyError = {
        #Refunded : { block_index : ?BlockIndex; reason : Text };
        #InvalidTransaction : Text;
        #Other : { error_message : Text; error_code : Nat64 };
        #Processing;
        #TransactionTooOld : BlockIndex;
    };
    public type RequestStateEntry = {
        timestampInNs : Nat;
        state : MintTopupRequestState;
    };
    public type Tokens = { e8s : Nat64 };
    public type TopNCanistersDBKey = Text;
    public type TopNUsersDBKey = Text;
    public type TopupTarget = {
        cyclesToTopupWith : Nat;
        canisterId : Principal;
    };
    public type Transaction = {
        id : Text;
        timestampInNs : Nat;
        transferBlockIndex : Nat;
        icpSpent : Nat;
        cyclesReceived : Nat;
        cyclesSlippage : Int;
        burnBlockIndex : Nat;
        customerId : Principal;
        icpBurned : Nat;
        canisterId : Principal;
    };
    public type TransferError = {
        #TxTooOld : { allowed_window_nanos : Nat64 };
        #BadFee : { expected_fee : Tokens };
        #TxDuplicate : { duplicate_of : BlockIndex__1 };
        #TxCreatedInFuture;
        #InsufficientFunds : { balance : Tokens };
    };
    public type TransferFromError = {
        #GenericError : { message : Text; error_code : Nat };
        #TemporarilyUnavailable;
        #InsufficientAllowance : { allowance : Nat };
        #BadBurn : { min_burn_amount : Nat };
        #Duplicate : { duplicate_of : Nat };
        #BadFee : { expected_fee : Nat };
        #CreatedInFuture : { ledger_time : Nat64 };
        #TooOld;
        #InsufficientFunds : { balance : Nat };
    };
    public type UpdateCMCMetricsArgs = {
        timestampInMs : Nat;
        cmc_cycles_limit : Nat;
        cmc_cycles_minted_total : Nat;
        cmc_icp_xdr_conversion_rate : ?Float;
        cmc_limiter_cycles : Nat;
    };
    public type UpdateUserCanisterNameArgs = {
        canisterName : Text;
        canisterId : Principal;
    };
    public type UpdateUserCanisterNameResponse = { #ok; #err : Text };
    public type UpdateUserProfileArgs = {
        updateFields : UpdateableUserProfileFields;
    };
    public type UpdateUserProfileResponse = { #ok; #err : Text };
    public type UpdateableUserProfileFields = {
        bio : ?Text;
        username : ?Text;
        displayName : ?Text;
        email : ?Text;
    };
    public type UserCanister = {
        canisterName : Text;
        userId : Principal;
        lastToppedUpTimestampInNs : Nat;
        canisterId : Principal;
        cyclesToppedUp : Nat;
    };
    public type UserLeaderboardEntry = {
        userId : UserPrincipalId;
        cyclesToppedUp : Nat;
    };
    public type UserPrincipalId = Principal;
    public type V0AsyncBatchTopupArgs = {
        e8sToTransfer : Nat;
        canistersToTopup : [TopupTarget];
    };
    public type V0AsyncBatchTopupResponse = { #ok : Nat; #err : Text };
    public type V0BatchTopupArgs = {
        e8sToTransfer : Nat;
        canistersToTopup : [TopupTarget];
    };
    public type V0BatchTopupResponse = {
        #ok : MintTopupOk;
        #err : MintTopupError;
    };
    public type V0GetLatestRequestStateById = ?MintTopupRequestState;
    public type V0GetRequestStateHistoryByIdResponse = [RequestStateEntry];
    public type ICPTopupActor = actor {
        admin_addDevAdmin : shared Principal -> async ();
        admin_backfillUserCanistersDataModel : shared () -> async ();
        admin_checkDevAdmin : shared query () -> async Bool;
        admin_clearLogs : shared () -> async ();
        admin_dumpCanisterLeaderboard : shared query () -> async AdminDumpCanisterLeaderboardResponse;
        admin_dumpLogs : shared query AdminDumpLoggerArgs -> async AdminDumpLoggerResponse;
        admin_dumpRequestDB : shared query () -> async AdminDumpRequestDBResponse;
        admin_dumpStatusVariables : shared query () -> async AdminDumpStatusVariables;
        admin_dumpTransactionHistory : shared query AdminDumpTransactionHistoryArgs -> async AdminDumpTransactionHistoryResponse;
        admin_dumpUserCanistersDataModel : shared query () -> async AdminDumpUserCanistersDataModelResponse;
        admin_dumpUserLeaderboard : shared query () -> async AdminDumpUserLeaderboardResponse;
        admin_getDevAdmins : shared query () -> async [Principal];
        admin_getHealthStats : shared query () -> async AdminGetHealthStatsResponse;
        admin_getInProgressActionCounts : shared query () -> async GetInProgressActionCountsResponse;
        admin_getLambdaPrincipal : shared query () -> async ?Principal;
        admin_getSweepAmount : shared () -> async AdminGetCurrentSweepAmountResponse;
        admin_removeDevAdmin : shared Principal -> async Bool;
        admin_resetInProgressActionCounts : shared () -> async ();
        admin_setLambdaPrincipal : shared Principal -> async ();
        admin_setTopupTakeRate : shared Float -> async ();
        admin_sweepProfits : shared Text -> async AdminSweepProfitsResponse;
        batchTopup : shared BatchTopupArgs -> async BatchTopupResponse;
        batchTopupAsync : shared AsyncBatchTopupArgs -> async AsyncBatchTopupResponse;
        createUser : shared CreateUserArgs -> async CreateUserResponse;
        getCanistersToppedUpByUserId : shared query () -> async GetCanistersToppedUpByUserIdResponse;
        getCustomerTransactions : shared query GetCustomerTransactionsArgs -> async GetCustomerTransactionsResponse;
        getLatestRequestStateById : shared query Nat -> async GetLatestRequestStateById;
        getRequestStateHistoryById : shared query Nat -> async GetRequestStateHistoryByIdResponse;
        getTopupTakeRate : shared query () -> async Float;
        getTotalCyclesToppedUpForCaller : shared query () -> async Nat;
        getUsersThatHaveToppedUpCanister : shared query Principal -> async GetUsersThatHaveToppedUpCanisterResponse;
        hasUserToppedUpAnyCanister : shared query Principal -> async Bool;
        icrc10_supported_standards : shared query () -> async ICRC10SupportedStandards;
        icrc28_trusted_origins : shared () -> async { trusted_origins : [Text] };
        setTopupTakeRate : shared Float -> async ();
        updateCMCMetrics : shared UpdateCMCMetricsArgs -> async ();
        updateUserCanisterName : shared UpdateUserCanisterNameArgs -> async UpdateUserCanisterNameResponse;
        updateUserProfile : shared UpdateUserProfileArgs -> async UpdateUserProfileResponse;
        v0_batchTopupAsync : shared V0AsyncBatchTopupArgs -> async V0AsyncBatchTopupResponse;
        v0_batchTopupSync : shared V0BatchTopupArgs -> async V0BatchTopupResponse;
        v0_getLatestRequestStateById : shared query Nat -> async V0GetLatestRequestStateById;
        v0_getRequestStateHistoryById : shared query Nat -> async V0GetRequestStateHistoryByIdResponse;
    };

    /**
     * ==========================================
     *        Quest Verification Function
     * ==========================================
     */
    public func verify(caller : Principal) : async Bool {
        let externalCanister = actor ("24qkv-5aaaa-aaaal-amhkq-cai") : ICPTopupActor;

        try {
            let boolean = await externalCanister.hasUserToppedUpAnyCanister(caller);
            return boolean;
        } catch (e) {
            Debug.print(Error.message(e));
            return false;
        };
    };

};
