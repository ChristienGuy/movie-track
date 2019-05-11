import React, { useEffect, useState } from "react";
import "./App.css";

async function getMovie(movieId: number) {
  return await fetch(`/.netlify/functions/movie/${movieId}`)
    .then(res => res.json())
    .then(json => json);
}

async function search(query: string) {
  return await fetch(`/.netlify/functions/search/?query=${query}`)
    .then(res => res.json())
    .then(json => json);
}

const App: React.FC = () => {
  const [results, setResults] = useState<{
    results: {
      title: string;
      media_type: string;
      overview: string;
    }[];
  }>({
    results: []
  });

  const [query, setQuery] = useState("");

  // useEffect(() => {
  //   getMovie(533).then(movieData => {
  //     setMovieData(movieData);
  //   });
  // }, []);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    search(query).then(results => {
      setResults(results);
    });
  }

  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        <input onChange={e => setQuery(e.target.value)} value={query} />
        <input type="submit" value="Search" />
      </form>

      <ul>
        {results.results.map(({ title, media_type, overview, ...rest }) => (
          <li>
            <div>{title}</div>
            <div>{media_type}</div>
            <div>{overview}</div>
            <pre>{JSON.stringify(rest, null, 2)}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
