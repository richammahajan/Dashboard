// ActivityTable.tsx

import React from "react";
import { Activity } from "../types/Activity";

interface ActivityTableProps {
  activities: Activity[];
}

const ActivityTable: React.FC<ActivityTableProps> = ({ activities }) => {
  return (
    <div>
      <h2>User Activity Table</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Total Activity</th>
            <th>Day Wise Activity</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => (
            <tr key={activity.id}>
              <td>{activity.name}</td>
              <td>{activity.totalActivity}</td>
              <td>{JSON.stringify(activity.dayWiseActivity)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActivityTable;
