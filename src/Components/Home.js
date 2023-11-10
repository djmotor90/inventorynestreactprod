//Import in all hooks and dependencies
import { useEffect, useState } from 'react';

//Import in all components
import ReportingCard from './ReportingCard';

function Home() {
  const [scatterData, setScatterData] = useState(null);
  const [transferData, setTransferData] = useState(null);
  const makeAPICall = async () => {
    try {
      const response = await fetch('http://localhost:3001/', {mode:'cors'});
      const data = await response.json();
      setTransferData(data.transferInformation);
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

  return (
    <div>
      <p>Test</p>
      {displayTransferData}
    </div>
  );
}
export default Home;