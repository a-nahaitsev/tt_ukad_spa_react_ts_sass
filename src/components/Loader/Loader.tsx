import classNames from 'classnames';
import React from 'react';
import { LoaderSize } from '../../types/LoaderSize';
import styles from './Loader.module.scss';

type Props = {
  size?: LoaderSize;
  color?: string;
};

export const Loader: React.FC<Props> = ({ size = LoaderSize.M, color }) => (
  <div className={styles.loader}>
    <div
      className={classNames(
        styles.loader__content,
        styles[`loader__content_${size}`]
      )}
      style={{ borderLeftColor: color }}
    />
  </div>
);
