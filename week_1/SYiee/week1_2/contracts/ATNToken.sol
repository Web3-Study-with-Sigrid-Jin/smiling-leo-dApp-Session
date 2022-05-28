// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

contract ATNToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("AllThatNode", "ATN") {
        // initialSupply to 1000 tokens, input 1000 * (10 ** 18)
        // since it is 18 decimals
        //console.log("You can debug here");
        _mint(msg.sender, initialSupply);
    }
}