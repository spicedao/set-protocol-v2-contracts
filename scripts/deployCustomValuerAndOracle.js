/*  
    controller address KOVAN for SCIFI: 0x9048278ca7e874f9338e4898c436ab07aa454701
    Kovan Oracle: 0x5547694dac65f5046c02ffd3875bdf46f3bab713
    WETH Kovan: 0xa1c74a9a3e59ffe9bee7b85cd6e91c0751289ebd

    to run this deploy script with hardhat use: 
    npx hardhat run --network localhost scripts/deployCustomValuerAndOracle.js

*/

const KOVAN_MAIN_ORACLE = "0x5547694dac65f5046c02ffd3875bdf46f3bab713";
const KOVAN_WETH = "0xa1c74a9a3e59ffe9bee7b85cd6e91c0751289ebd";

async function main() {
    const DIAPriceOracle = await ethers.getContractFactory("DIAPriceOracle");
    const DIAPriceOracleDeployed = await DIAPriceOracle.deploy(KOVAN_WETH, KOVAN_MAIN_ORACLE);

    const SetValuer = await ethers.getContractFactory("CustomOracleSetValuer");
    const valuer = await SetValuer.deploy(DIAPriceOracleDeployed.address);
  
    console.log("CustomOracleSetValuer Address:  ", valuer.address);
    console.log('DIAPriceOracleDeployed Address: ', DIAPriceOracleDeployed.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
  