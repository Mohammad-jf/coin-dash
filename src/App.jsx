import React, { useEffect, useState } from "react";
const API_Url =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

const App = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        setLoading(true);
        const res = await fetch(API_Url);
        if (!res.ok) throw new Error("failed to fetch data");
        const data = await res.json();
        if (data) {
          console.log(data);
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
          {coins.map((coin)=>{
            <div className="coin-card" key={coin.id}>
              <div className="coin-header">
                <img src="" alt="" />
              </div>

            </div>
          })}
        </main>
      )}
    </div>
  );
};

export default App;
