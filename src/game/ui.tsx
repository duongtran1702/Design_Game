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
