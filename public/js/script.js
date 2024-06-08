document.addEventListener("DOMContentLoaded", () => {
  const apiEndpoint = "https://api.mocki.io/v1/35d1f03f"; // Mock API endpoint

  // Fetch data from the mock API
  fetch(apiEndpoint)
    .then((response) => response.json())
    .then((data) => {
      renderChart(data.activities);
      renderSummary(data.activities);
    })
    .catch((error) => console.error("Error fetching data:", error));

  function renderChart(activities) {
    const ctx = document.getElementById("activityChart").getContext("2d");

    const labels = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const activitiesByDay = {
      commit: Array(7).fill(0),
      pullRequest: Array(7).fill(0),
      merge: Array(7).fill(0),
      meeting: Array(7).fill(0),
      documentation: Array(7).fill(0),
    };

    activities.forEach((activity) => {
      const dayIndex = new Date(activity.date).getDay();
      activitiesByDay[activity.type][dayIndex]++;
    });

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Commits",
            data: activitiesByDay.commit,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
          {
            label: "Pull Requests",
            data: activitiesByDay.pullRequest,
            backgroundColor: "rgba(255, 159, 64, 0.2)",
            borderColor: "rgba(255, 159, 64, 1)",
            borderWidth: 1,
          },
          {
            label: "Merges",
            data: activitiesByDay.merge,
            backgroundColor: "rgba(153, 102, 255, 0.2)",
            borderColor: "rgba(153, 102, 255, 1)",
            borderWidth: 1,
          },
          {
            label: "Meetings",
            data: activitiesByDay.meeting,
            backgroundColor: "rgba(255, 206, 86, 0.2)",
            borderColor: "rgba(255, 206, 86, 1)",
            borderWidth: 1,
          },
          {
            label: "Documentation",
            data: activitiesByDay.documentation,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  function renderSummary(activities) {
    const summary = {
      commit: 0,
      pullRequest: 0,
      merge: 0,
      meeting: 0,
      documentation: 0,
    };

    activities.forEach((activity) => {
      summary[activity.type]++;
    });

    const summaryTableBody = document.getElementById("summaryTableBody");
    for (const [type, count] of Object.entries(summary)) {
      const row = document.createElement("tr");
      const activityCell = document.createElement("td");
      activityCell.textContent = type.charAt(0).toUpperCase() + type.slice(1);
      const countCell = document.createElement("td");
      countCell.textContent = count;
      row.appendChild(activityCell);
      row.appendChild(countCell);
      summaryTableBody.appendChild(row);
    }
  }
});
