// DashboardContent.js
import React from 'react';
import StockChart from '../services/StockChart';

const DashboardContent = ({ stockData, searchTerm, openStockDetails, selectedStock, setSearchTerm }) => {
  return (
    <div>
      <h1>Stock Market</h1>
      <div>
        <input
          type="text"
          placeholder="Search stocks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="stock-cards">
        {stockData
          .filter((stock) => stock.name.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((stock) => (
            <div key={stock.symbol} className="stock-card">
              <p onClick={() => openStockDetails(stock.symbol)}>{stock.name}</p>
              {selectedStock && selectedStock.symbol === stock.symbol && (
                <div className="stock-details-panel">
                  <p>Symbol: {selectedStock.symbol}</p>
                  <p>Company Name: {selectedStock.companyName}</p>
                  <StockChart historicalData={selectedStock.historicalData} />
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default DashboardContent;