import React, { useState } from 'react';
import { useCart } from '../Cart/CartContext'; 
import { Modal, Button } from 'react-bootstrap';

const Cart = () => {
  const { cart, removeFromCart } = useCart(); 
  const [packages, setPackages] = useState([]);
  const [showModal, setShowModal] = useState(false); 

  // function to calculate shipping charge based on its weight
  const calculateShippingCharge = (totalWeight) => {
    if (totalWeight <= 200) return 5;
    else if (totalWeight <= 500) return 10;
    else if (totalWeight <= 1000) return 15;
    else return 20;
  };

  // function to calculate the total price
  const calculateTotalPrice = (items) => {
    return items.reduce((total, item) => total + item.Cost, 0);
  };

  // function to handle remove cart data
  const handleRemoveFromCart = (item) => {
    removeFromCart(item);

    const updatedPackages = packages.map(pkg => ({
      ...pkg,
      items: pkg.items.filter(i => i !== item),
      totalCost: calculateTotalPrice(pkg.items.filter(i => i !== item)),
      shippingCost: calculateShippingCharge(pkg.items.filter(i => i !== item).reduce((total, i) => total + i.Weight, 0)),
    }));

    setPackages(updatedPackages);
  };

  const placeOrder = () => {
    const maxCostPerPackage = 250;
    const cartSortedByWeight = [...cart].sort((a, b) => b.Weight - a.Weight); 

    let currentPackage = [];
    let currentPackageWeight = 0;
    let currentPackageCost = 0;
    let packageListNumber = 1;

    cartSortedByWeight.forEach(item => {
      if (currentPackageWeight + item.Weight <= 5000 && currentPackageCost + item.Cost <= maxCostPerPackage) {
        currentPackage.push(item);
        currentPackageWeight += item.Weight;
        currentPackageCost += item.Cost;
      } else {
        packages.push({
          number: packageListNumber,
          items: [...currentPackage],
          totalCost: currentPackageCost,
          shippingCost: calculateShippingCharge(currentPackageWeight),
        });
        packageListNumber++;
        currentPackage = [item];
        currentPackageWeight = item.Weight;
        currentPackageCost = item.Cost;
      }
    });

    // push the last package
    if (currentPackage.length > 0) {
      packages.push({
        number: packageListNumber,
        items: [...currentPackage],
        totalCost: currentPackageCost,
        shippingCost: calculateShippingCharge(currentPackageWeight),
      });
    }
    // open the modal after placing the order
    setShowModal(true); 
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setPackages([]);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">My Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((item, index) => (
          <div key={index} className="mb-4">
            <ul className="list-group mb-3">
              <li className="list-group-item">
                <div>
                  <strong>Item: {item.Item}</strong>
                  <p>Cost: ${item.Cost}</p>
                  <p>Weight: {item.Weight} g</p>
                </div>
                <div className="col-auto d-flex justify-content-end">
                <button className="btn btn-danger btn-sm ms-3" onClick={() => handleRemoveFromCart(item)}>Remove</button>
                </div>
              </li>
            </ul>
          </div>
        ))
      )}
      <div className="mb-3 d-flex justify-content-end">
        <button className="btn btn-primary" onClick={placeOrder} disabled={cart.length === 0}>Place Order</button>
      </div>

      {/* modal to display order details */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {packages.map((pkg, index) => (
            <div key={index} className="mb-4">
              <h3>Package {pkg.number}</h3>
              <ul className="list-group mb-3">
                {pkg.items.map((item, index) => (
                  <li key={index} className="list-group-item">
                    <div>
                      <strong>Item: {item.Item}</strong>
                      <p>Cost: ${item.Cost}</p>
                      <p>Weight: {item.Weight} g</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div>
                <strong>Total Cost:</strong> ${pkg.totalCost}
              </div>
              <div>
                <strong>Shipping Cost:</strong> ${pkg.shippingCost}
              </div>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Cart;
