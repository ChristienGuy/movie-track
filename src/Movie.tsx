import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "@reach/router";

async function getMovie(movieId: number) {
  return await fetch(`/.netlify/functions/movie/${movieId}`)
    .then(res => res.json())
    .then(json => json);
}

type Props = RouteComponentProps & {
  movieId?: number;
};

const Movie: React.FC<Props> = ({ movieId }) => {
  const [movieData, setMovieData] = useState({});

  useEffect(() => {
    if (movieId) {
      getMovie(movieId).then(movieData => {
        setMovieData(movieData);
      });
    }
  }, [movieId]);

  return (
    <div>
      <h1>Movie Details</h1>
      <pre>{JSON.stringify(movieData, null, 2)}</pre>
    </div>
  );
};

export default Movie;
