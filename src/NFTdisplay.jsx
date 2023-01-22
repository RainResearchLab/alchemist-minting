import React, { useState, useEffect } from 'react';

function NFTsDisplay({address, contractAddress}) {
  const [nftsHeld, setNftsHeld] = useState(0);

  useEffect(() => {
    async function getNFTsHeldByAddress() {
      // Connect to the Ethereum blockchain and get the number of NFTs held by the address
      // using the web3.js library as described in the previous answer
      const nfts = await contract.methods.balanceOf(address).call();
      setNftsHeld(nfts);
    }
    getNFTsHeldByAddress();
  }, [address, contractAddress]);

  return (
    <div>
      <p>Number of NFTs held by {address}: {nftsHeld}</p>
    </div>
  );
}

export default NFTsDisplay;
