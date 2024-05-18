'use client';

import { Container, Grid, Group, Image, NavLink, Text } from '@mantine/core';
import { default as NextImage } from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import {
  FONT_WEIGHT_BOLD,
  FONT_WEIGHT_LOGO,
  LAYOUT_MAX_WIDTH,
  MIN_HEIHT,
  NAVIGATION_WIDTH,
  PADDING_CONTENT_DESKTOP } from '@app/constants/constants';
import { NAVIGATION } from '@app/constants/navigation';

import logo from '@public/assets/svg/logo.svg';

import styles from './app-layout.module.scss';

type AppLayoutProps = {
  children: React.ReactNode
}

const { Col } = Grid;

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [activeLink, setActiveLink] = useState(0);
  
  return (
    <Container
      size={LAYOUT_MAX_WIDTH}
      p={0}
    >
      <Grid gutter={0}>
        <Col maw={NAVIGATION_WIDTH} p='lg' className={styles.sidebarWrapper} mih={MIN_HEIHT}>
          <aside>
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
            <nav className={styles.navigation}>
              {NAVIGATION.map(({ link, path }, index) => (
                <NavLink
                  component={Link}
                  active={index === activeLink}
                  href={path}
                  label={
                  <Text fw={FONT_WEIGHT_BOLD}>{link}</Text>
                  }
                  key={link}
                  onClick={() => setActiveLink(index)}
                  color='appColors.6'
                />
              ))}
            </nav>
          </aside>
        </Col>

        <Col span='auto' p={PADDING_CONTENT_DESKTOP}>
          { children }
        </Col>
      </Grid>
    </Container>
  );
};
