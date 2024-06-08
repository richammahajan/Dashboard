export const fetchData = async () => {
  const response = await fetch("/db.json");
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await response.json();
  return data;
};
