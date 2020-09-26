import React, { useEffect, useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const data = [
  createData('00:00', 2000),
  createData('03:00', 300),
  createData('06:00', 600),
  createData('09:00', 1850),
  createData('12:00', 1500),
  createData('15:00', 2000),
  createData('18:00', 2400),
  createData('21:00', 2400),
  createData('24:00', 1500),
];

export default function Chart() {
  const theme = useTheme();
  const [orders, setOrders] = useState(null)

  useEffect(() => {
      fetch(`http://localhost:3001/orders/admin`)
        .then(res => res.json())
        .then(data => {
          setOrders(data)
        })
  }, [])

  var arrayData = [];

  if(orders) { //aca deberiamos poner para que solo traiga las ordenes del dia actual
  orders.forEach(element => {
    const time = element.createdAt.split('T')[1].slice(0, 5)
    let total = 0;
    element.products.map(el => {
      total = total + el.order_product.price * el.order_product.quantity
    })
    arrayData.push(createData(time, total))
  });
}

  return (
    <React.Fragment>
      <Title>Ventas de hoy (hardcodeadas)</Title>
      <ResponsiveContainer>
        <LineChart
          data={arrayData}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Ventas ($)
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}