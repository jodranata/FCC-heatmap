import React from 'react';
import { ContinuousColorLegend } from 'react-vis';

const Legend = () => {
  return (
    <ContinuousColorLegend
      endColor="#a50026"
      endTitle={12.8}
      midColor="#ffffbf"
      midTitle={7.8}
      startColor="#313695"
      startTitle={2.8}
      width={350}
      id="legend"
    />
  );
};

export default Legend;
