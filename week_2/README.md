# 2주차 미션: 간단 Token Transfer 사이트 구현하기

## 미션 설명

* 프론트엔드에서 `Transfer` 버튼과 `burn` 버튼을 누르면, 스마트 컨트랙트에서 `Transfer` 과 `burn` 메소드가 실행되는 트랜잭션이 실행되는 간단한 웹 사이트를 구현한다.

## 필요 지식

* React.js를 활용한 기초적인 프론트엔드 지식 이해하기: `useState` 및 `useEffect`
* 이더리움 통신 라이브러리 사용하기: `ethers.js` 및 `web3.js` 의 역할과 차이점을 설명할 수 있다.
* 메타마스크 지갑 API 및 Provider 사용하기: `ethereum object` 사용법을 찾아보고, 이를 적용할 수 있다.
* 블록체인 네트워크는 각각의 ID가 있으며, 이러한 네트워크 ID를 활용하여 네트워크 표시 및 전환 등 필요한 기능을 구현할 수 있다.
* Solidity의 `event` 기능에 대해 이해할 수 있고, 이를 프론트엔드에서 Web Hook 처럼 활용할 수 있다.
* Ethereum 컨트랙트의 `verify` 기능의 중요성을 이해하고, 직접 본인의 바이트코드를 `verify` 할 수 있다.

## 컨트랙트 구현 요구사항

* 지난 1주차 미션에서 활용한 ERC20 컨트랙트를, Etherscan에서 `verify` 한다.
* 본인이 배포한 컨트랙트 주소 및 ABI 파일을 활용하여, 프론트엔드 요구사항을 구현한다.

## 프론트엔드 구현 요구사항

다음의 요구사항을 구현해주세요. 현재 6단계까지 구현된 예시는 [여기](https://github.com/Web3-Study-with-Sigrid-Jin/smiling-leo-dApp-Session/tree/week2-frontend)에서 확인하실 수 있습니다.

* 1단계: 현재 브라우저에 메타마스크 지갑이 설치되어 있는지 확인할 수 있다.
* 2단계: 메타마스크 지갑이 설치되어 있다면, 웹 사이트에 메타마스크 지갑을 연결할 수 있다.
* 3단계: Rinkeby Network에 연결되어 있지 않다면, 해당 네트워크로 연결 요청하는 메시지를 표시할 수 있다.
* 4단계: 토큰을 보낼 이더리움 지갑 주소, 토큰을 보낼 갯수를 입력할 수 있다.
* 5단계: 프론트엔드의 `Transfer` 버튼을 누르면, ERC20 컨트랙트의 `Transfer` 메소드가 실행된다.
* 6단계: Solidity의 `event` 후크 기능을 활용하여, 토큰 전송이 완료된 후 `Transfer` 이벤트가 성공적으로 `emit` 되었을 때 프론트엔드에서 토큰 전송 사실을 사용자에게 노출한다.
* 7단계: 프론트엔드의 `burn` 버튼을 누르면, ERC20 컨트랙트의 `burn` 메소드가 실행된다.
* 8단계: `fleek.co` 에서 완성된 정적 페이지를 배포한다.
* (선택) 9단계: 간단한 CSS 마크업을 통해 `input` 태그에 스타일링을 수행한다.

## 학습 정리 요구사항

아래 학습 질문에 대해, 최소 500자 이내로 대답해주세요.

* ethers.js와 web3.js는 React.js 라이브러리 내에서 어떠한 역할을 하며, 무슨 차이가 있나요?
* ethers.js의 동작 방식은 어떻게 되는지 그림을 그려 설명해주세요.
* Ethereum에서 Provider란 무엇인가요? 지갑마다 Provider는 서로 다르게 구현되어 있나요?
  * 만약 그렇다면, Provider가 파편화되는 문제가 발생하지 않을까요? 어떻게 해결할 수 있을까요?
* Solidity의 `event` 기능에 대해 설명해주세요. 프론트엔드에서 웹 후크에 대한 개념을 찾아보고, Solidity의 `event` 개념을 활용하여 어떻게 웹 후크를 구현할 수 있을 지 설명해주세요.
* Ethereum 컨트랙트에서 `verify` 가 중요한 이유를 설명해주세요. 또한, `verify` 되는 과정을 그림으로 설명해주세요.

## 과제 제출

* `week_2` 폴더 내부에 본인의 아이디로 새로운 디렉토리를 생성하시고, 해당 디렉토리 안에서 컨트랙트 및 프론트엔드 작업을 수행해주세요.
* 프론트엔드 구현 요구사항의 경우, 반드시 단계 별로 커밋이 이루어지도록 한다.
  * 1단계 커밋 예시: `feat: check whether Metamask wallet is connected or not`

* Pull Request를 보낼 때, 본인이 구현한 단계 및 배포한 정적 페이지 링크를 함께 달아주시기 바랍니다.

```
[2주차 과제 홍길동 제출합니다.]
### 과제 구현 사항
* [x] 1단계: 현재 브라우저에 메타마스크 지갑이 설치되어 있는지 확인할 수 있다.
* [x] 2단계: 메타마스크 지갑이 설치되어 있다면, 웹 사이트에 메타마스크 지갑을 연결할 수 있다.

...

### 배포 링크
loremipsum.fleek.co
```

## 학습 참고 링크

* [Metamask Documentation](https://docs.metamask.io/guide/rpc-api.html#unrestricted-methods)
* [AllThatNode Tutorials](https://docs.allthatnode.com/tutorials/minting-a-simple-erc721-nft#deploy-to-rinkeby-testnet-network)
* [ethers.js](https://docs.ethers.io/v5/api/contract/contract/)
* [Ethereum Wiki](https://eth.wiki/json-rpc/API#eth_accounts)
* [React Tutorial](https://ko.reactjs.org/tutorial/tutorial.html)
* [Buildspace](https://buildspace.so/p/build-polygon-ens)