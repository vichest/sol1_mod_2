# Solana Wallet App

This is a simple Solana wallet app built using React and the Solana Web3.js library. The app allows you to create a sender account, connect your wallet using the Phantom browser extension, disconnect your wallet, and initiate a SOL transfer.

## Prerequisites

Before you get started, make sure you have the following prerequisites installed:

1. Node.js: You need Node.js and npm (Node Package Manager) installed on your system. You can download them from [https://nodejs.org/](https://nodejs.org/).

2. Phantom Wallet: Install the [Phantom](https://phantom.app/) browser extension, which is used for wallet integration.

## Getting Started

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   ```

2. Navigate to the project directory:

   ```bash
   cd your-repo-name
   ```

3. Install project dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm start
   ```

5. Open your web browser and access the app at `http://localhost:3000`.

## App Functionality

### 1. Create Sender Account

Click the "Create Sender Account" button to generate a new sender account and airdrop 1 SOL to it. This account will be used to send SOL to another wallet.

### 2. Connect Wallet

If you have the Phantom wallet extension installed, click the "Connect Wallet" button to connect your wallet to the app. Once connected, your wallet's public key will be displayed.

### 3. Disconnect Wallet

Click the "Disconnect Wallet" button to disconnect your wallet from the app.

### 4. Transfer SOL

After creating a sender account and connecting your wallet, click the "Transfer SOL" button to initiate a SOL transfer from the sender account to the connected wallet. The transfer amount is set to 2 SOL.

## Important Notes

- Make sure you have Phantom wallet installed and unlocked in your browser before connecting.
- This app is configured to work on the Solana Devnet cluster by default. You can change the cluster by modifying the `clusterApiUrl` in the code.

## Contributing

Feel free to contribute to this project by creating pull requests or reporting issues.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
