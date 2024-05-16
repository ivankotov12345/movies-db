import styles from './header.module.scss';

type HeaderProps = {
  children: React.ReactNode
}

export const Header: React.FC<HeaderProps> = ({ children }) => {
  
  return (
    <header className={styles.header}>
      { children }
    </header>
  );
};
