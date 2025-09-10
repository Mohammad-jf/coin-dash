import React, { useEffect, useState } from "react";
import CoinCard from "./components/CoinCard";
const API_URL = import.meta.env.VITE_COINS_API_URL;

const App = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`
        );
        if (!res.ok) throw new Error("failed to fetch data");
        const data = await res.json();
        if (data) {
          setCoins(data);
          setLoading(false);
        }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCoins();
  }, [limit]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <div className="error"> {error}</div>}

      <div className="controls">
        <label htmlFor="limit">Show</label>
        <select
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          id="limit"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
      {!loading && !error && (
        <main className="grid">
          {coins.map((coin) => (
            <CoinCard coin={coin} />
          ))}
        </main>
      )}
    </div>
  );
};

export default App;
