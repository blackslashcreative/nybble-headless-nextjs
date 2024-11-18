import { useState } from 'react';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { 
  Container, 
  NavigationMenu, 
  SkipNavigationLink, 
} from '../../components';
import styles from './Header.module.scss';
import Modal from '../Modal/Modal';

let cx = classNames.bind(styles);

export default function Header({
  title = 'nybble',
  description,
  menuItems
}) {
  const [isNavShown, setIsNavShown] = useState(false);

  return (
    <header className={cx('component')}>
      <SkipNavigationLink />
        <Container>
          <div className={cx('navbar')}>
            <div className={cx('brand')}>
              <Link legacyBehavior href="/">
                <a className={cx('title')}>{title}</a>
              </Link>
              {description && <p className={cx('description')}>{description}</p>}
            </div>
            <NavigationMenu
              className={cx(['primary-navigation'])}
              menuItems={menuItems}
            />
            <Modal />
        </div>
      </Container>
    </header>
  );
}
