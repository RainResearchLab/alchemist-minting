import { useState } from "react";
import "./index.scss";

// import components
import { PrimaryButton } from "../../../components/Buttons";

// import wagmi
import { useAccount } from "wagmi";

// import context
import { useConnectWalletModal } from "../../../contexts/ConnectWalletModalContext";

// import icons
import { SlWallet } from "react-icons/sl";
import { AiFillPlusSquare, AiFillMinusSquare } from "react-icons/ai";
import { GiWoodAxe } from "react-icons/gi";


function NFTsDisplay({address, contractAddress}) {
  const [nftsHeld, setNftsHeld] = useState(1);

  useEffect(() => {
    async function getNFTsHeldByAddress() {
      // Connect to the Ethereum blockchain and get the number of NFTs held by the address
      // using the web3.js library as described in the previous answer
      const nfts = await contract.methods.balanceOf(address).call();
      setNftsHeld(nfts);
    }
    getNFTsHeldByAddress();
  }, [address, contractAddress]);

}

const Description = () => {
  return (
    <>
      <div>
        <div className="main-text text-white fw-bold">
          Mint The Alchemist's <span className="text-primary-custom">Founding Fathers</span>{" "}
          NFT Collection
        </div>
        {/* <h2 className="description-text text-white fw-bold">
          Receive exclusive benefits in the Alchemist ecosystem
        </h2> */}
        {/* <h3 className="mt-5 description-text text-white">
          <b>How does it work?</b>
          {"Strategic Planning"}
        </h3>

        {/* <img alt="logo" src={window.origin + "/logo.png"} className="w-50" /> */}
      </div>
      <img alt="alchemist" src={window.origin + "/loopify.webp"} width="80%" />
    </>
  );
};



const Preview = ({ onConnect }) => {
  const { isConnected } = useAccount();
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="ms-auto me-auto p-3 landing-content-preview">
      <img
        src={window.origin + "/how1.webp"}
        className="w-100 landing-content-picture"
      />
      {isConnected && (
        <div className="mt-3 text-white">
          <div className="d-flex align-items-center justify-content-between">
            <div>YOUR NFTS</div>
            <div className="fw-bold">{nftsHeld} NFTS</div>
          </div>
          <div className="mt-1 d-flex align-items-center justify-content-between">
            <div>PRICE</div>
            <div className="fw-bold">{`${330 * quantity} USD`}</div>
          </div>
          <div className="mt-1 d-flex align-items-center justify-content-between">
            <div>REMAINING SUPPLY</div>
            <div className="fw-bold">0 / 0</div>
          </div>
          <div className="mt-1 d-flex align-items-center justify-content-between">
            <div>Minted</div>
            <div className="fw-bold">#/1000</div>
          </div>
          <div className="mt-1 d-flex align-items-center justify-content-between">
            <div>{"QUANTITY (MAX 2 PER TRANSACTION)"}</div>
            <div className="fw-bold d-flex align-items-center">
              <AiFillMinusSquare
                size={24}
                style={{
                  cursor: "pointer",
                }}
                onClick={() => setQuantity(Math.max(0, quantity - 1))}
              />
              <span className="ms-2 me-2">{quantity}</span>
              <AiFillPlusSquare
                size={24}
                style={{
                  cursor: "pointer",
                }}
                onClick={() => setQuantity(Math.min(2, quantity + 1))}
              />
            </div>
          </div>
        </div>
      )}
      {isConnected ? (
        <PrimaryButton
          text="MINT"
          leftIcon={<GiWoodAxe className="me-3" size={24} />}
          className="mt-3"
          onClick={() => { }}
        />
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
