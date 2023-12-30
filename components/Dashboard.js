import React, { useState, useEffect } from 'react';
import '../styles/Dashboard.css';
import '../styles/Stock.css';
import StockChart from '../services/StockChart';
import Signup from './Signup';
import Login from './Login';
import { fetchStockHistoricalData, fetchStockDetails, fetchStockList } from '../services/StockList';
import DashboardContent from './DashboardContent';

const Dashboard = () => {
  const [isSliderOpen, setSliderOpen] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [stockData, setStockData] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchStockList();
        setStockData(data);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchData();
  }, []);

  const toggleSlider = () => {
    setSliderOpen(!isSliderOpen);
    setShowSignup(false);
    setShowLogin(false);
  };

  const toggleSignup = () => {
    setShowSignup(!showSignup);
    setSliderOpen(false);
    setShowLogin(false);
  };

  const toggleLogin = () => {
    setShowLogin(!showLogin);
    setSliderOpen(false);
    setShowSignup(false);
  };

  const openStockDetails = async (symbol) => {
    try {
      const details = await fetchStockDetails(symbol);
      const historicalData = await fetchStockHistoricalData(details.symbol);
      setSelectedStock({ ...details, historicalData });
    } catch (error) {
      console.error('Error fetching stock details:', error);
      setSelectedStock(null);
    }
  };

  return (
    <div className="dashboard">
      <button className="slider-toggle" onClick={toggleSlider}>
        ☰
      </button>

      <div className={`slider-content ${isSliderOpen ? 'open' : ''}`}>
        <div className="slider-card">
          <nav>
            <ul>
              <li><a href="#settings">Settings</a></li>
              <li onClick={toggleSignup}>
                <a href="#signup">SignUp</a>
              </li>
              <li onClick={toggleLogin}>
                <a href="#login">Login</a>
              </li>
              <li><a href="#theme">Theme</a></li>
            </ul>
          </nav>
          <div className="back-link" onClick={toggleSlider}>
            <a href="#">Back</a>
          </div>
        </div>
      </div>

      {showSignup ? (
        <Signup />
      ) : showLogin ? (
        <Login toggleLogin={toggleLogin} />
      ) : !showSignup && !showLogin && (
        <DashboardContent
          stockData={stockData}
          searchTerm={searchTerm}
          openStockDetails={openStockDetails}
          selectedStock={selectedStock}
          setSearchTerm={setSearchTerm}
        />
      )}
    </div>
  );
};

export default Dashboard;