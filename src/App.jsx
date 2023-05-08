import abi from "../artifacts/contracts/Message.sol/Message.json";
import { useContract, useSigner } from "wagmi";
import "./App.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";

function App() {
  const { signer } = useSigner();
  const contract = useContract({
    address: "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
    abi: abi.abi,
    signerOrProvider: signer,
  });

  if (contract) {
    console.log("contract", contract);
  } else {
    console.log("contract not found");
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        padding: 12,
      }}
    >
      <ConnectButton />
    </div>
  );
}

export default App;
