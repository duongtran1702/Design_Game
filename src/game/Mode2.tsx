import { useState } from 'react'
import { AI_LEVELS, CONTEXTS, MODES, OBJECTIVES, PHASES, REACTIONS, STAT_NAMES, band, computeStats, feedback, infeasible, scoreMode2, type Ctx, type PhaseChoice } from './data'
import { Btn, Heading, Label, Shell } from './ui'

export type Cert2 = { ctx: string; score: number; stats: number[]; adjusts: number }
const STEPS = ['Bối cảnh lớp học', 'Mục tiêu bài học', 'Thiết kế 4 pha', 'Quyết định dùng AI', 'Phản ứng học sinh', 'Phản hồi sau quyết định', 'Điều chỉnh – chơi lại', 'Hoàn thành hành trình']

function Radar({ v }: { v: number[] }) {
  const c = 150, R = 110
  const pt = (i: number, r: number) => { const a = -Math.PI / 2 + (i * 2 * Math.PI) / 3; return [c + Math.cos(a) * r, c + Math.sin(a) * r] }
  const poly = (r: (i: number) => number) => [0, 1, 2].map((i) => pt(i, r(i)).join(',')).join(' ')
  return (
    <svg viewBox="0 0 300 300" className="w-full max-w-sm">
      {[0.25, 0.5, 0.75, 1].map((k) => <polygon key={k} points={poly(() => R * k)} fill="none" stroke="#1a3399" strokeOpacity={k === 1 ? 0.45 : 0.15} strokeWidth={k === 1 ? '1.5' : '1'} />)}
      {[0, 1, 2].map((i) => { const [x, y] = pt(i, R); return <line key={i} x1={c} y1={c} x2={x} y2={y} stroke="#1a3399" strokeOpacity=".2" strokeWidth="1" /> })}
      <polygon points={poly((i) => (R * v[i]) / 100)} fill="#b366d4" fillOpacity=".22" stroke="#b366d4" strokeWidth="2.5" className="transition-all duration-700" />
      {[0, 1, 2].map((i) => { const [x, y] = pt(i, (R * v[i]) / 100); return <circle key={i} cx={x} cy={y} r="5" fill="#1a3399" stroke="#ffffff" strokeWidth="2" /> })}
      {[0, 1, 2].map((i) => { const [x, y] = pt(i, R + 24); return <text key={i} x={x} y={y + 4} textAnchor="middle" className="font-mono font-bold" fontSize="10" fill="#0a0a0a">{STAT_NAMES[i].toUpperCase()} · {v[i]}</text> })}
    </svg>
  )
}

