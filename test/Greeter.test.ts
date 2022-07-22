import { ethers } from "hardhat";
import { Signer } from "ethers";
import { expect } from "chai";
// helpers
const {
  BN,           // Big Number support
  constants,    // Common constants, like the zero address and largest integers
  expectEvent,  // Assertions for emitted events
  expectRevert, // Assertions for transactions that should fail
} = require('@openzeppelin/test-helpers');
// import { advanceNumBlocks } from './helpers/openzeppelinExtensions'
// typechain
import { Greeter } from '../typechain-types'

describe("Greeter", function () {
  let accounts: Signer[];

  beforeEach(async function () {
    accounts = await ethers.getSigners();
  });

  it("Should return the new greeting once it's changed", async function () {
    const Greeter = await ethers.getContractFactory("Greeter");
    // using typechain for typesafe contracts
    const greeter = await Greeter.deploy("Hello, world!") as Greeter;
    await greeter.deployed();

    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
