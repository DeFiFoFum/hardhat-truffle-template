import { getDeploymentVariables } from '../deploy.config';
import { Greeter } from '../typechain-types'

module.exports = (artifacts: any) => { // Truffle.Artifacts
  return async (
    deployer: any, // Truffle.Deployer Possible type: (https://github.com/machinomy/types-truffle-deployer/blob/master/index.d.ts)
    network: string,
    accounts: string[]
  ) => {
    const Greeter = artifacts.require("Greeter");
    const deploymentVariables = getDeploymentVariables(network, accounts);

    await deployer.deploy(Greeter, "Hello World!");
    // Use Typechain types to have typesafe contracts
    const greeter = await Greeter.at(Greeter.address) as Greeter;
    // example of using typechain:
    // await greeter.setGreeting('Set a greeting');

    console.dir({
      greeter: greeter.address,
    })

    console.log(`\n-> Finished deploying contracts to network ${network}.`)
  };
};