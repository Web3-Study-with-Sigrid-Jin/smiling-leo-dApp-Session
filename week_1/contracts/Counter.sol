//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Counter {
    uint private counter;

    constructor(uint _counter) {
        console.log("Deploying a Counter:", _counter);
        counter = _counter;
    }

    function getCount() public view returns (uint) {
        console.log("Counter:", counter);
        return counter;
    }

    function incrementCounter() public returns (uint) {
        counter+=1;
        console.log("Counter:", counter);
        return counter;
    }

    function decrementCounter() public returns (uint) {
        counter-=1;
        console.log("Counter:", counter);
        return counter;
    }

    
    
}