export default function Mode2({ onExit, onDone }: { onExit: () => void; onDone: (c: Cert2) => void }) {
  const [step, setStep] = useState(0)
  const [ctx, setCtx] = useState<Ctx | null>(null)
  const [objs, setObjs] = useState<string[]>([])
  const [plan, setPlan] = useState<PhaseChoice[]>([{}, {}, {}, {}])
  const [phase, setPhase] = useState(0)
  const [adjusts, setAdjusts] = useState(0)

  const setP = (k: keyof PhaseChoice, v: string | number) => setPlan((p) => p.map((x, i) => (i === phase ? { ...x, [k]: v } : x)))
  const complete = (p: PhaseChoice) => p.act && p.mode && p.ai !== undefined
  const allDone = plan.every(complete)

  const objAllowed = (o: (typeof OBJECTIVES)[number]) => (o.ctx === 'all' || o.ctx.includes(ctx!.id)) && !(o.type === 'Năng lực số' && ctx!.internet === 'Không')
  const objValid = objs.length >= 2 && objs.length <= 3 && objs.some((id) => ['Kiến thức', 'Kỹ năng'].includes(OBJECTIVES.find((o) => o.id === id)!.type))

  const stats = ctx && allDone ? computeStats(ctx, plan) : [50, 50, 50]
  const score = ctx && allDone ? scoreMode2(ctx, plan, stats) : null

  const globalNotes: string[] = []
  if (allDone) {
    if (plan.every((p) => p.ai === 2)) globalNotes.push('⚠ Lạm dụng AI gợi ý khiến HS phụ thuộc. Nên để HS tự lực ở ít nhất 1–2 pha.')
    if (plan.every((p) => p.ai === 0)) globalNotes.push('💡 HS phát triển tư duy tốt nhưng thiếu tiếp cận công nghệ. Cân nhắc Tra cứu ở Pha 2, Phản biện ở Pha 4.')
    if (plan.every((p) => p.mode === 'solo')) globalNotes.push('⚠ Kết nối xã hội rất thấp. Chuyển ít nhất 1 pha sang Cặp đôi hoặc Nhóm.')
  }

  const ph = PHASES[phase]
  const cur = plan[phase]
  const warn = ctx ? infeasible(ctx, cur, phase) : []

  return (
    <Shell mode="Chế độ 02" title="Mô Phỏng Lớp Học" steps={STEPS} current={step} onExit={onExit}
      rail={ctx && (
        <div className="lg:border-2 border-navy lg:p-4 text-sm space-y-1 bg-white shadow-sm">
          <Label className="hidden lg:block text-ink/60 font-semibold">Lớp đang dạy</Label>
          <div className="hidden lg:block font-display text-lg text-ink font-bold">{ctx.name}</div>
          <div className="lg:hidden font-mono text-[11px] text-ink/70 truncate">{ctx.name} · {ctx.size} HS · Internet {ctx.internet}</div>
          <div className="hidden lg:block font-mono text-[11px] text-ink/60">{ctx.size} HS · Internet: {ctx.internet} · Điều chỉnh {adjusts}/2</div>
        </div>
      )}>

      {step === 0 && (
        <>
          <Heading kicker="Bước 01 — Bối cảnh" title="Bạn sẽ đứng lớp nào hôm nay?" sub="Mỗi lớp có học sinh và cơ sở vật chất khác nhau — chúng sẽ thay đổi tác động của từng quyết định." />
          <div className="mb-6"><Btn kind="ghost" onClick={() => { setCtx(CONTEXTS[Math.floor(Math.random() * 6)]); setStep(1) }}>⚄ Nhận bối cảnh ngẫu nhiên</Btn></div>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {CONTEXTS.map((c) => (
              <button key={c.id} onClick={() => { setCtx(c); setStep(1) }} className="text-left bg-white border-2 border-navy hover:shadow-[6px_6px_0_#1a3399] hover:-translate-y-1 transition flex flex-col shadow-xs">
                <div className="flex justify-between px-5 pt-5 font-mono text-[10px] uppercase tracking-widest text-purple font-bold"><span>{c.id} · {c.level}</span><span>{c.size} HS</span></div>
                <h3 className="font-display text-2xl px-5 mt-3 leading-tight text-ink font-bold">{c.name}</h3>
                <ul className="px-5 mt-3 space-y-1 text-sm text-ink/80 flex-1">{c.traits.map((t) => <li key={t}>— {t}</li>)}</ul>
                <div className="grid grid-cols-3 border-t-2 border-navy/20 mt-5 font-mono text-[10px] uppercase">
                  {[['Máy chiếu', c.projector ? 'Có' : 'Không'], ['Máy tính', c.pcs], ['Internet', c.internet]].map(([k, v]) => (
                    <div key={k} className="p-3 border-r last:border-r-0 border-navy/20"><div className="text-ink/60">{k}</div><div className={v === 'Không' ? 'text-stamp font-bold' : 'text-navy font-bold'}>{v}</div></div>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </>
      )}

      {step === 1 && ctx && (
        <>
          <Heading kicker="Bước 02 — Mục tiêu" title="Chọn 2–3 mục tiêu bài học" sub="Cần ít nhất một mục tiêu Kiến thức hoặc Kỹ năng. Mục tiêu không phù hợp bối cảnh bị khoá." />
          <div className="border-t-2 border-navy max-w-4xl bg-white">
            {OBJECTIVES.map((o) => { const ok = objAllowed(o); const on = objs.includes(o.id); return (
              <button key={o.id} disabled={!ok || (!on && objs.length >= 3)} onClick={() => setObjs((s) => (on ? s.filter((x) => x !== o.id) : [...s, o.id]))}
                className={`w-full grid grid-cols-[52px_1fr] sm:grid-cols-[52px_1fr_auto] items-center gap-x-3 gap-y-1 py-4 px-3 border-b-2 border-navy/20 text-left transition disabled:opacity-25 disabled:cursor-not-allowed ${on ? 'bg-navy text-white border-navy font-semibold shadow-sm' : 'hover:bg-purple-soft/20 text-ink'}`}>
                <span className={`font-mono text-xs ${on ? 'text-purple-light' : 'text-navy font-bold'}`}>{on ? '■' : '□'} {o.id}</span>
                <span>HS {o.text.charAt(0).toLowerCase() + o.text.slice(1)}</span>
                <span className={`col-start-2 sm:col-start-auto font-mono text-[10px] uppercase tracking-wider ${on ? 'text-purple-light font-bold' : 'text-purple font-bold'}`}>{ok ? o.type : 'Không phù hợp'}</span>
              </button> )})}
          </div>
          <div className="mt-8 flex items-center gap-6"><Btn kind="navy" disabled={!objValid} onClick={() => setStep(2)}>Thiết kế 4 pha →</Btn><span className="font-mono text-xs text-ink/60 font-semibold">{objs.length}/3 đã chọn</span></div>
        </>
      )}

      {(step === 2 || step === 3) && ctx && (
        <>
          <Heading kicker="Bước 03–04 — Kịch bản dạy học" title={<>Pha {ph.n}: <span className="italic font-medium">{ph.name}</span></>} sub={`${ph.purpose} · Thời lượng gợi ý ${ph.time}`} />
          <div className="grid grid-cols-4 mb-8 lg:mb-10 border-2 border-navy sticky top-[6.5rem] lg:static z-10 bg-white shadow-sm">
            {PHASES.map((p, i) => (
              <button key={p.n} onClick={() => setPhase(i)} className={`p-3 sm:p-4 text-left border-r-2 last:border-r-0 border-navy transition ${i === phase ? 'bg-navy text-white shadow-inner font-semibold' : 'hover:bg-purple-soft/20 text-ink'}`}>
                <div className="flex justify-between font-mono text-[10px]"><span>PHA 0{p.n}</span><span className={complete(plan[i]) ? (i === phase ? 'text-purple-light font-bold' : 'text-purple font-bold') : 'opacity-40'}>{complete(plan[i]) ? '✓' : '○'}</span></div>
                <div className="text-sm mt-1 hidden md:block">{p.name}</div>
              </button>
            ))}
          </div>

          <div className="grid xl:grid-cols-[1fr_300px] gap-10">
            <div className="space-y-8 lg:space-y-10">
              <section>
                <Label className="text-navy font-bold mb-3">A · Hoạt động cụ thể</Label>
                <div className="grid sm:grid-cols-2 gap-2">
                  {ph.acts.map((a) => { const bad = infeasible(ctx, { act: a.id }, phase).length > 0; return (
                    <button key={a.id} onClick={() => setP('act', a.id)} className={`text-left p-4 border-2 transition ${cur.act === a.id ? 'border-navy bg-navy text-white shadow-sm font-medium' : 'border-navy/40 bg-white hover:border-navy text-ink'}`}>
                      <div className="flex justify-between font-mono text-[10px] opacity-75"><span>{a.id}</span>{bad && <span className="text-stamp font-bold opacity-100">KHÔNG KHẢ THI</span>}</div>
                      <div className="font-semibold mt-1">{a.name}</div><div className={`text-xs mt-1 ${cur.act === a.id ? 'text-white/80' : 'text-ink/70'}`}>{a.desc}</div>
                    </button> )})}
                </div>
              </section>
              <section>
                <Label className="text-navy font-bold mb-3">B · Hình thức tương tác</Label>
                <div className="grid grid-cols-3 border-2 border-navy bg-white shadow-sm">
                  {MODES.map((m) => (
                    <button key={m.id} onClick={() => setP('mode', m.id)} className={`p-3 sm:p-4 border-r-2 last:border-r-0 border-navy text-left transition ${cur.mode === m.id ? 'bg-navy text-white font-medium' : 'hover:bg-purple-soft/20 text-ink'}`}>
                      <div className={`${cur.mode === m.id ? 'text-purple-light' : 'text-purple'} tracking-widest text-xs font-bold`}>{m.glyph}</div><div className="font-semibold mt-1">{m.label}</div>
                    </button>
                  ))}
                </div>
              </section>
              <section>
                <Label className="text-navy font-bold mb-3">C · Quyết định sử dụng AI</Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {AI_LEVELS.map((a) => (
                    <button key={a.lv} onClick={() => { setP('ai', a.lv); setStep(3) }} className={`p-4 text-left border-2 transition ${cur.ai === a.lv ? 'bg-navy text-white border-navy ring-2 ring-purple-light shadow-sm' : 'border-navy/40 bg-white hover:border-navy text-ink'}`}>
                      <div className={`font-display text-3xl font-bold ${cur.ai === a.lv ? 'text-purple-light' : 'text-navy'}`}>{a.lv}</div><div className="font-semibold text-sm mt-1">{a.label}</div><div className={`text-[11px] ${cur.ai === a.lv ? 'text-white/80' : 'text-ink/70'}`}>{a.short}</div>
                    </button>
                  ))}
                </div>
              </section>
              {warn.length > 0 && <div className="border-l-4 border-stamp bg-stamp/10 p-4 text-sm text-ink">⚠ Không khả thi: {warn.join(' · ')}</div>}
              <div className="flex flex-wrap gap-3">
                {phase > 0 && <Btn kind="ghost" onClick={() => setPhase(phase - 1)}>← Pha trước</Btn>}
                {phase < 3 ? <Btn kind="navy" disabled={!complete(cur)} onClick={() => setPhase(phase + 1)}>Pha tiếp theo →</Btn> : <Btn kind="stamp" disabled={!allDone} onClick={() => setStep(4)}>Lên lớp & xem phản ứng →</Btn>}
              </div>
            </div>
            <aside className="border-t-2 lg:border-t-0 lg:border-l-2 border-navy lg:pl-6 pt-4 lg:pt-0 text-sm space-y-4">
              <Label className="text-navy font-bold">Giáo án tóm tắt</Label>
              {plan.map((p, i) => (
                <div key={i} className="grid grid-cols-[40px_1fr] gap-2 pb-3 border-b-2 border-navy/20">
                  <span className="font-mono text-xs text-purple font-bold">0{i + 1}</span>
                  <div className="text-xs space-y-0.5">
                    <div className="font-bold text-ink">{PHASES[i].acts.find((a) => a.id === p.act)?.name ?? '—'}</div>
                    <div className="text-ink/70 font-medium">{MODES.find((m) => m.id === p.mode)?.label ?? '—'} · {p.ai !== undefined ? AI_LEVELS[p.ai].label : '—'}</div>
                  </div>
                </div>
              ))}
              <p className="font-display italic text-navy/70">“Không có lựa chọn nào luôn đúng — tác động phụ thuộc vào pha và bối cảnh.”</p>
            </aside>
          </div>
        </>
      )}

      {step === 4 && ctx && (
        <>
          <Heading kicker="Bước 05 — Phản ứng học sinh" title="Lớp học đã phản ứng thế nào?" />
          <div className="grid xl:grid-cols-[minmax(0,380px)_1fr] gap-8 xl:gap-12 items-center justify-items-center xl:justify-items-stretch">
            <Radar v={stats} />
            <div className="space-y-6 w-full">
              {stats.map((v, i) => (
                <div key={i} className="grid grid-cols-[60px_1fr] sm:grid-cols-[72px_1fr] gap-4 sm:gap-5 items-start border-b-2 border-navy/20 pb-5">
                  <div className="font-display text-4xl sm:text-5xl font-black tabular-nums text-navy">{v}</div>
                  <div><Label className="text-purple font-bold">{STAT_NAMES[i]} · {['Thấp', 'Trung bình', 'Cao'][band(v)]}</Label><p className="mt-1 font-display text-lg italic text-ink">“{REACTIONS[i][band(v)]}”</p></div>
                </div>
              ))}
            </div>
          </div>
          <Btn kind="navy" className="mt-10" onClick={() => setStep(5)}>Xem phản hồi từng pha →</Btn>
        </>
      )}

      {step === 5 && ctx && (
        <>
          <Heading kicker="Bước 06 — Phản hồi" title="Nhận xét sau quyết định" />
          {globalNotes.map((n) => <div key={n} className="bg-navy text-white p-5 mb-4 max-w-4xl border-l-4 border-purple-light shadow-sm font-medium">{n}</div>)}
          <div className="grid lg:grid-cols-2 gap-4">
            {plan.map((p, i) => { const f = feedback(ctx, p, i); return (
              <article key={i} className="bg-white border-2 border-navy shadow-sm">
                <header className="px-5 py-3 border-b-2 border-navy bg-purple-soft/20"><span className="font-display text-lg sm:text-xl font-bold text-navy">Pha {i + 1}: {PHASES[i].name}</span></header>
                <div className="px-5 py-3 font-mono text-[11px] text-ink/70 border-b border-navy/20 font-medium">{PHASES[i].acts.find((a) => a.id === p.act)?.name} · {MODES.find((m) => m.id === p.mode)?.label} · AI: {AI_LEVELS[p.ai!].label}</div>
                <ul className="p-5 space-y-2 text-sm text-ink">
                  {f.good.map((t) => <li key={t}><span className="text-purple font-bold">✓ Điểm mạnh: </span>{t}</li>)}
                  {f.warn.map((t) => <li key={t}><span className="text-stamp font-bold">⚠ Cần cải thiện: </span>{t}</li>)}
                  {f.tip.map((t) => <li key={t}><span className="text-ochre font-bold">◆ Gợi ý: </span>{t}</li>)}
                </ul>
              </article> )})}
          </div>
          <Btn kind="navy" className="mt-10" onClick={() => setStep(6)}>Tiếp tục →</Btn>
        </>
      )}

      {step === 6 && ctx && score && (
        <div className="max-w-3xl rise">
          <Heading kicker="Bước 07 — Điều chỉnh" title="Giữ giáo án này, hay dạy lại?" sub="Bạn có thể quay lại 4 pha, giữ nguyên bối cảnh và mục tiêu. Tối đa 2 lần điều chỉnh." />
          <div className="border-y-2 border-navy py-6 mb-8 bg-purple-soft/10 px-4">
            {score.parts.map(([k, v, m]) => (
              <div key={k} className="grid grid-cols-[1fr_64px_44px] sm:grid-cols-[1fr_120px_60px] items-center gap-3 sm:gap-4 py-2">
                <span className="text-sm text-ink font-medium">{k}</span>
                <div className="h-2 bg-purple-soft/40 rounded-full overflow-hidden border border-navy/20"><div className="h-full bg-navy" style={{ width: `${(v / m) * 100}%` }} /></div>
                <span className="font-mono text-xs text-right text-navy font-bold">{v}/{m}</span>
              </div>
            ))}
            <div className="flex justify-between items-baseline pt-4 mt-2 border-t-2 border-navy/20"><Label className="text-navy font-bold">Tổng điểm dự kiến</Label><span className="font-display text-5xl font-black text-navy">{score.total}</span></div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Btn kind="ghost" disabled={adjusts >= 2} onClick={() => { setAdjusts(adjusts + 1); setPhase(0); setStep(2) }}>↺ Điều chỉnh ({2 - adjusts} lần còn lại)</Btn>
            <Btn kind="stamp" onClick={() => { setStep(7); onDone({ ctx: ctx.name, score: score.total, stats, adjusts }) }}>Hoàn thành hành trình →</Btn>
          </div>
        </div>
      )}
    </Shell>
  )
}
