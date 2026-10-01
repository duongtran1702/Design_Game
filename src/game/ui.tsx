import type { ReactNode } from 'react'

export function Stars({ n, of = 3 }: { n: number; of?: number }) {
  return <span className="tracking-[0.2em] text-ochre" aria-label={`${n} sao`}>{'★'.repeat(n)}<span className="text-ink/20">{'★'.repeat(of - n)}</span></span>
}

export function Btn({ children, onClick, kind = 'ink', disabled, className = '' }: { children: ReactNode; onClick?: () => void; kind?: 'ink' | 'stamp' | 'ghost' | 'paper'; disabled?: boolean; className?: string }) {
  const k = { ink: 'bg-ink text-paper hover:bg-ink-2', stamp: 'bg-stamp text-paper hover:brightness-110', ghost: 'border border-ink/30 hover:border-ink hover:bg-ink/5', paper: 'bg-paper text-ink hover:bg-white' }[kind]
  return <button disabled={disabled} onClick={onClick} className={`inline-flex items-center gap-3 px-5 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] transition disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stamp ${k} ${className}`}>{children}</button>
}

export function Label({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`font-mono text-[10px] uppercase tracking-[0.22em] ${className}`}>{children}</div>
}

/** Two-tone split shell: ink rail with step ledger + paper work surface */
export function Shell({ mode, title, steps, current, rail, children, onExit }: { mode: string; title: string; steps: string[]; current: number; rail?: ReactNode; children: ReactNode; onExit: () => void }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-[320px_1fr]">
      <header className="lg:hidden sticky top-0 z-30 bg-ink text-paper">
        <div className="flex items-center justify-between px-4 h-14 gap-3">
          <button onClick={onExit} aria-label="Về trang chủ" className="font-display text-lg font-black tracking-tight shrink-0">N<span className="text-stamp">·</span>C</button>
          <div className="min-w-0 flex-1 text-center">
            <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-ochre">{mode} · Bước {String(current + 1).padStart(2, '0')}/{String(steps.length).padStart(2, '0')}</div>
            <div className="text-sm truncate">{steps[current]}</div>
          </div>
          <button onClick={onExit} className="font-mono text-[10px] uppercase tracking-wider text-paper/60 shrink-0">Thoát</button>
        </div>
        <div className="flex gap-0.5 px-4 pb-2">{steps.map((s, i) => <span key={s} className={`h-0.5 flex-1 ${i < current ? 'bg-moss' : i === current ? 'bg-stamp' : 'bg-paper/15'}`} />)}</div>
        {rail && <div className="px-4 pb-3">{rail}</div>}
      </header>
      <aside className="hidden lg:flex bg-ink text-paper p-8 flex-col gap-10 lg:sticky lg:top-0 lg:h-screen overflow-y-auto">
        <button onClick={onExit} className="text-left group">
          <div className="font-display text-2xl font-black tracking-tight">NORMA<span className="text-stamp">·</span>CLASS</div>
          <Label className="text-paper/40 mt-1 group-hover:text-paper/80 transition">← Về trang chủ</Label>
        </button>
        <div>
          <Label className="text-ochre">{mode}</Label>
          <h2 className="font-display text-3xl leading-tight mt-2 italic">{title}</h2>
        </div>
        <ol className="space-y-0 border-t border-paper/15">
          {steps.map((s, i) => (
            <li key={s} className={`flex items-baseline gap-4 py-3 border-b border-paper/15 transition ${i === current ? 'text-paper' : i < current ? 'text-paper/55' : 'text-paper/25'}`}>
              <span className="font-mono text-[11px] w-6">{String(i + 1).padStart(2, '0')}</span>
              <span className="text-sm flex-1">{s}</span>
              {i < current && <span className="text-moss text-xs">✓</span>}
              {i === current && <span className="size-1.5 rounded-full bg-stamp" />}
            </li>
          ))}
        </ol>
        {rail && <div className="mt-auto">{rail}</div>}
      </aside>
      <main className="px-4 py-8 sm:px-6 lg:px-14 lg:py-14 min-w-0 pb-28 lg:pb-14">{children}</main>
    </div>
  )
}

export function Heading({ kicker, title, sub }: { kicker: string; title: ReactNode; sub?: ReactNode }) {
  return (
    <header className="mb-8 lg:mb-10 max-w-3xl rise">
      <Label className="text-stamp">{kicker}</Label>
      <h1 className="font-display text-[2rem] sm:text-4xl lg:text-5xl font-bold leading-[1.05] mt-3 tracking-tight">{title}</h1>
      {sub && <p className="mt-4 text-ink/65 leading-relaxed">{sub}</p>}
    </header>
  )
}
