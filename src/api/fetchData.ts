import { Activity } from "../types/Activity";

// src/api/fetchData.ts
export const fetchData = async (): Promise<{ activities: Activity[] }> => {
    try {
        const response = await fetch('/db.json');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data: { activities: Activity[] } = await response.json();
        console.log("Fetched data:", data); // Add this line
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return { activities: [] };  // Return an empty array as a fallback
    }
};

export type { Activity };
