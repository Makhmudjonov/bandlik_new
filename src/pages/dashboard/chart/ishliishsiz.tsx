import * as React from 'react';
import Box from '@mui/material/Box';
import { LineChart } from '@mui/x-charts/LineChart';

const margin = { right: 24 };
const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 3800, 3908, 4800, 3800, 4300];
const fData = [1000, 1398, 2200, 1400, 3700, 2600, 3300];
const xLabels = [
  'May',
  'Iyun',
  'Iyul',
  'Avgust',
  'Sentabr',
  'Oktabr',
];

export default function SimpleLineChart() {
  return (
    <Box sx={{ width: '100%', height: 350 }}>
      <LineChart
        series={[
          { data: pData, label: 'Ishga joylashgan', color: "#007bff" },
          { data: uData, label: 'Ishsiz' },
          { data: fData, label: 'Faol ish izlayotgan' },
        ]}
        xAxis={[{ scaleType: 'point', data: xLabels }]}
        yAxis={[{ width: 50 }]}
        margin={margin}
      />
    </Box>
  );
}
