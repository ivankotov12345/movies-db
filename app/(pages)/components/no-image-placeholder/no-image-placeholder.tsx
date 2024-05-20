import { Center, Stack, Text } from '@mantine/core';
import { IconPhotoX } from '@tabler/icons-react';

type NoImagePlaceholderProps = {
  width: number,
  height: number,
}

export const NoImagePlaceholder: React.FC<NoImagePlaceholderProps> = ({ width, height }) => {
  return (
    <Center
      bg='appColors.3'
      w={width}
      h={height}
    >
      <Stack align='center' c='appColors.1'>
        <IconPhotoX />
        <Text>No poster</Text>
      </Stack>
    </Center>
  );
};
