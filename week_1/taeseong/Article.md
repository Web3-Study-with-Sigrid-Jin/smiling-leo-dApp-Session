## Truffle, Hardhat

이더리움 소프트웨어를 컴파일, 배포, 테스트, 디버그할 수 있는 개발 환경이다.

## AllThatNode, Infura, Alchemy

Provider의 역할을 한다.
Provider는 이더리움 노드와 통신하는 통로다.

## ABI

Hardhat에서 솔리디티를 컴파일하면 뱉어내는 것 중 하나가 ABI다.
이 ABI를 통해 컨트랙트에 올라가있는 함수를 자바스크립트로 짜여진 어플리케이션에서 사용할 수 있다.

## Metamask, Web3.js, Ethers.js

Metamask는 지갑이다. 이더리움 네트워크에 컨트랙트나 트랜잭션을 올리기 위해 필요한 공개키와 개인키를 가지고 있다.

앞서 말한 ABI 통해 솔리디티 코드와 자바스크립트 코드가 통신할 수 있다. Web3.js와 Ethers.js는 ABI를 다루는 자바스크립트 라이브러리다.

## RPC Node, Validator (DSRV, Orion Money)

네트워크에 참여하는 컴퓨터를 노드라고 칭한다.
특히 다른 노드에 명령을 주고 받을 수 있는 노드를 RPC 노드라 부른다.

Validator는 트랜잭션을 검증하는 노드를 칭한다.

## Explorer (Etherscan)

요청된 컨트랙션과 트랜잭션을 확인할 수 있다.