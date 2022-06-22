//SPDX-License-Identifier: Unlicense
// ^: 0.8.x면 다 지원한다.
pragma solidity ^0.8.0;

// console을 import해서 console.log 갖다 쓴다고 한다.
import "hardhat/console.sol";

// contract = class
// 컨트랙은 한번 배포하면 끝. class처럼 찍어낼 수 없음.
// 컨트랙을 새로 배포해야 instance를 새로 만들 수 있음. 코드의 재사용 불가
// 공간 낭비: 이더리음 블록체인에는 10,000개의 ERC-20 컨트랙트 파일이 올라와 있다.
// 코스모스 계열은 재사용이 된다고 한다.
contract Greeter {
    // Global variable로 넣으면 무조건 스토리지로 blockchain으로 저장된다.
    string private greeting;

    constructor(string memory _greeting) {
        console.log("Deploying a Greeter with greeting:", _greeting);
        greeting = _greeting;
    }

    // Getter: view: 가스비 낼 필요 없음. view만 하니까.
    function greet() public view returns (string memory) {
        return greeting;
    }

    // Setter: 가스비 낸다.
    // 요새는 parameter로 calldata로 쓰는 것이 더 맞다?
    // calldata: memory + final: 실행 과정에서 greeting을 재할당하지 못하도록 막는다.
    function setGreeting(string calldata _greeting) public {
        console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
        greeting = _greeting;
    }
}
