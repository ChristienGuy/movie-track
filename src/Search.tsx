import React, { useEffect, useState } from "react";
import { RouteComponentProps, Link } from "@reach/router";

async function search(query: string) {
  return await fetch(`/.netlify/functions/search/?query=${query}`)
    .then(res => res.json())
    .then(json => json);
}

const Search: React.FC<RouteComponentProps> = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{
    results: {
      title: string;
      name: string;
      media_type: string;
      overview: string;
      id: number;
    }[];
  }>({
    results: []
  });

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    search(query).then(results => {
      setResults(results);
    });
  }

  return (
    <div>
      <h1>Search</h1>

      <form onSubmit={onSubmit}>
        <input onChange={e => setQuery(e.target.value)} value={query} />
        <input type="submit" value="Search" />
      </form>

      <ul>
        {results.results.map(
          ({ title, name, media_type, overview, id, ...rest }) => (
            <li>
              <Link to={`/movie/${id}`}>
                <div>{title || name}</div>
                <div>{media_type}</div>
                <div>{overview}</div>
                <pre>{JSON.stringify(rest, null, 2)}</pre>
              </Link>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default Search;
