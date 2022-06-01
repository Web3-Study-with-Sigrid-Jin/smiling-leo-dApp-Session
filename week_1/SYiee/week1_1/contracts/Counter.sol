// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Counter {
    uint256 private count = 0;

    constructor(uint256  _num) {
        console.log("Deploying:", _num);
        count = _num;
    }

    function incrementCounter() public {
        count += 1;
    }
    function decrementCounter() public {
        count -= 1;
    }

    function getCount() public view returns (uint256) {
        return count;
    }

}