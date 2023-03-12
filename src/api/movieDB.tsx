import axios from 'axios';

const movieDB = axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie',
  params: {
    api_key: '67071497594bb668ff99bcd6dab1cca3',
    language: 'es-ES',
  },
});

export default movieDB;
