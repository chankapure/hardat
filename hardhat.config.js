/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-waffle");

const ALCHEMY_API_KEY = "62oUeevNepE6xgoKzktB2okGpU2gXkkY";
const ROPSTEN_PRIVATE_KEY =
  "80316a4084af5357fbcf0c5c95f67d7cb8422a83c17a7d872ae53cb4becfa460";

module.exports = {
  solidity: "0.8.9",
  networks: {
    ropsten: {
      url: `https://eth-ropsten.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [`${ROPSTEN_PRIVATE_KEY}`],
    },
  },
};
