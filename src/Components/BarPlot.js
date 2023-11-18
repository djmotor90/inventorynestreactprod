//TODO considering what this data is a bar chart makes more sense. need to rename
//Note: youll get data back from the last 20 days, some may be empty some wont be 
//TODO reszing is not responsive
import React     from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Card      from 'react-bootstrap/Card';


function BarPlot({ data, type }) {
  console.log(data);
  let formattedData = [];
  for(let i=0; i<Object.keys(data).length; i++){
    formattedData.push({[type]: data[Object.keys(data)[i]], name: Object.keys(data)[i]})
  }
  let title = ''
  if (type === 'revenue'){
    title = 'Revenue'
  }else{
    title="Quantity Sold"
  }
  return(
      <Card  data-bs-theme="dark" style={{minWidth:'500px'}}>
      <Card.Header>
            <h3> {title} Over The Past 10 Days</h3>
      </Card.Header>
      <Card.Body>
          <BarChart
              width={500}
              height={300}
              data={formattedData.reverse()}
              margin={{
                    top: 20,
                    right: 0,
                    left: 0,
                    bottom: 5,
              }}
              >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey={type} fill="green" activeBar={<Rectangle fill="pink" stroke="blue" />} />
              </BarChart>
      </Card.Body>
      </Card>
  );
}
export default BarPlot;


