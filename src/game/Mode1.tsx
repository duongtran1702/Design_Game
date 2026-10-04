import { useEffect, useMemo, useState } from 'react'
import {
  DOCS,
  MODELS,
  M1_EVENTS,
  M1_DILEMMAS,
  vnd,
  saveLeaderboard,
  type Doc,
  type Model,
  type GameEvent,
  type DilemmaCard,
} from './data'
import { Btn, Heading, Label, Modal, Shell, Stars } from './ui'

export type Cert1 = {
  model: string
  score: number
  attempts: number
  left: number
  minutes: number
  badges: string[]
  dilemmaChoice?: { title: string; choiceText: string; isEthical: boolean }
  eventChoice?: { title: string; choiceText: string }
}

const STEPS = ['Chọn mô hình hoạt động', 'Nhận ngân sách ban đầu', 'Khay Công Cụ Pháp Lý', 'Kéo – thả hồ sơ', 'Kiểm tra tính hợp lệ', 'Thanh tra mô phỏng']
const TYPES = ['Tất cả', ...Array.from(new Set(DOCS.map((d) => d.type)))]

export default function Mode1({ onExit, onDone, playerName = 'Người chơi' }: { onExit: () => void; onDone: (c: Cert1) => void; playerName?: string }) {
  const [step, setStep] = useState(0)
  const [model, setModel] = useState<Model | null>(null)
  const [picked, setPicked] = useState<string[]>([])
  const [attempts, setAttempts] = useState(0)
  const [filter, setFilter] = useState('Tất cả')
  const [over, setOver] = useState(false)
  const [start] = useState(() => Date.now())
  const [now, setNow] = useState(Date.now())
  const [result, setResult] = useState<null | { ok: boolean; missing: string[]; overBudget: boolean }>(null)

  // 🔀 1. Randomized document order
  const [shuffledDocs, setShuffledDocs] = useState<Doc[]>(() => [...DOCS])

  // ⚡ 2. Random Event state
  const [activeEvent, setActiveEvent] = useState<GameEvent | null>(null)
  const [eventChoice, setEventChoice] = useState<{ title: string; choiceText: string } | null>(null)
  const [eventBonusBudget, setEventBonusBudget] = useState(0)
  const [eventBonusScore, setEventBonusScore] = useState(0)

  // ⚖️ 3. Dilemma Card state
  const [activeDilemma, setActiveDilemma] = useState<DilemmaCard | null>(null)
  const [dilemmaChoice, setDilemmaChoice] = useState<{ title: string; choiceText: string; isEthical: boolean } | null>(null)
  const [dilemmaBonusBudget, setDilemmaBonusBudget] = useState(0)
  const [dilemmaBonusScore, setDilemmaBonusScore] = useState(0)
  const [dilemmaTriggered, setDilemmaTriggered] = useState(false)

  // 🎨 4. Toast notification for action feedback
  const [toast, setToast] = useState<{ text: string; isTrap?: boolean } | null>(null)

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])

  // Shuffle docs when selecting a model
  const chooseModel = (m: Model) => {
    setModel(m)
    const arr = [...DOCS]
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]
    }
    setShuffledDocs(arr)
    setPicked([])
    setAttempts(0)
    setEventBonusBudget(0)
    setEventBonusScore(0)
    setDilemmaBonusBudget(0)
    setDilemmaBonusScore(0)
    setEventChoice(null)
    setDilemmaChoice(null)
    setDilemmaTriggered(false)
    setStep(1)
  }

  const spent = useMemo(() => picked.reduce((s, id) => s + DOCS.find((d) => d.id === id)!.cost, 0), [picked])
  const baseBudget = model?.budget ?? 0
  const budget = baseBudget + eventBonusBudget + dilemmaBonusBudget
  const left = budget - spent
  const elapsed = Math.floor((now - start) / 1000)

  const showToast = (text: string, isTrap = false) => {
    setToast({ text, isTrap })
    setTimeout(() => setToast(null), 2400)
  }

  const add = (id: string) => {
    if (!picked.includes(id)) {
      setPicked((p) => [...p, id])
      const d = DOCS.find((x) => x.id === id)
      if (d) {
        const isDecoy = id >= 'D23'
        showToast(isDecoy ? `⚠️ Đã thêm: ${d.name} (Lưu ý thẩm quyền)` : `✓ Đã thêm: ${d.name}`, isDecoy)
      }
    }
  }
  const remove = (id: string) => {
    setPicked((p) => p.filter((x) => x !== id))
    const d = DOCS.find((x) => x.id === id)
    if (d) showToast(`✕ Đã bỏ: ${d.name}`)
  }

  // Trigger event when entering Step 2
  const goToLegalToolkit = () => {
    setStep(2)
    if (!eventChoice && !activeEvent) {
      const ev = M1_EVENTS[Math.floor(Math.random() * M1_EVENTS.length)]
      setActiveEvent(ev)
    }
  }

  const handleEventSelect = (optIndex: number) => {
    if (!activeEvent) return
    const opt = activeEvent.options[optIndex]
    if (opt.deltaBudget) setEventBonusBudget((b) => b + opt.deltaBudget!)
    if (opt.deltaScore) setEventBonusScore((s) => s + opt.deltaScore!)
    setEventChoice({ title: activeEvent.title, choiceText: opt.label })
    setActiveEvent(null)
  }

  // Trigger Dilemma before final submission if not yet triggered
  const handleDilemmaSelect = (optIndex: number) => {
    if (!activeDilemma) return
    const opt = activeDilemma.options[optIndex]
    if (opt.budgetDelta !== undefined) setDilemmaBonusBudget((b) => b + (opt.budgetDelta || 0))
    if (opt.scoreDelta !== undefined) setDilemmaBonusScore((s) => s + (opt.scoreDelta || 0))
    setDilemmaChoice({ title: activeDilemma.title, choiceText: opt.text, isEthical: opt.isEthical })
    setActiveDilemma(null)
    performSubmit()
  }

  const performSubmit = () => {
    const missing = model!.req.filter((r) => !picked.includes(r))
    const overBudget = spent > budget
    setAttempts((a) => a + 1)
    const ok = !missing.length && !overBudget
    setResult({ ok, missing, overBudget })
    setStep(ok ? 4 : 5)
  }

  const submit = () => {
    if (!dilemmaTriggered) {
      setDilemmaTriggered(true)
      const d = M1_DILEMMAS[Math.floor(Math.random() * M1_DILEMMAS.length)]
      setActiveDilemma(d)
    } else {
      performSubmit()
    }
  }

  const finish = () => {
    const extra = picked.filter((p) => !model!.req.includes(p)).length
    const s1 = [40, 30, 20, 10][Math.min(attempts - 1, 3)]
    const s2 = Math.max(0, 30 - extra * 5)
    const s3 = Math.round(20 * Math.min(1, left / (budget * 0.5)))
    const m = elapsed / 60
    const s4 = m < 5 ? 10 : m < 8 ? 7 : m < 12 ? 4 : 0
    const rawScore = s1 + s2 + s3 + s4 + eventBonusScore + dilemmaBonusScore
    const totalScore = Math.max(0, Math.min(100, rawScore))

    // Compute badges
    const badges: string[] = []
    if (elapsed <= 180) badges.push('speed')
    if (attempts === 1) badges.push('flawless1')
    if (left >= budget * 0.4) badges.push('budget_saver')
    if (totalScore >= 90) badges.push('top_rank')
    if (dilemmaChoice?.isEthical) badges.push('ethics_hero')

    // Save to local leaderboard
    saveLeaderboard(1, {
      name: playerName || 'Người chơi',
      mode: 1,
      score: totalScore,
      detail: `${model!.name} · ${attempts} lần nộp · ${Math.max(1, Math.round(m))} phút`,
      badges,
    })

    onDone({
      model: model!.name,
      score: totalScore,
      attempts,
      left,
      minutes: Math.max(1, Math.round(m)),
      badges,
      dilemmaChoice: dilemmaChoice ?? undefined,
      eventChoice: eventChoice ?? undefined,
    })
  }

  // Timer color indicator
  const timerColor = elapsed < 180 ? 'text-navy' : elapsed < 360 ? 'text-ochre' : 'text-stamp animate-pulse font-bold'

  const rail = model && (
    <>
    <div className="lg:hidden flex items-center justify-between gap-3 font-mono text-[11px] text-ink">
      <span className={left < 0 ? 'text-stamp font-bold' : 'text-navy font-bold'}>{vnd(left)}</span>
      <div className="flex-1 h-1.5 bg-purple-soft/40 rounded-full overflow-hidden border border-navy/20"><div className={`h-full transition-all ${left < 0 ? 'bg-stamp' : 'bg-ochre'}`} style={{ width: `${Math.min(100, (spent / budget) * 100)}%` }} /></div>
      <span className={`font-semibold ${timerColor}`}>{attempts}/4 · {String(Math.floor(elapsed / 60)).padStart(2, '0')}:{String(elapsed % 60).padStart(2, '0')}</span>
    </div>
    <div className="hidden lg:block space-y-4">
      <div className="border-2 border-navy p-4 bg-white shadow-sm">
        <Label className="text-ink/60 font-semibold">Ngân sách còn lại</Label>
        <div className={`font-mono text-xl mt-1 ${left < 0 ? 'text-stamp font-bold' : 'text-navy font-bold'}`}>{vnd(left)}</div>
        <div className="h-2 bg-purple-soft/40 mt-3 rounded-full overflow-hidden border border-navy/20"><div className={`h-full transition-all ${left < 0 ? 'bg-stamp' : 'bg-ochre'}`} style={{ width: `${Math.min(100, (spent / budget) * 100)}%` }} /></div>
      </div>
      <div className="flex justify-between font-mono text-[11px] text-ink/60">
        <span>Lần nộp {attempts}/4</span>
        <span className={timerColor}>⏱ {String(Math.floor(elapsed / 60)).padStart(2, '0')}:{String(elapsed % 60).padStart(2, '0')}</span>
      </div>
      {eventChoice && (
        <div className="p-2.5 bg-purple-soft/20 border border-purple/40 text-xs">
          <Label className="text-purple font-bold">⚡ Sự kiện đã xử lý</Label>
          <div className="text-[11px] text-ink/80 mt-1 line-clamp-2">{eventChoice.title}</div>
        </div>
      )}
    </div>
    </>
  )

  return (
    <Shell mode="Chế độ 01" title="Khởi Nghiệp Giáo Dục" steps={STEPS} current={step} rail={rail} onExit={onExit}>
      {/* Toast Feedback */}
      {toast && (
        <div className="fixed top-16 right-4 sm:right-8 z-50 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className={`px-4 py-2.5 border-2 text-xs font-mono font-bold shadow-md ${toast.isTrap ? 'border-stamp bg-stamp text-white' : 'border-navy bg-navy text-white'}`}>
            {toast.text}
          </div>
        </div>
      )}

      {/* ⚡ Random Event Modal */}
      {activeEvent && (
        <Modal
          isOpen={true}
          title={activeEvent.title}
          sub={activeEvent.sub}
          icon={activeEvent.icon}
        >
          <div className="space-y-4">
            <div className="inline-block px-2.5 py-0.5 bg-purple-soft/30 border border-purple/40 text-navy font-mono text-[10px] uppercase font-bold">
              {activeEvent.tag}
            </div>
            <p className="text-ink leading-relaxed text-sm">{activeEvent.desc}</p>
            <div className="border-t-2 border-navy/20 pt-4 space-y-3">
              <Label className="text-navy font-bold">Chọn phương án ứng phó của bạn:</Label>
              {activeEvent.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleEventSelect(idx)}
                  className="w-full text-left p-3.5 border-2 border-navy hover:bg-navy hover:text-white group transition bg-white shadow-xs"
                >
                  <div className="font-bold text-sm text-ink group-hover:text-white">{opt.label}</div>
                  <div className="text-xs text-ink/70 group-hover:text-white/80 mt-1 font-mono">→ {opt.effectText}</div>
                </button>
              ))}
            </div>
          </div>
        </Modal>
      )}

      {/* ⚖️ Dilemma Modal */}
      {activeDilemma && (
        <Modal
          isOpen={true}
          title={activeDilemma.title}
          sub="Tình huống nan giải thực tế"
          icon={activeDilemma.icon}
        >
          <div className="space-y-4">
            <div className="inline-block px-2.5 py-0.5 bg-purple-soft/30 border border-purple/40 text-navy font-mono text-[10px] uppercase font-bold">
              {activeDilemma.tag}
            </div>
            <p className="text-ink leading-relaxed text-sm italic font-display">“{activeDilemma.scenario}”</p>
            <div className="border-t-2 border-navy/20 pt-4 space-y-3">
              <Label className="text-navy font-bold">Quyết định của người sáng lập:</Label>
              {activeDilemma.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleDilemmaSelect(idx)}
                  className={`w-full text-left p-4 border-2 transition shadow-xs ${opt.isEthical ? 'border-navy hover:bg-navy hover:text-white group bg-white' : 'border-stamp/60 hover:bg-stamp hover:text-white group bg-white'}`}
                >
                  <div className="font-bold text-sm text-ink group-hover:text-white">{opt.text}</div>
                  <div className="text-xs text-ink/70 group-hover:text-white/80 mt-1">Hậu quả: {opt.consequence}</div>
                </button>
              ))}
            </div>
          </div>
        </Modal>
      )}

      {step === 0 && (
        <>
          <Heading kicker="Bước 01 — Mô hình" title={<>Bạn sẽ mở loại cơ sở<br /> giáo dục nào?</>} sub="Mỗi mô hình có bộ yêu cầu pháp lý riêng. Chọn một mô hình để nhận ngân sách khởi điểm và xáo trộn khay công cụ." />
          <div className="grid md:grid-cols-2 border-t-2 border-l-2 border-navy">
            {MODELS.map((m) => (
              <button key={m.id} onClick={() => chooseModel(m)} className="text-left p-6 sm:p-8 border-r-2 border-b-2 border-navy group hover:bg-navy hover:text-white bg-white active:bg-navy active:text-white transition relative min-h-52 sm:min-h-64 flex flex-col shadow-xs">
                <div className="flex justify-between items-start"><span className="font-mono text-xs text-purple font-bold group-hover:text-purple-light">{m.id}</span><Stars n={m.stars} /></div>
                <h3 className="font-display text-2xl sm:text-3xl mt-6 sm:mt-8 leading-tight text-ink group-hover:text-white">{m.name}</h3>
                <p className="mt-3 text-sm text-ink/75 group-hover:text-white/80 max-w-xs">{m.desc}</p>
                <div className="mt-auto pt-6 flex flex-wrap gap-x-8 gap-y-1 font-mono text-[11px] uppercase tracking-wider text-navy group-hover:text-purple-light font-medium">
                  <span>{m.req.length} hồ sơ bắt buộc</span><span>{vnd(m.budget)}</span>
                </div>
                <span className="absolute right-8 bottom-8 text-2xl text-navy group-hover:text-purple-light opacity-0 group-hover:opacity-100 transition translate-x-[-6px] group-hover:translate-x-0">→</span>
              </button>
            ))}
          </div>
        </>
      )}

      {step === 1 && model && (
        <div className="max-w-2xl rise">
          <Heading kicker="Bước 02 — Ngân sách" title="Quỹ khởi nghiệp đã được cấp." sub={`Mỗi hồ sơ kéo vào bộ hồ sơ sẽ trừ chi phí tương ứng. Hãy lập bộ hồ sơ pháp lý phù hợp với ${model.name.toLowerCase()} mà không vượt ngân sách — cẩn thận với những hồ sơ không liên quan và giấy tờ tạo nhiễu.`} />
          <div className="border-y-2 border-navy py-10 my-6 bg-purple-soft/10 px-4">
            <Label className="text-navy font-bold">Ngân sách ban đầu · {model.name}</Label>
            <div className="font-display text-[2.6rem] sm:text-6xl lg:text-7xl font-black mt-3 tabular-nums break-words text-ink">{model.budget.toLocaleString('vi-VN')}<span className="text-2xl ml-3 font-mono font-normal text-navy">VNĐ</span></div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Btn kind="ghost" onClick={() => setStep(0)}>← Chọn lại mô hình</Btn>
            <Btn kind="navy" onClick={goToLegalToolkit}>Mở Khay Công Cụ Pháp Lý →</Btn>
          </div>
        </div>
      )}

      {(step === 2 || step === 3) && model && (
        <>
          <Heading
            kicker="Bước 03–04 — Khay pháp lý"
            title="Lập bộ hồ sơ pháp lý"
            sub={
              <>
                <span className="font-semibold text-navy">Mục tiêu: Lập bộ hồ sơ pháp lý phù hợp với mô hình hoạt động. </span>
                <span className="hidden xl:inline">Kéo hồ sơ từ khay vào tập hồ sơ bên phải (hoặc nhấn vào thẻ). Thứ tự hồ sơ đã được xáo trộn ngẫu nhiên.</span>
                <span className="xl:hidden">Chạm vào thẻ hồ sơ để thêm vào tập hồ sơ bên dưới.</span>
                <span className="text-stamp font-semibold"> Cảnh giác với giấy tờ gần giống, không đúng thẩm quyền (tạo nhiễu).</span> Nhấn ✕ để bỏ bớt.
              </>
            }
          />
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex gap-2">
              <Btn kind="ghost" onClick={() => setStep(1)} className="py-2 px-3 text-[10px]">← Xem lại ngân sách</Btn>
              <Btn kind="ghost" onClick={() => { if (confirm('Bạn muốn chọn lại mô hình hoạt động từ đầu?')) { setPicked([]); setStep(0); } }} className="py-2 px-3 text-[10px]">↺ Đổi mô hình</Btn>
            </div>
            <div className="font-mono text-xs text-ink/70">
              Đã chọn: <b className="text-navy">{picked.length}</b> mục · Ngân sách khả dụng: <b className={left < 0 ? 'text-stamp' : 'text-navy'}>{vnd(left)}</b>
            </div>
          </div>
          <div className="grid xl:grid-cols-[1.25fr_1fr] gap-8 items-start">
            <section>
              <div className="flex gap-1 mb-4 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
                {TYPES.map((t) => <button key={t} onClick={() => setFilter(t)} className={`shrink-0 px-3 py-2 font-mono text-[10px] uppercase tracking-wider border-2 transition ${filter === t ? 'bg-navy text-white border-navy font-bold shadow-sm' : 'border-navy/30 bg-white text-ink hover:border-navy hover:bg-purple-soft/20'}`}>{t}</button>)}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {shuffledDocs.filter((d) => filter === 'Tất cả' || d.type === filter).map((d) => {
                  const inFile = picked.includes(d.id)
                  const isDecoy = d.id >= 'D23'
                  return (
                    <div key={d.id} draggable={!inFile} onDragStart={(e) => { e.dataTransfer.setData('text', d.id); setStep(3) }} onClick={() => { add(d.id); setStep(3) }}
                      className={`p-3 sm:p-4 border-2 bg-white flex flex-col gap-2 select-none transition active:scale-[.98] ${inFile ? 'opacity-35 border-dashed border-navy/30 bg-purple-soft/10 cursor-default' : 'border-navy/50 cursor-grab hover:border-navy hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#1a3399]'}`}>
                      <div className="flex justify-between font-mono text-[10px] uppercase tracking-wider text-purple font-bold">
                        <span>{d.id} · {d.type}</span>
                        {inFile && <span className="text-navy font-semibold">Đã thêm</span>}
                        {!inFile && isDecoy && <span className="text-ochre font-semibold" title="Giấy tờ cần lưu ý">⚠</span>}
                      </div>
                      <div className="text-sm font-medium leading-snug text-ink">{d.name}</div>
                      <div className="font-mono text-xs text-stamp mt-auto font-bold">−{vnd(d.cost)}</div>
                    </div>
                  )
                })}
              </div>
            </section>
            <section id="dossier" onDragOver={(e) => { e.preventDefault(); setOver(true) }} onDragLeave={() => setOver(false)} onDrop={(e) => { e.preventDefault(); setOver(false); add(e.dataTransfer.getData('text')) }}
              className={`xl:sticky xl:top-8 bg-white border-2 transition ${over ? 'border-stamp border-solid shadow-[0_0_12px_rgba(200,54,31,0.2)]' : 'border-navy border-dashed shadow-md'}`}>
              <div className="bg-navy text-white px-5 py-3 flex justify-between items-center"><Label>Tập hồ sơ · {model.name}</Label><span className="font-mono text-xs">{picked.length} mục</span></div>
              <div className="p-3 sm:p-4 min-h-40 xl:min-h-72 xl:max-h-[50vh] overflow-y-auto space-y-1">
                {!picked.length && <div className="h-32 xl:h-64 grid place-items-center text-center text-navy/40 text-sm font-medium">Thả hồ sơ vào đây<br /><span className="font-mono text-[10px] text-purple">DROP ZONE</span></div>}
                {picked.map((id) => { const d = DOCS.find((x) => x.id === id)!; return (
                  <div key={id} className="flex items-center gap-3 bg-white px-3 py-2 border border-navy/20 rise hover:border-navy transition">
                    <span className="font-mono text-[10px] text-purple font-bold w-8">{id}</span><span className="text-sm flex-1 text-ink">{d.name}</span>
                    <span className="font-mono text-[11px] text-ink font-semibold">{(d.cost / 1e6).toLocaleString('vi-VN')}tr</span>
                    <button onClick={() => remove(id)} className="text-ink/40 hover:text-stamp px-1 font-bold" aria-label="Bỏ hồ sơ">✕</button>
                  </div> )})}
              </div>
              <div className="border-t-2 border-navy p-5 space-y-2 font-mono text-xs bg-purple-soft/15">
                <div className="flex justify-between text-ink"><span>Tổng chi phí</span><span className="font-semibold">{vnd(spent)}</span></div>
                <div className={`flex justify-between ${left < 0 ? 'text-stamp font-bold' : 'text-navy font-bold'}`}><span>Còn lại</span><span>{vnd(left)}</span></div>
                {left < 0 && <p className="text-stamp text-[11px] pt-1 font-semibold">Vượt ngân sách — hãy bỏ bớt hồ sơ không cần thiết.</p>}
                <Btn kind="stamp" className="w-full justify-center mt-3" disabled={!picked.length} onClick={submit}>Nộp hồ sơ →</Btn>
              </div>
            </section>
          </div>
          <div className="xl:hidden fixed bottom-0 inset-x-0 z-20 bg-white border-t-2 border-navy p-3 flex items-center gap-3 shadow-lg">
            <Btn kind="ghost" onClick={() => setStep(1)} className="py-2 px-3 text-[10px]">←</Btn>
            <a href="#dossier" className="flex-1 min-w-0">
              <div className="font-mono text-[10px] uppercase tracking-wider text-purple font-bold">Tập hồ sơ · {picked.length} mục ↓</div>
              <div className={`font-mono text-sm truncate ${left < 0 ? 'text-stamp font-bold' : 'text-navy font-bold'}`}>Còn {vnd(left)}</div>
            </a>
            <Btn kind="stamp" disabled={!picked.length} onClick={submit}>Nộp →</Btn>
          </div>
        </>
      )}

      {step === 4 && result?.ok && model && (
        <div className="max-w-2xl rise relative">
          <Heading kicker="Bước 05 — Kết quả thẩm định" title="Hồ sơ hợp lệ." sub={`Sở GD&ĐT chấp thuận theo Nghị định 125/2024/NĐ-CP. ${model.name} đủ điều kiện pháp lý sau ${attempts} lần nộp.`} />
          <div className="relative border-2 border-navy bg-white p-6 sm:p-10 overflow-hidden shadow-lg">
            <div className="stamp-in absolute right-4 top-6 sm:right-8 sm:top-8 border-4 border-stamp text-stamp px-4 py-2 sm:px-6 sm:py-3 font-display font-black text-lg sm:text-2xl uppercase tracking-wider">Được vận hành</div>
            <dl className="grid grid-cols-2 gap-6 mt-24 font-mono text-sm">
              <div><dt className="text-ink/60 text-[10px] uppercase tracking-widest font-semibold">Hồ sơ đã nộp</dt><dd className="text-xl mt-1 text-ink font-bold">{picked.length}</dd></div>
              <div><dt className="text-ink/60 text-[10px] uppercase tracking-widest font-semibold">Hồ sơ thừa / bẫy</dt><dd className="text-xl mt-1 text-ink font-bold">{picked.filter((p) => !model.req.includes(p)).length}</dd></div>
              <div><dt className="text-ink/60 text-[10px] uppercase tracking-widest font-semibold">Ngân sách còn</dt><dd className="text-xl mt-1 text-navy font-bold">{vnd(left)}</dd></div>
              <div><dt className="text-ink/60 text-[10px] uppercase tracking-widest font-semibold">Thời gian</dt><dd className="text-xl mt-1 text-ink font-bold">{Math.ceil(elapsed / 60)} phút</dd></div>
            </dl>
          </div>

          {/* Living Document Checklist (Feature 2.3) */}
          <div className="mt-6 border-2 border-navy bg-white p-5 shadow-sm">
            <Label className="text-navy font-bold mb-2">📋 Bản Checklist Hồ Sơ Đã Được Thẩm Định</Label>
            <div className="max-h-48 overflow-y-auto space-y-1.5 pt-2">
              {picked.map((id) => {
                const d = DOCS.find((x) => x.id === id)!
                const isReq = model.req.includes(id)
                return (
                  <div key={id} className="flex items-center justify-between text-xs py-1 border-b border-navy/15">
                    <span className="font-medium text-ink">{isReq ? '✅' : '⚠️'} {d.name}</span>
                    <span className="font-mono text-ink/60">{vnd(d.cost)}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {picked.filter((p) => !model.req.includes(p)).length > 0 && (
            <div className="mt-4 p-4 border-2 border-purple/40 bg-purple-soft/20 text-sm text-navy rounded-sm">
              💡 <b>Lưu ý từ Thanh tra:</b> Bạn đã chọn kèm {picked.filter((p) => !model.req.includes(p)).length} hồ sơ không bắt buộc hoặc giấy tờ tạo nhiễu. Dù vẫn đạt chuẩn cấp phép nhưng gây lãng phí một phần quỹ khởi nghiệp.
            </div>
          )}

          {dilemmaChoice && (
            <div className="mt-4 p-4 border-2 border-navy/30 bg-white text-xs">
              <Label className="text-purple font-bold">⚖️ Tình huống nan giải: {dilemmaChoice.title}</Label>
              <p className="mt-1 text-ink/80">{dilemmaChoice.choiceText} — <b className={dilemmaChoice.isEthical ? 'text-navy' : 'text-stamp'}>{dilemmaChoice.isEthical ? 'Chuẩn mực đạo đức' : 'Lách quy định'}</b></p>
            </div>
          )}

          <div className="flex flex-wrap gap-3 mt-8">
            <Btn kind="ghost" onClick={() => setStep(3)}>← Xem lại hồ sơ đã nộp</Btn>
            <Btn kind="navy" onClick={finish}>Nhận chứng nhận →</Btn>
          </div>
        </div>
      )}

      {step === 5 && result && model && (
        <div className="max-w-3xl rise">
          <div className="flex gap-4 sm:gap-6 items-start mb-8 sm:mb-10">
            <div className="shrink-0 size-14 sm:size-20 bg-navy text-white grid place-items-center font-display text-3xl italic shadow-sm">TT</div>
            <div>
              <Label className="text-stamp font-bold">Bước 06 — Thanh tra mô phỏng · Lần nộp {attempts}</Label>
              <h1 className="font-display text-3xl sm:text-4xl font-bold mt-2 text-ink">Biên bản kiểm tra</h1>
              <p className="mt-3 text-ink/75 italic font-normal">“Tôi là Thanh Tra Viên Sở GD&ĐT. Căn cứ Nghị định 125/2024/NĐ-CP và các quy định hiện hành, bộ hồ sơ của cơ sở chưa đạt yêu cầu dưới đây.”</p>
            </div>
          </div>
          <div className="space-y-4">
            {result.overBudget && (
              <article className="border-l-4 border-stamp bg-stamp/10 p-6 shadow-sm">
                <Label className="text-stamp font-bold">⚠ Vi phạm ngân sách</Label>
                <p className="mt-2 text-ink">Tổng chi phí vượt <b className="text-stamp">{vnd(-left)}</b> so với ngân sách được cấp. Hãy loại bỏ hồ sơ không bắt buộc hoặc các giấy tờ tạo nhiễu đắt tiền.</p>
              </article>
            )}
            {picked.filter((p) => !model.req.includes(p)).length > 0 && (
              <article className="border-l-4 border-purple bg-purple-soft/20 p-5 shadow-sm text-sm">
                <Label className="text-purple font-bold">⚠ Phát hiện hồ sơ tạo nhiễu / Không bắt buộc ({picked.filter((p) => !model.req.includes(p)).length} mục)</Label>
                <p className="mt-2 text-ink">
                  Bạn đã nộp các giấy tờ không thuộc thẩm quyền hoặc không nằm trong danh mục cấp phép theo Nghị định 125/2024/NĐ-CP. Hãy nhấn "Sửa hồ sơ" và nhấn ✕ để gỡ bỏ chúng nhằm bảo toàn ngân sách.
                </p>
              </article>
            )}
            {result.missing.map((id, i) => { const d = DOCS.find((x) => x.id === id)!; return (
              <article key={id} className="border-2 border-navy bg-white grid md:grid-cols-[80px_1fr] shadow-sm">
                <div className="bg-stamp text-white p-4 font-mono text-xs flex md:flex-col justify-between font-bold"><span>VI PHẠM</span><span className="font-display text-3xl">#{i + 1}</span></div>
                <div className="p-5 sm:p-6 space-y-3">
                  <div><Label className="text-ink/60 font-semibold">Hồ sơ thiếu</Label><div className="font-bold text-lg text-ink">{d.name}</div></div>
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-ink">
                    <div><Label className="text-ink/60 mb-1 font-semibold">Căn cứ pháp lý mới</Label><p className="font-display italic text-navy font-medium">“{d.law}”</p></div>
                    <div><Label className="text-ink/60 mb-1 font-semibold">Hậu quả nếu hoạt động</Label><p className="text-ink/85">{d.result}</p></div>
                  </div>
                </div>
              </article> )})}
          </div>
          <div className="flex flex-wrap gap-3 mt-8">
            {attempts < 4 ? <Btn kind="navy" onClick={() => setStep(3)}>Sửa hồ sơ ({4 - attempts} lần còn lại) →</Btn> : <Btn kind="ghost" onClick={() => { setResult(null); onExit() }}>Kết thúc — chơi lại từ đầu</Btn>}
            <Btn kind="ghost" onClick={() => setStep(1)}>← Xem lại ngân sách</Btn>
          </div>
        </div>
      )}
    </Shell>
  )
}
