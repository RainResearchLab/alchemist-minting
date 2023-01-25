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


const Description = () => {
  return (
    <>
      
        <div className="main-text text-white fw-bold">
          Mint The Alchemists <span className="text-primary-custom">Founding Fathers</span>{" "}
          NFT Collection
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
        src={window.origin + "/Discord_Banner_1.png"}
        className="w-100 landing-content-picture"
      />
      {isConnected && (
        <div className="mt-3 text-white">
          <div className="d-flex align-items-center justify-content-between">
            <div>YOUR NFTS</div>
            <div className="fw-bold"> NFTS</div>
          </div>
          <div className="mt-1 d-flex align-items-center justify-content-between">
            <div>PRICE</div>
            <div className="fw-bold">{`${250 * quantity} USD`}</div>
          </div>
          <div className="mt-1 d-flex align-items-center justify-content-between">
            <div>Minted</div>
            <div className="fw-bold">#/1000</div>
          </div>
          <div className="mt-1 d-flex align-items-center justify-content-between">
            <div>{"Quantity"}</div>
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
                onClick={() => setQuantity(Math.min(20, quantity + 1))}
              />
            </div>
          </div>
        </div>
      )}
      {isConnected ? (
        <PrimaryButton
          text="APPROVE/MINT"
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
