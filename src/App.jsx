import abi from "../artifacts/contracts/Message.sol/Message.json";
import { useAccount } from "wagmi";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./App.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";


function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const { address, isConnected, isDisconnected } = useAccount();

  const contractInstance = async () => {
    const contractAddress = "<deployed contract addess>";
    const contractABI = abi.abi;

    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        setState({ provider, signer, contract });
      } else {
        alert("Please install metamask");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isConnected) {
      contractInstance();
      console.log("Connected");
    }
  }, [isConnected]);

  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        padding: 12,
      }}
    >
      <ConnectButton onPress={contractInstance} />
      {console.log("state", state)}
    </div>
  );
}

export default App;
