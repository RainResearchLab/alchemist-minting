import "./index.scss";

// import components
import Content from "./Content";
import Header from "./Header";

const Landing = () => {
  return (
    <div className="landing ps-4 pe-4 ps-md-5 pe-md-5 flex-fill">
      <Header />
      <Content />
    </div>
    <div>
      import { CrossmintPayButton } from "@crossmint/client-sdk-react-ui";
    
    export default function Mint() {
        return (
            <CrossmintPayButton
                clientId="efc2ed34-9321-4264-bdd5-70c112f9306b"
                mintConfig={{"type":"erc-721","totalPrice":"<SELECTED_PRICE_IN_ETHER>","numberOfTokens":"<NUMBER_OF_NFTS>"}}
    </div>            
            />
        );
    }
  );
};

export default Landing;
