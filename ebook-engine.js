/* ==========================================================================
   NGAO CONTENT x EDIT KHONG KHO — INTERACTIVE EBOOK ENGINE & VIRTUAL AI BOT
   Author: @Nguyễn Hoà (Nov 18, 2026)
   ========================================================================== */

(function () {
  // Valid Student Passwords (case-insensitive)
  const VALID_PASSWORDS = ['NGAO2026', 'EKK2026', '1212', 'PBM2026', 'CLAUDE', 'HOCVIEN', 'NGUYENHOA'];
  const STORAGE_KEY = 'NGAO_EBOOK_UNLOCKED_V1';

  // Chapters metadata
  const CHAPTERS = [
    { id: 'intro', icon: '🧭', title: 'Mở đầu & Bản đồ', tag: 'Cơ bản' },
    { id: 'mindset', icon: '🧠', title: 'Tư duy & Công thức 4K', tag: 'Cốt lõi' },
    { id: 'setup', icon: '💻', title: 'Cài Claude Desktop', tag: '5 phút' },
    { id: 'lesson1', icon: '🧩', title: 'Bài 1: Câu lệnh 4 mảnh', tag: '3 phút' },
    { id: 'lesson2', icon: '🌐', title: 'Bài 2: Tìm hiểu thị trường', tag: '4 phút' },
    { id: 'lesson3', icon: '❤️', title: 'Bài 3: Để AI phỏng vấn bạn', tag: 'Trái tim' },
    { id: 'lesson4', icon: '🎨', title: 'Bài 4: Khảo sát & Brand Guideline', tag: '15 câu' },
    { id: 'lesson5', icon: '🗂️', title: 'Bài 5: Tạo Project riêng', tag: '5 phút' },
    { id: 'lesson6', icon: '🚀', title: 'Bài 6: Làm Web 1 câu lệnh', tag: '12 phút' },
    { id: 'lesson7', icon: '⚡', title: 'Bài 7: Đóng gói Skill', tag: '4 phút' },
    { id: 'advanced89', icon: '🛠️', title: 'Bài 8 & 9: .md, JSON & Tối ưu', tag: 'Nâng cao' },
    { id: 'cheatsheet', icon: '📋', title: 'Thẻ lệnh bỏ túi & Lịch 60p', tag: 'Cẩm nang' },
    { id: 'appendix', icon: '🎬', title: 'Phụ lục: EKK Video & Phụ đề', tag: 'Pro / Code' }
  ];

  let activeChapter = 'intro';
  let visitedChapters = new Set(['intro']);

  // Helper to format prompt text with highlighted [...] or <...> variables
  function formatPromptHTML(raw) {
    const escaped = raw
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    return escaped
      .replace(/(\[[^\]]+\])/g, '<span class="var-Slot">$1</span>')
      .replace(/(&lt;[^&]+&gt;)/g, '<span class="var-Slot">$1</span>');
  }

  // Build Copyable Prompt Card HTML
  let promptCounter = 0;
  function renderPromptCard(label, rawText) {
    promptCounter++;
    const pid = 'ebPrompt_' + promptCounter;
    return `
      <div class="eb-prompt-card">
        <div class="eb-prompt-bar">
          <span class="eb-prompt-label">⚡ ${label}</span>
          <button type="button" class="eb-copy-btn" onclick="window.EbookApp.copyPrompt('${pid}', this)">
            <span>📋 Chép câu lệnh</span>
          </button>
        </div>
        <div class="eb-prompt-body" id="${pid}" data-raw="${encodeURIComponent(rawText)}">${formatPromptHTML(rawText)}</div>
      </div>
    `;
  }

  // ==========================================================================
  // VIRTUAL AI BOT KNOWLEDGE BASE (TOÀN BỘ NỘI DUNG WEBSITE & EBOOK)
  // ==========================================================================
  const BOT_KNOWLEDGE = [
    // --- NỘI DUNG TOÀN BỘ WEBSITE WORKSHOP 12/12/2026 ---
    {
      id: 'kb_course_overview',
      targetPart: 'overview',
      targetLabel: 'Xem Tổng quan khoá học (Phần 1)',
      keywords: ['khóa học', 'khoá học', 'tổng quan', 'personal branding mastery', 'mục tiêu', 'giới thiệu', 'là gì', 'hiểu nhân cho rõ', 'xây hiệu cho lâu', 'workshop'],
      question: 'Khoá học Personal Branding Mastery là gì? Giải quyết vấn đề gì?',
      answer: `**Personal Branding Mastery** là chương trình Workshop Offline thực chiến chuyên sâu do **Ngáo Content** và **Edit Không Khó** tổ chức vào Thứ Bảy, 12/12/2026 tại TP.HCM.<br><br>• **Thông điệp cốt lõi:** *"Hiểu Nhân cho rõ, Xây Hiệu cho lâu"*. Khoá học không dạy bạn vẽ ra một vỏ bọc lung linh trên mạng, mà giúp bạn bóc tách năng lực thực chất, định vị độc bản và xây dựng thương hiệu cá nhân bền vững.<br>• **Điểm khác biệt:** Kết hợp tư duy chiến lược thương hiệu của Ngọc Tâm và phương pháp **Vibe Coding & làm video với AI** của Nguyễn Hoà, giúp bạn tự làm website và tự động hoá video mang về ngay sau ngày học!`
    },
    {
      id: 'kb_logistics',
      targetPart: 'logistics',
      targetLabel: 'Xem Thời gian & Địa điểm (Phần 5)',
      keywords: ['thời gian', 'địa điểm', 'ngày học', 'lịch học', 'ở đâu', 'mấy giờ', 'work x', 'điện biên phủ', '12/12', '12/12/2026', 'thứ bảy', 'tp hcm'],
      question: 'Lịch học, thời gian và địa điểm tổ chức khoá học ở đâu?',
      answer: `Thông tin tổ chức chính thức của khoá học Personal Branding Mastery:<br><br>📅 **Thời gian:** Thứ Bảy · **12/12/2026** (Từ **08:30 – 17:30**, trọn vẹn 1 ngày Offline thực chiến tập trung cao độ).<br>📍 **Địa điểm tổ chức:** **WORK X**, số **182 Điện Biên Phủ, phường Xuân Hoà, TP. Hồ Chí Minh**.<br>🤝 **Sau ngày học:** 14 ngày đồng hành thực hành xây kênh + 01 buổi Zoom chữa bài trực tiếp cùng 2 giảng viên!`
    },
    {
      id: 'kb_tuition',
      targetPart: 'logistics',
      targetLabel: 'Xem Học phí & Quyền lợi (Phần 5)',
      keywords: ['học phí', 'giá', 'chi phí', 'bao nhiêu tiền', '2.393.000', '2393000', 'học phí bao nhiêu', 'trọn gói', 'ưu đãi', 'tiền học'],
      question: 'Học phí khoá học là bao nhiêu? Học phí bao gồm những quyền lợi gì?',
      answer: `💰 **Học phí chính thức:** **2.393.000đ / học viên** (Học phí trọn gói).<br><br>🎁 **Đã bao gồm toàn bộ quyền lợi:**<br>1. **01 ngày Workshop Offline trực tiếp** (08:30 - 17:30) tại WORK X - 182 Điện Biên Phủ.<br>2. **14 ngày đồng hành thực chiến** xây kênh cùng giảng viên & trợ giảng.<br>3. **02 Video record** buổi học xem lại trọn đời.<br>4. **01 buổi Zoom chữa bài chuyên sâu** phản biện và tinh chỉnh bài làm của bạn.<br>5. **Toàn bộ Ebook thực chiến & Tool AI** mang về ứng dụng trọn đời.`
    },
    {
      id: 'kb_hotline',
      targetPart: 'register',
      targetLabel: 'Đến phần Hotline & Đăng ký',
      keywords: ['hotline', 'số điện thoại', 'sđt', 'liên hệ', 'tư vấn', 'hỗ trợ', '0902', '0902596059', 'gặp ai', 'gọi ai'],
      question: 'Số điện thoại Hotline hỗ trợ và tư vấn khoá học là gì?',
      answer: `📞 **Hotline hỗ trợ chính thức của Ngáo Content:** **0902 596 059**.<br><br>Bạn có thể gọi điện hoặc nhắn tin Zalo tới số hotline trên để được ban tuyển sinh hỗ trợ tư vấn lộ trình, giải đáp thắc mắc và xác nhận giữ chỗ nhanh nhất nhé!`
    },
    {
      id: 'kb_trainers',
      targetPart: 'trainers',
      targetLabel: 'Gặp gỡ 2 Giảng viên (Phần 4)',
      keywords: ['giảng viên', 'trainer', 'speaker', 'ai dạy', 'ai giảng dạy', 'người dạy', 'thầy cô', 'ngọc tâm', 'nguyễn hoà'],
      question: 'Ai là người trực tiếp giảng dạy trong khoá học Personal Branding Mastery?',
      answer: `Khoá học do **2 chuyên gia thực chiến** hàng đầu trực tiếp đứng lớp và đồng hành cùng bạn:<br><br>1. **Speaker Ngọc Tâm** — Founder Ngáo Content · Personal Branding & Marketing Strategist với **12+ năm kinh nghiệm**, đã đồng hành cùng 5.500+ học viên bóc tách bản sắc độc bản và hệ thống hoá sáng tạo bền vững.<br>2. **Speaker Nguyễn Hoà** — Founder Edit Không Khó & EKK Tools · Diễn giả tại FPT Arena Multimedia, tiên phong Vibe Coding với Claude & Gemini, hướng dẫn bạn làm chủ công nghệ AI để tự làm web và dựng video thực chiến!`
    },
    {
      id: 'kb_trainer_ngoc_tam',
      targetPart: 'trainers',
      targetLabel: 'Xem Profile Speaker Ngọc Tâm',
      keywords: ['ngọc tâm', 'ngoc tam', 'founder ngáo content', 'self-made creative', '12 năm', '5500 học viên', 'ngaocontent.com', 'kênh của ngọc tâm'],
      question: 'Giảng viên Ngọc Tâm là ai? Có kinh nghiệm và triết lý gì?',
      answer: `**Ngọc Tâm** là Founder của **Ngáo Content** và là Personal Branding Strategist uy tín:<br><br>• **12+ năm kinh nghiệm** triển khai và vận hành Marketing cho cá nhân và doanh nghiệp.<br>• **5.500+ học viên** đã được chị đồng hành theo tinh thần giáo dục bản chất và sáng tạo *Self-made Creative*.<br>• **Slogan nổi tiếng:** *“Hiểu nhân cho rõ, xây hiệu cho sâu. Mình tin thương hiệu cá nhân không phải là cố trở thành ai đó trong mắt người khác, mà là hiểu mình đủ rõ, rèn mình đủ vững và tạo ra những giá trị đủ thật để người khác tự có lý do ghi nhớ.”*<br>• **Hệ thống 3 kênh:** Website \`ngaocontent.com\` (1M+ đọc giả), Group Facebook Ngáo Content (120K+ thành viên), Fanpage & TikTok.`
    },
    {
      id: 'kb_trainer_nguyen_hoa',
      targetPart: 'trainers',
      targetLabel: 'Xem Profile Speaker Nguyễn Hoà',
      keywords: ['nguyễn hoà', 'nguyen hoa', 'founder edit không khó', 'ekk', 'vibe coding', 'dựng phim', 'fpt arena', 'youtube', 'editkhongkhoo', 'kênh của nguyễn hoà'],
      question: 'Giảng viên Nguyễn Hoà là ai? Có kinh nghiệm và triết lý gì?',
      answer: `**Nguyễn Hoà** là Founder của **Edit Không Khó** và bộ công cụ **EKK Tools**:<br><br>• Chuyên gia dựng phim, Motion Graphics, lập trình công cụ và tiên phong phương pháp **Vibe Coding** với Claude & Gemini.<br>• **Diễn giả Workshop** dựng phim và ứng dụng AI tại **FPT Arena Multimedia**.<br>• **Tác giả Ebook** *"Dùng Claude làm web và video thực chiến"* độc quyền cho học viên.<br>• **Slogan:** *“Điều quan trọng không phải là AI có thể làm được bao nhiêu thứ, mà là bạn có đủ tư duy để biết nên dùng nó làm gì cho thương hiệu của mình.”*<br>• **Hệ thống 3 kênh:** YouTube \`@EditKhongKhoo\`, TikTok \`@editkhongkho\` (150K+) và hệ sinh thái \`ekkdungphim.com\`.`
    },
    {
      id: 'kb_curriculum_3pillars',
      targetPart: 'curriculum',
      targetLabel: 'Xem 3 Trục tư duy (Phần 2)',
      keywords: ['3 trục', 'ba trục', 'nội dung học', 'giáo trình', 'chương trình', 'học gì', 'học những gì', 'bản sắc độc bản', 'phễu nội dung', 'trục 1', 'trục 2', 'trục 3'],
      question: 'Chương trình khoá học gồm những nội dung gì? 3 Trục tư duy là gì?',
      answer: `Chương trình đào tạo được xây dựng trên **3 Trục tư duy vững chắc**:<br><br>1. **Trục 1 — Bản sắc độc bản (Identity):** Hiểu nhân cho rõ, tìm ra chất người thực tế, câu chuyện nghề đáng nhớ và định vị độc bản thay vì vẽ vỏ bọc hào nhoáng.<br>2. **Trục 2 — Hệ thống phễu truyền thông (Funnel & System):** Xây dựng phễu nội dung đa kênh, thiết lập trụ cột nội dung và tạo lý do đủ rõ để người khác tin tưởng, ghi nhớ.<br>3. **Trục 3 — Công nghệ AI & Vibe Coding thực chiến:** Ứng dụng Claude Desktop, prompt 4 mảnh, khảo sát 15 câu xuất Brand Guideline 24 slide, tự tay làm trang web cá nhân và quy trình làm video AI nhanh gấp 5-10 lần!`
    },
    {
      id: 'kb_benefits',
      targetPart: 'benefits',
      targetLabel: 'Xem Quyền lợi & AI (Phần 3)',
      keywords: ['quyền lợi', '14 ngày đồng hành', 'video record', 'zoom sửa bài', 'nhận được gì', 'lợi ích học viên', 'ưu đãi'],
      question: 'Học viên nhận được những quyền lợi gì khi tham gia khoá học?',
      answer: `Khi tham gia Personal Branding Mastery, bạn nhận được gói hỗ trợ thực chiến toàn diện:<br><br>✨ **01 ngày Workshop Offline** thực hành trực tiếp tại lớp cùng 2 giảng viên.<br>🚀 **14 ngày đồng hành thực chiến** có trợ giảng và trainer giải đáp hàng ngày.<br>📹 **02 Video record chất lượng cao** xem lại trọn đời bất cứ khi nào cần.<br>🎯 **01 buổi Zoom sửa bài trực tiếp** sau thời gian thực hành.<br>🛠️ **Hệ thống AI & Tool mang về:** Trọn bộ Brand Guideline 24 slide PDF, file mã màu .md, mã nguồn website cá nhân và kho prompt thực chiến chuẩn hoá.`
    },
    {
      id: 'kb_target_audience',
      targetPart: 'logistics',
      targetLabel: 'Xem Đối tượng phù hợp tại Phần 5',
      keywords: ['phù hợp', 'dành cho ai', 'ai nên học', 'không biết code', 'người mới', 'chưa có kênh', 'creator', 'freelancer', 'chủ shop', 'founder', 'bác sĩ', 'giảng viên'],
      question: 'Khoá học phù hợp với ai? Không biết lập trình hay công nghệ có học được không?',
      answer: `Khoá học được may đo cho các nhóm đối tượng:<br><br>• **Content Creator / KOC**: Muốn định vị rõ ràng và xây kênh bài bản, bền vững.<br>• **Chuyên gia / Giảng viên / Bác sĩ / Cố vấn**: Muốn lan toả chuyên môn và xây dựng uy tín.<br>• **Freelancer**: Muốn nâng giá trị bản thân, thu hút khách hàng cao cấp.<br>• **Marketer / Truyền thông**: Muốn hệ thống hoá tư duy sáng tạo và ứng dụng AI thực tế.<br>• **Chủ shop / Founder / Doanh nghiệp**: Xây dựng thương hiệu lãnh đạo (CEO Branding).<br><br>💡 **Hoàn toàn KHÔNG cần biết code hay kỹ thuật!** Phương pháp Vibe Coding hướng dẫn bạn dùng tiếng Việt tự nhiên để giao việc cho Claude, AI sẽ tự viết mã và dựng trang web hoàn chỉnh cho bạn!`
    },
    {
      id: 'kb_requirements',
      targetPart: 'logistics',
      targetLabel: 'Xem Yêu cầu chuẩn bị tại Phần 5',
      keywords: ['chuẩn bị', 'cần mang gì', 'laptop', 'claude pro', 'yêu cầu', 'mang theo', 'cần gì', 'mang gì đi học'],
      question: 'Học viên cần chuẩn bị những thiết bị và công cụ gì khi đến lớp?',
      answer: `Để đạt hiệu quả thực hành cao nhất, bạn cần chuẩn bị:<br><br>💻 **01 Laptop cá nhân** (đã sạc đầy hoặc mang kèm sạc) để thực hành trực tiếp tại lớp.<br>🤖 **01 Tài khoản Claude Pro** (đăng ký gói 20$/tháng trên claude.ai) để sử dụng tính năng tạo Project, Artifact và thực hành Vibe Coding không giới hạn.<br>🎨 **Làm trước bài khảo sát 15 câu trên web:** Mở trang \`brand-discovery.html\` làm bài trắc nghiệm thị giác và tải trước file Brand Guideline mang theo!`
    },
    {
      id: 'kb_register',
      targetPart: 'register',
      targetLabel: 'Đến Phần 6: Đăng ký & Quét QR',
      targetUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSepAfBro_dd6fLU0Hj6dQpfPBSq8BkOecbS5xvoiyPW0TqbSw/viewform',
      keywords: ['đăng ký', 'cách đăng ký', 'giữ chỗ', 'quét qr', 'form', 'chuyển khoản', 'thanh toán', 'ghi danh', 'làm sao để học'],
      question: 'Làm thế nào để đăng ký tham gia khoá học và chuyển khoản giữ chỗ?',
      answer: `Có 2 cách đăng ký vô cùng thuận tiện:<br><br>1. **Quét mã QR trực tiếp trên website:** Chuyển đến tab **Phần 6: Đăng ký & QR**, mở app ngân hàng quét mã QR để chuyển khoản học phí 2.393.000đ.<br>2. **Mở Google Form chính thức:** Bấm nút *"Mở Google Form Đăng Ký Trực Tiếp"* để điền thông tin liên hệ.<br><br>Sau khi nhận được thông tin, ban tuyển sinh Ngáo Content sẽ gọi điện hoặc nhắn tin Zalo xác nhận trong vòng 15 phút. Nếu cần hỗ trợ khẩn cấp, bạn hãy gọi hotline **0902 596 059** nhé!`
    },
    {
      id: 'kb_brandguide_tool',
      targetUrl: 'brand-discovery.html',
      targetLabel: 'Mở công cụ Khảo sát 15 câu',
      keywords: ['15 câu', 'khảo sát 15 câu', 'brand discovery', 'trắc nghiệm', 'moodboard', 'bản học viên', '24 slide', 'pdf', 'brand guideline'],
      question: 'Công cụ Khảo sát Brand Discovery 15 câu trên web hoạt động như thế nào?',
      answer: `**NGAO Brand Discovery (15 câu)** là công cụ trắc nghiệm thị giác trực quan độc quyền:<br><br>• **Cách làm:** Bạn xem hình ảnh minh hoạ trực quan để chọn phong cách (Màu sắc, Typography, Tone of voice, Bố cục), hoặc bấm *"Nhờ AI gợi ý"* nếu phân vân.<br>• **4 Preset thiết kế chuẩn hoá:** B (Corporate Clean), C (Editorial Split), D (Visual First), E (Modular Grid).<br>• **Xuất thành phẩm:** Bấm nút in để xuất bộ **Brand Guideline 24 slide chuẩn PDF** và tải file **Markdown (.md)** để nạp vào Claude làm Web và Video!`
    },
    {
      id: 'kb_ebook_pass',
      targetPart: 'ebook',
      targetLabel: 'Đến tab Ebook Học Viên',
      keywords: ['mật khẩu', 'pass', 'mã khóa', 'mở ebook', 'xem ebook', 'ngao2026', '1212', 'hocvien', 'mật khẩu ebook', 'xem sách'],
      question: 'Mật khẩu mở Ebook học viên là gì? Làm sao để xem Ebook trên web?',
      answer: `Mục **🔒 Ebook Học Viên** trên web chứa toàn bộ 13 bài học và kho câu lệnh thực chiến của Trainer Nguyễn Hoà.<br><br>🔑 **Mật khẩu mở khoá:** Nhập **\`NGAO2026\`** hoặc **\`1212\`** vào ô nhập rồi bấm Mở khóa (hoặc bấm *"Mở khóa nhanh demo"*).<br>Sau khi mở, bạn có thể tra cứu từng bài học, sao chép prompt 1 chạm và sử dụng các widget tương tác trực tiếp trên màn hình!`
    },

    // --- NỘI DUNG CẨM NANG EBOOK CLAUDE LÀM WEB & VIDEO ---
    {
      id: 'kb_4k',
      chapter: 'mindset',
      chapterName: 'Tư duy & Công thức 4K',
      keywords: ['4k', 'công thức 4k', 'ai làm sai', 'sửa lỗi', 'góp ý', '4a', 'netflix', 'khoanh', 'kỳ vọng', 'kiểm nguyên nhân', 'khóa quy tắc'],
      question: 'Công thức 4K khi AI làm sai là gì? Khác gì 4A của Netflix?',
      answer: `Khi Claude làm sai, đừng chỉ nói *"làm lại đi"* vì AI sẽ đoán mò. Hãy dùng **Công thức 4K của Nguyễn Hoà**:
<br><br>
1. **K - Khoanh:** Chỉ đúng chỗ sai (*"Câu mở đầu đoạn 2 nghe quá quảng cáo"*).<br>
2. **K - Kỳ vọng:** Nói rõ kết quả bạn muốn (*"Mình muốn giọng nhẹ nhàng như nói với khách quen"*).<br>
3. **K - Kiểm nguyên nhân:** Hỏi lại AI (*"Bạn hiểu yêu cầu của mình thế nào nên viết như vậy?"*).<br>
4. **K - Khóa quy tắc:** Biến bài học thành quy tắc ngắn ghi vào Project để lần sau không sai lại.
<br><br>
💡 **Vì sao không dùng khung 4A của Netflix?** Khung 4A (*Aim to assist, Actionable, Appreciate, Accept/discard*) dành cho người với người. Với AI, hai bước cuối không phù hợp nên 4K thay bằng bước **Khóa quy tắc** vào Project.`,
      prompt: `Chỗ này chưa đúng ý mình: [dán hoặc mô tả đúng chỗ sai]. Mình muốn [kết quả mong muốn]. Bạn hiểu yêu cầu của mình thế nào nên mới viết như vậy? Sau đó hãy viết lại, rồi cho mình một quy tắc ngắn để ghi vào hướng dẫn của Project (Bài 5), để lần sau bạn không sai như thế nữa.`
    },
    {
      id: 'kb_4manh',
      chapter: 'lesson1',
      chapterName: 'Bài 1 — Câu lệnh 4 mảnh',
      keywords: ['4 mảnh', 'bốn mảnh', 'câu lệnh đầu tiên', 'bài 1', 'giao việc', 'vai trò', 'bối cảnh', 'khẩu hiệu', 'chị mai', 'bếp mai'],
      question: 'Công thức câu lệnh 4 mảnh ở Bài 1 gồm những gì?',
      answer: `Một câu lệnh tốt giống lời dặn việc đầy đủ cho nhân viên mới, gồm **4 mảnh** nằm chung trong 1 tin nhắn:
<br><br>
• **Mảnh 1 — Vai trò:** AI đóng vai ai? (*VD: Chuyên gia marketing cho tiệm nhỏ*)<br>
• **Mảnh 2 — Bối cảnh:** Bạn là ai, bán gì, ở đâu, cho ai? (*VD: Tiệm bánh handmade Đà Nẵng, bán bánh ít đường cho mẹ bỉm 25–40 tuổi*)<br>
• **Mảnh 3 — Việc cần làm:** Cụ thể cần làm gì? (*VD: Viết 5 câu khẩu hiệu*)<br>
• **Mảnh 4 — Kết quả mong muốn:** Dài bao nhiêu, trình bày thế nào, giọng ra sao? (*VD: Dưới 10 chữ, giọng ấm áp, kèm 1 dòng lý do*)`,
      prompt: `Bạn là [vai trò].\nTôi là [bạn làm nghề gì, bán gì, ở đâu], khách hàng của tôi là [ai].\nHãy [việc cần làm].\nKết quả: [dài bao nhiêu, trình bày thế nào, giọng văn ra sao].`
    },
    {
      id: 'kb_interview',
      chapter: 'lesson3',
      chapterName: 'Bài 3 — Để AI phỏng vấn bạn',
      keywords: ['phỏng vấn', 'bài 3', 'hồ sơ thương hiệu', 'trái tim', '12 câu', '7 câu', 'khách hàng thật', 'zalo', 'bác sĩ'],
      question: 'Làm sao để AI phỏng vấn mình tạo Hồ sơ thương hiệu (Bài 3)?',
      answer: `**Bài 3 là trái tim của cả hành trình!** Thay vì tự đoán phải kể gì, bạn đảo vai giống như đi khám bệnh: **để Claude hỏi từng câu (tối đa 12 câu), bạn chỉ việc trả lời tự nhiên**.
<br><br>
• **Mẹo trả lời:** Nói thật như kể với bạn thân; trên điện thoại có thể bấm micro để nói; nếu bí hãy gõ *"Tôi chưa biết, gợi ý cho tôi 3 lựa chọn"*.<br>
• Sau 12 câu, Claude tự gom thành **Hồ sơ thương hiệu cá nhân** để chuẩn bị đưa vào Brand Guideline (Bài 4), Project (Bài 5) và làm Web (Bài 6).`,
      prompt: `Bạn là chuyên gia xây dựng thương hiệu cá nhân.\nHãy phỏng vấn tôi để làm Hồ sơ thương hiệu cá nhân.\nQuy tắc:\n- Mỗi lần chỉ hỏi 1 câu, chờ tôi trả lời rồi mới hỏi tiếp.\n- Dùng từ ngữ đơn giản, có ví dụ gợi ý để tôi dễ trả lời.\n- Tối đa 12 câu, đi qua: chuyên môn và kinh nghiệm, câu chuyện nghề đáng nhớ, thành quả có thật, giá trị tôi theo đuổi, người tôi giúp được và vấn đề của họ, điều tôi khác người cùng nghề.\n- Câu nào tôi trả lời chung chung, hỏi thêm 1 câu để lấy ví dụ cụ thể.\nKhi xong, tổng hợp thành Hồ sơ thương hiệu cá nhân gồm: tôi là ai, chuyên môn, câu chuyện, thành quả, người tôi giúp, điều khác biệt, giọng nói, màu sắc gợi ý, những điều không bao giờ nói.\nKhông thêm thành tích hay con số tôi chưa nói.\nBắt đầu với câu hỏi đầu tiên.`
    },
    {
      id: 'kb_brandguide',
      chapter: 'lesson4',
      chapterName: 'Bài 4 — Khảo sát 15 câu & Brand Guideline',
      keywords: ['brand guideline', 'brand guiline', 'guideline', '15 câu', 'khảo sát', 'bản học viên', 'bài 4', 'corporate', 'editorial', 'visual', 'grid', 'pdf 24 slide', '24 slide', 'mã màu', 'mã hex', 'nhận diện'],
      question: 'Khảo sát 15 câu và xuất bộ Brand Guideline 24 slide ở Bài 4 như thế nào?',
      answer: `Ở **Bài 4**, sau khi hoàn thành phỏng vấn ở Bài 3, bạn thực hiện **Khảo sát định vị 15 câu [Bản Học Viên]** để số hóa Brand DNA và nhận diện thị giác:
<br><br>
1. **Trả lời 15 câu trực quan:** Bấm nút *"Bắt đầu khảo sát 15 câu"* mở công cụ khảo sát trực quan (hoặc truy cập \`brand-discovery.html\`), nhìn hình chọn phương án hoặc chọn *Nhờ AI gợi ý*.<br>
2. **4 Preset Layout chuẩn thiết kế:**<br>
   • **B · Corporate Clean:** Nền sáng, tối giản, thanh lịch, chuẩn B2B / Chuyên gia cố vấn.<br>
   • **C · Editorial Split:** Bố cục chia đôi 50/50 phong cách tạp chí nghệ thuật cao cấp.<br>
   • **D · Visual First:** Hình ảnh điện ảnh tràn viền cho Content Creator & Filmmaker.<br>
   • **E · Modular Grid:** Khung lưới Swiss Style kỷ luật, cấu trúc chặt chẽ cho Founder & Tech.<br>
3. **Hai nút xuất quan trọng:**<br>
   • **In / Lưu PDF 24 slide:** File tài liệu nhận diện thị giác đầy đủ để gửi đối tác hoặc in ấn.<br>
   • **Tải Markdown (.md):** File chữ thuần chứa thông số HEX, font, tone of voice để nạp thẳng vào **Bài 5 (Project)** cho Claude đọc chính xác 100%.`,
      prompt: `LỆNH NẠP BRAND GUIDELINE VÀO CLAUDE:\nĐọc kỹ file Brand Guideline (.md) tôi vừa tải lên.\nGhi nhớ chính xác:\n- Bảng màu HEX chuẩn và tỷ lệ dùng màu.\n- Cặp font chữ và phong cách bố cục.\n- Giọng điệu thương hiệu (Tone of Voice) và những điều TUYỆT ĐỐI KHÔNG LÀM.\nMọi ấn phẩm, nội dung và trang web tiếp theo đều phải tuân thủ nghiêm ngặt bộ Brand Guideline này.`
    },
    {
      id: 'kb_project_skill',
      chapter: 'lesson5',
      chapterName: 'Bài 5 & Bài 7 — Project vs Skill',
      keywords: ['project', 'skill', 'khác nhau', 'ngăn tủ', 'công thức nấu', 'bài 5', 'bài 7', 'instructions', 'knowledge', 'đóng gói'],
      question: 'Project (Bài 5) khác Skill (Bài 7) như thế nào?',
      answer: `Hãy hình dung căn bếp của bạn:
<br><br>
1. **Project (Ngăn tủ riêng - Bài 5):**<br>
   • **Chứa gì:** Thông tin bối cảnh (Bạn là ai, Hồ sơ thương hiệu Bài 3, file Brand Guideline .md Bài 4, bảng giá, logo). Gồm 2 phần: *Instructions (Hướng dẫn)* và *Knowledge (Tài liệu)*.<br>
   • **Hoạt động ở đâu:** Chỉ trong Project đó (gói miễn phí tạo được tối đa 5 Project tại \`claude.ai/projects\`).<br><br>
2. **Skill (Công thức nấu - Bài 7):**<br>
   • **Chứa gì:** Quy trình làm một việc lặp đi lặp lại (VD: cách viết kịch bản video 30 giây, cách báo giá).<br>
   • **Hoạt động ở đâu:** Mọi cuộc trò chuyện trong tài khoản khi việc cần đến (quản lý tại *Customize → Skills*).`,
      prompt: `Tôi muốn tạo một skill từ cách làm [viết kịch bản video 30 giây] mà tôi hay làm.\nSkill cần: [hỏi tôi chủ đề video, viết câu mở đầu 3 giây, kịch bản dạng bảng, danh sách cảnh quay, phụ đề và caption].\nLuôn theo giọng văn thương hiệu của tôi.\nHãy hỏi tôi thêm những gì bạn cần biết, rồi tạo skill để tôi lưu lại.`
    },
    {
      id: 'kb_web',
      chapter: 'lesson6',
      chapterName: 'Bài 6 — Làm trang web 1 câu lệnh',
      keywords: ['làm web', 'trang web', 'website', 'bài 6', '15 câu', 'brand discovery', 'github pages', 'quy tắc làm web', 'share', 'artifact', 'brand guideline'],
      question: 'Quy trình từ Brand Guideline (Bài 4) ra trang web (Bài 6)?',
      answer: `Để Claude làm được trang web, trước tiên hãy vào **Settings → Capabilities** và bật **Code execution and file creation** (*Create and edit files*). Sau đó đi qua **3 bước**:
<br><br>
1. **Bước 1 — Khảo sát 15 câu (Bài 4):** Trả lời 15 câu hỏi định vị trong công cụ Brand Discovery.<br>
2. **Bước 2 — Xuất Brand Guideline:** Chọn 1 trong 4 preset khóa sẵn (B, C, D, E) → Tải file **Markdown (.md)** để nạp vào Claude và **PDF 24 slide** để xem trước.<br>
3. **Bước 3 — Đưa vào Project (Bài 5) & Giao việc (Bài 6):** Tải file \`.md\` + 5 thông tin bán hàng (3 sản phẩm, feedback, Zalo/SĐT, MXH, logo) vào Project, dán **7 Quy tắc làm web**, rồi gõ lệnh tạo trang!`,
      prompt: `Dựa vào Hồ sơ thương hiệu và file Brand Guideline (.md), làm cho tôi một trang web giới thiệu một trang.\nGồm: phần mở đầu có khẩu hiệu, câu chuyện thương hiệu, 3 sản phẩm nổi bật, cảm nhận khách hàng, nút "Nhắn Zalo đặt hàng" dẫn tới [số Zalo].\nMàu sắc, font chữ và giọng văn theo Brand Guideline. Xem đẹp trên điện thoại.\nChỗ nào thiếu thông tin thật (giá, cảm nhận khách) thì để ô trống có ghi chú, không tự bịa.`
    },
    {
      id: 'kb_claudecode',
      chapter: 'advanced89',
      chapterName: 'Bài 9 — Giữ Claude nhanh & thông minh',
      keywords: ['context', '60%', 'bị đầy', '/compact', '/clear', '/re', '/rewind', 'claude.md', 'agents.md', 'bài 9', 'tốn token'],
      question: 'Cách giữ Claude không bị đầy context và dùng lệnh /RE, /compact, /clear (Bài 9)?',
      answer: `Khi dùng **Claude Code**, đây là 6 nguyên tắc vàng giúp AI luôn thông minh và tiết kiệm token:
<br><br>
1. **Giữ \`CLAUDE.md\` dưới 50 dòng:** Dặn Claude tự đề nghị rút gọn nếu vượt quá 50 dòng.<br>
2. **Dùng \`AGENTS.md\`:** Khi cần bàn giao dự án sang AI khác (như Codex).<br>
3. **Khi context đầy:** Dùng \`/compact\` (tóm tắt gọn) hoặc \`/clear\` (làm sạch bàn mới).<br>
4. **Khi Claude trả lời sai — Dùng \`/RE\` (\`/rewind\`):** Đừng nhắn *"Không phải, làm lại đi"* vì phần sai vẫn nằm trong context. Gõ \`/RE\` để quay lại tin nhắn trước, xóa phần sai rồi áp dụng **công thức 4K**.<br>
5. **Reset thủ công ở mức 60% context:** Đừng chờ 95% máy tự nén. Ở mức 60%: Bảo Claude tóm tắt → Copy → Gõ \`/clear\` → Dán tóm tắt vào phiên mới.`,
      prompt: `Thêm vào CLAUDE.md quy tắc này: "Mỗi khi thêm gì vào file này, nếu file dài quá 50 dòng thì đề nghị mình rút gọn trước, và chỉ rút gọn khi mình đồng ý."`
    },
    {
      id: 'kb_md_json',
      chapter: 'advanced89',
      chapterName: 'Bài 8 — File .md và JSON',
      keywords: ['md', 'markdown', 'json', 'bài 8', 'định dạng', 'đuôi file', 'word', 'pdf'],
      question: 'Khi nào dùng file Markdown (.md) và khi nào dùng JSON (Bài 8)?',
      answer: `Hiểu cực nhanh hai định dạng phổ biến nhất khi làm việc với AI:
<br><br>
• **Markdown (\`.md\`):** Kiểu ghi chữ dễ đọc cho cả người và AI (giữ nguyên tiêu đề \`#\`, chữ đậm \`**\`, bảng \`|\`). **Mẹo nhớ:** Muốn lưu lại Hồ sơ thương hiệu hay làm Skill để tái sử dụng cho AI thì luôn yêu cầu xuất file \`.md\` (dùng cho Bài 4, 5, 7).<br>
• **JSON (\`{ "ten": "gia_tri" }\`):** Kiểu ghi dữ liệu có cấu trúc để phần mềm, website hoặc công cụ tự động hoá đọc chính xác.<br>
• **Word / PDF:** Dùng khi gửi cho khách hàng xem hoặc đi in ấn (như file PDF 24 slide ở Bài 4).`,
      prompt: `Tổng hợp Hồ sơ thương hiệu vừa phỏng vấn thành Markdown, có tiêu đề cho từng phần.\nLưu thành file ho-so-thuong-hieu.md để tôi tải về.`
    },
    {
      id: 'kb_video_ekk',
      chapter: 'appendix',
      chapterName: 'Phụ lục — EKK Tự động làm Phụ đề & Thư mục Video',
      keywords: ['video', 'phụ đề', 'srt', 'ekk', 'ekk-phu-de', 'whisper', 'ffmpeg', 'node', 'git', 'homebrew', 'mac', 'windows', '6 thư mục', '01_raw', 'phụ lục'],
      question: 'Làm sao để Claude tự làm phụ đề video (.srt) và tạo 6 thư mục video trên máy (Phụ lục)?',
      answer: `Trong **Phụ lục Nâng cao (Claude Code - Gói Pro trở lên)**, Nguyễn Hoà hướng dẫn quy trình an toàn **3 bước**:
<br>
**Bước 1: Kiểm tra máy (Chỉ đọc)** → **Bước 2: Cài công cụ thiếu (Có hỏi duyệt)** → **Bước 3: Tạo Skill \`/ekk-phu-de\`**.
<br><br>
🛠️ **5 công cụ cần có:** \`Node.js LTS + npm\`, \`Git\`, \`FFmpeg + FFprobe\`, \`whisper.cpp (whisper-cli)\`, và model đa ngôn ngữ \`ggml-base.bin\` (~148 MB). *(Lưu ý trên Mac: dùng Homebrew, kiểm tra \`xcode-select -p\` trước khi gọi git).*
<br><br>
📁 **Chuẩn 6 thư mục dự án video:** \`01_Raw\` (không bao giờ sửa/ghi đè), \`02_Broll\`, \`03_Tham-chieu\`, \`04_Brand-guideline\` (chứa Brand Guideline từ Bài 4), \`05_Sound-effect\`, \`06_Final\` kèm file \`CLAUDE.md\` bảo vệ dữ liệu.`,
      prompt: `EKK – TẠO THƯ MỤC DỰ ÁN VIDEO\n\n1. MỤC TIÊU\nTạo bộ thư mục chuẩn cho dự án video tên [ten-du-an], nằm trong [Documents/EKK-Projects] của tài khoản máy tính này.\n\n2. PHẠM VI\n- Chỉ tạo thư mục mới và file CLAUDE.md. Không di chuyển, đổi tên, xoá file có sẵn.\n- Tạo đúng 6 thư mục: 01_Raw, 02_Broll, 03_Tham-chieu, 04_Brand-guideline, 05_Sound-effect, 06_Final.`
    },
    {
      id: 'kb_blindspot',
      chapter: 'mindset',
      chapterName: 'Tư duy — Quy tắc 2, 3 & Chống AI bịa',
      keywords: ['điểm mù', 'phản biện', 'suy luận', 'ai bịa', 'nguồn', 'web search', 'bài 2', 'kiểm tra'],
      question: 'Làm sao bắt AI phản biện chỉ ra điểm mù và không bịa thông tin?',
      answer: `Để AI không khen xã giao hoặc tự bịa số liệu:
<br><br>
1. **Chống AI đoán mò (Quy tắc chung):** Luôn thêm câu: *"Phần nào bạn suy luận (không có nguồn hoặc dữ liệu thật), hãy ghi rõ là (AI suy luận)."*<br>
2. **Kiểm tra độ chắc chắn (Bài 2):** Hỏi Claude *"Ý nào trong câu trả lời trên bạn chưa chắc chắn? Đánh dấu giúp tôi."*<br>
3. **Nhờ AI chỉ ra điểm mù tư duy (Quy tắc 3):** Yêu cầu Claude đóng vai người phản biện thẳng thắn chỉ ra 3 điều mặc định chưa kiểm chứng, 3 điểm mù và lý do thất bại mạnh nhất.`,
      prompt: `Hãy đóng vai người phản biện thẳng thắn cho ý tưởng/kế hoạch ở trên. Không khen xã giao. Cho mình: (1) 3 điều mình đang mặc định là đúng nhưng chưa kiểm chứng, (2) 3 điểm mình có thể đang không nhìn thấy, (3) lý do mạnh nhất khiến kế hoạch này thất bại, (4) một cách làm khác tốt hơn nếu có. Với mỗi ý, nói rõ vì sao.`
    },
    {
      id: 'kb_schedule',
      chapter: 'cheatsheet',
      chapterName: 'Cẩm nang — Lịch học 60 phút & Bảo mật',
      keywords: ['60 phút', 'lịch học', 'thời gian', 'an toàn', 'bảo mật', 'lỗi thường gặp', 'cccd', 'mật khẩu'],
      question: 'Lộ trình thực hành Ebook trong 60 phút và nguyên tắc an toàn thông tin?',
      answer: `⏱️ **Lộ trình 60 phút thực chiến:**
<br>
• **Phút 0–8:** Đọc 4 quy tắc tư duy, đăng nhập Claude Desktop.<br>
• **Phút 8–14:** Bài 1 (Câu lệnh 4 mảnh) + Bài 2 (Tìm hiểu thị trường có nguồn).<br>
• **Phút 14–24:** Bài 3 (Để Claude phỏng vấn 12 câu → Ra Hồ sơ thương hiệu).<br>
• **Phút 24–34:** Bài 4 (Khảo sát 15 câu: Xuất Brand Guideline 24 slide & File .md).<br>
• **Phút 34–39:** Bài 5 (Tạo Project riêng "Trợ lý thương hiệu").<br>
• **Phút 39–49:** Bài 6 (Làm trang web 1 trang theo Brand Guideline & link Share).<br>
• **Phút 49–54:** Bài 7 (Đóng gói Skill).<br>
• **Phút 54–58:** Bài 9 (Lệnh Claude Code /compact, /clear, /RE).<br>
• **Phút 58–60:** Hỏi đáp, giới thiệu Bài 8 (.md & JSON) và Phụ lục Video.<br><br>
🔒 **An toàn thông tin:** Tuyệt đối KHÔNG dán mật khẩu, số thẻ ngân hàng, CCCD, OTP, và phải xóa tên/SĐT khách hàng thật trước khi đưa vào AI.`
    }
  ];

  // ==========================================================================
  // NGÁO CONTENT AI BOT MASCOT SVG GENERATOR
  // Tạo hình từ Logo Ngáo Content (Đầu bong bóng thoại vàng, viền hồng cánh sen,
  // màn hình số led cyan, ăng-ten hạt ngọc, thân múp & cánh tay vẫy chào sống động)
  // ==========================================================================
  function renderNgaoMascotSVG({ width = 140, height = 140, idPrefix = 'ngaoMascot' } = {}) {
    return `
      <svg width="${width}" height="${height}" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Ngáo AI Bot Mascot">
        <defs>
          <!-- Speech bubble yellow gradient -->
          <linearGradient id="${idPrefix}_yellow" x1="20" y1="20" x2="130" y2="120" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#FFF566" />
            <stop offset="50%" stop-color="#FFDE59" />
            <stop offset="100%" stop-color="#FFB800" />
          </linearGradient>
          <!-- Visor metallic gradient -->
          <linearGradient id="${idPrefix}_visor" x1="45" y1="45" x2="105" y2="90" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#1B1C2A" />
            <stop offset="100%" stop-color="#0A0B12" />
          </linearGradient>
          <!-- Neon Eye Glow Filter -->
          <filter id="${idPrefix}_glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <!-- Floor Soft Shadow -->
        <ellipse cx="75" cy="142" rx="38" ry="7" fill="rgba(0,0,0,0.28)" />

        <!-- FEET / LEGS -->
        <ellipse cx="58" cy="128" rx="11" ry="8" fill="#C82061" stroke="#8A0E38" stroke-width="2.5" />
        <ellipse cx="92" cy="128" rx="11" ry="8" fill="#C82061" stroke="#8A0E38" stroke-width="2.5" />
        <ellipse cx="56" cy="126" rx="5" ry="3" fill="#FF85B3" opacity="0.6" />
        <ellipse cx="90" cy="126" rx="5" ry="3" fill="#FF85B3" opacity="0.6" />

        <!-- BODY -->
        <rect x="52" y="90" width="46" height="36" rx="18" fill="url(#${idPrefix}_yellow)" stroke="#E6007E" stroke-width="3.5" />
        <!-- Belly Panel / Core -->
        <rect x="62" y="99" width="26" height="18" rx="9" fill="#FFFFFF" stroke="#E6007E" stroke-width="1.8" />
        <circle cx="75" cy="108" r="4" fill="#E6007E" />

        <!-- LEFT ARM (Resting / Cute pose) -->
        <path d="M52 96 C40 102 36 112 44 116 C48 118 53 112 55 106 Z" fill="url(#${idPrefix}_yellow)" stroke="#E6007E" stroke-width="3" stroke-linejoin="round" />

        <!-- HEAD: NGÁO SPEECH BUBBLE LOGO SHAPE -->
        <path d="M32 30 C32 23 38 18 46 18 L104 18 C112 18 118 23 118 30 L118 80 C118 87 112 92 104 92 L94 92 L90 106 L80 92 L46 92 C38 92 32 87 32 80 Z" 
              fill="url(#${idPrefix}_yellow)" 
              stroke="#E6007E" 
              stroke-width="4.5" 
              stroke-linejoin="round" 
              stroke-linecap="round" />

        <!-- Cute Top Antenna with Pink Dot -->
        <path d="M75 18 L75 8" stroke="#E6007E" stroke-width="3.5" stroke-linecap="round" />
        <circle cx="75" cy="6" r="5" fill="#E6007E" stroke="#FFFFFF" stroke-width="1.5" />

        <!-- VISOR / DIGITAL SCREEN -->
        <rect x="44" y="34" width="62" height="46" rx="14" fill="url(#${idPrefix}_visor)" stroke="#2C1222" stroke-width="2" />
        <!-- Glossy reflection streak on visor -->
        <path d="M48 40 C60 36 90 36 102 40 C98 44 52 44 48 40 Z" fill="#FFFFFF" opacity="0.18" />

        <!-- GLOWING CYAN EYES & SMILE -->
        <g class="ngao-eyes" filter="url(#${idPrefix}_glow)">
          <path d="M54 58 C54 52 64 52 64 58" stroke="#00F0FF" stroke-width="3.5" stroke-linecap="round" fill="none" />
          <path d="M86 58 C86 52 96 52 96 58" stroke="#00F0FF" stroke-width="3.5" stroke-linecap="round" fill="none" />
          <path d="M70 68 Q75 72 80 68" stroke="#00F0FF" stroke-width="2.5" stroke-linecap="round" fill="none" />
          <circle cx="50" cy="66" r="3" fill="#FF4D94" opacity="0.75" />
          <circle cx="100" cy="66" r="3" fill="#FF4D94" opacity="0.75" />
        </g>

        <!-- RIGHT ARM & WAVING HAND (Animated arm with shoulder origin) -->
        <g class="ngao-waving-arm-group">
          <path d="M98 94 C108 88 116 78 120 64 C122 60 126 62 124 67 C120 78 112 94 100 100 Z" fill="url(#${idPrefix}_yellow)" stroke="#E6007E" stroke-width="3" stroke-linejoin="round" />
          <circle cx="123" cy="60" r="9" fill="url(#${idPrefix}_yellow)" stroke="#E6007E" stroke-width="3" />
          <path d="M120 54 L119 49" stroke="#E6007E" stroke-width="2.5" stroke-linecap="round" />
          <path d="M124 53 L125 47" stroke="#E6007E" stroke-width="2.5" stroke-linecap="round" />
          <path d="M128 54 L131 49" stroke="#E6007E" stroke-width="2.5" stroke-linecap="round" />
          <path d="M136 50 C140 54 140 62 136 66" stroke="#FFDE59" stroke-width="2" stroke-linecap="round" opacity="0.85" />
          <path d="M141 53 C144 57 144 63 141 67" stroke="#E6007E" stroke-width="1.8" stroke-linecap="round" opacity="0.7" />
        </g>
      </svg>
    `;
  }

  // ==========================================================================
  // RENDER COMPLETE EBOOK SECTION INTO #part-ebook
  // ==========================================================================
  function initEbookSection() {
    mountGlobalBot();
    const container = document.getElementById('ebookMountRoot');
    if (!container) return;

    const isUnlocked = sessionStorage.getItem(STORAGE_KEY) === '1';

    container.innerHTML = `
      <!-- 1. PASSWORD VAULT GATE -->
      <div class="ebook-gate-wrap" id="ebookLockGate" style="display: ${isUnlocked ? 'none' : 'block'}">
        <div class="gate-bg-orb orb-1"></div>
        <div class="gate-bg-orb orb-2"></div>

        <div class="gate-content">
          <div class="gate-motion-emblem">
            <div class="gate-ring"></div>
            <div class="gate-ring-inner"></div>
            <div class="gate-lock-core" id="gateLockIcon">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
          </div>

          <span class="gate-badge">🔒 Học liệu độc quyền · Chỉ dành cho học viên</span>
          <h2 class="gate-title">Dùng Claude Làm Web & Video:<br>Câu Lệnh Thực Chiến Cho Người Mới</h2>
          <p class="gate-subtitle">
            Cẩm nang tương tác Motion Graphic từ <strong>Trainer Nguyễn Hoà</strong> (Founder Edit Không Khó).<br>
            Tích hợp <strong>Máy ghép câu lệnh</strong>, <strong>Mô phỏng 4K</strong> và <strong>Bot AI giải đáp 24/7</strong>.
          </p>

          <div class="gate-preview-pills">
            <span class="gate-pill">🧩 Công thức 4 Mảnh & 4K</span>
            <span class="gate-pill">❤️ AI Phỏng vấn Hồ sơ</span>
            <span class="gate-pill">🚀 Làm Web & GitHub Pages</span>
            <span class="gate-pill">🎬 Tự động Phụ đề Whisper</span>
            <span class="gate-pill">🤖 Bot AI Trả lời Ebook</span>
          </div>

          <form class="gate-form" onsubmit="window.EbookApp.handleUnlock(event)">
            <div class="gate-input-group" id="gateInputGroup">
              <input
                type="password"
                id="ebookPassInput"
                class="gate-pass-input"
                placeholder="Nhập mã PASS học viên (VD: NGAO2026)..."
                autocomplete="off"
                required
              >
              <button type="submit" class="gate-unlock-btn">Mở Khoá Ebook →</button>
            </div>
            <div class="gate-feedback" id="gateFeedback" aria-live="polite"></div>
          </form>

          <div class="gate-quick-demo">
            <span>🔑 Mã học viên lớp 12/12: <strong>NGAO2026</strong></span>
            <button type="button" onclick="window.EbookApp.quickUnlockDemo()">Điền nhanh & Mở ngay ⚡</button>
          </div>
        </div>
      </div>

      <!-- 2. UNLOCKED INTERACTIVE EBOOK WORKSPACE -->
      <div class="ebook-workspace ${isUnlocked ? 'unlocked' : ''}" id="ebookUnlockedView">
        
        <!-- HERO & MOTION 5-STEP JOURNEY MAP -->
        <div class="eb-hero-banner">
          <div class="eb-hero-top">
            <div class="eb-author-chip">
              <span>🎬</span>
              <span>Nov 18, 2026 · <strong>@Nguyễn Hoà</strong> (Founder Edit Không Khó)</span>
            </div>
            <div class="eb-hero-actions">
              <button type="button" class="eb-btn-action gold" onclick="window.EbookApp.scrollToBot()">
                <span>🤖 Hỏi Bot Trợ Lý Ebook</span>
              </button>
              <a href="EBOOK_CLAUDE_WEB_VIDEO_NGUYEN_HOA.md" download="EBOOK_CLAUDE_WEB_VIDEO_NGUYEN_HOA.md" class="eb-btn-action">
                <span>📥 Tải file gốc (.md)</span>
              </a>
              <button type="button" class="eb-btn-action" onclick="window.EbookApp.lockEbook()">
                <span>🔒 Khóa lại</span>
              </button>
            </div>
          </div>

          <h2 class="eb-hero-title">Dùng Claude làm web và video: Câu lệnh thực chiến cho người mới</h2>
          <p class="eb-hero-desc">
            AI là trợ lý, bạn là bà chủ. Không cần giỏi công nghệ — nếu biết nhắn Zalo, bạn đã biết dùng AI. Hãy bấm vào từng bước trên <strong>Bản đồ hành trình của chị Mai (tiệm bánh ít đường Bếp Mai)</strong> bên dưới để tương tác trực tiếp:
          </p>

          <!-- Interactive 6-Step Journey Track -->
          <div class="eb-journey-box">
            <div class="eb-journey-head">
              <span>🗺️ BẢN ĐỒ HÀNH TRÌNH 6 BƯỚC (BẤM CHỌN ĐỂ TƯƠNG TÁC)</span>
              <span id="journeyStatusText">Đang xem: Bước 1 · Giao việc & Tìm hiểu</span>
            </div>
            <div class="eb-journey-track">
              <button type="button" class="eb-step-node active" data-step="1" onclick="window.EbookApp.selectJourneyStep(1, 'lesson1')">
                <span class="s-num">BƯỚC 01 · BÀI 1, 2</span>
                <strong>Giao việc & Tìm hiểu</strong>
                <small>Câu lệnh 4 mảnh & bảng thị trường có nguồn</small>
              </button>
              <button type="button" class="eb-step-node" data-step="2" onclick="window.EbookApp.selectJourneyStep(2, 'lesson3')">
                <span class="s-num">BƯỚC 02 · BÀI 3 ❤️</span>
                <strong>Để AI phỏng vấn bạn</strong>
                <small>Trái tim hành trình → Ra Hồ sơ thương hiệu</small>
              </button>
              <button type="button" class="eb-step-node" data-step="3" onclick="window.EbookApp.selectJourneyStep(3, 'lesson4')">
                <span class="s-num">BƯỚC 03 · BÀI 4 🎨</span>
                <strong>Khảo sát & Brand Guideline</strong>
                <small>Khai quật DNA, PDF 24 slide & File .md</small>
              </button>
              <button type="button" class="eb-step-node" data-step="4" onclick="window.EbookApp.selectJourneyStep(4, 'lesson5')">
                <span class="s-num">BƯỚC 04 · BÀI 5</span>
                <strong>Tạo Project riêng</strong>
                <small>Ngăn tủ lưu hồ sơ & Brand Guideline</small>
              </button>
              <button type="button" class="eb-step-node" data-step="5" onclick="window.EbookApp.selectJourneyStep(5, 'lesson6')">
                <span class="s-num">BƯỚC 05 · BÀI 6</span>
                <strong>Làm trang web</strong>
                <small>Trang web 1 trang theo Brand Guideline</small>
              </button>
              <button type="button" class="eb-step-node" data-step="6" onclick="window.EbookApp.selectJourneyStep(6, 'lesson7')">
                <span class="s-num">BƯỚC 06 · BÀI 7</span>
                <strong>Đóng gói Skill</strong>
                <small>Dạy Claude 1 lần, tái sử dụng mãi mãi</small>
              </button>
            </div>
          </div>
        </div>

        <!-- STUDENT SURVEY FEATURED BANNER -->
        <div class="eb-survey-featured-banner">
          <div class="eb-survey-feat-left">
            <div class="eb-survey-feat-badge-row">
              <span class="eb-survey-feat-badge">🎓 DÀNH CHO HỌC VIÊN · KHẢO SÁT 15 CÂU</span>
              <span class="eb-survey-feat-pill">BẢN HỌC VIÊN</span>
            </div>
            <h3 class="eb-survey-feat-title">Khai quật Brand DNA & nhận tệp Brand Guideline PDF 24 slide trước buổi học</h3>
            <p class="eb-survey-feat-desc">Nhìn hình chọn đáp án trực quan để xác định phong cách thiết kế, bộ màu HEX, typography và xuất tệp hồ sơ .md phục vụ thực hành tạo Web & Video.</p>
          </div>
          <a href="brand-discovery.html" target="_blank" rel="noopener noreferrer" class="eb-survey-feat-cta">
            <span>Bắt đầu khảo sát 15 câu</span>
            <span class="cta-arrow">→</span>
          </a>
        </div>

        <!-- MAIN EBOOK GRID: SIDEBAR + STAGE -->
        <div class="eb-layout-grid">
          <!-- Sidebar -->
          <aside class="eb-sidebar" aria-label="Mục lục Ebook">
            <div class="eb-progress-box">
              <div class="eb-progress-top">
                <span>Tiến độ khám phá Ebook</span>
                <span id="ebProgressText">1 / 13 mục</span>
              </div>
              <div class="eb-progress-bar">
                <div class="eb-progress-fill" id="ebProgressFill" style="width: 8%"></div>
              </div>
            </div>

            <div class="eb-search-box">
              <span class="eb-search-icon">🔍</span>
              <input
                type="search"
                id="ebChapterFilter"
                class="eb-search-input"
                placeholder="Lọc nhanh bài học, câu lệnh..."
                oninput="window.EbookApp.filterChapters(this.value)"
              >
            </div>

            <ul class="eb-chapter-list" id="ebChapterList">
              ${CHAPTERS.map((c, i) => `
                <li data-title="${c.title.toLowerCase()}">
                  <button
                    type="button"
                    class="eb-chapter-btn ${i === 0 ? 'active' : ''}"
                    id="ebTab_${c.id}"
                    onclick="window.EbookApp.switchChapter('${c.id}')"
                  >
                    <span class="c-icon">${c.icon}</span>
                    <span>${c.title}</span>
                    <span class="c-tag">${c.tag}</span>
                  </button>
                </li>
              `).join('')}
            </ul>
          </aside>

          <!-- Interactive Content Stage -->
          <div class="eb-stage" id="ebStageContainer">
            ${renderAllModules()}
          </div>
        </div>
      </div>
    `;
  }

  // ==========================================================================
  // MOUNT GLOBAL AI ASSISTANT (NGÁO BOT) TRÊN TOÀN BỘ WEBSITE
  // Cho phép khách truy cập bấm vào hỏi & nói về toàn bộ thông tin có trên web
  // ==========================================================================
  function mountGlobalBot() {
    let mountRoot = document.getElementById('globalBotMountRoot');
    if (!mountRoot) {
      mountRoot = document.createElement('div');
      mountRoot.id = 'globalBotMountRoot';
      document.body.appendChild(mountRoot);
    }
    mountRoot.innerHTML = `
      <!-- 1. FLOATING MASCOT BOT TRIGGER (Con bot vẫy tay mời chào trên toàn web) -->
      <div class="ngao-bot-floating-widget" id="ngaoBotFloatingWidget" style="display:flex">
        <button type="button" class="ngao-bot-mascot-btn" onclick="window.EbookApp.toggleBotModal(true)" aria-label="Mở Trợ lý AI Ngáo Bot">
          <div class="ngao-bot-bubble">👋 Bấm để hỏi bất kỳ thông tin nào trên Web!</div>
          <div class="ngao-bot-floater">
            ${renderNgaoMascotSVG({ width: 135, height: 135, idPrefix: 'ngaoFloatBot' })}
          </div>
        </button>
      </div>

      <!-- 2. VIRTUAL AI ASSISTANT MODAL (Hiện ra khi bấm vào con bot) -->
      <div class="ngao-bot-modal-backdrop" id="ngaoBotModalBackdrop" onclick="window.EbookApp.handleBackdropClick(event)">
        <div class="ngao-bot-modal-container">
          <div class="eb-bot-dock" id="ebookAiBotDock">
            <div class="eb-bot-header">
              <div class="eb-bot-identity">
                <div class="eb-bot-avatar-mascot">
                  ${renderNgaoMascotSVG({ width: 38, height: 38, idPrefix: 'ngaoHeaderBot' })}
                </div>
                <div class="eb-bot-title-group">
                  <div class="eb-bot-title-line">
                    <strong class="eb-bot-title-text">Ngáo Bot · Trợ Lý AI</strong>
                    <span class="eb-bot-online-badge">● 24/7</span>
                  </div>
                  <div class="eb-bot-subtext">Hỏi đáp & phát âm thanh về toàn bộ Website & Khoá học!</div>
                </div>
              </div>
              <div class="eb-bot-actions-row">
                <select class="eb-bot-voice-select" id="ebBotVoiceSelect" onchange="window.EbookApp.changeVoice(this.value)" title="Chọn giọng AI đọc câu trả lời">
                  <option value="female" selected>🌸 Giọng Nữ AI (Hoài My)</option>
                  <option value="male">🎙️ Giọng Nam AI (Nam Minh)</option>
                  <option value="system">🤖 Giọng Thiết Bị (Browser)</option>
                </select>
                <button type="button" class="eb-bot-voice-toggle" id="ebBotVoiceToggle" onclick="window.EbookApp.toggleAutoVoice()" title="Bật/Tắt chế độ tự động đọc câu trả lời bằng giọng nói">
                  <span>🔊</span>
                  <span id="ebVoiceToggleText">Tự đọc</span>
                </button>
                <div class="eb-bot-wave" id="ebBotHeaderWave" title="AI Voice Ready">
                  <span></span><span></span><span></span>
                </div>
                <button type="button" class="eb-bot-close-btn" onclick="window.EbookApp.toggleBotModal(false)" aria-label="Đóng popup bot">✕</button>
              </div>
            </div>

            <!-- Quick Question Chips Covering Entire Website -->
            <div class="eb-bot-suggestions">
              <span style="font-size:11px;font-weight:800;color:#FFDE59;white-space:nowrap">💡 Hỏi nhanh trên Web:</span>
              <button type="button" class="eb-bot-chip" onclick="window.EbookApp.askBotPreset('kb_logistics')">📍 Lịch học & Địa điểm ở đâu?</button>
              <button type="button" class="eb-bot-chip" onclick="window.EbookApp.askBotPreset('kb_tuition')">💳 Học phí bao nhiêu, gồm những gì?</button>
              <button type="button" class="eb-bot-chip" onclick="window.EbookApp.askBotPreset('kb_trainers')">👥 Giới thiệu 2 giảng viên?</button>
              <button type="button" class="eb-bot-chip" onclick="window.EbookApp.askBotPreset('kb_curriculum_3pillars')">📚 Khoá học gồm những nội dung gì?</button>
              <button type="button" class="eb-bot-chip" onclick="window.EbookApp.askBotPreset('kb_benefits')">🎁 Quyền lợi học viên & 14 ngày?</button>
              <button type="button" class="eb-bot-chip" onclick="window.EbookApp.askBotPreset('kb_brandguide_tool')">🎨 Khảo sát 15 câu dùng làm gì?</button>
              <button type="button" class="eb-bot-chip" onclick="window.EbookApp.askBotPreset('kb_register')">✍️ Làm sao để đăng ký giữ chỗ?</button>
              <button type="button" class="eb-bot-chip" onclick="window.EbookApp.askBotPreset('kb_requirements')">💻 Cần chuẩn bị gì khi đi học?</button>
              <button type="button" class="eb-bot-chip" onclick="window.EbookApp.askBotPreset('kb_4k')">🧠 Công thức 4K là gì?</button>
              <button type="button" class="eb-bot-chip" onclick="window.EbookApp.askBotPreset('kb_ebook_pass')">🔒 Mật khẩu xem Ebook học viên?</button>
            </div>

            <!-- Chat History -->
            <div class="eb-bot-messages" id="ebBotMessages">
              <div class="bot-msg-row bot">
                <div class="bot-msg-bubble">
                  <div class="bot-cite-tag">🎬 Xin chào bạn đến với Personal Branding Mastery!</div>
                  <div>
                    Mình là <strong>Ngáo Bot — Trợ Lý AI của Website & Khoá học Personal Branding Mastery</strong>.<br><br>
                    Bạn có thể <strong>gõ câu hỏi</strong> hoặc <strong>bấm nút micro 🎙️ để nói bằng giọng nói</strong> về bất kỳ nội dung nào có trên web:
                    <ul style="margin:8px 0 0 16px;padding:0;line-height:1.6;font-size:12.5px">
                      <li>📅 <strong>Thời gian, địa điểm & học phí</strong> khoá học 12/12/2026.</li>
                      <li>👥 <strong>Thông tin 2 giảng viên</strong> Ngọc Tâm & Nguyễn Hoà.</li>
                      <li>📚 <strong>Nội dung 3 Trục tư duy</strong> & quyền lợi 14 ngày đồng hành.</li>
                      <li>🎨 <strong>Bài test 15 câu</strong> & cách xuất bộ Brand Guideline 24 slide.</li>
                      <li>✍️ <strong>Cách đăng ký</strong> giữ chỗ & hotline hỗ trợ.</li>
                      <li>📖 <strong>Toàn bộ cẩm nang Ebook</strong> làm web & video bằng AI!</li>
                    </ul>
                  </div>
                  <div class="eb-bot-voice-actions">
                    <button type="button" class="bot-voice-btn" data-audio-key="greeting" onclick="window.EbookApp.speakGreeting(this)">
                      <span>🔊</span>
                      <span>Bấm nghe Ngáo Bot chào mừng</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Input Bar -->
            <form class="eb-bot-input-bar" onsubmit="window.EbookApp.handleBotSubmit(event)">
              <button type="button" class="eb-bot-mic-btn" id="ebBotMicBtn" onclick="window.EbookApp.toggleVoiceInput()" title="Nói câu hỏi bằng giọng nói tiếng Việt (Microphone)">🎙️</button>
              <input
                type="text"
                id="ebBotInput"
                class="eb-bot-input"
                placeholder="Hỏi Bot về bất kỳ nội dung nào trên web (hoặc bấm 🎙️ để nói)..."
                autocomplete="off"
              >
              <button type="submit" class="eb-bot-send">Gửi câu hỏi ↗</button>
            </form>
          </div>
        </div>
      </div>
    `;
  }

  // ==========================================================================
  // RENDER ALL 12 INTERACTIVE EBOOK MODULES
  // ==========================================================================
  function renderAllModules() {
    return `
      <!-- MODULE 1: MỞ ĐẦU & BẢN ĐỒ -->
      <article class="eb-module active" id="ebMod_intro">
        <div class="eb-meta-strip">
          <div class="eb-meta-item">
            <small>Tư duy cốt lõi</small>
            <strong>AI là trợ lý, bạn là bà chủ</strong>
          </div>
          <div class="eb-meta-item">
            <small>Công cụ & Thời lượng</small>
            <strong>Claude Desktop / Web · ~60 phút</strong>
          </div>
          <div class="eb-meta-item">
            <small>Đầu ra thực chiến</small>
            <strong>Hồ sơ thương hiệu + Web + Video AI</strong>
          </div>
        </div>

        <h2 class="eb-h2">Mở đầu: AI là trợ lý, bạn là bà chủ</h2>
        <p class="eb-p">
          Bạn không cần giỏi công nghệ để dùng AI. <strong>Nếu bạn biết nhắn tin Zalo, bạn đã biết dùng AI.</strong> Khác biệt duy nhất: bạn đang nhắn tin cho một trợ lý rất giỏi nhưng <strong>chưa biết gì về bạn</strong>. Ebook này dạy bạn cách "giao việc" cho trợ lý đó, bằng những câu lệnh chép về dùng được ngay.
        </p>

        <div class="eb-story-card">
          <div class="eb-story-avatar">🧁</div>
          <div>
            <strong style="font-size:14px;color:var(--primary-dark);display:block;margin-bottom:4px">Ví dụ xuyên suốt: Câu chuyện của Chị Mai — Tiệm bánh "Bếp Mai"</strong>
            <p style="font-size:13px;color:var(--text-muted);margin:0;line-height:1.55">
              Chúng ta đồng hành cùng <em>chị Mai</em>, 8 năm làm bánh ít đường, chủ tiệm nhỏ <strong>"Bếp Mai"</strong> ở Đà Nẵng. Chị muốn có một trang web giới thiệu và những video ngắn để mọi người biết đến bánh của chị. Khi thực hành, bạn cứ thay câu chuyện của chị Mai bằng nghề của mình!
            </p>
          </div>
        </div>

        <h3 class="eb-h3">✨ Giải nghĩa 4 từ khoá sẽ gặp (Bấm vào từng thẻ để xem ví dụ trực quan)</h3>
        <div class="eb-term-grid">
          <div class="eb-term-card" onclick="this.classList.toggle('expanded')">
            <div class="t-head">
              <span class="t-name">1. Prompt (Câu lệnh)</span>
              <span class="t-badge">Giao việc</span>
            </div>
            <p style="font-size:13px;color:var(--text-muted);margin:0">
              Tin nhắn bạn gửi cho AI để giao việc. Thay vì hỏi trống không, ta dùng câu lệnh 4 mảnh để AI làm đúng ý ngay từ đầu.
            </p>
          </div>
          <div class="eb-term-card" onclick="this.classList.toggle('expanded')">
            <div class="t-head">
              <span class="t-name">2. Project (Dự án)</span>
              <span class="t-badge">Ngăn tủ riêng</span>
            </div>
            <p style="font-size:13px;color:var(--text-muted);margin:0">
              Một "ngăn tủ" riêng trong Claude, cất sẵn Hồ sơ thương hiệu, bảng giá, logo để lần nào hỏi cũng không phải kể lại từ đầu.
            </p>
          </div>
          <div class="eb-term-card" onclick="this.classList.toggle('expanded')">
            <div class="t-head">
              <span class="t-name">3. Artifact (Sản phẩm)</span>
              <span class="t-badge">Khung xem trước</span>
            </div>
            <p style="font-size:13px;color:var(--text-muted);margin:0">
              Sản phẩm Claude làm ra và hiện ngay bên cạnh khung chat: trang web hoàn chỉnh, tài liệu, bảng tính có thể bấm Share lấy link.
            </p>
          </div>
          <div class="eb-term-card" onclick="this.classList.toggle('expanded')">
            <div class="t-head">
              <span class="t-name">4. Skill (Kỹ năng)</span>
              <span class="t-badge">Công thức nấu</span>
            </div>
            <p style="font-size:13px;color:var(--text-muted);margin:0">
              Một "công thức nấu" bạn dạy Claude một lần (VD: quy trình viết kịch bản 30s, làm phụ đề .srt), lần sau Claude tự làm đúng cách đó.
            </p>
          </div>
        </div>

        <h3 class="eb-h3">🗺️ Tổng quan lộ trình thực hành trong Ebook</h3>
        <div class="eb-table-wrap">
          <table class="eb-table">
            <thead>
              <tr>
                <th>Việc</th>
                <th>Bài trong Ebook</th>
                <th>Bạn có được sau khi làm</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Tư duy giao việc</strong></td>
                <td>Mục Tư duy</td>
                <td>4 quy tắc: AI phỏng vấn trước, nhờ phản biện, sửa bằng 4K, ghi rõ <code>(AI suy luận)</code></td>
              </tr>
              <tr>
                <td><strong>Dùng Claude cơ bản</strong></td>
                <td>Bài 1, Bài 2</td>
                <td>Câu lệnh 4 mảnh, bảng tìm hiểu thị trường & đối thủ có nguồn</td>
              </tr>
              <tr>
                <td><strong>Cho Claude hiểu bạn</strong></td>
                <td>Bài 3, Bài 4</td>
                <td>Hồ sơ thương hiệu (Trái tim hành trình) và Project để không phải kể lại</td>
              </tr>
              <tr>
                <td><strong>Làm trang web</strong></td>
                <td>Bài 5</td>
                <td>Trang web một trang từ 15 câu hỏi, chia sẻ bằng link, đưa lên GitHub Pages</td>
              </tr>
              <tr>
                <td><strong>Dùng lại cách làm</strong></td>
                <td>Bài 6</td>
                <td>Skill: dạy Claude một lần, dùng mãi ở mọi cuộc trò chuyện</td>
              </tr>
              <tr>
                <td><strong>Nâng cao & Video AI</strong></td>
                <td>Bài 7, 8, Phụ lục</td>
                <td>File .md và JSON; lệnh giữ Claude Code không đầy; tự làm phụ đề .srt & 6 thư mục video</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="part-nav-footer" style="margin-top:24px">
          <span style="font-size:12px;color:var(--text-muted)">Mục 1 / 12 · Mở đầu</span>
          <button type="button" class="btn-step-next" onclick="window.EbookApp.switchChapter('mindset')">
            <span>Tiếp theo: Tư duy & Công thức 4K</span>
            <span>→</span>
          </button>
        </div>
      </article>

      <!-- MODULE 2: TƯ DUY & CÔNG THỨC 4K -->
      <article class="eb-module" id="ebMod_mindset">
        <div class="eb-meta-strip">
          <div class="eb-meta-item">
            <small>Vai trò của bạn</small>
            <strong>Chủ giao việc & Kiểm duyệt</strong>
          </div>
          <div class="eb-meta-item">
            <small>Công thức độc quyền</small>
            <strong>4K (Khoanh - Kỳ vọng - Kiểm - Khóa)</strong>
          </div>
          <div class="eb-meta-item">
            <small>Hàng rào chống bịa</small>
            <strong>Ghi rõ (AI suy luận)</strong>
          </div>
        </div>

        <h2 class="eb-h2">Tư duy trước khi bắt đầu: Bạn là người giao việc</h2>
        <p class="eb-p">
          Với Claude, bạn là <strong>chủ giao việc</strong>, còn AI là <strong>nhân viên thực thi</strong>: làm nhanh, không biết mệt, nhưng <strong>không tự biết</strong> doanh nghiệp, khách hàng hay gu của bạn. Giao việc mơ hồ thì ra kết quả mơ hồ.
        </p>

        <div style="background:#FFF4F7;border:1.5px solid #F1C2D3;border-radius:14px;padding:14px 18px;margin-bottom:20px">
          <strong style="color:var(--primary-dark);font-size:13.5px">🛡️ Quy tắc chung cho mọi câu lệnh:</strong>
          <p style="font-size:13px;color:var(--text);margin-top:4px">
            Luôn thêm câu này vào cuối lời nhờ của bạn: <code>"Phần nào bạn suy luận (không có nguồn hoặc dữ liệu thật), hãy ghi rõ là (AI suy luận)."</code> Nhờ vậy bạn phân biệt được đâu là sự thật, đâu là AI đoán.
          </p>
        </div>

        <h3 class="eb-h3">1️⃣ Quy tắc 2: Để AI phỏng vấn bạn trước khi làm</h3>
        <p class="eb-p">Đừng gõ ngay "viết giúp mình bài đăng". Hãy nói việc mình muốn, rồi bảo AI hỏi lại mình trước (tối đa 7 câu):</p>
        ${renderPromptCard('Câu lệnh để AI phỏng vấn trước khi làm', `Mình muốn bạn giúp mình [việc cần làm]. Trước khi làm, hãy phỏng vấn mình: hỏi từng lần một câu, tối đa 7 câu, về mục tiêu, người sẽ xem, giọng điệu, điều cần tránh và ví dụ mình thích. Khi đã đủ thông tin, hãy tóm tắt lại những gì bạn hiểu và chờ mình xác nhận rồi mới bắt đầu làm.`)}

        <h3 class="eb-h3">2️⃣ Quy tắc 3: Nhờ AI chỉ ra điểm mù tư duy (Phản biện thẳng thắn)</h3>
        <p class="eb-p">AI có xu hướng chiều và khen bạn. Muốn có phản biện thật, hãy dùng câu lệnh này sau khi có ý tưởng/kế hoạch:</p>
        ${renderPromptCard('Câu lệnh bắt AI phản biện & chỉ ra điểm mù', `Hãy đóng vai người phản biện thẳng thắn cho ý tưởng/kế hoạch ở trên. Không khen xã giao. Cho mình: (1) 3 điều mình đang mặc định là đúng nhưng chưa kiểm chứng, (2) 3 điểm mình có thể đang không nhìn thấy, (3) lý do mạnh nhất khiến kế hoạch này thất bại, (4) một cách làm khác tốt hơn nếu có. Với mỗi ý, nói rõ vì sao.`)}

        <!-- INTERACTIVE MOTION GRAPHIC WIDGET: 4K SIMULATOR -->
        <div class="eb-motion-widget">
          <div class="eb-widget-head">
            <span class="eb-widget-badge">🎛️ Tương tác Motion Graphic · Công thức 4K của Nguyễn Hoà</span>
            <small style="font-size:12px;color:var(--text-muted);font-weight:700">Bấm vào từng chữ K để xem cách trị bệnh AI viết sai</small>
          </div>

          <div class="k4-stepper">
            <button type="button" class="k4-btn active" onclick="window.EbookApp.select4K(1, this)">
              <span class="k-letter">K1</span>
              <strong>Khoanh</strong>
              <small style="font-size:11px;color:var(--text-muted)">Chỉ đúng chỗ sai</small>
            </button>
            <button type="button" class="k4-btn" onclick="window.EbookApp.select4K(2, this)">
              <span class="k-letter">K2</span>
              <strong>Kỳ vọng</strong>
              <small style="font-size:11px;color:var(--text-muted)">Nêu rõ điều muốn</small>
            </button>
            <button type="button" class="k4-btn" onclick="window.EbookApp.select4K(3, this)">
              <span class="k-letter">K3</span>
              <strong>Kiểm nguyên nhân</strong>
              <small style="font-size:11px;color:var(--text-muted)">Hỏi AI hiểu thế nào</small>
            </button>
            <button type="button" class="k4-btn" onclick="window.EbookApp.select4K(4, this)">
              <span class="k-letter">K4</span>
              <strong>Khóa quy tắc</strong>
              <small style="font-size:11px;color:var(--text-muted)">Ghi vào Project</small>
            </button>
          </div>

          <div id="k4DetailStage" style="background:#fff;border:1.5px solid #F1CAD8;border-radius:14px;padding:16px 18px;transition:all 0.3s">
            <div style="font-size:12px;font-weight:850;color:var(--primary);text-transform:uppercase;margin-bottom:4px">Bước 1 / 4 · KHOANH VÙNG LỖI SAI</div>
            <div style="font-size:15px;font-weight:800;color:var(--primary-dark);margin-bottom:6px">Chỉ đúng chỗ sai, tuyệt đối không nói chung chung "làm lại đi"</div>
            <p style="font-size:13.5px;color:var(--text-muted);margin:0">
              ❌ Sai: <em>"Bài này nghe chán quá, viết lại đi."</em><br>
              ✅ Đúng (Khoanh): <strong>"Câu mở đầu của đoạn 2 nghe quá quảng cáo và xa cách."</strong>
            </p>
          </div>
        </div>

        ${renderPromptCard('Câu lệnh mẫu gộp đủ 4 bước 4K', `Chỗ này chưa đúng ý mình: [dán hoặc mô tả đúng chỗ sai]. Mình muốn [kết quả mong muốn]. Bạn hiểu yêu cầu của mình thế nào nên mới viết như vậy? Sau đó hãy viết lại, rồi cho mình một quy tắc ngắn để ghi vào hướng dẫn của Project (Bài 4), để lần sau bạn không sai như thế nữa.`)}

        <div style="background:var(--bg);border:1px solid var(--border);border-radius:13px;padding:14px 16px;font-size:13px;color:var(--text-muted)">
          <strong style="color:var(--primary-dark)">💡 Vì sao không dùng khung 4A của Netflix?</strong><br>
          Netflix có khung góp ý 4A (<em>Aim to assist, Actionable, Appreciate, Accept or discard</em>) trong cuốn <em>No Rules Rules</em>. Khung đó viết cho <strong>người với người</strong>. Hai chữ đầu áp dụng được với AI, nhưng hai chữ sau (biết ơn, tự quyết định nhận hay bỏ) không hợp với AI nên công thức <strong>4K</strong> bỏ đi và thay bằng bước <strong>Khóa quy tắc</strong> vào Project.
        </div>

        <div class="part-nav-footer" style="margin-top:24px">
          <button type="button" class="btn-step-prev" onclick="window.EbookApp.switchChapter('intro')">← Mở đầu</button>
          <button type="button" class="btn-step-next" onclick="window.EbookApp.switchChapter('setup')">
            <span>Tiếp theo: Cài Claude Desktop</span>
            <span>→</span>
          </button>
        </div>
      </article>

      <!-- MODULE 3: CÀI CLAUDE DESKTOP -->
      <article class="eb-module" id="ebMod_setup">
        <div class="eb-meta-strip">
          <div class="eb-meta-item">
            <small>Mục tiêu</small>
            <strong>Cài ứng dụng Claude trên máy tính</strong>
          </div>
          <div class="eb-meta-item">
            <small>Thời gian</small>
            <strong>5 phút (Làm trước buổi học)</strong>
          </div>
          <div class="eb-meta-item">
            <small>Bạn có được</small>
            <strong>Claude Desktop đã đăng nhập sẵn sàng</strong>
          </div>
        </div>

        <h2 class="eb-h2">Cài Claude Desktop (Làm trước buổi học)</h2>
        <p class="eb-p">
          Hệ thống yêu cầu máy chạy <strong>macOS 11 trở lên</strong> hoặc <strong>Windows 10 trở lên</strong>. Làm theo 4 bước nhanh:
        </p>

        <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-bottom:22px">
          <div style="background:var(--bg);border:1.5px solid var(--border);border-radius:14px;padding:14px">
            <strong style="color:var(--primary);font-size:12px">BƯỚC 1 & 2</strong>
            <h4 style="font-size:14.5px;color:var(--primary-dark);margin:4px 0">Tải đúng bản Mac hoặc Windows</h4>
            <p style="font-size:12.5px;color:var(--text-muted)">
              Mở <a href="https://claude.com/download" target="_blank" rel="noopener" style="color:var(--primary);font-weight:800;text-decoration:underline">claude.com/download</a>. Chọn <strong>macOS</strong> hoặc <strong>Windows</strong> (x64 hoặc arm64 — kiểm tra trong <em>Settings → System → About → System type</em>).
            </p>
          </div>
          <div style="background:var(--bg);border:1.5px solid var(--border);border-radius:14px;padding:14px">
            <strong style="color:var(--primary);font-size:12px">BƯỚC 3 & 4</strong>
            <h4 style="font-size:14.5px;color:var(--primary-dark);margin:4px 0">Cài đặt & Đăng nhập</h4>
            <p style="font-size:12.5px;color:var(--text-muted)">
              Mở file vừa tải về để cài. Sau đó mở Claude từ thư mục <strong>Applications</strong> (Mac) hoặc <strong>Start Menu</strong> (Windows) và đăng nhập tài khoản.
            </p>
          </div>
        </div>

        <h3 class="eb-h3">🖥️ Ba khu vực trong ứng dụng Claude Desktop & Gói sử dụng</h3>
        <div class="eb-table-wrap">
          <table class="eb-table">
            <thead>
              <tr>
                <th>Khu vực</th>
                <th>Dùng để làm gì</th>
                <th>Gói tài khoản</th>
                <th>Dùng ở bài nào</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>💬 Chat</strong></td>
                <td>Trò chuyện, làm Project, làm trang web, đóng gói Skill</td>
                <td><span style="background:#EAF6ED;color:#2F7A48;padding:2px 8px;border-radius:99px;font-weight:800;font-size:11.5px">Mọi gói (Kể cả Free)</span></td>
                <td>Bài 1 đến Bài 7</td>
              </tr>
              <tr>
                <td><strong>⚡ Code (Claude Code)</strong></td>
                <td>Để Claude làm việc trực tiếp trên máy tính (tạo thư mục, cắt video, phụ đề)</td>
                <td><span style="background:#FFF0F6;color:#C82061;padding:2px 8px;border-radius:99px;font-weight:800;font-size:11.5px">Pro, Max, Team, Enterprise</span></td>
                <td>Bài 8, Phụ lục</td>
              </tr>
              <tr>
                <td><strong>🤝 Cowork</strong></td>
                <td>Giao việc cho Claude làm với file tài liệu trên máy</td>
                <td><span style="background:#FFF0F6;color:#C82061;padding:2px 8px;border-radius:99px;font-weight:800;font-size:11.5px">Pro, Max, Team, Enterprise</span></td>
                <td>Ebook này chưa dùng</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="part-nav-footer" style="margin-top:24px">
          <button type="button" class="btn-step-prev" onclick="window.EbookApp.switchChapter('mindset')">← Tư duy & 4K</button>
          <button type="button" class="btn-step-next" onclick="window.EbookApp.switchChapter('lesson1')">
            <span>Tiếp theo: Bài 1 — Câu lệnh 4 mảnh</span>
            <span>→</span>
          </button>
        </div>
      </article>

      <!-- MODULE 4: BÀI 1 — CÂU LỆNH 4 MẢNH -->
      <article class="eb-module" id="ebMod_lesson1">
        <div class="eb-meta-strip">
          <div class="eb-meta-item">
            <small>Mục tiêu</small>
            <strong>Biết giao việc để Claude trả lời đúng ý</strong>
          </div>
          <div class="eb-meta-item">
            <small>Thời gian</small>
            <strong>3 phút thực hành</strong>
          </div>
          <div class="eb-meta-item">
            <small>Bạn có được</small>
            <strong>Mẫu câu lệnh 4 mảnh chép dùng ngay</strong>
          </div>
        </div>

        <h2 class="eb-h2">Bài 1 — Câu lệnh đầu tiên: Công thức 4 mảnh</h2>
        <p class="eb-p">
          AI trả lời chung chung vì ta hỏi chung chung. Một câu lệnh tốt giống lời dặn việc đầy đủ cho nhân viên mới, gồm <strong>4 mảnh nằm chung trong một tin nhắn</strong>:
        </p>

        <!-- INTERACTIVE 4-PIECE PUZZLE BUILDER -->
        <div class="eb-motion-widget">
          <div class="eb-widget-head">
            <span class="eb-widget-badge">🧩 Máy Ghép Câu Lệnh 4 Mảnh Trực Quan</span>
            <small style="font-size:12px;color:var(--text-muted);font-weight:700">Bấm chọn mẫu nghề nghiệp hoặc tự nhập thông tin của bạn</small>
          </div>

          <div class="puzzle-presets">
            <button type="button" class="puzzle-preset-btn active" onclick="window.EbookApp.loadPuzzlePreset('bepmai', this)">🧁 Chị Mai (Tiệm bánh ít đường)</button>
            <button type="button" class="puzzle-preset-btn" onclick="window.EbookApp.loadPuzzlePreset('creator', this)">🎬 Content Creator / Editor</button>
            <button type="button" class="puzzle-preset-btn" onclick="window.EbookApp.loadPuzzlePreset('marketing', this)">📈 Chuyên gia Marketing / Coach</button>
            <button type="button" class="puzzle-preset-btn" onclick="window.EbookApp.loadPuzzlePreset('shop', this)">🛍️ Chủ Shop Thời trang</button>
          </div>

          <div class="puzzle-grid-4">
            <div class="puzzle-piece-card">
              <label><span>1️⃣</span> Mảnh 1: Vai trò (AI đóng vai ai?)</label>
              <input type="text" id="pzRole" value="chuyên gia marketing cho các tiệm nhỏ" oninput="window.EbookApp.updatePuzzleOutput()">
            </div>
            <div class="puzzle-piece-card">
              <label><span>2️⃣</span> Mảnh 2: Bối cảnh (Bạn là ai, bán gì, cho ai?)</label>
              <input type="text" id="pzContext" value="tiệm bánh handmade ở Đà Nẵng, bán bánh ít đường, khách là mẹ bỉm 25–40 tuổi quan tâm sức khỏe gia đình" oninput="window.EbookApp.updatePuzzleOutput()">
            </div>
            <div class="puzzle-piece-card">
              <label><span>3️⃣</span> Mảnh 3: Việc cần làm (Cụ thể cần gì?)</label>
              <input type="text" id="pzTask" value="viết 5 câu khẩu hiệu" oninput="window.EbookApp.updatePuzzleOutput()">
            </div>
            <div class="puzzle-piece-card">
              <label><span>4️⃣</span> Mảnh 4: Kết quả mong muốn (Độ dài, giọng điệu?)</label>
              <input type="text" id="pzResult" value="Mỗi câu dưới 10 chữ, giọng ấm áp, gần gũi. Ghi thêm 1 dòng giải thích vì sao chọn câu đó" oninput="window.EbookApp.updatePuzzleOutput()">
            </div>
          </div>

          <div class="eb-prompt-card" style="margin:0">
            <div class="eb-prompt-bar">
              <span class="eb-prompt-label">✨ Câu lệnh 4 mảnh đã ghép tự động của bạn</span>
              <button type="button" class="eb-copy-btn" onclick="window.EbookApp.copyDynamicPuzzle(this)">
                <span>📋 Chép câu lệnh đã ghép</span>
              </button>
            </div>
            <div class="eb-prompt-body" id="pzLiveOutput">Bạn là chuyên gia marketing cho các tiệm nhỏ.
Tôi có tiệm bánh handmade ở Đà Nẵng, bán bánh ít đường, khách chủ yếu là mẹ bỉm 25–40 tuổi quan tâm sức khỏe gia đình.
Hãy viết 5 câu khẩu hiệu.
Kết quả: Mỗi câu dưới 10 chữ, giọng ấm áp, gần gũi. Ghi thêm 1 dòng giải thích vì sao chọn câu đó.</div>
          </div>
        </div>

        <h3 class="eb-h3">🔍 So sánh Trước và Sau khi dùng 4 mảnh</h3>
        <div style="display:grid;grid-template-columns:1fr 1.3fr;gap:12px;margin-bottom:18px">
          <div style="background:#FFF5F5;border:1.5px solid #F5C2C7;border-radius:14px;padding:14px">
            <strong style="color:#B42318;font-size:12px">❌ TRƯỚC (Hỏi chung chung)</strong>
            <p style="font-family:monospace;font-size:13px;margin-top:6px;color:#7A271A">"Viết giúp tôi khẩu hiệu cho tiệm bánh."</p>
            <small style="color:#912018;display:block;margin-top:8px">→ AI tự đoán mò, ra những câu sáo rỗng giống hàng ngàn tiệm khác.</small>
          </div>
          <div style="background:#EEFBF3;border:1.5px solid #A6E9C0;border-radius:14px;padding:14px">
            <strong style="color:#1E7E48;font-size:12px">✅ SAU (Đủ 4 mảnh rõ ràng)</strong>
            <p style="font-family:monospace;font-size:12.5px;margin-top:6px;color:#13532F">
              "Bạn là chuyên gia marketing cho các tiệm nhỏ. Tôi có tiệm bánh handmade ở Đà Nẵng, bán bánh ít đường, khách chủ yếu là mẹ bỉm 25–40 tuổi... Hãy viết 5 câu khẩu hiệu. Mỗi câu dưới 10 chữ, giọng ấm áp..."
            </p>
          </div>
        </div>

        <h3 class="eb-h3">💬 3 câu nói tiếp giúp kết quả tốt hơn nữa</h3>
        <ul style="padding-left:20px;font-size:13.5px;line-height:1.75;color:var(--text)">
          <li><strong>Khi cần chỉnh nhẹ:</strong> <code>"Chưa đúng ý. Tôi muốn [điều cụ thể]. Viết lại."</code> (Sai nhiều lần thì dùng công thức 4K).</li>
          <li><strong>Khi ưng 1 phương án:</strong> <code>"Thích câu số 3. Viết thêm 5 câu theo hướng đó."</code></li>
          <li><strong>Khi muốn AI hỏi trước:</strong> <code>"Trước khi làm, hãy hỏi tôi những gì bạn cần biết."</code></li>
        </ul>

        <div class="part-nav-footer" style="margin-top:24px">
          <button type="button" class="btn-step-prev" onclick="window.EbookApp.switchChapter('setup')">← Cài đặt</button>
          <button type="button" class="btn-step-next" onclick="window.EbookApp.switchChapter('lesson2')">
            <span>Tiếp theo: Bài 2 — Tìm hiểu thị trường</span>
            <span>→</span>
          </button>
        </div>
      </article>

      <!-- MODULE 5: BÀI 2 — KHAI THÁC THÔNG TIN -->
      <article class="eb-module" id="ebMod_lesson2">
        <div class="eb-meta-strip">
          <div class="eb-meta-item">
            <small>Mục tiêu</small>
            <strong>Nhờ Claude tìm hiểu khách hàng & đối thủ</strong>
          </div>
          <div class="eb-meta-item">
            <small>Thời gian</small>
            <strong>4 phút thực hành</strong>
          </div>
          <div class="eb-meta-item">
            <small>Bạn có được</small>
            <strong>Bảng nghiên cứu có link nguồn kiểm chứng</strong>
          </div>
        </div>

        <h2 class="eb-h2">Bài 2 — Khai thác thông tin: Để AI đi tìm hiểu giúp bạn</h2>
        <p class="eb-p">
          Trước khi làm thương hiệu, cần hiểu khách hàng và đối thủ. Bật công tắc <strong>Web search</strong> trong nút <code>+</code> cạnh ô nhập, hoặc chắc ăn nhất là viết thẳng cụm từ <strong>"Tìm trên web"</strong> vào đầu câu lệnh.
        </p>

        <h3 class="eb-h3">1️⃣ Mẫu 1 — Hiểu khách hàng mục tiêu</h3>
        ${renderPromptCard('Mẫu 1: Tìm hiểu nỗi lo & hành vi khách hàng', `Tìm trên web và cho tôi biết: khách hàng [mô tả khách, ví dụ: mẹ bỉm 25–40 tuổi ở Đà Nẵng] khi mua [sản phẩm] thường:\n1. Lo lắng điều gì nhất?\n2. Hay hỏi những câu gì?\n3. Tìm mua ở đâu (Facebook, TikTok, Shopee...)?\nTrình bày thành bảng ngắn, ghi nguồn cho từng ý.`)}

        <h3 class="eb-h3">2️⃣ Mẫu 2 — Soi đối thủ & Tìm khoảng trống thị trường</h3>
        ${renderPromptCard('Mẫu 2: Phân tích 5 đối thủ & gợi ý 3 khoảng trống', `Tìm trên web 5 thương hiệu [ngành của bạn] tại [khu vực] đang làm tốt trên mạng xã hội.\nVới mỗi thương hiệu cho biết: họ nói mình khác biệt ở điểm nào, giọng văn ra sao, điểm mạnh và điểm yếu.\nCuối cùng gợi ý 3 khoảng trống mà thương hiệu nhỏ như tôi có thể chiếm.`)}

        <h3 class="eb-h3">3️⃣ Mẫu 3 — Bắt xu hướng TikTok & Facebook ngân sách thấp</h3>
        ${renderPromptCard('Mẫu 3: Bắt 5 xu hướng nội dung kèm ý tưởng video', `Tìm trên web các xu hướng nội dung [ngành của bạn] gần đây trên TikTok và Facebook.\nChọn 5 xu hướng phù hợp với tiệm nhỏ, ngân sách thấp. Mỗi xu hướng cho 1 ý tưởng video cụ thể.`)}

        <div style="background:#FFF8E6;border:1.5px solid #F3C969;border-radius:14px;padding:15px 18px;margin-top:16px">
          <strong style="color:#784F08;font-size:13.5px">⚠️ Quy tắc vàng: AI có thể sai!</strong>
          <p style="font-size:13px;color:#6E480B;margin-top:4px">
            Con số, giá cả, tên người, luật lệ phải mở link nguồn ra kiểm tra trước khi đăng. Câu kiểm tra nên thuộc lòng:<br>
            <code style="background:#fff;padding:3px 8px;border-radius:6px;display:inline-block;margin-top:6px;font-weight:800">"Ý nào trong câu trả lời trên bạn chưa chắc chắn? Đánh dấu giúp tôi."</code>
          </p>
        </div>

        <div class="part-nav-footer" style="margin-top:24px">
          <button type="button" class="btn-step-prev" onclick="window.EbookApp.switchChapter('lesson1')">← Bài 1: 4 mảnh</button>
          <button type="button" class="btn-step-next" onclick="window.EbookApp.switchChapter('lesson3')">
            <span>Tiếp theo: Bài 3 — Để AI phỏng vấn bạn ❤️</span>
            <span>→</span>
          </button>
        </div>
      </article>

      <!-- MODULE 6: BÀI 3 — ĐỂ AI PHỎNG VẤN BẠN (TRÁI TIM) -->
      <article class="eb-module" id="ebMod_lesson3">
        <div class="eb-meta-strip">
          <div class="eb-meta-item">
            <small>Vị trí</small>
            <strong>❤️ Trái tim của cả hành trình</strong>
          </div>
          <div class="eb-meta-item">
            <small>Thời gian</small>
            <strong>12 phút đối thoại</strong>
          </div>
          <div class="eb-meta-item">
            <small>Bạn có được</small>
            <strong>Hồ sơ thương hiệu dùng cho mọi bài sau</strong>
          </div>
        </div>

        <h2 class="eb-h2">Bài 3 — Để AI phỏng vấn bạn (Trái tim hành trình)</h2>
        <p class="eb-p">
          Thay vì tự nghĩ xem nên kể gì cho AI, bạn đảo vai: <strong>để AI hỏi từng câu, bạn chỉ việc trả lời</strong>. Giống như đi khám bệnh: bác sĩ hỏi từng câu, cuối buổi gom tất cả thành <strong>Hồ sơ thương hiệu</strong>.
        </p>

        <!-- INTERACTIVE AI INTERVIEW SIMULATOR -->
        <div class="eb-motion-widget">
          <div class="eb-widget-head">
            <span class="eb-widget-badge">🎙️ Mô Phỏng Buổi Phỏng Vấn Đảo Vai · Chị Mai & Claude</span>
            <button type="button" class="eb-copy-btn" onclick="window.EbookApp.stepInterviewSim()">
              <span>▶ Bấm xem lượt hỏi tiếp theo</span>
            </button>
          </div>

          <div style="display:grid;grid-template-columns:1.15fr 0.85fr;gap:14px;align-items:stretch">
            <div id="interviewChatStage" style="background:#fff;border:1.5px solid var(--border);border-radius:14px;padding:14px;font-size:13px">
              <div style="margin-bottom:10px;padding:9px 12px;background:var(--bg-alt);border-radius:10px">
                <strong style="color:var(--primary)">🤖 Claude hỏi (Câu 1/12):</strong><br>
                Chị bán sản phẩm gì, cho ai và điều gì khiến chị bắt đầu nghề này?
              </div>
              <div style="margin-bottom:10px;padding:9px 12px;background:#EEFBF3;border-radius:10px">
                <strong style="color:#1E7E48">👩🏻‍🍳 Chị Mai trả lời:</strong><br>
                Mình làm bánh ít đường 8 năm nay ở Đà Nẵng, bán cho các mẹ có con nhỏ sợ con ăn ngọt quá.
              </div>
              <div id="interviewNextTurn" style="padding:9px 12px;background:var(--bg-alt);border-radius:10px">
                <strong style="color:var(--primary)">🤖 Claude hỏi (Câu 2/12):</strong><br>
                Khách quen hay khen tiệm Bếp Mai ở điều gì nhất?
              </div>
            </div>

            <div style="background:linear-gradient(135deg,#58112B,#8C1642);color:#fff;border-radius:14px;padding:15px">
              <span style="font-size:10.5px;font-weight:850;color:#FFDE59;text-transform:uppercase">📄 ĐẦU RA TỰ ĐỘNG</span>
              <h4 style="font-size:15px;margin:4px 0 10px;color:#fff">Hồ sơ thương hiệu: Bếp Mai</h4>
              <ul style="list-style:none;font-size:12px;line-height:1.65;color:#FCE4EC">
                <li>✦ <strong>Chuyên môn:</strong> 8 năm làm bánh handmade ít đường</li>
                <li>✦ <strong>Khách hàng:</strong> Mẹ bỉm 25–40 tuổi, lo sức khỏe gia đình</li>
                <li>✦ <strong>Khác biệt:</strong> Vị ngọt thanh tự nhiên, giao tận nhà</li>
                <li>✦ <strong>Giọng nói:</strong> Ấm áp, gần gũi, xưng "Mai"</li>
                <li>✦ <strong>Không bao giờ nói:</strong> Cam kết giảm cân thần tốc</li>
              </ul>
            </div>
          </div>
        </div>

        <h3 class="eb-h3">📋 Câu lệnh phỏng vấn 12 câu (Chép nguyên gửi cho Claude)</h3>
        ${renderPromptCard('Câu lệnh phỏng vấn xây Hồ sơ thương hiệu cá nhân', `Bạn là chuyên gia xây dựng thương hiệu cá nhân.\nHãy phỏng vấn tôi để làm Hồ sơ thương hiệu cá nhân.\nQuy tắc:\n- Mỗi lần chỉ hỏi 1 câu, chờ tôi trả lời rồi mới hỏi tiếp.\n- Dùng từ ngữ đơn giản, có ví dụ gợi ý để tôi dễ trả lời.\n- Tối đa 12 câu, đi qua: chuyên môn và kinh nghiệm, câu chuyện nghề đáng nhớ, thành quả có thật, giá trị tôi theo đuổi, người tôi giúp được và vấn đề của họ, điều tôi khác người cùng nghề.\n- Câu nào tôi trả lời chung chung, hỏi thêm 1 câu để lấy ví dụ cụ thể.\nKhi xong, tổng hợp thành Hồ sơ thương hiệu cá nhân gồm: tôi là ai, chuyên môn, câu chuyện, thành quả, người tôi giúp, điều khác biệt, giọng nói, màu sắc gợi ý, những điều không bao giờ nói.\nKhông thêm thành tích hay con số tôi chưa nói.\nBắt đầu với câu hỏi đầu tiên.`)}

        <h3 class="eb-h3">📲 Mở rộng: Phỏng vấn khách hàng thật qua Zalo</h3>
        <p class="eb-p">Hồ sơ trên mới là góc nhìn của bạn. Hãy nhờ AI soạn 7 câu hỏi ngắn gửi khách quen qua Zalo (thu 5–10 câu trả lời, xóa tên/SĐT rồi dán lại cho Claude tìm câu khẩu hiệu đắt giá):</p>
        ${renderPromptCard('Câu lệnh soạn 7 câu hỏi phỏng vấn khách quen qua Zalo', `Soạn 7 câu hỏi ngắn để tôi hỏi khách quen qua Zalo, nhằm hiểu: vì sao họ chọn [tiệm của tôi], họ thích gì, chưa hài lòng gì.\nCâu hỏi thân mật, không dẫn dắt, trả lời được trong 2 phút.`)}

        <div class="part-nav-footer" style="margin-top:24px">
          <button type="button" class="btn-step-prev" onclick="window.EbookApp.switchChapter('lesson2')">← Bài 2: Tìm hiểu</button>
          <button type="button" class="btn-step-next" onclick="window.EbookApp.switchChapter('lesson4')">
            <span>Tiếp theo: Bài 4 — Khảo sát & Brand Guideline</span>
            <span>→</span>
          </button>
        </div>
      </article>

      <!-- MODULE: BÀI 4 — KHẢO SÁT 15 CÂU & BRAND GUIDELINE -->
      <article class="eb-module" id="ebMod_lesson4">
        <div class="eb-meta-strip">
          <div class="eb-meta-item">
            <small>Mục tiêu</small>
            <strong>Định hình Brand DNA & Nhận diện thị giác</strong>
          </div>
          <div class="eb-meta-item">
            <small>Thời gian thực hiện</small>
            <strong>15 phút khảo sát trực quan</strong>
          </div>
          <div class="eb-meta-item">
            <small>Sản phẩm thu được</small>
            <strong>Brand Guideline PDF 24 slide & File .md nạp Claude</strong>
          </div>
        </div>

        <h2 class="eb-h2">Bài 4 — Khảo sát 15 câu: Xuất Brand Guideline 24 slide & File .md</h2>
        <p class="eb-p">
          Sau khi có Hồ sơ thương hiệu ở Bài 3, bạn bước vào bài thực hành định hình thị giác quan trọng: <strong>Khảo sát định vị 15 câu [Bản Học Viên]</strong> để số hóa toàn bộ DNA, mã màu HEX, typography và xuất trọn bộ <strong>Brand Guideline</strong>.
        </p>

        <!-- STUDENT SURVEY LAUNCHER HERO CARD -->
        <div class="eb-survey-hero-card">
          <div class="eb-survey-left">
            <div class="eb-survey-icon">🎓</div>
            <div>
              <div class="eb-survey-badge-wrap">
                <span class="eb-survey-badge">DÀNH CHO HỌC VIÊN · KHẢO SÁT ĐỊNH VỊ 15 CÂU</span>
                <span class="eb-survey-pill">BẢN HỌC VIÊN</span>
              </div>
              <h3 class="eb-survey-title">Khai quật Brand DNA & nhận tệp Brand Guideline PDF 24 slide trước buổi học</h3>
              <p class="eb-survey-sub">
                Bản khảo sát tương tác dành riêng cho học viên lớp Personal Branding Mastery. Chọn hình ảnh trực quan, nhận diện phong cách thiết kế và xuất file chuẩn xác cho Claude.
              </p>
            </div>
          </div>
          <a href="brand-discovery.html" target="_blank" rel="noopener" class="eb-survey-cta-btn">
            <span>Bắt đầu khảo sát 15 câu</span>
            <span class="cta-arrow">→</span>
          </a>
        </div>

        <!-- 4 LOCKED PRESET LAYOUT SELECTOR -->
        <div class="brand-presets-box">
          <div class="brand-presets-header">
            <span class="brand-presets-title">🎨 4 Bộ Preset Layout Đã Khóa Sẵn Chuẩn Thiết Kế (Bấm để khám phá)</span>
            <small style="color:var(--text-muted);font-size:12px;font-weight:700">Đổi Preset không làm mất câu trả lời khảo sát</small>
          </div>

          <div class="brand-preset-cards">
            <button type="button" class="preset-card-btn active" id="pCard_B" onclick="window.EbookApp.selectBrandPreset('B', this)">
              <span class="preset-code-pill">PRESET B</span>
              <strong class="preset-name">Corporate Clean</strong>
              <span class="preset-desc">Nền sáng, tối giản, thanh lịch, chuẩn B2B / Cố vấn doanh nghiệp.</span>
            </button>
            <button type="button" class="preset-card-btn" id="pCard_C" onclick="window.EbookApp.selectBrandPreset('C', this)">
              <span class="preset-code-pill">PRESET C</span>
              <strong class="preset-name">Editorial Split</strong>
              <span class="preset-desc">Chia đôi 50/50 đậm chất tạp chí cao cấp, nghệ thuật & lifestyle.</span>
            </button>
            <button type="button" class="preset-card-btn" id="pCard_D" onclick="window.EbookApp.selectBrandPreset('D', this)">
              <span class="preset-code-pill">PRESET D</span>
              <strong class="preset-name">Visual First</strong>
              <span class="preset-desc">Hình ảnh điện ảnh tràn viền, cảm xúc thị giác mạnh cho Creator.</span>
            </button>
            <button type="button" class="preset-card-btn" id="pCard_E" onclick="window.EbookApp.selectBrandPreset('E', this)">
              <span class="preset-code-pill">PRESET E</span>
              <strong class="preset-name">Modular Grid</strong>
              <span class="preset-desc">Khung lưới Swiss Style kỷ luật, cấu trúc chặt chẽ cho Founder & Tech.</span>
            </button>
          </div>

          <div class="preset-detail-drawer" id="presetDetailDrawer">
            <div style="font-size:32px" id="presetDetailIcon">🏢</div>
            <div>
              <div class="preset-detail-tag" id="presetDetailTag">PRESET B · CORPORATE CLEAN</div>
              <div style="font-size:13.5px;color:var(--text);font-weight:700;margin:3px 0" id="presetDetailDesc">
                Tông màu xanh Navy, Slate & Trắng tuyết. Cặp font Sans-serif sắc sảo, khoảng trắng thoáng đãng, toát lên sự chuyên nghiệp và uy tín cho chuyên gia đào tạo, tư vấn tài chính, luật và doanh nhân.
              </div>
            </div>
          </div>
        </div>

        <h3 class="eb-h3">📑 Hai nút xuất quan trọng: PDF và Markdown (.md)</h3>
        <div class="export-dual-grid">
          <div class="export-card pdf-side">
            <span class="export-badge-icon">📄</span>
            <div class="export-info">
              <h4>1. In / Lưu PDF (24 Slide Đầy Đủ)</h4>
              <p>File tài liệu nhận diện thị giác đầy đủ (Bảng màu HEX, Typography, Moodboard, Quy tắc Do / Don't). Dùng để in ấn, xem trực quan, chia sẻ với đối tác hoặc thợ in ấn.</p>
            </div>
          </div>
          <div class="export-card md-side">
            <span class="export-badge-icon">📝</span>
            <div class="export-info">
              <h4>2. Tải Markdown (.md) nạp vào Claude</h4>
              <p>File chữ thuần chứa trọn bộ Brand DNA, mã màu HEX chuẩn xác, font chữ và giọng văn. Dùng để nạp thẳng vào <strong>Bài 5 (Project)</strong> để Claude đọc chính xác 100%, không bao giờ bịa màu.</p>
            </div>
          </div>
        </div>

        <h3 class="eb-h3">📋 Câu lệnh nạp Brand Guideline vào Claude</h3>
        ${renderPromptCard('Lệnh nạp Brand Guideline (.md) vào Claude để không bao giờ sai màu và font', `LỆNH NẠP BRAND GUIDELINE VÀO CLAUDE:\nĐọc kỹ file Brand Guideline (.md) tôi vừa tải lên.\nGhi nhớ chính xác:\n- Bảng màu HEX chuẩn và tỷ lệ dùng màu.\n- Cặp font chữ và phong cách bố cục.\n- Giọng điệu thương hiệu (Tone of Voice) và những điều TUYỆT ĐỐI KHÔNG LÀM.\nMọi ấn phẩm, nội dung và trang web tiếp theo đều phải tuân thủ nghiêm ngặt bộ Brand Guideline này.`)}

        <div class="part-nav-footer" style="margin-top:24px">
          <button type="button" class="btn-step-prev" onclick="window.EbookApp.switchChapter('lesson3')">← Bài 3: Phỏng vấn</button>
          <button type="button" class="btn-step-next" onclick="window.EbookApp.switchChapter('lesson5')">
            <span>Tiếp theo: Bài 5 — Tạo Project riêng</span>
            <span>→</span>
          </button>
        </div>
      </article>

      <!-- MODULE: BÀI 5 — TẠO PROJECT -->
      <article class="eb-module" id="ebMod_lesson5">
        <div class="eb-meta-strip">
          <div class="eb-meta-item">
            <small>Mục tiêu</small>
            <strong>Cất hồ sơ & Brand Guideline vào "ngăn tủ" để Claude nhớ bạn</strong>
          </div>
          <div class="eb-meta-item">
            <small>Thời gian & Giới hạn</small>
            <strong>5 phút · Tối đa 5 Project (Gói Free)</strong>
          </div>
          <div class="eb-meta-item">
            <small>Cấu trúc Project</small>
            <strong>Instructions (Lời dặn) + Knowledge (File)</strong>
          </div>
        </div>

        <h2 class="eb-h2">Bài 5 — Tạo Project: Kể một lần, dùng mãi</h2>
        <p class="eb-p">
          Mỗi cuộc trò chuyện mới, Claude lại quên bạn là ai. <strong>Project</strong> giải quyết chuyện đó: bạn cất Hồ sơ thương hiệu (Bài 3) và file Brand Guideline .md (Bài 4) vào một "ngăn tủ" riêng tại <a href="https://claude.ai/projects" target="_blank" rel="noopener" style="color:var(--primary);font-weight:800;text-decoration:underline">claude.ai/projects</a>, và mọi cuộc trò chuyện mở trong ngăn đó đều tự biết thương hiệu của bạn.
        </p>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin:18px 0">
          <div style="background:#FFF2F7;border:1.5px solid #F1C2D3;border-radius:15px;padding:16px">
            <span style="font-size:11px;font-weight:900;color:var(--primary);text-transform:uppercase">NGĂN 1 · INSTRUCTIONS</span>
            <h4 style="font-size:15.5px;color:var(--primary-dark);margin:4px 0 6px">📝 Hướng dẫn (Lời dặn cố định)</h4>
            <p style="font-size:13px;color:var(--text-muted);margin:0">
              Lời dặn Claude phải xưng hô thế nào, giọng văn ra sao, không được bịa giá, và quy tắc làm web theo Brand Guideline. Áp dụng tự động cho mọi chat trong Project.
            </p>
          </div>
          <div style="background:#FFF9EB;border:1.5px solid #F2D399;border-radius:15px;padding:16px">
            <span style="font-size:11px;font-weight:900;color:#B87A14;text-transform:uppercase">NGĂN 2 · KNOWLEDGE</span>
            <h4 style="font-size:15.5px;color:var(--primary-dark);margin:4px 0 6px">📁 Tài liệu (Kho tri thức)</h4>
            <p style="font-size:13px;color:var(--text-muted);margin:0">
              Các file bạn tải lên bằng nút <code>+</code>: File Hồ sơ thương hiệu (<code>.md</code>) từ Bài 3, file Brand Guideline (<code>.md</code>) từ Bài 4, bảng giá sản phẩm, logo.
            </p>
          </div>
        </div>

        <h3 class="eb-h3">📋 Lời dặn mẫu cho Project (Dán vào Set project instructions)</h3>
        ${renderPromptCard('Lời dặn mẫu cho Project thương hiệu', `Bạn là trợ lý thương hiệu của [tên thương hiệu].\n- Luôn đọc Hồ sơ thương hiệu và file Brand Guideline trước khi làm bất cứ việc gì.\n- Viết bằng tiếng Việt, giọng [ấm áp, gần gũi], xưng "[Mai]", gọi khách là "[chị/mẹ]".\n- Tuân thủ đúng bảng màu HEX, font chữ và phong cách trong Brand Guideline.\n- Không bịa giá, khuyến mãi, số liệu. Thiếu thông tin thì hỏi tôi.\n- Phần nào bạn suy luận (không có nguồn hoặc dữ liệu thật), ghi rõ là (AI suy luận).\n- Trả lời ngắn gọn, dùng từ dễ hiểu, không dùng thuật ngữ tiếng Anh nếu không cần.\n- Mỗi khi đưa bản nháp, kết thúc bằng 1 câu hỏi xem tôi muốn sửa gì.`)}

        <div class="part-nav-footer" style="margin-top:24px">
          <button type="button" class="btn-step-prev" onclick="window.EbookApp.switchChapter('lesson4')">← Bài 4: Brand Guideline</button>
          <button type="button" class="btn-step-next" onclick="window.EbookApp.switchChapter('lesson6')">
            <span>Tiếp theo: Bài 6 — Làm trang web 1 câu lệnh</span>
            <span>→</span>
          </button>
        </div>
      </article>

      <!-- MODULE: BÀI 6 — LÀM TRANG WEB BẰNG 1 CÂU LỆNH -->
      <article class="eb-module" id="ebMod_lesson6">
        <div class="eb-meta-strip">
          <div class="eb-meta-item">
            <small>Chuẩn bị 1 lần</small>
            <strong>Bật Code execution & file creation</strong>
          </div>
          <div class="eb-meta-item">
            <small>Thời gian</small>
            <strong>12 phút thực hành</strong>
          </div>
          <div class="eb-meta-item">
            <small>Bạn có được</small>
            <strong>Web 1 trang có link Share & GitHub Pages</strong>
          </div>
        </div>

        <h2 class="eb-h2">Bài 6 — Làm trang web giới thiệu bằng một câu lệnh</h2>
        <p class="eb-p">
          Trước khi bắt đầu, vào <strong>Settings → Capabilities</strong> và bật mục <strong>Code execution and file creation</strong> (bản mới gọi là <em>Create and edit files</em>).
        </p>

        <h3 class="eb-h3">🔄 Quy trình 3 bước từ Brand Guideline (Bài 4) ra Website</h3>
        <div class="eb-table-wrap">
          <table class="eb-table">
            <thead>
              <tr>
                <th>Bước</th>
                <th>Bạn làm gì</th>
                <th>Kết quả thu được</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>1. Khảo sát 15 câu (Bài 4)</strong></td>
                <td>Mở công cụ <a href="brand-discovery.html" target="_blank" style="color:var(--primary);font-weight:800;text-decoration:underline">Khảo sát 15 câu (Bản Học Viên)</a>, nhìn hình chọn đáp án và tải file <code>Brand-Guideline.md</code>.</td>
                <td>Toàn bộ mã màu HEX, typography, layout đã số hóa chuẩn xác.</td>
              </tr>
              <tr>
                <td><strong>2. Đưa vào Project (Bài 5)</strong></td>
                <td>Tải file <code>.md</code> + 5 thông tin bán hàng (3 sản phẩm, cảm nhận khách, SĐT/Zalo, MXH, logo) vào Project.</td>
                <td>Claude có sẵn bộ nhớ thương hiệu không bao giờ bịa hay nhầm màu.</td>
              </tr>
              <tr>
                <td><strong>3. Dán quy tắc & Gõ lệnh làm web</strong></td>
                <td>Dán <strong>7 Quy tắc làm web</strong> bên dưới vào Hướng dẫn Project rồi gõ lệnh yêu cầu Claude làm trang.</td>
                <td>Claude làm web đúng màu, đúng chữ, đúng giọng thương hiệu, co giãn theo điện thoại.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 class="eb-h3">📐 Quy tắc làm web (Dán vào cuối phần Hướng dẫn của Project)</h3>
        ${renderPromptCard('7 Quy tắc làm web chuẩn thương hiệu (Chống AI làm dài & tự bịa)', `QUY TẮC LÀM WEB CHO THƯƠNG HIỆU\n\n1. THEO BRAND GUIDELINE\n- Chỉ dùng màu (mã HEX), font, giọng nói, logo trong file Brand Guideline .md của Project. Không tự đổi.\n- Mục nào ghi AI ĐỀ XUẤT, AI_SUGGEST, DRAFT, CHƯA DUYỆT hoặc CHƯA XÁC MINH: hỏi mình trước khi dùng.\n- Logo concept (DRAFT) không dùng làm logo chính thức. Chưa có file logo gốc thì ghi tên thương hiệu bằng chữ.\n- Font trong Brand Guideline không dùng được trên web hoặc chưa có tên: chọn font Google Fonts gần giống nhất, có hỗ trợ tiếng Việt, và báo mình.\n- Cỡ chữ trong Brand Guideline là cỡ cho trang trình chiếu. Web dùng cỡ chữ theo mục 3.\n\n2. TRANG CHỦ NGẮN\n- Tối đa 6 phần, theo thứ tự: mở đầu (khẩu hiệu + 1 nút hành động chính), sản phẩm/dịch vụ nổi bật, câu chuyện ngắn, cảm nhận khách, câu hỏi thường gặp (nếu có), liên hệ.\n- Mỗi đoạn tối đa 3 câu. Nội dung dài thì để trang riêng hoặc bỏ.\n- Nút hành động chính phải thấy ngay màn hình đầu tiên, không cần cuộn.\n\n3. CO DÃN THEO MÀN HÌNH\n- Làm cho điện thoại trước, rồi máy tính bảng, máy tính.\n- Chữ nội dung tối thiểu 16px. Nút đủ to để bấm bằng ngón tay. Không bắt người xem kéo ngang.\n- Chữ và nền phải đủ tương phản để đọc rõ ngoài nắng.\n\n4. TÍNH NĂNG CƠ BẢN PHẢI CÓ\n- Menu đầu trang, bấm vào nhảy tới từng phần; trên điện thoại thu gọn thành nút ☰.\n- Nút liên hệ nổi cố định ở góc màn hình (Zalo hoặc gọi điện), luôn thấy khi cuộn.\n- Phần liên hệ: số điện thoại bấm là gọi được, Zalo, địa chỉ kèm link Google Maps, giờ mở cửa.\n- Link mạng xã hội (Facebook, TikTok...).\n- Nút quay lên đầu trang.\n- Logo nhỏ trên tab trình duyệt, tiêu đề và mô tả trang để Google và khi chia sẻ link hiển thị đúng.\n\n5. KHÔNG LÀM\n- Đăng nhập, giỏ hàng, thanh toán online.\n- Hiệu ứng chuyển động nặng, nhạc tự phát, cửa sổ bật lên.\n\n6. KHÔNG BỊA\n- Giá, cảm nhận khách, số liệu, chứng nhận chưa có thì để ô trống ghi [CẦN BỔ SUNG].\n- Ảnh: dùng ảnh mình gửi. Chưa có thì để khung trống, ghi rõ cần ảnh gì. Ảnh nén nhẹ để trang mở nhanh.\n\n7. LÀM XONG TỰ KIỂM TRA\n- Xem ở khổ điện thoại và máy tính, bấm thử mọi nút và link.\n- Báo mình danh sách chỗ còn [CẦN BỔ SUNG].`)}

        <h3 class="eb-h3">🚀 Câu lệnh làm trang web & Đưa lên GitHub Pages</h3>
        ${renderPromptCard('Câu lệnh tạo trang web giới thiệu 1 trang', `Dựa vào Hồ sơ thương hiệu và file Brand Guideline (.md), làm cho tôi một trang web giới thiệu một trang.\nGồm: phần mở đầu có khẩu hiệu, câu chuyện thương hiệu, 3 sản phẩm nổi bật, cảm nhận khách hàng, nút "Nhắn Zalo đặt hàng" dẫn tới [số Zalo].\nMàu sắc, font chữ và giọng văn theo Brand Guideline. Xem đẹp trên điện thoại.\nChỗ nào thiếu thông tin thật (giá, cảm nhận khách) thì để ô trống có ghi chú, không tự bịa.`)}

        ${renderPromptCard('Câu lệnh đưa website Go Live miễn phí bằng GitHub Pages (Dùng trong Claude Code)', `Cho website này go live bằng GitHub Pages. Kiểm tra máy đã có git và GitHub CLI chưa, thiếu thì cài giúp mình; mình sẽ tự đăng nhập GitHub. Tạo kho lưu trữ tên <tên-github>.github.io, chỉ đẩy các file của trang web lên (không đưa ho-so.md hay brand-guideline.md), rồi bật GitHub Pages. Báo mình đường link khi trang đã chạy.`)}

        <div class="part-nav-footer" style="margin-top:24px">
          <button type="button" class="btn-step-prev" onclick="window.EbookApp.switchChapter('lesson5')">← Bài 5: Project</button>
          <button type="button" class="btn-step-next" onclick="window.EbookApp.switchChapter('lesson7')">
            <span>Tiếp theo: Bài 7 — Đóng gói Skill</span>
            <span>→</span>
          </button>
        </div>
      </article>

      <!-- MODULE: BÀI 7 — ĐÓNG GÓI SKILL -->
      <article class="eb-module" id="ebMod_lesson7">
        <div class="eb-meta-strip">
          <div class="eb-meta-item">
            <small>Mục tiêu</small>
            <strong>Dạy Claude một quy trình để dùng lại mãi</strong>
          </div>
          <div class="eb-meta-item">
            <small>Quản lý tại</small>
            <strong>Customize → Skills</strong>
          </div>
          <div class="eb-meta-item">
            <small>Ứng dụng</small>
            <strong>Kịch bản 30s, báo giá, trả lời khách</strong>
          </div>
        </div>

        <h2 class="eb-h2">Bài 7 — Đóng gói Skill: Dạy Claude một lần, dùng mãi</h2>
        <p class="eb-p">
          Khi bạn có một quy trình làm việc lặp đi lặp lại hàng tuần (ví dụ: viết kịch bản video 30 giây), hãy đóng gói nó thành <strong>Skill</strong>.
        </p>

        <div class="eb-table-wrap">
          <table class="eb-table">
            <thead>
              <tr>
                <th>Tiêu chí</th>
                <th>🗂️ Project (Bài 5)</th>
                <th>⚡ Skill (Bài 7)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Chứa gì</strong></td>
                <td>Thông tin bối cảnh: bạn là ai, thương hiệu ra sao, Brand Guideline</td>
                <td>Cách làm: thực hiện công việc X theo các bước nào</td>
              </tr>
              <tr>
                <td><strong>Hoạt động ở đâu</strong></td>
                <td>Chỉ bên trong Project đó</td>
                <td>Mọi cuộc trò chuyện, tự kích hoạt khi việc cần đến</td>
              </tr>
              <tr>
                <td><strong>Ví dụ</strong></td>
                <td>Hồ sơ thương hiệu Bếp Mai & Brand Guideline</td>
                <td>Quy trình viết kịch bản video 30 giây</td>
              </tr>
            </tbody>
          </table>
        </div>

        ${renderPromptCard('Câu lệnh đóng gói Skill mới', `Tôi muốn tạo một skill từ cách làm [viết kịch bản video 30 giây] mà tôi hay làm.\nSkill cần: [hỏi tôi chủ đề video, viết câu mở đầu 3 giây, kịch bản dạng bảng, danh sách cảnh quay, phụ đề và caption].\nLuôn theo giọng văn thương hiệu của tôi.\nHãy hỏi tôi thêm những gì bạn cần biết, rồi tạo skill để tôi lưu lại.`)}

        <div style="background:var(--bg);border:1.5px solid var(--border);border-radius:14px;padding:15px 18px">
          <strong style="color:var(--primary-dark);font-size:13.5px">🔄 4 bước diễn ra sau khi chạy lệnh:</strong>
          <ol style="padding-left:20px;margin-top:6px;font-size:13px;line-height:1.7;color:var(--text)">
            <li>Claude hỏi bạn vài câu để làm rõ khi nào dùng skill và tiêu chuẩn kết quả tốt.</li>
            <li>Claude xuất file skill để bạn bấm lưu vào tài khoản.</li>
            <li><strong>Thử:</strong> Mở cuộc trò chuyện mới, giao thử một việc xem có đúng quy trình không.</li>
            <li><strong>Sửa:</strong> Nếu chưa ưng, gõ <code>"Cập nhật skill [tên]: [điều cần sửa]"</code>.</li>
          </ol>
        </div>

        <div class="part-nav-footer" style="margin-top:24px">
          <button type="button" class="btn-step-prev" onclick="window.EbookApp.switchChapter('lesson6')">← Bài 6: Làm Web</button>
          <button type="button" class="btn-step-next" onclick="window.EbookApp.switchChapter('advanced89')">
            <span>Tiếp theo: Bài 8 & 9 (Nâng cao)</span>
            <span>→</span>
          </button>
        </div>
      </article>

      <!-- MODULE: BÀI 8 & BÀI 9 (NÂNG CAO) -->
      <article class="eb-module" id="ebMod_advanced89">
        <div class="eb-meta-strip">
          <div class="eb-meta-item">
            <small>Bài 8 (Định dạng)</small>
            <strong>Markdown (.md) cho người & AI · JSON cho máy</strong>
          </div>
          <div class="eb-meta-item">
            <small>Bài 9 (Claude Code)</small>
            <strong>CLAUDE.md &lt;50 dòng · /compact · /clear · /RE</strong>
          </div>
          <div class="eb-meta-item">
            <small>Điểm vàng Context</small>
            <strong>Reset thủ công ở mức 60% Context</strong>
          </div>
        </div>

        <h2 class="eb-h2">Bài 8 & Bài 9 (Nâng cao) — File .md, JSON & Giữ Claude Nhanh</h2>
        <p class="eb-p">
          <strong>Bài 8:</strong> Người mới chỉ cần nhớ một việc: <strong>muốn lưu lại và dùng lại cho AI thì nhờ Claude trả kết quả bằng Markdown (<code>.md</code>)</strong>. Còn khi cần đưa dữ liệu vào phần mềm/web tự động thì dùng <strong>JSON</strong>.
        </p>

        ${renderPromptCard('Bài 8: Câu lệnh xuất Hồ sơ thương hiệu ra file .md', `Tổng hợp Hồ sơ thương hiệu vừa phỏng vấn thành Markdown, có tiêu đề cho từng phần.\nLưu thành file ho-so-thuong-hieu.md để tôi tải về.`)}

        ${renderPromptCard('Bài 8: Câu lệnh chuyển bảng giá sang JSON chuẩn', `Từ bảng giá tôi gửi, liệt kê tất cả sản phẩm dưới dạng JSON.\nMỗi sản phẩm gồm: ten_san_pham, gia (số, đơn vị đồng), don_vi, mo_ta_ngan (dưới 15 chữ).\nChỉ trả JSON, không thêm lời giải thích. Không tự bịa sản phẩm không có trong bảng giá.`)}

        <!-- INTERACTIVE CONTEXT 60% GAUGE SIMULATOR (BÀI 9) -->
        <div class="eb-motion-widget">
          <div class="eb-widget-head">
            <span class="eb-widget-badge">⚡ Bài 9 · Mô Phỏng Thanh Context & Lệnh Claude Code</span>
            <small style="font-size:12px;color:var(--text-muted);font-weight:700">Bấm chọn mức độ đầy của bộ nhớ Context để xem cách xử lý</small>
          </div>

          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px">
            <button type="button" class="puzzle-preset-btn" onclick="window.EbookApp.setContextLevel(30)">🟢 30% Context (Đang sạch)</button>
            <button type="button" class="puzzle-preset-btn active" onclick="window.EbookApp.setContextLevel(60)">🟡 60% Context (Điểm vàng Reset thủ công!)</button>
            <button type="button" class="puzzle-preset-btn" onclick="window.EbookApp.setContextLevel(95)">🔴 95% Context (Nguy cơ AI tự nén & lẫn)</button>
          </div>

          <div class="ctx-meter-track">
            <div class="ctx-meter-fill" id="ctxMeterFill" style="width:60%;background:linear-gradient(90deg,#D89824,#C82061)"></div>
          </div>

          <div id="ctxAdviceBox" style="background:#fff;border:1.5px solid #F1CAD8;border-radius:13px;padding:14px 16px;font-size:13px">
            <strong style="color:var(--primary-dark)">🟡 Mức 60% Context — Thời điểm vàng để Reset thủ công 4 bước:</strong>
            <ol style="padding-left:20px;margin-top:6px;line-height:1.65">
              <li>Bảo Claude tóm tắt ngắn gọn những gì đã làm được.</li>
              <li>Copy đoạn tóm tắt đó lại.</li>
              <li>Gõ lệnh <code>/clear</code> để làm sạch hoàn toàn bàn làm việc.</li>
              <li>Dán bản tóm tắt vào khung chat mới và tiếp tục làm việc mượt mà!</li>
            </ol>
          </div>
        </div>

        <h3 class="eb-h3">🛠️ Bảng lệnh bắt buộc phải nhớ trong Claude Code (Bài 9)</h3>
        <div class="eb-table-wrap">
          <table class="eb-table">
            <thead>
              <tr>
                <th>Lệnh / File</th>
                <th>Tác dụng thực chiến</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>/RE</code> (hoặc <code>/rewind</code>)</td>
                <td>Khi Claude trả lời sai: <strong>Đừng nhắn thêm "Làm lại đi"</strong> (vì câu sai vẫn tốn token). Dùng <code>/RE</code> để quay về tin nhắn trước, xóa phần sai rồi sửa bằng công thức 4K.</td>
              </tr>
              <tr>
                <td><code>/compact</code></td>
                <td>Tóm tắt cuộc trò chuyện dài thành một trang ngắn gọn.</td>
              </tr>
              <tr>
                <td><code>/clear</code></td>
                <td>Làm sạch toàn bộ context để bắt đầu việc mới trên bàn sạch.</td>
              </tr>
              <tr>
                <td><code>CLAUDE.md</code> (&lt;50 dòng)</td>
                <td>File ghi nhớ quy tắc dự án. Giữ ngắn dưới 50 dòng để không làm đầy bộ nhớ.</td>
              </tr>
              <tr>
                <td><code>AGENTS.md</code></td>
                <td>Nhờ Claude tạo file này kèm file bàn giao <code>.md</code> khi muốn chuyển dự án sang AI khác (như Codex).</td>
              </tr>
            </tbody>
          </table>
        </div>

        ${renderPromptCard('Câu lệnh giữ file CLAUDE.md luôn ngắn dưới 50 dòng', `Thêm vào CLAUDE.md quy tắc này: "Mỗi khi thêm gì vào file này, nếu file dài quá 50 dòng thì đề nghị mình rút gọn trước, và chỉ rút gọn khi mình đồng ý."`)}

        <div class="part-nav-footer" style="margin-top:24px">
          <button type="button" class="btn-step-prev" onclick="window.EbookApp.switchChapter('lesson7')">← Bài 7: Skill</button>
          <button type="button" class="btn-step-next" onclick="window.EbookApp.switchChapter('cheatsheet')">
            <span>Tiếp theo: Thẻ lệnh bỏ túi & Lịch 60p</span>
            <span>→</span>
          </button>
        </div>
      </article>

      <!-- MODULE 11: THẺ LỆNH BỎ TÚI & LỊCH HỌC 60 PHÚT -->
      <article class="eb-module" id="ebMod_cheatsheet">
        <div class="eb-meta-strip">
          <div class="eb-meta-item">
            <small>Tra cứu nhanh</small>
            <strong>10 Thẻ câu lệnh bỏ túi</strong>
          </div>
          <div class="eb-meta-item">
            <small>Phòng tránh rủi ro</small>
            <strong>7 Lỗi thường gặp & 4 Quy tắc An toàn</strong>
          </div>
          <div class="eb-meta-item">
            <small>Thực hành tại lớp</small>
            <strong>Timeline chuẩn 60 phút</strong>
          </div>
        </div>

        <h2 class="eb-h2">Thẻ câu lệnh bỏ túi & Lịch thực hành 60 phút</h2>

        <h3 class="eb-h3">⚡ 10 Thẻ câu lệnh bỏ túi (Tra nhanh khi cần)</h3>
        <div class="eb-table-wrap">
          <table class="eb-table">
            <thead>
              <tr>
                <th>Khi bạn muốn...</th>
                <th>Hãy nói với Claude...</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><strong>Giao việc rõ ràng</strong></td><td><code>"Bạn là [vai trò]. Tôi là [bối cảnh]. Hãy [việc]. Kết quả: [yêu cầu]."</code></td></tr>
              <tr><td><strong>Tìm hiểu thị trường</strong></td><td><code>"Tìm trên web... trình bày thành bảng, ghi nguồn cho từng ý."</code></td></tr>
              <tr><td><strong>Để AI hỏi mình</strong></td><td><code>"Phỏng vấn tôi để làm Hồ sơ thương hiệu cá nhân, mỗi lần 1 câu, tối đa 12 câu."</code></td></tr>
              <tr><td><strong>Chưa biết trả lời</strong></td><td><code>"Tôi chưa biết, gợi ý cho tôi 3 lựa chọn."</code></td></tr>
              <tr><td><strong>Nhờ phản biện ý tưởng</strong></td><td><code>"Hãy đóng vai người phản biện thẳng thắn. Không khen xã giao. Chỉ ra điểm mù của mình."</code></td></tr>
              <tr><td><strong>Sửa kết quả</strong></td><td><code>"Chưa đúng ý. Tôi muốn [cụ thể]. Viết lại."</code> (Sai nhiều lần: dùng công thức 4K)</td></tr>
              <tr><td><strong>Ghi rõ chỗ AI đoán</strong></td><td><code>"Phần nào bạn suy luận, hãy ghi rõ là (AI suy luận)."</code></td></tr>
              <tr><td><strong>Kiểm tra độ tin cậy</strong></td><td><code>"Ý nào bạn chưa chắc chắn? Đánh dấu giúp tôi."</code></td></tr>
              <tr><td><strong>Làm trang web</strong></td><td><code>"Dựa vào Hồ sơ thương hiệu, làm trang web giới thiệu một trang gồm..."</code></td></tr>
              <tr><td><strong>Đóng gói cách làm</strong></td><td><code>"Tôi muốn tạo một skill từ cách làm [việc] mà tôi hay làm."</code></td></tr>
            </tbody>
          </table>
        </div>

        <h3 class="eb-h3">🛠️ 7 Lỗi thường gặp & Cách khắc phục</h3>
        <div class="eb-table-wrap">
          <table class="eb-table">
            <thead>
              <tr>
                <th>Lỗi thường gặp</th>
                <th>Vì sao bị lỗi</th>
                <th>Cách sửa dứt điểm</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Hỏi một câu quá ngắn</td><td>AI phải đoán nên trả lời chung chung</td><td>Dùng <strong>công thức 4 mảnh</strong> (Bài 1)</td></tr>
              <tr><td>Tin hết con số AI đưa</td><td>AI có thể nhầm hoặc tự bịa</td><td>Mở link nguồn kiểm tra; bắt ghi rõ <code>(AI suy luận)</code></td></tr>
              <tr><td>Mỗi lần lại kể lại từ đầu</td><td>Không dùng Project</td><td>Cất Hồ sơ thương hiệu vào <strong>Project</strong> (Bài 5)</td></tr>
              <tr><td>Giao việc ngay không để hỏi</td><td>AI thiếu thông tin nên đoán mò</td><td>Để <strong>AI phỏng vấn trước</strong> (Quy tắc 2 & Bài 3)</td></tr>
              <tr><td>AI sai chỉ nói "làm lại đi"</td><td>AI không biết sai ở chỗ nào</td><td>Dùng <strong>công thức 4K</strong> (Khoanh - Kỳ vọng - Kiểm - Khóa)</td></tr>
              <tr><td>Chat 1 cuộc dài cả tuần</td><td>AI dễ lẫn và mau hết lượt</td><td>Mỗi việc mở một cuộc trò chuyện mới trong Project</td></tr>
              <tr><td>Đăng nguyên văn AI viết</td><td>Nghe giống máy, mất chất riêng</td><td>Đọc to lên và sửa lại bằng lời ăn tiếng nói của mình</td></tr>
            </tbody>
          </table>
        </div>

        <h3 class="eb-h3">⏱️ Lịch trình gợi ý cho buổi thực hành 60 phút</h3>
        <div class="eb-table-wrap">
          <table class="eb-table">
            <thead>
              <tr>
                <th>Phút</th>
                <th>Nội dung thực hành</th>
                <th>Sản phẩm học viên làm ra</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><strong>0 – 8</strong></td><td>Mở đầu, 4 quy tắc tư duy, mở Claude Desktop đăng nhập</td><td>Tài khoản sẵn sàng, nắm 4 quy tắc</td></tr>
              <tr><td><strong>8 – 14</strong></td><td>Bài 1 + Bài 2</td><td>Câu lệnh 4 mảnh & bảng tìm hiểu có nguồn</td></tr>
              <tr><td><strong>14 – 24</strong></td><td>Bài 3: Claude phỏng vấn bạn</td><td><strong>Hồ sơ thương hiệu</strong> hoàn chỉnh</td></tr>
              <tr><td><strong>24 – 34</strong></td><td>Bài 4: Khảo sát 15 câu</td><td><strong>Brand Guideline</strong> 24 slide & File .md</td></tr>
              <tr><td><strong>34 – 39</strong></td><td>Bài 5: Tạo Project</td><td>Project "Trợ lý thương hiệu" cất sẵn hồ sơ</td></tr>
              <tr><td><strong>39 – 49</strong></td><td>Bài 6: Làm trang web</td><td>Trang web 1 trang theo Brand Guideline & link Share</td></tr>
              <tr><td><strong>49 – 54</strong></td><td>Bài 7: Đóng gói Skill</td><td>Biết cách đóng gói quy trình riêng</td></tr>
              <tr><td><strong>54 – 58</strong></td><td>Bài 9: Các lệnh Claude Code</td><td>Biết <code>/compact</code>, <code>/clear</code>, <code>/RE</code> & reset 60%</td></tr>
              <tr><td><strong>58 – 60</strong></td><td>Hỏi đáp, giới thiệu Bài 8 (.md & JSON) & Phụ lục</td><td>Tổng kết & định hướng sáng tạo tự động</td></tr>
            </tbody>
          </table>
        </div>

        <div class="part-nav-footer" style="margin-top:24px">
          <button type="button" class="btn-step-prev" onclick="window.EbookApp.switchChapter('advanced89')">← Bài 8 & 9</button>
          <button type="button" class="btn-step-next" onclick="window.EbookApp.switchChapter('appendix')">
            <span>Tiếp theo: Phụ lục EKK Video & Phụ đề</span>
            <span>→</span>
          </button>
        </div>
      </article>

      <!-- MODULE 12: PHỤ LỤC EKK VIDEO & PHỤ ĐỀ TỰ ĐỘNG -->
      <article class="eb-module" id="ebMod_appendix">
        <div class="eb-meta-strip">
          <div class="eb-meta-item">
            <small>Dành cho ai</small>
            <strong>Muốn Claude tự cắt video, làm phụ đề .srt</strong>
          </div>
          <div class="eb-meta-item">
            <small>Yêu cầu</small>
            <strong>Claude Code (Gói Pro+) · Win 10+ / macOS 13+</strong>
          </div>
          <div class="eb-meta-item">
            <small>Quy tắc an toàn 3 bước</small>
            <strong>Kiểm tra (Chỉ đọc) → Cài (Có duyệt) → Tạo Skill</strong>
          </div>
        </div>

        <h2 class="eb-h2">Phụ lục (Nâng cao) — Để AI tự làm phụ đề & quản lý dự án Video trên Windows và Mac</h2>
        <p class="eb-p">
          Phần này dùng <strong>Claude Code</strong> để chạy lệnh thật trên máy. Luôn đi đúng thứ tự 3 bước an toàn: <strong>1. Kiểm tra máy (Chỉ đọc) → 2. Cài công cụ thiếu (Có hỏi duyệt) → 3. Tạo Skill <code>/ekk-phu-de</code></strong>.
        </p>

        <h3 class="eb-h3">🧰 5 Công cụ cốt lõi để xử lý Video & Giọng nói tiếng Việt</h3>
        <div class="eb-table-wrap">
          <table class="eb-table">
            <thead>
              <tr>
                <th>Công cụ</th>
                <th>Vai trò trong hệ thống EKK</th>
                <th>Link chính thức</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><strong>1. Node.js LTS + npm</strong></td><td>Chạy các công cụ và ứng dụng nhỏ viết bằng JavaScript</td><td><a href="https://nodejs.org" target="_blank" rel="noopener" style="color:var(--primary);font-weight:700">nodejs.org</a></td></tr>
              <tr><td><strong>2. Git</strong></td><td>Lưu lịch sử thay đổi, quay lại bản cũ khi hỏng</td><td><a href="https://git-scm.com" target="_blank" rel="noopener" style="color:var(--primary);font-weight:700">git-scm.com</a></td></tr>
              <tr><td><strong>3. FFmpeg + FFprobe</strong></td><td>Cắt, ghép, tách âm thanh 16kHz mono, đổi định dạng video</td><td><a href="https://ffmpeg.org" target="_blank" rel="noopener" style="color:var(--primary);font-weight:700">ffmpeg.org</a></td></tr>
              <tr><td><strong>4. whisper.cpp (whisper-cli)</strong></td><td>Nghe lời nói trong video và chuyển thành chữ tốc độ cao</td><td><a href="https://github.com/ggml-org/whisper.cpp" target="_blank" rel="noopener" style="color:var(--primary);font-weight:700">github.com/ggml-org/whisper.cpp</a></td></tr>
              <tr><td><strong>5. Model ggml-base.bin</strong></td><td>"Bộ não" nhận dạng giọng nói đa ngôn ngữ (~148 MB, có tiếng Việt)</td><td><a href="https://huggingface.co/ggerganov/whisper.cpp" target="_blank" rel="noopener" style="color:var(--primary);font-weight:700">huggingface.co/ggerganov/whisper.cpp</a></td></tr>
            </tbody>
          </table>
        </div>

        <!-- INTERACTIVE OS SWITCHER (WINDOWS vs MAC) -->
        <div class="eb-motion-widget">
          <div class="eb-widget-head">
            <span class="eb-widget-badge">💻 Chọn Hệ Điều Hành Của Bạn (Windows / macOS)</span>
            <div style="display:flex;gap:6px">
              <button type="button" class="puzzle-preset-btn active" id="osBtnWin" onclick="window.EbookApp.switchOS('win')">🪟 Máy Windows (WinGet)</button>
              <button type="button" class="puzzle-preset-btn" id="osBtnMac" onclick="window.EbookApp.switchOS('mac')">🍎 Máy Mac (Homebrew)</button>
            </div>
          </div>

          <!-- WINDOWS COMMANDS -->
          <div id="osPaneWin">
            <p style="font-size:13px;color:var(--text-muted);margin-bottom:10px">
              <strong>Lưu ý cho Windows:</strong> Bản dựng sẵn của <code>whisper.cpp</code> chỉ hỗ trợ x64/Win32 (máy ARM64 Claude sẽ dừng và báo bạn). Không bao giờ nhảy thẳng vào cài đặt — hãy chạy Bước 1 (Chỉ đọc) trước:
            </p>
            ${renderPromptCard('Bước 1 (Windows): Kiểm tra máy chỉ đọc — An toàn 100%', `EKK – KIỂM TRA MÁY WINDOWS (CHỈ ĐỌC)\n\n1. MỤC TIÊU\nKiểm tra máy đã có các công cụ sau chưa và có chạy được không:\nNode.js LTS + npm, Git, FFmpeg + FFprobe, whisper.cpp (whisper-cli), model Whisper ggml-base.bin.\nTôi không biết lập trình. Bạn tự chạy lệnh, không yêu cầu tôi mở PowerShell/CMD.\n\n2. PHẠM VI – CHỈ ĐỌC\n- KHÔNG cài, gỡ, nâng cấp, tải hoặc xoá bất cứ thứ gì.\n- KHÔNG sửa PATH, Registry, cấu hình hay file nào.\n- KHÔNG chạy lệnh cần quyền Administrator.\n- Chỉ dùng lệnh đọc thông tin (version, where, Get-Command, winget list...).\n- Nếu WinGet hỏi đồng ý điều khoản, KHÔNG tự đồng ý: dừng phần WinGet và ghi CẦN XÁC MINH.\n- Nếu một kiểm tra buộc phải thay đổi máy mới làm được, bỏ qua và ghi CẦN XÁC MINH.\n\n3. THỰC HIỆN\n- Ghi lại phiên bản Windows, bản Home hay Pro, kiến trúc CPU (x64/ARM64).\n- Kiểm tra WinGet có chạy được không.\n- Hyper-V và ảo hoá CPU: chỉ dùng cách không cần Admin (systeminfo, Get-CimInstance Win32_Processor). Không dùng Get-WindowsOptionalFeature.\n- Với từng công cụ: tìm trong PATH, trong danh sách phần mềm đã cài (winget list, Apps) và các vị trí thông dụng (Program Files, AppData, WinGet Packages/Links, C:\\ffmpeg, %USERPROFILE%\\EKK).\n- whisper.cpp: tìm cả whisper-cli.exe và tên cũ main.exe.\n- Chạy thử lệnh phiên bản (hoặc --help nếu công cụ không có lệnh phiên bản) để xác nhận chạy được thật, không chỉ thấy file.\n- Phát hiện cài nhiều bản, PATH xung đột hoặc cài đặt dở dang.\n- Model: tìm ggml-base.bin và kích thước file (khoảng 148 MB). File ggml-base.en.bin là bản chỉ tiếng Anh, không tính là PASS. Không tải model để so sánh.\n\n4. PHÂN LOẠI\n- PASS: có và chạy được.\n- THIẾU: không tìm thấy sau khi kiểm tra đủ các vị trí.\n- CẦN XÁC MINH: có dấu vết nhưng lỗi, nhiều bản, hoặc chưa chắc chắn.\n\n5. BÀN GIAO\nBảng tiếng Việt: Công cụ | Phiên bản | Đường dẫn | Trạng thái | Ghi chú\nCuối báo cáo nêu ngắn gọn: Thông tin máy, Công cụ THIẾU, Công cụ CẦN XÁC MINH và Kết luận.`)}

            ${renderPromptCard('Bước 2 (Windows): Cài công cụ còn thiếu — Có hỏi duyệt từng bước', `EKK – CÀI CÔNG CỤ CÒN THIẾU (WINDOWS)\n\n1. MỤC TIÊU\nCài các công cụ báo THIẾU trong báo cáo kiểm tra vừa rồi, để máy có đủ:\nNode.js LTS + npm, Git, FFmpeg + FFprobe, whisper.cpp (whisper-cli), model ggml-base.bin.\nTôi không biết lập trình. Bạn tự chạy lệnh.\n\n2. PHẠM VI\n- Chỉ cài thứ đang THIẾU. Không gỡ, không nâng cấp thứ đã PASS.\n- Thứ CẦN XÁC MINH: báo tôi phương án xử lý, chờ tôi chọn.\n- Chỉ dùng nguồn chính thức:\n  + Node.js, Git, FFmpeg: qua WinGet. Tra đúng ID bằng winget show trước khi cài.\n  + whisper.cpp: trang Releases chính thức github.com/ggml-org/whisper.cpp, bản whisper-bin-x64.zip, giải nén vào %USERPROFILE%\\EKK\\whisper.\n  + Model: huggingface.co/ggerganov/whisper.cpp, file ggml-base.bin, lưu vào %USERPROFILE%\\EKK\\models.\n- TRƯỚC MỖI LẦN CÀI HOẶC TẢI: báo tên, nguồn, dung lượng, nơi lưu, rồi chờ tôi gõ "đồng ý".\n- Không chạy quyền Administrator nếu tôi chưa đồng ý.\n- Chỉ sửa PATH của tài khoản người dùng, không sửa PATH hệ thống. Báo trước khi sửa.\n- Máy ARM64: dừng phần whisper.cpp và báo tôi.\n\n3. THỰC HIỆN & 4. KIỂM TRA CUỐI\nCài lần lượt từng công cụ. Chạy lại bài kiểm tra chỉ đọc và thử dùng FFmpeg tạo file âm thanh 3 giây rồi cho whisper-cli đọc bằng model ggml-base.bin.\n\n5. BÀN GIAO\nBảng trạng thái, danh sách thay đổi và cách gỡ từng thứ nếu muốn quay lại như cũ.`)}
          </div>

          <!-- MAC COMMANDS -->
          <div id="osPaneMac" style="display:none">
            <p style="font-size:13px;color:var(--text-muted);margin-bottom:10px">
              <strong>3 lưu ý quan trọng cho Mac:</strong> (1) <strong>Homebrew</strong> là chợ ứng dụng dòng lệnh (<a href="https://brew.sh" target="_blank" rel="noopener" style="color:var(--primary);font-weight:700">brew.sh</a>) — tự gõ mật khẩu máy, tuyệt đối không đưa mật khẩu cho AI; (2) Kiểm tra <code>xcode-select -p</code> trước khi gọi <code>git --version</code>; (3) Chip Apple Silicon có sẵn bản dựng nhanh.
            </p>
            ${renderPromptCard('Bước 1 (macOS): Kiểm tra máy Mac chỉ đọc — An toàn 100%', `EKK – KIỂM TRA MÁY MAC (CHỈ ĐỌC)\n\n1. MỤC TIÊU\nKiểm tra máy đã có các công cụ sau chưa và có chạy được không:\nHomebrew, Node.js LTS + npm, Git, FFmpeg + FFprobe, whisper.cpp (whisper-cli), model Whisper ggml-base.bin.\nTôi không biết lập trình. Bạn tự chạy lệnh, không yêu cầu tôi mở Terminal.\n\n2. PHẠM VI – CHỈ ĐỌC\n- KHÔNG cài, gỡ, nâng cấp, tải hoặc xoá bất cứ thứ gì. KHÔNG chạy brew install, brew upgrade, brew update.\n- KHÔNG sửa PATH hay file cấu hình (.zshrc, .zprofile).\n- KHÔNG dùng sudo, không hỏi và không nhập mật khẩu máy.\n- Git: kiểm tra xcode-select -p TRƯỚC. Nếu chưa có Command Line Tools, KHÔNG chạy git --version (lệnh này bật hộp thoại cài đặt); ghi THIẾU.\n\n3. THỰC HIỆN\n- Ghi lại phiên bản macOS, chip Apple Silicon (arm64) hay Intel (x86_64), dung lượng ổ còn trống.\n- Homebrew: nằm ở /opt/homebrew hay /usr/local, brew --version chạy được không.\n- Với từng công cụ: tìm trong PATH (which -a), trong brew list và các vị trí thông dụng (/opt/homebrew/bin, /usr/local/bin, ~/EKK, Applications).\n- Model: tìm ggml-base.bin (khoảng 148 MB) trong ~/EKK, thư mục Homebrew và Downloads.\n\n4. PHÂN LOẠI & 5. BÀN GIAO\nBảng tiếng Việt: Công cụ | Phiên bản | Đường dẫn | Trạng thái | Ghi chú (PASS / THIẾU / CẦN XÁC MINH).`)}

            ${renderPromptCard('Bước 2 (macOS): Cài công cụ còn thiếu trên Mac', `EKK – CÀI CÔNG CỤ CÒN THIẾU (MAC)\n\n1. MỤC TIÊU\nCài các công cụ báo THIẾU trong báo cáo kiểm tra vừa rồi, để máy có đủ:\nNode.js LTS + npm, Git, FFmpeg + FFprobe, whisper.cpp (whisper-cli), model ggml-base.bin.\n\n2. PHẠM VI\n- Chỉ cài thứ đang THIẾU. Không gỡ, không nâng cấp thứ đã PASS.\n- Nếu máy CHƯA có Homebrew: không tự cài. Đưa tôi đúng dòng lệnh chính thức từ brew.sh để tôi tự dán vào Terminal và tự gõ mật khẩu máy. Không bao giờ hỏi hay nhập mật khẩu của tôi.\n- Cài qua Homebrew: Node.js LTS, git, ffmpeg, whisper-cpp.\n- Model: huggingface.co/ggerganov/whisper.cpp, file ggml-base.bin, lưu vào ~/EKK/models.\n- TRƯỚC MỖI LẦN CÀI HOẶC TẢI: báo tên, nguồn, dung lượng, nơi lưu, rồi chờ tôi gõ "đồng ý".\n- Không dùng sudo. Nếu cần thêm vào PATH: chỉ sửa ~/.zprofile, báo trước dòng sẽ thêm.\n\n3. THỰC HIỆN & 4. KIỂM TRA CUỐI\nCài lần lượt, chạy lại bài kiểm tra chỉ đọc và thử FFmpeg + whisper-cli đọc file âm thanh 3 giây.`)}
          </div>
        </div>

        <h3 class="eb-h3">🎬 Bước 3 — Tạo Skill <code>/ekk-phu-de</code> tự động xuất phụ đề tiếng Việt (.srt)</h3>
        ${renderPromptCard('Bước 3: Câu lệnh tạo Skill /ekk-phu-de làm phụ đề tiếng Việt', `EKK – TẠO SKILL "ekk-phu-de" (TẠO PHỤ ĐỀ TIẾNG VIỆT)\n\n1. MỤC TIÊU\nTạo một skill cá nhân tên ekk-phu-de. Khi tôi gõ /ekk-phu-de kèm đường dẫn video, skill tạo file phụ đề .srt tiếng Việt nằm cạnh video.\n\n2. PHẠM VI\n- Lưu skill tại ~/.claude/skills/ekk-phu-de/SKILL.md (hoặc %USERPROFILE%\\.claude\\skills\\ekk-phu-de\\SKILL.md trên Windows).\n- Dùng FFmpeg, whisper-cli và model ggml-base.bin đã cài.\n- Không sửa, không ghi đè video gốc. File tạm để trong thư mục tạm và xoá sau khi xong.\n\n3. THỰC HIỆN\n- Các bước trong skill: tách âm thanh từ video (16 kHz, mono) → chạy whisper-cli với tiếng Việt, xuất .srt → đặt tên file .srt trùng tên video → báo đường dẫn.\n\n4. KIỂM TRA & 5. BÀN GIAO\nHỏi tôi một video ngắn 10–20 giây có lời nói tiếng Việt, chạy thử /ekk-phu-de và kiểm tra mốc thời gian.`)}

        <!-- INTERACTIVE 6-FOLDER VIDEO TREE EXPLORER -->
        <div class="eb-motion-widget">
          <div class="eb-widget-head">
            <span class="eb-widget-badge">📁 Bước 4 · Cây 6 Thư Mục Dự Án Video Chuẩn EKK (Bấm để xem quy tắc)</span>
          </div>

          <div class="folder-tree-grid">
            <button type="button" class="folder-node-btn active" onclick="window.EbookApp.inspectFolder(1, this)">
              <span>🔒</span><code>01_Raw</code>
            </button>
            <button type="button" class="folder-node-btn" onclick="window.EbookApp.inspectFolder(2, this)">
              <span>🎞️</span><code>02_Broll</code>
            </button>
            <button type="button" class="folder-node-btn" onclick="window.EbookApp.inspectFolder(3, this)">
              <span>👁️</span><code>03_Tham-chieu</code>
            </button>
            <button type="button" class="folder-node-btn" onclick="window.EbookApp.inspectFolder(4, this)">
              <span>🎨</span><code>04_Brand-guideline</code>
            </button>
            <button type="button" class="folder-node-btn" onclick="window.EbookApp.inspectFolder(5, this)">
              <span>🎵</span><code>05_Sound-effect</code>
            </button>
            <button type="button" class="folder-node-btn" onclick="window.EbookApp.inspectFolder(6, this)">
              <span>✅</span><code>06_Final</code>
            </button>
          </div>

          <div id="folderInspectBox" style="background:#fff;border:1.5px solid #F1CAD8;border-radius:13px;padding:14px 16px;font-size:13px">
            <strong style="color:var(--primary-dark)">📁 Thư mục <code>01_Raw</code> — Video gốc vừa quay:</strong>
            <p style="margin:4px 0 0;color:var(--text-muted)">
              Chứa toàn bộ footage gốc từ máy quay/điện thoại. <strong>Quy tắc bất khả xâm phạm trong CLAUDE.md:</strong> AI chỉ được đọc để tách âm thanh hoặc cắt cảnh, <em>tuyệt đối không bao giờ sửa, ghi đè hay xoá file trong 01_Raw</em>.
            </p>
          </div>
        </div>

        ${renderPromptCard('Bước 4: Câu lệnh tạo bộ 6 thư mục dự án Video + CLAUDE.md bảo vệ', `EKK – TẠO THƯ MỤC DỰ ÁN VIDEO\n\n1. MỤC TIÊU\nTạo bộ thư mục chuẩn cho dự án video tên [ten-du-an],\nnằm trong [Documents/EKK-Projects] của tài khoản máy tính này.\n\n2. PHẠM VI\n- Chỉ tạo thư mục mới và file CLAUDE.md. Không di chuyển, đổi tên, xoá file có sẵn.\n- Nếu thư mục dự án đã tồn tại: dừng, báo tôi, không ghi đè.\n- Tên thư mục giữ đúng như dưới đây: không dấu, không khoảng trắng.\n\n3. THỰC HIỆN\nTạo đúng 6 thư mục:\n01_Raw — video gốc vừa quay\n02_Broll — cảnh phụ chèn minh hoạ\n03_Tham-chieu — video mẫu để học phong cách\n04_Brand-guideline — hồ sơ thương hiệu, logo, màu, font\n05_Sound-effect — nhạc nền, hiệu ứng âm thanh\n06_Final — video đã xuất\nTạo CLAUDE.md ở thư mục gốc dự án, ghi ngắn gọn (dưới 30 dòng):\n- Mỗi thư mục dùng để chứa gì.\n- Không bao giờ sửa, ghi đè hoặc xoá file trong 01_Raw.\n- Video xuất ra chỉ lưu trong 06_Final; file tạm không để lẫn vào các thư mục trên.\n- 03_Tham-chieu chỉ để học phong cách, không cắt ghép vào video thành phẩm.\n- Luôn đọc 04_Brand-guideline trước khi làm chữ, màu, phụ đề.\n\n4. KIỂM TRA & 5. BÀN GIAO\nLiệt kê lại cây thư mục vừa tạo, xác nhận đủ 6 thư mục và nội dung CLAUDE.md.`)}

        <div class="part-nav-footer" style="margin-top:24px">
          <button type="button" class="btn-step-prev" onclick="window.EbookApp.switchChapter('cheatsheet')">← Thẻ lệnh bỏ túi</button>
          <button type="button" class="btn-step-next" onclick="window.EbookApp.scrollToBot()">
            <span>🤖 Hỏi đáp với Bot Trợ Lý Ebook</span>
            <span>↓</span>
          </button>
        </div>
      </article>
    `;
  }

  // ==========================================================================
  // INTERACTIVE CONTROLLERS & MOTION GRAPHIC HANDLERS
  // ==========================================================================
  const K4_DATA = {
    1: {
      step: 'Bước 1 / 4 · KHOANH VÙNG LỖI SAI',
      title: 'Chỉ đúng chỗ sai, tuyệt đối không nói chung chung "làm lại đi"',
      desc: '❌ Sai: <em>"Bài này nghe chán quá, viết lại đi."</em><br>✅ Đúng (Khoanh): <strong>"Câu mở đầu của đoạn 2 nghe quá quảng cáo và xa cách."</strong>'
    },
    2: {
      step: 'Bước 2 / 4 · NÊU RÕ KỲ VỌNG',
      title: 'Nói rõ bạn muốn kết quả mới trông như thế nào',
      desc: '✅ Kỳ vọng của chị Mai: <strong>"Mình muốn giọng nhẹ nhàng, ấm áp như đang nói chuyện trực tiếp với khách quen của tiệm Bếp Mai."</strong>'
    },
    3: {
      step: 'Bước 3 / 4 · KIỂM NGUYÊN NHÂN',
      title: 'Hỏi xem AI đã hiểu yêu cầu của bạn ra sao để phát hiện chỗ mình dặn thiếu',
      desc: '✅ Hỏi ngược lại AI: <strong>"Bạn hiểu yêu cầu của mình thế nào nên mới viết như vậy?"</strong> (Giúp bạn nhận ra mình đã quên dặn điều gì).'
    },
    4: {
      step: 'Bước 4 / 4 · KHÓA QUY TẮC VÀO PROJECT',
      title: 'Biến bài học thành quy tắc ngắn ghi vào Project để lần sau không bao giờ sai lại',
      desc: '✅ Khóa quy tắc: <strong>"Cho mình một quy tắc ngắn 1 dòng để ghi vào phần Hướng dẫn (Instructions) của Project (Bài 4)."</strong>'
    }
  };

  const PUZZLE_PRESETS = {
    bepmai: {
      role: 'chuyên gia marketing cho các tiệm nhỏ',
      context: 'tiệm bánh handmade ở Đà Nẵng, bán bánh ít đường, khách là mẹ bỉm 25–40 tuổi quan tâm sức khỏe gia đình',
      task: 'viết 5 câu khẩu hiệu',
      result: 'Mỗi câu dưới 10 chữ, giọng ấm áp, gần gũi. Ghi thêm 1 dòng giải thích vì sao chọn câu đó'
    },
    creator: {
      role: 'đạo diễn nội dung và biên kịch video ngắn (TikTok / Reels)',
      context: 'kênh chia sẻ kỹ năng dựng phim & ứng dụng AI cho người mới, khán giả là freelancer và chủ shop nhỏ',
      task: 'lên 5 ý tưởng hook 3 giây đầu tiên cho chủ đề dùng AI làm phụ đề tự động',
      result: 'Trình bày dạng bảng gồm: Câu nói mở đầu, Cảnh quay minh hoạ, Lý do giữ chân người xem'
    },
    marketing: {
      role: 'cố vấn chiến lược thương hiệu cá nhân (Personal Branding Strategist)',
      context: 'chuyên gia 10 năm kinh nghiệm vận hành marketing cho SME, muốn xây kênh chia sẻ thực chiến không lý thuyết suông',
      task: 'xây dựng 3 trụ cột nội dung (Content Pillars) và 6 tiêu đề bài viết mở màn',
      result: 'Giọng văn sắc sảo, đi thẳng vào nỗi đau làm kênh nhiều nhưng không ra chuyển đổi'
    },
    shop: {
      role: 'chuyên gia chăm sóc khách hàng và chốt đơn qua tin nhắn',
      context: 'tiệm thời trang thiết kế tối giản cho nữ công sở 25–35 tuổi tại TP.HCM',
      task: 'soạn 3 mẫu tin nhắn trả lời khi khách hỏi giá xong rồi im lặng',
      result: 'Ngắn gọn dưới 4 câu, tinh tế, khéo léo gợi ý phối đồ mà không gây cảm giác chèo kéo'
    }
  };

  const INTERVIEW_TURNS = [
    {
      q: '🤖 Claude hỏi (Câu 3/12): Có kỷ niệm hay câu chuyện làm nghề nào khiến chị nhớ mãi không?',
      a: '👩🏻‍🍳 Chị Mai trả lời: Có lần một bé bị tiểu đường thai kỳ của mẹ, mẹ bé đặt bánh chuối yến mạch không đường của mình rồi nhắn cảm ơn vì lâu lắm mới dám ăn bánh ngon.'
    },
    {
      q: '🤖 Claude hỏi (Câu 4/12): Điều gì chị cam kết KHÔNG BAO GIỜ làm hoặc nói khi bán bánh?',
      a: '👩🏻‍🍳 Chị Mai trả lời: Mình không bao giờ dùng đường hóa học rẻ tiền và không bao giờ quảng cáo bánh ăn vào giảm cân thần tốc.'
    },
    {
      q: '🤖 Claude hỏi (Câu 5/12): Khi nói chuyện với khách, chị muốn khách cảm nhận chị là người thế nào?',
      a: '👩🏻‍🍳 Chị Mai trả lời: Chân thật, ấm áp như người chị trong bếp, luônxưng Mai và gọi khách là chị hoặc mẹ.'
    }
  ];
  let interviewIdx = 0;

  const FOLDER_INFO = {
    1: {
      code: '01_Raw',
      title: 'Video gốc vừa quay',
      desc: 'Chứa toàn bộ footage gốc từ máy quay/điện thoại. <strong>Quy tắc bất khả xâm phạm trong CLAUDE.md:</strong> AI chỉ được đọc để tách âm thanh hoặc cắt cảnh, <em>tuyệt đối không bao giờ sửa, ghi đè hay xoá file trong 01_Raw</em>.'
    },
    2: {
      code: '02_Broll',
      title: 'Cảnh phụ chèn minh hoạ',
      desc: 'Chứa các cảnh quay cận sản phẩm, không gian tiệm bánh, thao tác nhào bột, đóng gói để chèn đè lên cảnh nói chính giúp video sinh động.'
    },
    3: {
      code: '03_Tham-chieu',
      title: 'Video mẫu học nhịp dựng & phong cách',
      desc: 'Chỉ dùng để Claude và bạn phân tích nhịp cắt, kiểu chữ, phong cách màu. <strong>Quy tắc:</strong> Tuyệt đối không cắt ghép cảnh trong thư mục này vào video thành phẩm.'
    },
    4: {
      code: '04_Brand-guideline',
      title: 'Hồ sơ thương hiệu (.md), Logo, Bảng màu, Font',
      desc: 'Nơi đặt file <code>ho-so-thuong-hieu.md</code> và Brand Guideline từ bài khảo sát 15 câu (Bài 4). Claude luôn đọc thư mục này trước khi tạo phụ đề hoặc chèn màu chữ.'
    },
    5: {
      code: '05_Sound-effect',
      title: 'Nhạc nền & Hiệu ứng âm thanh (SFX)',
      desc: 'Chứa nhạc nền không bản quyền và tiếng động (whoosh, pop, ding) đã có quyền sử dụng cho thương hiệu.'
    },
    6: {
      code: '06_Final',
      title: 'Video thành phẩm & Phụ đề (.srt) sẵn sàng đăng',
      desc: 'Mọi video đã cắt ghép xong hoặc file phụ đề <code>.srt</code> do Skill <code>/ekk-phu-de</code> tạo ra đều được xuất gọn gàng vào đây.'
    }
  };

  // Expose Public API on window.EbookApp
  window.EbookApp = {
    handleUnlock(e) {
      e.preventDefault();
      const input = document.getElementById('ebookPassInput');
      const group = document.getElementById('gateInputGroup');
      const feedback = document.getElementById('gateFeedback');
      const gate = document.getElementById('ebookLockGate');
      const val = (input.value || '').trim().toUpperCase();

      if (VALID_PASSWORDS.includes(val)) {
        feedback.className = 'gate-feedback success';
        feedback.textContent = '✨ Xác thực thành công! Đang mở kho học liệu Motion Graphic...';
        gate.classList.add('unlocking');
        sessionStorage.setItem(STORAGE_KEY, '1');

        setTimeout(() => {
          gate.style.display = 'none';
          gate.classList.remove('unlocking');
          const ws = document.getElementById('ebookUnlockedView');
          if (ws) ws.classList.add('unlocked');
          const floater = document.getElementById('ngaoBotFloatingWidget');
          if (floater) floater.style.display = 'flex';
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 420);
      } else {
        feedback.className = 'gate-feedback error';
        feedback.textContent = '❌ Mã PASS chưa đúng. Gợi ý mã học viên lớp 12/12: NGAO2026';
        group.classList.remove('shake');
        void group.offsetWidth;
        group.classList.add('shake');
      }
    },

    quickUnlockDemo() {
      const input = document.getElementById('ebookPassInput');
      if (input) input.value = 'NGAO2026';
      const fakeEvent = { preventDefault() {} };
      this.handleUnlock(fakeEvent);
    },

    lockEbook() {
      sessionStorage.removeItem(STORAGE_KEY);
      const gate = document.getElementById('ebookLockGate');
      const ws = document.getElementById('ebookUnlockedView');
      const input = document.getElementById('ebookPassInput');
      const feedback = document.getElementById('gateFeedback');
      const floater = document.getElementById('ngaoBotFloatingWidget');
      const modal = document.getElementById('ngaoBotModalBackdrop');
      if (ws) ws.classList.remove('unlocked');
      if (gate) gate.style.display = 'block';
      if (floater) floater.style.display = 'flex'; // Vẫn giữ bot hiển thị trên toàn website để khách bấm hỏi
      if (modal) modal.classList.remove('active');
      if (input) input.value = '';
      if (feedback) feedback.textContent = '';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    switchChapter(chapterId) {
      activeChapter = chapterId;
      visitedChapters.add(chapterId);

      // Update sidebar buttons
      document.querySelectorAll('.eb-chapter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.id === 'ebTab_' + chapterId);
      });

      // Update modules
      document.querySelectorAll('.eb-module').forEach(mod => {
        mod.classList.toggle('active', mod.id === 'ebMod_' + chapterId);
      });

      // Update progress bar
      const pct = Math.min(100, Math.round((visitedChapters.size / CHAPTERS.length) * 100));
      const fill = document.getElementById('ebProgressFill');
      const txt = document.getElementById('ebProgressText');
      if (fill) fill.style.width = pct + '%';
      if (txt) txt.textContent = `${visitedChapters.size} / ${CHAPTERS.length} mục (${pct}%)`;

      // Sync journey step highlight if applicable
      const stepMap = { lesson1: 1, lesson2: 1, lesson3: 2, lesson4: 3, lesson5: 4, lesson6: 5, lesson7: 6 };
      if (stepMap[chapterId]) {
        document.querySelectorAll('.eb-step-node').forEach(node => {
          node.classList.toggle('active', Number(node.dataset.step) === stepMap[chapterId]);
        });
      }

      const stage = document.getElementById('ebStageContainer');
      if (stage) {
        const rect = stage.getBoundingClientRect();
        if (rect.top < 80 || rect.top > 350) {
          stage.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    },

    selectJourneyStep(stepNum, targetChapter) {
      document.querySelectorAll('.eb-step-node').forEach(node => {
        node.classList.toggle('active', Number(node.dataset.step) === stepNum);
      });
      const titles = {
        1: 'Đang xem: Bước 1 · Giao việc (4 mảnh) & Tìm hiểu thị trường',
        2: 'Đang xem: Bước 2 · Để AI phỏng vấn bạn (Trái tim hành trình ❤️)',
        3: 'Đang xem: Bước 3 · Khảo sát 15 câu: Xuất Brand Guideline 24 slide & File .md 🎨',
        4: 'Đang xem: Bước 4 · Tạo Project riêng (Cất hồ sơ & Brand Guideline)',
        5: 'Đang xem: Bước 5 · Làm trang web 1 câu lệnh & GitHub Pages',
        6: 'Đang xem: Bước 6 · Đóng gói Skill (Dạy Claude 1 lần, dùng mãi)'
      };
      const st = document.getElementById('journeyStatusText');
      if (st && titles[stepNum]) st.textContent = titles[stepNum];
      this.switchChapter(targetChapter);
    },

    selectBrandPreset(presetKey, btn) {
      document.querySelectorAll('.preset-card-btn').forEach(b => b.classList.remove('active'));
      if (btn) btn.classList.add('active');
      const iconEl = document.getElementById('presetDetailIcon');
      const tagEl = document.getElementById('presetDetailTag');
      const descEl = document.getElementById('presetDetailDesc');
      const info = {
        B: {
          icon: '🏢',
          tag: 'PRESET B · CORPORATE CLEAN',
          desc: 'Tông màu xanh Navy (#0F2942), Slate & Trắng tuyết. Cặp font Sans-serif sắc sảo, khoảng trắng thoáng đãng, toát lên sự chuyên nghiệp và uy tín cho chuyên gia đào tạo, cố vấn tài chính, luật và doanh nhân.'
        },
        C: {
          icon: '📰',
          tag: 'PRESET C · EDITORIAL SPLIT',
          desc: 'Tông màu rượu vang Burgundy (#701A39) & Vàng ấm. Bố cục chia đôi 50/50 phong cách tạp chí nghệ thuật cao cấp, tôn vinh hình ảnh và thẩm mỹ cá nhân cho nhà thiết kế, thời trang & lifestyle.'
        },
        D: {
          icon: '🎬',
          tag: 'PRESET D · VISUAL FIRST',
          desc: 'Tông đen điện ảnh (#111111) & Điểm nhấn ánh sáng. Hình ảnh tràn viền 100%, tỷ lệ vàng điện ảnh, tạo ấn tượng thị giác cho Content Creator, Filmmaker, Đạo diễn và Nhiếp ảnh gia.'
        },
        E: {
          icon: '📐',
          tag: 'PRESET E · MODULAR GRID',
          desc: 'Tông vàng nghệ nghệ thuật (#E59B12) & Đen Bauhaus. Khung lưới phân chia khối chuẩn xác, cấu trúc thông tin kỷ luật và sắc sảo, tối ưu cho Tech Founder, Agency và Chuyên gia Công nghệ.'
        }
      }[presetKey];
      if (info && tagEl && descEl && iconEl) {
        iconEl.textContent = info.icon;
        tagEl.textContent = info.tag;
        descEl.textContent = info.desc;
      }
    },

    filterChapters(query) {
      const q = (query || '').trim().toLowerCase();
      document.querySelectorAll('#ebChapterList li').forEach(li => {
        const title = li.getAttribute('data-title') || '';
        li.style.display = !q || title.includes(q) ? '' : 'none';
      });
    },

    copyPrompt(elId, btn) {
      const el = document.getElementById(elId);
      if (!el) return;
      const raw = decodeURIComponent(el.getAttribute('data-raw') || '') || el.innerText;
      navigator.clipboard.writeText(raw).catch(() => {});
      const oldHTML = btn.innerHTML;
      btn.classList.add('copied');
      btn.innerHTML = '<span>✓ Đã chép câu lệnh!</span>';
      setTimeout(() => {
        btn.classList.remove('copied');
        btn.innerHTML = oldHTML;
      }, 1800);
    },

    select4K(num, btn) {
      document.querySelectorAll('.k4-btn').forEach(b => b.classList.remove('active'));
      if (btn) btn.classList.add('active');
      const info = K4_DATA[num];
      const stage = document.getElementById('k4DetailStage');
      if (stage && info) {
        stage.innerHTML = `
          <div style="font-size:12px;font-weight:850;color:var(--primary);text-transform:uppercase;margin-bottom:4px">${info.step}</div>
          <div style="font-size:15px;font-weight:800;color:var(--primary-dark);margin-bottom:6px">${info.title}</div>
          <p style="font-size:13.5px;color:var(--text-muted);margin:0">${info.desc}</p>
        `;
      }
    },

    loadPuzzlePreset(key, btn) {
      document.querySelectorAll('#ebMod_lesson1 .puzzle-preset-btn').forEach(b => b.classList.remove('active'));
      if (btn) btn.classList.add('active');
      const p = PUZZLE_PRESETS[key];
      if (!p) return;
      document.getElementById('pzRole').value = p.role;
      document.getElementById('pzContext').value = p.context;
      document.getElementById('pzTask').value = p.task;
      document.getElementById('pzResult').value = p.result;
      this.updatePuzzleOutput();
    },

    updatePuzzleOutput() {
      const role = document.getElementById('pzRole').value.trim() || '[vai trò]';
      const ctx = document.getElementById('pzContext').value.trim() || '[bối cảnh]';
      const task = document.getElementById('pzTask').value.trim() || '[việc cần làm]';
      const res = document.getElementById('pzResult').value.trim() || '[kết quả mong muốn]';
      const out = document.getElementById('pzLiveOutput');
      if (out) {
        out.textContent = `Bạn là ${role}.\nTôi có ${ctx}.\nHãy ${task}.\nKết quả: ${res}.`;
      }
    },

    copyDynamicPuzzle(btn) {
      const out = document.getElementById('pzLiveOutput');
      if (!out) return;
      navigator.clipboard.writeText(out.textContent).catch(() => {});
      const old = btn.innerHTML;
      btn.classList.add('copied');
      btn.innerHTML = '<span>✓ Đã chép câu lệnh 4 mảnh!</span>';
      setTimeout(() => {
        btn.classList.remove('copied');
        btn.innerHTML = old;
      }, 1800);
    },

    stepInterviewSim() {
      const box = document.getElementById('interviewNextTurn');
      if (!box) return;
      const turn = INTERVIEW_TURNS[interviewIdx % INTERVIEW_TURNS.length];
      interviewIdx++;
      box.innerHTML = `
        <div style="margin-bottom:8px"><strong style="color:var(--primary)">${turn.q}</strong></div>
        <div style="padding-top:8px;border-top:1px dashed #E5C5D2"><strong style="color:#1E7E48">${turn.a}</strong></div>
      `;
    },

    setContextLevel(level) {
      const fill = document.getElementById('ctxMeterFill');
      const box = document.getElementById('ctxAdviceBox');
      if (!fill || !box) return;
      fill.style.width = level + '%';
      if (level === 30) {
        fill.style.background = '#1E8E5A';
        box.innerHTML = `<strong style="color:#1E8E5A">🟢 Mức 30% Context — Bộ nhớ đang sạch và nhanh:</strong><p style="margin:4px 0 0;color:var(--text-muted)">Claude đang nhớ rất rõ hướng dẫn trong <code>CLAUDE.md</code>. Nếu Claude trả lời sai ở giai đoạn này, hãy gõ <code>/RE</code> (<code>/rewind</code>) để quay lại tin nhắn trước và sửa bằng công thức 4K.</p>`;
      } else if (level === 60) {
        fill.style.background = 'linear-gradient(90deg,#D89824,#C82061)';
        box.innerHTML = `<strong style="color:var(--primary-dark)">🟡 Mức 60% Context — Thời điểm vàng để Reset thủ công 4 bước:</strong><ol style="padding-left:20px;margin-top:6px;line-height:1.65"><li>Bảo Claude tóm tắt ngắn gọn những gì đã làm được.</li><li>Copy đoạn tóm tắt đó lại.</li><li>Gõ lệnh <code>/clear</code> để làm sạch hoàn toàn bàn làm việc.</li><li>Dán bản tóm tắt vào khung chat mới và tiếp tục làm việc mượt mà!</li></ol>`;
      } else {
        fill.style.background = '#D92D20';
        box.innerHTML = `<strong style="color:#B42318">🔴 Mức 95% Context — Nguy hiểm (Tránh để chạm ngưỡng này):</strong><p style="margin:4px 0 0;color:var(--text-muted)">Ở mức 95%, Claude sẽ tự động nén context và chất lượng câu trả lời thường giảm rõ rệt, dễ quên quy tắc cũ. Hãy dùng <code>/compact</code> hoặc chủ động reset ở mức 60%!</p>`;
      }
    },

    switchOS(os) {
      const winBtn = document.getElementById('osBtnWin');
      const macBtn = document.getElementById('osBtnMac');
      const winPane = document.getElementById('osPaneWin');
      const macPane = document.getElementById('osPaneMac');
      if (os === 'win') {
        winBtn.classList.add('active');
        macBtn.classList.remove('active');
        winPane.style.display = 'block';
        macPane.style.display = 'none';
      } else {
        macBtn.classList.add('active');
        winBtn.classList.remove('active');
        macPane.style.display = 'block';
        winPane.style.display = 'none';
      }
    },

    inspectFolder(num, btn) {
      document.querySelectorAll('.folder-node-btn').forEach(b => b.classList.remove('active'));
      if (btn) btn.classList.add('active');
      const info = FOLDER_INFO[num];
      const box = document.getElementById('folderInspectBox');
      if (box && info) {
        box.innerHTML = `
          <strong style="color:var(--primary-dark)">📁 Thư mục <code>${info.code}</code> — ${info.title}:</strong>
          <p style="margin:4px 0 0;color:var(--text-muted)">${info.desc}</p>
        `;
      }
    },

    // ========================================================================
    // VIRTUAL AI BOT ASSISTANT LOGIC (MASCOT NGÁO CONTENT & MODAL POPUP)
    // ========================================================================
    // Voice TTS & Voice Input State
    isAutoVoice: false,
    activeRecognition: null,
    selectedVoice: (typeof localStorage !== 'undefined' && localStorage.getItem('NGAO_BOT_VOICE')) || 'female',
    currentAudio: null,

    changeVoice(v) {
      this.selectedVoice = v;
      try { localStorage.setItem('NGAO_BOT_VOICE', v); } catch(e){}
      this.stopSpeech();
    },

    toggleBotModal(show) {
      const modal = document.getElementById('ngaoBotModalBackdrop');
      if (!modal) return;
      if (typeof show === 'boolean') {
        if (show) modal.classList.add('active');
        else modal.classList.remove('active');
      } else {
        modal.classList.toggle('active');
      }
      if (modal.classList.contains('active')) {
        const sel = document.getElementById('ebBotVoiceSelect');
        if (sel) sel.value = this.selectedVoice || 'female';
        const inp = document.getElementById('ebBotInput');
        if (inp) setTimeout(() => inp.focus(), 250);
      } else {
        this.stopSpeech();
        if (this.activeRecognition) {
          try { this.activeRecognition.stop(); } catch(e){}
          this.activeRecognition = null;
        }
      }
    },

    handleBackdropClick(e) {
      if (e.target && e.target.id === 'ngaoBotModalBackdrop') {
        this.toggleBotModal(false);
      }
    },

    scrollToBot() {
      this.toggleBotModal(true);
    },

    toggleAutoVoice() {
      this.isAutoVoice = !this.isAutoVoice;
      const btn = document.getElementById('ebBotVoiceToggle');
      const txt = document.getElementById('ebVoiceToggleText');
      if (btn && txt) {
        btn.classList.toggle('active', this.isAutoVoice);
        txt.textContent = this.isAutoVoice ? 'Giọng nói: Bật' : 'Giọng nói: Tắt';
      }
      if (!this.isAutoVoice) {
        this.stopSpeech();
      }
    },

    stopSpeech() {
      if (this.currentAudio) {
        try {
          this.currentAudio.pause();
          this.currentAudio.currentTime = 0;
        } catch(e){}
        this.currentAudio = null;
      }
      if ('speechSynthesis' in window) {
        try { window.speechSynthesis.cancel(); } catch(e){}
      }
      document.querySelectorAll('.bot-voice-btn.speaking').forEach(btn => {
        btn.classList.remove('speaking');
        btn.innerHTML = '<span>🔊</span><span>Nghe lại câu trả lời</span>';
      });
      const wave = document.getElementById('ebBotHeaderWave');
      if (wave) wave.classList.remove('active');
    },

    speakAudioOrTTS(audioKey, text, btnElement) {
      if (btnElement && btnElement.classList.contains('speaking')) {
        this.stopSpeech();
        return;
      }

      this.stopSpeech();

      const wave = document.getElementById('ebBotHeaderWave');
      const voice = this.selectedVoice || 'female';

      if (voice !== 'system' && audioKey) {
        const audioSrc = `assets/audio/${voice}_${audioKey}.mp3`;
        const audio = new Audio(audioSrc);
        this.currentAudio = audio;

        audio.onplay = () => {
          if (wave) wave.classList.add('active');
          if (btnElement) {
            btnElement.classList.add('speaking');
            btnElement.innerHTML = `
              <span class="bot-soundwave"><span></span><span></span><span></span></span>
              <span>Đang đọc giọng AI... (Bấm dừng)</span>
            `;
          }
        };

        audio.onended = () => {
          if (wave) wave.classList.remove('active');
          if (btnElement) {
            btnElement.classList.remove('speaking');
            btnElement.innerHTML = '<span>🔊</span><span>Nghe lại câu trả lời</span>';
          }
          this.currentAudio = null;
        };

        audio.onerror = () => {
          this.currentAudio = null;
          this.speakText(text, btnElement);
        };

        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            this.currentAudio = null;
            this.speakText(text, btnElement);
          });
        }
      } else {
        this.speakText(text, btnElement);
      }
    },

    speakText(text, btnElement) {
      if (!('speechSynthesis' in window)) {
        alert('Trình duyệt của bạn chưa bật Web Speech API. Bạn hãy mở trên Google Chrome hoặc Safari để nghe giọng nói nhé!');
        return;
      }

      // Clean text for natural speech reading
      let clean = (text || '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\[[^\]]+\]/g, ' ')
        .replace(/[#*`_~]/g, '')
        .replace(/https?:\/\/\S+/g, 'đường dẫn liên kết')
        .replace(/\s+/g, ' ')
        .trim();

      if (clean.length > 450) {
        clean = clean.substring(0, 450) + '... Bạn có thể xem chi tiết trong bài học nhé.';
      }

      const utterance = new SpeechSynthesisUtterance(clean);
      utterance.lang = 'vi-VN';
      utterance.rate = 0.96;
      utterance.pitch = 1.02;

      // Select Vietnamese voice with priority for natural voices
      try {
        const voices = window.speechSynthesis.getVoices();
        const viVoice = voices.find(v => (v.lang === 'vi-VN' || v.lang.startsWith('vi')) && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Linh')))
          || voices.find(v => v.lang === 'vi-VN' || v.lang.startsWith('vi'));
        if (viVoice) utterance.voice = viVoice;
      } catch(e){}

      const wave = document.getElementById('ebBotHeaderWave');

      utterance.onstart = () => {
        if (wave) wave.classList.add('active');
        if (btnElement) {
          btnElement.classList.add('speaking');
          btnElement.innerHTML = `
            <span class="bot-soundwave"><span></span><span></span><span></span></span>
            <span>Đang đọc... (Bấm dừng)</span>
          `;
        }
      };

      utterance.onend = () => {
        if (wave) wave.classList.remove('active');
        if (btnElement) {
          btnElement.classList.remove('speaking');
          btnElement.innerHTML = '<span>🔊</span><span>Nghe lại câu trả lời</span>';
        }
      };

      utterance.onerror = () => {
        if (wave) wave.classList.remove('active');
        if (btnElement) {
          btnElement.classList.remove('speaking');
          btnElement.innerHTML = '<span>🔊</span><span>Nghe đọc câu trả lời</span>';
        }
      };

      window.speechSynthesis.speak(utterance);
    },

    speakGreeting(btn) {
      const text = 'Xin chào bạn! Mình là Ngáo Bot, trợ lý AI của khoá học Personal Branding Mastery. Bạn có thể hỏi mình mọi thông tin về lịch học ngày mười hai tháng mười hai, địa điểm WORK X Điện Biên Phủ, học phí hai triệu ba trăm chín mươi ba ngàn, hai giảng viên Ngọc Tâm và Nguyễn Hoà, bài trắc nghiệm mười lăm câu, hoặc cẩm nang Ebook thực chiến. Hãy bấm các câu hỏi gợi ý hoặc nói qua micro nhé!';
      this.speakAudioOrTTS('greeting', text, btn);
    },

    speakMessage(btn) {
      if (!btn) return;
      const audioKey = btn.getAttribute('data-audio-key');
      const rawEncoded = btn.getAttribute('data-speech');
      const text = rawEncoded ? decodeURIComponent(rawEncoded) : '';
      if (!text && !audioKey) return;
      this.speakAudioOrTTS(audioKey, text, btn);
    },

    toggleVoiceInput() {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        alert('Trình duyệt của bạn chưa hỗ trợ nhận diện giọng nói (Microphone). Bạn hãy mở trên Google Chrome hoặc Edge để sử dụng nhé!');
        return;
      }

      const micBtn = document.getElementById('ebBotMicBtn');
      const inp = document.getElementById('ebBotInput');

      if (this.activeRecognition) {
        try { this.activeRecognition.stop(); } catch(e){}
        this.activeRecognition = null;
        if (micBtn) micBtn.classList.remove('listening');
        return;
      }

      try {
        const recognition = new SpeechRecognition();
        recognition.lang = 'vi-VN';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
          if (micBtn) micBtn.classList.add('listening');
          if (inp) inp.placeholder = 'Đang lắng nghe bạn nói... Hãy nói câu hỏi của bạn nhé! 🎙️';
        };

        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          if (inp) {
            inp.value = transcript;
            inp.placeholder = 'Hỏi Bot về bất kỳ nội dung nào trên web (hoặc bấm 🎙️ để nói)...';
          }
          const matched = this.findBestAnswer(transcript);
          this.appendBotConversation(transcript, matched);
        };

        recognition.onerror = (event) => {
          console.warn('Speech recognition error:', event.error);
          if (micBtn) micBtn.classList.remove('listening');
          if (inp) inp.placeholder = 'Hỏi Bot về bất kỳ nội dung nào trên web (hoặc bấm 🎙️ để nói)...';
          this.activeRecognition = null;
        };

        recognition.onend = () => {
          if (micBtn) micBtn.classList.remove('listening');
          if (inp) inp.placeholder = 'Hỏi Bot về bất kỳ nội dung nào trên web (hoặc bấm 🎙️ để nói)...';
          this.activeRecognition = null;
        };

        this.activeRecognition = recognition;
        recognition.start();
      } catch (err) {
        console.error('Voice recognition error:', err);
        if (micBtn) micBtn.classList.remove('listening');
      }
    },

    jumpToPart(partId) {
      if (typeof window.goToPart === 'function') {
        window.goToPart(partId);
      }
      this.toggleBotModal(false);
    },

    openEbookChapter(chapterId) {
      if (typeof window.goToPart === 'function') {
        window.goToPart('ebook');
      }
      const isUnlocked = sessionStorage.getItem(STORAGE_KEY) === '1';
      if (!isUnlocked) {
        alert('Nội dung này nằm trong Ebook thực chiến dành cho học viên. Bạn hãy nhập mật khẩu "NGAO2026" hoặc "1212" để mở khóa học liệu nhé!');
        this.toggleBotModal(false);
        return;
      }
      this.switchChapter(chapterId);
      this.toggleBotModal(false);
    },

    askBotPreset(kbId) {
      this.toggleBotModal(true);
      const item = BOT_KNOWLEDGE.find(k => k.id === kbId);
      if (!item) return;
      this.appendBotConversation(item.question, item);
    },

    handleBotSubmit(e) {
      e.preventDefault();
      const inp = document.getElementById('ebBotInput');
      if (!inp) return;
      const q = inp.value.trim();
      if (!q) return;
      inp.value = '';
      const matched = this.findBestAnswer(q);
      this.appendBotConversation(q, matched);
    },

    findBestAnswer(query) {
      const qLower = query.toLowerCase();
      let bestItem = null;
      let bestScore = 0;

      for (const item of BOT_KNOWLEDGE) {
        let score = 0;
        for (const kw of item.keywords) {
          if (qLower.includes(kw.toLowerCase())) {
            score += kw.length + 3;
          }
        }
        if (item.question.toLowerCase().includes(qLower)) score += 5;
        if (score > bestScore) {
          bestScore = score;
          bestItem = item;
        }
      }

      if (bestItem && bestScore > 0) return bestItem;

      // Fallback comprehensive guide response grounded in whole website
      return {
        targetPart: 'overview',
        targetLabel: 'Xem Tổng quan trên Website',
        answer: `Cảm ơn bạn đã hỏi Ngáo Bot!<br><br>Để tìm hiểu thông tin chi tiết, bạn có thể tham khảo các phần chính sau trên website:<br>
• **Phần 1: Tổng quan** — Định vị *"Hiểu Nhân cho rõ, Xây Hiệu cho lâu"*. Giải quyết câu chuyện bóc tách năng lực thực chất.<br>
• **Phần 2: 3 Trục tư duy** — Bản sắc độc bản, Phễu truyền thông đa kênh, AI & Vibe Coding thực chiến.<br>
• **Phần 3: Quyền lợi** — 1 ngày offline + 14 ngày đồng hành + 2 record + 1 Zoom sửa bài.<br>
• **Phần 4: Giảng viên** — Gặp gỡ Trainer Ngọc Tâm (12+ năm KN) & Trainer Nguyễn Hoà (Edit Không Khó).<br>
• **Phần 5: Địa điểm & Học phí** — WORK X, 182 Điện Biên Phủ (12/12/2026), học phí 2.393.000đ trọn gói.<br>
• **Phần 6: Đăng ký & QR** — Quét QR thanh toán hoặc gọi Hotline 0902 596 059.<br>
• **Phần 7: Ebook Học Viên** — Cẩm nang làm web & video bằng Claude AI (Mật khẩu: NGAO2026).<br><br>
👉 Bạn cũng có thể bấm vào các câu hỏi gợi ý bên trên hoặc nói trực tiếp qua micro 🎙️ nhé!`
      };
    },

    appendBotConversation(userText, kbItem) {
      const box = document.getElementById('ebBotMessages');
      if (!box) return;

      // 1. User message bubble
      const userRow = document.createElement('div');
      userRow.className = 'bot-msg-row user';
      userRow.innerHTML = `<div class="bot-msg-bubble">${userText.replace(/</g, '&lt;')}</div>`;
      box.appendChild(userRow);
      box.scrollTop = box.scrollHeight;

      // 2. Bot response with citation + speech button + prompt + jump button
      setTimeout(() => {
        const botRow = document.createElement('div');
        botRow.className = 'bot-msg-row bot';
        const promptHTML = kbItem.prompt
          ? renderPromptCard('Câu lệnh thực chiến từ Ebook', kbItem.prompt)
          : '';
        const formattedAnswer = (kbItem.answer || '')
          .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
          .replace(/\*([^*]+)\*/g, '<em>$1</em>')
          .replace(/`([^`]+)`/g, '<code style="background:#FFF0F5;color:#9A1144;padding:2px 6px;border-radius:5px;font-weight:700">$1</code>');

        const rawSpeechText = (kbItem.answer || '')
          .replace(/<[^>]+>/g, ' ')
          .replace(/[#*`_~]/g, '')
          .replace(/https?:\/\/\S+/g, 'đường dẫn liên kết')
          .replace(/\s+/g, ' ')
          .trim();
        const encodedSpeech = encodeURIComponent(rawSpeechText);

        let citeText = '💡 Giải đáp chính thức từ Website';
        if (kbItem.targetLabel) {
          citeText = `📍 ${kbItem.targetLabel}`;
        } else if (kbItem.chapterName) {
          citeText = `📖 Nguồn Ebook: ${kbItem.chapterName}`;
        }

        let navBtnHTML = '';
        if (kbItem.targetPart) {
          navBtnHTML = `
            <button type="button" class="bot-jump-btn" onclick="window.EbookApp.jumpToPart('${kbItem.targetPart}')">
              <span>📍 ${kbItem.targetLabel || 'Xem trên Website'}</span>
              <span>→</span>
            </button>
          `;
        } else if (kbItem.targetUrl) {
          navBtnHTML = `
            <a href="${kbItem.targetUrl}" target="_blank" rel="noopener noreferrer" class="bot-jump-btn" style="text-decoration:none">
              <span>🔗 ${kbItem.targetLabel || 'Mở liên kết'}</span>
              <span>↗</span>
            </a>
          `;
        } else if (kbItem.chapter) {
          navBtnHTML = `
            <button type="button" class="bot-jump-btn" onclick="window.EbookApp.openEbookChapter('${kbItem.chapter}')">
              <span>📖 Mở xem chi tiết "${kbItem.chapterName || 'bài học'}"</span>
              <span>→</span>
            </button>
          `;
        }

        botRow.innerHTML = `
          <div class="bot-msg-bubble">
            <div class="bot-cite-tag">${citeText}</div>
            <div>${formattedAnswer}</div>
            ${promptHTML}
            <div class="eb-bot-voice-actions">
              <button type="button" class="bot-voice-btn" data-audio-key="${kbItem.id || ''}" data-speech="${encodedSpeech}" onclick="window.EbookApp.speakMessage(this)">
                <span>🔊</span>
                <span>Nghe đọc câu trả lời</span>
              </button>
              ${navBtnHTML}
            </div>
          </div>
        `;
        box.appendChild(botRow);
        box.scrollTop = box.scrollHeight;

        // Auto speak if enabled
        if (window.EbookApp.isAutoVoice) {
          const vBtn = botRow.querySelector('.bot-voice-btn');
          if (vBtn) window.EbookApp.speakMessage(vBtn);
        }
      }, 240);
    }
  };

  // Close Bot Modal on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const modal = document.getElementById('ngaoBotModalBackdrop');
      if (modal && modal.classList.contains('active')) {
        window.EbookApp.toggleBotModal(false);
      }
    }
  });

  // Preload voices for speech synthesis
  if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = () => {
      try { window.speechSynthesis.getVoices(); } catch(e){}
    };
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      mountGlobalBot();
      initEbookSection();
    });
  } else {
    mountGlobalBot();
    initEbookSection();
  }
})();
