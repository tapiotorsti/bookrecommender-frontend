import { useState } from "react";
import { getBookRecommendations } from "./api/api";

function App() {
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("");
  const [year, setYear] = useState("");
  const [fictionOnly, setFictionOnly] = useState(true);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const results = await getBookRecommendations(query, language, year, fictionOnly);
      setBooks(results);
    } catch (err) {
      setError("Failed to fetch book recommendations.");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h1>📚 Book Recommender</h1>
      
      <input
        type="text"
        placeholder="Enter book description..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      
      <input
        type="text"
        placeholder="Language (optional)"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      />
      
      <input
        type="number"
        placeholder="Year (optional)"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />
      
      <label>
        <input
          type="checkbox"
          checked={fictionOnly}
          onChange={() => setFictionOnly(!fictionOnly)}
        />
        Fiction Only
      </label>
      
      <button onClick={handleSearch} disabled={loading}>
        {loading ? "Searching..." : "🔍 Search"}
      </button>

      <h2>📖 Recommendations</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {books.length > 0 ? (
          books.map(([book], index) => ( // Extract 'book' from the API response
            <li key={index}>
              <strong>{book.title}</strong> ({book.source}) <br />
              <small>Subjects: {book.subjects?.flat().join(", ") || "Unknown"}</small>
            </li>
          ))
        ) : !loading ? (
          <p>No recommendations found.</p>
        ) : null}
      </ul>
    </div>
  );
}

export default App;
