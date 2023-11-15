import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function CustomerReporting() {
  const [customerDemographics, setCustomerDemographics] = useState({});
  const [topCustomers, setTopCustomers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch customer data from the server
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

    // Function to calculate customer demographics
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
  }, []); // Empty dependency array

  useEffect(() => {
    // Function to fetch top 5 customers by purchase count
    const fetchTopCustomers = async () => {
      try {
        const response = await fetch('http://localhost:3001/reporting/customerorders', { mode: 'cors' });
        if (!response.ok) {
          throw new Error('Failed to fetch top customers');
        }
        const data = await response.json();

        if (Array.isArray(data)) {
          setTopCustomers(data);
        } else {
          throw new Error('Fetched data is not an array');
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchTopCustomers();
  }, []); // Empty dependency array

  // Sort topCustomers by total_quantity in descending order and limit to the top 5
  const sortedTopCustomers = topCustomers
    .sort((a, b) => b.total_quantity - a.total_quantity)
    .slice(0, 5);

  // Function to get top 5 demographics
  const getTopDemographics = () => {
    const sortedDemographics = Object.entries(customerDemographics).sort(
      (a, b) => b[1] - a[1]
    );
    return sortedDemographics.slice(0, 5);
  };

  const topDemographics = getTopDemographics();

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
                        <h3>{customer.customer_first_name} {customer.customer_last_name}</h3>
                        <h4>Quantity: {customer.quantityPurchased} - Total Spent: ${customer.amountSpent}</h4>
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
    </Container>
  );
}

export default CustomerReporting;
