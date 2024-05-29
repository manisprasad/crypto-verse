import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { setCoinData } from '../../store/homeSlice';
import Loading from '../../components/loading/Loading';
import CoinCard from '../../coinCard/CoinCard';
// import SearchArea from '../../components/searchArea/SearchArea'
import './Home.css';
import '../../index.css';

const Home = () => {
  const dispatch = useDispatch();
  const currency = useSelector((state) => state.home.currency);
  const [searchResults, setSearchResults] = useState(null);
  const [query, setQuery] = useState("");
  const { data, loading, error } = useFetch(`/coins/markets?vs_currency=${currency.name}&order=market_cap_desc&per_page=30&page=1&sparkline=false`);

  useEffect(() => {
    if (data) {
      dispatch(setCoinData(data));
    }
  }, [data, dispatch]);




  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);
   
    if (value.trim().length === 0) {
      setSearchResults(null);
      return;
    }

    if (query) {
      try {
        const response = await fetch(`https://api.coingecko.com/api/v3/search?query=${query}`);
        
        if (!response.ok) {
          throw new Error("No coin found");
        }
        
        const data = await response.json();
        setSearchResults(data);
        
      } catch (error) {
        console.error("Error fetching search results:", error);
        // Optionally, you could set an error state here
        // setError(error.message);
      }
    }
  };




  console.log(searchResults);

  return (
    <div className={`home ${loading ? 'blur' : ''}`}>
      {loading && <Loading />}
      {error && <p>Error: {error.message}</p>}
      <div className="hero">
        <h1>Largest <br /> Crypto MarketPlace</h1>
        <p>Make The World A Better Place With Cryptocurrency.</p>
        <form>
          <div className="action-element">
            <input   onChange={handleSearch} type="text" value={query} placeholder='Search Crypto..' />
            {/* <button type="submit">Search</button> */}
          </div>
          {searchResults && (
            <div className="search-result glass">
              {searchResults && searchResults.coins.map((coin) => (
                <Link to={`/coin/${coin.id}`} key={coin.id}>
                  <div className="search-result-item ">
                  <p className="coin-rank">{coin.market_cap_rank || "#"} </p>
                    <img src={coin.large} alt={coin.name} />
                    <p className="coin-name">{coin.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </form>
      </div>

      <div className="crypto-list">
        <div className="layout glass">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p>24H Change</p>
          <p>Market Cap</p>
        </div>
        {Array.isArray(data) ? (
          <div className="all-coin">
            {!error && data.map((item, index) => (
              <Link key={item.id} to={`/coin/${item.id}`}>
                <CoinCard
                  number={index + 1}
                  coinName={item.name}
                  coinImage={item.image}
                  coinPrice={item.current_price}
                  coin24hChange={item.price_change_percentage_24h}
                  coinMarketCap={item.market_cap}
                />
              </Link>
            ))}
          </div>
        ) : (
          <p>Data is not available</p>
        )}
      </div>
      <div className="pagination">
        <button>Prev</button>
        <button>Next</button>
      </div>
    </div>
  );
};

export default Home;
