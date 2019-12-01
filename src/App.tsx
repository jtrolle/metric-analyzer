import React from 'react';
import { Container } from 'reactstrap';
import CollapseCard from './components/CollapseCard';
import ChartFilter from './components/ChartFilter';
import Header from './Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import metrics from './metrics.json';

const dateMin = metrics[0].time;
const dateMax = metrics[0].time;

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

const network = metrics.map(function ({ recv, send, time}) {
  return {
    recv,
    send,
    time
  }
});

const disk = metrics.map(function ({ read, writ, files, inodes, time }) {
  return {
    files,
    inodes,
    read,
    writ,
    time
  }
});

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
  return (
    <div className="App">
      <Header/>
      <Container>

        <CollapseCard
          title="Memory"
          isOpen={true}
        >
          <ChartFilter
            width={CHART_WIDTH}
            data={memory}
            colors={colors}
            keys={['used', 'buff', 'cach', 'free']}
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
