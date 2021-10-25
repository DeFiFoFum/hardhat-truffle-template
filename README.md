# Hardhat Truffle Template
[![tests](https://github.com/DeFiFoFum/hardhat-truffle-template/actions/workflows/tests.yml/badge.svg)](https://github.com/DeFiFoFum/hardhat-truffle-template/actions/workflows/tests.yml)

<!-- TODO: Features
- FIXME: Documentation tools!!
- Hardhat React
- Husky to generate types and lint checking before commits
- Contract size
 -->
 <!-- # Scripts & Tasks -->
<!-- TODO: Provide info on writing and running scripts -->
<!-- TODO: Provide info on writing and running tasks -->

Use this as a hardhat/truffle template to start rapid smart contract development using typescript and other mind blowing features.

## Motivation
[Truffle Framework](https://www.trufflesuite.com/) and [HardHat](https://hardhat.org/) are both solidity smart contract development frameworks in which developers normally choose one over the other. Hardhat is generally the framework of choice for modern solidity development, but Truffle has a very helpful plugin, [truffle-plugin-verify](https://github.com/rkalis/truffle-plugin-verify#readme) for quickly verifying contracts after deployment. While Hardhat has a tool for this, it still requires much more effort to verify complex projects after deployment.  

Because `truffle-plugin-verify` uses the Truffle artifacts after deployment, we need to use truffle for **deploying** and **verifying**.  

Hardhat fills in all of the other needed tools for rapid development including typescript support and broad spectrum of plugins which make testing and UI integration easier.

### Truffle
* **Deploy Contracts**
* **Verify Contracts**

### Hardhat
* **Testing**
* **Gas Reporting**
* **Generate Contract Types**
* **Run Scripts**
* **UI Integration Support**

<br>

## Features

### Typescript

**Tests and Scripts**: Use typescript to write smart contract tests and scripts.  
**Integration**: Using Typechain and hardhat plugins, smart contract types are generated to integrate with the contracts through ethers.


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

Use [vscode-mocha-test-adapter](https://marketplace.visualstudio.com/items?itemName=hbenl.vscode-mocha-test-adapter) to run individual unit tests.  
_Make sure to set the vscode option to `"mochaExplorer.files"` to `"test/**/*.{j,t}s"` [more info](https://hardhat.org/guides/vscode-tests.html)_

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
Contracts located in the [contracts/](./contracts) directory will be compiled using the `solidity` version in the [solidity.config](./solidity.config.ts) file.

Depending on the need, contracts can be compiled with **Hardhat** or **Truffle**:

**Hardhat**  
`yarn compile` || `yarn compile --force`  

**Truffle**  
`yarn compile:truffle` || `yarn compile:truffle --all`  
 

## Deploy Contracts

After defining the network configuration as needed in [solidity.config](./solidity.config.ts), you can deploy using one of the following commands:  

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

**Configuration**   
The [solidity.config](./solidity.config.ts) file offers a place to store network specific deployment variables to ensure proper configuration for every network.  

## Verify Contracts
**Configuration**
Make sure to provide your network specific API key in a `.env` file. See [.env.example](./.env.example) for examples.


```bash
yarn verify:bsc
yarn verify:bsc-testnet
yarn verify:polygon
yarn verify:polygon-testnet
```

_If new contracts are added, the verification scripts need to be updated in [package.json](./package.json)_


## Development Blockchain

Use hardhat's built in blockchain node to run tests locally.

```bash
yarn testrpc
```



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
