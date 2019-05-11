/* eslint-disable */
const fetch = require("node-fetch");
const { URL, URLSearchParams } = require("url");

const { TMDB_API_KEY } = process.env;

exports.handler = async function(event, context) {
  const movieId = event.path.replace("/.netlify/functions/movie/", "");
  console.log(movieId);

  const url = new URL(`https://api.themoviedb.org/3/movie/${movieId}`);
  url.search = new URLSearchParams({
    api_key: TMDB_API_KEY
  });

  try {
    const response = await fetch(url, {
      headers: { Accept: "application/json" }
    });
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return {
        statusCode: response.status,
        body: JSON.stringify({ statusText: response.statusText })
      };
    }
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
};
