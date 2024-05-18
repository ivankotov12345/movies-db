import { Center, Stack, Text } from '@mantine/core';
import { IconPhotoX } from '@tabler/icons-react';

type NoImagePlaceholderProps = {
  width: number,
  height: number,
}

export const NoImagePlaceholder: React.FC<NoImagePlaceholderProps> = ({ width, height }) => {
  return (
    <Center
      c='appColors.3'
      color='appColors.1'
      w={width}
      h={height}
    >
      <Stack>
        <IconPhotoX />
        <Text>No poster</Text>
      </Stack>
    </Center>
  );
};
