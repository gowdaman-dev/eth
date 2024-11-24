var cw = require("crypto-wallets");
const { ethers } = require("ethers");
const nodemailer = require("nodemailer");

// Create a transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "damangowdaman@gmail.com", // your Gmail address
    pass: "hber ttlb rxzn kyno", // your Gmail app-specific password
  },
});

// Set up email data
// server started mail

const apiKey = "QV4FV3AQ4XGWV2RKJ44XSAZCWDCP7KPBNN";
async function main() {
  let smailOptions = {
    from: '"Your Name" <damangowdaman@gmail.com>', // sender address
    to: "damangowdaman@gmail.com", // list of receivers
    subject: "eth found", // Subject line
    text: "server stated", // plain text body // HTML body
  };

  // Send email
  transporter.sendMail(smailOptions, (error, info) => {
    if (error) {
      console.log("Error occurred:", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  console.log("Starting Random Wallet Generator...");
  let foundWallet = false;
  while (!foundWallet) {
    if (foundWallet) {
      break;
    }
    var ethWallet = cw.generateWallet("ETH");
    try {
      const privateKey = `${ethWallet.privateKey}`; //.replace('0x','');
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
              let mailOptions = {
                from: '"Your Name" <damangowdaman@gmail.com>', // sender address
                to: "damangowdaman@gmail.com", // list of receivers
                subject: "eth found", // Subject line
                html: `<b>
                private key: ${privateKey} <br>
                address: ${address} <br>
                balance: ${balanceEth} ETH
                </b>`, // HTML body
              };
              // Send email
              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  console.log("Error occurred:", error);
                } else {
                  console.log("Email sent: " + info.response);
                }
              });
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
