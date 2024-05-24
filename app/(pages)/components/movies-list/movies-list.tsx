import { SimpleGrid } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { useMemo } from 'react';
import { LAYOUT_MAX_WIDTH_TABLET } from '@app/constants/constants';
import { GenreType, MovieType } from '@app/types/types/response-types';
import { MovieCard } from '../movie-card';

type MoviesListProps = {
  moviesList: MovieType[],
  genres: GenreType[],
}

export const MoviesList: React.FC<MoviesListProps> = ({ moviesList, genres }) => {
  const { width } = useViewportSize();

  const ratedMoviesArr = useMemo<MovieType[]>(() => {
    const ratedMovies = localStorage.getItem('rated_movies');
    return ratedMovies !== null ? JSON.parse(ratedMovies) : [];
  }, []);

  return (
    <SimpleGrid cols={width > LAYOUT_MAX_WIDTH_TABLET ? 2 : 1}>
      {moviesList.map((movie) => (
        <MovieCard movie={movie} key={movie.id} genres={genres} ratedMoviesArr={ratedMoviesArr} /> 
      ))}
    </SimpleGrid>
  );
};
