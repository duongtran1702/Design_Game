# 🎮 NORMA CLASS — Kế Hoạch Cải Thiện Game

> Mục tiêu: Vừa **thực tiễn** · vừa **thú vị, không nhàm chán** · vừa **chuẩn đạo đức giáo dục**

---

## 📊 Đánh Giá Hiện Trạng

| Tiêu chí | Hiện tại | Ghi chú |
|---|---|---|
| Thực tiễn | ★★★☆ | Dữ liệu pháp lý chuẩn, có căn cứ NĐ/TT |
| Hấp dẫn | ★★☆☆ | Chủ yếu chọn/click, thiếu yếu tố bất ngờ |
| Đạo đức | ★★★☆ | Đã có cảnh báo AI lạm dụng, cần sâu hơn |
| Replay value | ★☆☆☆ | Chơi 1 lần là biết hết đáp án |

---

## 🔥 Nhóm 1: Tăng Tính Hấp Dẫn & Không Nhàm Chán

### 1.1 Hệ thống Sự kiện ngẫu nhiên (Random Events)

Giữa các bước, game **bật popup sự kiện bất ngờ** buộc người chơi phản ứng nhanh:

**Chế độ 1 — Khởi Nghiệp:**
- 🔔 *"Cháy nổ tại cơ sở lân cận → Sở yêu cầu bổ sung nghiệm thu PCCC mới trong 48h"*
- 📢 *"Thông tư mới ban hành → Một số giấy tờ cũ bị vô hiệu hóa"*
- 💰 *"Nhà đầu tư rút vốn → Ngân sách giảm 20%"*
- 📋 *"Phụ huynh khiếu nại → Sở yêu cầu kiểm tra nội quy"*

**Chế độ 2 — Lớp Học:**
- 🤒 *"3 học sinh xin nghỉ đột xuất → Kế hoạch nhóm bị ảnh hưởng"*
- 💡 *"Mất điện giữa giờ → Không dùng được máy chiếu & internet"*
- 🎉 *"Học sinh hỏi câu ngoài bài → Cơ hội mở rộng hoặc giữ đúng kế hoạch"*
- 📱 *"Phụ huynh gửi AI-generated homework cho con → GV cần xử lý"*

### 1.2 Hệ thống Timer & Áp lực thời gian

- Thêm **countdown timer** cho từng bước (ví dụ 60 giây chọn hồ sơ)
- Nếu hết giờ → bị phạt điểm hoặc mất 1 lượt nộp
- Có nút "Xin thêm thời gian" (nhưng bị trừ điểm nhẹ)
- Tạo cảm giác **urgency** như quyết định trong thực tế

### 1.3 Hệ thống Achievement & Badge

| Badge | Điều kiện | Hiệu ứng |
|---|---|---|
| 🏅 Thần Tốc | Hoàn thành dưới 3 phút | Hiển thị trên chứng nhận |
| 🛡️ Không Sai Lần Nào | 1 lần nộp = đạt | Badge vàng đặc biệt |
| 🧠 Tiết Kiệm | Còn >50% ngân sách | Huy hiệu xanh |
| 🎯 Cân Bằng Hoàn Hảo | 3 chỉ số chênh lệch <5 | Badge tím |
| 🚫 Không AI | Hoàn thành mà không dùng AI nào | Badge đạo đức |
| 🔄 Linh Hoạt | Dùng đa dạng AI ở 4 pha | Badge sáng tạo |

### 1.4 Leaderboard ảo (Local)

- Lưu **top 5 lượt chơi** vào `localStorage`
- Hiển thị bảng xếp hạng trên trang chủ
- So sánh với lượt chơi trước của chính mình

---

## 🎓 Nhóm 2: Tăng Tính Thực Tiễn

### 2.1 Case Study thực tế (Chế độ 1)

