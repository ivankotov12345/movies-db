import { Center, Image, Stack, Title } from '@mantine/core';
import { default as NextImage } from 'next/image';

import { EMPTY_IMAGE_HEIGHT, EMPTY_IMAGE_WIDTH, FONT_WEIGHT_LOGO } from '@app/constants/constants';
import nothingFound from '@public/assets/png/nothing-found.png';

export const EmptyList: React.FC = () => {
  return (
    <Center>
      <Stack align='center'>
      <Image
        component={NextImage}
        src={nothingFound}
        alt='nothing was found'
        width={EMPTY_IMAGE_WIDTH}
        height={EMPTY_IMAGE_HEIGHT}
        maw={EMPTY_IMAGE_WIDTH}
        mah={EMPTY_IMAGE_HEIGHT}
      />
      <Title order={4} fw={FONT_WEIGHT_LOGO}>{'We don\'t have such movies, look for another one'}</Title>
      </Stack>
    </Center>
  );
};
