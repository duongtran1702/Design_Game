import { useEffect, useMemo, useState } from 'react'
import { DOCS, MODELS, vnd, rank1, type Model } from './data'
import { Btn, Heading, Label, Shell, Stars } from './ui'

export type Cert1 = { model: string; score: number; attempts: number; left: number; minutes: number }
const STEPS = ['Chọn mô hình hoạt động', 'Nhận ngân sách ban đầu', 'Khay Công Cụ Pháp Lý', 'Kéo – thả hồ sơ', 'Kiểm tra tính hợp lệ', 'Thanh tra mô phỏng']
const TYPES = ['Tất cả', ...Array.from(new Set(DOCS.map((d) => d.type)))]

export default function Mode1({ onExit, onDone }: { onExit: () => void; onDone: (c: Cert1) => void }) {
  const [step, setStep] = useState(0)
  const [model, setModel] = useState<Model | null>(null)
  const [picked, setPicked] = useState<string[]>([])
  const [attempts, setAttempts] = useState(0)
  const [filter, setFilter] = useState('Tất cả')
  const [over, setOver] = useState(false)
  const [start] = useState(() => Date.now())
  const [now, setNow] = useState(Date.now())
  const [result, setResult] = useState<null | { ok: boolean; missing: string[]; overBudget: boolean }>(null)
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t) }, [])

  const spent = useMemo(() => picked.reduce((s, id) => s + DOCS.find((d) => d.id === id)!.cost, 0), [picked])
  const budget = model?.budget ?? 0
  const left = budget - spent
  const elapsed = Math.floor((now - start) / 1000)

  const add = (id: string) => { if (!picked.includes(id)) setPicked((p) => [...p, id]) }
  const remove = (id: string) => setPicked((p) => p.filter((x) => x !== id))

  const submit = () => {
    const missing = model!.req.filter((r) => !picked.includes(r))
    const overBudget = spent > budget
    setAttempts((a) => a + 1)
    const ok = !missing.length && !overBudget
    setResult({ ok, missing, overBudget })
    setStep(ok ? 4 : 5)
  }

  const finish = () => {
    const extra = picked.filter((p) => !model!.req.includes(p)).length
    const s1 = [40, 30, 20, 10][Math.min(attempts - 1, 3)]
    const s2 = Math.max(0, 30 - extra * 5)
    const s3 = Math.round(20 * Math.min(1, left / (budget * 0.5)))
    const m = elapsed / 60
    const s4 = m < 5 ? 10 : m < 8 ? 7 : m < 12 ? 4 : 0
    onDone({ model: model!.name, score: s1 + s2 + s3 + s4, attempts, left, minutes: Math.max(1, Math.round(m)) })
  }

  const rail = model && (
    <>
    <div className="lg:hidden flex items-center justify-between gap-3 font-mono text-[11px]">
      <span className={left < 0 ? 'text-stamp' : 'text-paper'}>{vnd(left)}</span>
      <div className="flex-1 h-1 bg-paper/15"><div className={`h-full transition-all ${left < 0 ? 'bg-stamp' : 'bg-ochre'}`} style={{ width: `${Math.min(100, (spent / budget) * 100)}%` }} /></div>
      <span className="text-paper/50">{attempts}/4 · {String(Math.floor(elapsed / 60)).padStart(2, '0')}:{String(elapsed % 60).padStart(2, '0')}</span>
    </div>
    <div className="hidden lg:block space-y-4">
      <div className="border border-paper/20 p-4">
        <Label className="text-paper/50">Ngân sách còn lại</Label>
        <div className={`font-mono text-xl mt-1 ${left < 0 ? 'text-stamp' : ''}`}>{vnd(left)}</div>
        <div className="h-1 bg-paper/15 mt-3"><div className={`h-full transition-all ${left < 0 ? 'bg-stamp' : 'bg-ochre'}`} style={{ width: `${Math.min(100, (spent / budget) * 100)}%` }} /></div>
      </div>
      <div className="flex justify-between font-mono text-[11px] text-paper/50"><span>Lần nộp {attempts}/4</span><span>⏱ {String(Math.floor(elapsed / 60)).padStart(2, '0')}:{String(elapsed % 60).padStart(2, '0')}</span></div>
    </div>
    </>
  )

  return (
    <Shell mode="Chế độ 01" title="Khởi Nghiệp Giáo Dục" steps={STEPS} current={step} rail={rail} onExit={onExit}>
      {step === 0 && (
        <>
          <Heading kicker="Bước 01 — Mô hình" title={<>Bạn sẽ mở loại cơ sở<br /> giáo dục nào?</>} sub="Mỗi mô hình có bộ yêu cầu pháp lý riêng. Chọn một mô hình để nhận ngân sách khởi điểm." />
          <div className="grid md:grid-cols-2 border-t border-l border-rule">
            {MODELS.map((m) => (
              <button key={m.id} onClick={() => { setModel(m); setStep(1) }} className="text-left p-6 sm:p-8 border-r border-b border-rule group hover:bg-ink hover:text-paper active:bg-ink active:text-paper transition relative min-h-52 sm:min-h-64 flex flex-col">
                <div className="flex justify-between items-start"><span className="font-mono text-xs opacity-50">{m.id}</span><Stars n={m.stars} /></div>
                <h3 className="font-display text-2xl sm:text-3xl mt-6 sm:mt-8 leading-tight">{m.name}</h3>
                <p className="mt-3 text-sm opacity-70 max-w-xs">{m.desc}</p>
                <div className="mt-auto pt-6 flex flex-wrap gap-x-8 gap-y-1 font-mono text-[11px] uppercase tracking-wider opacity-70">
                  <span>{m.req.length} hồ sơ bắt buộc</span><span>{vnd(m.budget)}</span>
                </div>
                <span className="absolute right-8 bottom-8 text-2xl opacity-0 group-hover:opacity-100 transition translate-x-[-6px] group-hover:translate-x-0">→</span>
              </button>
            ))}
          </div>
        </>
      )}

      {step === 1 && model && (
        <div className="max-w-2xl rise">
          <Heading kicker="Bước 02 — Ngân sách" title="Quỹ khởi nghiệp đã được cấp." sub={`Mỗi hồ sơ kéo vào bộ hồ sơ sẽ trừ chi phí tương ứng. Hãy chọn đúng hồ sơ cần thiết cho ${model.name.toLowerCase()} mà không vượt ngân sách — có những hồ sơ là bẫy.`} />
          <div className="border-y-2 border-ink py-10 my-6">
            <Label className="text-ink/50">Ngân sách ban đầu · {model.name}</Label>
            <div className="font-display text-[2.6rem] sm:text-6xl lg:text-7xl font-black mt-3 tabular-nums break-words">{model.budget.toLocaleString('vi-VN')}<span className="text-2xl ml-3 font-mono font-normal">VNĐ</span></div>
          </div>
          <Btn onClick={() => setStep(2)}>Mở Khay Công Cụ Pháp Lý →</Btn>
        </div>
      )}

      {(step === 2 || step === 3) && model && (
        <>
          <Heading kicker="Bước 03–04 — Khay pháp lý" title="Lập bộ hồ sơ" sub={<><span className="hidden xl:inline">Kéo hồ sơ từ khay vào tập hồ sơ bên phải (hoặc nhấn vào thẻ).</span><span className="xl:hidden">Chạm vào thẻ hồ sơ để thêm vào tập hồ sơ bên dưới.</span> Nhấn ✕ để bỏ bớt.</>} />
          <div className="grid xl:grid-cols-[1.25fr_1fr] gap-8 items-start">
            <section>
              <div className="flex gap-1 mb-4 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
                {TYPES.map((t) => <button key={t} onClick={() => setFilter(t)} className={`shrink-0 px-3 py-2 font-mono text-[10px] uppercase tracking-wider border transition ${filter === t ? 'bg-ink text-paper border-ink' : 'border-rule hover:border-ink'}`}>{t}</button>)}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {DOCS.filter((d) => filter === 'Tất cả' || d.type === filter).map((d) => {
                  const inFile = picked.includes(d.id)
                  return (
                    <div key={d.id} draggable={!inFile} onDragStart={(e) => { e.dataTransfer.setData('text', d.id); setStep(3) }} onClick={() => { add(d.id); setStep(3) }}
                      className={`p-3 sm:p-4 border bg-[#faf8f1] flex flex-col gap-2 select-none transition active:scale-[.98] ${inFile ? 'opacity-30 border-dashed border-rule cursor-default' : 'border-rule cursor-grab hover:border-ink hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#14251f]'}`}>
                      <div className="flex justify-between font-mono text-[10px] uppercase tracking-wider text-ink/50"><span>{d.id} · {d.type}</span>{inFile && <span>Đã thêm</span>}</div>
                      <div className="text-sm font-medium leading-snug">{d.name}</div>
                      <div className="font-mono text-xs text-stamp mt-auto">−{vnd(d.cost)}</div>
                    </div>
                  )
                })}
              </div>
            </section>
            <section id="dossier" onDragOver={(e) => { e.preventDefault(); setOver(true) }} onDragLeave={() => setOver(false)} onDrop={(e) => { e.preventDefault(); setOver(false); add(e.dataTransfer.getData('text')) }}
              className={`xl:sticky xl:top-8 bg-paper-2 border-2 transition ${over ? 'border-stamp border-solid' : 'border-ink border-dashed'}`}>
              <div className="bg-ink text-paper px-5 py-3 flex justify-between items-center"><Label>Tập hồ sơ · {model.name}</Label><span className="font-mono text-xs">{picked.length} mục</span></div>
              <div className="p-3 sm:p-4 min-h-40 xl:min-h-72 xl:max-h-[50vh] overflow-y-auto space-y-1">
                {!picked.length && <div className="h-32 xl:h-64 grid place-items-center text-center text-ink/40 text-sm">Thả hồ sơ vào đây<br /><span className="font-mono text-[10px]">DROP ZONE</span></div>}
                {picked.map((id) => { const d = DOCS.find((x) => x.id === id)!; return (
                  <div key={id} className="flex items-center gap-3 bg-paper px-3 py-2 border border-rule rise">
                    <span className="font-mono text-[10px] text-ink/50 w-8">{id}</span><span className="text-sm flex-1">{d.name}</span>
                    <span className="font-mono text-[11px]">{(d.cost / 1e6).toLocaleString('vi-VN')}tr</span>
                    <button onClick={() => remove(id)} className="text-ink/40 hover:text-stamp px-1" aria-label="Bỏ hồ sơ">✕</button>
                  </div> )})}
              </div>
              <div className="border-t border-ink/20 p-5 space-y-2 font-mono text-xs">
                <div className="flex justify-between"><span>Tổng chi phí</span><span>{vnd(spent)}</span></div>
                <div className={`flex justify-between ${left < 0 ? 'text-stamp' : ''}`}><span>Còn lại</span><span>{vnd(left)}</span></div>
                {left < 0 && <p className="text-stamp text-[11px] pt-1">Vượt ngân sách — hãy bỏ bớt hồ sơ không cần thiết.</p>}
                <Btn kind="stamp" className="w-full justify-center mt-3" disabled={!picked.length} onClick={submit}>Nộp hồ sơ →</Btn>
              </div>
            </section>
          </div>
          <div className="xl:hidden fixed bottom-0 inset-x-0 z-20 bg-paper border-t-2 border-ink p-3 flex items-center gap-3">
            <a href="#dossier" className="flex-1 min-w-0">
              <div className="font-mono text-[10px] uppercase tracking-wider text-ink/50">Tập hồ sơ · {picked.length} mục ↓</div>
              <div className={`font-mono text-sm truncate ${left < 0 ? 'text-stamp' : ''}`}>Còn {vnd(left)}</div>
            </a>
            <Btn kind="stamp" disabled={!picked.length} onClick={submit}>Nộp →</Btn>
          </div>
        </>
      )}

      {step === 4 && result?.ok && model && (
        <div className="max-w-2xl rise relative">
          <Heading kicker="Bước 05 — Kết quả thẩm định" title="Hồ sơ hợp lệ." sub={`Sở GD&ĐT chấp thuận. ${model.name} đủ điều kiện pháp lý sau ${attempts} lần nộp.`} />
          <div className="relative border border-rule bg-[#faf8f1] p-6 sm:p-10 overflow-hidden">
            <div className="stamp-in absolute right-4 top-6 sm:right-8 sm:top-8 border-4 border-stamp text-stamp px-4 py-2 sm:px-6 sm:py-3 font-display font-black text-lg sm:text-2xl uppercase tracking-wider">Được vận hành</div>
            <dl className="grid grid-cols-2 gap-6 mt-24 font-mono text-sm">
              <div><dt className="text-ink/50 text-[10px] uppercase tracking-widest">Hồ sơ đã nộp</dt><dd className="text-xl mt-1">{picked.length}</dd></div>
              <div><dt className="text-ink/50 text-[10px] uppercase tracking-widest">Hồ sơ thừa</dt><dd className="text-xl mt-1">{picked.filter((p) => !model.req.includes(p)).length}</dd></div>
              <div><dt className="text-ink/50 text-[10px] uppercase tracking-widest">Ngân sách còn</dt><dd className="text-xl mt-1">{vnd(left)}</dd></div>
              <div><dt className="text-ink/50 text-[10px] uppercase tracking-widest">Thời gian</dt><dd className="text-xl mt-1">{Math.ceil(elapsed / 60)} phút</dd></div>
            </dl>
          </div>
          <Btn className="mt-8" onClick={finish}>Nhận chứng nhận →</Btn>
        </div>
      )}

      {step === 5 && result && (
        <div className="max-w-3xl rise">
          <div className="flex gap-4 sm:gap-6 items-start mb-8 sm:mb-10">
            <div className="shrink-0 size-14 sm:size-20 bg-ink text-paper grid place-items-center font-display text-3xl italic">TT</div>
            <div>
              <Label className="text-stamp">Bước 06 — Thanh tra mô phỏng · Lần nộp {attempts}</Label>
              <h1 className="font-display text-3xl sm:text-4xl font-bold mt-2">Biên bản kiểm tra</h1>
              <p className="mt-3 text-ink/70 italic">“Tôi là Thanh Tra Viên Sở GD&ĐT. Sau khi đối chiếu, bộ hồ sơ của anh/chị chưa đạt các điều kiện dưới đây.”</p>
            </div>
          </div>
          <div className="space-y-4">
            {result.overBudget && (
              <article className="border-l-4 border-stamp bg-[#faf8f1] p-6">
                <Label className="text-stamp">⚠ Vi phạm ngân sách</Label>
                <p className="mt-2">Tổng chi phí vượt <b>{vnd(-left)}</b> so với ngân sách được cấp. Hãy loại bỏ hồ sơ không bắt buộc.</p>
              </article>
            )}
            {result.missing.map((id, i) => { const d = DOCS.find((x) => x.id === id)!; return (
              <article key={id} className="border border-rule bg-[#faf8f1] grid md:grid-cols-[80px_1fr]">
                <div className="bg-stamp text-paper p-4 font-mono text-xs flex md:flex-col justify-between"><span>VI PHẠM</span><span className="font-display text-3xl">#{i + 1}</span></div>
                <div className="p-5 sm:p-6 space-y-3">
                  <div><Label className="text-ink/50">Hồ sơ thiếu</Label><div className="font-medium text-lg">{d.name}</div></div>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div><Label className="text-ink/50 mb-1">Căn cứ pháp lý</Label><p className="font-display italic">“{d.law}”</p></div>
                    <div><Label className="text-ink/50 mb-1">Hậu quả nếu hoạt động</Label><p>{d.result}</p></div>
                  </div>
                </div>
              </article> )})}
          </div>
          <div className="flex gap-3 mt-8">
            {attempts < 4 ? <Btn onClick={() => setStep(3)}>Sửa hồ sơ ({4 - attempts} lần còn lại) →</Btn> : <Btn onClick={() => { setResult(null); onExit() }}>Kết thúc — chơi lại từ đầu</Btn>}
          </div>
        </div>
      )}
    </Shell>
  )
}
