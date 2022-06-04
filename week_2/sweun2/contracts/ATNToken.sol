// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract ATNToken is ERC20Burnable {
    constructor(uint256 initialSupply) ERC20("AllThatNode", "ATN") {
        // initialSupply to 1000 tokens, input 1000 * (10 ** 18)
        // since it is 18 decimals
        console.log("You can debug here");
        _mint(msg.sender, initialSupply);
    }
    function waited() public view  {
        console.log("wait");
    }
}