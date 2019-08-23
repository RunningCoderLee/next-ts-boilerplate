import React, { ReactElement } from 'react'
import Link from 'next/link'
import styles from './styles.scss'

const links: {
  href: string;
  label: string;
  key: string;
}[] = [
  { href: 'https://zeit.co/now', label: 'ZEIT' },
  { href: 'https://github.com/zeit/next.js', label: 'GitHub' },
].map(link => ({ ...link, key: `nav-link-${link.href}-${link.label}` }))

const Nav = (): ReactElement => (
  <nav className={styles.nav}>
    <ul className={styles.ul}>
      <li className={styles.li}>
        <Link href="/">
          <a className={styles.a}>Home</a>
        </Link>
      </li>
      {links.map(({ key, href, label }) => (
        <li className={styles.li} key={key}>
          <a className={styles.a} href={href}>
            {label}
          </a>
        </li>
      ))}
    </ul>
  </nav>
)

export default Nav
