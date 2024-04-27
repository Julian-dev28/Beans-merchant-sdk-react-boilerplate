import React, { useState, useEffect } from "react";
import * as StellarSdk from "@stellar/stellar-sdk";
import { BeansMerchantSdkEnvironment } from "../sdk/environment";
const accountId = `${BeansMerchantSdkEnvironment.ACCOUNT_ID}`;
const server = new StellarSdk.Horizon.Server("https://horizon.stellar.org");

interface Balance {
  asset_type: string;
  balance: number;
}

const Account: React.FC = () => {
  const [accountBalances, setAccountBalances] = useState<Balance[]>([]);

  const getBalance = async () => {
    // const account = await server.loadAccount(accountId);
    // console.log("Balances for account: " + accountId);
    // account.balances.forEach(function (balance) {
    //   console.log("Type:", balance.asset_type, ", Balance:", balance.balance);
    // });
    try {
      const loadedAccount = await server.loadAccount(accountId);

      console.log("Balances for account: " + accountId);
      loadedAccount.balances.forEach(function (balance) {
        console.log("Type:", balance.asset_type, ", Balance:", balance.balance);
      });

      const convertedBalances = loadedAccount.balances.map((balance) => ({
        ...balance,
        asset_type: convertAssetType(balance.asset_type), // Convert asset type
        balance: balance.balance.toString(),
      })) as unknown as Balance[];

      setAccountBalances(convertedBalances);
    } catch (error) {
      console.error("Failed to fetch account balances:", error);
    }
  };

  useEffect(() => {
    getBalance();
  }, []);

  const convertAssetType = (assetType: string): string => {
    switch (assetType) {
      case "native":
        return "XLM";
      case "credit_alphanum4":
        return "USDC";
      // Add more cases for other asset types if needed
      default:
        return assetType;
    }
  };

  return (
    <div className="account-container">
      <h1 className="account-heading">Account Balances</h1>
      <h4 className="account-id">
        Treasury:{" "}
        <a
          href="https://stellar.expert/explorer/public/account/GB3I2Q2G2VHHNRYXILFVVXFY5GF6XQVFYUV4YGUDV7WKZJZVCKHSWJYI"
          target="_blank"
          rel="noopener noreferrer"
        >
          {accountId}
        </a>
      </h4>

      <ul className="balance-list">
        {accountBalances.map((balance, index) => (
          <li key={index} className="balance-item">
            <strong>Type:</strong> {balance.asset_type},{" "}
            <strong>Balance:</strong> {balance.balance}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Account;
