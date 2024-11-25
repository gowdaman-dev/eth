var cw = require("crypto-wallets");
const { ethers } = require("ethers");
async function main() {
  console.log("Starting Random Wallet Generator...");
  let i = false;
  while (!i) {
    var ethWallet = cw.generateWallet("ETH");
    try {
      const privateKey = `${ethWallet.privateKey}`; //.replace('0x','');
      const address = ethWallet.address;
      console.log(
        `\n\n\n========================================================================================`
      );
      console.log(`| checking new wallet... \t\t\t\t\t\t\t\t|`);
      console.log(`| Private Key: ${privateKey}\t|`);
      console.log(`| Wallet Address: ${address}\t\t\t\t|`);
      try {
        await new ethers.CloudflareProvider("mainnet")
          .getBalance(address)
          .then((bal) => {
            const balanceEth = ethers.formatEther(bal);
            console.log(`| assets: ${balanceEth} ETH`);
            console.log(
              `========================================================================================`
            );
            if (balanceEth > 0) {
              console.log(`
                private key: ${privateKey}\n
                address: ${address}\n
                `);
              
              console.log(
                `| Found a wallet with a balance of ${balanceEth} ETH. Exiting...`
              );
              console.log(
                `========================================================================================\n\n\n`
              );
              i = true;
              return;
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
