// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
export const idlFactory = ({ IDL }) => {
  const CanisterId = IDL.Principal;
  const CanisterLeaderboardEntry = IDL.Record({
    canisterId: IDL.Principal,
    cyclesToppedUp: IDL.Nat,
  });
  const TopNCanistersDBKey = IDL.Text;
  const AdminDumpCanisterLeaderboardResponse = IDL.Record({
    db: IDL.Vec(IDL.Tuple(CanisterId, CanisterLeaderboardEntry)),
    topNAmount: IDL.Nat,
    topNAllTime: IDL.Vec(IDL.Tuple(TopNCanistersDBKey, CanisterId)),
  });
  const AdminDumpLoggerArgs = IDL.Record({
    startKey: IDL.Text,
    limit: IDL.Nat,
    ascending: IDL.Bool,
    endKey: IDL.Text,
  });
  const LogEntry = IDL.Record({
    id: IDL.Text,
    timestampInNs: IDL.Nat,
    message: IDL.Text,
    index: IDL.Nat,
  });
  const AdminDumpLoggerResponse = IDL.Record({
    results: IDL.Vec(IDL.Tuple(IDL.Text, LogEntry)),
    nextKey: IDL.Opt(IDL.Text),
  });
  const AdminDumpStatusVariables = IDL.Record({
    topupTakeRate: IDL.Float64,
    inProgressActionCounts: IDL.Record({ topups: IDL.Nat }),
    batchTopupsLocked: IDL.Bool,
  });
  const AdminDumpTransactionHistoryArgs = IDL.Record({
    startKey: IDL.Text,
    limit: IDL.Nat,
    ascending: IDL.Bool,
    endKey: IDL.Text,
  });
  const Transaction = IDL.Record({
    id: IDL.Text,
    timestampInNs: IDL.Nat,
    transferBlockIndex: IDL.Nat,
    icpSpent: IDL.Nat,
    cyclesReceived: IDL.Nat,
    cyclesSlippage: IDL.Int,
    burnBlockIndex: IDL.Nat,
    customerId: IDL.Principal,
    icpBurned: IDL.Nat,
    canisterId: IDL.Principal,
  });
  const AdminDumpTransactionHistoryResponse = IDL.Record({
    results: IDL.Vec(Transaction),
    nextKey: IDL.Opt(IDL.Text),
  });
  const UserCanister = IDL.Record({
    canisterName: IDL.Text,
    userId: IDL.Principal,
    lastToppedUpTimestampInNs: IDL.Nat,
    canisterId: IDL.Principal,
    cyclesToppedUp: IDL.Nat,
  });
  const AdminDumpUserCanistersDataModelResponse = IDL.Record({
    userToCanisterMap: IDL.Vec(IDL.Tuple(IDL.Text, UserCanister)),
    canisterToUserToppersIndex: IDL.Vec(
      IDL.Tuple(IDL.Principal, IDL.Vec(IDL.Principal))
    ),
  });
  const UserPrincipalId = IDL.Principal;
  const UserLeaderboardEntry__1 = IDL.Record({
    userId: UserPrincipalId,
    cyclesToppedUp: IDL.Nat,
  });
  const TopNUsersDBKey = IDL.Text;
  const AdminDumpUserLeaderboardResponse = IDL.Record({
    db: IDL.Vec(IDL.Tuple(UserPrincipalId, UserLeaderboardEntry__1)),
    topNAmount: IDL.Nat,
    topNAllTime: IDL.Vec(IDL.Tuple(TopNUsersDBKey, UserPrincipalId)),
  });
  const AdminGetHealthStatsResponse = IDL.Record({
    memory: IDL.Nat,
    heapMemory: IDL.Nat,
    cycles: IDL.Nat,
  });
  const GetInProgressActionCountsResponse = IDL.Record({
    topups: IDL.Nat,
    canistersBeingToppedUp: IDL.Nat,
  });
  const AdminGetCurrentSweepAmountResponse = IDL.Variant({
    ok: IDL.Nat,
    err: IDL.Text,
  });
  const AdminSweepProfitsResponse = IDL.Variant({
    ok: IDL.Nat,
    err: IDL.Text,
  });
  const TopupTarget = IDL.Record({
    cyclesToTopupWith: IDL.Nat,
    canisterId: IDL.Principal,
  });
  const BatchTopupArgs = IDL.Record({
    e8sToTransfer: IDL.Nat,
    canistersToTopup: IDL.Vec(TopupTarget),
  });
  const MintTopupOk = IDL.Record({
    cyclesReceived: IDL.Nat,
    blockIndex: IDL.Nat,
    totalIcpSpent: IDL.Nat,
    totalIcpBurned: IDL.Nat,
    transactions: IDL.Vec(Transaction),
  });
  const TransferFromError = IDL.Variant({
    GenericError: IDL.Record({
      message: IDL.Text,
      error_code: IDL.Nat,
    }),
    TemporarilyUnavailable: IDL.Null,
    InsufficientAllowance: IDL.Record({ allowance: IDL.Nat }),
    BadBurn: IDL.Record({ min_burn_amount: IDL.Nat }),
    Duplicate: IDL.Record({ duplicate_of: IDL.Nat }),
    BadFee: IDL.Record({ expected_fee: IDL.Nat }),
    CreatedInFuture: IDL.Record({ ledger_time: IDL.Nat64 }),
    TooOld: IDL.Null,
    InsufficientFunds: IDL.Record({ balance: IDL.Nat }),
  });
  const Tokens = IDL.Record({ e8s: IDL.Nat64 });
  const BlockIndex__1 = IDL.Nat64;
  const TransferError = IDL.Variant({
    TxTooOld: IDL.Record({ allowed_window_nanos: IDL.Nat64 }),
    BadFee: IDL.Record({ expected_fee: Tokens }),
    TxDuplicate: IDL.Record({ duplicate_of: BlockIndex__1 }),
    TxCreatedInFuture: IDL.Null,
    InsufficientFunds: IDL.Record({ balance: Tokens }),
  });
  const BlockIndex = IDL.Nat64;
  const NotifyError = IDL.Variant({
    Refunded: IDL.Record({
      block_index: IDL.Opt(BlockIndex),
      reason: IDL.Text,
    }),
    InvalidTransaction: IDL.Text,
    Other: IDL.Record({
      error_message: IDL.Text,
      error_code: IDL.Nat64,
    }),
    Processing: IDL.Null,
    TransactionTooOld: BlockIndex,
  });
  const MintTopupError = IDL.Variant({
    other: IDL.Text,
    too_low_amount: IDL.Text,
    transfer_from_error: TransferFromError,
    transfer_error: TransferError,
    uncaught_transfer_from_error: IDL.Text,
    notify_topup_error: IDL.Record({
      transferBlockIndex: IDL.Nat,
      error: NotifyError,
    }),
    uncaught_notify_error: IDL.Record({
      transferBlockIndex: IDL.Nat,
      error: IDL.Text,
    }),
    uncaught_transfer_error: IDL.Text,
  });
  const BatchTopupResponse = IDL.Variant({
    ok: MintTopupOk,
    err: MintTopupError,
  });
  const AsyncBatchTopupArgs = IDL.Record({
    e8sToTransfer: IDL.Nat,
    canistersToTopup: IDL.Vec(TopupTarget),
  });
  const AsyncBatchTopupResponse = IDL.Variant({
    ok: IDL.Nat,
    err: IDL.Text,
  });
  const NewUserProfileInput = IDL.Record({
    bio: IDL.Opt(IDL.Text),
    username: IDL.Text,
    displayName: IDL.Opt(IDL.Text),
    email: IDL.Opt(IDL.Text),
  });
  const CreateUserArgs = IDL.Record({ newUserProfile: NewUserProfileInput });
  const CreateUserResponse = IDL.Variant({ ok: IDL.Null, err: IDL.Text });
  const GetCanistersToppedUpByUserIdResponse = IDL.Record({
    results: IDL.Vec(IDL.Tuple(IDL.Text, UserCanister)),
    nextKey: IDL.Opt(IDL.Text),
  });
  const GetCustomerTransactionsArgs = IDL.Record({
    startKey: IDL.Text,
    limit: IDL.Nat,
    ascending: IDL.Bool,
    caller: IDL.Principal,
    endKey: IDL.Text,
  });
  const GetCustomerTransactionsResponse = IDL.Record({
    results: IDL.Vec(Transaction),
    nextKey: IDL.Opt(IDL.Text),
  });
  const MintTopupAsyncError = IDL.Variant({
    other: IDL.Text,
    too_low_amount: IDL.Text,
    transfer_from_error: TransferFromError,
    transfer_error: TransferError,
    uncaught_transfer_from_error: IDL.Text,
    notify_topup_error: IDL.Record({
      transferBlockIndex: IDL.Nat,
      error: NotifyError,
    }),
    uncaught_notify_error: IDL.Record({
      transferBlockIndex: IDL.Nat,
      error: IDL.Text,
    }),
    uncaught_transfer_error: IDL.Text,
  });
  const MintTopupAsyncOk = IDL.Record({
    cyclesReceived: IDL.Nat,
    blockIndex: IDL.Nat,
    totalIcpSpent: IDL.Nat,
    totalIcpBurned: IDL.Nat,
    transactions: IDL.Vec(Transaction),
  });
  const MintTopupRequestState = IDL.Variant({
    icpTransferredToCMC: IDL.Nat,
    refundedIcpToCustomer: IDL.Nat,
    started: IDL.Null,
    cyclesSentToCanisters: IDL.Null,
    error: MintTopupAsyncError,
    success: MintTopupAsyncOk,
    icpTransferredFromCustomer: IDL.Nat,
    icpBurned: IDL.Nat,
  });
  const GetLatestRequestStateById = IDL.Opt(MintTopupRequestState);
  const RequestStateEntry = IDL.Record({
    timestampInNs: IDL.Nat,
    state: MintTopupRequestState,
  });
  const GetRequestStateHistoryByIdResponse = IDL.Vec(RequestStateEntry);
  const TimeFrame__1 = IDL.Variant({
    time_period: IDL.Record({
      startTimestampInNs: IDL.Nat,
      endTimestampInNs: IDL.Nat,
    }),
    all_time: IDL.Null,
  });
  const GetTopCanistersToppedUpArgs = IDL.Record({
    timeframe: TimeFrame__1,
  });
  const GetTopCanistersToppedUpResponse = IDL.Vec(CanisterLeaderboardEntry);
  const TimeFrame = IDL.Variant({
    time_period: IDL.Record({
      startTimestampInNs: IDL.Nat,
      endTimestampInNs: IDL.Nat,
    }),
    all_time: IDL.Null,
  });
  const GetTopCycleTopupUsersArgs = IDL.Record({ timeframe: TimeFrame });
  const UserLeaderboardEntry = IDL.Record({
    username: IDL.Text,
    userId: UserPrincipalId,
    cyclesToppedUp: IDL.Nat,
  });
  const GetTopCycleTopupUsersResponse = IDL.Vec(UserLeaderboardEntry);
  const GetUsersThatHaveToppedUpCanisterResponse = IDL.Vec(UserCanister);
  const UpdateUserCanisterNameArgs = IDL.Record({
    canisterName: IDL.Text,
    canisterId: IDL.Principal,
  });
  const UpdateUserCanisterNameResponse = IDL.Variant({
    ok: IDL.Null,
    err: IDL.Text,
  });
  const UpdateableUserProfileFields = IDL.Record({
    bio: IDL.Opt(IDL.Text),
    username: IDL.Opt(IDL.Text),
    displayName: IDL.Opt(IDL.Text),
    email: IDL.Opt(IDL.Text),
  });
  const UpdateUserProfileArgs = IDL.Record({
    updateFields: UpdateableUserProfileFields,
  });
  const UpdateUserProfileResponse = IDL.Variant({
    ok: IDL.Null,
    err: IDL.Text,
  });
  return IDL.Service({
    admin_addDevAdmin: IDL.Func([IDL.Principal], [], []),
    admin_backfillUserCanistersDataModel: IDL.Func([], [], []),
    admin_checkDevAdmin: IDL.Func([], [IDL.Bool], ['query']),
    admin_clearLogs: IDL.Func([], [], []),
    admin_dumpCanisterLeaderboard: IDL.Func(
      [],
      [AdminDumpCanisterLeaderboardResponse],
      ['query']
    ),
    admin_dumpLogs: IDL.Func(
      [AdminDumpLoggerArgs],
      [AdminDumpLoggerResponse],
      ['query']
    ),
    admin_dumpStatusVariables: IDL.Func(
      [],
      [AdminDumpStatusVariables],
      ['query']
    ),
    admin_dumpTransactionHistory: IDL.Func(
      [AdminDumpTransactionHistoryArgs],
      [AdminDumpTransactionHistoryResponse],
      ['query']
    ),
    admin_dumpUserCanistersDataModel: IDL.Func(
      [],
      [AdminDumpUserCanistersDataModelResponse],
      ['query']
    ),
    admin_dumpUserLeaderboard: IDL.Func(
      [],
      [AdminDumpUserLeaderboardResponse],
      ['query']
    ),
    admin_getDevAdmins: IDL.Func([], [IDL.Vec(IDL.Principal)], ['query']),
    admin_getHealthStats: IDL.Func(
      [],
      [AdminGetHealthStatsResponse],
      ['query']
    ),
    admin_getInProgressActionCounts: IDL.Func(
      [],
      [GetInProgressActionCountsResponse],
      []
    ),
    admin_getSweepAmount: IDL.Func(
      [],
      [AdminGetCurrentSweepAmountResponse],
      []
    ),
    admin_removeDevAdmin: IDL.Func([IDL.Principal], [IDL.Bool], []),
    admin_setTopupTakeRate: IDL.Func([IDL.Float64], [], []),
    admin_sweepProfits: IDL.Func([IDL.Text], [AdminSweepProfitsResponse], []),
    batchTopup: IDL.Func([BatchTopupArgs], [BatchTopupResponse], []),
    batchTopupAsync: IDL.Func(
      [AsyncBatchTopupArgs],
      [AsyncBatchTopupResponse],
      []
    ),
    createUser: IDL.Func([CreateUserArgs], [CreateUserResponse], []),
    getCanistersToppedUpByUserId: IDL.Func(
      [],
      [GetCanistersToppedUpByUserIdResponse],
      ['query']
    ),
    getCustomerTransactions: IDL.Func(
      [GetCustomerTransactionsArgs],
      [GetCustomerTransactionsResponse],
      ['query']
    ),
    getLatestRequestStateById: IDL.Func(
      [IDL.Nat],
      [GetLatestRequestStateById],
      ['query']
    ),
    getRequestStateHistoryById: IDL.Func(
      [IDL.Nat],
      [GetRequestStateHistoryByIdResponse],
      ['query']
    ),
    getTopCanistersToppedUp: IDL.Func(
      [GetTopCanistersToppedUpArgs],
      [GetTopCanistersToppedUpResponse],
      ['query']
    ),
    getTopCycleTopupUsers: IDL.Func(
      [GetTopCycleTopupUsersArgs],
      [GetTopCycleTopupUsersResponse],
      ['query']
    ),
    getTopupTakeRate: IDL.Func([], [IDL.Float64], ['query']),
    getTotalCyclesToppedUp: IDL.Func([], [IDL.Nat], []),
    getTotalCyclesToppedUpForCaller: IDL.Func([], [IDL.Nat], ['query']),
    getUsersThatHaveToppedUpCanister: IDL.Func(
      [IDL.Principal],
      [GetUsersThatHaveToppedUpCanisterResponse],
      ['query']
    ),
    icrc28_trusted_origins: IDL.Func(
      [],
      [IDL.Record({ trusted_origins: IDL.Vec(IDL.Text) })],
      []
    ),
    setTopupTakeRate: IDL.Func([IDL.Float64], [], []),
    updateUserCanisterName: IDL.Func(
      [UpdateUserCanisterNameArgs],
      [UpdateUserCanisterNameResponse],
      []
    ),
    updateUserProfile: IDL.Func(
      [UpdateUserProfileArgs],
      [UpdateUserProfileResponse],
      []
    ),
  });
};
export const init = () => {
  return [];
};
