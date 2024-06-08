import React, { useEffect, useState } from "react";
import { fetchData, Activity } from "../api/fetchData";
import { Bar } from 'react-chartjs-2';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table';

const DataDisplay: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchData();
        setActivities(data.activities);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    };

    getData();
  }, []);

  // Define columns
  const columns = React.useMemo<ColumnDef<Activity>[]>(
    () => [
      {
        header: 'ID',
        accessorKey: 'id',
      },
      {
        header: 'Type',
        accessorKey: 'type',
      },
      {
        header: 'Timestamp',
        accessorKey: 'timestamp',
      },
      {
        header: 'Description',
        accessorKey: 'description',
      },
    ],
    []
  );

  // Use the table instance
  const table = useReactTable({
    data: activities,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Summary statistics
  const totalActivities = activities.length;
  const activityTypesCount = activities.reduce((acc, activity) => {
    acc[activity.type] = (acc[activity.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Prepare data for the chart
  const chartData = {
    labels: Object.keys(activityTypesCount),
    datasets: [
      {
        label: 'Activity Count',
        data: Object.values(activityTypesCount),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <div>
      <h1>Developer Activities</h1>
      <div>
        <h2>Summary Statistics</h2>
        <p>Total Activities: {totalActivities}</p>
        {Object.entries(activityTypesCount).map(([type, count]) => (
          <p key={type}>{type}: {count}</p>
        ))}
      </div>
      <div>
        <h2>Activity Chart</h2>
        <Bar data={chartData} />
      </div>
      <div>
        <h2>Activity Table</h2>
        <table>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataDisplay;
