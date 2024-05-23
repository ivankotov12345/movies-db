import { Group, Image, Text } from '@mantine/core';
import { default as NextImage } from 'next/image';
import { FONT_WEIGHT_LOGO } from '@app/constants/constants';

import logo from '@public/assets/svg/logo.svg';

import styles from './logo.module.scss';

export const Logo = () => {
  return (
    <Group className={styles.logo}>
      <Image
        component={NextImage}
        src={logo}
        alt='website logo'
      />

      <Text span size='lg' fw={FONT_WEIGHT_LOGO}>
        ArrowFlicks
      </Text>
  </Group>
  );
};
