import { useState } from 'react'
import { Btn, Label, Modal } from './ui'

interface RulesAndGuideProps {
  onStartGame: (mode: 1 | 2) => void
  currentName?: string
  onRequestName?: (mode: 1 | 2) => void
}

export function RulesAndGuideSection({ onStartGame, currentName, onRequestName }: RulesAndGuideProps) {
  const [activeTab, setActiveTab] = useState<'guide' | 'rules'>('guide')
  const [selectedModeForStart, setSelectedModeForStart] = useState<1 | 2>(1)
  const [showFullModal, setShowFullModal] = useState(false)

  const handleStart = (mode: 1 | 2) => {
    if (!currentName || !currentName.trim()) {
      if (onRequestName) onRequestName(mode)
      else onStartGame(mode)
    } else {
      onStartGame(mode)
    }
  }

  return (
    <section className="border-2 border-navy bg-white p-5 sm:p-6 shadow-[6px_6px_0_#1a3399] relative overflow-hidden transition-all">
      {/* Top Banner Tag */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-navy/20 pb-4 mb-5">
        <div className="flex items-center gap-2.5">
          <span className="p-1.5 bg-ochre/15 border border-ochre/40 text-ochre text-lg rounded-xs">📜</span>
          <div>
            <Label className="text-purple font-bold">Cẩm nang chuẩn bị vào game</Label>
            <h2 className="font-display text-xl sm:text-2xl font-black text-ink">
              Cách Thức Chơi & Nội Quy Trò Chơi
            </h2>
          </div>
        </div>

        <button
          onClick={() => setShowFullModal(true)}
          className="font-mono text-xs uppercase font-bold text-navy hover:text-purple border border-navy/30 hover:border-navy px-3 py-1.5 transition flex items-center gap-1.5 bg-paper-2"
        >
          <span>🔍</span> Xem chi tiết đầy đủ
        </button>
      </div>

      {/* Tabs navigation */}
      <div className="flex gap-2 border-b-2 border-navy mb-5">
        <button
          type="button"
          onClick={() => setActiveTab('guide')}
          className={`pb-2.5 px-4 font-mono text-xs uppercase tracking-wider font-bold transition border-b-4 -mb-[2px] flex items-center gap-2 ${
            activeTab === 'guide'
              ? 'border-navy text-navy bg-purple-soft/15'
              : 'border-transparent text-ink/60 hover:text-ink'
          }`}
        >
          <span>🎮</span> Cách Thức Chơi
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('rules')}
          className={`pb-2.5 px-4 font-mono text-xs uppercase tracking-wider font-bold transition border-b-4 -mb-[2px] flex items-center gap-2 ${
            activeTab === 'rules'
              ? 'border-stamp text-stamp bg-stamp/5'
              : 'border-transparent text-ink/60 hover:text-ink'
          }`}
        >
          <span>⚖️</span> Nội Quy Bắt Buộc
        </button>
      </div>

      {/* Tab 1: Cách Thức Chơi */}
      {activeTab === 'guide' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <p className="text-sm text-ink/80 leading-relaxed font-normal">
            <b>NORMA CLASS</b> là trò chơi mô phỏng kép mô phỏng trọn vẹn 2 phương diện thực tế của ngành giáo dục:
            thành lập cơ sở đúng quy chuẩn pháp lý và điều hành lớp học thấu cảm bằng công nghệ.
          </p>

          <div className="grid sm:grid-cols-2 gap-3.5">
            {/* Chế độ 1 summary */}
            <div className="p-3.5 border-2 border-navy/30 bg-purple-soft/10 relative hover:border-navy transition">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-navy bg-navy/10 px-2 py-0.5 rounded-xs">
                  Chế độ 01 · 6 bước
                </span>
                <span className="font-display font-black text-navy text-lg">01</span>
              </div>
              <h3 className="font-display text-base font-bold text-ink">Khởi Nghiệp Giáo Dục</h3>
              <p className="text-xs text-navy/80 font-medium italic mt-0.5">Vai trò: Nhà sáng lập / Quản lý trường học</p>
              <ul className="mt-2.5 space-y-1.5 text-xs text-ink/85">
                <li className="flex items-start gap-1.5">
                  <span className="text-purple font-bold">▪</span>
                  <span><b>Bước 1-2:</b> Chọn 1 trong 4 mô hình & nhận ngân sách từ 80M - 2.5 tỷ.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-purple font-bold">▪</span>
                  <span><b>Bước 3-4:</b> Kéo thả hồ sơ pháp lý bắt buộc từ khay 33 loại; né bẫy giấy tờ giả.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-purple font-bold">▪</span>
                  <span><b>Bước 5-6:</b> Vượt kỳ Thanh Tra Mô Phỏng & giải quyết tình huống nan giải.</span>
                </li>
              </ul>
            </div>

            {/* Chế độ 2 summary */}
            <div className="p-3.5 border-2 border-navy/30 bg-purple-light/10 relative hover:border-navy transition">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-purple font-bold bg-purple/15 px-2 py-0.5 rounded-xs">
                  Chế độ 02 · 8 bước
                </span>
                <span className="font-display font-black text-purple text-lg">02</span>
              </div>
              <h3 className="font-display text-base font-bold text-ink">Mô Phỏng Lớp Học</h3>
              <p className="text-xs text-purple/90 font-medium italic mt-0.5">Vai trò: Giáo viên đứng lớp</p>
              <ul className="mt-2.5 space-y-1.5 text-xs text-ink/85">
                <li className="flex items-start gap-1.5">
                  <span className="text-purple font-bold">▪</span>
                  <span><b>Bước 1-2:</b> Chọn 1 trong 6 bối cảnh học sinh & xác định mục tiêu sư phạm.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-purple font-bold">▪</span>
                  <span><b>Bước 3-4:</b> Thiết kế 4 pha bài dạy; chọn mức độ can thiệp AI từ Cấp 0 đến Cấp 3.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-purple font-bold">▪</span>
                  <span><b>Bước 5-8:</b> Cân bằng Radar 3 chỉ số (Hiểu bài, Hứng thú, Tự chủ) & đọc Nhật ký HS.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Quy tắc tính điểm & Chứng nhận */}
          <div className="p-3 bg-ochre/10 border border-ochre/40 text-xs flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-lg">🏆</span>
              <div>
                <span className="font-bold text-ink">Thang điểm chuẩn 100đ:</span> Điểm cao nhận danh hiệu vinh danh, huy hiệu quý hiếm và Chứng nhận tốt nghiệp có giá trị định danh.
              </div>
            </div>
            <button
              onClick={() => setShowFullModal(true)}
              className="text-[11px] font-mono text-navy font-bold hover:underline"
            >
              Xem chi tiết cơ chế →
            </button>
          </div>
        </div>
      )}

      {/* Tab 2: Nội Quy Trò Chơi */}
      {activeTab === 'rules' && (
        <div className="space-y-3 animate-in fade-in duration-200">
          <p className="text-sm text-ink/80 leading-relaxed">
            Trước khi bước vào game, mỗi người chơi cần cam kết tuân thủ <b>5 Chuẩn Mực Đạo Đức & Kỷ Luật Nghề Giáo</b>:
          </p>

          <div className="space-y-2">
            {[
              {
                num: '01',
                title: 'Liêm chính pháp lý & Học thuật',
                desc: 'Tuyệt đối không dùng hồ sơ giả định, giấy phép hết hạn hoặc luồn lách kẽ hở pháp lý. Mọi sai phạm bị Đoàn thanh tra lập biên bản và trừ điểm.',
                badge: 'Nghiêm cấm vi phạm',
                color: 'text-stamp border-stamp/40 bg-stamp/5',
              },
              {
                num: '02',
                title: 'Kỷ luật tài chính & Ngân sách',
                desc: 'Chi tiêu minh bạch, tiết kiệm và nằm trong hạn mức vốn được cấp. Thâm hụt ngân sách dẫn đến đình chỉ hoạt động cơ sở.',
                badge: 'Không vượt trần vốn',
                color: 'text-ochre border-ochre/40 bg-ochre/5',
              },
              {
                num: '03',
                title: 'Đạo đức ứng dụng Trí tuệ Nhân tạo (AI)',
                desc: 'AI chỉ là công cụ hỗ trợ người thầy, không thay thế sự thấu cảm và tư duy độc lập của học trò. Lạm dụng AI Cấp 3 sẽ triệt tiêu năng lực tự chủ.',
                badge: 'AI có trách nhiệm',
                color: 'text-purple border-purple/40 bg-purple/5',
              },
              {
                num: '04',
                title: 'Lấy người học làm trung tâm',
                desc: 'Mọi quyết định sư phạm phải xuất phát từ sự thấu hiểu tâm lý, trình độ và cảm xúc thực tế của học sinh trong lớp học.',
                badge: 'Tôn trọng học sinh',
                color: 'text-navy border-navy/40 bg-navy/5',
              },
              {
                num: '05',
                title: 'Tinh thần bền bỉ & Tự hoàn thiện',
                desc: 'Mỗi lần vấp ngã là bài học nghề nghiệp. Người chơi được quyền chơi lại nhiều lần để hoàn thiện bộ năng lực sư phạm và nhận Chứng chỉ vàng.',
                badge: 'Văn hóa rút kinh nghiệm',
                color: 'text-ink border-navy/30 bg-paper-2',
              },
            ].map((rule) => (
              <div key={rule.num} className={`p-2.5 border ${rule.color} flex items-start gap-3 transition`}>
                <span className="font-mono font-bold text-xs shrink-0 size-6 rounded-full bg-navy text-white grid place-items-center">
                  {rule.num}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <h4 className="font-display font-bold text-xs sm:text-sm text-ink">{rule.title}</h4>
                    <span className="font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 border border-current font-semibold">
                      {rule.badge}
                    </span>
                  </div>
                  <p className="text-xs text-ink/75 mt-0.5 leading-snug">{rule.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 🚀 ACTION CALLOUT & START BUTTON */}
      <div className="mt-5 pt-4 border-t-2 border-navy/20 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-purple-soft/10 -mx-5 -mb-5 p-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block size-2 rounded-full bg-stamp animate-ping" />
            <Label className="text-navy font-bold">Đã sẵn sàng tham gia thử thách?</Label>
          </div>
          <p className="text-xs text-ink/70 mt-0.5">
            Chọn chế độ và nhấn nút Start để bắt đầu hành trình của bạn ngay.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <select
            value={selectedModeForStart}
            onChange={(e) => setSelectedModeForStart(Number(e.target.value) as 1 | 2)}
            className="bg-white border-2 border-navy text-xs font-mono font-bold px-3 py-3 outline-none focus:border-purple text-navy"
            aria-label="Chọn chế độ bắt đầu"
          >
            <option value={1}>Chế độ 01: Khởi Nghiệp</option>
            <option value={2}>Chế độ 02: Lớp Học AI</option>
          </select>

          <button
            id="btn-start-game-main"
            type="button"
            onClick={() => handleStart(selectedModeForStart)}
            className="bg-navy hover:bg-navy-dark text-white px-5 py-3 font-mono text-xs uppercase tracking-[0.16em] font-black shadow-[4px_4px_0_#b366d4] hover:shadow-[2px_2px_0_#b366d4] hover:translate-x-[2px] hover:translate-y-[2px] transition flex items-center justify-center gap-2 active:scale-95"
          >
            <span>▶</span>
            <span>START GAME</span>
          </button>
        </div>
      </div>

      {/* Full Modal Popup for deep dive into rules and gameplay */}
      {showFullModal && (
        <GameRulesModal
          isOpen={showFullModal}
          onClose={() => setShowFullModal(false)}
          onStart={(m) => {
            setShowFullModal(false)
            handleStart(m)
          }}
        />
      )}
    </section>
  )
}

/** Full Detailed Rules and Gameplay Modal */
export function GameRulesModal({
  isOpen,
  onClose,
  onStart,
}: {
  isOpen: boolean
  onClose: () => void
  onStart: (m: 1 | 2) => void
}) {
  const [tab, setTab] = useState<'m1' | 'm2' | 'rules'>('m1')

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Cẩm Nang Trò Chơi & Nội Quy NORMA CLASS"
      sub="Hướng dẫn nhập môn chi tiết"
      icon="📖"
    >
      <div className="space-y-5">
        {/* Navigation sub-tabs */}
        <div className="flex border-b-2 border-navy gap-2">
          <button
            onClick={() => setTab('m1')}
            className={`pb-2 px-3 font-mono text-xs uppercase font-bold transition border-b-4 -mb-[2px] ${
              tab === 'm1' ? 'border-navy text-navy font-black' : 'border-transparent text-ink/60 hover:text-ink'
            }`}
          >
            Chế độ 01: Khởi Nghiệp
          </button>
          <button
            onClick={() => setTab('m2')}
            className={`pb-2 px-3 font-mono text-xs uppercase font-bold transition border-b-4 -mb-[2px] ${
              tab === 'm2' ? 'border-purple text-purple font-black' : 'border-transparent text-ink/60 hover:text-ink'
            }`}
          >
            Chế độ 02: Lớp Học AI
          </button>
          <button
            onClick={() => setTab('rules')}
            className={`pb-2 px-3 font-mono text-xs uppercase font-bold transition border-b-4 -mb-[2px] ${
              tab === 'rules' ? 'border-stamp text-stamp font-black' : 'border-transparent text-ink/60 hover:text-ink'
            }`}
          >
            Nội Quy & Đạo Đức
          </button>
        </div>

        {tab === 'm1' && (
          <div className="space-y-3.5 text-xs text-ink/85 leading-relaxed max-h-[50vh] overflow-y-auto pr-1">
            <div className="p-3 bg-navy/5 border border-navy/20">
              <h4 className="font-bold text-sm text-navy mb-1">Mục tiêu Chế độ 01</h4>
              <p>
                Xây dựng bộ hồ sơ pháp lý hoàn chỉnh cho cơ sở giáo dục đã chọn trong khuôn khổ ngân sách được giao.
                Tránh bẫy pháp lý và vượt qua vòng thẩm định của Đoàn Thanh Tra Mô Phỏng.
              </p>
            </div>

            <h5 className="font-bold font-mono uppercase text-navy text-[11px]">Tiến trình 6 bước:</h5>
            <ol className="space-y-2 list-decimal list-inside pl-1">
              <li><b>Chọn mô hình:</b> Chọn 1 trong 4 loại hình (Nhóm trẻ, Ngoại ngữ, Kỹ năng sống, Tiểu học). Mỗi mô hình có quy định số lượng hồ sơ khác nhau.</li>
              <li><b>Cấp ngân sách ban đầu:</b> Nắm rõ số vốn đầu tư để cân đối chi tiêu các hồ sơ thẩm định và cơ sở vật chất.</li>
              <li><b>Mở Khay Công Cụ Pháp Lý:</b> Tiếp cận danh mục 33 hồ sơ và bẫy pháp lý thường gặp ngoài thực tế.</li>
              <li><b>Kéo – Thả hồ sơ:</b> Chọn đúng các văn bản bắt buộc (Giấy phép PCCC, Quyết định thành lập, Giáo trình thẩm định...).</li>
              <li><b>Kiểm tra tính hợp lệ & Thanh tra:</b> Đối chiếu quy định pháp luật (Luật GD 2019, Nghị định 46, Nghị định 135). Bị xử phạt nếu thiếu giấy tờ hoặc thừa giấy tờ sai.</li>
              <li><b>Xử lý Tình huống Nan giải & Nhận Chứng nhận:</b> Đưa ra quyết định đạo đức trước các vấn đề thực tiễn để hoàn thành cấp phép.</li>
            </ol>

            <div className="p-2.5 bg-ochre/15 border border-ochre/30 text-ink">
              💡 <b>Mẹo đạt điểm tối đa:</b> Kiểm tra kỹ cơ quan cấp phép ghi trên văn bản (UBND Quận/Huyện hay Sở GD&ĐT) để không dính bẫy giả mạo.
            </div>

            <div className="pt-2">
              <Btn kind="navy" className="w-full justify-center py-3 text-xs" onClick={() => onStart(1)}>
                ▶ BẮT ĐẦU CHẾ ĐỘ 01 NGAY
              </Btn>
            </div>
          </div>
        )}

        {tab === 'm2' && (
          <div className="space-y-3.5 text-xs text-ink/85 leading-relaxed max-h-[50vh] overflow-y-auto pr-1">
            <div className="p-3 bg-purple/10 border border-purple/30">
              <h4 className="font-bold text-sm text-purple mb-1">Mục tiêu Chế độ 02</h4>
              <p>
                Tổ chức một tiết dạy mô phỏng thành công bằng cách cân bằng 3 chỉ số then chốt: <b>Hiểu bài</b>, <b>Hứng thú</b> và <b>Tự chủ</b>. Quyết định mức can thiệp AI phù hợp với từng pha sư phạm.
              </p>
            </div>

            <h5 className="font-bold font-mono uppercase text-purple text-[11px]">Tiến trình 8 bước:</h5>
            <ol className="space-y-2 list-decimal list-inside pl-1">
              <li><b>Bối cảnh lớp học:</b> Tiếp nhận lớp học ngẫu nhiên (Lớp đông 45 HS, Lớp lệch trình độ, Lớp mất tập trung...).</li>
              <li><b>Xác định mục tiêu:</b> Chọn ưu tiên phát triển năng lực tư duy, cảm hứng học tập hay kỹ năng tự học.</li>
              <li><b>Thiết kế 4 pha sư phạm:</b> Lên kịch bản cho Khởi động, Khám phá, Luyện tập và Vận dụng.</li>
              <li><b>Quyết định cấp độ AI:</b> Chọn từ Cấp 0 (Không dùng AI) đến Cấp 3 (AI tự động hóa hoàn toàn).</li>
              <li><b>Đo lường phản ứng học sinh:</b> Quan sát biểu đồ Radar và biến thiên của 3 chỉ số.</li>
              <li><b>Lắng nghe Nhật Ký Học Sinh:</b> Đọc phản hồi chân thực từ các em học sinh về trải nghiệm tiết học.</li>
              <li><b>Ngã rẽ sư phạm:</b> Xử lý tình huống bất ngờ nảy sinh trong lớp học.</li>
              <li><b>Nhận Chứng nhận Năng Lực Sư Phạm:</b> Vinh danh với hồ sơ giảng dạy tiêu biểu.</li>
            </ol>

            <div className="p-2.5 bg-purple-soft/30 border border-purple/30 text-ink">
              💡 <b>Mẹo sư phạm:</b> Không nên lạm dụng AI Cấp 3 ở cả 4 pha vì học sinh sẽ trở nên thụ động và giảm chỉ số Tự chủ!
            </div>

            <div className="pt-2">
              <Btn kind="navy" className="w-full justify-center py-3 text-xs" onClick={() => onStart(2)}>
                ▶ BẮT ĐẦU CHẾ ĐỘ 02 NGAY
              </Btn>
            </div>
          </div>
        )}

        {tab === 'rules' && (
          <div className="space-y-3.5 text-xs text-ink/85 leading-relaxed max-h-[50vh] overflow-y-auto pr-1">
            <div className="p-3 bg-stamp/5 border border-stamp/30 text-stamp">
              <h4 className="font-bold text-sm mb-1">Quy định Kỷ luật & Đạo đức Sư phạm</h4>
              <p className="text-ink/80">
                Mỗi lượt chơi là một bài kiểm tra nghiêm túc về lương tâm và trách nhiệm người làm giáo dục. Mọi vi phạm nguyên tắc sẽ ảnh hưởng trực tiếp đến kết quả thẩm định.
              </p>
            </div>

            <div className="space-y-2">
              <div className="border border-navy/20 p-2.5">
                <b className="text-navy">1. Quy tắc Ngân sách:</b> Không được phép thanh toán vượt ngân sách thực tế. Cơ sở giáo dục phá sản sẽ phải dừng trò chơi ngay lập tức.
              </div>
              <div className="border border-navy/20 p-2.5">
                <b className="text-navy">2. Quy tắc Hồ sơ:</b> Nghiêm cấm mua bán giấy tờ giả, làm giả chữ ký hay dùng giấy phép không đúng ngành nghề đăng ký.
              </div>
              <div className="border border-navy/20 p-2.5">
                <b className="text-navy">3. Quy tắc Đạo đức AI:</b> Không phó mặc toàn bộ quá trình giáo dục cho máy móc. Giáo viên là người giữ ngọn lửa cảm xúc và định hướng nhân cách.
              </div>
              <div className="border border-navy/20 p-2.5">
                <b className="text-navy">4. Tôn trọng cá tính học sinh:</b> Không kỳ thị học sinh cá biệt hay học sinh yếu; khuyến khích phát triển tiềm năng riêng biệt.
              </div>
              <div className="border border-navy/20 p-2.5">
                <b className="text-navy">5. Trung thực trong đánh giá:</b> Không gian lận điểm số hay thành tích ảo để lọt vào Bảng Kỷ Lục.
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Btn kind="paper" className="flex-1 justify-center py-3 text-xs" onClick={() => onStart(1)}>
                Chơi Chế độ 1 →
              </Btn>
              <Btn kind="navy" className="flex-1 justify-center py-3 text-xs" onClick={() => onStart(2)}>
                Chơi Chế độ 2 →
              </Btn>
            </div>
          </div>
        )}
      </div>
    </Modal>
  )
}

/** Pre-Game Briefing Modal with direct START confirmation */
export function PreGameBriefingModal({
  isOpen,
  mode,
  playerName,
  onClose,
  onConfirmStart,
}: {
  isOpen: boolean
  mode: 1 | 2
  playerName: string
  onClose: () => void
  onConfirmStart: () => void
}) {
  const [agreed, setAgreed] = useState(true)

  const info = {
    1: {
      title: 'Chế độ 01: Khởi Nghiệp Giáo Dục',
      role: 'Nhà sáng lập cơ sở giáo dục',
      stepsCount: '6 bước',
      rulesHighlight: [
        'Quản lý ngân sách nghiêm ngặt, không để thâm hụt tài chính.',
        'Chọn lọc hồ sơ pháp lý chuẩn chỉnh, nhận diện bẫy giấy tờ trái thẩm quyền.',
        'Đoàn thanh tra sẽ áp dụng các Nghị định pháp lý hiện hành để xử phạt nếu vi phạm.',
      ],
      mission: 'Hoàn thiện hồ sơ pháp lý, vượt qua kỳ thanh tra gắt gao và đưa cơ sở vào hoạt động hợp pháp.',
    },
    2: {
      title: 'Chế độ 02: Mô Phỏng Lớp Học',
      role: 'Giáo viên đứng lớp',
      stepsCount: '8 bước',
      rulesHighlight: [
        'Cân bằng 3 chỉ số then chốt: Hiểu bài, Hứng thú và Tự chủ của học sinh.',
        'Chọn mức can thiệp AI (Level 0 - 3) phù hợp với thực tế sư phạm, không lạm dụng máy móc.',
        'Lắng nghe phản hồi từ Nhật ký học sinh và đưa ra quyết định sư phạm thấu cảm.',
      ],
      mission: 'Thiết kế bài dạy 4 pha, ứng dụng AI có đạo đức và nâng cao chất lượng học tập của lớp học.',
    },
  }[mode]

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={info.title}
      sub="Xác nhận trước khi vào game"
      icon={mode === 1 ? '🏢' : '👩‍🏫'}
    >
      <div className="space-y-4">
        {/* Player identification */}
        <div className="p-3 bg-purple-soft/15 border border-navy/20 flex items-center justify-between">
          <div>
            <Label className="text-purple font-bold">Người chơi tham gia</Label>
            <div className="font-display font-bold text-lg text-ink italic">{playerName || 'Người chơi ẩn danh'}</div>
          </div>
          <span className="font-mono text-xs px-2.5 py-1 bg-navy text-white font-bold rounded-xs">
            {info.stepsCount}
          </span>
        </div>

        {/* Mission */}
        <div>
          <Label className="text-navy font-bold mb-1">Mục tiêu & Vai trò</Label>
          <p className="text-xs text-ink/80 leading-relaxed">
            <b>Vai trò:</b> {info.role}.<br />
            <b>Nhiệm vụ:</b> {info.mission}
          </p>
        </div>

        {/* Rules Checklist */}
        <div className="border-2 border-navy/25 bg-paper-2 p-3.5 space-y-2">
          <Label className="text-stamp font-bold flex items-center gap-1.5">
            <span>⚖️</span> Lưu ý nội quy cốt lõi
          </Label>
          <ul className="space-y-1.5 text-xs text-ink/85">
            {info.rulesHighlight.map((rule, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-navy font-bold">✓</span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Commitment checkbox */}
        <label className="flex items-start gap-2.5 p-2.5 border border-navy/20 bg-white cursor-pointer hover:bg-purple-soft/10 transition select-none">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 size-4 accent-navy rounded-xs"
          />
          <span className="text-xs text-ink/90 leading-tight">
            Tôi đã nắm rõ <b>cách thức chơi</b> và cam kết <b>tuân thủ nội quy</b> trò chơi.
          </span>
        </label>

        {/* Action button */}
        <div className="flex gap-3 pt-2">
          <Btn kind="ghost" className="justify-center py-3.5 text-xs" onClick={onClose}>
            Quay lại
          </Btn>
          <button
            type="button"
            disabled={!agreed}
            onClick={onConfirmStart}
            className="flex-1 bg-navy hover:bg-navy-dark text-white py-3.5 px-6 font-mono text-xs uppercase tracking-[0.18em] font-black shadow-[4px_4px_0_#b366d4] hover:shadow-[2px_2px_0_#b366d4] hover:translate-x-[2px] hover:translate-y-[2px] transition flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span>▶</span>
            <span>BẮT ĐẦU VÀO GAME (START)</span>
          </button>
        </div>
      </div>
    </Modal>
  )
}
