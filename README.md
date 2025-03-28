# ICQuests Canister Frontend

This repository contains frontend (React + Typescript) and backend (Motoko).

## Instructions

### Run frontend locally
1. `npm install`
2. `npm run dev`


### Run backend locally
1. `dfx start --background`
2. `dfx deploy`

### Build frontend
1. `npm install`
2. `cd src/icquests_canister_frontend`
3. `npm run build`
4. Check if `.well-known` folder present. If not - copy `src/icquests_canister_frontend/.well-known` to `src/icquests_canister_frontend/out`.

### Deploy
1. `dfx deploy --network ic`

## License

This project is licensed under the MIT License.

# ICQuests Canister

A canister for tracking user quests and achievements on the Internet Computer.

## Quests Available

1. **NFID Vaults Quest** - Verifies if a user has created a NFID Vaults
2. **Kongswap Quest** - Verifies if a user has made a swap on Kongswap
3. **Pacapump Quest** - Verifies if a user has minted a token on Pacapump
4. **Sonic Quest** - Verifies if a user has made a transaction on Sonic
5. **Odin Quest** - Verifies if a user has created any tokens on the Odin platform

## How to Use

To verify a quest completion:

```motoko
// Call from a front-end application
let result = await ICQuestsCanister.verify(questId);
```

The verification result will be one of:
- "QUEST_COMPLETED" - The user successfully completed the quest
- "QUEST_ALREADY_COMPLETED" - The user had already completed this quest
- "QUEST_NOT_VERIFIED" - The user has not yet met the requirements
- "USER_NOT_FOUND" - User profile could not be found or created