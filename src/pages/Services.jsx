import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import FaqItem from '../components/FaqItem'
import { stepsData, sfaqData } from '../data'
import styles from './Services.module.css'

const TABS = ['steps', 'faq', 'contact']
const TAB_LABELS = ['📋 Step by Step', '❓ 常见问题', '📩 联系我们']

export default function Services() {
  const nav = useNavigate()
  const [params, setParams] = useSearchParams()
  const tabParam = params.get('tab') || 'steps'
  const [activeTab, setActiveTab] = useState(TABS.includes(tabParam) ? tabParam : 'steps')
  const [openStep, setOpenStep] = useState(null)
  const [sfaqCat, setSfaqCat] = useState(Object.keys(sfaqData)[0])

  useEffect(() => {
    const t = params.get('tab')
    if (t && TABS.includes(t)) setActiveTab(t)
  }, [params])

  function switchTab(t) { setActiveTab(t); setParams({ tab: t }) }

  return (
    <div>
      <div className={styles.subTabs}>
        {TABS.map((t, i) => (
          <button key={t} className={`${styles.subTab} ${activeTab === t ? styles.active : ''}`} onClick={() => switchTab(t)}>
            {TAB_LABELS[i]}
          </button>
        ))}
      </div>

      {/* STEPS */}
      {activeTab === 'steps' && (
        <div className={styles.subPage}>
          <div className="wrap" style={{ maxWidth: 760 }}>
            <div className="sec-tag gold">旅行流程</div>
            <h2 className="sec-title">赴华就医 Step by Step</h2>
            <p className="sec-sub">我们梳理了完整的旅行规划流程，帮助您在每个阶段做好准备</p>
            <div className={styles.stepsList}>
              {stepsData.map((s, i) => (
                <div key={i} className={`${styles.stepItem} ${openStep === i ? styles.open : ''}`} onClick={() => setOpenStep(openStep === i ? null : i)}>
                  <div className={styles.stepNumCol}>
                    <div className={styles.stepCircle}>{s.num}</div>
                  </div>
                  <div className={styles.stepBody}>
                    <div className={styles.stepTitle}>
                      <span>{s.title}</span>
                      <span style={{ fontSize: 14, color: 'var(--text-lt)' }}>▾</span>
                    </div>
                    <div className={styles.stepPreview}>{s.preview}</div>
                    {openStep === i && (
                      <div className={styles.stepDetail} onClick={e => e.stopPropagation()}>
                        <ul>{s.detail.map((d, j) => <li key={j}>{d}</li>)}</ul>
                        <div className={styles.stepNudge}>
                          <span>💬 对这个步骤有具体问题？AI 咨询可以即时解答。</span>
                          <button className="btn btn-primary btn-sm" onClick={() => nav('/ai')}>AI 咨询</button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* FAQ */}
      {activeTab === 'faq' && (
        <div className={styles.subPage}>
          <div className="wrap" style={{ maxWidth: 760 }}>
            <div className="sec-tag">常见问题</div>
            <h2 className="sec-title" style={{ marginBottom: 24 }}>按主题查找解答</h2>
            <div className={styles.sfaqCats}>
              {Object.keys(sfaqData).map(c => (
                <button key={c} className={`${styles.sfaqCat} ${sfaqCat === c ? styles.active : ''}`} onClick={() => setSfaqCat(c)}>{c}</button>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {sfaqData[sfaqCat].map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
            </div>
            <div className="ai-nudge" style={{ marginTop: 24 }}>
              <span>没找到答案？AI 咨询可以即时回答您更具体的问题。</span>
              <button className="btn btn-primary btn-sm" onClick={() => nav('/ai')}>进入 AI 咨询</button>
            </div>
          </div>
        </div>
      )}

      {/* CONTACT */}
      {activeTab === 'contact' && (
        <div className={styles.subPage}>
          <div className="wrap">
            <div className="sec-tag">联系我们</div>
            <h2 className="sec-title" style={{ marginBottom: 8 }}>需要专业团队支持？</h2>
            <p className="sec-sub">在您充分了解信息后，如果仍然希望有专业团队协助，我们在这里</p>
            <div className={styles.serviceBox}>
              <h3>📌 什么时候需要找我们？</h3>
              <p>当您已经通过 AI 咨询和资讯内容了解了赴华就医的基本信息，但仍感到需要：<strong>①</strong> 有人代为处理全部流程（预约、签证、出行、陪同），或 <strong>②</strong> 有更个性化的定制安排，欢迎联系我们的人工顾问团队，我们提供收费的一对一咨询服务。</p>
            </div>
            <div className={styles.contactLayout}>
              <div className={styles.formCard}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--navy)', marginBottom: 20 }}>发送咨询</h3>
                {[
                  { label: '您的姓名', type: 'text', placeholder: 'Full Name' },
                  { label: '电子邮箱', type: 'email', placeholder: 'email@example.com' },
                ].map(f => (
                  <div key={f.label} style={{ marginBottom: 18 }}>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--navy)', marginBottom: 6 }}>{f.label}</label>
                    <input type={f.type} placeholder={f.placeholder} style={{ width: '100%', border: '1.5px solid var(--border)', borderRadius: 8, padding: '10px 14px', fontSize: 14, fontFamily: 'inherit', outline: 'none' }} />
                  </div>
                ))}
                <div style={{ marginBottom: 18 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--navy)', marginBottom: 6 }}>所在国家</label>
                  <select style={{ width: '100%', border: '1.5px solid var(--border)', borderRadius: 8, padding: '10px 14px', fontSize: 14, fontFamily: 'inherit', outline: 'none' }}>
                    <option>请选择...</option>
                    {['美国 United States','英国 United Kingdom','加拿大 Canada','澳大利亚 Australia','德国 Germany','法国 France','其他 Other'].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div style={{ marginBottom: 18 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--navy)', marginBottom: 6 }}>服务需求类型</label>
                  <select style={{ width: '100%', border: '1.5px solid var(--border)', borderRadius: 8, padding: '10px 14px', fontSize: 14, fontFamily: 'inherit', outline: 'none' }}>
                    <option>请选择...</option>
                    {['全程代办服务（签证/预约/陪同）','旅行规划定制咨询','医院/医生信息咨询','其他定制需求'].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div style={{ marginBottom: 18 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--navy)', marginBottom: 6 }}>旅行需求描述（可选）</label>
                  <textarea placeholder="简单描述您的旅行计划或需要解决的主要问题..." style={{ width: '100%', border: '1.5px solid var(--border)', borderRadius: 8, padding: '10px 14px', fontSize: 14, fontFamily: 'inherit', outline: 'none', resize: 'vertical', height: 90 }} />
                </div>
                <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => alert('感谢您的咨询！我们将在24小时内通过邮件回复您。')}>提交咨询</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {[
                  { title: '💬 WhatsApp 直联', body: '需要即时沟通？通过 WhatsApp 直接联系我们的顾问团队，通常在工作时间内30分钟内回复。', extra: <button style={{ marginTop: 12, background: '#25D366', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer', width: '100%', fontFamily: 'inherit' }}>💬 通过 WhatsApp 联系</button> },
                  { title: '📧 邮件联系', body: 'info@medicaltraveltochina.com\n我们在1个工作日内回复所有邮件。' },
                  { title: '🎥 预约视频咨询', body: '通过视频会议与我们的顾问面对面沟通，适合需要详细讨论旅行方案的用户。', extra: <button className="btn btn-ghost btn-sm" style={{ marginTop: 10 }} onClick={() => alert('视频咨询预约功能即将上线')}>预约时间</button> },
                ].map(b => (
                  <div key={b.title} className="card" style={{ padding: 24 }}>
                    <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--navy)', marginBottom: 12 }}>{b.title}</h3>
                    <p style={{ fontSize: 13, color: 'var(--text-md)', lineHeight: 1.7, whiteSpace: 'pre-line' }}>{b.body}</p>
                    {b.extra}
                  </div>
                ))}
                <div className="ai-nudge">
                  <span>💡 如果您只是想了解信息，可以先试试免费的 AI 咨询。</span>
                  <button className="btn btn-primary btn-sm" onClick={() => nav('/ai')}>AI 咨询</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
