export type Model = { id: string; name: string; desc: string; stars: number; budget: number; req: string[] }
export type Doc = { id: string; name: string; cost: number; type: string; law?: string; result?: string }

export const DOCS: Doc[] = [
  { id: 'D01', name: 'Đơn đề nghị cấp phép hoạt động giáo dục', cost: 500_000, type: 'Giấy tờ', law: 'Nghị định 125/2024/NĐ-CP, Điều 49 & 50', result: 'Không được tiếp nhận và xét duyệt hồ sơ theo quy định mới' },
  { id: 'D02', name: 'Giấy chứng nhận đăng ký doanh nghiệp / tổ chức', cost: 2_000_000, type: 'Giấy tờ', law: 'Luật Doanh nghiệp 2020 & Luật Giáo dục 2019', result: 'Phạt 10-20 triệu đồng, đình chỉ hoạt động do thiếu tư cách pháp nhân' },
  { id: 'D03', name: 'Đề án tổ chức và hoạt động giáo dục chi tiết', cost: 5_000_000, type: 'Giấy tờ', law: 'Nghị định 125/2024/NĐ-CP, Điều 50', result: 'Không đủ điều kiện thẩm định năng lực và quy mô hoạt động' },
  { id: 'D04', name: 'Chương trình, giáo trình đào tạo được thẩm định', cost: 3_000_000, type: 'Giấy tờ', law: 'Nghị định 125/2024/NĐ-CP & Thông tư 21/2018/TT-BGDĐT', result: 'Chương trình không được cấp phép, buộc dừng giảng dạy' },
  { id: 'D05', name: 'Quyết định cho phép hoạt động giáo dục (Sở GD&ĐT)', cost: 10_000_000, type: 'Giấy phép', law: 'Nghị định 125/2024/NĐ-CP, Điều 50 & NĐ 04/2021/NĐ-CP, Điều 6', result: 'Phạt 30-50 triệu đồng, buộc dừng hoạt động và trả lại học phí' },
  { id: 'D06', name: 'Văn bản nghiệm thu / thẩm duyệt PCCC đạt chuẩn', cost: 15_000_000, type: 'An toàn', law: 'Nghị định 136/2020/NĐ-CP & Nghị định 50/2024/NĐ-CP', result: 'Đình chỉ cơ sở ngay lập tức do không bảo đảm an toàn tính mạng' },
  { id: 'D07', name: 'Giấy chứng nhận cơ sở đủ điều kiện ATTP', cost: 8_000_000, type: 'An toàn', law: 'Luật An toàn thực phẩm 2010 & Nghị định 15/2018/NĐ-CP', result: 'Phạt 20-30 triệu đồng, đình chỉ bếp ăn bán trú' },
  { id: 'D08', name: 'Hợp đồng thuê mặt bằng ổn định (thời hạn ≥ 5 năm)', cost: 50_000_000, type: 'Cơ sở', law: 'Nghị định 125/2024/NĐ-CP, Điều 49', result: 'Không chứng minh được địa điểm hoạt động giáo dục ổn định' },
  { id: 'D09', name: 'Bản vẽ mặt bằng & thẩm định cơ sở vật chất', cost: 10_000_000, type: 'Cơ sở', law: 'Thông tư 52/2020/TT-BGDĐT & QCVN 06:2022/BXD', result: 'Không bảo đảm định mức diện tích phòng học / học sinh' },
  { id: 'D10', name: 'Bằng tốt nghiệp cử nhân sư phạm của giáo viên', cost: 3_000_000, type: 'Nhân sự', law: 'Luật Giáo dục 2019, Điều 72', result: 'Giáo viên không đạt chuẩn trình độ, xử phạt 5-10 triệu đồng/GV' },
  { id: 'D11', name: 'Hợp đồng lao động và đóng BHXH cho giáo viên', cost: 5_000_000, type: 'Nhân sự', law: 'Bộ luật Lao động 2019 & Nghị định 12/2022/NĐ-CP', result: 'Xử phạt vi phạm quy định về sử dụng lao động giáo dục' },
  { id: 'D12', name: 'Lý lịch tư pháp & hồ sơ Giám đốc / Người đứng đầu', cost: 500_000, type: 'Giấy tờ', law: 'Nghị định 125/2024/NĐ-CP, Điều 51', result: 'Người đứng đầu không đủ điều kiện và tiêu chuẩn quản lý' },
  { id: 'D13', name: 'Hồ sơ khám sức khỏe định kỳ nhân sự cơ sở', cost: 2_000_000, type: 'Nhân sự', law: 'Thông tư liên tịch 13/2016/TTLT-BYT-BGDĐT & Thông tư 32/2023/TT-BYT', result: 'Nguy cơ lây nhiễm dịch bệnh cho học sinh và trẻ nhỏ' },
  { id: 'D14', name: 'Nội quy học tập và quy chế hoạt động nội bộ', cost: 1_000_000, type: 'Giấy tờ', law: 'Nghị định 125/2024/NĐ-CP, Điều 50', result: 'Thiếu căn cứ quản lý kỷ luật và bảo đảm trật tự lớp học' },
  { id: 'D15', name: 'Niêm yết công khai mức thu học phí & dịch vụ', cost: 500_000, type: 'Giấy tờ', law: 'Thông tư 09/2024/TT-BGDĐT & Nghị định 04/2021/NĐ-CP, Điều 8', result: 'Phạt 10-20 triệu đồng do vi phạm quy chế ba công khai tài chính' },
  { id: 'D16', name: 'Hợp đồng bảo hiểm tai nạn học sinh / học viên', cost: 10_000_000, type: 'An toàn', law: 'Nghị định 80/2017/NĐ-CP (Môi trường giáo dục an toàn)', result: 'Cơ sở phải tự bồi thường toàn bộ rủi ro khi phát sinh tai nạn' },
  { id: 'D17', name: 'Chứng chỉ ngoại ngữ quốc tế & nghiệp vụ của GV', cost: 5_000_000, type: 'Chuyên môn', law: 'Thông tư 21/2018/TT-BGDĐT, Điều 18 & NĐ 125/2024/NĐ-CP', result: 'Không đủ điều kiện giảng dạy ngoại ngữ chuyên sâu' },
  { id: 'D18', name: 'Trang thiết bị thực hành STEM / Tin học đạt chuẩn', cost: 80_000_000, type: 'Thiết bị', law: 'Nghị định 125/2024/NĐ-CP, Điều 49', result: 'Không đáp ứng điều kiện dạy học thực hành công nghệ số' },
  { id: 'D19', name: 'Quyết định thành lập trường mầm non của UBND Quận/Huyện', cost: 10_000_000, type: 'Giấy phép', law: 'Luật Giáo dục 2019, Điều 47 & Nghị định 125/2024/NĐ-CP, Điều 4', result: 'Phạt 40-60 triệu đồng, buộc giải thể trường mầm non trái phép' },
  { id: 'D20', name: 'Hợp đồng nhân viên y tế trường học có chứng chỉ', cost: 15_000_000, type: 'Nhân sự', law: 'Thông tư liên tịch 13/2016/TTLT-BYT-BGDĐT, Điều 8', result: 'Không kịp thời xử lý tai nạn thương tích hoặc ngộ độc ở trường' },
  { id: 'D21', name: 'Khu vui chơi ngoài trời bảo đảm an toàn cho trẻ', cost: 30_000_000, type: 'Cơ sở', law: 'Thông tư 52/2020/TT-BGDĐT, Điều 31', result: 'Vi phạm điều kiện cơ sở vật chất đối với trường mầm non' },
  { id: 'D22', name: 'Bếp ăn bán trú đạt nguyên tắc một chiều', cost: 40_000_000, type: 'Cơ sở', law: 'Thông tư 52/2020/TT-BGDĐT, Điều 32', result: 'Nguy cơ nhiễm khuẩn chéo, không được cấp phép tổ chức bán trú' },
  // --- Các hồ sơ tạo nhiễu, giấy tờ gần giống, bẫy ngân sách ---
  { id: 'D23', name: 'Giấy phép dịch vụ tư vấn du học & việc làm', cost: 5_000_000, type: 'Giấy phép', law: 'Hồ sơ tạo nhiễu', result: 'Giấy phép này không dùng để mở lớp dạy ngoại ngữ, kỹ năng hay mầm non!' },
  { id: 'D24', name: 'Giấy đăng ký Hộ kinh doanh cá thể ngành giáo dục', cost: 1_000_000, type: 'Giấy tờ', law: 'Nghị định 125/2024/NĐ-CP', result: 'Bẫy giấy tờ: Hộ kinh doanh không có tư cách pháp nhân để mở cơ sở giáo dục độc lập!' },
  { id: 'D25', name: 'Hợp đồng thuê mặt bằng 1 năm (kèm điều khoản gia hạn)', cost: 12_000_000, type: 'Cơ sở', law: 'Nghị định 125/2024/NĐ-CP, Điều 49', result: 'Bẫy cơ sở: Quy định yêu cầu địa điểm ổn định dài hạn (tối thiểu 5 năm), thuê 1 năm bị từ chối cấp phép!' },
  { id: 'D26', name: 'Biên bản kiểm tra an toàn PCCC của Công an Phường', cost: 3_000_000, type: 'An toàn', law: 'Nghị định 136/2020/NĐ-CP & NĐ 50/2024/NĐ-CP', result: 'Bẫy thẩm quyền: Cấp phép trường/trung tâm phải có văn bản thẩm duyệt của Cảnh sát PCCC cấp Tỉnh/TP!' },
  { id: 'D27', name: 'Chứng chỉ bồi dưỡng kỹ năng giảng dạy online (1 tuần)', cost: 2_000_000, type: 'Nhân sự', law: 'Luật Giáo dục 2019, Điều 72', result: 'Bẫy trình độ: Khóa học ngắn hạn cấp tốc không đáp ứng chuẩn trình độ cử nhân theo Luật Giáo dục!' },
  { id: 'D28', name: 'Chứng nhận hệ thống quản lý chất lượng ISO 9001:2015', cost: 25_000_000, type: 'Giấy tờ', law: 'Hồ sơ tự nguyện', result: 'Bẫy ngân sách: Chứng nhận ISO là hoạt động tự nguyện của doanh nghiệp, không nằm trong hồ sơ xin cấp phép của Sở GD&ĐT!' },
  { id: 'D29', name: 'Hợp đồng nhượng quyền thương hiệu quốc tế (Franchise)', cost: 40_000_000, type: 'Chuyên môn', law: 'Luật Thương mại 2005', result: 'Bẫy lãng phí: Nhượng quyền là giao dịch thương mại dân sự, không thay thế cho hồ sơ pháp lý theo quy định Bộ GD&ĐT!' },
  { id: 'D30', name: 'Giấy phép dạy thêm, học thêm do Phòng GD&ĐT cấp', cost: 4_000_000, type: 'Giấy phép', law: 'Thông tư 17/2012/TT-BGDĐT', result: 'Bẫy đối tượng: Chỉ cấp cho cá nhân dạy thêm văn hóa phổ thông, không dùng cho trung tâm chuyên biệt hay trường mầm non!' },
  { id: 'D31', name: 'Giấy chứng nhận tập huấn sơ cấp cứu Hội Chữ Thập Đỏ', cost: 2_500_000, type: 'Nhân sự', law: 'Thông tư liên tịch 13/2016/TTLT-BYT-BGDĐT', result: 'Bẫy chức danh: Tập huấn sơ cứu không thay thế được nhân viên y tế có bằng trung cấp y/y sĩ chuyên môn!' },
  { id: 'D32', name: 'Bản cam kết tài chính & bảo lãnh tài sản của gia đình', cost: 3_000_000, type: 'Giấy tờ', law: 'Nghị định 125/2024/NĐ-CP', result: 'Bẫy thừa: Hồ sơ cấp phép yêu cầu vốn pháp định/vốn đầu tư hợp pháp của tổ chức, không thu cam kết cá nhân!' },
  { id: 'D33', name: 'Giấy phép phân phối thiết bị đồ chơi & giáo cụ học tập', cost: 6_000_000, type: 'Giấy phép', law: 'Bộ Công thương', result: 'Bẫy ngành nghề: Đây là giấy phép bán buôn đồ chơi, không liên quan đến điều kiện cấp phép hoạt động dạy học!' },
]

