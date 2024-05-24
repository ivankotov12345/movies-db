'use client';

import { Container, Grid, Overlay, Transition } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { Fragment, useState } from 'react';
import { Context } from '@app/(pages)/context/context';
import { LAYOUT_MAX_WIDTH, LAYOUT_MAX_WIDTH_TABLET } from '@app/constants/constants';
import { Navigation } from '../navigation';

type AppLayoutProps = {
  children: React.ReactNode
}

const { Col } = Grid;

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [isBurgerOpen, setIsBurgerOpen] = useState<boolean>(false);

  const { width } = useViewportSize();

  return (
    <Container
      size={LAYOUT_MAX_WIDTH}
      p={0}
    >
      <Context.Provider value={{ isBurgerOpen, setIsBurgerOpen }}>
      <Grid gutter={0}>
        {width > LAYOUT_MAX_WIDTH_TABLET
        ? <Navigation />
        : (
          <Transition
            mounted={isBurgerOpen}
            transition='fade-right'
            duration={300}
          >
            {(transitionStyle) => (
              <Fragment>
              <Overlay
                color='appColors.4'
                backgroundOpacity={0.2}
                style={transitionStyle}
                onClick={() => setIsBurgerOpen(false)}
              />
              <Navigation
                style={{ ...transitionStyle, position: 'fixed', zIndex: 250 }}
              />
              </Fragment>
            )}
          </Transition>
        )}


        <Col span='auto' maw={1000} mx='auto'>
          { children }
        </Col>
      </Grid>
      </Context.Provider>
    </Container>
  );
};
