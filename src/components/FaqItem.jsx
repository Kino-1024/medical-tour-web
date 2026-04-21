import { useState } from 'react'

export default function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`faq-item ${open ? 'open' : ''}`}>
      <div className="faq-q" onClick={() => setOpen(!open)}>
        <span>{q}</span>
        <span className="faq-arr">▾</span>
      </div>
      <div className="faq-a">{a}</div>
    </div>
  )
}
