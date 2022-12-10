async function main() {

  const circuitId = "credentialAtomicQuerySig";
  const validatorAddress = "0xb1e86C4c687B85520eF4fd2a0d14e81970a15aFB";

  const schemaHash = "79f0ff9f92d3bdd3d401c4d2498cb61f" // extracted from PID Platform

  const schemaEnd = fromLittleEndian(hexToBytes(schemaHash))

  // const query = {
  //   schema: ethers.BigNumber.from(schemaEnd),
  //   slotIndex: 2,
  //   operator: 3,
  //   value: [8],
  //   circuitId,
  // };

  const query = {
    schema: ethers.BigNumber.from(schemaEnd),
    slotIndex: 2,
    operator: 1,
    value: [1, ...new Array(63).fill(0).map(i => 0)],
    circuitId,
  };

  // add the address of the contract just deployed
  // ERC20VerifierAddress = "0x8869223ddCEe3997Dd62e3B82f2EceF292983915"
  ERC20VerifierAddress = "0x44ef594D13fAa12e8B8F88298D94b81ED226aCE1";

  //let erc20Verifier = await hre.ethers.getContractAt("CGPA", ERC20VerifierAddress)
  let erc20Verifier = await hre.ethers.getContractAt("ReputationScore", ERC20VerifierAddress)

  try {
    await erc20Verifier.setZKPRequest(
      1,
      validatorAddress,
      query
    );
    console.log("Request set");
  } catch (e) {
    console.log("error: ", e);
  }
}

function hexToBytes(hex) {
  for (var bytes = [], c = 0; c < hex.length; c += 2)
    bytes.push(parseInt(hex.substr(c, 2), 16));
  return bytes;
}

function fromLittleEndian(bytes) {
  const n256 = BigInt(256);
  let result = BigInt(0);
  let base = BigInt(1);
  bytes.forEach((byte) => {
    result += base * BigInt(byte);
    base = base * n256;
  });
  return result;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
