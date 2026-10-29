# Hồ sơ CLB và portfolio tài trợ một trang

Ngày: 29/10/2026.
Trạng thái: người dùng đã duyệt phạm vi hồ sơ tài trợ đầy đủ và cấu trúc “năng lực trước, tài trợ sau”; bản đặc tả này chờ duyệt trước kế hoạch triển khai.

## 1. Mục đích và đầu ra

Nhà tài trợ mở một đường dẫn, hiểu Robotics Sóc Sơn là ai, đã làm gì, cần gì và cách đồng hành mà không phải chuyển qua nhiều trang. Trang là hồ sơ đọc tĩnh, không phải trải nghiệm trình diễn có animation.

Ba đầu ra bắt buộc:

1. `docs/ho-so-clb.md`: một file Markdown tổng hợp thông tin CLB từ các nguồn trong repo, có nguồn và phân loại độ chắc chắn. Đây là tài liệu nội bộ, không tự động đưa toàn bộ ra web.
2. Bảng thiếu/mâu thuẫn nằm trong cùng file, kèm bản tóm tắt gửi người dùng: thiếu gì, ảnh hưởng gì, cần xác nhận/bằng chứng nào, mức ưu tiên trước công khai.
3. Route `/profile`: hồ sơ CLB và tài trợ đầy đủ, cuộn liên tục, nội dung công khai song ngữ VI/EN, không animation. Không thay trang chủ hay `/fundraising`.

## 2. Phạm vi được duyệt

Thứ tự nội dung trang:

1. Tổng quan CLB: tên, trường, địa bàn, lĩnh vực, ảnh đội và giới thiệu ngắn.
2. Hành trình: các mốc lịch sử, thế hệ, mùa thi đấu có căn cứ.
3. Con người: cơ cấu ban, nhân sự, mentor đúng nhiệm kỳ đã xác nhận.
4. Robot và dự án: bài toán, sản phẩm, phần việc đội thực hiện, kết quả, ảnh thật.
5. Thành tích: năm, giải, mã đội theo mùa, thứ hạng và bằng chứng.
6. Giáo dục và cộng đồng: khóa học, workshop, outreach; tách đã thực hiện, đang thực hiện, dự kiến.
7. Mùa 2026–2027: mục tiêu và kế hoạch hiện tại; không gọi kế hoạch là kết quả.
8. Ngân sách: chi tiết hạng mục, số lượng, thành tiền, dự phòng, tổng, mốc mua sắm; tiền đã nhận chỉ xuất hiện khi có số đối soát.
9. Đồng hành: các gói, quyền lợi, hiện vật, chuyên môn và cách trao đổi hợp tác.
10. Minh bạch và liên hệ: cơ chế tiếp nhận, báo cáo, đầu mối và thanh toán có căn cứ.

Nội dung cốt lõi của từng mục phải đọc ngay tại trang. Link nguồn/bằng chứng được phép mở ngoài; không bắt người đọc đi nơi khác để xem ngân sách hoặc quyền lợi. Không lấy danh sách prospect hay quy trình CRM nội bộ làm nội dung công khai.

## 3. Quy tắc tổng hợp thông tin

### 3.1. Phạm vi nguồn

Đọc các nguồn liên quan trong `docs/`, bộ `docs/campaign-2026-2027/`, tài liệu cũ, dữ liệu `src/data/`, thông tin liên hệ/cấu hình hiện hành và ảnh dưới `public/`. Tài liệu nghiên cứu là chỉ dẫn đến bằng chứng, không tự thân chứng minh mọi câu trong tài liệu.

Mỗi nhóm thông tin trong Markdown phải có:

- Nội dung và mùa/nhiệm kỳ hoặc ngày cập nhật nếu nguồn có.
- Nguồn file và liên kết bằng chứng ngoài nếu có.
- Trạng thái: xác nhận bằng chứng / có trong nguồn nội bộ nhưng cần xác nhận / kế hoạch / mâu thuẫn.
- Phạm vi sử dụng: công khai hoặc chỉ nội bộ.

Không suy ra năm thành lập từ giải đầu tiên; không suy ra nhân sự hiện tại từ danh sách cũ; không suy ra nguyên nhân hỏng robot từ điểm thi đấu liên minh. Không dùng số liệu toàn FIRST như kết quả giáo dục của riêng CLB.

### 3.2. Cấu trúc Markdown

Thông tin định danh; lịch sử; sứ mệnh và giá trị; tổ chức và nhân sự; năng lực và robot/dự án; thành tích; giáo dục và cộng đồng; đối tác thực tế; mùa 2026–2027; ngân sách; hình thức tài trợ; minh bạch và tiếp nhận; liên hệ/kênh truyền thông; danh mục ảnh/bằng chứng; bảng thiếu/mâu thuẫn; nguồn.

Không chép nguyên toàn bộ tài liệu chiến dịch. Hợp nhất thông tin trùng, giữ khác biệt theo mùa và ghi rõ những điểm chưa thể hợp nhất. Số điện thoại cá nhân và ghi chú nội bộ không cần thiết không đưa vào bản công khai.

