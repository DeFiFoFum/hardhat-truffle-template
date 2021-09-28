import { networkConfig, solcConfig, mainnetMnemonic, testnetMnemonic } from './solidity.config';
import { HardhatUserConfig } from "hardhat/config";
import { HttpNetworkUserConfig } from "hardhat/types";
import '@nomiclabs/hardhat-ethers'
import "@nomiclabs/hardhat-waffle";
import "hardhat-gas-reporter";
import "solidity-coverage";
import '@typechain/hardhat'
import { task } from "hardhat/config";

/**
 * Setup tasks
 */
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});



/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const baseConfig: HardhatUserConfig = {
  solidity: solcConfig,
  networks: {
    hardhat: {
      initialBaseFeePerGas: 0, // workaround from https://github.com/sc-forks/solidity-coverage/issues/652#issuecomment-896330136 . Remove when that issue is closed.
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
    excludeContracts: []
  },
};

/**
 * Because this project uses both hard-hat and truffle. This allows for a singular configuration file
 * for both. 
 */
function populateNetworkConfig(config: HardhatUserConfig): HardhatUserConfig {
  for (const networkId in networkConfig) {
    const currentNetworkConfig = networkConfig[networkId];
    const hardhatNetworkConfig: HttpNetworkUserConfig = {
      url: currentNetworkConfig.rpcUrl,
      chainId: currentNetworkConfig.chainId,
      gas: 'auto',
      gasPrice: 'auto',
      accounts: {
        mnemonic: currentNetworkConfig.mnemonic,
      }
    }

    config.networks = {...config.networks, [networkId]: hardhatNetworkConfig};
  }
  return config;
}

export default populateNetworkConfig(baseConfig);
