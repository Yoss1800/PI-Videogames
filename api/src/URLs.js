
const { API_KEY } = process.env;
const ALL_API_URL = `https://api.rawg.io/api/games?key=${API_KEY}`;
const ALL_GENRES_API = `https://api.rawg.io/api/genres?key=${API_KEY}`
//const SEARCH_NAME_URL = `https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`;
//const SEARCH_ID_URL = `https://api.rawg.io/api/games/${id}?key=${API_KEY}`;


module.exports = {
  ALL_API_URL,
  ALL_GENRES_API,
}