const BASE = ['D01', 'D02', 'D03', 'D04', 'D05', 'D06', 'D08', 'D10', 'D11', 'D12', 'D14', 'D15']
export const MODELS: Model[] = [
  { id: 'M1', name: 'Trung tâm ngoại ngữ', desc: 'Dạy tiếng Anh, tiếng Hàn, tiếng Nhật… cho người lớn & trẻ em.', stars: 2, budget: 200_000_000, req: [...BASE, 'D17'] },
  { id: 'M2', name: 'Trung tâm kỹ năng sống', desc: 'Kỹ năng mềm, giao tiếp, lãnh đạo cho học sinh phổ thông.', stars: 2, budget: 150_000_000, req: BASE },
  { id: 'M3', name: 'Trường mầm non tư thục', desc: 'Chăm sóc & giáo dục trẻ 3–6 tuổi, hoạt động cả ngày.', stars: 3, budget: 500_000_000, req: [...BASE, 'D07', 'D09', 'D13', 'D16', 'D19', 'D20', 'D21', 'D22'] },
  { id: 'M4', name: 'Trung tâm STEM / Tin học', desc: 'Lập trình, robotics, khoa học ứng dụng cho trẻ em.', stars: 2, budget: 300_000_000, req: [...BASE, 'D18'] },
]

