export async function getQueryResult(searchQuery) {
  const endpoint = `https://movie-search-restify.herokuapp.com/search?q=${searchQuery}`;
  //const endpoint = `http://localhost:8080/search?q=${searchQuery}`
  const results = await fetch(endpoint).then(data => data.json());
  return results;
}

export async function getPopular() {
  const endpoint = 'https://movie-search-restify.herokuapp.com/popular';
  //const endpoint = 'http://localhost:8080/popular';
  const results = await fetch(endpoint).then(data => data.json());
  return results;
}

export async function getMovieInfoForId(movieId) {
  const endpoint = `https://movie-search-restify.herokuapp.com/movies/${movieId}`;
  //const endpoint = `http://localhost:8080/movie/${movieId}`;
  const results = await fetch(endpoint).then(data => data.json());
  return results;
}