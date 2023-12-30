const API_KEY = 'pk_3af404fd17e1494680a168c86adb9db9';

const fetchStockList = async () => {
  try {
    const response = await fetch(`https://cloud.iexapis.com/v1/ref-data/symbols?token=${API_KEY}`);
    const data = await response.json();

    const sortedData = data.sort((a, b) => b.latestPrice - a.latestPrice);
    return sortedData.slice(0, 100);
  } catch (error) {
    console.error('Error fetching stock list:', error);
    throw error;
  }
};

const fetchStockDetails = async (symbol) => {
  try {
    const response = await fetch(`https://cloud.iexapis.com/v1/stock/${symbol}/quote?token=${API_KEY}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching stock details:', error);
    throw error;
  }
};

const fetchStockHistoricalData = async (symbol) => {
  try {
    const response = await fetch(`https://cloud.iexapis.com/v1/stock/${symbol}/chart/1m?token=${API_KEY}`);

    if (!response.ok) {
      throw new Error('Failed to fetch historical data');
    }

    const historicalData = await response.json();
    const formattedData = historicalData.map((data) => ({
      date: data.date,
      close: data.close,
    }));

    return formattedData;
  } catch (error) {
    console.error('Error fetching historical data:', error);
    throw error;
  }
};

export { fetchStockHistoricalData, fetchStockDetails, fetchStockList };
