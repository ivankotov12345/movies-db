'use client';

import { Container, Grid, NavLink, Text } from '@mantine/core';
import Link from 'next/link';
import { useState } from 'react';
import { Logo } from '@app/component/logo/logo';
import {
  FONT_WEIGHT_BOLD,
  LAYOUT_MAX_WIDTH,
  MIN_HEIHT,
  NAVIGATION_WIDTH } from '@app/constants/constants';
import { NAVIGATION } from '@app/constants/navigation';


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
            <Logo />

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

        <Col span='auto' maw={980} mx='auto'>
          { children }
        </Col>
      </Grid>
    </Container>
  );
};
