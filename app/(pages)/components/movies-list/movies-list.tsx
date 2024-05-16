import { SimpleGrid } from '@mantine/core';
import { GenreType, MovieType } from '@app/types/types/response-types';
import { MovieCard } from '../movie-card';

type MoviesListProps = {
  moviesList: MovieType[],
  genres: GenreType[],
}

export const MoviesList: React.FC<MoviesListProps> = ({ moviesList, genres }) => {

  return (
    <SimpleGrid cols={2}>
      {moviesList.map((movie) => (
        <MovieCard movie={movie} key={movie.id} genres={genres} /> 
      ))}
    </SimpleGrid>
  );
};
