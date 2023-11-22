import React, { useState, useEffect } from 'react';
import { Container, Card, Modal, Row, Col } from 'react-bootstrap';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
);

function WarehouseReporting() {
  const [warehouses, setWarehouses] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const response = await fetch('http://132.145.219.172:3001/reporting/warehouses', { mode: 'cors' });
        if (!response.ok) {
          throw new Error('Failed to fetch warehouse data');
        }
        const data = await response.json();
        setWarehouses(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchWarehouses();
  }, []);

  const handleWarehouseClick = (warehouse) => {
    setSelectedWarehouse(warehouse);
  };

  const handleClosePopup = () => {
    setSelectedWarehouse(null);
  };

  const chartLabels = warehouses.map(wh => wh.warehouse_name);

  const barChartData = {
    labels: chartLabels,
    datasets: [{
      label: 'Total Products Transferred To',
      data: warehouses.map(wh => wh.totalProductsTransferredTo),
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1
    }]
  };

  const lineChartData = {
    labels: chartLabels,
    datasets: [{
      label: 'Total Products Transferred From',
      data: warehouses.map(wh => wh.totalProductsTransferredFrom),
      fill: false,
      borderColor: 'rgb(54, 162, 235)',
      tension: 0.1
    }]
  };

  const pieChartData = {
    labels: chartLabels,
    datasets: [{
      label: 'Total Transfer Amount To',
      data: warehouses.map(wh => wh.totalTransferAmountTo),
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        // Add more colors as needed
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        // Add more colors as needed
      ],
      borderWidth: 1
    }]
  };

  return (
    <Container>
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>Warehouses</Card.Title>
          {error ? <p>Error: {error}</p> : null}
          <ul>
            {warehouses.map(warehouse => (
              <li key={warehouse.warehouse_id}>
                <button
                  onClick={() => handleWarehouseClick(warehouse)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    color: 'blue',
                  }}
                >
                  {warehouse.warehouse_name}
                </button>
              </li>
            ))}
          </ul>
        </Card.Body>
      </Card>

      {/* Chart Components */}
      <Container className="py-4" style={{ backgroundColor: 'white' }}>
        <Row>
          <Col md={6}>
            <div className="chart-container" style={{ position: 'relative', height: '40vh' }}>
              <Bar data={barChartData} />
            </div>
          </Col>
          <Col md={6}>
            <div className="chart-container" style={{ position: 'relative', height: '40vh' }}>
              <Line data={lineChartData} />
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={6} className="offset-md-3">
            <div className="chart-container" style={{ position: 'relative', height: '30vh' }}>
              <Pie data={pieChartData} />
            </div>
          </Col>
        </Row>
      </Container>

      {/* Warehouse Popup */}
      <Modal show={selectedWarehouse !== null} onHide={handleClosePopup} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedWarehouse?.warehouse_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <p>Warehouse ID: {selectedWarehouse?.warehouse_id}</p>
              <p>Description: {selectedWarehouse?.warehouse_description}</p>
              <p>Address: {selectedWarehouse?.warehouse_address}</p>
              <p>City: {selectedWarehouse?.warehouse_city}</p>
              <p>State: {selectedWarehouse?.warehouse_state}</p>
              <p>Zipcode: {selectedWarehouse?.warehouse_zipcode}</p>
              <p>Capacity: {selectedWarehouse?.warehouse_capacity}</p>
              <p>Total Products Transferred To: {selectedWarehouse?.totalProductsTransferredTo}</p>
              <p>Total Products Transferred From: {selectedWarehouse?.totalProductsTransferredFrom}</p>
              <p>Total Transfer Amount To: {selectedWarehouse?.totalTransferAmountTo}</p>
              <p>Total Transfer Amount From: {selectedWarehouse?.totalTransferAmountFrom}</p>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClosePopup}>Close</button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default WarehouseReporting;
