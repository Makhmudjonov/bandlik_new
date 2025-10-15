import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

const data = [
  { label: 'Group A', value: 400, color: '#0088FE' },
  { label: 'Group B', value: 300, color: 'orange' },
];

const settings = {
  margin: { right: 5 },
  width: 300,
  height: 300,
  hideLegend: true,
};

export default function DonutChart() {
  return (
    <PieChart
      series={[{ innerRadius: 60, outerRadius: 120, data, arcLabel: 'value' }]}
      {...settings}
    />
  );
}
