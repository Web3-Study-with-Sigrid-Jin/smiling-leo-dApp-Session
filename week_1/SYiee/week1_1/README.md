# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```

# Deploy to Testnet
-Rinkeby

![image](https://user-images.githubusercontent.com/79504024/169883966-f32b860b-4897-4f62-9a48-ff20d6453de6.png)
![image](https://user-images.githubusercontent.com/79504024/169883947-a2a0748d-398f-4258-b533-3277c59ce1bc.png)

-Baobab

![image](https://user-images.githubusercontent.com/79504024/169883897-c118366f-264a-448d-be5e-b0e07becf179.png)
![image](https://user-images.githubusercontent.com/79504024/169883876-7acba1c7-80b4-48f1-adb3-fe031dd5dec8.png)


처음 Baobab 테스트넷에 올릴 때
```shell
ProviderError : Invalid unit price
```
에러가 계속 발생하여
```shell
  gas: 8500000,
  gasPrice: 250000000000,
  saveDeployments: true
```
가스비를 조정하였더니 제대로 동작하였다.
