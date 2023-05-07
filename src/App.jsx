import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Routes, Route } from "react-router-dom";
import abi from "../artifacts/contracts/Message.sol/Message.json";
import "./App.css";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  const [account, setAccount] = useState("None");
  const [isConnected, setIsConnected] = useState(false);
  const [hovered, setHovered] = useState(false);

  const connectWallet = async () => {
    const contractAddress = "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4";
    const contractABI = abi.abi;

    try {
      const { ethereum } = window;

      if (ethereum) {
        await ethereum.request({ method: "eth_requestAccounts" });

        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });

        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        const accounts = await provider.listAccounts();
        setAccount(accounts[0]);
        setState({ provider, signer, contract });
        setIsConnected(true);
      } else {
        alert("Please install metamask");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      {isConnected ? (
        <button
          className="connect-wallet float-end"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {hovered ? `connected account:${account}` : "Connected"}
        </button>
      ) : (
        <button className="connect-wallet float-end" onClick={connectWallet}>
          Connect Wallet
        </button>
      )}
    </div>
  );
}

export default App;
