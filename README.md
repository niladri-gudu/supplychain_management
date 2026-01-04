# Supply Chain Management with Escrow System

A decentralized supply chain management platform built on Ethereum blockchain that provides secure escrow-based payments, real-time shipment tracking, and transparent transaction history. This is a learning project demonstrating blockchain integration with modern web technologies.

## 🌟 Features

- **Escrow Payment System**: Secure fund deposits that are held until shipment delivery is confirmed
- **Multi-Stage Tracking**: Track shipments through Pending, In Transit, and Delivered stages
- **Automated Fund Release**: Automatic payment release to suppliers upon delivery confirmation
- **Transaction History**: Comprehensive shipment history for individual users and system-wide analytics
- **Smart Contract Integration**: Ethereum-based smart contracts written in Solidity
- **Modern UI**: Next.js-powered responsive web interface
- **Web3 Wallet Support**: RainbowKit integration for seamless wallet connections

## 🏗️ Architecture

### Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Smart Contracts**: Solidity
- **Blockchain**: Hardhat local network (localhost testing)
- **Web3 Integration**: Wagmi, RainbowKit
- **Wallet Connection**: WalletConnect v2

### Smart Contract Features

The core smart contract implements:
- Shipment creation with escrow deposit
- Status updates through defined stages
- Automated payment release mechanism
- Event emission for transaction logging
- Access control for authorized state transitions
- Comprehensive shipment history retrieval

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **pnpm**
- **MetaMask** or any Web3 wallet
- **Git**

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/niladri-gudu/supplychain_management.git
cd supplychain_management
```

### 2. Install Dependencies

```bash
npm install
# or
pnpm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Smart Contract Address (deployed on Hardhat local network)
NEXT_PUBLIC_SUPPLY_CHAIN_ADDRESS=your_deployed_contract_address

# WalletConnect Project ID
# Get this from https://cloud.walletconnect.com/
NEXT_PUBLIC_PROJECTID=your_walletconnect_project_id
```

**Getting WalletConnect Project ID:**
1. Visit [WalletConnect Cloud](https://cloud.walletconnect.com/)
2. Create a free account
3. Create a new project
4. Copy your Project ID
5. Paste it in your `.env.local` file

### 4. Start Hardhat Local Node

Open a new terminal and run:

```bash
cd blockchain
npx hardhat node
```

This will start a local Ethereum network on `http://127.0.0.1:8545/`

### 5. Deploy Smart Contract

In another terminal, deploy the contract to your local network:

```bash
cd blockchain
npx hardhat run scripts/deploy.js --network localhost
```

Copy the deployed contract address and update it in your `.env.local` file as `NEXT_PUBLIC_SUPPLY_CHAIN_ADDRESS`.

### 6. Import Hardhat Account to MetaMask

Hardhat provides test accounts with pre-funded ETH. To use them:

1. Copy a private key from the Hardhat node terminal output
2. Open MetaMask
3. Click on the account icon → Import Account
4. Paste the private key
5. Switch MetaMask network to `Localhost 8545`

### 7. Run the Development Server

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Smart Contract Functions

### Core Functions

#### `createShipment()`
Creates a new shipment with escrow deposit.

```solidity
function createShipment(
    string memory _description,
    address _receiver
) public payable returns (uint256)
```

**Parameters:**
- `_description`: Shipment details
- `_receiver`: Recipient address

**Requirements:**
- Must include payment value (msg.value)
- Receiver address must be valid

#### `updateShipmentStatus()`
Updates shipment status through tracking stages.

```solidity
function updateShipmentStatus(
    uint256 _shipmentId,
    ShipmentStatus _newStatus
) public
```

**Statuses:**
- `0`: Pending
- `1`: In Transit
- `2`: Delivered

**Access Control:**
- Only authorized parties can update status
- Status progression must be sequential

#### `releasePayment()`
Releases escrowed funds upon delivery confirmation.

```solidity
function releasePayment(uint256 _shipmentId) public
```

**Requirements:**
- Shipment status must be "Delivered"
- Only receiver can trigger release

#### `getShipmentHistory()`
Retrieves shipment history for a user.

```solidity
function getShipmentHistory(address _user) 
    public view returns (Shipment[] memory)
```

#### `getAllShipments()`
Returns complete system shipment history.

```solidity
function getAllShipments() 
    public view returns (Shipment[] memory)
```

## 🎯 Usage Example

### Creating a Shipment

1. Connect your wallet using the "Connect Wallet" button
2. Navigate to "Create Shipment" section
3. Enter shipment details and receiver address
4. Deposit the agreed-upon amount
5. Confirm the transaction in your wallet

### Tracking a Shipment

1. Go to "My Shipments" dashboard
2. View real-time status updates
3. See all shipment details and current status

### Confirming Delivery

1. Receiver confirms delivery through the platform
2. Smart contract automatically releases escrowed funds
3. Transaction is recorded permanently on the local blockchain

## 📊 Project Structure

```
supplychain_management/
├── app/                    # Next.js app directory
│   ├── components/         # React components
│   ├── hooks/             # Custom React hooks
│   └── page.tsx           # Main page
├── blockchain/            # Smart contract files
│   ├── contracts/         # Solidity contracts
│   ├── scripts/           # Deployment scripts
│   └── test/              # Contract tests
├── public/                # Static assets
├── types/                 # TypeScript type definitions
├── .gitignore
├── package.json
├── next.config.ts
└── tsconfig.json
```

## 🧪 Testing

### Smart Contract Tests

```bash
cd blockchain
npx hardhat test
```

### Frontend Testing

Test the application by:
1. Creating multiple shipments with different accounts
2. Updating shipment statuses
3. Confirming deliveries and verifying fund releases
4. Checking shipment history for different users

## 🔐 Security Considerations

- All funds are held in escrow until delivery confirmation
- Only authorized addresses can update shipment status
- Re-entrancy protection implemented
- Input validation on all contract functions
- Event logging for transaction transparency

## ⚙️ Wagmi Configuration

The project uses Wagmi v2 with RainbowKit for wallet connections. Configuration is set up for Hardhat local network:

```typescript
import { getDefaultConfig } from "@rainbow-me/rainbowkit"
import { hardhat } from "wagmi/chains"

export const wagmiConfig = getDefaultConfig({
    appName: "SupplyChain Escrow DApp",
    projectId: process.env.NEXT_PUBLIC_PROJECTID as string,
    chains: [hardhat],
    ssr: true
})
```

The configuration uses the Hardhat chain for local development and testing.

## 🐛 Troubleshooting

### Common Issues

**"Contract not deployed" error:**
- Make sure Hardhat node is running
- Verify contract is deployed with `npx hardhat run scripts/deploy.js --network localhost`
- Check that the contract address in `.env.local` matches the deployed address

**Wallet connection issues:**
- Ensure MetaMask is set to `Localhost 8545`
- Verify WalletConnect Project ID is correct
- Try refreshing the page after connecting

**Transaction fails:**
- Check that you have sufficient ETH in your test account
- Ensure Hardhat node is still running
- Verify you're sending transactions from the correct account

## 📚 Learning Resources

This project demonstrates:
- Smart contract development with Solidity
- Web3 integration using Wagmi and RainbowKit
- Escrow payment patterns in blockchain
- State management in decentralized applications
- Event handling and transaction monitoring

---

**Built with ❤️ as a blockchain learning project**
