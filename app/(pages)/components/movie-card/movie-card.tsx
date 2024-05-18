import { Button, Card, Flex, Group, Text, Title, useMantineTheme } from '@mantine/core';
import { IconStarFilled } from '@tabler/icons-react';
import moment from 'moment';
import Image from 'next/image';
import { useState } from 'react';
import {
  CARD_IMAGE_HEIGHT,
  CARD_IMAGE_WIDTH,
  FONT_WEIGHT_LOGO,
  HEIGHT_CARD_INFO,
  RADIUS_LARGE
} from '@app/constants/constants';
import { transformVoteCount } from '@app/helpers/format';
import { ApiPaths } from '@app/types/enums/api-paths';
import { GenreType, MovieType } from '@app/types/types/response-types';
import { NoImagePlaceholder } from '../no-image-placeholder';

import styles from './movie-card.module.scss';

type MovieCardProps = {
  movie: MovieType,
  genres: GenreType[],
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, genres }) => {
  const [isLoadFail, setIsLoadFail] = useState(false);
  const theme = useMantineTheme();

  const releaseYear = moment(movie.release_date).format('YYYY');

  const movieGenres = movie.genre_ids && genres
    .filter((genre) => movie.genre_ids.includes(genre.id))
    .map((genre) => genre.name)
    .join(', ');

  const handleImageError = () => setIsLoadFail(true);

  return (
    <Card padding='xl' radius={RADIUS_LARGE}>
        <Group align='start' wrap='nowrap' w={390}>
          {isLoadFail
            ? 
              <NoImagePlaceholder
                  width={CARD_IMAGE_WIDTH}
                  height={CARD_IMAGE_HEIGHT}
                />
            : <Image
                src={`${ApiPaths.IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                width={CARD_IMAGE_WIDTH}
                height={CARD_IMAGE_HEIGHT}
                loading='lazy'
                onError={handleImageError}
              />
            }

          <Flex
            direction='column'
            justify='space-between'
            h={HEIGHT_CARD_INFO}
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
              </Group>
              }
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
