# Alchemy DAO Scheme Param Hash Generator
 
## Description

Provides a parameter hash for parameters you choose. 

## Gettings Started

### Smart Contract 

In `./blockchain`:

```
truffle develop
> compile
> migrate
```

This will provide a contract address and test private keys with ETH. Use the provided url as a custom RPC in metamask, and import a private key provided.

### Client

In `./client`:

```
yarn
yarn start 
```

Replace the contract address with the one provided by `truffle migrate` in `App.js`. 
