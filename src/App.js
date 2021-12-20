import './App.css';
import { ethers } from 'ethers';
import { useState } from 'react';

function App() {
  const [name, setName] = useState("");
  const handleWalletConnect = async () => {
    const { ethereum } = window;
    if(ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum)
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner()
      const address = await signer.getAddress()
      const ens = await provider.lookupAddress(address);
      if (ens !== null) {
        setName(ens)
      } else {
        setName(address)
      }
    } else {
      alert('no wallet detected!')
    }
  }
  return (
    <div className="App">
      <button className ="button" onClick={() => handleWalletConnect()}>connect</button>
      <h1>{name}</h1>
    </div>
  );
}

export default App;
