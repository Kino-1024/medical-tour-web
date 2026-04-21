import { Link, useLocation } from 'react-router-dom'
import styles from './Nav.module.css'

const links = [
  { to: '/', label: '首页' },
  { to: '/ai', label: 'AI 咨询' },
  { to: '/resources', label: '资讯中心' },
  { to: '/services', label: '服务指南' },
  { to: '/about', label: '关于我们' },
]

export default function Nav() {
  const { pathname } = useLocation()

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.logo}>
        <div className={styles.logoMark}>+</div>
        <div>
          <div className={styles.logoName}>Medical Travel to China</div>
          <div className={styles.logoSub}>CONCIERGE SERVICE</div>
        </div>
      </Link>

      <ul className={styles.links}>
        {links.map(l => (
          <li key={l.to}>
            <Link to={l.to} className={`${styles.link} ${pathname === l.to ? styles.active : ''}`}>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>

      <Link to="/ai" className={styles.cta}>免费 AI 咨询 →</Link>
    </nav>
  )
}
