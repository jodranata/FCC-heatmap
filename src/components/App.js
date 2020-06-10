import React, { useEffect, useState } from 'react';
import './App.css';
import RenderChart from './RenderChart';

const url = `https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json`;

const App = () => {
  const [objData, setObjData] = useState([]);
  const [baseTemp, setBaseTemp] = useState(null);
  const [isFetched, setIsFetched] = useState(false);
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setObjData(data.monthlyVariance);
        setBaseTemp(data.baseTemperature);
        setIsFetched(true);
      });
  }, []);
  return (
    <div className="container">
      <h1>Global Land-Surface Temperature</h1>
      {isFetched && <RenderChart baseTemp={baseTemp} tempData={objData} />}
    </div>
  );
};

export default App;
