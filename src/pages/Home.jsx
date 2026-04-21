import { useNavigate } from 'react-router-dom'
import FaqItem from '../components/FaqItem'
import Footer from '../components/Footer'
import { homeFaqData } from '../data'
import styles from './Home.module.css'

export default function Home() {
  const nav = useNavigate()

  return (
    <div>
      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.orb1} />
        <div className={styles.orb2} />
        <div className={styles.heroInner}>
          <div className={styles.eyebrow}>🌏 面向欧美用户的中国医疗旅行咨询平台</div>
          <h1 className={styles.title}>
            探索<em className={styles.em}>中国医疗</em>的<br />另一种可能
          </h1>
          <p className={styles.desc}>
            无论您正在考虑还是已经决定赴华就医，我们提供全面的信息支持与专业的旅行咨询服务，
            帮助您了解中国医疗、规划完整旅程。
          </p>
          <div className={styles.ctas}>
            <button className={styles.ctaMain} onClick={() => nav('/ai')}>🤖 开始 AI 咨询（免费）</button>
            <button className={styles.ctaGhost} onClick={() => nav('/resources')}>了解中国医疗 →</button>
          </div>
          <div className={styles.pills}>
            {['✓ 旅行流程指南', '✓ 医院背景资料', '✓ 患者真实故事', '✓ 签证与出行信息'].map(p => (
              <span key={p} className={styles.pill}>{p}</span>
            ))}
          </div>
        </div>
      </div>

      {/* 三大优势 */}
      <div className="sec wrap">
        <div className="sec-tag">为何选择中国</div>
        <h2 className="sec-title">了解中国医疗，做出知情决策</h2>
        <p className="sec-sub">我们整合了最全面的中国医疗旅行公开资讯，帮助您从多个维度建立判断</p>
        <div className={styles.advGrid}>
          {[
            { icon: '📰', title: '医疗资讯与政策', desc: '持续更新的中国医疗技术进展、政策动态与行业新闻，帮助您了解中国医疗的真实现状。', label: '浏览资讯 →', to: '/resources?tab=news' },
            { icon: '🏥', title: '顶级医院介绍', desc: '详细的中国权威医院背景介绍，包含医院环境、资质认证，以及虚拟游览。', label: '查看医院 →', to: '/resources?tab=hospitals' },
            { icon: '💬', title: '真实旅行故事', desc: '患者与医生的第一手故事，了解赴华就医是一种怎样的旅程体验，而不只是数字。', label: '阅读故事 →', to: '/resources?tab=stories' },
          ].map(c => (
            <div key={c.title} className="card" style={{ padding: '32px 28px' }}>
              <div style={{ fontSize: 36, marginBottom: 16 }}>{c.icon}</div>
              <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--navy)', marginBottom: 8 }}>{c.title}</div>
              <div style={{ fontSize: 13, color: 'var(--text-md)', lineHeight: 1.8, marginBottom: 18 }}>{c.desc}</div>
              <button className="btn btn-ghost btn-sm" onClick={() => nav(c.to)}>{c.label}</button>
            </div>
          ))}
        </div>
      </div>

      {/* 步骤预览 */}
      <div className="sec sec-alt">
        <div className="wrap">
          <div className="sec-tag gold">服务指南</div>
          <h2 className="sec-title">赴华就医，我需要做什么？</h2>
          <p className="sec-sub">从决定到回家，我们梳理了完整的旅行规划流程</p>
          <div className={styles.stepsRow}>
            {[
              { n: 1, title: '调研与咨询', sub: '了解信息，评估可行性' },
              { n: 2, title: '签证与出行', sub: '材料准备，安排行程' },
              { n: 3, title: '语言与沟通', sub: '翻译服务，病历准备' },
              { n: 4, title: '支付与回国', sub: '费用安排，资料获取' },
            ].map(s => (
              <div key={s.n} className={styles.stepItem}>
                <div className={styles.stepDot}>{s.n}</div>
                <div className={styles.stepTitle}>{s.title}</div>
                <div className={styles.stepSub}>{s.sub}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <button className="btn btn-primary" onClick={() => nav('/services')}>查看完整流程指南 →</button>
          </div>
        </div>
      </div>

      {/* 故事预览 */}
      <div className="sec wrap">
        <div className="sec-tag">旅行故事</div>
        <h2 className="sec-title">他们是这样踏上旅程的</h2>
        <p className="sec-sub">真实的人，真实的经历——来自患者和医生视角的故事</p>
        <div className={styles.storyGrid}>
          {[
            { avatar: '👩', bg: '#e8f0fb', name: 'Sarah M.', meta: '🇬🇧 英国 · 患者故事', quote: '"最初我对去中国就医充满顾虑——语言、文化差异、不知道该找谁。但当我开始认真查资料，发现有大量公开信息可以参考。这个网站帮我把所有问题逐一梳理清楚……"', tag: '赴华旅程准备' },
            { avatar: '👨‍⚕️', bg: '#e8f5e9', name: 'Dr. 王立新', meta: '🇨🇳 北京 · 医生故事', quote: '"每年我们都会接诊来自十几个国家的患者。他们最开始都有同样的困惑——不知道如何跨越距离和语言找到我们。我希望更多人知道，这个旅程是可以提前规划好的……"', tag: '医生视角' },
          ].map(s => (
            <div key={s.name} className="card" style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{s.avatar}</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--navy)' }}>{s.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-lt)' }}>{s.meta}</div>
                </div>
              </div>
              <p style={{ fontSize: 14, color: 'var(--text-md)', lineHeight: 1.8, fontStyle: 'italic' }}>{s.quote}</p>
              <span style={{ display: 'inline-block', background: 'var(--bg-alt)', color: 'var(--text-md)', fontSize: 11, padding: '3px 10px', borderRadius: 12 }}>{s.tag}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 28 }}>
          <button className="btn btn-ghost" onClick={() => nav('/resources?tab=stories')}>阅读更多故事 →</button>
        </div>
      </div>

      {/* 关于我们预览 */}
      <div className="sec sec-alt">
        <div className="wrap">
          <div className="sec-tag">关于我们</div>
          <h2 className="sec-title">我们是谁</h2>
          <div className={styles.teamPreview}>
            <div className={styles.teamText}>
              <p style={{ fontSize: 15, color: 'var(--text-md)', lineHeight: 1.9, marginBottom: 16 }}>我们是一支专注于中国医疗旅行咨询的团队，成员来自医疗、旅行、翻译等多个领域，在中国和欧美均有深度资源网络。</p>
              <p style={{ fontSize: 15, color: 'var(--text-md)', lineHeight: 1.9, marginBottom: 20 }}>我们相信，充分的信息是最好的决策基础。因此我们的第一件事，是帮助您免费获取所有您需要的信息。当您准备好寻求专业协助时，我们随时在这里。</p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <button className="btn btn-ghost btn-sm" onClick={() => nav('/about')}>了解团队 →</button>
                <button className="btn btn-primary btn-sm" onClick={() => nav('/services?tab=contact')}>联系我们</button>
              </div>
            </div>
            <div className={styles.teamFaces}>
              {[
                { avatar: '👩', bg: '#e8f0fb', name: 'Lisa Chen', role: '创始人' },
                { avatar: '👨', bg: '#e8f5e9', name: 'James Park', role: '医疗顾问' },
                { avatar: '👩', bg: '#fdf3e0', name: 'Marie Dupont', role: '旅行协调' },
              ].map(m => (
                <div key={m.name} style={{ textAlign: 'center' }}>
                  <div style={{ width: 72, height: 72, borderRadius: '50%', background: m.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, margin: '0 auto 8px', border: '3px solid #fff', boxShadow: 'var(--shadow)' }}>{m.avatar}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--navy)' }}>{m.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-lt)' }}>{m.role}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="sec wrap">
        <div className="sec-tag">常见问题</div>
        <h2 className="sec-title">您可能想知道的</h2>
        <p className="sec-sub">更复杂的问题，随时可以通过 AI 咨询获得解答</p>
        <div className={styles.faqGrid}>
          {homeFaqData.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
        </div>
      </div>

      <Footer />
    </div>
  )
}
