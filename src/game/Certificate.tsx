import { rank1, rank2, STAT_NAMES, vnd } from './data'
import type { Cert1 } from './Mode1'
import type { Cert2 } from './Mode2'
import { Btn, Label, Stars } from './ui'

export default function Certificate({ name, c1, c2, onHome }: { name: string; c1?: Cert1; c2?: Cert2; onHome: () => void }) {
  const isOne = !!c1
  const score = c1?.score ?? c2!.score
  const [stars, title] = isOne ? rank1(score) : rank2(score)
  const rows: [string, string][] = isOne
    ? [['Mô hình đã chọn', c1!.model], ['Số lần nộp hồ sơ', String(c1!.attempts)], ['Ngân sách còn lại', vnd(c1!.left)], ['Thời gian hoàn thành', `${c1!.minutes} phút`]]
    : [['Bối cảnh lớp học', c2!.ctx], ...c2!.stats.map((v, i) => [STAT_NAMES[i], `${v} / 100`] as [string, string]), ['Số lần điều chỉnh', String(c2!.adjusts)]]
  const date = new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-3 py-8 sm:p-6 bg-[linear-gradient(180deg,#14251f_0_30%,#f3efe4_30%)] md:bg-[linear-gradient(105deg,#14251f_0_38%,#f3efe4_38%)]">
      <div className="w-full max-w-3xl bg-[#faf8f1] p-2 sm:p-3 shadow-[8px_8px_0_#c8361f] sm:shadow-[16px_16px_0_#c8361f] rise">
        <div className="border border-ink p-1"><div className="border-4 border-double border-ink px-4 py-8 sm:px-8 sm:py-12 md:px-16 text-center relative">
          <Label className="text-stamp">Chứng nhận · Certificate No. NC-{String(score).padStart(3, '0')}{Date.now() % 1000}</Label>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black mt-4 tracking-tight">NORMA CLASS</h1>
          <p className="font-display italic text-xl mt-2">Chế độ: {isOne ? 'Khởi Nghiệp Giáo Dục' : 'Mô Phỏng Lớp Học'}</p>
          <div className="my-8 sm:my-10"><Label className="text-ink/50">Trao cho</Label><div className="font-display italic text-3xl sm:text-4xl mt-2 border-b border-ink/30 inline-block px-4 sm:px-8 break-words max-w-full pb-2">{name || 'Người chơi'}</div></div>
          <div className="flex flex-wrap justify-center items-end gap-6 sm:gap-10 mb-8 sm:mb-10">
            <div><div className="font-display text-6xl sm:text-7xl font-black leading-none">{score}</div><Label className="text-ink/50 mt-1">/ 100 điểm</Label></div>
            <div className="text-left"><Stars n={stars as number} /><div className="font-display text-xl mt-1">{title}</div></div>
          </div>
          <dl className="grid sm:grid-cols-2 text-left border-t border-ink/20">
            {rows.map(([k, v]) => <div key={k} className="flex justify-between gap-3 py-2.5 border-b border-ink/10 sm:odd:mr-4 sm:even:ml-4"><dt className="text-ink/60 text-sm">{k}</dt><dd className="font-mono text-xs text-right">{v}</dd></div>)}
          </dl>
          <div className="mt-8 sm:mt-10 flex justify-between items-end gap-4 font-mono text-[11px]"><span>Ngày: {date}</span>
            <div className="stamp-in border-[3px] border-stamp text-stamp rounded-full size-20 sm:size-24 shrink-0 grid place-items-center font-display font-black text-xs leading-tight text-center rotate-[-9deg]">NORMA<br />CLASS<br />✦ ĐÃ CẤP ✦</div>
          </div>
        </div></div>
      </div>
      <div className="flex gap-3 mt-10 print:hidden"><Btn kind="paper" onClick={onHome}>← Trang chủ</Btn><Btn kind="stamp" onClick={() => window.print()}>In chứng nhận</Btn></div>
    </div>
  )
}
