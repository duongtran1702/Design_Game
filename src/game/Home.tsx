import { Btn, Label } from './ui'

export default function Home({ name, setName, onPick, earned }: { name: string; setName: (s: string) => void; onPick: (m: 1 | 2) => void; earned: number }) {
  const modes = [
    { n: 1 as const, kick: 'Chế độ 01 · 6 bước', title: 'Khởi Nghiệp Giáo Dục', role: 'Nhà sáng lập trung tâm / trường học', goal: 'Lập bộ hồ sơ pháp lý đúng luật trong ngân sách, vượt qua Thanh Tra Mô Phỏng.', meta: ['4 mô hình', '23 hồ sơ', 'Kéo – thả'] },
    { n: 2 as const, kick: 'Chế độ 02 · 8 bước', title: 'Mô Phỏng Lớp Học', role: 'Giáo viên đứng lớp', goal: 'Thiết kế bài dạy 4 pha, quyết định khi nào dùng AI, cân bằng năng lực học sinh.', meta: ['6 bối cảnh', '4 pha', '3 chỉ số'] },
  ]
  return (
    <div className="min-h-screen grid lg:grid-cols-[1fr_1.1fr] bg-white">
      <section className="bg-white text-ink px-5 py-8 sm:p-10 lg:p-16 flex flex-col justify-between gap-10 lg:gap-16 relative overflow-hidden border-b-2 lg:border-b-0 lg:border-r-2 border-navy shadow-[4px_0_16px_rgba(26,51,153,0.03)]">
        <div className="flex justify-between items-center z-10">
          <Label className="text-ink/60 font-semibold">Trò chơi mô phỏng giáo dục · v1.0</Label>
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
          <label htmlFor="pname"><Label className="text-ink/60 mb-2 font-semibold">Tên người chơi (in trên chứng nhận)</Label></label>
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
      <section className="px-4 py-8 sm:p-10 lg:p-16 flex flex-col justify-center gap-5 lg:gap-6 bg-white">
        <Label className="text-navy font-bold">Chọn chế độ chơi</Label>
        {modes.map((m) => (
          <article
            key={m.n}
            className="group border-2 border-navy bg-white hover:shadow-[10px_10px_0_#1a3399] hover:-translate-y-1 hover:-translate-x-1 transition shadow-sm"
          >
            <div className="grid grid-cols-[52px_1fr] sm:grid-cols-[90px_1fr]">
              <div className="border-r-2 border-navy grid place-items-center font-display text-4xl sm:text-6xl font-black bg-purple-soft/25 text-navy group-hover:bg-navy group-hover:text-white transition">
                {m.n}
              </div>
              <div className="p-5 lg:p-8">
                <Label className="text-purple font-bold">{m.kick}</Label>
                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold mt-2 text-ink">{m.title}</h2>
                <p className="mt-1 text-sm italic text-navy/80 font-medium">Vai trò: {m.role}</p>
                <p className="mt-4 text-ink/80">{m.goal}</p>
                <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
                  <div className="flex flex-wrap gap-2">
                    {m.meta.map((x) => (
                      <span key={x} className="bg-purple-light/25 border border-purple/30 px-2 py-0.5 text-navy font-mono text-[10px] uppercase tracking-wider rounded-xs font-medium">
                        {x}
                      </span>
                    ))}
                  </div>
                  <Btn kind="navy" className="w-full sm:w-auto justify-center" onClick={() => onPick(m.n)}>
                    Bắt đầu →
                  </Btn>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}
