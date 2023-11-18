import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

function Reporting({ ownerName }) {
  const [owners, setOwners] = useState([]);
  const [error, setError] = useState(null);

  // Function to fetch owner data from the server
  const fetchOwnerData = async () => {
    try {
      const response = await fetch('http://localhost:3001/reporting', { mode: 'cors' });
      if (!response.ok) {
        throw new Error('Failed to fetch owner data');
      }
      const data = await response.json();

      if (Array.isArray(data)) {
        setOwners(data);
      } else {
        throw new Error('Fetched data is not an array');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchOwnerData();
  }, []);

  // Function to calculate days between two dates
  const calculateDaysActive = (createdAt) => {
    const today = new Date();
    const createdDate = new Date(createdAt);
    const timeDifference = today.getTime() - createdDate.getTime();
    const daysActive = Math.floor(timeDifference / (1000 * 3600 * 24));
    return daysActive;
  };

  return (
    <Container>
      <h1>Welcome back, {ownerName}</h1>
      {error ? (
        <Card>
          <Card.Body>
            <Card.Title>Error</Card.Title>
            <Card.Text>Error: {error}</Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <div>
          <h2>Owner List</h2>
          {owners.map((owner) => (
            <Card key={owner.owner_id} style={{ marginBottom: '20px' }}>
              <Card.Body>
                <Card.Title>
                  {owner.owner_first_name} {owner.owner_last_name}
                </Card.Title>
                <Card.Text>Starting Money: ${owner.starting_money}</Card.Text>
                <Card.Text>Total Expenditures: ${owner.total_expenditures}</Card.Text>
                <Card.Text>Total Revenue: ${owner.total_revenue}</Card.Text>
                <Card.Text>Money Left: ${owner.starting_money - owner.total_expenditures}</Card.Text>
                <Card.Text>Created At: {new Date(owner.createdAt).toLocaleDateString()}</Card.Text>
                <Card.Text>Updated At: {new Date(owner.updatedAt).toLocaleDateString()}</Card.Text>
                <Card.Text>Days Active: {calculateDaysActive(owner.createdAt)}</Card.Text>
                <Card.Text>
                  {owner.total_revenue >= owner.total_expenditures
                    ? 'You are making more revenue than spending!'
                    : 'You are spending more than your revenue!'}
                </Card.Text>
                <Card.Text>
                  Revenue vs Expenditures: {((owner.total_revenue / owner.total_expenditures) * 100).toFixed(2)}%
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
}

export default Reporting;
