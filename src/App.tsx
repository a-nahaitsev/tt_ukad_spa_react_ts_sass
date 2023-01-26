import React from 'react';
import { Content } from './components/Content';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import styles from './App.module.scss';

export const App: React.FC = () => {
  return (
    <div className={styles.page}>
      <Header />
      <Content />
      <Footer />
    </div>
  );
};
