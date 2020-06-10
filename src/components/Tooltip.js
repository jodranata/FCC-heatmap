import React from 'react';
import { setMonthName } from './constant';

const Tooltip = ({ tipValue, tipPosition, baseValue }) => {
  const { x: year, y: month, variance } = tipValue;
  const { xPos, yPos } = tipPosition;
  const style = { top: `${yPos}px`, left: `${xPos}px` };
  const monthName = setMonthName(month - 1);
  return (
    <div className="tooltip" id="tooltip" style={style}>
      <p>{`${year} - ${monthName}`}</p>
      <p>{`${(baseValue + variance).toFixed(2)}°C`}</p>
    </div>
  );
};

export default Tooltip;
