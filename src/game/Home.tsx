import { Btn, Label } from './ui'

export default function Home({ name, setName, onPick, earned }: { name: string; setName: (s: string) => void; onPick: (m: 1 | 2) => void; earned: number }) {
  const modes = [
    { n: 1 as const, kick: 'Chế độ 01 · 6 bước', title: 'Khởi Nghiệp Giáo Dục', role: 'Nhà sáng lập trung tâm / trường học', goal: 'Lập bộ hồ sơ pháp lý đúng luật trong ngân sách, vượt qua Thanh Tra Mô Phỏng.', meta: ['4 mô hình', '23 hồ sơ', 'Kéo – thả'] },
    { n: 2 as const, kick: 'Chế độ 02 · 8 bước', title: 'Mô Phỏng Lớp Học', role: 'Giáo viên đứng lớp', goal: 'Thiết kế bài dạy 4 pha, quyết định khi nào dùng AI, cân bằng năng lực học sinh.', meta: ['6 bối cảnh', '4 pha', '3 chỉ số'] },
  ]
  return (
    <div className="min-h-screen grid lg:grid-cols-[1fr_1.1fr]">
      <section className="bg-ink text-paper px-5 py-8 sm:p-10 lg:p-16 flex flex-col justify-between gap-10 lg:gap-16 relative overflow-hidden">
        <div className="flex justify-between items-center"><Label className="text-paper/50">Trò chơi mô phỏng giáo dục · v1.0</Label><Label className="text-ochre">{earned}/2 chứng nhận</Label></div>
        <div>
          <h1 className="font-display font-black text-[clamp(4.2rem,18vw,9rem)] lg:text-[clamp(4rem,10vw,9rem)] leading-[0.85] tracking-tighter">NORMA<br /><span className="italic font-medium text-stamp">Class.</span></h1>
          <p className="mt-8 max-w-md text-paper/70 leading-relaxed">Trải nghiệm hai mặt của nghề giáo: thành lập cơ sở giáo dục <em className="text-paper">đúng pháp luật</em>, và tổ chức bài dạy <em className="text-paper">đúng học sinh</em>.</p>
        </div>
        <div className="max-w-md">
          <label htmlFor="pname"><Label className="text-paper/50 mb-2">Tên người chơi (in trên chứng nhận)</Label></label>
          <input id="pname" value={name} onChange={(e) => setName(e.target.value)} placeholder="VD: Nguyễn Thu Hà" className="w-full bg-transparent border-b border-paper/30 focus:border-stamp outline-none py-3 font-display text-2xl italic placeholder:text-paper/25 transition" />
          <p className="font-mono text-[10px] text-paper/40 mt-4 uppercase tracking-widest">Dành cho sinh viên sư phạm · giáo viên mới · nhà khởi nghiệp giáo dục</p>
        </div>
        <div aria-hidden className="absolute -right-20 -bottom-20 size-80 rounded-full border border-paper/10" />
      </section>
      <section className="px-4 py-8 sm:p-10 lg:p-16 flex flex-col justify-center gap-5 lg:gap-6">
        <Label className="text-ink/50">Chọn chế độ chơi</Label>
        {modes.map((m) => (
          <article key={m.n} className="group border border-ink bg-[#faf8f1] hover:shadow-[10px_10px_0_#14251f] hover:-translate-y-1 hover:-translate-x-1 transition">
            <div className="grid grid-cols-[52px_1fr] sm:grid-cols-[90px_1fr]">
              <div className="border-r border-ink grid place-items-center font-display text-4xl sm:text-6xl font-black group-hover:bg-stamp group-hover:text-paper transition">{m.n}</div>
              <div className="p-5 lg:p-8">
                <Label className="text-stamp">{m.kick}</Label>
                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold mt-2">{m.title}</h2>
                <p className="mt-1 text-sm italic text-ink/60">Vai trò: {m.role}</p>
                <p className="mt-4 text-ink/80">{m.goal}</p>
                <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
                  <div className="flex gap-4 font-mono text-[10px] uppercase tracking-wider text-ink/50">{m.meta.map((x) => <span key={x}>{x}</span>)}</div>
                  <Btn className="w-full sm:w-auto justify-center" onClick={() => onPick(m.n)}>Bắt đầu →</Btn>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}
