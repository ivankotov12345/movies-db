import { Card, Flex, Group, Text, Title, useMantineTheme } from '@mantine/core';
import { IconStarFilled } from '@tabler/icons-react';
import moment from 'moment';
import Image from 'next/image';
import { RADIUS_LARGE } from '@app/constants/constants';
import { transformVoteCount } from '@app/helpers/format';
import { ApiPaths } from '@app/types/enums/api-paths';
import { GenreType, MovieType } from '@app/types/types/response-types';

type MovieCardProps = {
  movie: MovieType,
  genres: GenreType[],
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, genres }) => {
  const theme = useMantineTheme();

  const releaseYear = moment(movie.release_date).format('YYYY');

  const movieGenres = genres
    .filter((genre) => movie.genre_ids.includes(genre.id))
    .map((genre) => genre.name)
    .join(', ');

  return (
    <Card padding='xl' radius={RADIUS_LARGE}>
        <Group align='start' wrap='nowrap'>
          <Image
            src={`${ApiPaths.IMAGE_BASE_URL}${movie.poster_path}`}
            alt={movie.title}
            width={119}
            height={170}
          />

          <Flex direction='column' justify='space-between'>
            <Flex direction='column' gap={8}>
              <Title order={4} c='appColors.6'>{movie.original_title}</Title>

              <Text fs='lg' c='appColors.0'>{releaseYear}</Text>

              <Group gap='xs'>
                <IconStarFilled color={theme.colors.appColors[11]} />
                <Text span>
                  <Text span>{movie.vote_average.toFixed(1)}</Text>
                  <Text span c='dimmed'> {transformVoteCount(movie.vote_count)}</Text>
                </Text>
              </Group>
            </Flex>

            <Group>
              <Text>Genres</Text>
              <Text>{movieGenres}</Text>
            </Group>
          </Flex>
        </Group>
    </Card>
  );
};
