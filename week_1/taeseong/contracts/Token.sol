//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

contract TSToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("TAESEONG", "TS") {
        
        _mint(msg.sender, initialSupply);
    }
}