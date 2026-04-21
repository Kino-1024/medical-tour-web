import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        © 2025 Medical Travel to China Concierge &nbsp;·&nbsp;
        <a href="#">隐私政策</a>
        <a href="#">服务条款</a>
        <a href="#">免责声明</a>
      </div>
      <div className={styles.note}>
        本网站提供中国医疗旅行信息咨询服务，不提供任何医疗诊断或医疗建议。所有内容仅供参考，具体医疗决策请咨询持牌医疗专业人员。
      </div>
    </footer>
  )
}
