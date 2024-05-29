import React from 'react';
import { useDispatch } from 'react-redux';
import logo from '../../assets/logo.png';
import { setCurrency } from '../../store/homeSlice';
import "./Navbar.css";
import "../../index.css";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const dispatch = useDispatch();

  const onCurrencyChange = (e) => {
    dispatch(setCurrency({
      name: e.target.value,
      symbol: e.target.value === 'USD' ? '$' : e.target.value === 'INR' ? '₹' : '€'
    }));
  };

  return (
    <nav className='navbar'>
      <Link to={'/'}><img src={logo} alt="Logo" /></Link>
      <ul>
       <Link to={'/'}> <li>Home</li></Link>
        <li>Blogs</li>
        <li>Feedback</li>
        <li>Contact Us</li>
      </ul>
      <div className="nav-right">
        <select onChange={onCurrencyChange} defaultValue="USD">
          <option value="USD">USD</option>
          <option value="INR">INR</option>
          <option value="EUR">EUR</option>
        </select>
        <button type="button">Sign up</button>
      </div>
    </nav>
  );
};

export default Navbar;
