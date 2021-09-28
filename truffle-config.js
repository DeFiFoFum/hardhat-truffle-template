/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * trufflesuite.com/docs/advanced/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like @truffle/hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 */
// Use ts-node to import ts files
require("ts-node").register({
  files: true,
});

const HDWalletProvider = require('@truffle/hdwallet-provider');
const { networkConfig, solcConfig } = require('./solidity.config.ts');

 const baseConfig = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard BSC port (default: none)
      network_id: "*",       // Any network (default: none)
    },
  },
  plugins: [
    'truffle-plugin-verify',
  ],
  api_keys: {
    etherscan: process.env.ETHERSCAN_API_KEY,
    bscscan: process.env.BSCSCAN_API_KEY,
    polygonscan: process.env.POLYGONSCAN_API_KEY,
    hecoinfo: process.env.HECOINFO_API_KEY,
    ftmscan: process.env.FTMSCAN_API_KEY,
  },
  // Configure your compilers
  compilers: {
    solc: solcConfig,
  }
}

/**
 * Because this project uses both hard-hat and truffle. This allows for a singular configuration file
 * for both. 
 */
function populateNetworkConfig(config) {
  for (const networkId in networkConfig) {
    const currentNetworkConfig = networkConfig[networkId];
    const truffleNetworkConfig = {
      provider: () => new HDWalletProvider(currentNetworkConfig.mnemonic, currentNetworkConfig.rpcUrl),
      network_id: currentNetworkConfig.chainId,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    }

    config.networks = {...config.networks, [networkId]: truffleNetworkConfig};
  }
  return config;
}

module.exports = populateNetworkConfig(baseConfig);