export const vnd = (n: number) => n.toLocaleString('vi-VN') + ' ₫'

// ---------- Mode 2 ----------
export type Ctx = { id: string; name: string; level: string; size: number; traits: string[]; projector: boolean; pcs: string; internet: 'Có' | 'Không' | 'Yếu' }
export const CONTEXTS: Ctx[] = [
  { id: 'C1', name: 'Lớp 5A – Tiểu học trung tâm', level: 'Tiểu học', size: 35, traits: ['Đa số khá giỏi', '3 HS rối loạn tăng động', '2 HS nước ngoài chưa giỏi tiếng Việt'], projector: true, pcs: '1 phòng chung', internet: 'Có' },
  { id: 'C2', name: 'Lớp 8B – THCS vùng ven', level: 'THCS', size: 40, traits: ['10 HS yếu môn Toán', '5 HS hay nghỉ học', 'Lớp ồn ào'], projector: true, pcs: 'Không', internet: 'Yếu' },
  { id: 'C3', name: 'Lớp 10C – THPT chuyên', level: 'THPT', size: 30, traits: ['Toàn HS giỏi', 'Cạnh tranh cao', '4 HS có biểu hiện áp lực tâm lý'], projector: true, pcs: 'Có', internet: 'Có' },
  { id: 'C4', name: 'Lớp 3D – Tiểu học nông thôn', level: 'Tiểu học', size: 25, traits: ['Cơ sở vật chất thiếu thốn', '8 HS dân tộc thiểu số', 'Chưa có máy tính'], projector: false, pcs: 'Không', internet: 'Không' },
  { id: 'C5', name: 'Lớp 11E – THPT dân lập', level: 'THPT', size: 45, traits: ['Sĩ số đông', 'Trình độ không đồng đều', '6 HS làm thêm ngoài giờ'], projector: true, pcs: '1 phòng chung', internet: 'Có' },
  { id: 'C6', name: 'Lớp 7F – THCS quốc tế', level: 'THCS', size: 20, traits: ['Song ngữ', 'HS quen công nghệ', '3 HS mới chuyển từ nước ngoài về'], projector: true, pcs: 'Có', internet: 'Có' },
]

