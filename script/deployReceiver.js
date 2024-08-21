const { ethers } = require('ethers');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function main() {
	// Load the chain configuration from the JSON file
	const chains = JSON.parse(
		fs.readFileSync(path.resolve(__dirname, '../deploy-config/chains.json'))
	);

	// Get the Celo Testnet configuration
	const celoChain = chains.chains.find((chain) => chain.description.includes('Celo Testnet'));

	// Set up the provider and wallet
	const provider = new ethers.providers.JsonRpcProvider(celoChain.rpc);
	const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

	// Contract factory for MessageReceiver
	const MessageReceiver = await ethers.getContractFactory('MessageReceiver', wallet);

	// Deploy the contract using the Wormhole Relayer address for Celo Testnet
	const receiverContract = await MessageReceiver.deploy(celoChain.wormholeRelayer);
	await receiverContract.waitForDeployment();

	console.log('MessageReceiver deployed to:', receiverContract.address);
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
