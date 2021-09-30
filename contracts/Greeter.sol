//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.4;

import "hardhat/console.sol";

contract Greeter {
    string private greeting;

    constructor(string memory newGreeting) {
        console.log("Deploying a Greeter with greeting:", newGreeting);
        greeting = newGreeting;
    }

    function greet() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory newGreeting) public {
        console.log("Changing greeting from '%s' to '%s'", greeting, newGreeting);
        greeting = newGreeting;
    }
}