export type Obj = { id: string; text: string; type: 'Kiến thức' | 'Kỹ năng' | 'Năng lực số' | 'Thái độ'; ctx: string[] | 'all' }
export const OBJECTIVES: Obj[] = [
  { id: 'O1', text: 'Trình bày được kiến thức cốt lõi của bài học', type: 'Kiến thức', ctx: 'all' },
  { id: 'O2', text: 'Vận dụng kiến thức giải quyết tình huống thực tế', type: 'Kỹ năng', ctx: 'all' },
  { id: 'O3', text: 'Biết cách tra cứu thông tin bằng công cụ số', type: 'Năng lực số', ctx: ['C1', 'C3', 'C5', 'C6'] },
  { id: 'O4', text: 'Làm việc nhóm hiệu quả, phân công vai trò', type: 'Kỹ năng', ctx: 'all' },
  { id: 'O5', text: 'Phát triển tư duy phản biện qua tranh luận', type: 'Kỹ năng', ctx: ['C2', 'C3', 'C5', 'C6'] },
  { id: 'O6', text: 'Thực hành sáng tạo sản phẩm học tập', type: 'Kỹ năng', ctx: 'all' },
  { id: 'O7', text: 'Hỗ trợ bạn yếu hơn trong quá trình học', type: 'Thái độ', ctx: ['C1', 'C2', 'C4', 'C5'] },
  { id: 'O8', text: 'Sử dụng AI có trách nhiệm và đạo đức', type: 'Năng lực số', ctx: ['C1', 'C3', 'C5', 'C6'] },
  { id: 'O9', text: 'Rèn kỹ năng thuyết trình trước lớp', type: 'Kỹ năng', ctx: 'all' },
  { id: 'O10', text: 'Tự đánh giá bản thân và đánh giá bạn', type: 'Thái độ', ctx: 'all' },
  { id: 'O11', text: 'Kết nối bài học với đời sống cộng đồng', type: 'Thái độ', ctx: ['C2', 'C4'] },
  { id: 'O12', text: 'Sử dụng đa phương tiện trong trình bày', type: 'Năng lực số', ctx: ['C1', 'C3', 'C5', 'C6'] },
]

