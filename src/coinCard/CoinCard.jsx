import React from 'react';
import './CoinCard.css';
import { useSelector } from 'react-redux';


const Triangle = ({ isUp }) => (
  <div className={`triangle ${isUp ? 'up' : 'down'}`} />
);

const CoinCard = ({ number, coinName, coinImage, coinPrice, coin24hChange, coinMarketCap }) => {
  const currency = useSelector(state => state.home.currency);

  // Ensure that the coinPrice and other numeric values are correctly converted to locale strings
  return (
    <div className="coin-container ">
      <div className="number">{number}</div>
      <div className="coin-info">
        <img src={coinImage} alt={`${coinName} logo`} className="coin-image" />
        <span className="coin-name">{coinName}</span>
      </div>
      <div className="coin-price">
        {currency.symbol}{coinPrice}
      </div>
      <div style={{ color: coin24hChange < 0 ? 'red' : 'inherit' }} className="coin-24h-change">
        {coin24hChange > 0 ? <Triangle isUp={true} /> : <Triangle isUp={false} />}
        {coin24hChange}%
      </div>

      <div  className="coin-market-cap">
        {currency.symbol}{coinMarketCap.toLocaleString()}
      </div>
    </div>
  );
};

export default CoinCard;
