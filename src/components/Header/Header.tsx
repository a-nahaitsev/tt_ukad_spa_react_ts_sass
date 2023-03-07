import React from 'react';
import styles from './Header.module.scss';
import logo from '../../assets/img/UKAD_logo.svg';
import {
  Link,
  NavLink,
  useLocation,
  useMatch,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import classNames from 'classnames';
import { SearchForm } from '../SearchForm';

export const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchparams, setSearchParams] = useSearchParams();
  const isProductsPage = location.pathname === '/products';
  const isDefaultProductsParams =
    (searchparams.get('page') === '1' || !searchparams.get('page')) &&
    !searchparams.get('search');
  const onProductsClick = () => {
    if (isProductsPage && !isDefaultProductsParams) {
      searchparams.set('page', '1');
      searchparams.delete('search');
      setSearchParams(searchparams);
      navigate(0);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__wrapper}>
        <nav className={styles.header__navigation}>
          <Link className={styles.header__logo} to="/home">
            <img src={logo} alt="UKAD logo" />
          </Link>

          <ul className={styles.header__menu}>
            <li className={styles.header__item}>
              <NavLink
                className={({ isActive }) =>
                  classNames(styles.header__link, {
                    [styles['header__link--active']]: useMatch('/') && isActive,
                  })
                }
                to={'/'}
              >
                Home
              </NavLink>
            </li>

            <li className={styles.header__item}>
              <NavLink
                className={({ isActive }) =>
                  classNames(styles.header__link, {
                    [styles['header__link--active']]:
                      useMatch('/products') && isActive,
                  })
                }
                to={'/products'}
                onClick={onProductsClick}
              >
                Products
              </NavLink>
            </li>
          </ul>
        </nav>

        {!isProductsPage && <SearchForm />}
      </div>
    </header>
  );
};
