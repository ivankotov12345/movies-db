import { Card, Group, Stack, Text, Title, useMantineTheme } from '@mantine/core';
import { useDisclosure, useViewportSize } from '@mantine/hooks';
import { IconStarFilled } from '@tabler/icons-react';
import moment from 'moment';
import { usePathname, useRouter } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';
import {
  CARD_IMAGE_HEIGHT,
  CARD_IMAGE_WIDTH,
  FONT_WEIGHT_LOGO,
  LAYOUT_MAX_WIDTH_MOBILE,
  LAYOUT_MAX_WIDTH_TABLET,
  MAX_CARD_HEIGHT,
  RADIUS_LARGE,
  SPACING_MAX
} from '@app/constants/constants';
import { transformVoteCount } from '@app/helpers/format';
import { ApiPaths } from '@app/types/enums/api-paths';
import { GenreType, MovieType } from '@app/types/types/response-types';
import { ModalRating } from '../modal-rating/modal-rating';
import { Poster } from '../poster';
import { RatingButton } from '../rating-button';

type MovieCardProps = {
  movie: MovieType,
  genres: GenreType[],
  ratedMoviesArr: MovieType[],
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, genres, ratedMoviesArr }) => {
  const { width } = useViewportSize();

  const [opened, { open, close }] = useDisclosure();
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const theme = useMantineTheme();
  const pathname = usePathname();



  useEffect(() => {
    const rated = ratedMoviesArr && ratedMoviesArr.find((ratedMovie: MovieType) => ratedMovie.id === movie.id);
    if (rated?.my_rating) {
      setRating(rated.my_rating);
    }
  }, [ratedMoviesArr, movie]);

  const releaseYear = moment(movie.release_date).format('YYYY');

  const movieGenres = movie.genre_ids && genres
    .filter((genre) => movie.genre_ids.includes(genre.id))
    .map((genre) => genre.name)
    .join(', ');

  const onCardClick = (event: React.MouseEvent) => {
    if((event.target as Element).tagName === 'BUTTON') {
      return;
    }
    router.push(`${pathname}/${movie.id}`);
  };

  const onSaveRating = (rating: number) => {
    const index = ratedMoviesArr.findIndex((ratedMovie: MovieType) => ratedMovie.id === movie.id);

    if(index !== -1) {
      ratedMoviesArr[index].my_rating = rating;
    } else {
      ratedMoviesArr.push({
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
    localStorage.setItem('rated_movies', JSON.stringify(ratedMoviesArr));
  };
  

  return (
    <Fragment>
      <Card
        padding={width > LAYOUT_MAX_WIDTH_MOBILE ? 'lg' : 0}
        radius={RADIUS_LARGE}
        onClick={onCardClick}
        mah={MAX_CARD_HEIGHT}
      >
        <Group
          align='start'
          wrap='nowrap'
          gap={width > LAYOUT_MAX_WIDTH_MOBILE ? 'xxs' : 0}
          justify='space-between'
        >
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
              maw={width > LAYOUT_MAX_WIDTH_TABLET ? 240 : '100%'}
            >
            <Stack gap='xxs'>
              <Title
              order={4} 
              c='appColors.6'
              lineClamp={width <= LAYOUT_MAX_WIDTH_TABLET ? 1 : undefined}
              >
                {movie.original_title}
              </Title>
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

              {movie.genre_ids.length > 0 &&
                <Group gap='xxs' wrap='nowrap'>
                  <Text c='appColors.0'>Genres</Text>
                  <Text lineClamp={1}>{movieGenres}</Text>
                </Group>}
            </Stack>

            <RatingButton open={open} rating={rating} />
          </Group>
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