Thêm **kịch bản dựa trên vụ việc thật** (ẩn danh):
- *"Trung tâm X tại Hà Nội bị đình chỉ vì thiếu PCCC — Bạn rút ra bài học gì?"*
- *"Trường mầm non Y bị phạt 40 triệu vì giáo viên chưa có bằng — Giấy tờ nào đã bỏ sót?"*
- Sau mỗi lượt chơi, **so sánh hồ sơ người chơi vs. vụ việc thật**

### 2.2 Tình huống phân nhánh (Branching Scenarios - Chế độ 2)

Thay vì chọn xong 4 pha rồi xem kết quả, thêm **micro-decision giữa mỗi pha**:

```
Pha 1 → Sự kiện → Quyết định → Pha 2 → Sự kiện → ...
```

Ví dụ sau Pha 2:
> *"Một nhóm HS báo: Em dùng ChatGPT tra cứu nhưng kết quả sai hoàn toàn."*
> - A: Dừng lại, dạy cách kiểm chứng nguồn (mất 5' nhưng +Năng lực số)
> - B: Tiếp tục bài học, giải thích sau (+Thời gian nhưng -Năng lực số)
> - C: Cấm dùng AI trong lớp (-Năng lực số, +Tư duy cốt lõi)

### 2.3 Hồ sơ "Living Document"

- Khi chọn xong hồ sơ ở Chế độ 1, **hiển thị bản tóm tắt** như một "checklist thật"
- Người chơi có thể **screenshot hoặc in ra** để dùng tham khảo khi thực tế mở trung tâm
- Thêm nút "Xuất PDF hồ sơ pháp lý"

---

## ⚖️ Nhóm 3: Tăng Tính Đạo Đức & Nhân Văn

### 3.1 Dilemma Cards (Thẻ Tình Huống Đạo Đức)

Xuất hiện **ngẫu nhiên** trong cả 2 chế độ:

**Chế độ 1:**
- *"Bạn phát hiện có thể 'lách' quy định PCCC bằng giấy phép cấp thấp hơn, tiết kiệm 12 triệu. Bạn có chọn?"*
  - ✅ Tuân thủ đúng: +Điểm đạo đức, -Ngân sách
  - ❌ Lách quy định: +Ngân sách, nhưng **rủi ro bị phát hiện khi Thanh tra**

**Chế độ 2:**
- *"Học sinh yếu nhất lớp nộp bài xuất sắc bất thường. Bạn nghi AI làm hộ."*
  - A: Hỏi riêng em, tìm hiểu hoàn cảnh
  - B: Yêu cầu làm lại tại lớp
  - C: Chấp nhận kết quả, không hỏi thêm

→ Mỗi lựa chọn đều có **hậu quả rõ ràng**, không có đáp án "hoàn hảo"

### 3.2 Chỉ số "Đạo đức sư phạm" (Ethics Score)

Thêm chỉ số thứ 4 trong Chế độ 2:
- **Tư duy cốt lõi · Kết nối xã hội · Năng lực số · Đạo đức sư phạm**
- Tính dựa trên:
  - Có để HS tự lực không? (vs. AI làm thay)
  - Có công bằng với HS yếu không?
  - Có tôn trọng đa dạng văn hóa không? (C4, C6)
  - Có dạy HS dùng AI có trách nhiệm không?

### 3.3 "Góc nhìn Học sinh" (Student Perspective)

Sau khi hoàn thành Chế độ 2, hiển thị **nhật ký của 1 học sinh ảo**:

> *"Hôm nay cô cho dùng AI để tra cứu. Em thấy hay vì tìm được nhiều thông tin. Nhưng bạn Minh bảo: 'Cần gì học, AI biết hết rồi.' Em không biết nghĩ sao..."*

→ Giúp người chơi **thấu cảm** từ góc độ người học, không chỉ người dạy.

---

## 🔄 Nhóm 4: Tăng Replay Value

### 4.1 Chế độ Thử thách (Challenge Mode)

- **Ngân sách siêu thấp**: Chỉ 50% ngân sách bình thường
- **Thanh tra khó tính**: Phạt nặng hơn cho hồ sơ thừa
- **Lớp học đặc biệt**: Bối cảnh cực khó (VD: 50 HS, không internet, không máy chiếu)
- **Speed Run**: Hoàn thành tốt nhất có thể trong 2 phút

### 4.2 Chế độ So sánh (Compare Mode)

Sau khi chơi xong, cho phép **chơi lại cùng bối cảnh với chiến lược khác** và hiển thị **so sánh song song**:

```
Lần 1: AI nhiều → Tư duy 35 | Xã hội 60 | Số 85
Lần 2: AI ít  → Tư duy 80 | Xã hội 45 | Số 40
```

→ Người chơi tự rút ra kết luận về **sự đánh đổi**

### 4.3 Randomized Document Order

- Mỗi lần chơi, **thứ tự hồ sơ trong khay được xáo trộn**
- Giấy tờ tạo nhiễu xuất hiện **xen kẽ ngẫu nhiên** với giấy tờ thật
- Không thể ghi nhớ vị trí → phải **đọc kỹ mỗi lần**

---

## 🎨 Nhóm 5: Cải thiện UX/UI

### 5.1 Hiệu ứng phản hồi tức thì

- Khi thêm hồ sơ đúng: ✅ **flash xanh nhẹ** + sound effect
- Khi thêm hồ sơ bẫy: ⚠ **rung nhẹ** (không spoil đáp án)
- Khi hết thời gian: ⏰ **nhấp nháy đỏ**
- Khi đạt điểm cao: 🎉 **confetti animation**

### 5.2 Tooltip "Tại sao?"

- Mỗi hồ sơ có icon ❓ để **xem giải thích chi tiết** mà không cần nộp sai
- Chế độ "Học" (không tính điểm) để người chơi **khám phá thoải mái**

### 5.3 Progress Map

- Thay progress bar đơn giản bằng **bản đồ hành trình** (journey map)
- Mỗi bước = 1 điểm trên bản đồ, có icon minh họa
- Hiển thị đường đi đã qua và đường còn lại

---

## 📋 Đề Xuất Ưu Tiên Triển Khai

| # | Feature | Effort | Impact | Ưu tiên |
|---|---|---|---|---|
| 1 | 🔀 Xáo trộn thứ tự hồ sơ | Thấp | Cao | 🔴 Làm ngay |
| 2 | 🏅 Achievement badges | Trung bình | Cao | 🔴 Làm ngay |
| 3 | ⚡ Random events (3-4 sự kiện) | Trung bình | Rất cao | 🟡 Sớm |
| 4 | ⚖️ Dilemma cards (2-3 thẻ) | Trung bình | Rất cao | 🟡 Sớm |
| 5 | 📊 Leaderboard local | Thấp | Trung bình | 🟡 Sớm |
| 6 | 🎨 Confetti & hiệu ứng | Thấp | Trung bình | 🟡 Sớm |
| 7 | 🔄 Compare mode | Cao | Cao | 🟢 Sau |
| 8 | 📖 Branching scenarios | Cao | Rất cao | 🟢 Sau |
| 9 | 👁️ Góc nhìn học sinh | Trung bình | Cao | 🟢 Sau |
| 10 | ⏱️ Timer & áp lực | Thấp | Trung bình | 🟢 Tuỳ chọn |

---

> **Gợi ý triển khai:** Bắt đầu với nhóm 🔴 (xáo trộn hồ sơ + badges) vì effort thấp nhưng cải thiện ngay trải nghiệm chơi lại. Sau đó thêm random events + dilemma cards để game có chiều sâu đạo đức.

> **Lưu ý:** Tất cả các tính năng đều **giữ nguyên dữ liệu pháp lý hiện có** — chỉ bổ sung lớp tương tác mới lên trên nền tảng dữ liệu đã chuẩn.
