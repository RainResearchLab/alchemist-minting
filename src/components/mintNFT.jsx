import * as React from "react";
import UserContext from "../components/User/User";
import MintAmount from "../components/MintAmount/MintAmount";
import { useReducer, useContext } from "react";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
var mintAddress = "RAAH";
var toPayWith = "";
export function MintNFT() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { mintAmount, setMintAmount } = useContext(MintAmount);
  console.log("MINT AMOUNT: " + mintAmount);
  const {config} = usePrepareContractWrite({
    address: "0x173235D2AB26ac72dD7255cf50e10b0CEA7Df374",
    abi: [
      {
        name: "mintNFT",
        type: "function",
        stateMutability: "nonpayable",
        inputs: [
          { internalType: "uint", name: "numberOfTokens", type: "uint" },
          { internalType: "address", name: "toPayWith", type: "address" },
        ],
        outputs: [],
      },
    ],
    functionName: "mintNFT",
    args: [mintAmount, toPayWith],
  });
  let mintArray = [
    "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    "0x4Fabb145d64652a948d72533023f6E7A623C7C53",
  ];
  // const config = usePrepareContractWrite({
  //   address: "0x4Fabb145d64652a948d72533023f6E7A623C7C53",
  //   abi: [
  //     {
  //       name: "approve",
  //       type: "function",
  //       stateMutability: "nonpayable",
  //       inputs: [
  //         { internalType: "address", name: "user", type: "address" },
  //         { internalType: "uint256", name: "user", type: "uint256" },
  //       ],
  //       outputs: [],
  //     },
  //   ],
  //   functionName: "approve",
  //   args: [
  //     "0x173235D2AB26ac72dD7255cf50e10b0CEA7Df374",
  //     "999999999999999999999999999999999999999",
  //   ],
  // });

  const configb = usePrepareContractWrite({
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    abi: [
      {
        name: "approve",
        type: "function",
        stateMutability: "nonpayable",
        inputs: [
          { internalType: "address", name: "user", type: "address" },
          { internalType: "uint256", name: "user", type: "uint256" },
        ],
        outputs: [],
      },
    ],
    functionName: "approve",
    args: [
      "0x173235D2AB26ac72dD7255cf50e10b0CEA7Df374",
      "999999999999999999999999999999999999999",
    ],
  });
  const configc = usePrepareContractWrite({
    address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    abi: [
      {
        name: "approve",
        type: "function",
        stateMutability: "nonpayable",
        inputs: [
          { internalType: "address", name: "user", type: "address" },
          { internalType: "uint256", name: "user", type: "uint256" },
        ],
        outputs: [],
      },
    ],
    functionName: "approve",
    args: [
      "0x173235D2AB26ac72dD7255cf50e10b0CEA7Df374",
      "999999999999999999999999999999999999999",
    ],
  });
  const configd = usePrepareContractWrite({
    address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    abi: [
      {
        name: "approve",
        type: "function",
        stateMutability: "nonpayable",
        inputs: [
          { internalType: "address", name: "user", type: "address" },
          { internalType: "uint256", name: "user", type: "uint256" },
        ],
        outputs: [],
      },
    ],
    functionName: "approve",
    args: [
      "0x173235D2AB26ac72dD7255cf50e10b0CEA7Df374",
      "999999999999999999999999999999999999999",
    ],
  });
  if (currentUser.toMintWith == "Binance USD (BUSD)") {
    toPayWith = "0x4Fabb145d64652a948d72533023f6E7A623C7C53";
    mintAddress = config;
  } else if (currentUser.toMintWith == "USD Coin (USDC)") {
    toPayWith = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
    mintAddress = configb;
  } else if (currentUser.toMintWith == "DAI Algo Stable (DAI)") {
    toPayWith = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
    mintAddress = configc;
  } else if (currentUser.toMintWith == "Wrapped Ethereum (WETH)") {
    toPayWith = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
    mintAddress = configd;
  } else {
    toPayWith = "0x4Fabb145d64652a948d72533023f6E7A623C7C53";
    mintAddress = config;
  }

  const configda  = usePrepareContractWrite({
    address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    abi: [
      {
        name: 'approve',
        type: 'function',
        stateMutability: 'nonpayable',
        inputs: [{ internalType: 'address', name: 'user', type: 'address' },{ internalType: 'uint256', name: 'user', type: 'uint256' }],
        outputs: [],
      },
    ],
    functionName: 'approve',
    args: ["0x173235D2AB26ac72dD7255cf50e10b0CEA7Df374","999999999999999999999999999999999999999"],
  })

  const { data, isLoading, isSuccess, write } = useContractWrite(configda)

  return (
    <div>
      <button onClick={() => write}>
        {isLoading ? "Minting..." : "Mint"}
      </button>
      {isSuccess && (
        <div style={{ color: "green" }}>
          Successfully minted your NFT!
          <div>
            <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
          </div>
        </div>
      )}
    </div>
  );
}
