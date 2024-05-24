import { Box, Button, Center, Container, Image, Stack, Title } from '@mantine/core';
import { default as NextImage } from 'next/image';

import Link from 'next/link';
import { Logo } from '@app/component/logo/logo';
import { LAYOUT_MAX_WIDTH } from '@app/constants/constants';
import { Paths } from '@app/types/enums/paths';
import notFound from '@public/assets/png/not-found.png';

export default function NotFound() {
  return (
    <Container maw={LAYOUT_MAX_WIDTH} h='100vh'>
      <Box>
        <Logo />
      </Box>
      <Center>
        <Stack align='center'>
          <Image component={NextImage} src={notFound} alt='not found' />
          <Title order={4}>We can&lsquo;t find the page you are looking for</Title>
          <Button component={Link} href={Paths.ROOT} color='appColors.6'>Go home</Button>
        </Stack>
      </Center>
    </Container>
  );
}
