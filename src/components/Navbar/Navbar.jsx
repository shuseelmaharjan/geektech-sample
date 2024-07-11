import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../Cart/CartContext'; 

const Navbar = () => {
  const { totalItemsInCart } = useCart();

  return (
    // navbar
    <div className="container-fluid bg-dark py-3">
      <div className="container">
        <div className="row d-flex justify-content-between align-items-center">
          <div className="col-auto">
            <Link to="/" className="navbar-brand text-white">
              GeekTech
            </Link>
          </div>
          <div className="col-auto">
            <ul className="nav">
              <li className="nav-item">
                <Link to="/shop" className="nav-link text-white">Shop</Link>
              </li>
              <li className="nav-item">
                <Link to="/cart" className="nav-link text-white">Cart ({totalItemsInCart})</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
