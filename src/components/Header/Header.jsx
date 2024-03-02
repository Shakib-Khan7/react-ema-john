/* eslint-disable no-unused-vars */
import React from 'react';
import './Header.css'
import logo from '../../images/Logo.svg'
import { Link } from 'react-router-dom';
const Header = () => {
    return (
        <nav className='header'>

            <img src={logo} alt="" />

            <div>
                <Link to="/orders">orders</Link>
                <Link to="/inventory">Inventory</Link>
                <Link to="/">shop</Link>
                <Link to="/Login">Login</Link>
            </div>
        </nav>
    );
};

export default Header;