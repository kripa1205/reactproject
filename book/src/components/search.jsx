import React, { useState } from "react";
import axios from "axios";
import BookCard from "./bookcard";

const Search = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);

  const handleSearch = async () => {
    const res = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${query}`
    );
    setBooks(res.data.items);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for books..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <div className="book-list">
        {books.map((book) => (
          <BookCard key={book.id} book={book.volumeInfo} />
        ))}
      </div>
    </div>
  );
};

export default Search;
