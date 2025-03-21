import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; // Adjust if Flask runs on a different port

export const getBookRecommendations = async (query, language, year, fictionOnly) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/recommend`, {
      query,
      language,
      year,
      fiction_only: fictionOnly,
    });
    return response.data; // Returns the list of books
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return [];
  }
};
