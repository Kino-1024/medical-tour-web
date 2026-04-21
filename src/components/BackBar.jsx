import { useNavigate, useLocation } from 'react-router-dom'
import styles from './BackBar.module.css'

const pageNames = {
  '/': '首页',
  '/ai': 'AI 咨询',
  '/resources': '资讯中心',
  '/services': '服务指南',
  '/about': '关于我们',
}

export default function BackBar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  if (pathname === '/') return null

  return (
    <div className={styles.bar}>
      <button className={styles.btn} onClick={() => navigate(-1)}>← 返回</button>
      <span className={styles.sep}>|</span>
      <span className={styles.crumb}>{pageNames[pathname] ?? '当前页面'}</span>
    </div>
  )
}
