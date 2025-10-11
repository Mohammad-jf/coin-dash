import { useEffect, useState } from "react";
import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
const API_URL = import.meta.env.VITE_COINS_API_URL;
import AboutPage from "./pages/AboutPage";
import Header from "./components/Header";
import NotFoundPage from "./pages/not-found";
import CoinDetailPage from "./pages/CoinDetailPage";

const App = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("market_cap_desc");

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${API_URL}&order=${sortBy}&per_page=${limit}&page=1&sparkline=false`
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
  }, [limit, sortBy]);

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              coins={coins}
              loading={loading}
              error={error}
              limit={limit}
              setLimit={setLimit}
              setFilter={setFilter}
              filter={filter}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
          }
        />

        <Route path="/about" element={<AboutPage />} />
        <Route path="/coin/:id" element={<CoinDetailPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
