const { ethers } = require('ethers');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function main() {
	// Load the chain configuration from the JSON file
	const chains = JSON.parse(
		fs.readFileSync(path.resolve(__dirname, '../deploy-config/chains.json'))
	);

	// Get the Avalanche Fuji configuration
	const avalancheChain = chains.chains.find((chain) =>
		chain.description.includes('Avalanche testnet')
	);

	// Set up the provider and wallet
	const provider = new ethers.providers.JsonRpcProvider(avalancheChain.rpc);
	const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

	// Contract factory for MessageSender
	const MessageSender = await ethers.getContractFactory('MessageSender', wallet);

	// Deploy the contract using the Wormhole Relayer address for Avalanche Fuji
	const senderContract = await MessageSender.deploy(avalancheChain.wormholeRelayer);
	await senderContract.waitForDeployment();

	console.log('MessageSender deployed to:', senderContract.address);
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
