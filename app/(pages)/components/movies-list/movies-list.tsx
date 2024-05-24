import { SimpleGrid } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { LAYOUT_MAX_WIDTH_TABLET } from '@app/constants/constants';
import { GenreType, MovieType } from '@app/types/types/response-types';
import { MovieCard } from '../movie-card';

type MoviesListProps = {
  moviesList: MovieType[],
  genres: GenreType[],
}

export const MoviesList: React.FC<MoviesListProps> = ({ moviesList, genres }) => {
  const { width } = useViewportSize();
  return (
    <SimpleGrid cols={width > LAYOUT_MAX_WIDTH_TABLET ? 2 : 1}>
      {moviesList.map((movie) => (
        <MovieCard movie={movie} key={movie.id} genres={genres} /> 
      ))}
    </SimpleGrid>
  );
};
