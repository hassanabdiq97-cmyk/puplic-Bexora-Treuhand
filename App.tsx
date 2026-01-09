
'use client';

import React from 'react';
import RootLayout from './app/layout';
import Home from './app/page';

export default function App() {
  // In einer echten Next.js App übernimmt der Router das Rendern der pages.
  // In dieser Umgebung simulieren wir das Root-Layout und die Home-Page.
  return (
    <RootLayout>
      <Home />
    </RootLayout>
  );
}
