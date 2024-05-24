import { AppLayout } from './components/app-layout';

import '@mantine/core/styles.layer.css';
import '@mantine/dates/styles.css';
import '@app/global.scss';

export const metadata = {
  title: 'Arrow Flicks',
  description: 'Movies database',
};

type PagesLayoutProps = {
  children: React.ReactNode
}

export default function RootLayout({ children }: PagesLayoutProps) {
  return (
    <AppLayout>
      { children }
    </AppLayout>
  );
}
