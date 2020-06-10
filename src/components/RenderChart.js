import React, { useState } from 'react';
import { XYPlot, XAxis, YAxis, HeatmapSeries } from 'react-vis';
import { scaleQuantile } from 'd3-scale';
import Tooltip from './Tooltip';
import { setMonthName } from './constant';
import Legend from './Legend';

const colorRange = [
  '#313695',
  '#4575b4',
  '#74add1',
  '#abd9e9',
  '#e0f3f8',
  '#ffffbf',
  '#fee090',
  '#fdae61',
  '#f46d43',
  '#d73027',
  '#a50026',
];

const tickStyle = {
  line: { stroke: '#F0F0F0' },
  ticks: { stroke: '#F0F0F0' },
  text: { stroke: 'none', fill: '#F0F0F0', fontWeight: 500 },
};

const domainRange = [2.8, 3.9, 5.0, 6.1, 7.2, 8.3, 9.5, 10.6, 11.7, 12.8];
const colorScale = scaleQuantile()
  .domain(domainRange)
  .range(colorRange);

const RenderChart = ({ baseTemp, tempData }) => {
  const [hoverValue, setHoverValue] = useState({});
  const [tipPos, setTipPos] = useState({});
  const [onHover, setOnHover] = useState(false);

  const tempArray = tempData.reduce((acc, curr) => {
    const color = colorScale(baseTemp + curr.variance);
    return [
      ...acc,
      {
        x: curr.year,
        y: curr.month,
        color,
        variance: curr.variance,
      },
    ];
  }, []);

  const handleMouseLeave = () => {
    setHoverValue({});
    setOnHover(false);
  };
  const handleMouseHover = data => {
    setHoverValue(data);
    setOnHover(true);
  };

  const handleSetPos = (xPos, yPos) => {
    const posObj = {
      xPos,
      yPos,
    };
    setTipPos(posObj);
  };

  return (
    <div className="chart-svg">
      <p>{`Temperature from 1753-2015: base temperature ${baseTemp}`}</p>
      <XYPlot
        width={1100}
        height={500}
        margin={{ left: 100 }}
        style={{ position: 'relative' }}
        id="description"
        onMouseLeave={handleMouseLeave}
      >
        <XAxis tickTotal={10} style={tickStyle} id="x-axis" />
        <YAxis
          orientation="left"
          style={tickStyle}
          tickFormat={(v, i) => {
            return setMonthName(v - 1);
          }}
          id="y-axis"
        />
        <HeatmapSeries
          colorType="literal"
          data={tempArray}
          onNearestXY={(value, { event, innerX, innerY }) => {
            handleSetPos(innerX, innerY);
          }}
          onValueMouseOver={handleMouseHover}
          className="cell"
        />
        {onHover && (
          <Tooltip
            tipValue={hoverValue}
            baseValue={baseTemp}
            tipPosition={tipPos}
          />
        )}
      </XYPlot>
      <Legend />
    </div>
  );
};

export default RenderChart;
