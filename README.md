# hardhat-typescript-template

Use this as a hardhat template to start rapid smart contract development using typescript and other mind blowing features.

<!-- TODO: Features
- Hardhat React
- CI + Coverage and Gas estimations
- Husky to generate types and lint checking before commits
 -->

## Features

### Typescript

- Typescript support: Write tests and scripts in Typescript

### Typechain

Use typechain to create typescript declaration files for typed contract interactions.

```bash
yarn compile || yarn compile:force
```

When contracts are compiled, typescript declarations are generated in [typechain/](./typechain).

### Mocha

```bash
yarn test
```

**Mocha**: This repo uses mocha as the main testing framework

- Use [vscode-mocha-test-adapter](https://marketplace.visualstudio.com/items?itemName=hbenl.vscode-mocha-test-adapter) to run individual unit tests
  - Make sure to set the vscode option to `"mochaExplorer.files"` to `"test/**/*.{j,t}s"` [more info](https://hardhat.org/guides/vscode-tests.html)

**Chai**: The mocha tests use the [chai assertion library](https://www.chaijs.com/).

### Coverage

Use [solidity-coverage](https://hardhat.org/plugins/solidity-coverage.html) to generate a smart contract coverage report based on current test suite.

```bash
yarn coverage
```

### Gas Reporter

Use [hardhat-gas-reporter](https://hardhat.org/plugins/hardhat-gas-reporter.html) to generate a contract function gas/cost estimator.

```bash
yarn test:gas
```

# Contracts

## Compile Contracts

Contracts located in the [contracts/](./contracts) directory will be compiled using the `solidity` version in the [hardhat.config.ts](./hardhat.config.ts) file.

`yarn compile` || `yarn compile:force`

## Deploy Contracts

After compiling your contracts you can deploy them to a network of your choice. For

```bash
yarn compile
```

```bash
# Deploy locally
yarn testrpc
yarn deploy:dev
# Deploy to specific network
yarn deploy:bsc
yarn deploy:bsc-testnet
yarn deploy:polygon
yarn deploy:polygon-testnet
```

## Verify Contracts
**_NOTE: This verification tool is not as robust as [truffle-plugin-verify](https://www.npmjs.com/package/truffle-plugin-verify). May add truffle specifically for that :thinking:_**

To try out Etherscan verification, you first need to deploy a contract to an Ethereum network that's supported by Etherscan, such as Ropsten.

In this project, copy the .env.template file to a file named .env, and then edit it to fill in the details. Enter your Etherscan API key, your Ropsten node URL (eg from Alchemy), and the private key of the account which will send the deployment transaction. With a valid .env file in place, first deploy your contract:

After deployment, copy the deployment address and paste it in to replace `DEPLOYED_CONTRACT_ADDRESS` in this command:

```shell
npx hardhat verify --network ropsten DEPLOYED_CONTRACT_ADDRESS "Hello, Hardhat!"
```

## Development Blockchain

Use hardhat's built in blockchain node to run tests locally.

```bash
yarn testrpc
```

# Scripts & Tasks

<!-- TODO: Provide info on writing and running scripts -->
<!-- TODO: Provide info on writing and running tasks -->

# Code Formatting

Eslint, prettier and solhint are provided to provide TS and Solidity code linting/fixing.

```bash
yarn eslint
yarn eslint:fix
yarn prettier
yarn prettier:fix
yarn solhint
yarn solhint:fix
yarn lint # Run all linters
yarn lint:fix # Run all fixes
```
