//Import in all hooks and dependencies
import { useEffect, useState } from 'react';

//Import in bootstrap
import Container from 'react-bootstrap/Container';
import Row       from 'react-bootstrap/Row';
import Col       from 'react-bootstrap/Col';
//Import in all components
import ReportingCard from './ReportingCard';
import LandingCard   from './LandingCards';
import BarPlot       from './BarPlot';
import MapPlot       from './MapPlot';

function Home( { ownerName }) {
  const [cardData, setCardData] = useState(null);
  const [barData, setbarData] = useState(null);
  const [transferData, setTransferData] = useState(null);
  const [mapPlotData, setMapPlotData] = useState(null);
  const makeAPICall = async () => {
    try {
      const response = await fetch('http://localhost:3001/', {mode:'cors'});
      const data = await response.json();
      setTransferData(data.transferInformation);
      setbarData(data.barInformation);
      setCardData(data.cardInformation);
      setMapPlotData(data.mapInformation);
    }
    catch (e) {
      console.log(e, 'error')
    }
  }
  useEffect(() => {
    makeAPICall();
  }, [])
  //Purpose: only try to fill page if data is loaded
  const displayTransferData = transferData  && <ReportingCard data = {transferData}/>;
  const displayCards = cardData  && <LandingCard data = {cardData} />;
  const displayScatter = barData && <BarPlot data = {barData} />;
  const displayMapPlot = mapPlotData && <MapPlot data={mapPlotData}/>

  return (
    <div>
      <h1>Welcome back, {ownerName} </h1>
      <Container fluid>
      <Row>
        <Col sm={7}> {displayCards}</Col>
        <Col sm={5} className="min-w-600" > {displayScatter}</Col>
      </Row>
      <Row>
        <Col sm={8}> {displayMapPlot} </Col>
        <Col sm={4}>{displayTransferData}</Col>
      </Row>
    </Container>

      
      
    </div>
  );
}
export default Home;