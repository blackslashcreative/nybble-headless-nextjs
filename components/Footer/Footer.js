import classNames from 'classnames/bind';
import { Container, NavigationMenu } from '../../components';
import styles from './Footer.module.scss';
import Image from 'next/image';
import Link from "next/link";

let cx = classNames.bind(styles);

export default function Footer({ title, menuItems }) {
  const year = new Date().getFullYear();

  return (
    <footer className={cx('component')}>
      <Container className="flex md:pb-10 footer-container">
        <Image src="/img/logo.svg" width={56} height={108} alt="nybble logo" className="mr-8 mb-2"/>
        <div className="grow mb-4">
          <p className="text-sm mb-1">Let's build your site!</p>
          <Link href="/contact"><button className="button">Contact Us</button></Link>
          {/*<NavigationMenu menuItems={menuItems} className="footer-nav" />*/}
        </div>
        <p className={`${cx('copyright')} mb-4 copyright`}>{`${title} © ${year}`} // Powered by BlackSlash headless</p>
      </Container>
    </footer>
  );
}
