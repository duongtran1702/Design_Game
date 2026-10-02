import { BADGES, rank1, rank2, STAT_NAMES, vnd } from './data'
import type { Cert1 } from './Mode1'
import type { Cert2 } from './Mode2'
import { BadgeChip, Btn, Confetti, Label, Stars } from './ui'

export default function Certificate({ name, c1, c2, onHome }: { name: string; c1?: Cert1; c2?: Cert2; onHome: () => void }) {
  const isOne = !!c1
  const score = c1?.score ?? c2!.score
  const badges = (isOne ? c1?.badges : c2?.badges) ?? []
  const [stars, title] = isOne ? rank1(score) : rank2(score)
  const rows: [string, string][] = isOne
    ? [['Mô hình đã chọn', c1!.model], ['Số lần nộp hồ sơ', String(c1!.attempts)], ['Ngân sách còn lại', vnd(c1!.left)], ['Thời gian hoàn thành', `${c1!.minutes} phút`]]
    : [['Bối cảnh lớp học', c2!.ctx], ...c2!.stats.map((v, i) => [STAT_NAMES[i], `${v} / 100`] as [string, string]), ['Số lần điều chỉnh', String(c2!.adjusts)]]
  const date = new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-3 py-8 sm:p-6 bg-white relative overflow-hidden">
      {/* 🎉 Confetti animation for high score */}
      {score >= 80 && <Confetti />}

      {/* Decorative purple background glows */}
      <div aria-hidden className="absolute top-0 left-1/4 w-96 h-96 bg-purple-soft/25 rounded-full blur-3xl pointer-events-none" />
      <div aria-hidden className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-light/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-3xl bg-white p-2 sm:p-3 shadow-[12px_12px_0_#1a3399] sm:shadow-[16px_16px_0_#1a3399] border-2 border-navy rise relative z-10">
        <div className="border-2 border-navy p-1">
          <div className="border-4 border-double border-navy px-4 py-8 sm:px-8 sm:py-12 md:px-16 text-center relative bg-white">
            <Label className="text-stamp font-bold">Chứng nhận · Certificate No. NC-{String(score).padStart(3, '0')}{Date.now() % 1000}</Label>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black mt-4 tracking-tight text-ink">NORMA CLASS</h1>
            <p className="font-display italic text-xl mt-2 text-purple font-semibold">Chế độ: {isOne ? 'Khởi Nghiệp Giáo Dục' : 'Mô Phỏng Lớp Học'}</p>
            <div className="my-8 sm:my-10">
              <Label className="text-ink/60 font-semibold">Trao cho</Label>
              <div className="font-display italic text-3xl sm:text-4xl mt-2 border-b-2 border-navy inline-block px-4 sm:px-8 break-words max-w-full pb-2 text-ink font-bold">{name || 'Người chơi'}</div>
            </div>
            <div className="flex flex-wrap justify-center items-end gap-6 sm:gap-10 mb-8 sm:mb-10">
              <div>
                <div className="font-display text-6xl sm:text-7xl font-black leading-none text-navy">{score}</div>
                <Label className="text-ink/60 mt-1 font-semibold">/ 100 điểm</Label>
              </div>
              <div className="text-left">
                <Stars n={stars as number} />
                <div className="font-display text-xl mt-1 text-purple font-bold">{title}</div>
              </div>
            </div>

            <dl className="grid sm:grid-cols-2 text-left border-t-2 border-navy/20">
              {rows.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-3 py-2.5 border-b border-navy/15 sm:odd:mr-4 sm:even:ml-4">
                  <dt className="text-ink/70 text-sm font-medium">{k}</dt>
                  <dd className="font-mono text-xs text-right text-ink font-bold">{v}</dd>
                </div>
              ))}
            </dl>

            {/* 🏅 Earned Badges Section */}
            {badges.length > 0 && (
              <div className="mt-8 pt-6 border-t-2 border-navy/20 text-left">
                <Label className="text-purple font-bold mb-3">Huy Hiệu Đạt Được ({badges.length})</Label>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {badges.map((bId) => {
                    const badge = BADGES[bId]
                    if (!badge) return null
                    return <BadgeChip key={bId} badge={badge} />
                  })}
                </div>
              </div>
            )}

            {/* 👁️ Student Diary Note on Certificate */}
            {!isOne && c2?.studentDiary && (
              <div className="mt-6 p-4 border-2 border-navy/20 bg-purple-soft/10 text-left text-xs">
                <Label className="text-navy font-bold mb-1">📖 Lời Cảm Nhận Của Học Sinh ({c2.studentDiary.studentName}):</Label>
                <p className="font-display italic text-ink/80 leading-relaxed text-sm">{c2.studentDiary.diary}</p>
              </div>
            )}

            {/* Dilemma Summary */}
            {((isOne && c1?.dilemmaChoice) || (!isOne && c2?.dilemmaChoice)) && (
              <div className="mt-4 p-3 border border-navy/20 bg-white text-left text-xs font-mono">
                <span className="text-purple font-bold">⚖️ Tình huống nan giải: </span>
                <span className="text-ink">{isOne ? c1?.dilemmaChoice?.title : c2?.dilemmaChoice?.title} — {isOne ? (c1?.dilemmaChoice?.isEthical ? '✓ Giữ vững đạo đức pháp lý' : '⚠ Chọn phương án rủi ro') : (c2?.dilemmaChoice?.isEthical ? '✓ Chuẩn mực đạo đức sư phạm' : '⚠ Chưa tối ưu tính nhân văn')}</span>
              </div>
            )}

            <div className="mt-8 sm:mt-10 flex justify-between items-end gap-4 font-mono text-[11px] text-ink/70">
              <span className="font-semibold">Ngày: {date}</span>
              <div className="stamp-in border-[3px] border-stamp text-stamp rounded-full size-20 sm:size-24 shrink-0 grid place-items-center font-display font-black text-xs leading-tight text-center rotate-[-9deg]">
                NORMA<br />CLASS<br />✦ ĐÃ CẤP ✦
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-3 mt-10 print:hidden relative z-10">
        <Btn kind="ghost" onClick={onHome}>← Trang chủ</Btn>
        <Btn kind="stamp" onClick={() => window.print()}>In chứng nhận</Btn>
      </div>
    </div>
  )
}

