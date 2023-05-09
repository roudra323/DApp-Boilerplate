import abi from "../artifacts/contracts/Message.sol/Message.json";
import { useAccount } from "wagmi";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./App.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "decentraland-ui";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const { address, isConnected, isDisconnected } = useAccount();

  const contractInstance = async () => {
    const contractAddress = "0x536cd2A9AC896D68256ae58AEd405d5689c36c3F";
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

  const handleShowMessageClick = async () => {
    if (state.contract) {
      const message = await state.contract.readMsg(
        "0xCb62E7568819fd5C67A4A44cC485388a2969E42C"
      );
      console.log("Message:", message);
    }
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
      <div className="show-msg">
        <Button onClick={handleShowMessageClick}>Show Message</Button>
      </div>
    </div>
  );
}

export default App;
