const Migrations = artifacts.require("Migrations");
const GenesisProtocolUtil = artifacts.require("GenesisProtocolUtil");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(GenesisProtocolUtil);
};
