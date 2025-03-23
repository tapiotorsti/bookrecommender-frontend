import axios from "axios";

export const getBookRecommendations = async (query, language, year, fictionOnly, apis, subject) => {
  const response = await axios.post("http://localhost:5000/recommend", {
    query,
    language,
    year,
    fiction_only: fictionOnly,
    apis,
    subject: subject || null
  });
  return response.data;
};

