## Cross-Chain Messaging with Wormhole

This project demonstrates how to send and receive _cross-chain messages_ using the **Wormhole** protocol, specifically between Avalanche Fuji and Celo Alfajores TestNets. The repository includes automated scripts for deploying contracts and sending messages across these chains.

### Features

 - Deploy smart contracts on Avalanche Fuji and Celo Alfajores TestNets
 - Automatically manage contract addresses
 - Send a cross-chain message from one chain to another using Wormhole

### Prerequisites

- [Foundry installed](https://book.getfoundry.sh/getting-started/installation)
- [Node.js and npm installed](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- You will need testnet tokens in both chains ([Fuji](https://faucets.chain.link/fuji) / [Alfajores](https://faucets.chain.link/celo-alfajores-testnet)) to complete transactions.
- An `.env` file with your private key:

```bash
PRIVATE_KEY=0x...
```

### Quickstart

1. Clone the repository:

```bash
git clone 
```

2. Install dependencies:

```bash
npm install
forge install
```

3. Compile contracts:

```bash
forge build
```

4. Deploy contracts:

Deploy the sender contract on Avalanche Fuji:

```bash
npm run deploy:sender
```

Deploy the receiver contract on Celo Alfajores:

```bash
npm run deploy:receiver
```

5. Send Cross-Chain Message:

Send a message from Avalanche Fuji to Celo Alfajores:

```bash
npm run send-message
```

### How It Works

The project uses two smart contracts:

- **MessageSender (Avalanche Fuji)** - Sends a message to the target chain.
- **MessageReceiver (Celo Alfajores)** - Receives the message and logs it.

The deployment scripts automatically store the contract addresses in `deployedContracts.json` for easy reuse.

### Project Structure

- **script/** - Deployment and interaction scripts
- **deploy-config/** - Chain configuration and deployed contract addresses
- **out/** - Compiled contract artifacts
- **lib/** - External dependencies (auto-managed by Foundry)

