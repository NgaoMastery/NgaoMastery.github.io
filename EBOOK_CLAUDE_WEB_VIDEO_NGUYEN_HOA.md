# Dùng Claude làm web và video: Câu lệnh thực chiến cho người mới

Nov 18, 2026 · @Nguyễn Hoà

## Mở đầu: AI là trợ lý, bạn là bà chủ

Bạn không cần giỏi công nghệ để dùng AI. Nếu bạn biết nhắn tin Zalo, bạn đã biết dùng AI. Khác biệt duy nhất: bạn đang nhắn tin cho một trợ lý rất giỏi nhưng **chưa biết gì về bạn**. Ebook này dạy bạn cách "giao việc" cho trợ lý đó, bằng những câu lệnh chép về dùng được ngay.

**Công cụ dùng trong sách:** ứng dụng Claude Desktop trên máy tính (Mac hoặc Windows). Cũng làm được trên trình duyệt tại [claude.ai](https://claude.ai) hoặc trên điện thoại. Tài khoản miễn phí cũng làm được hầu hết bài trong sách.

**Bạn cần chuẩn bị:** tài khoản Claude, máy tính Mac hoặc Windows có mạng và đã cài Claude Desktop (xem mục "Cài Claude Desktop" bên dưới), khoảng 60 phút.

**Một ví dụ xuyên suốt:** chúng ta đồng hành cùng *chị Mai*, 8 năm làm bánh ít đường, chủ tiệm nhỏ "Bếp Mai". Chị muốn có một trang web giới thiệu và những video ngắn để mọi người biết đến bánh của chị. Bạn cứ thay câu chuyện của chị Mai bằng nghề của mình.

**Bản đồ hành trình:**

| Bước | Bài | Bạn làm | Bạn có được |
| --- | --- | --- | --- |
| 1 | Bài 1, 2 | Học giao việc và tìm hiểu thông tin | Câu lệnh 4 mảnh, bảng tìm hiểu có nguồn |
| 2 | Bài 3 | Để AI phỏng vấn bạn | Hồ sơ thương hiệu |
| 3 | Bài 4 | Khảo sát 15 câu & Brand Guideline | Brand DNA, tệp Brand Guideline PDF 24 slide & File .md |
| 4 | Bài 5 | Tạo Project | Ngăn tủ riêng, cất hồ sơ & Brand Guideline |
| 5 | Bài 6 | Làm trang web | Trang web có link chia sẻ |
| 6 | Bài 7 | Đóng gói Skill | Cách làm dùng lại được |
| Nâng cao | Bài 8, 9, Phụ lục | Định dạng & Công cụ chuyên sâu | File .md và JSON; lệnh Claude Code; EKK Video & Phụ đề |

Bài 3 và Bài 4 là trái tim của cả hành trình: Hồ sơ thương hiệu và Brand Guideline làm ra ở đó được dùng lại cho mọi việc phía sau.

**Cách đọc sách:**

- **3 việc cho mọi câu lệnh:** chữ trong khung xám là câu lệnh mẫu. Bạn **chép** → **dán** vào Claude → **sửa** phần trong ngoặc `[...]` thành thông tin của bạn.
- Đầu mỗi bài có một khung nhỏ: mục tiêu, thời gian, thứ bạn có được sau bài đó.
- Đọc mục "Tư duy trước khi bắt đầu" trước, rồi làm lần lượt từ Bài 1. Cuối buổi bạn có hồ sơ thương hiệu, Brand Guideline và một trang web.
- Bài 8, Bài 9 và Phụ lục là phần **Nâng cao**. Mới bắt đầu thì bỏ qua cũng được.

**Giải nghĩa 5 từ sẽ gặp:**

| Từ | Nghĩa dễ hiểu |
| --- | --- |
| Prompt (câu lệnh) | Tin nhắn bạn gửi cho AI để giao việc |
| Brand Guideline (cẩm nang thương hiệu) | Bộ quy chuẩn nhận diện thị giác gồm bảng màu HEX, font chữ, bố cục và giọng điệu chuẩn xác |
| Project (dự án) | Một "ngăn tủ" riêng trong Claude, cất sẵn thông tin thương hiệu để lần nào hỏi cũng không phải kể lại |
| Artifact | Sản phẩm Claude làm ra và hiện bên cạnh khung chat: trang web, tài liệu, bảng tính |
| Skill (kỹ năng) | Một "công thức nấu" bạn dạy Claude một lần, lần sau Claude tự làm đúng cách đó |

**Ebook này làm gì:** thực hành Claude để làm hai thứ, **một trang web** và **edit video có AI hỗ trợ**. Phần chiến lược thương hiệu (định vị, trụ cột nội dung, nhận diện hình ảnh) được chuẩn hóa qua khảo sát 15 câu và xuất Brand Guideline; sau đó dùng làm đầu vào cho web và video.

| Việc | Bài trong ebook | Bạn có được |
| --- | --- | --- |
| Tư duy giao việc | Mục Tư duy | 4 quy tắc: AI phỏng vấn trước, nhờ phản biện, sửa bằng 4K, ghi rõ (AI suy luận) |
| Dùng Claude cơ bản | Bài 1, 2 | Câu lệnh 4 mảnh, tìm thông tin có nguồn |
| Cho Claude hiểu bạn | Bài 3 | Hồ sơ thương hiệu qua phỏng vấn |
| Khảo sát & Nhận diện | Bài 4 | Khảo sát 15 câu: xuất Brand Guideline 24 slide PDF & File .md |
| Cất vào ngăn tủ | Bài 5 | Project để không phải kể lại |
| Làm web | Bài 6 | Trang web một trang, chia sẻ bằng link, đưa lên GitHub Pages |
| Dùng lại cách làm | Bài 7 | Skill: dạy Claude một lần, dùng mãi |
| Nâng cao | Bài 8, 9, Phụ lục | File .md và JSON; lệnh giữ Claude Code không bị đầy; để Claude tự làm phụ đề và tạo thư mục video trên máy |

## Tư duy trước khi bắt đầu: bạn là người giao việc

Với Claude, bạn là **chủ giao việc**, còn AI là **nhân viên thực thi**: làm nhanh, không biết mệt, nhưng **không tự biết** doanh nghiệp, khách hàng hay gu của bạn. Nhân viên mới nào cũng vậy: giao việc mơ hồ thì ra kết quả mơ hồ. Vì thế việc của bạn là **dạy AI hiểu trước, giao việc rõ ràng, và sửa đúng cách khi AI làm sai**. Có 4 quy tắc:

| Quy tắc | Nghĩa là | Làm ở đâu |
| --- | --- | --- |
| 1. Dạy AI hiểu | Đưa cho AI bối cảnh về bạn và thương hiệu, một lần, dùng nhiều lần | Bài 3 (Hồ sơ thương hiệu), Bài 4 (Brand Guideline), Bài 5 (Project) |
| 2. AI phỏng vấn trước khi làm | Đừng giao việc ngay; để AI hỏi lại cho đủ thông tin | Ngay bên dưới |
| 3. Nhờ AI chỉ ra điểm mù | Bắt AI phản biện ý tưởng của bạn, không chỉ làm theo | Ngay bên dưới |
| 4. Sai thì sửa bằng công thức 4K | Góp ý theo 4 bước để AI sửa đúng và lần sau không sai lại | Ngay bên dưới |

**Quy tắc chung cho mọi câu lệnh:** thêm câu này vào cuối lời nhờ của bạn: "Phần nào bạn suy luận (không có nguồn hoặc dữ liệu thật), hãy ghi rõ là (AI suy luận)." Nhờ vậy bạn phân biệt được đâu là sự thật, đâu là AI đoán, và biết chỗ nào cần tự kiểm tra lại.

### Quy tắc 2: để AI phỏng vấn bạn trước khi làm

Người mới thường gõ ngay "viết giúp mình bài đăng" rồi thất vọng vì kết quả chung chung. Cách tốt hơn: **nói việc mình muốn, rồi bảo AI hỏi lại mình trước**. AI hỏi ra những điều bạn chưa nghĩ tới, và bạn không phải tự đoán mình cần cung cấp gì.

**Câu lệnh mẫu:**

```text
Mình muốn bạn giúp mình [việc cần làm]. Trước khi làm, hãy phỏng vấn mình: hỏi từng lần một câu, tối đa 7 câu, về mục tiêu, người sẽ xem, giọng điệu, điều cần tránh và ví dụ mình thích. Khi đã đủ thông tin, hãy tóm tắt lại những gì bạn hiểu và chờ mình xác nhận rồi mới bắt đầu làm.
```

Bài 3 là phiên bản đầy đủ của quy tắc này, dùng để xây Hồ sơ thương hiệu.

### Quy tắc 3: nhờ AI chỉ ra điểm mù tư duy

AI có xu hướng nghe theo và khen ý bạn. Muốn có phản biện thật, bạn phải **yêu cầu rõ**. Dùng câu lệnh này sau khi bạn có ý tưởng hoặc kế hoạch:

```text
Hãy đóng vai người phản biện thẳng thắn cho ý tưởng/kế hoạch ở trên. Không khen xã giao. Cho mình: (1) 3 điều mình đang mặc định là đúng nhưng chưa kiểm chứng, (2) 3 điểm mình có thể đang không nhìn thấy, (3) lý do mạnh nhất khiến kế hoạch này thất bại, (4) một cách làm khác tốt hơn nếu có. Với mỗi ý, nói rõ vì sao.
```

**Lưu ý:** phản biện của AI là gợi ý để bạn suy nghĩ, không phải phán quyết. AI không thấy khách hàng thật của bạn, nên điểm nào quan trọng hãy kiểm lại với khách hoặc số liệu thật. Quyết định cuối cùng vẫn là của bạn.

### Quy tắc 4: AI làm sai thì sửa bằng công thức 4K

Khi AI làm sai, đừng chỉ nói "làm lại đi" hoặc "không đúng". AI không biết sai ở đâu và sẽ đoán mò. Dùng công thức **4K** (công thức của Nguyễn Hoà, dành riêng cho việc góp ý với AI):

| Chữ | Việc bạn làm | Ví dụ |
| --- | --- | --- |
| **K**hoanh | Chỉ đúng chỗ sai, không nói chung chung | "Câu mở đầu của đoạn 2 nghe quá quảng cáo." |
| **K**ỳ vọng | Nói rõ bạn muốn nó trông như thế nào | "Mình muốn giọng nhẹ nhàng, như nói chuyện với khách quen." |
| **K**iểm nguyên nhân | Hỏi AI đã hiểu yêu cầu của bạn ra sao | "Bạn hiểu yêu cầu của mình thế nào nên viết như vậy?" |
| **K**hóa quy tắc | Biến bài học thành quy tắc ghi lại để lần sau không sai nữa | "Cho mình một quy tắc ngắn để ghi vào phần hướng dẫn của Project." |

**Câu lệnh mẫu (gộp 4 bước):**

```text
Chỗ này chưa đúng ý mình: [dán hoặc mô tả đúng chỗ sai]. Mình muốn [kết quả mong muốn]. Bạn hiểu yêu cầu của mình thế nào nên mới viết như vậy? Sau đó hãy viết lại, rồi cho mình một quy tắc ngắn để ghi vào hướng dẫn của Project (Bài 5), để lần sau bạn không sai như thế nữa.
```

Câu trả lời "vì sao" của AI chỉ là lời giải thích AI đưa ra, chưa chắc là lý do thật. Hãy coi nó như gợi ý để bạn thấy **mình đã nói thiếu điều gì**.

**Vì sao không dùng khung 4A của Netflix?** Netflix có khung góp ý 4A (Aim to assist, Actionable, Appreciate, Accept or discard) trong cuốn *No Rules Rules* của Reed Hastings và Erin Meyer ([nguồn](https://www.corporate-rebels.com/blog/feedback-at-netflix)). Khung này viết cho góp ý giữa **người với người**. Hai chữ đầu (góp ý để giúp, và nói rõ cần làm gì khác đi) áp dụng được với AI, và 4K đã dùng lại tinh thần đó. Hai chữ sau là cách người nhận góp ý phản ứng (biết ơn, cân nhắc rồi tự quyết), không hợp với AI nên 4K bỏ đi và thêm bước **Khóa quy tắc**.

## Cài Claude Desktop (làm trước buổi học)

| Mục tiêu | Thời gian | Bạn có được |
| --- | --- | --- |
| Cài ứng dụng Claude trên máy tính | 5 phút | Claude Desktop đã đăng nhập, sẵn sàng làm các bài |

1. Mở trang tải: [claude.com/download](https://claude.com/download).
2. Chọn đúng hệ điều hành: **macOS** hoặc **Windows**. Windows có hai bản, x64 và arm64. Không chắc thì mở Settings → System → About, xem dòng "System type".
3. Mở file vừa tải về để cài. Cài xong, mở Claude từ thư mục Applications (Mac) hoặc Start menu (Windows).
4. Đăng nhập bằng tài khoản Claude của bạn.

Theo trang hỗ trợ của Anthropic, máy cần macOS 11 trở lên hoặc Windows 10 trở lên ([nguồn](https://support.claude.com/en/articles/10065433-install-claude-desktop)).

**Ba khu vực trong ứng dụng và gói nào dùng được:**

| Khu vực | Dùng để | Gói | Dùng ở bài |
| --- | --- | --- | --- |
| Chat | Trò chuyện, làm Project, làm web, Skill | Mọi gói, kể cả miễn phí | Bài 1 đến 7 |
| Code (Claude Code) | Để Claude làm việc trực tiếp trên máy | Pro, Max, Team, Enterprise | Bài 8, Phụ lục |
| Cowork | Giao việc cho Claude làm với file trên máy | Pro, Max, Team, Enterprise | Ebook này chưa dùng |

Tên và vị trí nút có thể khác tùy phiên bản ứng dụng. Giảng viên nên gửi link tải cho học viên trước buổi học 1 đến 2 ngày để buổi học không mất thời gian cài đặt.

## Bài 1 — Câu lệnh đầu tiên: công thức 4 mảnh

| Mục tiêu | Thời gian | Bạn có được |
| --- | --- | --- |
| Biết cách giao việc để Claude trả lời đúng ý | 3 phút | Một mẫu câu lệnh chép dùng được |

AI trả lời chung chung vì ta hỏi chung chung. Một câu lệnh tốt giống một lời dặn việc đầy đủ cho nhân viên mới, gồm 4 mảnh:

| Mảnh | Trả lời câu hỏi | Ví dụ của chị Mai |
| --- | --- | --- |
| 1. Vai trò | AI đóng vai ai? | "Bạn là chuyên gia marketing cho tiệm nhỏ" |
| 2. Bối cảnh | Mình là ai, bán gì, cho ai? | "Tiệm bánh handmade ở Đà Nẵng, khách là mẹ bỉm 25–40 tuổi" |
| 3. Việc cần làm | Cụ thể cần gì? | "Viết 5 câu khẩu hiệu" |
| 4. Kết quả mong muốn | Trình bày thế nào, dài bao nhiêu, giọng ra sao? | "Mỗi câu dưới 10 chữ, giọng ấm áp, kèm lý do chọn" |

Bốn mảnh nằm chung trong một tin nhắn; mảnh nào bị thiếu, AI sẽ tự đoán và thường đoán chung chung.

**Trước và sau:**

```text
❌ Viết giúp tôi khẩu hiệu cho tiệm bánh.
```

```text
✅ Bạn là chuyên gia marketing cho các tiệm nhỏ.
Tôi có tiệm bánh handmade ở Đà Nẵng, bán bánh ít đường, khách chủ yếu là mẹ bỉm 25–40 tuổi quan tâm sức khỏe gia đình.
Hãy viết 5 câu khẩu hiệu.
Mỗi câu dưới 10 chữ, giọng ấm áp, gần gũi. Ghi thêm 1 dòng giải thích vì sao chọn câu đó.
```

**Khuôn mẫu để chép:**

```text
Bạn là [vai trò].
Tôi là [bạn làm nghề gì, bán gì, ở đâu], khách hàng của tôi là [ai].
Hãy [việc cần làm].
Kết quả: [dài bao nhiêu, trình bày thế nào, giọng văn ra sao].
```

**3 câu nói tiếp giúp kết quả tốt hơn:**

- "Chưa đúng ý. Tôi muốn \[điều cụ thể\]. Viết lại." (Sai nhiều lần thì dùng công thức 4K ở mục Tư duy.)
- "Thích câu số 3. Viết thêm 5 câu theo hướng đó."
- "Trước khi làm, hãy hỏi tôi những gì bạn cần biết." (Bí quyết này dùng nhiều ở Bài 3.)

## Bài 2 — Khai thác thông tin: để AI đi tìm hiểu giúp bạn

| Mục tiêu | Thời gian | Bạn có được |
| --- | --- | --- |
| Nhờ Claude tìm hiểu khách hàng và đối thủ trên internet | 4 phút | Bảng tìm hiểu, có link nguồn để kiểm tra |

Trước khi làm thương hiệu, cần hiểu khách hàng và đối thủ. Claude có thể tìm trên internet rồi tóm tắt cho bạn, kèm đường link nguồn để bạn tự kiểm tra.

**Bật tìm kiếm web:** tùy phiên bản ứng dụng, bạn thấy công tắc "Web search" trong nút **+** hoặc biểu tượng thanh trượt cạnh ô nhập; bật nó lên. Ở phiên bản mới không có công tắc này, Claude tự tìm khi cần ([nguồn](https://support.claude.com/en/articles/10684626)). Chắc ăn nhất: viết thêm chữ "tìm trên web" trong câu lệnh.

**Mẫu 1 — Hiểu khách hàng:**

```text
Tìm trên web và cho tôi biết: khách hàng [mô tả khách, ví dụ: mẹ bỉm 25–40 tuổi ở Đà Nẵng] khi mua [sản phẩm] thường:
1. Lo lắng điều gì nhất?
2. Hay hỏi những câu gì?
3. Tìm mua ở đâu (Facebook, TikTok, Shopee...)?
Trình bày thành bảng ngắn, ghi nguồn cho từng ý.
```

**Mẫu 2 — Soi đối thủ:**

```text
Tìm trên web 5 thương hiệu [ngành của bạn] tại [khu vực] đang làm tốt trên mạng xã hội.
Với mỗi thương hiệu cho biết: họ nói mình khác biệt ở điểm nào, giọng văn ra sao, điểm mạnh và điểm yếu.
Cuối cùng gợi ý 3 khoảng trống mà thương hiệu nhỏ như tôi có thể chiếm.
```

**Mẫu 3 — Bắt xu hướng:**

```text
Tìm trên web các xu hướng nội dung [ngành của bạn] gần đây trên TikTok và Facebook.
Chọn 5 xu hướng phù hợp với tiệm nhỏ, ngân sách thấp. Mỗi xu hướng cho 1 ý tưởng video cụ thể.
```

**Quy tắc vàng: AI có thể sai.** Con số, giá cả, tên người, luật lệ phải mở link nguồn ra kiểm tra trước khi đăng lên. Nếu Claude không đưa được nguồn, hãy coi đó là gợi ý, không phải sự thật.

Câu kiểm tra nên thuộc: *"Ý nào trong câu trả lời trên bạn chưa chắc chắn? Đánh dấu giúp tôi."*

## Bài 3 — Để AI phỏng vấn bạn

| Mục tiêu | Thời gian | Bạn có được |
| --- | --- | --- |
| Để Claude hỏi bạn từng câu và viết thành hồ sơ | 12 phút | Hồ sơ thương hiệu, dùng cho mọi bài sau |

Đây là bài quan trọng nhất, và là phiên bản đầy đủ của Quy tắc 2 ở mục Tư duy. Thay vì tự nghĩ xem nên kể gì cho AI, bạn đảo vai: **để AI hỏi, bạn chỉ việc trả lời**. Giống đi khám bệnh: bác sĩ hỏi từng câu, bạn không cần biết trước phải nói gì. Cuối buổi, AI gom tất cả thành **Hồ sơ thương hiệu**, dùng cho mọi bài sau.

**Buổi phỏng vấn mẫu của chị Mai (rút gọn):**

| Lượt | Claude hỏi | Chị Mai trả lời |
| --- | --- | --- |
| 1 | Chị bán sản phẩm gì, cho ai? | Bánh ít đường, cho mẹ có con nhỏ. |
| 2 | Khách hay khen tiệm điều gì nhất? | Không ngọt gắt, giao tận nhà. |

Sau tối đa 12 câu, Claude tổng hợp thành **Hồ sơ thương hiệu Bếp Mai**, ví dụ:

- Khách hàng: mẹ bỉm 25–40 tuổi, quan tâm sức khỏe gia đình
- Khác biệt: bánh ít đường, giao tận nhà
- Giọng nói: ấm áp, gần gũi, xưng Mai

Bạn trả lời bằng lời ăn tiếng nói hằng ngày; việc sắp xếp thành hồ sơ là việc của AI.

**Câu lệnh phỏng vấn (chép nguyên):**

```text
Bạn là chuyên gia xây dựng thương hiệu cá nhân.
Hãy phỏng vấn tôi để làm Hồ sơ thương hiệu cá nhân.
Quy tắc:
- Mỗi lần chỉ hỏi 1 câu, chờ tôi trả lời rồi mới hỏi tiếp.
- Dùng từ ngữ đơn giản, có ví dụ gợi ý để tôi dễ trả lời.
- Tối đa 12 câu, đi qua: chuyên môn và kinh nghiệm, câu chuyện nghề đáng nhớ, thành quả có thật, giá trị tôi theo đuổi, người tôi giúp được và vấn đề của họ, điều tôi khác người cùng nghề.
- Câu nào tôi trả lời chung chung, hỏi thêm 1 câu để lấy ví dụ cụ thể.
Khi xong, tổng hợp thành Hồ sơ thương hiệu cá nhân gồm: tôi là ai, chuyên môn, câu chuyện, thành quả, người tôi giúp, điều khác biệt, giọng nói, màu sắc gợi ý, những điều không bao giờ nói.
Không thêm thành tích hay con số tôi chưa nói.
Bắt đầu với câu hỏi đầu tiên.
```

**Mẹo trả lời:**

- Nói thật, nói tự nhiên như kể cho bạn thân. Không cần văn hay.
- Trên điện thoại, bấm biểu tượng micro để nói thay vì gõ.
- Chưa biết trả lời? Gõ: *"Tôi chưa biết, gợi ý cho tôi 3 lựa chọn."*
- Xong hồ sơ, đọc lại và sửa chỗ chưa giống mình. **Lưu hồ sơ này lại** — Bài 4 và Bài 5 sẽ dùng.

### Mở rộng: phỏng vấn khách hàng thật

Hồ sơ trên mới là góc nhìn của bạn. Muốn biết khách nghĩ gì, hãy hỏi khách. AI giúp soạn câu hỏi và đọc câu trả lời.

```text
Soạn 7 câu hỏi ngắn để tôi hỏi khách quen qua Zalo, nhằm hiểu: vì sao họ chọn [tiệm của tôi], họ thích gì, chưa hài lòng gì.
Câu hỏi thân mật, không dẫn dắt, trả lời được trong 2 phút.
```

Thu được câu trả lời của 5–10 khách, dán vào Claude (bỏ tên và số điện thoại của khách) và hỏi: *"Khách nhắc nhiều nhất điều gì? Có câu nào dùng được làm khẩu hiệu không?"* Lời của khách thường là chất liệu quảng cáo tốt nhất.

## Bài 4 — Khảo sát 15 câu: Xuất Brand Guideline 24 slide & File .md

| Mục tiêu | Thời gian | Bạn có được |
| --- | --- | --- |
| Khai quật Brand DNA & bộ nhận diện thị giác chuẩn xác | 15 phút | Tệp Brand Guideline PDF 24 slide & File .md nạp vào Claude |

Sau khi có Hồ sơ thương hiệu bằng lời ở Bài 3, bạn cần chuyển hóa nó thành **ngôn ngữ hình ảnh và nhận diện thị giác chuẩn xác**. Đó là lý do bạn thực hiện **Khảo sát định vị 15 câu [Bản Học Viên]** để xuất trọn bộ **Brand Guideline**.

### 1. Khảo sát định vị 15 câu (Bản Học Viên)

Mở công cụ **NGAO Brand Discovery (15 câu)** trực tiếp trên trình duyệt máy tính hoặc điện thoại.
- Trả lời 15 câu hỏi trực quan bằng hình ảnh (chọn moodboard, phong cách màu sắc, typography, giọng điệu, cách bố cục).
- Nếu câu nào chưa chắc chắn, bấm chọn **Nhờ AI gợi ý**.
- Nếu đã có logo gốc, bảng màu HEX riêng hay font chữ thương hiệu, mở phần bổ sung bên dưới để điền.
- Toàn bộ dữ liệu được lưu an toàn ngay trên trình duyệt máy của bạn.

### 2. 4 Bộ Preset Layout Đã Khóa Sẵn Chuẩn Thiết Kế

Học viên chọn 1 trong 4 phong cách hiển thị đã được khóa chuẩn thiết kế:

| Bộ Preset | Phong cách & Đặc trưng | Phù hợp với |
| --- | --- | --- |
| **B · Corporate Clean** | Nền sáng, tối giản, thanh lịch, đường nét chỉn chu | Chuyên gia B2B, cố vấn tài chính, luật, doanh nghiệp |
| **C · Editorial Split** | Bố cục chia đôi màn hình 50/50, đậm chất tạp chí cao cấp | Thời trang, phong cách sống, kiến trúc, mỹ phẩm |
| **D · Visual First** | Hình ảnh tràn viền điện ảnh, tương phản mạnh, giàu cảm xúc | Content Creator, Filmmaker, Đạo diễn, Nhiếp ảnh, Designer |
| **E · Modular Grid** | Khung lưới Swiss Style kỷ luật, sắc sảo, cấu trúc khối chặt chẽ | Tech Founder, Khởi nghiệp, Agency, Digital Marketer |

### 3. Hai nút xuất quan trọng: PDF và Markdown (.md)

Sau khi hoàn thành khảo sát và chọn Preset ưng ý, bạn xuất 2 tệp:

1. **In / Lưu PDF 24 slide:** File tài liệu nhận diện thị giác đầy đủ (Bảng màu HEX, Typography, Do/Don't, Moodboard, Bố cục ứng dụng). Dùng để in ấn, xem trực quan, chia sẻ với đối tác, thợ in hoặc designer.
2. **Tải Markdown (.md):** File chữ thuần chứa toàn bộ Brand DNA, thông số HEX chuẩn xác từng mã màu, font chữ và giọng văn. File này dùng để tải thẳng vào **Project ở Bài 5** để Claude đọc chính xác 100%, không bao giờ tự bịa màu sắc.

```text
LỆNH NẠP BRAND GUIDELINE VÀO CLAUDE:
Đọc kỹ file Brand Guideline (.md) tôi vừa tải lên.
Ghi nhớ chính xác:
- Bảng màu HEX chuẩn và tỷ lệ dùng màu.
- Cặp font chữ và phong cách bố cục.
- Giọng điệu thương hiệu (Tone of Voice) và những điều TUYỆT ĐỐI KHÔNG LÀM.
Mọi ấn phẩm, nội dung và trang web tiếp theo đều phải tuân thủ nghiêm ngặt bộ Brand Guideline này.
```

## Bài 5 — Tạo Project: kể một lần, dùng mãi

| Mục tiêu | Thời gian | Bạn có được |
| --- | --- | --- |
| Cất hồ sơ và Brand Guideline vào "ngăn tủ" để Claude nhớ bạn | 5 phút | Một Project, không phải kể lại mỗi lần |

Mỗi cuộc trò chuyện mới, Claude lại quên bạn là ai. **Project** giải quyết chuyện đó: bạn cất Hồ sơ thương hiệu (Bài 3) và file Brand Guideline .md (Bài 4) vào một "ngăn tủ" riêng, và mọi cuộc trò chuyện trong ngăn đó đều tự biết thương hiệu của bạn. Tài khoản miễn phí tạo được tối đa 5 Project ([nguồn](https://support.claude.com/en/articles/9519177)).

**Một Project gồm 2 phần:**

- **Hướng dẫn (Instructions):** lời dặn Claude phải làm việc thế nào, áp dụng cho mọi cuộc trò chuyện trong Project.
- **Tài liệu (Knowledge):** các file bạn tải lên, gồm Hồ sơ thương hiệu (Bài 3), file Brand Guideline .md (Bài 4), bảng giá, ảnh logo.

Hướng dẫn và Tài liệu chỉ cần làm một lần; mọi cuộc trò chuyện mở trong Project đều dùng chung.

**Các bước tạo:**

1. Vào [claude.ai/projects](https://claude.ai/projects), bấm **+ New Project**.
2. Đặt tên, ví dụ "Thương hiệu Bếp Mai".
3. Bấm **Set project instructions**, dán lời dặn bên dưới, bấm **Save instructions**.
4. Ở khu tài liệu bên phải, bấm **+** để tải lên Hồ sơ thương hiệu (từ Bài 3), file Brand Guideline .md (từ Bài 4) và các file liên quan.
5. Từ giờ, mở cuộc trò chuyện **bên trong Project** mỗi khi làm việc cho thương hiệu này.

Trên Claude Desktop, mục Projects thường nằm ở thanh bên (hoặc mở claude.ai/projects). Tên nút có thể hơi khác tùy phiên bản ứng dụng, nhưng luôn có hai chỗ: một chỗ viết lời dặn, một chỗ tải file.

**Lời dặn mẫu cho Project (chép và sửa):**

```text
Bạn là trợ lý thương hiệu của [tên thương hiệu].
- Luôn đọc Hồ sơ thương hiệu và file Brand Guideline trước khi làm bất cứ việc gì.
- Viết bằng tiếng Việt, giọng [ấm áp, gần gũi], xưng "[Mai]", gọi khách là "[chị/mẹ]".
- Tuân thủ đúng bảng màu HEX, font chữ và phong cách trong Brand Guideline.
- Không bịa giá, khuyến mãi, số liệu. Thiếu thông tin thì hỏi tôi.
- Phần nào bạn suy luận (không có nguồn hoặc dữ liệu thật), ghi rõ là (AI suy luận).
- Trả lời ngắn gọn, dùng từ dễ hiểu, không dùng thuật ngữ tiếng Anh nếu không cần.
- Mỗi khi đưa bản nháp, kết thúc bằng 1 câu hỏi xem tôi muốn sửa gì.
```

**Mẹo:** mỗi thương hiệu hoặc mỗi khách hàng lớn một Project riêng. Freelancer làm cho nhiều khách thì đừng trộn chung, kẻo Claude lẫn giọng văn khách này sang khách kia.

## Bài 6 — Làm trang web giới thiệu bằng một câu lệnh

| Mục tiêu | Thời gian | Bạn có được |
| --- | --- | --- |
| Nhờ Claude làm trang web giới thiệu theo đúng Brand Guideline | 12 phút | Một trang web, có link gửi cho khách |

Claude có thể làm một trang web giới thiệu ngay trong khung chat. Trang hiện ra bên cạnh, bạn xem trước, nói sửa chỗ nào thì Claude sửa chỗ đó, xong thì chia sẻ link.

**Chuẩn bị một lần:** vào **Settings → Capabilities**, bật mục **Code execution and file creation** (bản mới gọi là *Create and edit files*). Thiếu mục này, Claude không làm được trang web ([nguồn](https://support.claude.com/en/articles/9547008)).

### Chuẩn bị thông tin bán hàng bổ sung

Brand Guideline ở Bài 4 cung cấp màu sắc, typography và giọng nói. Trước khi gõ lệnh tạo web, bạn chuẩn bị thêm 5 thông tin bán hàng có thật:

- 3 sản phẩm/dịch vụ nổi bật: tên, giá, 1 câu mô tả, ảnh thật.
- 2–3 câu cảm nhận thật của khách (chụp tin nhắn cũng được).
- Số điện thoại, số Zalo, địa chỉ, giờ mở cửa.
- Link Facebook, TikTok, Shopee... (nếu có).
- File logo gốc (PNG nền trong hoặc SVG).

Thiếu mục nào, Claude sẽ để trống và ghi \[CẦN BỔ SUNG\] theo quy tắc bên dưới.

### Quy tắc làm web (dán vào hướng dẫn của Project)

```text
QUY TẮC LÀM WEB CHO THƯƠNG HIỆU

1. THEO BRAND GUIDELINE
- Chỉ dùng màu (mã HEX), font, giọng nói, logo trong file Brand Guideline .md của Project. Không tự đổi.
- Mục nào ghi AI ĐỀ XUẤT, AI_SUGGEST, DRAFT, CHƯA DUYỆT hoặc CHƯA XÁC MINH: hỏi mình trước khi dùng.
- Logo concept (DRAFT) không dùng làm logo chính thức. Chưa có file logo gốc thì ghi tên thương hiệu bằng chữ.
- Font trong Brand Guideline không dùng được trên web hoặc chưa có tên: chọn font Google Fonts gần giống nhất, có hỗ trợ tiếng Việt, và báo mình.
- Cỡ chữ trong Brand Guideline là cỡ cho trang trình chiếu. Web dùng cỡ chữ theo mục 3.

2. TRANG CHỦ NGẮN
- Tối đa 6 phần, theo thứ tự: mở đầu (khẩu hiệu + 1 nút hành động chính), sản phẩm/dịch vụ nổi bật, câu chuyện ngắn, cảm nhận khách, câu hỏi thường gặp (nếu có), liên hệ.
- Mỗi đoạn tối đa 3 câu. Nội dung dài thì để trang riêng hoặc bỏ.
- Nút hành động chính phải thấy ngay màn hình đầu tiên, không cần cuộn.

3. CO DÃN THEO MÀN HÌNH
- Làm cho điện thoại trước, rồi máy tính bảng, máy tính.
- Chữ nội dung tối thiểu 16px. Nút đủ to để bấm bằng ngón tay. Không bắt người xem kéo ngang.
- Chữ và nền phải đủ tương phản để đọc rõ ngoài nắng.

4. TÍNH NĂNG CƠ BẢN PHẢI CÓ
- Menu đầu trang, bấm vào nhảy tới từng phần; trên điện thoại thu gọn thành nút ☰.
- Nút liên hệ nổi cố định ở góc màn hình (Zalo hoặc gọi điện), luôn thấy khi cuộn.
- Phần liên hệ: số điện thoại bấm là gọi được, Zalo, địa chỉ kèm link Google Maps, giờ mở cửa.
- Link mạng xã hội (Facebook, TikTok...).
- Nút quay lên đầu trang.
- Logo nhỏ trên tab trình duyệt, tiêu đề và mô tả trang để Google và khi chia sẻ link hiển thị đúng.

5. KHÔNG LÀM
- Đăng nhập, giỏ hàng, thanh toán online.
- Hiệu ứng chuyển động nặng, nhạc tự phát, cửa sổ bật lên.

6. KHÔNG BỊA
- Giá, cảm nhận khách, số liệu, chứng nhận chưa có thì để ô trống ghi [CẦN BỔ SUNG].
- Ảnh: dùng ảnh mình gửi. Chưa có thì để khung trống, ghi rõ cần ảnh gì. Ảnh nén nhẹ để trang mở nhanh.

7. LÀM XONG TỰ KIỂM TRA
- Xem ở khổ điện thoại và máy tính, bấm thử mọi nút và link.
- Báo mình danh sách chỗ còn [CẦN BỔ SUNG].
```

**Câu lệnh làm trang (gõ trong Project thương hiệu):**

```text
Dựa vào Hồ sơ thương hiệu và file Brand Guideline (.md), làm cho tôi một trang web giới thiệu một trang.
Gồm: phần mở đầu có khẩu hiệu, câu chuyện thương hiệu, 3 sản phẩm nổi bật, cảm nhận khách hàng, nút "Nhắn Zalo đặt hàng" dẫn tới [số Zalo].
Màu sắc, font chữ và giọng văn theo Brand Guideline. Xem đẹp trên điện thoại.
Chỗ nào thiếu thông tin thật (giá, cảm nhận khách) thì để ô trống có ghi chú, không tự bịa.
```

**Câu lệnh sửa (nói như nói với thợ):**

- "Đổi màu nền sang kem nhạt, chữ tiêu đề to hơn."
- "Thay cảm nhận khách bằng 3 câu này: \[dán câu thật của khách\]."
- "Thêm ảnh này vào phần sản phẩm." (kèm file ảnh)
- "Phần giới thiệu dài quá, rút còn 3 câu."

**Chia sẻ:** mở trang, bấm **Share** (bản cũ là **Publish**), sao chép link gửi khách. Trang chỉ mình bạn thấy cho tới khi bạn chia sẻ.

**Lưu ý thật lòng:** link chia sẻ nằm trên tên miền của Claude, phù hợp để thử nghiệm, gửi khách xem mẫu, làm trang sự kiện ngắn hạn. Muốn có web chính thức với tên miền riêng (ví dụ bepmai.vn) thì cần thêm bước đưa lên hosting; bạn có thể nhờ Claude hướng dẫn từng bước hoặc nhờ người làm kỹ thuật.

**Muốn đưa trang web lên mạng bằng GitHub Pages** (làm trong Claude Code), dán lệnh sau:

```text
Cho website này go live bằng GitHub Pages. Kiểm tra máy đã có git và GitHub CLI chưa, thiếu thì cài giúp mình; mình sẽ tự đăng nhập GitHub. Tạo kho lưu trữ tên <tên-github>.github.io, chỉ đẩy các file của trang web lên (không đưa ho-so.md hay brand-guideline.md), rồi bật GitHub Pages. Báo mình đường link khi trang đã chạy.
```

Bạn thay `<tên-github>` bằng tên tài khoản GitHub của mình.

Chưa có tài khoản GitHub? Đăng ký miễn phí tại [github.com/signup](https://github.com/signup); đăng ký và đăng nhập là việc bạn tự làm, không đưa mật khẩu cho Claude. Hướng dẫn chính thức: [GitHub Pages](https://docs.github.com/en/pages). Vì trang web được đặt công khai, đừng để thông tin riêng tư (số CCCD, mật khẩu, hồ sơ nội bộ) trong các file đưa lên.

## Bài 7 — Đóng gói Skill: dạy Claude một lần, dùng mãi

| Mục tiêu | Thời gian | Bạn có được |
| --- | --- | --- |
| Dạy Claude một cách làm để dùng lại | 4 phút (giới thiệu) | Hiểu Skill khác Project thế nào |

Bạn đã có một cách làm hay, ví dụ quy trình làm kịch bản video 30 giây. Thay vì lần nào cũng dán lại từng câu lệnh, bạn **đóng gói nó thành Skill**. Lần sau chỉ cần nói "làm video về bánh mới ra lò", Claude tự biết làm theo đúng quy trình của bạn.

**Project khác Skill thế nào?**

|  | Project (Bài 5) | Skill (Bài 7) |
| --- | --- | --- |
| Chứa gì | Thông tin: bạn là ai, thương hiệu ra sao, Brand Guideline | Cách làm: làm việc X theo các bước nào |
| Hoạt động ở đâu | Chỉ trong Project đó | Mọi cuộc trò chuyện, khi việc cần đến |
| Ví dụ | Hồ sơ thương hiệu Bếp Mai & Brand Guideline | Quy trình viết kịch bản video 30 giây |

**Chuẩn bị:** bật **Code execution and file creation** trong **Settings → Capabilities** (giống Bài 6) ([nguồn](https://support.claude.com/en/articles/12512180)).

**Câu lệnh đóng gói Skill:**

```text
Tôi muốn tạo một skill từ cách làm [viết kịch bản video 30 giây] mà tôi hay làm.
Skill cần: [hỏi tôi chủ đề video, viết câu mở đầu 3 giây, kịch bản dạng bảng, danh sách cảnh quay, phụ đề và caption].
Luôn theo giọng văn thương hiệu của tôi.
Hãy hỏi tôi thêm những gì bạn cần biết, rồi tạo skill để tôi lưu lại.
```

Nếu có mẫu bạn thích (một kịch bản cũ hay, bảng màu thương hiệu), tải lên cùng lúc để Claude học theo.

**Sau đó diễn ra 4 việc** ([nguồn](https://academy.claude.com/tutorials/how-to-create-a-skill-with-claude-through-conversation)):

1. Claude hỏi bạn vài câu: khi nào dùng skill này, thế nào là một kết quả tốt.
2. Claude tạo skill và đưa cho bạn lưu. Lưu vào tài khoản theo hướng dẫn hiện trên màn hình.
3. **Thử:** mở cuộc trò chuyện mới, giao một việc skill này phải làm. Xem kết quả có đúng quy trình không.
4. **Sửa:** chưa đúng thì nói *"Cập nhật skill \[tên\]: \[điều cần sửa\]"*. Lặp lại đến khi ưng ý.

Xem, bật tắt, xóa skill ở mục **Customize → Skills**. Skill không chạy? Thử gọi tên thẳng: *"Dùng skill viết kịch bản video của tôi để..."*

**Những việc nên đóng gói thành Skill:** việc bạn làm đi làm lại hàng tuần và có cách làm riêng, ví dụ trả lời tin nhắn hỏi giá, viết bài giới thiệu sản phẩm mới, làm kịch bản video, soạn báo giá cho khách.

## Bài 8 (Nâng cao) — File .md và câu lệnh JSON: hai định dạng nên biết

| Mục tiêu | Thời gian | Bạn có được |
| --- | --- | --- |
| Hiểu hai đuôi file hay gặp khi dùng AI | Đọc 5 phút, không bắt buộc | Biết khi nào nên nhờ Claude trả kết quả bằng .md hoặc JSON |

Bạn sẽ hay gặp hai chữ: **.md** và **JSON**. Hiểu nhanh: **.md** là kiểu ghi chữ dễ đọc cho người (có tiêu đề, gạch đầu dòng, bảng). **JSON** là kiểu ghi để phần mềm đọc. Người mới chỉ cần nhớ một việc: **muốn lưu lại và dùng lại thì nhờ Claude trả kết quả bằng .md**.

### Markdown (.md) là gì?

Markdown là văn bản thường, thêm vài ký hiệu đơn giản để đánh dấu tiêu đề, chữ đậm, danh sách, bảng. File Markdown có đuôi `.md`.

| Bạn gõ | Hiển thị thành |
| --- | --- |
| `# Hồ sơ thương hiệu` | Tiêu đề lớn |
| `**ít đường**` | Chữ **in đậm** |
| `- Giao tận nhà` | Một dòng gạch đầu dòng |
| `\| Tên \| Giá \|` | Một hàng trong bảng |

**Vì sao nên yêu cầu AI trả kết quả bằng Markdown:**

1. **Mở ở đâu cũng đọc được.** Notepad hay TextEdit đều mở được, không cần Word.
2. **Giữ nguyên tiêu đề, danh sách, bảng** khi bạn chép sang chỗ khác. Chép từ PDF thường bị vỡ.
3. **Dùng lại cho lần sau.** Hồ sơ thương hiệu lưu thành .md thì tải thẳng vào Project (Bài 5). File hướng dẫn của Skill cũng là một file .md.

**Câu lệnh mẫu:**

```text
Tổng hợp Hồ sơ thương hiệu vừa phỏng vấn thành Markdown, có tiêu đề cho từng phần.
Lưu thành file ho-so-thuong-hieu.md để tôi tải về.
```

Khi nào không dùng .md: tài liệu gửi khách hàng hoặc in ấn thì nên xuất ra Word hoặc PDF cho đẹp và quen mắt người nhận.

### JSON là gì?

JSON ghi thông tin thành từng cặp **tên ô : giá trị**, đặt trong dấu ngoặc nhọn. Người đọc hơi khó, nhưng phần mềm đọc rất chính xác. Ví dụ một sản phẩm của Bếp Mai:

```json
{
  "ten_san_pham": "Bánh chuối yến mạch",
  "gia": 45000,
  "don_vi": "hộp 6 cái",
  "con_hang": true
}
```

**Chữ "prompt JSON" có hai nghĩa:**

|  | Nghĩa 1: bảo Claude **trả kết quả** bằng JSON | Nghĩa 2: **viết câu lệnh** bằng JSON |
| --- | --- | --- |
| Là gì | Claude trả dữ liệu đúng khuôn để phần mềm khác dùng | Bạn điền yêu cầu vào từng ô thay vì viết câu |
| Khi nào dùng | Khi đưa kết quả vào web, bảng tính, công cụ tự động | Khi yêu cầu dài, sợ sót ô nào |
| Người mới cần không | Ít khi cần | Không cần. Viết bằng chữ thường là đủ |

Tài liệu của Anthropic gợi ý chia câu lệnh dài thành từng phần bằng thẻ như `<huong_dan>`, `<boi_canh>` ([nguồn](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/use-xml-tags)). Viết bằng JSON giúp bạn không sót ô nào, nhưng không làm Claude thông minh hơn.

**Mẫu 1 — Yêu cầu trả kết quả JSON (dùng nhiều nhất):**

```text
Từ bảng giá tôi gửi, liệt kê tất cả sản phẩm dưới dạng JSON.
Mỗi sản phẩm gồm: ten_san_pham, gia (số, đơn vị đồng), don_vi, mo_ta_ngan (dưới 15 chữ).
Chỉ trả JSON, không thêm lời giải thích. Không tự bịa sản phẩm không có trong bảng giá.
```

**Mẫu 2 — Câu lệnh viết dạng JSON (công thức 4 mảnh của Bài 1):**

```json
{
  "vai_tro": "chuyên gia marketing cho tiệm nhỏ",
  "boi_canh": "tiệm bánh handmade ở Đà Nẵng, khách là mẹ bỉm 25–40 tuổi",
  "nhiem_vu": "viết 5 câu khẩu hiệu",
  "ket_qua": "mỗi câu dưới 10 chữ, giọng ấm áp, kèm 1 dòng giải thích"
}
```

Mẫu 2 và câu lệnh ✅ ở Bài 1 cho kết quả tương đương. Chọn cách nào bạn thấy dễ viết hơn.

### Chọn định dạng nào?

| Bạn cần | Yêu cầu AI trả về |
| --- | --- |
| Đọc, sửa, lưu làm tài liệu, dùng lại cho AI | Markdown (.md) |
| Gửi khách hàng, in ấn | Word hoặc PDF |
| Bảng số liệu để cộng trừ, lọc | Bảng tính (Excel hoặc Google Sheets) |
| Đưa vào phần mềm, website, công cụ tự động hoá | JSON |

## Bài 9 (Nâng cao) — Giữ Claude nhanh và thông minh: các lệnh cần nhớ

| Mục tiêu | Thời gian | Bạn có được |
| --- | --- | --- |
| Dùng đúng vài lệnh để Claude không bị đầy và không trả lời sai | 12 phút | Bộ lệnh cần nhớ khi dùng Claude Code |

Các lệnh trong bài này dùng trong **Claude Code** (khu vực Code trong Claude Desktop, cần gói trả phí, xem Phụ lục). Chưa dùng Claude Code thì có thể bỏ qua bài này.

### 1. Giữ file CLAUDE.md luôn ngắn

CLAUDE.md là file ghi nhớ của dự án. Để file không bị đầy, dán lệnh sau vào Claude Code:

```text
Thêm vào CLAUDE.md quy tắc này: "Mỗi khi thêm gì vào file này, nếu file dài quá 50 dòng thì đề nghị mình rút gọn trước, và chỉ rút gọn khi mình đồng ý."
```

### 2. Chuyển dự án sang AI khác

Khi chuyển dự án sang một công cụ AI khác, nhờ Claude làm thêm file **AGENTS.md** để AI kia hiểu dự án. Nên có thêm một file bàn giao bằng .md.

### 3. Khi context bị đầy

| Lệnh | Làm gì |
| --- | --- |
| `/compact` | Tóm tắt cuộc trò chuyện thành một trang ngắn |
| `/clear` | Làm sạch, bắt đầu việc mới trên bàn sạch |

Nên tách công việc thành nhiều phiên, mỗi phiên một việc.

### 4. Claude trả lời sai: dùng /RE, đừng nhắn thêm

|  | Cách làm | Vì sao |
| --- | --- | --- |
| Sai | Nhắn thêm "Không phải, thử lại đi" | Câu trả lời sai vẫn nằm trong context, tốn token |
| Đúng | Dùng lệnh `/RE` | Quay về tin nhắn trước, xoá phần sai, bắt đầu lại từ chỗ sạch |

Tên đầy đủ của lệnh này trong Claude Code là `/rewind`. Sau khi quay lại, gõ lại yêu cầu theo công thức 4K (mục Tư duy) để lần sau không sai lại.

### 5. Reset thủ công ở mức 60% context

Không chờ đến 95% khi Claude tự nén (kết quả thường tệ hơn). Làm 4 bước:

1. Khi context khoảng 60%, nói Claude tóm tắt những gì đã làm.
2. Copy đoạn tóm tắt đó lại.
3. Dùng lệnh `/clear` để làm sạch context.
4. Dán tóm tắt vào khung chat mới, tiếp tục làm việc.

### 6. Chuyển file sang Markdown

Chuyển tất cả file sang Markdown (.md) sẽ tiết kiệm hơn. Xem Bài 8.

## Thẻ câu lệnh bỏ túi

| Muốn | Nói với Claude |
| --- | --- |
| Giao việc rõ ràng | "Bạn là \[vai trò\]. Tôi là \[bối cảnh\]. Hãy \[việc\]. Kết quả: \[yêu cầu\]." |
| Tìm hiểu thị trường | "Tìm trên web... trình bày thành bảng, ghi nguồn cho từng ý." |
| Để AI hỏi mình | "Phỏng vấn tôi để làm Hồ sơ thương hiệu cá nhân, mỗi lần 1 câu, tối đa 12 câu." |
| Chưa biết trả lời | "Tôi chưa biết, gợi ý cho tôi 3 lựa chọn." |
| Nạp Brand Guideline | "Đọc kỹ file Brand Guideline (.md) tôi vừa tải lên. Ghi nhớ bảng màu HEX, font, tone of voice..." |
| Nhờ phản biện ý tưởng | "Hãy đóng vai người phản biện thẳng thắn. Không khen xã giao. Chỉ ra điểm mù của mình." |
| Sửa kết quả | "Chưa đúng ý. Tôi muốn \[cụ thể\]. Viết lại." (sai nhiều lần: dùng công thức 4K) |
| Ghi rõ chỗ AI đoán | "Phần nào bạn suy luận, hãy ghi rõ là (AI suy luận)." |
| Kiểm tra độ tin cậy | "Ý nào bạn chưa chắc chắn? Đánh dấu giúp tôi." |
| Làm web chuẩn nhận diện | "Dựa vào Hồ sơ thương hiệu và Brand Guideline (.md), làm trang web giới thiệu một trang gồm..." |
| Đóng gói cách làm | "Tôi muốn tạo một skill từ cách làm \[việc\] mà tôi hay làm." |

## Lỗi thường gặp

| Lỗi | Vì sao | Cách sửa |
| --- | --- | --- |
| Hỏi một câu quá ngắn | AI phải đoán, nên trả lời chung chung | Dùng công thức 4 mảnh |
| Tin hết mọi con số AI đưa | AI có thể nhầm hoặc bịa | Mở link nguồn kiểm tra trước khi đăng; bắt AI ghi rõ (AI suy luận) |
| Mỗi lần lại kể lại từ đầu | Không dùng Project | Cất Hồ sơ thương hiệu và Brand Guideline vào Project |
| Giao việc ngay, không để AI hỏi lại | AI thiếu thông tin nên đoán | Để AI phỏng vấn trước (mục Tư duy, Quy tắc 2) |
| AI sai mà chỉ nói "làm lại đi" | AI không biết sai ở đâu | Dùng công thức 4K |
| Một cuộc trò chuyện dài cả tuần | Trò chuyện càng dài, AI càng dễ lẫn và hết lượt nhanh | Mỗi việc mở một cuộc trò chuyện mới trong Project |
| Đăng nguyên văn AI viết | Nghe giống máy, mất giọng riêng | Đọc to lên, sửa bằng lời của mình |

## An toàn thông tin

- **Không dán:** mật khẩu, số thẻ ngân hàng, số căn cước, mã OTP.
- **Thông tin khách hàng:** xóa tên, số điện thoại, địa chỉ trước khi dán vào AI.
- **Hình ảnh, nhạc, logo của người khác:** không sao chép để dùng cho thương hiệu mình.
- **Cam kết với khách** (giá, khuyến mãi, công dụng sản phẩm): bạn tự kiểm tra, AI chỉ soạn hộ.

## Gợi ý lịch cho buổi học 60 phút

| Phút | Nội dung | Học viên làm ra |
| --- | --- | --- |
| 0–8 | Mở đầu, 4 quy tắc tư duy (đọc nhanh), mở Claude Desktop và đăng nhập (cài sẵn trước buổi học) | Tài khoản sẵn sàng, nhớ 4 quy tắc |
| 8–14 | Bài 1 + Bài 2 | Câu lệnh 4 mảnh và một bảng tìm hiểu có nguồn |
| 14–24 | Bài 3: Claude phỏng vấn bạn | Hồ sơ thương hiệu |
| 24–34 | Bài 4: Khảo sát 15 câu | Bộ Brand Guideline 24 slide & File .md |
| 34–39 | Bài 5: Tạo Project | Project "Trợ lý thương hiệu" cất sẵn hồ sơ |
| 39–49 | Bài 6: Làm web | Trang web một trang theo Brand Guideline, có link chia sẻ |
| 49–54 | Bài 7: Đóng gói Skill (giới thiệu) | Biết cách đóng gói Skill dùng lại |
| 54–58 | Bài 9: các lệnh cần nhớ (nếu lớp có dùng Claude Code) | Biết /compact, /clear, /RE và cách reset ở 60% |
| 58–60 | Hỏi đáp, giới thiệu Bài 8 (.md & JSON) và Phụ lục | Máy sẵn sàng cho sáng tạo tự động |

## Phụ lục (Nâng cao) — Để AI tự làm trên máy Windows và Mac: kiểm tra máy, cài công cụ, tạo Skill

| Dành cho ai | Cần gì | Bạn có được |
| --- | --- | --- |
| Người đã quen Claude và muốn Claude tự cắt video, làm phụ đề trên máy | Gói Claude trả phí (từ Pro), cài thêm vài công cụ | Máy sẵn sàng, Skill làm phụ đề, thư mục dự án video |

Phần này dành cho người muốn đi xa hơn: để Claude tự cắt video, tự làm phụ đề ngay trên máy tính của bạn. Khác các bài trước, ở đây Claude chạy lệnh thật trên máy, nên cần dùng **Claude Code**, qua khu vực Code trong Claude Desktop hoặc qua Terminal.

**Trước khi bắt đầu:**

- Claude Code cần gói Pro trở lên; tài khoản miễn phí không dùng được ([nguồn](https://code.claude.com/docs/en/setup)).
- Windows cần bản 10 (1809) trở lên; Mac cần macOS 13 trở lên; RAM từ 4 GB. Cài Claude Code không cần quyền Administrator.
- Luôn đi đúng thứ tự 3 bước: **Kiểm tra (chỉ đọc) → Cài thứ còn thiếu (có duyệt) → Tạo Skill**. Không bao giờ nhảy thẳng vào cài đặt.

**5 công cụ cần có và dùng để làm gì:**

| Công cụ | Dùng để |
| --- | --- |
| Node.js LTS + npm | Chạy các công cụ và ứng dụng nhỏ viết bằng JavaScript |
| Git | Lưu lịch sử thay đổi, quay lại bản cũ khi hỏng |
| FFmpeg + FFprobe | Cắt, ghép, đổi định dạng video; đọc thông tin file |
| whisper.cpp (whisper-cli) | Nghe lời nói trong video và chuyển thành chữ |
| Model ggml-base.bin | "Bộ não" nhận dạng giọng nói đa ngôn ngữ cho whisper.cpp |

Ba bước ngay dưới đây dành cho **Windows**. Dùng máy **Mac** thì kéo xuống mục "Phiên bản cho Mac".

### Bước 1 — Kiểm tra máy (chỉ đọc)

Câu lệnh này không cài, không sửa bất cứ thứ gì. Nó chỉ cho bạn biết máy đang có gì và thiếu gì.

```text
EKK – KIỂM TRA MÁY WINDOWS (CHỈ ĐỌC)

1. MỤC TIÊU
Kiểm tra máy đã có các công cụ sau chưa và có chạy được không:
Node.js LTS + npm, Git, FFmpeg + FFprobe, whisper.cpp (whisper-cli), model Whisper ggml-base.bin.
Tôi không biết lập trình. Bạn tự chạy lệnh, không yêu cầu tôi mở PowerShell/CMD.

2. PHẠM VI – CHỈ ĐỌC
- KHÔNG cài, gỡ, nâng cấp, tải hoặc xoá bất cứ thứ gì.
- KHÔNG sửa PATH, Registry, cấu hình hay file nào.
- KHÔNG chạy lệnh cần quyền Administrator.
- Chỉ dùng lệnh đọc thông tin (version, where, Get-Command, winget list...).
- Nếu WinGet hỏi đồng ý điều khoản, KHÔNG tự đồng ý: dừng phần WinGet và ghi CẦN XÁC MINH.
- Nếu một kiểm tra buộc phải thay đổi máy mới làm được, bỏ qua và ghi CẦN XÁC MINH.

3. THỰC HIỆN
- Ghi lại phiên bản Windows, bản Home hay Pro, kiến trúc CPU (x64/ARM64).
- Kiểm tra WinGet có chạy được không.
- Hyper-V và ảo hoá CPU: chỉ dùng cách không cần Admin (systeminfo, Get-CimInstance Win32_Processor). Không dùng Get-WindowsOptionalFeature.
- Với từng công cụ: tìm trong PATH, trong danh sách phần mềm đã cài (winget list, Apps) và các vị trí thông dụng (Program Files, AppData, WinGet Packages/Links, C:\ffmpeg, %USERPROFILE%\EKK).
- whisper.cpp: tìm cả whisper-cli.exe và tên cũ main.exe.
- Chạy thử lệnh phiên bản (hoặc --help nếu công cụ không có lệnh phiên bản) để xác nhận chạy được thật, không chỉ thấy file.
- Phát hiện cài nhiều bản, PATH xung đột hoặc cài đặt dở dang.
- Model: tìm ggml-base.bin và kích thước file (khoảng 148 MB). File ggml-base.en.bin là bản chỉ tiếng Anh, không tính là PASS. Không tải model để so sánh.

4. PHÂN LOẠI
- PASS: có và chạy được.
- THIẾU: không tìm thấy sau khi kiểm tra đủ các vị trí.
- CẦN XÁC MINH: có dấu vết nhưng lỗi, nhiều bản, hoặc chưa chắc chắn.
Không đoán. Thứ gì chưa kiểm chứng được thì ghi CẦN XÁC MINH và nêu lý do.

5. BÀN GIAO
Bảng tiếng Việt: Công cụ | Phiên bản | Đường dẫn | Trạng thái | Ghi chú
Cuối báo cáo nêu ngắn gọn:
- Thông tin máy: Windows, bản Home/Pro, CPU, WinGet, Hyper-V/ảo hoá.
- Công cụ còn THIẾU.
- Công cụ CẦN XÁC MINH và lý do.
- Kết luận: máy này phù hợp quay "máy sạch" trực tiếp hay nên dùng máy ảo.
```

### Bước 2 — Cài công cụ còn thiếu

Chỉ dùng sau khi có báo cáo Bước 1, trong cùng cuộc trò chuyện. Claude phải hỏi bạn trước mỗi lần cài hoặc tải.

```text
EKK – CÀI CÔNG CỤ CÒN THIẾU (WINDOWS)

1. MỤC TIÊU
Cài các công cụ báo THIẾU trong báo cáo kiểm tra vừa rồi, để máy có đủ:
Node.js LTS + npm, Git, FFmpeg + FFprobe, whisper.cpp (whisper-cli), model ggml-base.bin.
Tôi không biết lập trình. Bạn tự chạy lệnh.

2. PHẠM VI
- Chỉ cài thứ đang THIẾU. Không gỡ, không nâng cấp thứ đã PASS.
- Thứ CẦN XÁC MINH: báo tôi phương án xử lý, chờ tôi chọn.
- Chỉ dùng nguồn chính thức:
  + Node.js, Git, FFmpeg: qua WinGet. Tra đúng ID bằng winget show trước khi cài.
  + whisper.cpp: trang Releases chính thức github.com/ggml-org/whisper.cpp, bản whisper-bin-x64.zip, giải nén vào %USERPROFILE%\EKK\whisper.
  + Model: huggingface.co/ggerganov/whisper.cpp, file ggml-base.bin, lưu vào %USERPROFILE%\EKK\models.
- TRƯỚC MỖI LẦN CÀI HOẶC TẢI: báo tên, nguồn, dung lượng, nơi lưu, rồi chờ tôi gõ "đồng ý".
- Không chạy quyền Administrator nếu tôi chưa đồng ý.
- Chỉ sửa PATH của tài khoản người dùng, không sửa PATH hệ thống. Báo trước khi sửa.
- Máy ARM64: dừng phần whisper.cpp và báo tôi.

3. THỰC HIỆN
Cài lần lượt từng công cụ. Sau mỗi công cụ, chạy lệnh phiên bản để xác nhận ngay.

4. KIỂM TRA CUỐI
- Chạy lại toàn bộ bài kiểm tra chỉ đọc. Mọi công cụ phải PASS.
- Thử thật: dùng FFmpeg tạo một file âm thanh ngắn 3 giây, rồi cho whisper-cli đọc file đó bằng model ggml-base.bin. Lệnh chạy hết không báo lỗi là đạt.

5. BÀN GIAO
- Bảng: Công cụ | Phiên bản | Đường dẫn | Trạng thái.
- Danh sách mọi thay đổi đã làm trên máy (cài gì, lưu ở đâu, PATH thêm dòng nào).
- Cách gỡ từng thứ nếu muốn quay lại như cũ.
```

Vì sao có dòng ARM64: trang phát hành chính thức của whisper.cpp chỉ có bản dựng sẵn cho Windows x64 và Win32 ([nguồn](https://www.sourceforge.net/projects/whisper-cpp.mirror/files/v1.8.2/)). Máy ARM64 cần phương án khác, không nên để AI tự xoay xỡ.

### Bước 3 — Tạo Skill trên Claude Code

Ở Claude Code, mỗi Skill là một thư mục có file `SKILL.md`. Skill cá nhân nằm ở `~/.claude/skills/<tên-skill>/SKILL.md`, dùng được cho mọi dự án. Gọi skill bằng cách gõ `/tên-skill` ở đầu tin nhắn, hoặc Claude tự dùng khi yêu cầu khớp với phần mô tả của skill ([nguồn](https://code.claude.com/docs/en/skills)). Skill bật trong cài đặt Claude trên web (Bài 6) cũng tự có trong Claude Code khi đăng nhập cùng tài khoản ([nguồn](https://support.claude.com/en/articles/12512180)).

Ví dụ dưới đây tạo skill làm phụ đề tiếng Việt, dùng đúng các công cụ vừa cài:

```text
EKK – TẠO SKILL "ekk-phu-de" (TẠO PHỤ ĐỀ TIẾNG VIỆT)

1. MỤC TIÊU
Tạo một skill cá nhân tên ekk-phu-de. Khi tôi gõ /ekk-phu-de kèm đường dẫn video, skill tạo file phụ đề .srt tiếng Việt nằm cạnh video.

2. PHẠM VI
- Lưu skill tại %USERPROFILE%\.claude\skills\ekk-phu-de\SKILL.md.
- Dùng FFmpeg, whisper-cli và model ggml-base.bin đã cài trong %USERPROFILE%\EKK.
- Không sửa, không ghi đè video gốc. File tạm để trong thư mục tạm và xoá sau khi xong.
- Không cài thêm gì. Thiếu công cụ thì báo tôi.

3. THỰC HIỆN
- Viết SKILL.md có phần mô tả (description) nói rõ khi nào dùng skill.
- Các bước trong skill: tách âm thanh từ video (16 kHz, mono) → chạy whisper-cli với tiếng Việt, xuất .srt → đặt tên file .srt trùng tên video → báo đường dẫn.
- Viết hướng dẫn trong skill bằng tiếng Việt dễ hiểu để tôi đọc lại được.

4. KIỂM TRA
- Hỏi tôi một video ngắn 10–20 giây có lời nói tiếng Việt, rồi chạy thử /ekk-phu-de.
- Mở file .srt, kiểm tra có chữ và có mốc thời gian.
- Lỗi thì sửa skill và chạy lại đến khi đạt.

5. BÀN GIAO
- Đường dẫn SKILL.md, cách gọi skill, kết quả chạy thử.
- Ghi rõ chất lượng phụ đề đạt mức nào và chỗ nào cần tôi đọc lại trước khi đăng.
```

### Phiên bản cho Mac

Mac khác Windows ở 3 điểm cần biết trước:

- **Homebrew** là "chợ ứng dụng dòng lệnh" của Mac, dùng để cài Node.js, Git, FFmpeg, whisper.cpp. Cài Homebrew lần đầu phải nhập mật khẩu máy, nên bạn tự dán lệnh và tự gõ mật khẩu; không bao giờ đưa mật khẩu máy cho AI.
- **Git trên Mac là "cái bẫy" nhỏ:** máy chưa có bộ Command Line Tools mà gõ `git --version` thì Mac bật ngay hộp thoại đòi cài. Vì vậy câu lệnh kiểm tra phải xem `xcode-select -p` trước.
- **Chip Apple Silicon hay Intel:** Homebrew có bản dựng sẵn của whisper-cpp cho Apple Silicon (macOS Sonoma trở lên) nhưng với Mac Intel chỉ có cho Sonoma ([nguồn](https://formulae.brew.sh/formula/whisper-cpp)). Mac Intel đời cũ có thể phải tự biên dịch, rất lâu.

**Bước 1 — Kiểm tra máy Mac (chỉ đọc):**

```text
EKK – KIỂM TRA MÁY MAC (CHỈ ĐỌC)

1. MỤC TIÊU
Kiểm tra máy đã có các công cụ sau chưa và có chạy được không:
Homebrew, Node.js LTS + npm, Git, FFmpeg + FFprobe, whisper.cpp (whisper-cli), model Whisper ggml-base.bin.
Tôi không biết lập trình. Bạn tự chạy lệnh, không yêu cầu tôi mở Terminal.

2. PHẠM VI – CHỈ ĐỌC
- KHÔNG cài, gỡ, nâng cấp, tải hoặc xoá bất cứ thứ gì. KHÔNG chạy brew install, brew upgrade, brew update.
- KHÔNG sửa PATH hay file cấu hình (.zshrc, .zprofile).
- KHÔNG dùng sudo, không hỏi và không nhập mật khẩu máy.
- Git: kiểm tra xcode-select -p TRƯỚC. Nếu chưa có Command Line Tools, KHÔNG chạy git --version (lệnh này bật hộp thoại cài đặt); ghi THIẾU.
- Nếu một kiểm tra buộc phải thay đổi máy mới làm được, bỏ qua và ghi CẦN XÁC MINH.

3. THỰC HIỆN
- Ghi lại phiên bản macOS, chip Apple Silicon (arm64) hay Intel (x86_64), dung lượng ổ còn trống.
- Homebrew: có không, nằm ở /opt/homebrew (Apple Silicon) hay /usr/local (Intel), brew --version chạy được không.
- Với từng công cụ: tìm trong PATH (which -a), trong brew list và các vị trí thông dụng (/opt/homebrew/bin, /usr/local/bin, ~/EKK, Applications).
- whisper.cpp: tìm cả whisper-cli và tên cũ whisper-cpp.
- Chạy thử lệnh phiên bản (hoặc --help) để xác nhận chạy được thật, không chỉ thấy file.
- Phát hiện cài nhiều bản (ví dụ Node cài cả qua Homebrew lẫn bộ cài .pkg hoặc nvm), PATH xung đột.
- Model: tìm ggml-base.bin (khoảng 148 MB) trong ~/EKK, thư mục Homebrew và Downloads. ggml-base.en.bin là bản chỉ tiếng Anh, không tính PASS. Không tải model.

4. PHÂN LOẠI
- PASS: có và chạy được.
- THIẾU: không tìm thấy sau khi kiểm tra đủ các vị trí.
- CẦN XÁC MINH: có dấu vết nhưng lỗi, nhiều bản, hoặc chưa chắc chắn.
Không đoán. Thứ gì chưa kiểm chứng được thì ghi CẦN XÁC MINH và nêu lý do.

5. BÀN GIAO
Bảng tiếng Việt: Công cụ | Phiên bản | Đường dẫn | Trạng thái | Ghi chú
Cuối báo cáo nêu ngắn gọn:
- Thông tin máy: macOS, chip, Homebrew, dung lượng trống.
- Công cụ còn THIẾU.
- Công cụ CẦN XÁC MINH và lý do.
- Kết luận: máy này quay "máy sạch" trực tiếp được không, hay nên tạo tài khoản người dùng macOS mới hoặc dùng máy ảo.
```

**Bước 2 — Cài công cụ còn thiếu trên Mac:**

```text
EKK – CÀI CÔNG CỤ CÒN THIẾU (MAC)

1. MỤC TIÊU
Cài các công cụ báo THIẾU trong báo cáo kiểm tra vừa rồi, để máy có đủ:
Node.js LTS + npm, Git, FFmpeg + FFprobe, whisper.cpp (whisper-cli), model ggml-base.bin.
Tôi không biết lập trình. Bạn tự chạy lệnh.

2. PHẠM VI
- Chỉ cài thứ đang THIẾU. Không gỡ, không nâng cấp thứ đã PASS.
- Thứ CẦN XÁC MINH: báo tôi phương án xử lý, chờ tôi chọn.
- Nếu máy CHƯA có Homebrew: không tự cài. Đưa tôi đúng dòng lệnh chính thức từ brew.sh, giải thích ngắn, để tôi tự dán vào Terminal và tự gõ mật khẩu máy. Không bao giờ hỏi hay nhập mật khẩu của tôi.
- Cài qua Homebrew: Node.js (tra phiên bản LTS hiện tại trên nodejs.org rồi chọn đúng gói), git, ffmpeg, whisper-cpp.
- Model: huggingface.co/ggerganov/whisper.cpp, file ggml-base.bin, lưu vào ~/EKK/models.
- TRƯỚC MỖI LẦN CÀI HOẶC TẢI: báo tên, nguồn, dung lượng, nơi lưu, rồi chờ tôi gõ "đồng ý".
- Không dùng sudo. Không chạy brew upgrade cho toàn bộ máy.
- Nếu cần thêm vào PATH: chỉ sửa ~/.zprofile, báo trước dòng sẽ thêm.
- Nếu Homebrew phải tự biên dịch whisper-cpp từ mã nguồn, báo tôi trước vì có thể mất rất lâu.

3. THỰC HIỆN
Cài lần lượt từng công cụ. Sau mỗi công cụ, chạy lệnh phiên bản để xác nhận ngay.

4. KIỂM TRA CUỐI
- Chạy lại toàn bộ bài kiểm tra chỉ đọc. Mọi công cụ phải PASS.
- Thử thật: dùng FFmpeg tạo một file âm thanh ngắn 3 giây, rồi cho whisper-cli đọc file đó bằng model ggml-base.bin. Lệnh chạy hết không báo lỗi là đạt.

5. BÀN GIAO
- Bảng: Công cụ | Phiên bản | Đường dẫn | Trạng thái.
- Danh sách mọi thay đổi đã làm trên máy (cài gì, lưu ở đâu, dòng nào thêm vào ~/.zprofile).
- Cách gỡ từng thứ nếu muốn quay lại như cũ.
```

### Bước 4 — Tạo bộ thư mục cho dự án video (Windows và Mac)

Mỗi video là một dự án riêng, và dự án nào cũng có cùng 6 ngăn. File gọn gàng thì bạn tìm nhanh, còn Claude hiểu ngay file nào dùng vào việc gì.

| Thư mục | Để gì vào |
| --- | --- |
| 01\_Raw | Video gốc vừa quay. Không bao giờ sửa hay ghi đè file ở đây |
| 02\_Broll | Cảnh phụ chèn minh hoạ: cận sản phẩm, không gian tiệm, thao tác tay |
| 03\_Tham-chieu | Video mẫu để học nhịp dựng, phong cách. Chỉ để tham khảo, không cắt ghép vào video của mình |
| 04\_Brand-guideline | Hồ sơ thương hiệu (.md), logo, bảng màu, font |
| 05\_Sound-effect | Nhạc nền, hiệu ứng âm thanh có quyền sử dụng |
| 06\_Final | Video đã xuất, sẵn sàng đăng |

Vì sao đặt tên như vậy: số đứng đầu giữ các ngăn đúng thứ tự quy trình dựng. Tên không dấu, không khoảng trắng giúp FFmpeg và các lệnh trên máy ít bị lỗi đường dẫn.

**Câu lệnh tạo thư mục (dùng trong Claude Code):**

```text
EKK – TẠO THƯ MỤC DỰ ÁN VIDEO

1. MỤC TIÊU
Tạo bộ thư mục chuẩn cho dự án video tên [ten-du-an],
nằm trong [Documents/EKK-Projects] của tài khoản máy tính này.

2. PHẠM VI
- Chỉ tạo thư mục mới và file CLAUDE.md. Không di chuyển, đổi tên, xoá file có sẵn.
- Nếu thư mục dự án đã tồn tại: dừng, báo tôi, không ghi đè.
- Tên thư mục giữ đúng như dưới đây: không dấu, không khoảng trắng.

3. THỰC HIỆN
Tạo đúng 6 thư mục:
01_Raw — video gốc vừa quay
02_Broll — cảnh phụ chèn minh hoạ
03_Tham-chieu — video mẫu để học phong cách
04_Brand-guideline — hồ sơ thương hiệu, logo, màu, font
05_Sound-effect — nhạc nền, hiệu ứng âm thanh
06_Final — video đã xuất
Tạo CLAUDE.md ở thư mục gốc dự án, ghi ngắn gọn (dưới 30 dòng):
- Mỗi thư mục dùng để chứa gì.
- Không bao giờ sửa, ghi đè hoặc xoá file trong 01_Raw.
- Video xuất ra chỉ lưu trong 06_Final; file tạm không để lẫn vào các thư mục trên.
- 03_Tham-chieu chỉ để học phong cách, không cắt ghép vào video thành phẩm.
- Luôn đọc 04_Brand-guideline trước khi làm chữ, màu, phụ đề.

4. KIỂM TRA
Liệt kê lại cây thư mục vừa tạo, xác nhận đủ 6 thư mục và CLAUDE.md.

5. BÀN GIAO
Đường dẫn thư mục dự án, cây thư mục, nội dung CLAUDE.md.
```

Thay `[ten-du-an]` bằng tên không dấu, ví dụ banh-chuoi-yen-mach. Câu lệnh dùng được cho cả Windows và Mac.

Vì sao tạo thêm CLAUDE.md: Claude Code tự đọc file này mỗi khi bạn mở dự án (xem Ebook 1), nên quy tắc "không đụng vào 01\_Raw" luôn được nhớ, không cần dặn lại.

Sau khi có thư mục: mở Claude Code ngay trong thư mục dự án đó rồi giao việc, ví dụ "Làm phụ đề cho video trong 01\_Raw, lưu file .srt vào 06\_Final."

**Công thức chung để viết câu lệnh giao việc cho máy:** mọi câu lệnh trong phụ lục này đều có 5 phần — Mục tiêu, Phạm vi (được làm và không được làm), Thực hiện, Kiểm tra, Bàn giao. Phần Phạm vi là quan trọng nhất: nó là hàng rào giữ máy của bạn an toàn.

## Liên kết cần dùng

| Việc | Link | Dùng ở |
| --- | --- | --- |
| Tải Claude Desktop | [claude.com/download](https://claude.com/download) | Cài Claude Desktop |
| Dùng Claude trên web | [claude.ai](https://claude.ai) | Toàn bộ ebook |
| Tạo Project | [claude.ai/projects](https://claude.ai/projects) | Bài 4 |
| Tạo tài khoản GitHub | [github.com/signup](https://github.com/signup) | Bài 5 |
| Hướng dẫn GitHub Pages | [docs.github.com/en/pages](https://docs.github.com/en/pages) | Bài 5 |
| GitHub CLI (công cụ đăng nhập GitHub trên máy) | [cli.github.com](https://cli.github.com) | Bài 5 (Claude Code) |
| Cài Claude Code | [code.claude.com/docs/en/setup](https://code.claude.com/docs/en/setup) | Bài 8, Phụ lục |
| Git | [git-scm.com](https://git-scm.com) | Phụ lục |
| Node.js | [nodejs.org](https://nodejs.org) | Phụ lục |
| FFmpeg | [ffmpeg.org](https://ffmpeg.org) | Phụ lục |
| whisper.cpp (nhận dạng giọng nói) | [github.com/ggml-org/whisper.cpp](https://github.com/ggml-org/whisper.cpp) | Phụ lục |
| Model Whisper (ggml-base.bin) | [huggingface.co/ggerganov/whisper.cpp](https://huggingface.co/ggerganov/whisper.cpp) | Phụ lục |
| Homebrew (cài công cụ trên Mac) | [brew.sh](https://brew.sh) | Phụ lục (Mac) |

Chỉ tải từ đúng các trang trên. Tải từ trang lạ có thể dính phần mềm độc.

## Nguồn

- [How can I create and manage projects? — Claude Help Center](https://support.claude.com/en/articles/9519177)
- [Enable and use web search — Claude Help Center](https://support.claude.com/en/articles/10684626)
- [Publish and share artifacts — Claude Help Center](https://support.claude.com/en/articles/9547008)
- [Use skills in Claude — Claude Help Center](https://support.claude.com/en/articles/12512180)
- [How to create a skill with Claude through conversation — Claude Academy](https://academy.claude.com/tutorials/how-to-create-a-skill-with-claude-through-conversation)
- [Set up Claude Code — Claude Code Docs](https://code.claude.com/docs/en/setup)
- [Extend Claude with skills — Claude Code Docs](https://code.claude.com/docs/en/skills)
- [whisper.cpp v1.8.2 release files (bản sao) — SourceForge](https://www.sourceforge.net/projects/whisper-cpp.mirror/files/v1.8.2/)
- [PDF support — Claude Platform Docs](https://platform.claude.com/docs/en/build-with-claude/pdf-support)
- [Use XML tags to structure your prompts — Claude Platform Docs](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/use-xml-tags)
- [whisper-cpp — Homebrew Formulae](https://formulae.brew.sh/formula/whisper-cpp)
- [Install Claude Desktop — Claude Help Center](https://support.claude.com/en/articles/10065433-install-claude-desktop)
- [Claude download page — Anthropic](https://claude.com/download)
