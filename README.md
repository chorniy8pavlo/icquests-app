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