export type Act = { id: string; name: string; desc: string; needs?: 'projector' | 'internet' }
export const PHASES: { n: number; name: string; purpose: string; time: string; acts: Act[] }[] = [
  { n: 1, name: 'Chuyển giao nhiệm vụ', purpose: 'GV giới thiệu bài, giao nhiệm vụ học tập', time: '5–8′', acts: [
    { id: 'P1-A', name: 'Đặt câu hỏi mở', desc: 'Câu hỏi kích thích tư duy, HS suy nghĩ 2 phút' },
    { id: 'P1-B', name: 'Chiếu video/hình ảnh', desc: 'Tài liệu trực quan, HS quan sát và ghi nhận', needs: 'projector' },
    { id: 'P1-C', name: 'Kể câu chuyện thực tế', desc: 'Tình huống đời thực liên quan bài học' },
    { id: 'P1-D', name: 'Trò chơi khởi động', desc: 'Minigame ngắn tạo hứng thú với chủ đề' } ] },
  { n: 2, name: 'Nghiên cứu / Khám phá', purpose: 'HS tìm hiểu, khám phá kiến thức mới', time: '10–15′', acts: [
    { id: 'P2-A', name: 'Đọc tài liệu + ghi chú', desc: 'Đọc SGK/tài liệu, ghi lại ý chính' },
    { id: 'P2-B', name: 'Thí nghiệm / Thực hành', desc: 'Làm thí nghiệm hoặc thao tác trực tiếp' },
    { id: 'P2-C', name: 'Phỏng vấn chéo', desc: 'Các nhóm phỏng vấn nhau về nội dung' },
    { id: 'P2-D', name: 'Tra cứu online', desc: 'Dùng Internet/thiết bị tìm thông tin', needs: 'internet' } ] },
  { n: 3, name: 'Luyện tập', purpose: 'HS thực hành, áp dụng kiến thức vừa học', time: '10–12′', acts: [
    { id: 'P3-A', name: 'Bài tập vận dụng trực tiếp', desc: 'Làm bài tập theo mẫu GV cung cấp' },
    { id: 'P3-B', name: 'Tranh luận / Phản biện', desc: 'Đưa quan điểm, tranh luận và phản biện đa chiều' },
    { id: 'P3-C', name: 'Giải quyết tình huống', desc: 'Thảo luận tìm cách giải quyết' },
    { id: 'P3-D', name: 'Sơ đồ tư duy', desc: 'Tổng hợp kiến thức bằng sơ đồ' } ] },
  { n: 4, name: 'Vận dụng', purpose: 'HS sáng tạo, vận dụng vào tình huống mới', time: '8–10′', acts: [
    { id: 'P4-A', name: 'Tạo sản phẩm sáng tạo', desc: 'Poster / video / bài thuyết trình' },
    { id: 'P4-B', name: 'Viết bài luận ngắn', desc: 'Đoạn văn vận dụng kiến thức' },
    { id: 'P4-C', name: 'Dự án mini', desc: 'Một dự án nhỏ áp dụng bài học' },
    { id: 'P4-D', name: 'Thuyết trình trước lớp', desc: 'Trình bày kết quả, nhận phản hồi' } ] },
]

