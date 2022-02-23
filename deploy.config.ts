/**
 * Use this file to configure project wide solc and deployment details.
 * 
 * - Change the compiler version and optimizer settings in `solcConfig`
 * - Add networks to the `networkConfig` by creating a new property with the name of the network
 * - Provide network details based on the `Network` interface
 * - Update the `DeploymentVariables` interface to provide different variables based on your needs.
 * - Provide the proper deployment variables in the `networkConfig` 
 */
require("dotenv").config();

/**
 * solc Config
 */
interface SolcConfig {
    version: string;
    settings: {
        optimizer: {
            enabled: boolean;
            runs: number;
        }
    }
}

/**
 * Set the compiler version and optimization settings for the project
 */
export const solcConfig: SolcConfig = {
    version: "0.8.4", // Fetch exact version from solc-bin (default: truffle's version)
    settings: { // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
            enabled: true,
            runs: 200
        },
    }
}

/**
 * Network Config
 */
// Use this interface to define variables passed during deployment
interface DeploymentVariables {
    proxyAdminAddress: string;
    adminAddress: string;
    wNative: string;
}

interface Network {
    rpcUrl: string;
    chainId: number;
    mnemonic: string;
    deploymentVariables: DeploymentVariables;
}

interface NetworkConfig {
    [key:string]: Network
}

export const mainnetMnemonic = process.env.MAINNET_MNEMONIC || '';
export const testnetMnemonic = process.env.TESTNET_MNEMONIC || '';


const MAINNET_PROXY_ADMIN = '0x50Cf6cdE8f63316b2BD6AACd0F5581aEf5dD235D' // General Admin [GSafe]
const MAINNET_ADMIN = '0xA75125CF0A7be136D6745B39DB1FeBadE269ba4D' // General Proxy Admin [GSafe]

const TESTNET_PROXY_ADMIN = '0x56Cb8F9199A8F43933cAE300Ef548dfA4ADE7Da0'
const TESTNET_ADMIN = '0xE375D169F8f7bC18a544a6e5e546e63AD7511581'


/**
 * Add networks to the project
 */
export const networkConfig: NetworkConfig = {
    ropsten: {
        rpcUrl: process.env.ROPSTEN_URL || "",
        chainId: 3,
        mnemonic: testnetMnemonic,
        deploymentVariables: {
            proxyAdminAddress: TESTNET_PROXY_ADMIN,
            adminAddress: TESTNET_ADMIN,
            wNative: '0x',
        }
    },
    bsc: {
        rpcUrl: process.env.BSC_URL || "https://bsc-dataseed1.binance.org",
        chainId: 56,
        mnemonic: mainnetMnemonic,
        deploymentVariables: {
            proxyAdminAddress: MAINNET_PROXY_ADMIN,
            adminAddress: MAINNET_ADMIN,
            wNative: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
        }
    },
    "bsc-testnet": {
        rpcUrl: process.env.BSC_TESTNET_URL || "https://data-seed-prebsc-1-s1.binance.org:8545",
        chainId: 97,
        mnemonic: testnetMnemonic,
        deploymentVariables: {
            proxyAdminAddress: TESTNET_PROXY_ADMIN,
            adminAddress: TESTNET_ADMIN,
            wNative: '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
        }
    },
    polygon: {
        rpcUrl: process.env.POLYGON_URL || "https://matic-mainnet.chainstacklabs.com",
        chainId: 137,
        mnemonic: mainnetMnemonic,
        deploymentVariables: {
            proxyAdminAddress: MAINNET_PROXY_ADMIN,
            adminAddress: MAINNET_ADMIN,
            wNative: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
        }
    },
    "polygon-testnet": {
        rpcUrl: process.env.POLYGON_TESTNET_URL || "https://rpc-mumbai.maticvigil.com/",
        chainId: 80001,
        mnemonic: testnetMnemonic,
        deploymentVariables: {
            proxyAdminAddress: TESTNET_PROXY_ADMIN,
            adminAddress: TESTNET_ADMIN,
            wNative: '0x',
        }
    },
}

const getKeyValue = <T extends object, U extends keyof T>(obj: T) => (key: U) =>
  obj[key];

export function getDeploymentVariables(network: string, accounts: string[]): DeploymentVariables {
    // On dry runs, the network is appended with '-fork'
    const parsedNetwork = network.replace('-fork', '');
    // Set arguments for the development chain
    if (['development'].includes(parsedNetwork)) {
        console.log(`Deploying with development config.`)
        return {
            proxyAdminAddress: accounts[1],
            adminAddress: accounts[0],
            wNative: '0x',
        }
    }

    const currentNetworkConfig  = getKeyValue(networkConfig)(parsedNetwork);
    if (!currentNetworkConfig || !currentNetworkConfig.deploymentVariables) {
        throw new Error(`No deployment variables found for network ${network}.`);
    }
    console.log(`Deploying with ${parsedNetwork} config.`)
    return currentNetworkConfig.deploymentVariables;
}