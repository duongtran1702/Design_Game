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
      {[0.25, 0.5, 0.75, 1].map((k) => <polygon key={k} points={poly(() => R * k)} fill="none" stroke="#14251f" strokeOpacity={k === 1 ? 0.5 : 0.12} />)}
      {[0, 1, 2].map((i) => { const [x, y] = pt(i, R); return <line key={i} x1={c} y1={c} x2={x} y2={y} stroke="#14251f" strokeOpacity=".15" /> })}
      <polygon points={poly((i) => (R * v[i]) / 100)} fill="#c8361f" fillOpacity=".18" stroke="#c8361f" strokeWidth="2" className="transition-all duration-700" />
      {[0, 1, 2].map((i) => { const [x, y] = pt(i, (R * v[i]) / 100); return <circle key={i} cx={x} cy={y} r="4" fill="#c8361f" /> })}
      {[0, 1, 2].map((i) => { const [x, y] = pt(i, R + 24); return <text key={i} x={x} y={y + 4} textAnchor="middle" className="font-mono" fontSize="10" fill="#14251f">{STAT_NAMES[i].toUpperCase()} · {v[i]}</text> })}
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
        <div className="lg:border border-paper/20 lg:p-4 text-sm space-y-1">
          <Label className="hidden lg:block text-paper/50">Lớp đang dạy</Label>
          <div className="hidden lg:block font-display text-lg">{ctx.name}</div>
          <div className="lg:hidden font-mono text-[11px] text-paper/60 truncate">{ctx.name} · {ctx.size} HS · Internet {ctx.internet}</div>
          <div className="hidden lg:block font-mono text-[11px] text-paper/60">{ctx.size} HS · Internet: {ctx.internet} · Điều chỉnh {adjusts}/2</div>
        </div>
      )}>

      {step === 0 && (
        <>
          <Heading kicker="Bước 01 — Bối cảnh" title="Bạn sẽ đứng lớp nào hôm nay?" sub="Mỗi lớp có học sinh và cơ sở vật chất khác nhau — chúng sẽ thay đổi tác động của từng quyết định." />
          <div className="mb-6"><Btn kind="ghost" onClick={() => { setCtx(CONTEXTS[Math.floor(Math.random() * 6)]); setStep(1) }}>⚄ Nhận bối cảnh ngẫu nhiên</Btn></div>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {CONTEXTS.map((c) => (
              <button key={c.id} onClick={() => { setCtx(c); setStep(1) }} className="text-left bg-[#faf8f1] border border-rule hover:border-ink hover:shadow-[6px_6px_0_#14251f] hover:-translate-y-1 transition flex flex-col">
                <div className="flex justify-between px-5 pt-5 font-mono text-[10px] uppercase tracking-widest text-ink/50"><span>{c.id} · {c.level}</span><span>{c.size} HS</span></div>
                <h3 className="font-display text-2xl px-5 mt-3 leading-tight">{c.name}</h3>
                <ul className="px-5 mt-3 space-y-1 text-sm text-ink/70 flex-1">{c.traits.map((t) => <li key={t}>— {t}</li>)}</ul>
                <div className="grid grid-cols-3 border-t border-rule mt-5 font-mono text-[10px] uppercase">
                  {[['Máy chiếu', c.projector ? 'Có' : 'Không'], ['Máy tính', c.pcs], ['Internet', c.internet]].map(([k, v]) => (
                    <div key={k} className="p-3 border-r last:border-r-0 border-rule"><div className="text-ink/40">{k}</div><div className={v === 'Không' ? 'text-stamp' : ''}>{v}</div></div>
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
          <div className="border-t border-rule max-w-4xl">
            {OBJECTIVES.map((o) => { const ok = objAllowed(o); const on = objs.includes(o.id); return (
              <button key={o.id} disabled={!ok || (!on && objs.length >= 3)} onClick={() => setObjs((s) => (on ? s.filter((x) => x !== o.id) : [...s, o.id]))}
                className={`w-full grid grid-cols-[52px_1fr] sm:grid-cols-[52px_1fr_auto] items-center gap-x-3 gap-y-1 py-4 px-3 border-b border-rule text-left transition disabled:opacity-25 disabled:cursor-not-allowed ${on ? 'bg-ink text-paper' : 'hover:bg-paper-2'}`}>
                <span className="font-mono text-xs">{on ? '■' : '□'} {o.id}</span>
                <span>HS {o.text.charAt(0).toLowerCase() + o.text.slice(1)}</span>
                <span className="col-start-2 sm:col-start-auto font-mono text-[10px] uppercase tracking-wider opacity-60">{ok ? o.type : 'Không phù hợp'}</span>
              </button> )})}
          </div>
          <div className="mt-8 flex items-center gap-6"><Btn disabled={!objValid} onClick={() => setStep(2)}>Thiết kế 4 pha →</Btn><span className="font-mono text-xs text-ink/50">{objs.length}/3 đã chọn</span></div>
        </>
      )}

      {(step === 2 || step === 3) && ctx && (
        <>
          <Heading kicker="Bước 03–04 — Kịch bản dạy học" title={<>Pha {ph.n}: <span className="italic font-medium">{ph.name}</span></>} sub={`${ph.purpose} · Thời lượng gợi ý ${ph.time}`} />
          <div className="grid grid-cols-4 mb-8 lg:mb-10 border border-ink sticky top-[6.5rem] lg:static z-10 bg-paper">
            {PHASES.map((p, i) => (
              <button key={p.n} onClick={() => setPhase(i)} className={`p-3 sm:p-4 text-left border-r last:border-r-0 border-ink transition ${i === phase ? 'bg-ink text-paper' : 'hover:bg-paper-2'}`}>
                <div className="flex justify-between font-mono text-[10px]"><span>PHA 0{p.n}</span><span className={complete(plan[i]) ? 'text-moss' : 'opacity-30'}>{complete(plan[i]) ? '✓' : '○'}</span></div>
                <div className="text-sm mt-1 hidden md:block">{p.name}</div>
              </button>
            ))}
          </div>

          <div className="grid xl:grid-cols-[1fr_300px] gap-10">
            <div className="space-y-8 lg:space-y-10">
              <section>
                <Label className="text-ink/50 mb-3">A · Hoạt động cụ thể</Label>
                <div className="grid sm:grid-cols-2 gap-2">
                  {ph.acts.map((a) => { const bad = infeasible(ctx, { act: a.id }, phase).length > 0; return (
                    <button key={a.id} onClick={() => setP('act', a.id)} className={`text-left p-4 border transition ${cur.act === a.id ? 'border-ink bg-ink text-paper' : 'border-rule bg-[#faf8f1] hover:border-ink'}`}>
                      <div className="flex justify-between font-mono text-[10px] opacity-60"><span>{a.id}</span>{bad && <span className="text-stamp opacity-100">KHÔNG KHẢ THI</span>}</div>
                      <div className="font-medium mt-1">{a.name}</div><div className="text-xs opacity-70 mt-1">{a.desc}</div>
                    </button> )})}
                </div>
              </section>
              <section>
                <Label className="text-ink/50 mb-3">B · Hình thức tương tác</Label>
                <div className="grid grid-cols-3 border border-ink">
                  {MODES.map((m) => (
                    <button key={m.id} onClick={() => setP('mode', m.id)} className={`p-3 sm:p-4 border-r last:border-r-0 border-ink text-left transition ${cur.mode === m.id ? 'bg-ink text-paper' : 'hover:bg-paper-2'}`}>
                      <div className="text-stamp tracking-widest text-xs">{m.glyph}</div><div className="font-medium mt-1">{m.label}</div>
                    </button>
                  ))}
                </div>
              </section>
              <section>
                <Label className="text-ink/50 mb-3">C · Quyết định sử dụng AI</Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {AI_LEVELS.map((a) => (
                    <button key={a.lv} onClick={() => { setP('ai', a.lv); setStep(3) }} className={`p-4 text-left border transition ${cur.ai === a.lv ? 'bg-stamp text-paper border-stamp' : 'border-rule bg-[#faf8f1] hover:border-ink'}`}>
                      <div className="font-display text-3xl">{a.lv}</div><div className="font-medium text-sm mt-1">{a.label}</div><div className="text-[11px] opacity-70">{a.short}</div>
                    </button>
                  ))}
                </div>
              </section>
              {warn.length > 0 && <div className="border-l-4 border-stamp bg-stamp/5 p-4 text-sm">⚠ Không khả thi: {warn.join(' · ')}</div>}
              <div className="flex flex-wrap gap-3">
                {phase > 0 && <Btn kind="ghost" onClick={() => setPhase(phase - 1)}>← Pha trước</Btn>}
                {phase < 3 ? <Btn disabled={!complete(cur)} onClick={() => setPhase(phase + 1)}>Pha tiếp theo →</Btn> : <Btn kind="stamp" disabled={!allDone} onClick={() => setStep(4)}>Lên lớp & xem phản ứng →</Btn>}
              </div>
            </div>
            <aside className="border-t-2 border-ink pt-4 text-sm space-y-4">
              <Label>Giáo án tóm tắt</Label>
              {plan.map((p, i) => (
                <div key={i} className="grid grid-cols-[40px_1fr] gap-2 pb-3 border-b border-rule">
                  <span className="font-mono text-xs text-ink/40">0{i + 1}</span>
                  <div className="text-xs space-y-0.5">
                    <div className="font-medium">{PHASES[i].acts.find((a) => a.id === p.act)?.name ?? '—'}</div>
                    <div className="text-ink/60">{MODES.find((m) => m.id === p.mode)?.label ?? '—'} · {p.ai !== undefined ? AI_LEVELS[p.ai].label : '—'}</div>
                  </div>
                </div>
              ))}
              <p className="font-display italic text-ink/60">“Không có lựa chọn nào luôn đúng — tác động phụ thuộc vào pha và bối cảnh.”</p>
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
                <div key={i} className="grid grid-cols-[60px_1fr] sm:grid-cols-[72px_1fr] gap-4 sm:gap-5 items-start border-b border-rule pb-5">
                  <div className="font-display text-4xl sm:text-5xl font-black tabular-nums">{v}</div>
                  <div><Label className="text-ink/50">{STAT_NAMES[i]} · {['Thấp', 'Trung bình', 'Cao'][band(v)]}</Label><p className="mt-1 font-display text-lg italic">“{REACTIONS[i][band(v)]}”</p></div>
                </div>
              ))}
            </div>
          </div>
          <Btn className="mt-10" onClick={() => setStep(5)}>Xem phản hồi từng pha →</Btn>
        </>
      )}

      {step === 5 && ctx && (
        <>
          <Heading kicker="Bước 06 — Phản hồi" title="Nhận xét sau quyết định" />
          {globalNotes.map((n) => <div key={n} className="bg-ink text-paper p-5 mb-4 max-w-4xl">{n}</div>)}
          <div className="grid lg:grid-cols-2 gap-4">
            {plan.map((p, i) => { const f = feedback(ctx, p, i); return (
              <article key={i} className="bg-[#faf8f1] border border-rule">
                <header className="px-5 py-3 border-b border-rule"><span className="font-display text-lg sm:text-xl">Pha {i + 1}: {PHASES[i].name}</span></header>
                <div className="px-5 py-3 font-mono text-[11px] text-ink/60 border-b border-rule">{PHASES[i].acts.find((a) => a.id === p.act)?.name} · {MODES.find((m) => m.id === p.mode)?.label} · AI: {AI_LEVELS[p.ai!].label}</div>
                <ul className="p-5 space-y-2 text-sm">
                  {f.good.map((t) => <li key={t}><span className="text-moss font-semibold">✓ Điểm mạnh: </span>{t}</li>)}
                  {f.warn.map((t) => <li key={t}><span className="text-stamp font-semibold">⚠ Cần cải thiện: </span>{t}</li>)}
                  {f.tip.map((t) => <li key={t}><span className="text-ochre font-semibold">◆ Gợi ý: </span>{t}</li>)}
                </ul>
              </article> )})}
          </div>
          <Btn className="mt-10" onClick={() => setStep(6)}>Tiếp tục →</Btn>
        </>
      )}

      {step === 6 && ctx && score && (
        <div className="max-w-3xl rise">
          <Heading kicker="Bước 07 — Điều chỉnh" title="Giữ giáo án này, hay dạy lại?" sub="Bạn có thể quay lại 4 pha, giữ nguyên bối cảnh và mục tiêu. Tối đa 2 lần điều chỉnh." />
          <div className="border-y-2 border-ink py-6 mb-8">
            {score.parts.map(([k, v, m]) => (
              <div key={k} className="grid grid-cols-[1fr_64px_44px] sm:grid-cols-[1fr_120px_60px] items-center gap-3 sm:gap-4 py-2">
                <span className="text-sm">{k}</span><div className="h-1.5 bg-ink/10"><div className="h-full bg-ink" style={{ width: `${(v / m) * 100}%` }} /></div><span className="font-mono text-xs text-right">{v}/{m}</span>
              </div>
            ))}
            <div className="flex justify-between items-baseline pt-4 mt-2 border-t border-rule"><Label>Tổng điểm dự kiến</Label><span className="font-display text-5xl font-black">{score.total}</span></div>
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
