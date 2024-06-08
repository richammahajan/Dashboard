// ChartComponent.tsx

import React from 'react';
import { Bar } from 'react-chartjs-2';

interface ChartData {
  labels: string[];
  datasets: { label: string; data: number[]; backgroundColor: string }[];
}

interface ChartProps {
  chartData: ChartData;
}

const ChartComponent: React.FC<ChartProps> = ({ chartData }) => {
  return (
    <div>
      <h2>Activity Chart</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default ChartComponent;
