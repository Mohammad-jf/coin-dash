import React, { useEffect, useState } from "react";
import CoinCard from "./components/CoinCard";
const API_Url = import.meta.env.VITE_API_URL;

const App = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${API_Url}&order=market_cap_desc&per_page=10&page=1&sparkline=false`
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
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <div className="error"> {error}</div>}

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
