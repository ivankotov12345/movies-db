import { Button, Center, Image, Stack, Title } from '@mantine/core';
import { default as NextImage } from 'next/image';
import Link from 'next/link';
import { FONT_WEIGHT_LOGO, SPACING_MAX } from '@app/constants/constants';
import { Paths } from '@app/types/enums/paths';

import noRated from '@public/assets/png/no-rated.png';

export const NoRatedmovies: React.FC = () => {
  return (
    <Center h={SPACING_MAX}>
      <Stack align='center'>
        <Image
          component={NextImage}
          src={noRated}
          alt='No rated movies'
        />

        <Title order={4} fw={FONT_WEIGHT_LOGO}>{'You haven\'t rated any films yet'}</Title>

        <Button component={Link} href={Paths.MOVIES} color='appColors.6'>Find movies</Button>
      </Stack>
    </Center>
  );
};
