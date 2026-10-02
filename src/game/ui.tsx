import type { ReactNode } from 'react'

export function Stars({ n, of = 3 }: { n: number; of?: number }) {
  return <span className="tracking-[0.2em] text-ochre" aria-label={`${n} sao`}>{'★'.repeat(n)}<span className="text-navy/20">{'★'.repeat(of - n)}</span></span>
}

export function Btn({ children, onClick, kind = 'ink', disabled, className = '' }: { children: ReactNode; onClick?: () => void; kind?: 'ink' | 'stamp' | 'ghost' | 'paper' | 'navy'; disabled?: boolean; className?: string }) {
  const k = {
    navy: 'bg-navy text-white hover:bg-navy-dark shadow-sm hover:shadow-[3px_3px_0_#b366d4]',
    ink: 'bg-navy text-white hover:bg-navy-dark shadow-sm hover:shadow-[3px_3px_0_#b366d4]',
    stamp: 'bg-stamp text-white hover:brightness-110 shadow-sm',
    ghost: 'border-2 border-navy text-navy hover:bg-purple-soft/25',
    paper: 'bg-white text-ink border-2 border-navy hover:bg-purple-light/20 shadow-sm'
  }[kind]
  return <button disabled={disabled} onClick={onClick} className={`inline-flex items-center gap-3 px-5 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] transition disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy ${k} ${className}`}>{children}</button>
}

export function Label({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`font-mono text-[10px] uppercase tracking-[0.22em] ${className}`}>{children}</div>
}

/** Two-tone shell: white paper rail with navy border + white work surface + purple accents */
export function Shell({ mode, title, steps, current, rail, children, onExit }: { mode: string; title: string; steps: string[]; current: number; rail?: ReactNode; children: ReactNode; onExit: () => void }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-[320px_1fr] bg-white">
      <header className="lg:hidden sticky top-0 z-30 bg-white border-b-2 border-navy text-ink shadow-sm">
        <div className="flex items-center justify-between px-4 h-14 gap-3">
          <button onClick={onExit} aria-label="Về trang chủ" className="font-display text-lg font-black tracking-tight shrink-0 text-navy">N<span className="text-stamp">·</span>C</button>
          <div className="min-w-0 flex-1 text-center">
            <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-purple font-semibold">{mode} · Bước {String(current + 1).padStart(2, '0')}/{String(steps.length).padStart(2, '0')}</div>
            <div className="text-sm truncate font-medium text-ink">{steps[current]}</div>
          </div>
          <button onClick={onExit} className="font-mono text-[10px] uppercase tracking-wider text-navy/70 hover:text-navy shrink-0 font-medium">Thoát</button>
        </div>
        <div className="flex gap-0.5 px-4 pb-2">
          {steps.map((s, i) => (
            <span key={s} className={`h-1 flex-1 rounded-full transition-all ${i < current ? 'bg-purple' : i === current ? 'bg-navy' : 'bg-purple-soft/50'}`} />
          ))}
        </div>
        {rail && <div className="px-4 pb-3 border-t border-rule bg-paper-2">{rail}</div>}
      </header>
      <aside className="hidden lg:flex bg-white text-ink p-8 flex-col gap-8 lg:sticky lg:top-0 lg:h-screen overflow-y-auto border-r-2 border-navy shadow-[4px_0_12px_rgba(26,51,153,0.04)] relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-soft/30 to-transparent pointer-events-none" />
        <button onClick={onExit} className="text-left group relative">
          <div className="font-display text-2xl font-black tracking-tight text-ink">NORMA<span className="text-stamp">·</span><span className="text-navy">CLASS</span></div>
          <Label className="text-navy/60 mt-1 group-hover:text-navy transition font-medium">← Về trang chủ</Label>
        </button>
        <div>
          <span className="inline-block px-2.5 py-1 bg-purple-light/30 border border-purple/40 text-navy font-mono text-[10px] uppercase tracking-wider font-semibold rounded-sm">{mode}</span>
          <h2 className="font-display text-3xl leading-tight mt-3 italic text-ink">{title}</h2>
        </div>
        <ol className="space-y-1.5 border-t-2 border-navy/20 pt-4">
          {steps.map((s, i) => {
            const isDone = i < current
            const isCurrent = i === current
            return (
              <li
                key={s}
                className={`flex items-baseline gap-3 px-3 py-2.5 rounded-sm transition ${
                  isCurrent
                    ? 'bg-navy text-white shadow-sm'
                    : isDone
                    ? 'text-ink/80 hover:bg-purple-soft/20'
                    : 'text-ink/35'
                }`}
              >
                <span className={`font-mono text-[11px] w-6 ${isCurrent ? 'text-purple-light' : 'opacity-60'}`}>{String(i + 1).padStart(2, '0')}</span>
                <span className="text-sm flex-1 font-medium">{s}</span>
                {isDone && <span className="text-purple font-bold text-xs">✓</span>}
                {isCurrent && <span className="size-2 rounded-full bg-purple-light animate-pulse" />}
              </li>
            )
          })}
        </ol>
        {rail && <div className="mt-auto pt-4 border-t-2 border-navy/15">{rail}</div>}
      </aside>
      <main className="px-4 py-8 sm:px-6 lg:px-14 lg:py-14 min-w-0 pb-28 lg:pb-14 bg-white">{children}</main>
    </div>
  )
}

