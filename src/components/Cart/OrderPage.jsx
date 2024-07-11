import React, { useState } from 'react';

const OrderPage = () => {
  const [products] = useState([
    { id: 1, name: "Product A", price: 240, weight: 200 },
    { id: 2, name: "Product B", price: 250, weight: 300 },
    { id: 3, name: "Product C", price: 10, weight: 250 },
    { id: 4, name: "Product D", price: 10, weight: 400 },
  ]);

  const [selectedItems, setSelectedItems] = useState([]);
  const [packages, setPackages] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false); 

  // function to handle checkbox selection
  const handleCheckboxChange = (productId) => {
    const selectedItem = products.find(item => item.id === productId);
    if (selectedItems.includes(selectedItem)) {
      setSelectedItems(selectedItems.filter(item => item !== selectedItem));
    } else {
      setSelectedItems([...selectedItems, selectedItem]);
    }
  };

  // function to calculate shipping charge based on total weight
  const calculateShippingCharge = (totalWeight) => {
    if (totalWeight <= 200) return 5;
    else if (totalWeight <= 500) return 10;
    else if (totalWeight <= 1000) return 15;
    else return 20;
  };

  // function to handle placing the order
  const placeOrder = () => {
    if (!orderPlaced) {
      const maxCostPerPackage = 250;

      // Sort selected items by price ascending to prioritize cheaper items at first
      const selectedItemsSorted = [...selectedItems].sort((a, b) => a.price - b.price);

      let currentPackage = [];
      let currentPackageWeight = 0;
      let currentPackageCost = 0;
      let packageNumber = 1;

      selectedItemsSorted.forEach(item => {
        // check if item exceeds the package cost limit
        if (currentPackageCost + item.price > maxCostPerPackage) {
          // if yes, create a new package
          const newPackage = {
            number: packageNumber,
            items: [...currentPackage],
            totalCost: currentPackageCost,
            shippingCost: calculateShippingCharge(currentPackageWeight),
          };
          setPackages(prevPackages => [...prevPackages, newPackage]);
          packageNumber++;
          currentPackage = [item];
          currentPackageWeight = item.weight;
          currentPackageCost = item.price;
        } else {
          // else add ta current package
          currentPackage.push(item);
          currentPackageWeight += item.weight;
          currentPackageCost += item.price;
        }
      });

      // add the last package if there are remaining items
      if (currentPackage.length > 0) {
        const newPackage = {
          number: packageNumber,
          items: [...currentPackage],
          totalCost: currentPackageCost,
          shippingCost: calculateShippingCharge(currentPackageWeight),
        };
        setPackages(prevPackages => [...prevPackages, newPackage]);
      }

      setOrderPlaced(true);
    }
  };


  return (
    <div className="container mt-4">
      <h2 className="mb-3">Product List</h2>
      <ul className="list-group mb-3">
        {products.map(product => (
          <li key={product.id} className="list-group-item">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id={`checkbox-${product.id}`}
                checked={selectedItems.includes(product)}
                onChange={() => handleCheckboxChange(product.id)}
              />
              <label className="form-check-label" htmlFor={`checkbox-${product.id}`}>
                <strong>{product.name}</strong>
                <p>Price: ${product.price}</p>
                <p>Weight: {product.weight} g</p>
              </label>
            </div>
          </li>
        ))}
      </ul>
      <div className="mb-3">
        <button className="btn btn-primary" onClick={placeOrder} disabled={orderPlaced}>Place Order</button>
      </div>
      
      {packages.length > 0 && (
        <div>
          <h2>Order Details</h2>
          {packages.map(pkg => (
            <div key={pkg.number} className="mb-4">
              <h3>Package {pkg.number}</h3>
              <ul className="list-group mb-3">
                {pkg.items.map(item => (
                  <li key={item.id} className="list-group-item">
                    <div>
                      <strong>{item.name}</strong>
                      <p>Price: ${item.price}</p>
                      <p>Weight: {item.weight} g</p>
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
        </div>
      )}
    </div>
  );
};

export default OrderPage;
