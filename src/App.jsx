import { useState } from "react";
import { getBookRecommendations } from "./api/api";

function App() {
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [year, setYear] = useState("");
  const [fictionOnly, setFictionOnly] = useState(true);
  const [selectedApis, setSelectedApis] = useState(["google", "openlibrary", "finna"]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleApiChange = (api) => {
    setSelectedApis((prev) =>
      prev.includes(api) ? prev.filter((a) => a !== api) : [...prev, api]
    );
  };

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
  
    try {
      const response = await getBookRecommendations(query, language, year, fictionOnly, selectedApis, subjectFilter);
      setBooks(response.books || []);
      setAvailableSubjects(response.subjects || []);
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

      <div>
        <strong>Use APIs:</strong><br />
        <label><input type="checkbox" checked={selectedApis.includes("google")} onChange={() => handleApiChange("google")} /> Google Books</label><br />
        <label><input type="checkbox" checked={selectedApis.includes("openlibrary")} onChange={() => handleApiChange("openlibrary")} /> Open Library</label><br />
        <label><input type="checkbox" checked={selectedApis.includes("finna")} onChange={() => handleApiChange("finna")} /> Finna</label>
      </div>

      {availableSubjects.length > 0 && (
  <div>
    <label><strong>Filter by Finna subject:</strong></label>
    <select value={subjectFilter} onChange={(e) => setSubjectFilter(e.target.value)}>
      <option value="">-- All subjects --</option>
      {availableSubjects.map((subj, idx) => (
        <option key={idx} value={subj}>{subj}</option>
      ))}
    </select>
  </div>
)}


      <button onClick={handleSearch} disabled={loading}>
        {loading ? "Searching..." : "🔍 Search"}
      </button>

      <h2>📖 Recommendations</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
  {books.length > 0 ? (
    books.map(([book], index) => (
      <li key={index}>
        <strong>{book.title}</strong> ({book.source})<br />
        <small>Subjects: {book.subjects?.flat().join(", ") || "Unknown"}</small><br />
        {book.link ? (
          <a href={book.link} target="_blank" rel="noopener noreferrer">🌐 View Book</a>
        ) : (
          <a
            href={`https://www.google.com/search?q=${encodeURIComponent(book.title)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Hae Googlesta
          </a>
        )}
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
