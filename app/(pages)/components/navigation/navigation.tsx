import { Grid, NavLink, Text } from '@mantine/core';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CSSProperties, useContext } from 'react';
import { Context } from '@app/(pages)/context/context';
import { Logo } from '@app/component/logo/logo';
import { FONT_WEIGHT_BOLD, MIN_HEIHT, NAVIGATION_WIDTH } from '@app/constants/constants';
import { NAVIGATION } from '@app/constants/navigation';

import styles from './navigation.module.scss';

const { Col } = Grid;

type NavigationProps = {
  style?: CSSProperties
}

export const Navigation: React.FC<NavigationProps> = ({ style }) => {
  const { setIsBurgerOpen } = useContext(Context);
  const catalog = usePathname().split('/')[1];

  const onClick = () => setIsBurgerOpen(false);
  return (
  <Col maw={NAVIGATION_WIDTH} p='lg' className={styles.sidebarWrapper} mih={MIN_HEIHT} style={style}>
    <aside>
      <Logo />

        <nav className={styles.navigation}>
           {NAVIGATION.map(({ link, path }) => (
           <NavLink
            component={Link}
            active={path === `/${catalog}`}
            href={path}
            label={
            <Text fw={FONT_WEIGHT_BOLD}>{link}</Text>
            }
            key={link}
            color='appColors.6'
            classNames={{
              root: styles.link
            }}
            onClick={onClick}
           />
         ))}
        </nav>
  </aside>
 </Col>
 );
};
