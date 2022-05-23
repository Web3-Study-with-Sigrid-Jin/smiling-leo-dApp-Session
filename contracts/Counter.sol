// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Counter {
    int private count = 0;

    constructor(int _count) {
        count = _count;
    }

    function incrementCounter() public {
        count++;
    }
    function decrementCounter() public {
        count--;
    }

    function getCount() public view returns (int) {
        return count;
    }
}