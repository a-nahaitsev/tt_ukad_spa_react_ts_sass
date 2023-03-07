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
  const isProductsPage = location.pathname === '/products';
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const moveOnDeafultProducts = () => {
    if (
      isProductsPage &&
      !(searchParams.get('page') !== '1') &&
      !(searchParams.get('search') !== '')
    ) {
      searchParams.set('page', '1');
      searchParams.delete('search');
      setSearchParams(searchParams);
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
                onClick={moveOnDeafultProducts}
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
