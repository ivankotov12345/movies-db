import { Grid, NavLink, Text } from '@mantine/core';
import Link from 'next/link';
import { CSSProperties, useState } from 'react';
import { Logo } from '@app/component/logo/logo';
import { FONT_WEIGHT_BOLD, MIN_HEIHT, NAVIGATION_WIDTH } from '@app/constants/constants';
import { NAVIGATION } from '@app/constants/navigation';

import styles from './navigation.module.scss';

const { Col } = Grid;

type NavigationProps = {
  style?: CSSProperties
}

export const Navigation: React.FC<NavigationProps> = ({ style }) => {
  const [activeLink, setActiveLink] = useState(0);

  return (
  <Col maw={NAVIGATION_WIDTH} p='lg' className={styles.sidebarWrapper} mih={MIN_HEIHT} style={style}>
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
 );
};
