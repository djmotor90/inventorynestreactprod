import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';

function CustomerReporting() {
  const [customerDemographics, setCustomerDemographics] = useState({});
  const [topCustomers, setTopCustomers] = useState([]);
  const [error, setError] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await fetch('http://localhost:3001/reporting/customers', { mode: 'cors' });
        if (!response.ok) {
          throw new Error('Failed to fetch customer data');
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          calculateCustomerDemographics(data);
        } else {
          throw new Error('Fetched data is not an array');
        }
      } catch (error) {
        setError(error.message);
      }
    };

    const calculateCustomerDemographics = (customerData) => {
      const demographics = {};
      customerData.forEach((customer) => {
        const { customer_city, customer_state } = customer;
        const locationKey = `${customer_city}, ${customer_state}`;
        if (!demographics[locationKey]) {
          demographics[locationKey] = 0;
        }
        demographics[locationKey]++;
      });

      setCustomerDemographics(demographics);
    };

    fetchCustomerData();
  }, []);

  useEffect(() => {
    const fetchTopCustomers = async () => {
      try {
        const response = await fetch('http://localhost:3001/reporting/customerorders', { mode: 'cors' });
        if (!response.ok) {
          throw new Error('Failed to fetch top customers');
        }
        const data = await response.json();

        if (Array.isArray(data)) {
          const updatedData = data.map(customer => ({
            ...customer,
            customer_picture_url: customer.customer_picture_filename
              ? `http://localhost:3001/images/${customer.customer_picture_filename}`
              : null
          }));
          setTopCustomers(updatedData);
        } else {
          throw new Error('Fetched data is not an array');
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchTopCustomers();
  }, []);

  const sortedTopCustomers = topCustomers
    .sort((a, b) => b.total_quantity - a.total_quantity)
    .slice(0, 5);

  const getTopDemographics = () => {
    const sortedDemographics = Object.entries(customerDemographics).sort(
      (a, b) => b[1] - a[1]
    );
    return sortedDemographics.slice(0, 5);
  };

  const topDemographics = getTopDemographics();

  const handleCustomerClick = (customer) => {
    setSelectedCustomer(customer);
  };

  const handleClosePopup = () => {
    setSelectedCustomer(null);
  };

  return (
    <Container>
      <Row>
        <Col>
          <Card style={{ marginBottom: '20px' }}>
            <Card.Body>
              <Card.Title>Customer Demographics</Card.Title>
              {error ? (
                <p>Error: {error}</p>
              ) : (
                <ul>
                  {Object.entries(customerDemographics).map(([location, count]) => (
                    <li key={location}>
                      <p>{location}: {count} customers</p>
                    </li>
                  ))}
                </ul>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ marginBottom: '20px' }}>
            <Card.Body>
              <Card.Title>Top 5 Customers by Purchase Count</Card.Title>
              <ul>
                {sortedTopCustomers.map((customer) => (
                  <li key={customer.customer_id}>
                    <Card>
                      <Card.Body>
                        <button
                          onClick={() => handleCustomerClick(customer)}
                          style={{
                            background: 'none',
                            border: 'none',
                            padding: 0,
                            cursor: 'pointer',
                            textDecoration: 'underline',
                            color: 'blue',
                          }}
                        >
                          <h3>{customer.customer_first_name} {customer.customer_last_name}</h3>
                        </button>
                        <h4>Quantity: {customer.quantityPurchased} - Total Spent: ${customer.amountSpent.toFixed(2)}</h4>
                      </Card.Body>
                    </Card>
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Top 5 Demographics</Card.Title>
              <ul>
                {topDemographics.map(([location, count]) => (
                  <li key={location}>
                    <p>{location}: {count} customers</p>
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Customer Popup */}
      <Modal show={selectedCustomer !== null} onHide={handleClosePopup} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedCustomer?.customer_first_name} {selectedCustomer?.customer_last_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <h4>Quantity: {selectedCustomer?.quantityPurchased} - Total Spent: ${selectedCustomer?.amountSpent.toFixed(2)}</h4>
              <p><strong>Customer ID:</strong> {selectedCustomer?.customer_id}</p>
              <p><strong>City:</strong> {selectedCustomer?.customer_city}</p>
              <p><strong>State:</strong> {selectedCustomer?.customer_state}</p>
              <p><strong>Zipcode:</strong> {selectedCustomer?.customer_zipcode}</p>
              {/* Add more customer-related information as needed */}
            </Col>
            {selectedCustomer?.customer_picture_url && (
              <Col>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <img src={selectedCustomer.customer_picture_url} alt="Customer" style={{ maxWidth: '100%', maxHeight: '300px' }} />
                </div>
              </Col>
            )}
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClosePopup}>Close</button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default CustomerReporting;
