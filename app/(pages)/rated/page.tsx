'use client';

import dynamic from 'next/dynamic';

const Rated = dynamic(() => import('./components/rated').then((mod) => mod.Rated), {
  ssr: false,
});

export default function RatedPage() {
  return (
    <Rated />
  );
}