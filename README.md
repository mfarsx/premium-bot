# Premium Bot

Premium Bot is a custom-designed bot for Discord servers, seamlessly integrated with payment systems to enable donations and automatically reward users with special roles based on the amount they contribute.

## Features

- **Payment Tracking**: Tracks and logs user donations in real-time.
- **Role Management**: Automatically assigns or updates user roles based on donation amounts, enhancing user engagement and community participation.
- **Flexible Configuration**: Easy to configure payment thresholds and associated roles directly through environment variables or a configuration file.
- **Security**: Implements secure payment integration practices to protect user data and transaction details.

## Getting Started

Follow these steps to get your instance of Premium Bot up and running on your Discord server.

### Prerequisites

Ensure you have the following prerequisites installed and set up:

- Node.js (version 12.0 or newer)
- A Discord Bot Token (obtainable from the [Discord Developer Portal](https://discord.com/developers/applications))
- Necessary API keys for your chosen payment integration

### Installation

#### Clone the repository to your local machine
```bash
git clone https://github.com/mfarsx/premium-bot.git
```
#### Navigate into the cloned repository directory
```bash
cd premium-bot
```
#### Install the required npm packages
```bash
npm install
```

#### Create a `.env` file in the root directory and populate it with your bot token and any other required environment variables
```bash
echo BOT_TOKEN=your_discord_bot_token_here >> .env
echo PAYMENT_API_KEY=your_payment_provider_api_key_here >> .env
```
#### Start the bot
```bash
npm start
```
## Usage

Once the bot is running on your server, you can interact with it using predefined commands. Example commands include:

- `!addPayment [userID] [amount]`: Simulates adding a payment for a user.
- `!checkPayments`: Displays a summary of all recorded payments.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. **Fork the Project**
2. **Create your Feature Branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your Changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the Branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

## License

Distributed under the MIT License. See `LICENSE` for more information.
