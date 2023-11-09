import { useEffect, useState } from 'react';
function Home() {
  const [scatterData, setScatterData] = useState([]);
  
  const makeAPICall = async () => {
    try {
      const response = await fetch('http://localhost:3001/', {mode:'cors'});
      const data = await response.json();
      console.log({ data })
    }
    catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    makeAPICall();
  }, [])
  return (
    <div className="">
      
    </div>
  );
}
export default Home;