export const MODES = [
  { id: 'solo', label: 'Cá nhân', glyph: '●', fx: [2, -2, 0] },
  { id: 'pair', label: 'Cặp đôi', glyph: '●●', fx: [1, 1, 0] },
  { id: 'group', label: 'Nhóm', glyph: '●●●', fx: [-1, 3, 0] },
] as const
export const AI_LEVELS = [
  { lv: 0, label: 'Không dùng AI', short: 'Tự lực', fx: [3, 0, -1] },
  { lv: 1, label: 'Tra cứu', short: 'AI tìm thông tin', fx: [1, 0, 2] },
  { lv: 2, label: 'Gợi ý', short: 'AI đề xuất hướng', fx: [-1, 0, 2] },
  { lv: 3, label: 'Phản biện / Đánh giá', short: 'AI nhận xét bài', fx: [2, 0, 1] },
] as const
// [phase][aiLevel-1] -> [tư duy, xã hội, số]
export const PHASE_MOD = [
  [[0, 0, 0], [-1, 0, 1], [0, 0, 0]],
  [[1, 0, 1], [0, 0, 1], [-1, 0, 0]],
  [[-1, 0, 1], [-2, 0, 1], [1, 0, 0]],
  [[0, 0, 1], [-2, 0, 1], [2, 1, 0]],
]

export type PhaseChoice = { act?: string; mode?: string; ai?: number }

export function infeasible(ctx: Ctx, c: PhaseChoice, phase: number) {
  const act = PHASES[phase].acts.find((a) => a.id === c.act)
  const out: string[] = []
  if (act?.needs === 'projector' && !ctx.projector) out.push('Lớp không có máy chiếu')
  if (act?.needs === 'internet' && ctx.internet === 'Không') out.push('Lớp không có Internet')
  if ((c.ai ?? 0) > 0 && ctx.internet === 'Không') out.push('Không thể dùng AI khi không có Internet')
  return out
}

export function computeStats(ctx: Ctx, plan: PhaseChoice[]) {
  const s = [50, 50, 50]
  const allNoAI = plan.every((p) => p.ai === 0)
  plan.forEach((p, i) => {
    const ai = p.ai ?? 0
    const add = [...AI_LEVELS[ai].fx] as number[]
    if (ai > 0) PHASE_MOD[i][ai - 1].forEach((v, k) => (add[k] += v))
    const m = MODES.find((x) => x.id === p.mode)!
    const mf = [...m.fx] as number[]
    if (ctx.id === 'C1' && i === 0 && ai > 0) add[1] += 1
    if (ctx.id === 'C2' && i === 2 && ai === 2) add[0] += 1
    if (ctx.id === 'C3' && ai === 2) add[0] -= 2
    if (ctx.id === 'C4' && ai > 0) add[2] = 0
    if (ctx.id === 'C5' && p.mode === 'group') mf[1] += 2
    add.forEach((v, k) => (s[k] += (v + mf[k]) * 2.4))
  })
  if (ctx.id === 'C6' && allNoAI) s[2] -= 2 * 2.4
  return s.map((v) => Math.round(Math.max(0, Math.min(100, v))))
}

