import { Button, Card, Flex, Group, Text, Title, useMantineTheme } from '@mantine/core';
import { IconStarFilled } from '@tabler/icons-react';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import {
  CARD_IMAGE_HEIGHT,
  CARD_IMAGE_WIDTH,
  FONT_WEIGHT_LOGO,
  RADIUS_LARGE,
  SPACING_MAX
} from '@app/constants/constants';
import { transformVoteCount } from '@app/helpers/format';
import { ApiPaths } from '@app/types/enums/api-paths';
import { GenreType, MovieType } from '@app/types/types/response-types';
import { Poster } from '../poster';

import styles from './movie-card.module.scss';

type MovieCardProps = {
  movie: MovieType,
  genres: GenreType[],
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, genres }) => {
  const router = useRouter();
  const theme = useMantineTheme();

  const releaseYear = moment(movie.release_date).format('YYYY');

  const movieGenres = movie.genre_ids && genres
    .filter((genre) => movie.genre_ids.includes(genre.id))
    .map((genre) => genre.name)
    .join(', ');

  const onCardClick = () => router.push(`${movie.id}`);

  return (
    <Card padding='xl' radius={RADIUS_LARGE} onClick={onCardClick}>
        <Group align='start' wrap='nowrap' w={390}>
          <Poster
            src={`${ApiPaths.IMAGE_BASE_URL}${movie.poster_path}`}
            width={CARD_IMAGE_WIDTH}
            height={CARD_IMAGE_HEIGHT}
            alt={movie.original_title}
          />

          <Flex
            direction='column'
            justify='space-between'
            h={SPACING_MAX}
            w={255}
          >
            <Flex direction='column' gap='xxs'>
              <Title order={4} c='appColors.6'>{movie.original_title}</Title>

              <Text c='appColors.0'>{releaseYear}</Text>

              {movie.vote_average &&
                <Group gap='xxxs' align='center'>
                <IconStarFilled color={theme.colors.appColors[11]} />
                <Group gap='xxs'>
                  <Text span fw={FONT_WEIGHT_LOGO}>{movie.vote_average.toFixed(1)}</Text>
                  
                  <Text span c='appColors.0'>
                    {`(${transformVoteCount(movie.vote_count)})`}
                  </Text>
                </Group>
              </Group>}
            </Flex>

            {movie.genre_ids &&
              <Group gap='xxs' wrap='nowrap' w={300}>
                <Text>Genres</Text>
                <Text lineClamp={1}>{movieGenres}</Text>
              </Group>
            }
          </Flex>
        </Group>
        
        <Button
            variant='transparent'
            className={styles.buttonRating}
          >
          <IconStarFilled color='appColors.2' />
        </Button>
    </Card>
  );
};
