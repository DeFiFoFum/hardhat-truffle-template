require("dotenv").config();
import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import '@nomiclabs/hardhat-ethers'
import "@nomiclabs/hardhat-waffle";
import "hardhat-gas-reporter";
import "solidity-coverage";
import '@typechain/hardhat'
import { task } from "hardhat/config";

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more


const mainnetAccounts = {
  mnemonic: process.env.MAINNET_MNEMONIC || ''
}
const testnetAccounts = {
  mnemonic: process.env.TESTNET_MNEMONIC || 'test test test test test test test test test test test junk'
}

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const config: HardhatUserConfig = {
  solidity: "0.8.4",
  networks: {
    hardhat: {
      initialBaseFeePerGas: 0, // workaround from https://github.com/sc-forks/solidity-coverage/issues/652#issuecomment-896330136 . Remove when that issue is closed.
    },
    localhost: {
      initialBaseFeePerGas: 0, // workaround from https://github.com/sc-forks/solidity-coverage/issues/652#issuecomment-896330136 . Remove when that issue is closed.
    },
    ropsten: {
      url: process.env.ROPSTEN_URL || "",
      accounts: testnetAccounts,
    },
    bsc: {
      url: process.env.BSC_URL || "https://bsc-dataseed1.binance.org",
      chainId: 56,
      accounts: mainnetAccounts,
      gas: 'auto',
      gasPrice: 'auto',
    },
    "bsc-testnet": {
      url: process.env.BSC_TESTNET_URL || "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      accounts: testnetAccounts,
      gas: 'auto',
      gasPrice: 'auto',
    },
    polygon: {
      url: process.env.POLYGON_URL || "https://matic-mainnet.chainstacklabs.com",
      chainId: 137,
      accounts: mainnetAccounts,
      gas: 'auto',
      gasPrice: 'auto',
    },
    "polygon-testnet": {
      url: process.env.POLYGON_TESTNET_URL || "https://rpc-mumbai.maticvigil.com/",
      chainId: 80001,
      accounts: testnetAccounts,
      gas: 'auto',
      gasPrice: 'auto',
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
    excludeContracts: []
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;
