import React, { useState } from "react";
import styled from "styled-components";
import { RouteComponentProps, Link } from "@reach/router";

async function search(query: string) {
  return await fetch(`/.netlify/functions/search/?query=${query}`)
    .then(res => res.json())
    .then(json => json);
}

const ResultList = styled.ul`
  padding: 0;
  list-style: none;
`;

const SearchResult = styled.li``;

const ResultLink = styled(Link)`
  text-decoration: none;
  display: block;
  padding: 16px;
  transition: background-color 150ms ease-in-out;

  &:hover {
    background-color: #eee;
  }
`;

const ResultTitle = styled.h2`
  font-family: sans-serif;
  color: #333;
`;

const ResultType = styled.span`
  font-size: 16px;
  color: #666;
`;

const ResultOverview = styled.summary`
  font-size: 16px;
  color: #666;
`;

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

      <ResultList>
        {results.results.map(
          ({ title, name, media_type, overview, id, ...rest }) => {
            console.log(rest);

            return (
              <SearchResult key={id}>
                <ResultLink to={`/movie/${id}`}>
                  <ResultTitle>{title || name}</ResultTitle>
                  <ResultType>{media_type}</ResultType>
                  <ResultOverview>{overview}</ResultOverview>
                </ResultLink>
              </SearchResult>
            );
          }
        )}
      </ResultList>
    </div>
  );
};

export default Search;
