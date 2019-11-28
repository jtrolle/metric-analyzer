import React from 'react';
import Header from './Header';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import metrics from './metrics.json';

const memory = metrics.map(function({used, buff, cach, free, time}) {
  return {
    used: (used ? used : 0) / 1000000,
    buff: (buff ? buff : 0) / 1000000,
    cach: (cach ? cach : 0) / 1000000,
//    free: (free ? free : 0) / 1000000,
    time,
  }
});

const cpu = metrics.map(function ({ usr, sys, idl, wai, hiq, siq, time }) {
  return {
    usr,
    sys,
//    idl,
    wai,
    hiq,
    siq,
    time,
  }
});

const App: React.FC = () => {
  return (
    <div className="App">
      <Header/>
      <BarChart
        width={900}
        height={300}
        data={memory}
        margin={{
          top: 20, right: 30, left: 20, bottom: 5,
        }}
        barCategoryGap={0}
        barGap={0}
      >
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="used" stackId="a" fill="#8884d8" />
        <Bar dataKey="buff" stackId="a" fill="#330066" />
        <Bar dataKey="cach" stackId="a" fill="#CC2288" />
        <Bar dataKey="free" stackId="a" fill="#82ca9d" />
      </BarChart>

      <BarChart
        width={900}
        height={300}
        data={cpu}
        margin={{
          top: 20, right: 30, left: 20, bottom: 5,
        }}
        barCategoryGap={0}
        barGap={0}
      >
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="usr" stackId="a" fill="#8884d8" />
        <Bar dataKey="sys" stackId="a" fill="#330066" />
        <Bar dataKey="idl" stackId="a" fill="#CC2288" />
        <Bar dataKey="wai" stackId="a" fill="#82ca9d" />
        <Bar dataKey="hiq" stackId="a" fill="#3399CC" />
        <Bar dataKey="siq" stackId="a" fill="#EECC00" />
      </BarChart>
    </div>
  );
}

export default App;
