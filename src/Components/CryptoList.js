"use client";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Link from "next/link";
import Navbar from "./Navbar";

const CryptoTracker = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items per page
  const [currency, setCurrency] = useState("inr"); // Default currency is INR

  useEffect(() => {
    fetchData();
  }, [currency]); // Refetch data when currency changes

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d`,
        { timeout: 5000 }
      );
      setData(response.data);
    } catch (error) {
      setError("Failed to fetch data. Please refresh.");
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const filteredData = data.filter((crypto) => {
    return crypto.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Get the currency symbol
  const currencySymbols = {
    inr: "₹",
    usd: "$",
    eur: "€",
    ngn: "₦",
  };

  const currencySymbol = currencySymbols[currency] || "₹";

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        {/* Search Bar, Currency Dropdown, and Refresh Button */}
        <div className="row justify-content-center mb-4">
          <div className="col-md-8 d-flex mt-5 gap-2">
            <input
              type="text"
              placeholder="Search crypto by name..."
              className="form-control"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <select
              className="form-select"
              value={currency}
              onChange={handleCurrencyChange}
              style={{
                outline: "none",
                boxShadow: "none",
                width: "auto",
              }}
            >
              <option value="usd">USD ($)</option>
              <option value="eur">EUR (€)</option>
              <option value="ngn">NGN (₦)</option>
            </select>
            <button
              className="btn btn-success"
              onClick={fetchData}
              disabled={isLoading}
            >
              {isLoading ? "Refreshing..." : "Refresh"}
            </button>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center">
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading cryptocurrency data...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        )}

        {/* Crypto Table */}
        {!isLoading && !error && (
          <>
            <div className="table-responsive">
              <table className="table table-hover table-bordered">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Symbol</th>
                    <th scope="col">Price ({currencySymbol})</th>
                    <th scope="col">Market Cap ({currencySymbol})</th>
                    <th scope="col">1h Change</th>
                    <th scope="col">24h Change</th>
                    <th scope="col">7d Change</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((crypto, index) => (
                    <tr key={crypto.id}>
                      <th scope="row">{indexOfFirstItem + index + 1}</th>
                      <td>
                        <div className="d-flex align-items-center">
                          <img
                            src={crypto.image}
                            alt={crypto.name}
                            className="rounded-circle me-2"
                            style={{ width: "30px", height: "30px" }}
                          />
                          <Link
                            href={`/crypto/${crypto.id}`}
                            className="text-decoration-none text-dark fw-bold"
                          >
                            {crypto.name}
                          </Link>
                        </div>
                      </td>
                      <td className="text-uppercase">{crypto.symbol}</td>
                      <td>
                        {currencySymbol}
                        {crypto.current_price.toLocaleString()}
                      </td>
                      <td>
                        {currencySymbol}
                        {crypto.market_cap.toLocaleString()}
                      </td>
                      <td
                        className={
                          crypto.price_change_percentage_1h_in_currency < 0
                            ? "text-danger"
                            : "text-success"
                        }
                      >
                        {Number(
                          crypto.price_change_percentage_1h_in_currency
                        ).toFixed(2)}
                        %
                      </td>
                      <td
                        className={
                          crypto.price_change_percentage_24h_in_currency < 0
                            ? "text-danger"
                            : "text-success"
                        }
                      >
                        {Number(
                          crypto.price_change_percentage_24h_in_currency
                        ).toFixed(2)}
                        %
                      </td>
                      <td
                        className={
                          crypto.price_change_percentage_7d_in_currency < 0
                            ? "text-danger"
                            : "text-success"
                        }
                      >
                        {Number(
                          crypto.price_change_percentage_7d_in_currency
                        ).toFixed(2)}
                        %
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <nav aria-label="Page navigation">
              <ul className="pagination justify-content-center mt-4">
                {Array.from({
                  length: Math.ceil(filteredData.length / itemsPerPage),
                }).map((_, index) => (
                  <li
                    key={index}
                    className={`page-item ${
                      currentPage === index + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => paginate(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </>
        )}
      </div>
    </>
  );
};

export default CryptoTracker;
