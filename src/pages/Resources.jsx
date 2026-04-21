import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { newsData, newsCats, hospitalData, storiesData } from '../data'
import styles from './Resources.module.css'

const TABS = ['news', 'china-info', 'hospitals', 'stories']
const TAB_LABELS = ['📰 新闻资讯', '🏥 中国医疗信息', '🏨 医院介绍', '💬 医疗故事']

export default function Resources() {
  const nav = useNavigate()
  const [params, setParams] = useSearchParams()
  const tabParam = params.get('tab') || 'news'
  const [activeTab, setActiveTab] = useState(TABS.includes(tabParam) ? tabParam : 'news')
  const [newsCat, setNewsCat] = useState('全部')
  const [storyFilter, setStoryFilter] = useState('all')
  const [selectedHospital, setSelectedHospital] = useState(null)

  useEffect(() => {
    const t = params.get('tab')
    if (t && TABS.includes(t)) setActiveTab(t)
  }, [params])

  function switchTab(t) {
    setActiveTab(t)
    setParams({ tab: t })
    setSelectedHospital(null)
  }

  const filteredNews = newsCat === '全部' ? newsData : newsData.filter(n => n.cat === newsCat)
  const filteredStories = storyFilter === 'all' ? storiesData : storiesData.filter(s => s.type === storyFilter)

  return (
    <div>
      <div className={styles.subTabs}>
        {TABS.map((t, i) => (
          <button key={t} className={`${styles.subTab} ${activeTab === t ? styles.active : ''}`} onClick={() => switchTab(t)}>
            {TAB_LABELS[i]}
          </button>
        ))}
      </div>

      {/* NEWS */}
      {activeTab === 'news' && (
        <div className={styles.subPage}>
          <div className="wrap">
            <div className="sec-tag">新闻资讯</div>
            <h2 className="sec-title" style={{ marginBottom: 24 }}>中国医疗最新动态</h2>
            <div className={styles.filters}>
              {newsCats.map(c => (
                <button key={c} className={`${styles.filterTag} ${newsCat === c ? styles.active : ''}`} onClick={() => setNewsCat(c)}>{c}</button>
              ))}
            </div>
            <div className={styles.newsGrid}>
              {filteredNews.map(n => (
                <div key={n.id} className="card" style={{ overflow: 'hidden' }}>
                  <div style={{ height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 52, background: n.bg }}>{n.icon}</div>
                  <div style={{ padding: 20 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--blue)', marginBottom: 6 }}>{n.cat}</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--navy)', marginBottom: 6, lineHeight: 1.5 }}>{n.title}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-md)', lineHeight: 1.7 }}>{n.desc}</div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px', borderTop: '1px solid var(--border)', fontSize: 12, color: 'var(--text-lt)' }}>
                    <span>📅 {n.date}</span><span>⏱ {n.read}阅读</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CHINA INFO */}
      {activeTab === 'china-info' && (
        <div className={styles.subPage}>
          <div className="wrap" style={{ maxWidth: 800 }}>
            <div className="sec-tag">中国医疗信息</div>
            <h2 className="sec-title">全面了解中国医疗体系</h2>
            <p className="sec-sub">客观、全面的中国医疗概述，帮助您建立基础认知</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {[
                { icon: '🏛️', title: '中国医疗体系概述', body: '中国拥有全球规模最大的医疗体系之一，三级医院体系覆盖全国。其中"三甲医院"（三级甲等）代表最高医疗级别，目前全国共有1500余家。中国在医疗基础设施建设和医疗人才培养上持续投入，近年来在多个专科领域取得了显著进展。' },
                { icon: '🏅', title: '国际认证体系', body: 'JCI（国际联合委员会）是全球最具权威的医疗机构认证体系。中国目前已有约100家医院获得JCI认证，主要集中在北京、上海、广州等大城市。这些医院在患者安全、护理质量、医疗记录管理等方面均达到国际标准。' },
                { icon: '🌿', title: '中西医结合特色', body: '中国独特的医疗优势之一是将传统中医（TCM）与现代西医系统性地整合。传统中医包括针灸、中药、推拿等疗法，已被WHO纳入国际疾病分类体系（ICD-11）。对于某些慢性疾病、疑难病症（如长新冠 Long COVID）的辅助调理，中医疗法有大量临床应用经验。' },
                { icon: '⏱️', title: '就医效率', body: '与部分西方国家公立医疗系统相比，中国私立医院和部分三甲医院的国际患者部通常具有较短的预约等待时间。许多国际患者选择来华就医的原因之一，是在本国面临数月乃至更长时间的等待，而在中国可在数周内完成就诊。' },
              ].map(item => (
                <div key={item.title} className="card" style={{ padding: 28 }}>
                  <h3 style={{ color: 'var(--navy)', marginBottom: 12, fontSize: 17 }}>{item.icon} {item.title}</h3>
                  <p style={{ fontSize: 14, color: 'var(--text-md)', lineHeight: 1.9 }}>{item.body}</p>
                </div>
              ))}
              <div className="ai-nudge">
                <span>想了解更多，或者有具体的旅行规划问题？AI 咨询可以为您提供即时解答。</span>
                <button className="btn btn-primary btn-sm" onClick={() => nav('/ai')}>进入 AI 咨询</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HOSPITALS */}
      {activeTab === 'hospitals' && (
        <div className={styles.subPage}>
          <div className="wrap">
            {!selectedHospital ? (
              <>
                <div className="sec-tag">医院介绍</div>
                <h2 className="sec-title" style={{ marginBottom: 24 }}>合作医院一览</h2>
                <div className={styles.hospitalGrid}>
                  {hospitalData.map(h => (
                    <div key={h.id} className="card" style={{ overflow: 'hidden', cursor: 'pointer' }} onClick={() => setSelectedHospital(h)}>
                      <div style={{ height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 64, background: h.bg, position: 'relative' }}>
                        {h.icon}
                        <span style={{ position: 'absolute', bottom: 10, right: 10, background: 'rgba(255,255,255,.92)', color: 'var(--teal)', fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 12 }}>✓ {h.badge}</span>
                      </div>
                      <div style={{ padding: 20 }}>
                        <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--navy)', marginBottom: 4 }}>{h.name}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-lt)', marginBottom: 10 }}>📍 {h.city}</div>
                        <div style={{ fontSize: 13, color: 'var(--text-md)', lineHeight: 1.7, marginBottom: 14 }}>{h.desc}</div>
                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                          {h.tags.map(t => <span key={t} style={{ background: 'var(--bg-alt)', color: 'var(--text-md)', fontSize: 11, padding: '3px 10px', borderRadius: 10 }}>{t}</span>)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div style={{ maxWidth: 800 }}>
                <button className={styles.backBtn} onClick={() => setSelectedHospital(null)}>← 返回医院列表</button>
                <div style={{ background: 'var(--navy)', borderRadius: 'var(--r)', padding: 36, color: '#fff', marginBottom: 28, display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
                  <div style={{ fontSize: 72 }}>{selectedHospital.icon}</div>
                  <div>
                    <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 6 }}>{selectedHospital.name}</h2>
                    <p style={{ fontSize: 14, color: 'rgba(255,255,255,.72)' }}>📍 {selectedHospital.city} · ✓ {selectedHospital.badge}</p>
                    <p style={{ marginTop: 8, fontSize: 13, color: 'rgba(255,255,255,.72)', lineHeight: 1.7 }}>{selectedHospital.desc}</p>
                  </div>
                </div>
                <div style={{ marginBottom: 28 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--navy)', marginBottom: 14, borderBottom: '1px solid var(--border)', paddingBottom: 8 }}>专家团队</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 16 }}>
                    {selectedHospital.experts.map(e => (
                      <div key={e.name} className="card" style={{ padding: 20, textAlign: 'center' }}>
                        <div style={{ fontSize: 40, marginBottom: 10 }}>{e.avatar}</div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--navy)' }}>{e.name}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-lt)', marginBottom: 6 }}>{e.title}</div>
                        <div style={{ fontSize: 12, color: 'var(--blue)' }}>{e.spec}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ marginBottom: 28 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--navy)', marginBottom: 14, borderBottom: '1px solid var(--border)', paddingBottom: 8 }}>虚拟游览</h3>
                  <div style={{ background: 'var(--bg-alt)', borderRadius: 'var(--r)', padding: 28, textAlign: 'center' }}>
                    <div style={{ fontSize: 64, marginBottom: 12 }}>🎥</div>
                    <p style={{ fontSize: 13, color: 'var(--text-md)', marginBottom: 16 }}>{selectedHospital.tourDesc}</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 16 }}>
                      {selectedHospital.tourRooms.map((r, i) => (
                        <div key={i} style={{ height: 80, borderRadius: 8, background: 'var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32 }}>{r}</div>
                      ))}
                    </div>
                    <button className="btn btn-ghost btn-sm" onClick={() => alert('视频全景游览功能即将上线，敬请期待')}>▶ 观看全景视频</button>
                  </div>
                </div>
                <div className="ai-nudge">
                  <span>想了解如何与这家医院建立联系，或有其他旅行规划问题？</span>
                  <button className="btn btn-primary btn-sm" onClick={() => nav('/ai')}>AI 咨询</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* STORIES */}
      {activeTab === 'stories' && (
        <div className={styles.subPage}>
          <div className="wrap">
            <div className="sec-tag">医疗故事</div>
            <h2 className="sec-title" style={{ marginBottom: 8 }}>真实旅程，真实声音</h2>
            <p className="sec-sub">患者与医生的第一手叙述，了解赴华就医旅程的全貌</p>
            <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
              {[['all', '全部'], ['patient', '患者故事'], ['doctor', '医生故事']].map(([v, l]) => (
                <button key={v} className={`${styles.filterTag} ${storyFilter === v ? styles.active : ''}`} onClick={() => setStoryFilter(v)}>{l}</button>
              ))}
            </div>
            <div className={styles.storiesGrid}>
              {filteredStories.map(s => (
                <div key={s.id} className="card" style={{ overflow: 'hidden' }}>
                  <div style={{ height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48, background: s.bg }}>{s.icon}</div>
                  <div style={{ padding: 22 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 8, color: s.type === 'patient' ? 'var(--teal)' : 'var(--blue)' }}>
                      {s.type === 'patient' ? '🙋 患者故事' : '👨‍⚕️ 医生故事'}
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--navy)', marginBottom: 8, lineHeight: 1.4 }}>{s.title}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-md)', lineHeight: 1.7, marginBottom: 14 }}>{s.excerpt}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-lt)' }}>
                      <span>{s.name} · {s.meta}</span>
                      <span>📅 {s.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
