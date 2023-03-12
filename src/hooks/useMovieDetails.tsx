import {useState, useEffect} from 'react';
import movieDB from '../api/movieDB';
import {Cast, CreditsResponse} from '../interfaces/credistsInterface';
import {MovieFull} from '../interfaces/movieInterface';

interface MovieDetails {
  isLoading: boolean;
  movieFull?: MovieFull;
  cast: Cast[];
}

export const useMovieDetails = (movieId: number) => {
  const [state, setState] = useState<MovieDetails>({
    isLoading: true,
    movieFull: undefined,
    cast: [],
  });

  console.log(movieId);

  const getMovieDetails = async () => {
    const moviesDetailsPromise = movieDB.get<MovieFull>(`/${movieId}`);
    const castPromise = movieDB.get<CreditsResponse>(`/${movieId}/credits`);

    const [movieDetailsResponse, castPromiseResp] = await Promise.all([
      moviesDetailsPromise,
      castPromise,
    ]);
    setState({
      isLoading: false,
      movieFull: movieDetailsResponse.data,
      cast: castPromiseResp.data.cast,
    });
  };

  useEffect(() => {
    getMovieDetails();
  }, []);

  return {
    ...state,
  };
};
