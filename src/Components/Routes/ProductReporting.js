import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';

function Reporting() {
  const [products, setProducts] = useState([]); // State for products
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Function to fetch product data from the server
  const fetchProductData = async () => {
    try {
      const response = await fetch('http://localhost:3001/reporting/products', { mode: 'cors' });
      if (!response.ok) {
        throw new Error('Failed to fetch product data');
      }
      const data = await response.json();

      if (Array.isArray(data)) {
        // Sort products by highest return (product_sale_price - product_provider_price)
        const sortedProducts = data.sort((a, b) => (b.product_sale_price - b.product_provider_price) - (a.product_sale_price - a.product_provider_price));
        // Slice the top 10 products
        const top10Products = sortedProducts.slice(0, 10);
        setProducts(top10Products);
      } else {
        throw new Error('Fetched data is not an array');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchProductData(); // Fetch product data when the component mounts
  }, []);

  // Function to round a number to two decimal places
  const roundToTwoDecimalPlaces = (num) => {
    return Math.round(num * 100) / 100;
  };

  // Function to handle product click and open a popup
  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  // Function to close the popup
  const handleClosePopup = () => {
    setSelectedProduct(null);
  };

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>Top 10 Products with Highest Return</Card.Title>
          {error ? (
            <Card.Text>Error: {error}</Card.Text>
          ) : (
            <ul>
              {products.map((product) => (
                <li key={product.product_id} style={{ marginBottom: '20px' }}>
                  <Card>
                    <Card.Body>
                      <Card.Title>
                        <button
                          onClick={() => handleProductClick(product)}
                          style={{
                            background: 'none',
                            border: 'none',
                            padding: 0,
                            cursor: 'pointer',
                            textDecoration: 'underline',
                            color: 'blue',
                          }}
                        >
                          {product.product_name}
                        </button>
                      </Card.Title>
                      <Card.Text>Product Description: {product.product_description}</Card.Text>
                      <Card.Text>Price: ${product.product_sale_price}</Card.Text>
                      <Card.Text>Provider Price: ${product.product_provider_price}</Card.Text>
                      <Card.Text>
                        Return: ${roundToTwoDecimalPlaces(product.product_sale_price - product.product_provider_price)}
                      </Card.Text>
                      {/* Add more product-related information as needed */}
                    </Card.Body>
                  </Card>
                </li>
              ))}
            </ul>
          )}
        </Card.Body>
      </Card>

      {/* Product Popup */}
      <Modal show={selectedProduct !== null} onHide={handleClosePopup}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedProduct?.product_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Product Description: {selectedProduct?.product_description}</p>
          <p>Price: ${selectedProduct?.product_sale_price}</p>
          <p>Provider Price: ${selectedProduct?.product_provider_price}</p>
          <p>
            Return: ${roundToTwoDecimalPlaces(selectedProduct?.product_sale_price - selectedProduct?.product_provider_price)}
          </p>
          {/* Add more product-related information as needed */}
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClosePopup}>Close</button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Reporting;
