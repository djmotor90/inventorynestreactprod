//TODO considering what this data is a bar chart makes more sense. need to rename
//Note: youll get data back from the last 20 days, some may be empty some wont be 
import React, { PureComponent } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card      from 'react-bootstrap/Card';


function BarPlot({ data }) {
  let formattedData = [];
  for(let i=0; i<Object.keys(data).length; i++){
    formattedData.push({revenue: data[Object.keys(data)[i]], name: Object.keys(data)[i]})
  }
  return(
      <Card  data-bs-theme="dark">
      <Card.Title> Revenue Over Past 10 Days</Card.Title>
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
              <Bar dataKey="revenue" fill="orange" activeBar={<Rectangle fill="pink" stroke="blue" />} />
              </BarChart>
      </Card.Body>
      </Card>
  );
}
export default BarPlot;


