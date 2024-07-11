import React from 'react';
import { useCart } from '../Cart/CartContext'; 

// sample data
const itemsData = [
    {"Item": 1, "Cost": 10, "Weight": 200},
    {"Item": 2, "Cost": 100, "Weight": 20},
    {"Item": 3, "Cost": 30, "Weight": 300},
    {"Item": 4, "Cost": 20, "Weight": 500},
    {"Item": 5, "Cost": 30, "Weight": 250},
    {"Item": 6, "Cost": 40, "Weight": 10},
    {"Item": 7, "Cost": 200, "Weight": 10},
    {"Item": 8, "Cost": 120, "Weight": 500},
    {"Item": 9, "Cost": 130, "Weight": 790},
    {"Item": 10, "Cost": 20, "Weight": 100},
    {"Item": 11, "Cost": 10, "Weight": 340},
    {"Item": 12, "Cost": 4, "Weight": 800},
    {"Item": 13, "Cost": 5, "Weight": 200},
    {"Item": 14, "Cost": 240, "Weight": 20},
    {"Item": 15, "Cost": 123, "Weight": 700},
    {"Item": 16, "Cost": 245, "Weight": 10},
    {"Item": 17, "Cost": 230, "Weight": 20},
    {"Item": 18, "Cost": 110, "Weight": 200},
    {"Item": 19, "Cost": 45, "Weight": 200},
    {"Item": 20, "Cost": 67, "Weight": 20},
    {"Item": 21, "Cost": 88, "Weight": 300},
    {"Item": 22, "Cost": 10, "Weight": 500},
    {"Item": 23, "Cost": 17, "Weight": 250},
    {"Item": 24, "Cost": 19, "Weight": 10},
    {"Item": 25, "Cost": 89, "Weight": 10},
    {"Item": 26, "Cost": 45, "Weight": 500},
    {"Item": 27, "Cost": 99, "Weight": 790},
    {"Item": 28, "Cost": 125, "Weight": 100},
    {"Item": 29, "Cost": 198, "Weight": 340},
    {"Item": 30, "Cost": 220, "Weight": 800},
    {"Item": 31, "Cost": 249, "Weight": 200},
    {"Item": 32, "Cost": 230, "Weight": 20},
    {"Item": 33, "Cost": 190, "Weight": 700},
    {"Item": 34, "Cost": 45, "Weight": 10},
    {"Item": 35, "Cost": 12, "Weight": 20},
    {"Item": 36, "Cost": 5, "Weight": 200},
    {"Item": 37, "Cost": 2, "Weight": 200},
    {"Item": 38, "Cost": 90, "Weight": 20},
    {"Item": 39, "Cost": 12, "Weight": 300},
    {"Item": 40, "Cost": 167, "Weight": 500},
    {"Item": 41, "Cost": 12, "Weight": 250},
    {"Item": 42, "Cost": 8, "Weight": 10},
    {"Item": 43, "Cost": 2, "Weight": 10},
    {"Item": 44, "Cost": 9, "Weight": 500},
    {"Item": 45, "Cost": 210, "Weight": 790},
    {"Item": 46, "Cost": 167, "Weight": 100},
    {"Item": 47, "Cost": 23, "Weight": 340},
    {"Item": 48, "Cost": 190, "Weight": 800},
    {"Item": 49, "Cost": 199, "Weight": 200},
    {"Item": 50, "Cost": 12, "Weight": 20}
];

const Home = () => {
  const { addToCart } = useCart();

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Items List</h1>
      <div className="row">
        {itemsData.map((item, index) => (
          <div key={index} className="col-lg-4 col-md-6 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Item {item.Item}</h5>
                <p className="card-text">Cost: ${item.Cost}</p>
                <p className="card-text">Weight: {item.Weight} g</p>
                <button
                  className="btn btn-primary"
                  onClick={() => addToCart(item)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