### 3.3. Những điểm đã phát hiện cần đối chiếu

- `src/data/about.ts` ghi thành lập năm 2023; tài liệu chiến dịch mô tả “gần 5 năm”. Không chốt tuổi CLB trước khi giải quyết.
- `src/data/about.ts` và `src/data/team.ts` chứa 13 tên; nhiều dữ liệu gắn lớp/mùa 2025–2026. Không mặc định đây là nhân sự hiện tại.
- `14-phan-cong-nhan-su.md` ghi rõ Trần Tuệ Minh đang được tạm điền nhiều vị trí. Không xuất bản các vai trò này như sự thật.
- `03-thanh-tich-chuan-hoa.md` yêu cầu bổ sung giấy khen Motions In Fire. Phân biệt bằng chứng cho sự kiện và bằng chứng cho kết quả của đội.
- Tài liệu định vị mô tả Maker Day tiếp cận hàng trăm học sinh trong khi tài liệu vận hành là kế hoạch. Không công bố số người hưởng lợi chưa có báo cáo.
- `src/data/fundraising.ts` phục vụ mùa 2025–2026 với danh mục khác. Không tái sử dụng ngân sách cũ cho hồ sơ 2026–2027.
- Bộ chiến dịch ghi 30.975.000 đồng phần cứng + 3.000.000 đồng dự phòng = 33.975.000 đồng; 8 dòng mua sắm tương ứng 11 đơn vị/món. Phải phân biệt số dòng và số lượng, tính lại từ dòng chi tiết.
- Thông tin tài khoản trong tài liệu và cấu hình web chưa đồng nhất; không tự coi ảnh QR sẵn có là QR hợp lệ cho chiến dịch mới.
- Các cam kết bảo trợ, người ký, quyền lợi và quy trình chứng từ cần phân biệt đề xuất với thủ tục đã được trường chấp thuận.

Bảng thiếu phải còn mở để bổ sung phát hiện khi đọc toàn bộ nguồn; các mục trên không được coi là danh sách thiếu hoàn chỉnh.

## 4. Thiết kế trang

Giữ hệ nhận diện hiện tại: nền trắng, dải nền lạnh nhẹ, chữ đậm rõ, đường phân cách màu thép, xanh `#2563eb` cho liên kết/hành động. Inter, ảnh CLB thật; chân dung dùng bộ nền đen hiện hành. Không tạo hình minh họa thay cho bằng chứng.

Đầu trang có tên hồ sơ, giới thiệu ngắn, ảnh đội và mục lục. Desktop dùng mục lục bên cạnh nội dung khi đủ rộng; mobile dùng mục lục liên kết xuống các phần, không che nội dung. Bấm mục lục nhảy trực tiếp, không smooth scroll. Tiêu đề dùng anchor ổn định, đúng cấp heading.

Nội dung trình bày dạng hồ sơ biên tập: đoạn giới thiệu ngắn, ảnh có chú thích, bảng số liệu dễ tra, danh sách nhân sự nhìn thấy cùng lúc. Không biến mỗi đoạn thành card, không carousel, không tab/accordion giấu phần quan trọng. Không video tự chạy. Bảng dài được cuộn ngang trong vùng riêng có nhãn trên mobile, không làm tràn cả trang.

Không animation CSS, Framer Motion, reveal khi cuộn, parallax, marquee, bộ đếm chạy số hay transition di chuyển/phai trên route này. Trạng thái hover/focus thay đổi tức thời. Giữ focus ring, liên kết có tên rõ và vùng chạm tối thiểu 44px cho điều khiển chính.

Hỗ trợ in bằng CSS để nội dung đang xem có thể lưu PDF qua trình duyệt, không xây hệ xuất PDF riêng. Bản in bỏ mục lục cố định và điều khiển, giữ nội dung/bảng/chú thích; không cắt mất phần do chiều cao cố định.

## 5. Kiến trúc và dữ liệu

Dùng Next.js App Router hiện tại. `src/app/profile/page.tsx` cung cấp metadata và route; thành phần đọc hồ sơ chịu trách nhiệm chọn locale theo `LanguageContext`, dùng convention dịch hiện hành. Dữ liệu công khai tập trung trong `src/data/`, không hardcode bản sao trong UI primitives. Chỉ thêm thành phần/file khi cần, không framework render hồ sơ tổng quát, CMS hay dependency mới.

Markdown là bản biên tập đầy đủ, có ghi chú nội bộ; dữ liệu web là bản công khai được chọn lọc có chủ đích. Không render Markdown nội bộ trực tiếp và không đưa nguồn nội bộ/ghi chú vào client bundle. Những thông tin đã tồn tại, đúng mùa và đủ căn cứ được tái sử dụng; không sửa dữ liệu cũ chỉ để phục vụ route mới.

Ngân sách công khai dùng từng dòng của mùa 2026–2027; tổng và số lượng tính từ dòng, dự phòng tách riêng. Không đặt số đã nhận bằng 0 khi chưa có sổ đối soát. Hiển thị trạng thái chưa công bố khi chưa có số liệu, không dựng thanh tiến độ giả.

