import { getDeploymentVariables } from '../solidity.config';

module.exports = (artifacts: any) => { // Truffle.Artifacts
  return async (
    deployer: any, // Truffle.Deployer Possible type: (https://github.com/machinomy/types-truffle-deployer/blob/master/index.d.ts)
    network: string,
    accounts: string[]
  ) => {
    const Greeter = artifacts.require("Greeter");
    const deploymentVariables = getDeploymentVariables(network, accounts);

    await deployer.deploy(Greeter, "Hello World!");
    const greeter = await Greeter.at(Greeter.address);

    console.dir({
      greeter: greeter.address,
    })

    console.log(`\n-> Finished deploying contracts to network ${network}.`)
  };
};