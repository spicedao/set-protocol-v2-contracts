

/*
    to run this deploy script with hardhat use: 
    npx hardhat run --network localhost scripts/deployCustomValuerAndOracle.js
*/
const MAIN_ORACLE = "0x45aa3ae6c36b35b4c63d62476cbb13ed827317f0";
const USDC = "0x7079f3762805cff9c979a5bdc6f5648bcfee76c8";


async function main() {
    const DIAPriceOracle = await ethers.getContractFactory("DIAPriceOracle");
    const DIAPriceOracleDeployed = await DIAPriceOracle.deploy(USDC, MAIN_ORACLE);

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
  