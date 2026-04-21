import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { aiConversations, aiQuickPills } from '../data'
import styles from './AI.module.css'

function matchConv(input) {
  const text = input.toLowerCase()
  for (const c of aiConversations) {
    if (c.trigger === '.*') continue
    if (new RegExp(c.trigger).test(text)) return c
  }
  return aiConversations[aiConversations.length - 1]
}

export default function AI() {
  const nav = useNavigate()
  const [msgs, setMsgs] = useState([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [showTransfer, setShowTransfer] = useState(false)
  const msgsEndRef = useRef(null)

  useEffect(() => {
    setMsgs([{ type: 'bot', text: '您好！我是 Medical Travel to China 的 AI 旅行顾问 🌏\n\n我可以帮您了解**赴华就医旅行**的相关信息，包括签证办理、出行安排、医院信息、语言沟通、费用支付等实际问题。\n\n请注意：我提供的是旅行信息咨询，**不涉及医疗诊断或治疗建议**。有具体的医疗问题，我会引导您咨询专业医生。\n\n有什么想了解的，尽管问我 👇', time: now() }])
  }, [])

  useEffect(() => {
    msgsEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgs, typing])

  function now() {
    return new Date().toLocaleTimeString('zh', { hour: '2-digit', minute: '2-digit' })
  }

  function send(text) {
    const t = (text ?? input).trim()
    if (!t || typing) return
    setInput('')
    setMsgs(m => [...m, { type: 'user', text: t, time: now() }])
    setTyping(true)
    const conv = matchConv(t)
    setTimeout(() => {
      setMsgs(m => [...m, { type: 'bot', text: conv.bot, time: now() }])
      if (conv.transfer) setShowTransfer(true)
      setTyping(false)
    }, 1000 + Math.random() * 600)
  }

  function renderText(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br/>')
  }

  return (
    <div className={styles.page}>
      <div className={styles.layout}>
        <div className={styles.header}>
          <h1>🤖 AI 旅行咨询</h1>
          <p>关于赴华就医旅行的任何问题，免费即时获得解答</p>
        </div>

        <div className={styles.disclaimer}>
          <span>⚠️</span>
          <span>本 AI 提供中国医疗旅行的信息性咨询（签证、出行、流程、医院背景等），<strong>不提供任何医疗诊断或治疗建议</strong>。涉及个人病情的医疗问题请咨询持牌医生。</span>
        </div>

        <div className={styles.chatBox}>
          <div className={styles.msgs}>
            {msgs.map((m, i) => (
              <div key={i} className={`${styles.msg} ${m.type === 'user' ? styles.user : styles.bot}`}>
                {m.type === 'bot' && <div className={styles.avatar}>🤖</div>}
                <div>
                  <div className={styles.bubble} dangerouslySetInnerHTML={{ __html: renderText(m.text) }} />
                  <div className={styles.time}>{m.time}</div>
                </div>
                {m.type === 'user' && <div className={styles.avatar}>👤</div>}
              </div>
            ))}
            {typing && (
              <div className={`${styles.msg} ${styles.bot}`}>
                <div className={styles.avatar}>🤖</div>
                <div className={`${styles.bubble} ${styles.typingBubble}`}>正在输入…</div>
              </div>
            )}
            <div ref={msgsEndRef} />
          </div>

          {showTransfer && (
            <div className={styles.transferBanner}>
              <span>🙋 需要人工顾问介入？我们的团队可以为您提供一对一的定制咨询服务。</span>
              <button className="btn btn-sm" style={{ background: 'var(--gold)', color: '#fff', border: 'none', whiteSpace: 'nowrap' }} onClick={() => nav('/services?tab=contact')}>联系人工顾问</button>
            </div>
          )}

          <div className={styles.inputRow}>
            <input
              className={styles.input}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="例如：赴华就医需要办什么签证？"
            />
            <button className={styles.sendBtn} onClick={() => send()}>发送</button>
          </div>
        </div>

        <div className={styles.quickWrap}>
          <div className={styles.quickTitle}>常见问题快速提问：</div>
          <div className={styles.quickPills}>
            {aiQuickPills.map(p => (
              <button key={p} className={styles.quickPill} onClick={() => send(p)}>{p}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
