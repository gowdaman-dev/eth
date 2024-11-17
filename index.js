var cw = require("crypto-wallets");
const { ethers } = require("ethers");

const apiKey = "QV4FV3AQ4XGWV2RKJ44XSAZCWDCP7KPBNN";
async function main() {
  console.log("Starting Random Wallet Generator...");
  let foundWallet = false;
  while (!foundWallet) {
    if (foundWallet) {
      break;
    }
    var ethWallet = cw.generateWallet("ETH");
    try {
      const privateKey = `${ethWallet.privateKey}`.replace('0x','');
      const address = ethWallet.address;
      //const address = publicKeyToAddress(publicKey);
      const url = `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${apiKey}`;
      console.log(
        `\n\n\n========================================================================================`
      );
      console.log(`| checking new wallet... \t\t\t\t\t\t\t\t|`);
      console.log(`| Private Key: ${privateKey}\t\t|`);
      console.log(`| Wallet Address: ${address}\t\t\t\t|`);
      try {
        const response = await fetch(url);
        await response.json().then((data) => {
          if (data.status === "1") {
            const balanceWei = ethers.getBigInt(data.result);
            const balanceEth = ethers.formatEther(balanceWei);
            console.log(`| assets: ${balanceEth} ETH`);
            console.log(
              `========================================================================================`
            );
            if (balanceEth > 0) {
              foundWallet = true;
            }
          }
        });
      } catch (error) {
        console.error(`HTTP Request failed: ${error.message}`);
        return null;
      }
    } catch (error) {
      console.error(
        `An unexpected error occurred: ${error.message}. Continuing...`
      );
      console.log(error);
      break;
    }
  }
}

main();
