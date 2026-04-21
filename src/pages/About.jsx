import Footer from '../components/Footer'
import { teamData } from '../data'
import styles from './About.module.css'

export default function About() {
  return (
    <div>
      <div className={styles.mission}>
        <div className="wrap" style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <div className="sec-tag" style={{ background: 'rgba(255,255,255,.15)', color: 'rgba(255,255,255,.9)', marginBottom: 16 }}>关于我们</div>
          <h1 className={styles.missionTitle}>帮助更多人了解和到达<br />他们需要的医疗资源</h1>
          <p className={styles.missionDesc}>我们相信，信息透明是最好的服务起点。通过提供真实、全面的中国医疗旅行信息，帮助每一个考虑赴华就医的人做出知情决策。</p>
        </div>
      </div>

      <div className="sec wrap">
        <div className="sec-tag">我们的价值观</div>
        <h2 className="sec-title" style={{ marginBottom: 32 }}>三个核心原则</h2>
        <div className={styles.valuesGrid}>
          {[
            { icon: '🔎', title: '信息透明', desc: '我们提供客观、全面的公开信息，不夸大、不误导。充分了解的用户才能做出真正适合自己的决策。' },
            { icon: '🤝', title: '用户自主', desc: '我们的第一目标是让用户具备自主决策和操作的能力。收费服务是补充，而非前提。' },
            { icon: '🌉', title: '连接两个世界', desc: '我们在中国和欧美之间架桥。理解两种文化和医疗体系，才能真正帮到需要跨越这段距离的人。' },
          ].map(v => (
            <div key={v.title} className="card" style={{ padding: 28, textAlign: 'center' }}>
              <div style={{ fontSize: 36, marginBottom: 14 }}>{v.icon}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--navy)', marginBottom: 6 }}>{v.title}</div>
              <div style={{ fontSize: 13, color: 'var(--text-md)', lineHeight: 1.7 }}>{v.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="sec sec-alt">
        <div className="wrap">
          <div className="sec-tag">团队介绍</div>
          <h2 className="sec-title" style={{ marginBottom: 32 }}>认识我们的团队</h2>
          <div className={styles.teamGrid}>
            {teamData.map(t => (
              <div key={t.name} className="card" style={{ padding: '28px 20px', textAlign: 'center' }}>
                <div style={{ width: 80, height: 80, borderRadius: '50%', background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, margin: '0 auto 14px', border: '3px solid #fff', boxShadow: 'var(--shadow)' }}>{t.avatar}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--navy)', marginBottom: 3 }}>{t.name}</div>
                <div style={{ fontSize: 12, color: 'var(--blue)', fontWeight: 500, marginBottom: 8 }}>{t.role}</div>
                <div style={{ fontSize: 12, color: 'var(--text-md)', lineHeight: 1.7 }}>{t.bio}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sec wrap">
        <div className={styles.compliance}>
          <h3>⚖️ 服务性质声明</h3>
          <p>本公司提供中国医疗旅行信息咨询服务，不代表任何医疗机构，不提供医疗诊断、疾病治疗建议或医疗方案推荐。所有信息内容仅供参考，具体医疗决策请咨询持牌医疗专业人员。患者故事均已取得当事人书面授权，内容以旅行体验为主，不构成疗效承诺。</p>
        </div>
      </div>

      <Footer />
    </div>
  )
}
