import { Card, Group, Stack, Text, Title, useMantineTheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconStarFilled } from '@tabler/icons-react';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';
import {
  CARD_IMAGE_HEIGHT,
  CARD_IMAGE_WIDTH,
  FONT_WEIGHT_LOGO,
  MAX_CARD_HEIGHT,
  RADIUS_LARGE,
  SPACING_MAX
} from '@app/constants/constants';
import { transformVoteCount } from '@app/helpers/format';
import { getStorageItem } from '@app/helpers/storage';
import { ApiPaths } from '@app/types/enums/api-paths';
import { GenreType, MovieType } from '@app/types/types/response-types';
import { ModalRating } from '../modal-rating/modal-rating';
import { Poster } from '../poster';
import { RatingButton } from '../rating-button';

type MovieCardProps = {
  movie: MovieType,
  genres: GenreType[],
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, genres }) => {
  const [opened, { open, close }] = useDisclosure();
  const router = useRouter();
  const [ratedList, setRatedList] = useState<MovieType[]>([]);
  const [rating, setRating] = useState(0);
  const theme = useMantineTheme();


  useEffect(() => {
    const currentRatedList = getStorageItem();
    setRatedList(currentRatedList);
  }, []);

  useEffect(() => {
    const rated = ratedList && ratedList.find((ratedMovie: MovieType) => ratedMovie.id === movie.id);
    if (rated?.my_rating) {
      setRating(rated.my_rating);
    }
  }, [ratedList, movie]);

  const releaseYear = moment(movie.release_date).format('YYYY');

  const movieGenres = movie.genre_ids && genres
    .filter((genre) => movie.genre_ids.includes(genre.id))
    .map((genre) => genre.name)
    .join(', ');

  const onCardClick = (event: React.MouseEvent) => {
    if((event.target as Element).tagName === 'BUTTON') {
      return;
    }
    router.push(`${movie.id}`);
  };

  const onSaveRating = (rating: number) => {
    const index = ratedList.findIndex((ratedMovie: MovieType) => ratedMovie.id === movie.id);

    if(index !== -1) {
      ratedList[index].my_rating = rating;
    } else {
      ratedList.push({
        id: movie.id,
        poster_path: movie.poster_path,
        genre_ids: movie.genre_ids,
        original_title: movie.original_title,
        vote_average: movie.vote_average,
        vote_count: movie.vote_count,
        release_date: movie.release_date,
        my_rating: rating,
      });
    }
    localStorage.setItem('rated_movies', JSON.stringify(ratedList));
  };

  return (
    <Fragment>
      <Card
        padding='lg'
        radius={RADIUS_LARGE}
        onClick={onCardClick}
        mah={MAX_CARD_HEIGHT}
      >
        <Group align='start' wrap='nowrap' gap='xxs' justify='space-between'>
          <Group gap='md' wrap='nowrap' align='start' h={SPACING_MAX}>
            <Poster
              src={`${ApiPaths.IMAGE_BASE_URL}${movie.poster_path}`}
              width={CARD_IMAGE_WIDTH}
              height={CARD_IMAGE_HEIGHT}
              alt={movie.original_title}
            />

            <Stack
              justify='space-between'
              h={SPACING_MAX}
              maw={240}
            >
            <Stack gap='xxs'>
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
              </Stack>

              {movie.genre_ids &&
                <Group gap='xxs' wrap='nowrap'>
                  <Text c='appColors.0'>Genres</Text>
                  <Text lineClamp={1}>{movieGenres}</Text>
                </Group>}
            </Stack>
          </Group>
              
 
          <RatingButton open={open} rating={rating} />
        </Group>
      </Card>
              
      <ModalRating
        opened={opened}
        close={close}
        movie={movie}
        onSaveRating={onSaveRating}
        cardRating={rating}
        setCardRating={setRating}
      />
    </Fragment>
  );
};