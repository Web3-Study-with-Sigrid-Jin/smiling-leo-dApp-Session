//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyERC20 is ERC20, Ownable {

    // Indexed keyword: 이 이벤트들을 필터할 수 있는 parameter로서
    // 해당 input을 사용할 수 있게 해 준다.
    // event Transfer(address indexed from, address indexed to, uint256 value);
    // event Approved(address indexed owner, address indexed spender, uint256 value);
    address private _owner;

    constructor(uint256 initSupply) ERC20("MyToken123123", "MTTT") {
        // Create Token and Assign it to Creator
        _owner = msg.sender;
        _mint(msg.sender, initSupply);
    }
} 