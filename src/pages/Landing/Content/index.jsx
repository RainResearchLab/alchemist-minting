import { useState } from "react";
import "./index.scss";

// import components
import { PrimaryButton } from "../../../components/Buttons";
import { CrossmintPayButton } from "@crossmint/client-sdk-react-ui";
// Im gonna killmyself before I frontend dev another fukcing project
import { useContractRead } from 'wagmi'
//A
import { useReducer, useContext } from 'react';
//
import MintAmount from '../../../components/MintAmount/MintAmount';
// import wagmi
import { useAccount } from "wagmi";
import { useContract } from 'wagmi'
// import context
import { useConnectWalletModal } from "../../../contexts/ConnectWalletModalContext";
import { MintNFT } from "../../../components/mintNFT";
import { ApproveToken } from "../../../components/approve";
// import icons
import { SlWallet } from "react-icons/sl";
import { AiFillPlusSquare, AiFillMinusSquare } from "react-icons/ai";
import { GiWoodAxe } from "react-icons/gi";
const CONTRACT_ADDRESS = '0xaa3906f986e0cd86e64c1e30ce500c1de1ef46ad';
const Description = () => {
  return (
    <>
      <div>
        <div className="main-text text-white fw-bold">
          Mint The Alchemists <span className="text-primary-custom">Founding Fathers</span>{" "}
          Collection On Ethereum
        </div>
      </div>
      <img alt="alchemist" src={window.origin + "/FINALPIC1.png"} width="100%" />
    </>
  );
};

const Preview = ({ onConnect }) => {
  const { isConnected } = useAccount();
  const [quantity, setQuantity] = useState(1);
  const [nftCount, setCount] = useState(1);
  const [price, setPrice] = useState(1);
  const [remainSupply, setRemain] = useState(1);
  const [minted, setMinted] = useState(1);
  const contract = useContractRead({
    address: '0x414Bc08736B8353147e5618D4309C789fD809648',
    abi: [
      {
        name: 'totalSupply',
        type: 'function',
        stateMutability: 'nonpayable',
        inputs: [],
        outputs: [				{
					"internalType": "uint256",
					"name": "balance",
					"type": "uint256"
				}],
      },
    ],
    functionName: 'totalSupply',
  })

  const {
    mintAmount,
    setMintAmount
  } = useContext(MintAmount)
  return (
    <div className="ms-auto me-auto p-3 landing-content-preview">
      <img
        src={window.origin + "/MainBanner.png"}
        className="w-100 landing-content-picture"
      />
      {isConnected && (
        <div className="mt-3 text-white">
          <div className="mt-1 d-flex align-items-center justify-content-between">
            <div>PRICE</div>
            <div className="fw-bold">{`${330 * quantity} USD`}</div>
          </div>
          <div className="mt-1 d-flex align-items-center justify-content-between">
            <div>Total Supply Remaining:</div>
            <div className="fw-bold">236</div>
          </div>
          <div className="mt-1 d-flex align-items-center justify-content-between">
            <div>{"QUANTITY"}</div>
            <div className="fw-bold d-flex align-items-center">
              <AiFillMinusSquare
                size={24}
                style={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  console.log(mintAmount)
                  setMintAmount(Math.max(0, quantity - 1))
                  
                  setQuantity(Math.max(0, quantity - 1))
                
                
                }}
              />
              <span className="ms-2 me-2">{quantity}</span>
              <AiFillPlusSquare
                size={24}
                style={{
                  cursor: "pointer",
                }}
                onClick={() => {setQuantity(Math.min(50, quantity + 1))
                
                  setMintAmount(Math.min(50, quantity + 1))
                }}
              />
            </div>
          </div>
        </div>
      )}
      {isConnected ? (
              <><ApproveToken /></>
      ) : (
        <PrimaryButton
          text="CONNECT"
          leftIcon={<SlWallet />}
          className="mt-3"
          onClick={onConnect}
        />
      )}
    </div>
  );
};

const Content = () => {
  const { show } = useConnectWalletModal();

  const onConnect = () => {
    show();
  };

  return (
    <div className="landing-content row">
      <div className="col-12 col-md-6 p-4 landing-content-description position-relative">
        <Description />
      </div>
      <div className="col-12 col-md-6">
        <Preview onConnect={onConnect} />
      </div>
    </div>
  );
};

export default Content;
