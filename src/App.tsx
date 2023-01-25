import React from 'react';
import { Content } from './components/Content';
import { Footer } from './components/Footer';
import { Header } from './components/Header';

export const App: React.FC = () => {
  return (
    <div>
      <Header />
      <Content />
      <Footer />
    </div>
  );
};