export function Heading({ kicker, title, sub }: { kicker: string; title: ReactNode; sub?: ReactNode }) {
  return (
    <header className="mb-8 lg:mb-10 max-w-3xl rise">
      <Label className="text-purple font-bold">{kicker}</Label>
      <h1 className="font-display text-[2rem] sm:text-4xl lg:text-5xl font-bold leading-[1.05] mt-3 tracking-tight text-ink">{title}</h1>
      {sub && <p className="mt-4 text-ink/75 leading-relaxed font-normal">{sub}</p>}
    </header>
  )
}

/** Lightweight Canvas Confetti for high-score celebration */
export function Confetti() {
  return (
    <canvas
      className="fixed inset-0 pointer-events-none z-50 w-full h-full"
      ref={(canvas) => {
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        const colors = ['#1a3399', '#b366d4', '#e2b0ff', '#d9961a', '#c8361f']
        const pieces = Array.from({ length: 80 }, () => ({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * -0.5,
          w: Math.random() * 9 + 6,
          h: Math.random() * 6 + 4,
          color: colors[Math.floor(Math.random() * colors.length)],
          vx: (Math.random() - 0.5) * 4,
          vy: Math.random() * 3 + 2,
          rot: Math.random() * 360,
          rotSpeed: (Math.random() - 0.5) * 8,
          opacity: 1,
        }))

        let animId: number
        let frame = 0
        const render = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          pieces.forEach((p) => {
            p.x += p.vx
            p.y += p.vy
            p.rot += p.rotSpeed
            if (frame > 120) p.opacity -= 0.008
            ctx.save()
            ctx.globalAlpha = Math.max(0, p.opacity)
            ctx.translate(p.x, p.y)
            ctx.rotate((p.rot * Math.PI) / 180)
            ctx.fillStyle = p.color
            ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
            ctx.restore()
          })
          frame++
          if (frame < 220) {
            animId = requestAnimationFrame(render)
          }
        }
        animId = requestAnimationFrame(render)
      }}
    />
  )
}

/** Modal dialog with navy borders and paper background */
export function Modal({ isOpen, onClose, title, sub, icon, children }: { isOpen: boolean; onClose?: () => void; title: ReactNode; sub?: string; icon?: string; children: ReactNode }) {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white border-2 border-navy max-w-xl w-full p-6 sm:p-8 shadow-[10px_10px_0_#1a3399] relative rise max-h-[90vh] overflow-y-auto">
        <div className="flex items-start gap-4 mb-5 border-b-2 border-navy/20 pb-4">
          {icon && <span className="text-4xl shrink-0 p-2 bg-purple-soft/30 border border-purple/30 rounded-xs">{icon}</span>}
          <div className="flex-1 min-w-0">
            {sub && <Label className="text-purple font-bold mb-1">{sub}</Label>}
            <h2 className="font-display text-2xl font-bold text-ink leading-tight">{title}</h2>
          </div>
          {onClose && (
            <button onClick={onClose} className="text-ink/40 hover:text-stamp font-mono text-lg font-bold p-1">✕</button>
          )}
        </div>
        {children}
      </div>
    </div>
  )
}

/** Badge item chip display */
export function BadgeChip({ badge }: { badge: { id: string; name: string; desc: string; icon: string; rarity: string } }) {
  const border = {
    gold: 'border-ochre bg-ochre/10 text-ink',
    silver: 'border-navy/40 bg-purple-soft/20 text-ink',
    purple: 'border-purple bg-purple-light/20 text-ink',
    blue: 'border-navy bg-navy/10 text-ink',
  }[badge.rarity] || 'border-navy'

  return (
    <div className={`p-3 border-2 ${border} flex items-start gap-3 shadow-xs group transition hover:-translate-y-0.5`}>
      <span className="text-2xl shrink-0">{badge.icon}</span>
      <div>
        <div className="font-bold text-sm text-ink group-hover:text-navy transition">{badge.name}</div>
        <div className="text-xs text-ink/75 mt-0.5 leading-snug">{badge.desc}</div>
      </div>
    </div>
  )
}

