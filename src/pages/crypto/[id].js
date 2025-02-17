import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "@/Components/Navbar";

const CryptoDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [cryptoData, setCryptoData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currency, setCurrency] = useState("ngn"); // Default currency is Naira

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${id}`
        );
        setCryptoData(response.data);
      } catch (error) {
        setError("Failed to fetch data. Please try again later.");
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (id) {
      fetchData();
    }
  }, [id, currency]); // Refetch data when currency changes

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  if (isLoading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading cryptocurrency details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container text-center mt-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  // Extract description up to the first period (.)
  const description = cryptoData.description.en.split(".")[0];

  // Get the currency symbol
  const currencySymbols = {
    ngn: "₦",
    usd: "$",
    eur: "€",
  };

  const currencySymbol = currencySymbols[currency] || "₦";

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-sm">
              <div className="card-header bg-dark text-white text-center">
                <h1 className="card-title mb-0">{cryptoData.name}</h1>
              </div>
              <div className="card-body text-center">
                <img
                  src={cryptoData.image.large}
                  className="img-fluid mb-4"
                  alt={cryptoData.name}
                  style={{ maxWidth: "150px" }}
                />
                <h5 className="card-text text-muted">{description}.</h5>
                <div className="mt-3">
                  <label htmlFor="currency" className="form-label">
                    Select Currency:
                  </label>
                  <select
                    id="currency"
                    className="form-select"
                    value={currency}
                    onChange={handleCurrencyChange}
                  >
                    <option value="ngn">Naira (₦)</option>
                    <option value="usd">US Dollar ($)</option>
                    <option value="eur">Euro (€)</option>
                  </select>
                </div>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>Symbol:</strong> {cryptoData.symbol.toUpperCase()}
                </li>
                <li className="list-group-item">
                  <strong>Rank:</strong> #{cryptoData.market_cap_rank}
                </li>
                <li className="list-group-item">
                  <strong>Market Cap:</strong> {currencySymbol}
                  {cryptoData.market_data.market_cap[currency].toLocaleString()}
                </li>
                <li className="list-group-item">
                  <strong>Current Price:</strong> {currencySymbol}
                  {cryptoData.market_data.current_price[
                    currency
                  ].toLocaleString()}
                </li>
                <li className="list-group-item">
                  <strong>Total Supply:</strong>{" "}
                  {cryptoData.market_data.total_supply
                    ? cryptoData.market_data.total_supply.toLocaleString()
                    : "N/A"}
                </li>
                <li className="list-group-item">
                  <strong>Market Cap Change (24h):</strong>{" "}
                  <span
                    className={
                      cryptoData.market_data.market_cap_change_percentage_24h <
                      0
                        ? "text-danger"
                        : "text-success"
                    }
                  >
                    {cryptoData.market_data.market_cap_change_percentage_24h.toFixed(
                      2
                    )}
                    %
                  </span>
                </li>
                <li className="list-group-item">
                  <strong>High (24h):</strong> {currencySymbol}
                  {cryptoData.market_data.high_24h[currency].toLocaleString()}
                </li>
                <li className="list-group-item">
                  <strong>Low (24h):</strong> {currencySymbol}
                  {cryptoData.market_data.low_24h[currency].toLocaleString()}
                </li>
                <li className="list-group-item">
                  <strong>Total Volume (24h):</strong> {currencySymbol}
                  {cryptoData.market_data.total_volume[
                    currency
                  ].toLocaleString()}
                </li>
                <li className="list-group-item">
                  <strong>Circulating Supply:</strong>{" "}
                  {cryptoData.market_data.circulating_supply.toLocaleString()}
                </li>
              </ul>
              <div className="card-footer text-center">
                <a
                  href={cryptoData.links.homepage[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-success"
                >
                  Visit Official Website
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CryptoDetails;
