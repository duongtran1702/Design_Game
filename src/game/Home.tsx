import { useEffect, useState } from 'react'
import { BADGES, getLeaderboard, type LeaderboardEntry } from './data'
import { Btn, Label, Modal } from './ui'

export default function Home({ name, setName, onPick, earned }: { name: string; setName: (s: string) => void; onPick: (m: 1 | 2) => void; earned: number }) {
  const [lbMode, setLbMode] = useState<1 | 2>(1)
  const leaderboard: LeaderboardEntry[] = getLeaderboard(lbMode)

  // 📝 Modal nhập tên người chơi mới vào
  const [showNameModal, setShowNameModal] = useState(() => !name || !name.trim())
  const [tempName, setTempName] = useState(name)
  const [pendingMode, setPendingMode] = useState<1 | 2 | null>(null)

  useEffect(() => {
    setTempName(name)
  }, [name])

  const handleConfirmName = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    const trimmed = tempName.trim()
    if (!trimmed) return
    setName(trimmed)
    setShowNameModal(false)
    if (pendingMode) {
      const m = pendingMode
      setPendingMode(null)
      onPick(m)
    }
  }

  const handleStartMode = (m: 1 | 2) => {
    if (!name || !name.trim()) {
      setPendingMode(m)
      setShowNameModal(true)
    } else {
      onPick(m)
    }
  }

  const modes = [
    { n: 1 as const, kick: 'Chế độ 01 · 6 bước', title: 'Khởi Nghiệp Giáo Dục', role: 'Nhà sáng lập trung tâm / trường học', goal: 'Lập bộ hồ sơ pháp lý phù hợp với mô hình hoạt động trong ngân sách, vượt qua Thanh Tra Mô Phỏng.', meta: ['4 mô hình', '33 hồ sơ & bẫy', 'Kéo – thả', 'Sự kiện đột xuất'] },
    { n: 2 as const, kick: 'Chế độ 02 · 8 bước', title: 'Mô Phỏng Lớp Học', role: 'Giáo viên đứng lớp', goal: 'Thiết kế bài dạy, chọn mức độ can thiệp AI phù hợp với tình huống thực tế, cân bằng năng lực học sinh.', meta: ['6 bối cảnh', '4 pha', '3 chỉ số', 'Nhật ký HS', 'Ngã rẽ sư phạm'] },
  ]

  return (
    <div className="min-h-screen grid lg:grid-cols-[1fr_1.1fr] bg-white">
      {/* 🎓 Welcome / Name Input Modal */}
      {showNameModal && (
        <Modal
          isOpen={true}
          onClose={name ? () => setShowNameModal(false) : undefined}
          title="Chào mừng đến với NORMA CLASS"
          sub="Khởi đầu trải nghiệm"
          icon="🎓"
        >
          <form onSubmit={handleConfirmName} className="space-y-5">
            <p className="text-sm text-ink/80 leading-relaxed">
              Vui lòng nhập họ và tên của bạn để bắt đầu trò chơi. Tên này sẽ xuất hiện trên <b>Chứng nhận tốt nghiệp</b> và vinh danh trên <b>Bảng Xếp Hạng Kỷ Lục</b>.
            </p>
            <div>
              <label htmlFor="modal-name-input">
                <Label className="text-navy font-bold mb-2">Họ & Tên của bạn</Label>
              </label>
              <input
                id="modal-name-input"
                autoFocus
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                placeholder="VD: Nguyễn Thu Hà"
                className="w-full bg-purple-soft/10 border-2 border-navy focus:border-purple outline-none px-4 py-3 font-display text-xl sm:text-2xl italic text-ink placeholder:text-navy/30 transition shadow-inner"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <Btn
                kind="navy"
                className="w-full justify-center text-sm py-4"
                disabled={!tempName.trim()}
                onClick={handleConfirmName}
              >
                Vào trò chơi →
              </Btn>
            </div>
          </form>
        </Modal>
      )}

      <section className="bg-white text-ink px-5 py-8 sm:p-10 lg:p-16 flex flex-col justify-between gap-10 lg:gap-16 relative overflow-hidden border-b-2 lg:border-b-0 lg:border-r-2 border-navy shadow-[4px_0_16px_rgba(26,51,153,0.03)]">
        <div className="flex justify-between items-center z-10">
          <Label className="text-ink/60 font-semibold">Trò chơi mô phỏng giáo dục · v2.0</Label>
          <span className="font-mono text-xs uppercase tracking-wider px-3 py-1 bg-ochre/15 border border-ochre/40 text-ochre font-bold rounded-sm">★ {earned}/2 chứng nhận</span>
        </div>
        <div className="z-10">
          <h1 className="font-display font-black text-[clamp(4.2rem,18vw,9rem)] lg:text-[clamp(4rem,10vw,9rem)] leading-[0.85] tracking-tighter text-ink">
            NORMA<br /><span className="italic font-medium text-navy">Class<span className="text-stamp">.</span></span>
          </h1>
          <p className="mt-8 max-w-md text-ink/80 leading-relaxed font-normal">
            Trải nghiệm hai mặt của nghề giáo: thành lập cơ sở giáo dục <em className="text-navy font-semibold not-italic">đúng pháp luật</em>, và tổ chức bài dạy <em className="text-purple font-semibold not-italic">đúng học sinh</em>.
          </p>
        </div>
        <div className="max-w-md z-10">
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="pname"><Label className="text-ink/60 font-semibold">Tên người chơi</Label></label>
            <button
              onClick={() => setShowNameModal(true)}
              className="font-mono text-[10px] text-purple hover:text-navy underline uppercase tracking-wider font-bold"
            >
              ✎ Đổi tên
            </button>
          </div>
          <input
            id="pname"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="VD: Nguyễn Thu Hà"
            className="w-full bg-transparent border-b-2 border-navy focus:border-purple outline-none py-3 font-display text-2xl italic text-ink placeholder:text-navy/30 transition"
          />
          <p className="font-mono text-[10px] text-ink/50 mt-4 uppercase tracking-widest">Dành cho sinh viên sư phạm · giáo viên mới · nhà khởi nghiệp giáo dục</p>
        </div>
        {/* Purple decorative motifs */}
        <div aria-hidden className="absolute -right-20 -bottom-20 size-80 rounded-full border-2 border-purple-light/50 pointer-events-none" />
        <div aria-hidden className="absolute -right-32 -bottom-32 size-96 rounded-full border border-purple/30 pointer-events-none" />
        <div aria-hidden className="absolute top-1/4 -left-20 size-60 rounded-full bg-gradient-to-br from-purple-soft/20 to-purple-light/10 blur-2xl pointer-events-none" />
      </section>

      <section className="px-4 py-8 sm:p-10 lg:p-14 flex flex-col justify-center gap-6 bg-white overflow-y-auto">
        <div>
          <Label className="text-navy font-bold mb-3">Chọn chế độ chơi</Label>
          <div className="space-y-4">
            {modes.map((m) => (
              <article
                key={m.n}
                className="group border-2 border-navy bg-white hover:shadow-[10px_10px_0_#1a3399] hover:-translate-y-1 hover:-translate-x-1 transition shadow-sm"
              >
                <div className="grid grid-cols-[52px_1fr] sm:grid-cols-[90px_1fr]">
                  <div className="border-r-2 border-navy grid place-items-center font-display text-4xl sm:text-6xl font-black bg-purple-soft/25 text-navy group-hover:bg-navy group-hover:text-white transition">
                    {m.n}
                  </div>
                  <div className="p-5 lg:p-7">
                    <Label className="text-purple font-bold">{m.kick}</Label>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold mt-2 text-ink">{m.title}</h2>
                    <p className="mt-1 text-sm italic text-navy/80 font-medium">Vai trò: {m.role}</p>
                    <p className="mt-3 text-ink/80 text-sm leading-relaxed">{m.goal}</p>
                    <div className="flex flex-wrap items-center justify-between gap-4 mt-5">
                      <div className="flex flex-wrap gap-1.5">
                        {m.meta.map((x) => (
                          <span key={x} className="bg-purple-light/25 border border-purple/30 px-2 py-0.5 text-navy font-mono text-[10px] uppercase tracking-wider rounded-xs font-medium">
                            {x}
                          </span>
                        ))}
                      </div>
                      <Btn kind="navy" className="w-full sm:w-auto justify-center" onClick={() => handleStartMode(m.n)}>
                        Bắt đầu →
                      </Btn>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* 📊 Feature 5: Local Leaderboard (Bảng Xếp Hạng Kỷ Lục) */}
        <div className="border-2 border-navy bg-white p-5 shadow-sm mt-2">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-navy/20 pb-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">🏆</span>
              <Label className="text-navy font-bold">Bảng Xếp Hạng Kỷ Lục (Top 5)</Label>
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => setLbMode(1)}
                className={`px-3 py-1 font-mono text-[10px] uppercase font-bold border transition ${lbMode === 1 ? 'bg-navy text-white border-navy' : 'bg-white text-ink border-navy/30 hover:border-navy'}`}
              >
                Chế độ 01
              </button>
              <button
                onClick={() => setLbMode(2)}
                className={`px-3 py-1 font-mono text-[10px] uppercase font-bold border transition ${lbMode === 2 ? 'bg-navy text-white border-navy' : 'bg-white text-ink border-navy/30 hover:border-navy'}`}
              >
                Chế độ 02
              </button>
            </div>
          </div>

          {!leaderboard.length ? (
            <div className="text-center py-6 text-ink/50 text-xs font-mono">
              Chưa có lượt chơi nào trong bảng xếp hạng. Hãy hoàn thành lượt chơi đầu tiên!
            </div>
          ) : (
            <div className="space-y-2">
              {leaderboard.map((entry, index) => (
                <div key={entry.id} className="flex items-center justify-between p-2.5 bg-purple-soft/10 border border-navy/20 text-xs">
                  <div className="flex items-center gap-2.5">
                    <span className={`size-6 rounded-full grid place-items-center font-bold font-mono text-[11px] ${index === 0 ? 'bg-ochre text-white' : index === 1 ? 'bg-navy text-white' : index === 2 ? 'bg-purple text-white' : 'bg-navy/10 text-ink'}`}>
                      #{index + 1}
                    </span>
                    <div>
                      <div className="font-bold text-ink flex items-center gap-2">
                        <span>{entry.name}</span>
                        {entry.badges?.map((bId) => {
                          const badge = BADGES[bId]
                          return badge ? <span key={bId} title={badge.name}>{badge.icon}</span> : null
                        })}
                      </div>
                      <div className="text-[10px] text-ink/60 font-mono">{entry.detail} · {entry.date}</div>
                    </div>
                  </div>
                  <div className="font-display font-black text-lg text-navy">{entry.score}đ</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