Metadata, canonical, locale metadata và sitemap phải nhận `/profile`; tránh hook metadata toàn cục ghi đè bằng metadata trang chủ. Đường dẫn trực tiếp phải hoạt động khi tải lại và chia sẻ.

## 6. Tích hợp lớp bao ngoài, tải tài nguyên và lỗi

`AppShell` hiện bọc mọi route bằng `BootLoader`/`BootAwareMain`; root có script chặn hiển thị và smooth scroll. Yêu cầu không animation phải được áp dụng theo route cả ở lớp bao ngoài, không chỉ JSX của hồ sơ.

Giữ quyết định hiện có về chờ ảnh/tài nguyên cần thiết trước khi hiển thị, nhưng `/profile` dùng trạng thái tải tĩnh và chuyển sang nội dung tức thời, không intro hay reveal. Không dùng thời gian chờ giả. Tài nguyên lỗi phải kết thúc trạng thái chờ; không khiến hồ sơ bị che mãi. Các route khác giữ nguyên hành vi. Khi rời `/profile`, không để quy tắc tắt chuyển động/scroll tồn dư sang trang khác.

Ảnh phải có kích thước/tỷ lệ rõ và `sizes` phù hợp. Không dùng ảnh placeholder như ảnh bằng chứng; thiếu ảnh thì dùng nội dung chữ thật và ghi nhu cầu bổ sung ở Markdown. Nội dung thông tin thiếu được diễn đạt trung thực, không số giả hay câu hứa đã hoàn thành.

Thanh toán chỉ hiển thị khi thông tin có căn cứ xác nhận và QR khớp tài khoản. Nếu còn mâu thuẫn, mục tiếp nhận vẫn có hướng dẫn liên hệ qua kênh công khai đã kiểm tra và nêu cần xác nhận thông tin thanh toán trực tiếp; báo rõ đây là điều kiện còn thiếu, không tuyên bố phần thanh toán hoàn tất.

## 7. Giới hạn phạm vi

Không sửa nội dung/thiết kế trang chủ hoặc `/fundraising`, không thêm DB/CMS, không tích hợp ngân hàng hay tự đồng bộ sao kê, không xuất bản CRM, không xây form mới. Không khẳng định sổ cái `/support` đang tồn tại chỉ vì tài liệu kế hoạch nhắc đến. Chỉ link chức năng/đường dẫn thực tế đã kiểm tra.

Các quy định sản phẩm cũ loại bỏ ngôn ngữ tài trợ khỏi trang hiện hành không được dùng để bỏ yêu cầu mới: `/profile` là ngoại lệ có chủ đích cho hồ sơ nhà tài trợ; không mở rộng ngoại lệ sang các route khác.

## 8. Nghiệm thu

### Tài liệu

- Một file `docs/ho-so-clb.md` bao phủ đầy đủ nhóm thông tin nêu trên, có nguồn và bảng thiếu/mâu thuẫn.
- Không biến kế hoạch, tên tạm, số liệu cũ hay suy diễn thành dữ kiện hiện tại.
- Tính đúng tổng ngân sách, số dòng, số đơn vị và mốc giải ngân.
- Mọi thông tin thiếu có yêu cầu bổ sung cụ thể, không dùng TODO mơ hồ.

### Trang thực tế

- `/profile` tải trực tiếp và qua điều hướng, xem toàn bộ nội dung trên một trang.
- VI/EN cùng cấu trúc và số liệu; không thay ngôn ngữ bằng chuyển sang nhiều trang.
- Không animation ở nội dung, lớp tải, header hoặc scroll; xác minh cả tải cứng, đi vào và rời route.
- Kiểm tra desktop 1440px, mobile 390px và viewport thực tế nếu khác: không tràn ngang toàn trang, bảng đọc được, hình không méo, không chữ bị che.
- Mục lục, điều khiển ngôn ngữ, liên hệ, link nguồn và thanh toán đủ điều kiện hoạt động; bàn phím có focus rõ.
- Kiểm tra ảnh lỗi/chậm không làm kẹt tải; không hiển thị số tiền hoặc QR giả.
- Kiểm tra bản in, metadata chia sẻ và không rò rỉ ghi chú nội bộ.
- Chạy `npm run lint`, `npm run build`, `npm run check:assets`; kiểm tra logo riêng vì script hiện chỉ quét `/Images/`.
- Giữ một kiểm tra chạy được cho logic không tầm thường được thêm vào; không thêm test sao chép nội dung/wiring.
- Báo cáo chỉ những kiểm chứng đã chạy; nêu rõ mọi dữ liệu CLB phải bổ sung trước khi gửi nhà tài trợ.

## 9. Bước tiếp theo

Người dùng duyệt đặc tả này trước khi tạo kế hoạch triển khai. Sau đó thực hiện theo thứ tự: tổng hợp nguồn thành Markdown, báo danh sách thiếu, xây dữ liệu công khai và route, kiểm tra thực tế. Nếu dữ liệu thực tế không đủ cho một cam kết công khai, hoàn thiện phần có căn cứ và trình bày chính xác phần còn thiếu, không tự điền.
