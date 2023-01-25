import React from 'react';
import { Slider } from '../Slider';
import { ProductList } from '../ProductList';
import styles from './Content.module.scss';
import { Navigate, Route, Routes } from 'react-router-dom';

export const Content: React.FC = () => {
  return (
    <main className={styles.content}>
      <div className={styles.content__wrapper}>
        <Routes>
          <Route path="/" element={<Slider />} />
          <Route path="/home" element={<Navigate to="/" replace />} />

          <Route path="/products" element={<ProductList />} />
        </Routes>
      </div>
    </main>
  );
};
