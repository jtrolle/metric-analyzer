import React, { useState } from 'react';
import { Container } from 'reactstrap';
import { Range } from 'rc-slider';
import CollapseCard from './components/CollapseCard';
import ChartFilter from './components/ChartFilter';
import Header from './Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'rc-slider/assets/index.css';
import './App.css';
import metrics from './metrics.json';

const CHART_WIDTH = 900;

const colors = [
  "#8884d8",
  "#330066",
  "#CC2288",
  "#82ca9d",
  "#3399CC",
  "#EECC00",
];

const App: React.FC = () => {
  const [range, setRange] = useState([0, metrics.length]);

  const metricsRange = metrics.slice(range[0], range[1])

  const memory = metricsRange.map(function ({ used, buff, cach, free, time }) {
    return {
      used: (used ? used : 0) / 1000000,
      buff: (buff ? buff : 0) / 1000000,
      cach: (cach ? cach : 0) / 1000000,
      free: (free ? free : 0) / 1000000,
      time,
    }
  });

  const cpu = metricsRange.map(function ({ usr, sys, idl, wai, hiq, siq, time }) {
    return {
      usr,
      sys,
      idl,
      wai,
      hiq,
      siq,
      time,
    }
  });

  const network = metricsRange.map(function ({ recv, send, time }) {
    return {
      recv,
      send,
      time
    }
  });

  const disk = metricsRange.map(function ({ read, writ, files, inodes, time }) {
    return {
      files,
      inodes,
      read,
      writ,
      time
    }
  });

  return (
    <div className="App">
      <Header/>
      <Container className="main" fluid>

        <div className="mb-4">
          <h5>Datetime range</h5>
          <Range max={metrics.length} value={range} onChange={(value) => {
            console.log('onchange');
            setRange(value);
          }} />
        </div>

        <CollapseCard
          title="Memory"
          isOpen={true}
        >
          <ChartFilter
            width={CHART_WIDTH}
            data={memory}
            colors={colors}
            keys={['used', 'buff', 'cach', 'free']}
            initialFilters={['used', 'buff', 'cach']}
            type='bar'
          />
        </CollapseCard>

        <CollapseCard
          title="CPU"
          isOpen={true}
        >
          <ChartFilter
            width={CHART_WIDTH}
            data={cpu}
            colors={colors}
            keys={['usr', 'sys', 'idl', 'wai', 'hiq', 'siq',]}
            initialFilters={['usr', 'sys', 'wai', 'hiq', 'siq']}
            type='bar'
          />
        </CollapseCard>

        <CollapseCard
          title="network"
          isOpen={true}
        >
          <ChartFilter
            width={CHART_WIDTH}
            data={network}
            colors={colors}
            keys={['send', 'recv']}
            type='line'
          />
        </CollapseCard>

        <CollapseCard
          title="Disk"
          isOpen={true}
        >
          <ChartFilter
            width={CHART_WIDTH}
            data={disk}
            colors={colors}
            keys={['read', 'writ', 'files', 'inodes']}
            type='line'
          />
        </CollapseCard>
      </Container>
    </div>
  );
}

export default App;
