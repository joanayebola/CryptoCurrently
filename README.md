CryptoCurrently is a Next.js-based web application that allows users to track cryptocurrency prices and market data in real-time. Users can search for cryptocurrencies, view detailed information, and switch between different currencies (USD, EUR, NGN) for price conversion.

## Features

- **Real-Time Crypto Data**: Fetches real-time cryptocurrency data from the CoinGecko API.
- **Search Functionality**: Search for cryptocurrencies by name.
- **Currency Conversion**: Switch between multiple currencies (INR, USD, EUR, NGN) to view prices in your preferred currency.
- **Pagination**: Navigate through the list of cryptocurrencies with pagination.
- **Detailed Crypto Information**: Click on a cryptocurrency to view detailed information, including price, market cap, and price changes over time.
- **Responsive Design**: Works seamlessly on desktop and mobile devices.

## Technologies Used

- **Frontend**: Next.js, React, Bootstrap
- **API**: [CoinGecko API](https://www.coingecko.com/en/api)
- **State Management**: React Hooks (`useState`, `useEffect`)
- **Styling**: Bootstrap CSS

## Live Demo

You can check out the live demo of the project [here](https://crypto-currently.vercel.app).

## Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/joanayebola/cryptocurrently.git
   cd cryptocurrently
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run the development server**:

   ```bash
   npm run dev
   ```

4. **Open the app**:
   Open your browser and navigate to `http://localhost:3000`.

## Usage

1. **Home Page**:

   - View a list of cryptocurrencies with their current prices, market caps, and price changes.
   - Use the search bar to filter cryptocurrencies by name.
   - Switch between currencies (USD, EUR, NGN) using the dropdown.

2. **Crypto Details Page**:
   - Click on a cryptocurrency to view detailed information, including:
     - Current price
     - Market cap
     - Price changes (1h, 24h, 7d)
     - Total and circulating supply
   - Visit the official website of the cryptocurrency.

## API Used

This project uses the [CoinGecko API](https://www.coingecko.com/en/api) to fetch real-time cryptocurrency data. The following endpoints are used:

- **Get Cryptocurrency List**:

  ```
  GET /coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d
  ```

- **Get Cryptocurrency Details**:
  ```
  GET /coins/{id}
  ```

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeatureName`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeatureName`).
5. Open a pull request.

## Acknowledgments

- [CoinGecko](https://www.coingecko.com/) for providing the free API.
- [Next.js](https://nextjs.org/) and [React](https://reactjs.org/) for the frontend framework.
- [Bootstrap](https://getbootstrap.com/) for the styling.

## Contact

If you have any questions or feedback, feel free to reach out:

- **Email** - [Email](mailto:joanayebola1@gmail.com)
- **GitHub** - [GitHub Profile](https://github.com/joanayebola)