export function feedback(ctx: Ctx, p: PhaseChoice, i: number) {
  const ai = p.ai ?? 0
  const good: string[] = [], warn: string[] = [], tip: string[] = []
  const inf = infeasible(ctx, p, i)
  inf.forEach((x) => warn.push(x + ' — hoạt động "Không khả thi".'))
  if (i === 2 && ai === 2) warn.push(ctx.id === 'C3' ? 'HS lớp chuyên có năng lực tự giải quyết. AI gợi ý ở pha Luyện tập khiến HS mất cơ hội rèn tư duy.' : 'AI gợi ý ở pha Luyện tập dễ thành làm thay cho HS.')
  if (i === 1 && ai === 1 && ctx.internet !== 'Không') good.push('Tra cứu ở pha Khám phá hợp lý — HS cần tiếp cận thông tin mới.')
  if (i === 3 && ai === 3) good.push('Rất tốt! AI phản biện sau vận dụng giúp HS rút kinh nghiệm.')
  if (ai === 0) good.push('HS tự lực, tư duy cốt lõi được rèn luyện.')
  if (p.mode === 'group' && ctx.size >= 40) good.push('Nhóm phù hợp lớp đông — cần phân vai rõ để tránh ỷ lại.')
  if (p.mode === 'pair') good.push('Cặp đôi giữ cân bằng giữa tư duy và kết nối.')
  if (ctx.id === 'C3' && ai === 2 && i !== 2) warn.push('HS giỏi không cần gợi ý — tư duy cốt lõi giảm mạnh.')
  const best = [[0, 'Không dùng AI hoặc câu hỏi mở'], [1, 'Tra cứu'], [3, 'Không dùng AI hoặc Phản biện'], [3, 'Phản biện / Đánh giá']][i]
  if (ai !== best[0]) tip.push(`Lựa chọn AI tối ưu hơn cho pha này: ${best[1]}${ctx.internet === 'Không' ? ' (với tài liệu in sẵn, không dùng AI)' : ''}.`)
  if (!good.length) good.push('Hoạt động phù hợp mục đích của pha.')
  return { good, warn, tip }
}

export function band(v: number) { return v <= 35 ? 0 : v <= 65 ? 1 : 2 }
export const REACTIONS = [
  ['HS thụ động, chỉ chép bài, không đặt câu hỏi', 'HS hiểu bài nhưng chưa liên hệ sâu', 'HS tự đặt câu hỏi, tranh luận sôi nổi, đưa ra ý kiến riêng'],
  ['HS làm việc lẻ tẻ, không tương tác, vài HS bị cô lập', 'HS trao đổi khi được yêu cầu, nhưng chưa chủ động', 'HS hợp tác tốt, hỗ trợ nhau, lớp học sôi động và gắn kết'],
  ['HS lúng túng với công nghệ, không biết dùng công cụ', 'HS dùng công cụ cơ bản, chưa khai thác sâu', 'HS dùng AI/công cụ số thành thạo, biết đánh giá nguồn tin'],
]
export const STAT_NAMES = ['Tư duy cốt lõi', 'Kết nối xã hội', 'Năng lực số']

export function scoreMode2(ctx: Ctx, plan: PhaseChoice[], stats: number[]) {
  const spread = Math.max(...stats) - Math.min(...stats)
  const bal = spread <= 10 ? 30 : spread <= 20 ? 25 : spread <= 30 ? 20 : spread <= 40 ? 15 : 10
  const avg = stats.reduce((a, b) => a + b) / 3
  const av = avg >= 75 ? 25 : avg >= 60 ? 20 : avg >= 45 ? 15 : avg >= 30 ? 10 : 5
  const bad = plan.reduce((n, p, i) => n + (infeasible(ctx, p, i).length ? 1 : 0), 0)
  const fit = Math.max(0, 20 - bad * 5)
  const nm = new Set(plan.map((p) => p.mode)).size
  const div = nm === 3 ? 15 : nm === 2 ? 10 : 5
  const na = new Set(plan.map((p) => p.ai)).size
  const aiv = na >= 3 ? 10 : na === 2 ? 7 : 3
  return { total: bal + av + fit + div + aiv, parts: [['Cân bằng 3 chỉ số', bal, 30], ['Trung bình 3 chỉ số', av, 25], ['Phù hợp bối cảnh', fit, 20], ['Đa dạng hình thức', div, 15], ['Đa dạng mức độ AI', aiv, 10]] as [string, number, number][] }
}
export function rank2(s: number) { return s >= 90 ? [3, 'Nhà Giáo Dục Xuất Sắc'] : s >= 75 ? [2, 'Nhà Giáo Dục Tiềm Năng'] : s >= 55 ? [1, 'Người Mới Bắt Đầu'] : [0, 'Cần Rèn Luyện Thêm'] }
export function rank1(s: number) { return s >= 90 ? [3, 'Xuất sắc'] : s >= 70 ? [2, 'Khá'] : s >= 50 ? [1, 'Trung bình'] : [0, 'Chưa đạt'] }
