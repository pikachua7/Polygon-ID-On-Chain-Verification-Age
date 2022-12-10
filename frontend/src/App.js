import './App.css';
import QRCode from "react-qr-code";

const styles = {
  root: {
    color: "#2C1752",
    fontFamily: "sans-serif",
    textAlign: "center"
  },
  title: {
    color: "#7B3FE4"
  }
};

// update with your contract address
const deployedContractAddress = "0x676A0270692461917E6A7fC6f92233E7418d3BBa";

// more info on query based requests: https://0xpolygonid.github.io/tutorials/wallet/proof-generation/types-of-auth-requests-and-proofs/#query-based-request
const qrProofRequestJson = {
  id: "c811849d-6bfb-4d85-936e-3d9759c7f105",
  typ: "application/iden3comm-plain-json",
  type: "https://iden3-communication.io/proofs/1.0/contract-invoke-request",
  body: {
    transaction_data: {
      contract_address: deployedContractAddress,
      method_id: "b68967e2",
      chain_id: 80001,
      network: "polygon-mumbai"
    },
    reason: "ERC20 Transfer using On chain Verification",
    scope: [
      {
        id: 1,
        circuit_id: "credentialAtomicQuerySig",
        rules: {
          query: {
            allowed_issuers: ["*"],
            req: {
              Age: {
                $gt: 18
              }
            },
            schema: {
              url:
                "https://s3.eu-west-1.amazonaws.com/polygonid-schemas/33f9238b-dad0-440e-aa20-4561606c289b.json-ld",
              type: "AgeCredential"
            }
          }
        }
      }
    ]
  }
};

function App() {
  return (
    <div style={styles.root}>
      <h2 style={styles.title}>
        ERC20 Token Transfer using Polygon ID On chain Verification for users greater than 18 years of age
      </h2>
      <p>Scan the QR code to prove your age</p>

      <div>
        <QRCode
          level="Q"
          style={{ width: 256 }}
          value={JSON.stringify(qrProofRequestJson)}
        />
      </div>
      <br />

      <p>
        Polygonscan:{" "}
        <a
          href={`https://mumbai.polygonscan.com/token/${deployedContractAddress}`}
          target="_blank"
        >
          ERC20TokenAddress
        </a>
      </p>
    </div>
  );
}

export default App;
