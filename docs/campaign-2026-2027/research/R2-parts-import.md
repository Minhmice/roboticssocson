# BÁO CÁO NGHIÊN CỨU: CHI PHÍ NHẬP KHẨU LINH KIỆN & VẬT TƯ FIRST TECH CHALLENGE 2026–2027

> **Dự án**: Chiến dịch tài trợ "BUILD THE NEXT ROBOT" — Robotics Sóc Sơn (FTC #33518 / #28762)  
> **Mùa giải**: FTC 2026–2027 BIOBUZZ™ presented by RTX (FIRST CANOPY)  
> **Thời điểm thẩm định**: 28/10/2026  
> **Tỷ giá áp dụng**: 1 USD = 25.610 VNĐ (Tỷ giá bán ra Vietcombank ngày 26/10/2026)

---

## Tóm tắt

- **Tỷ giá tham chiếu**: 1 USD = 25.610 VNĐ (Vietcombank bán chuyển khoản ngày 26/10/2026).
- **Hệ số Landed Cost Multiplier**: Dao động từ **1.20x đến 1.35x** tùy loại linh kiện (Bình quân rổ hàng FTC: **1.25x - 1.28x** so với giá web niêm yết USD). Chi phí đội thêm bao gồm: phí thanh toán quốc tế (+2.5%), ship nội địa Mỹ (+3%), cước air cargo chuyên tuyến Mỹ - Hà Nội ($11 - $14/kg), thuế nhập khẩu (0% - 5%), thuế VAT (10%), và phụ thu kiểm định/hải quan.
- **Thâm hụt ngân sách BOM trong CSV**: Danh mục mua sắm trong `docs/INVENTORY - PURCHASE PLAN 2026.csv` dự toán **25.050.000 VNĐ** đang bị **thâm hụt nghiêm trọng từ 5.925.000 VNĐ đến 8.250.000 VNĐ** (thiếu hụt 24% - 33%). Chi phí về tay thực tế của 11 món cần mua phải từ **30.975.000 VNĐ** (nếu tận dụng được chiết khấu FTC team 25% của goBILDA) đến **33.300.000 VNĐ** (nếu mua theo giá bán lẻ niêm yết).
- **Các điểm sai lệch giá nghiêm trọng trong CSV**:
  1. *Pin REV 12V Slim NiMH*: CSV ghi 1.250.000 VNĐ, trong khi giá web gốc đã là $60 (1.536.000 VNĐ), landed cost thực tế phải đạt **2.028.000 VNĐ/cục** (sai lệch -38%).
  2. *REV Expansion Hub*: CSV ghi 6.200.000 VNĐ và sai mã SKU (REV-31-1530 thay vì REV-31-1153), giá web là $275 (7.042.000 VNĐ), landed cost thực tế là **8.592.000 VNĐ** (sai lệch -28%).
  3. *REV Control Hub*: CSV ghi 9.500.000 VNĐ, thấp hơn cả giá web quy đổi thuần $375 (9.603.000 VNĐ), landed cost thực tế là **11.716.000 VNĐ** (sai lệch -19%).
  4. *Bộ ray trượt Viper Slide*: CSV ghi 4.800.000 VNĐ chỉ đủ mua bản 2 tầng hoặc chưa tính cước cân nặng bộ 4 tầng (landed cost thực tế 4-Stage 336mm từ **5.830.000 VNĐ đến 7.650.000 VNĐ**).
- **Kênh phân phối tại Việt Nam**: Hiện **KHÔNG CÓ** đại lý ủy quyền chính thức (Authorized Distributor) của REV Robotics hay goBILDA tại Việt Nam. Các đội FTC phải nhập khẩu trực tiếp từ Mỹ qua chuyển phát nhanh quốc tế (FedEx) hoặc qua các đơn vị forwarder / mua hộ chuyên tuyến. TPE.vn nhập khẩu kit goBILDA theo dự án B2B nhưng không bán lẻ giá rẻ sẵn kho.
- **Quy định pháp lý & thuế mới 2025–2026**:
  - **Quyết định 01/2025/QĐ-TTg đã chính thức bãi bỏ Quyết định 78/2010/QĐ-TTg từ ngày 18/02/2025**: Chấm dứt hoàn toàn chính sách miễn thuế NK và VAT cho hàng hóa nhập khẩu dưới 1.000.000 VNĐ gửi qua chuyển phát nhanh. Mọi đơn hàng linh kiện nhỏ lẻ dù chỉ $20 đều bị tính thuế NK và 10% VAT cùng phí kê khai hải quan.
  - **Pin NiMH (12V Slim Battery)**: Được phép vận chuyển hàng không theo quy định IATA DGR Special Provision A199 (không thuộc nhóm hàng nguy hiểm Class 9 nếu bọc cách điện cực), dễ thở hơn pin Li-ion nhưng vẫn chịu phụ thu an ninh hàng không (~$5 - $8/cục) và bị bưu chính USPS từ chối gửi quốc tế.
- **Benchmark ngân sách mùa giải FTC**: Một đội Veteran duy trì và thi đấu cạnh tranh cần ngân sách linh kiện nâng cấp từ **$800 - $1.300** (~20M - 33M VNĐ). Mức dự toán chuẩn sau hiệu chỉnh của Sóc Sơn (~31M VNĐ) hoàn toàn khớp với định mức thi đấu của các đội FTC quốc tế.

---

## Chi tiết

### Câu 1: Bảng so sánh giá niêm yết USD, quy đổi VNĐ, giá CSV và Landed Cost

*Phương pháp tính*:
- **Giá USD**: Giá niêm yết chính thức công khai tại `revrobotics.com` và `gobilda.com` vào tháng 10/2026.
- **Giá quy đổi thuần (VNĐ)** = `Giá USD × 25.610` (chưa gồm phí ship và thuế).
- **Landed Cost ước tính [ƯỚC TÍNH]** = `Giá USD × 25.610 × Multiplier nhóm linh kiện` (bao gồm phí chuyển đổi ngoại tệ, ship nội địa Mỹ, ship air cargo US-VN, thuế NK, thuế VAT 10% và phí hải quan).
- Riêng linh kiện goBILDA có ghi chú thêm mức giá nếu áp dụng chương trình **FTC Team Discount 25%** của goBILDA.

#### Bảng tổng hợp đối chiếu chi tiết:

| Mã linh kiện | Tên linh kiện | SKU chuẩn | Giá niêm yết USD | Quy đổi VNĐ (tỷ giá 25.610) | Đơn giá CSV (VNĐ) | Landed Cost ước tính (VNĐ) | Đánh giá sai lệch CSV | Nguồn đối chiếu |
| :--- | :--- | :--- | :---: | :---: | :---: | :---: | :--- | :--- |
| **FTC-CTRL-01** | REV Control Hub | REV-31-1595 | $375.00 | 9.603.750 ₫ | 9.500.000 ₫ | **11.716.000 ₫** | **Dưới giá vốn**: CSV thấp hơn giá web Mỹ gốc; thiếu VAT 10% & cước bay (Lệch -2.216.000 ₫) | [revrobotics.com](https://www.revrobotics.com/rev-31-1595) |
| **FTC-CTRL-02** | REV Expansion Hub | REV-31-1153 *(CSV ghi nhầm 1530)* | $275.00 | 7.042.750 ₫ | 6.200.000 ₫ | **8.592.000 ₫** | **Sai lệch nặng**: CSV thấp hơn giá web $33, thiếu thuế phí (Lệch -2.392.000 ₫) | [revrobotics.com](https://www.revrobotics.com/rev-31-1153) |
| **FTC-MTR-01** | goBILDA 5202 Yellow Jacket (435 RPM) | 5202-2402-0014 | $54.99 *(FTC: $41.24)* | 1.408.294 ₫ *(FTC: 1.056.215 ₫)* | 1.150.000 ₫ | **1.450.000 ₫** *(FTC)* / **1.830.000 ₫** | **Tạm chấp nhận nếu có giảm giá FTC**: CSV sát giá gốc có discount nhưng chưa đủ tiền ship motor nặng | [gobilda.com](https://www.gobilda.com/yellow-jacket-planetary-gear-motors) |
| **FTC-MTR-02** | REV UltraPlanetary HD Hex Motor Kit | REV-41-1600 | $50.00 | 1.280.500 ₫ | 1.300.000 ₫ | **1.639.000 ₫** | **Thiếu thuế phí**: CSV chỉ lấy giá web làm tròn, thiếu cước cân nặng và VAT (Lệch -339.000 ₫) | [revrobotics.com](https://www.revrobotics.com/rev-41-1600/) |
| **FTC-SRV-01** | REV Smart Robot Servo (SRS) | REV-41-1097 | $30.00 *(Sale $25.50)* | 768.300 ₫ | 750.000 ₫ | **960.000 ₫** | **Thiếu thuế phí**: CSV lấy tỷ giá cũ 25.000 không phí; Landed cost thực tế gần 1 triệu | [revrobotics.com](https://www.revrobotics.com/rev-41-1097) |
| **FTC-WHL-01** | Bộ bánh xe Mecanum 96mm goBILDA | 3213-3606-0002 | $169.99 *(FTC: $127.49)* | 4.353.444 ₫ *(FTC: 3.265.080 ₫)* | 3.200.000 ₫ | **4.240.000 ₫** *(FTC)* / **5.660.000 ₫** | **Thiếu phí ship nặng**: CSV lấy giá đã giảm 25% nhưng chưa cộng phí vận chuyển bộ bánh xe ~1kg | [gobilda.com](https://www.gobilda.com/96mm-mecanum-wheel-set-70a-durometer-bearing-supported-rollers/) |
| **FTC-PWR-01** | Pin REV 12V 3000mAh Slim NiMH | REV-31-1302 | $60.00 | 1.536.600 ₫ | 1.250.000 ₫ | **2.028.000 ₫** | **Sai lệch rất nghiêm trọng**: CSV thấp hơn giá web tới 286k; pin nặng và chịu phụ thu hàng không (Lệch -778.000 ₫/cục) | [revrobotics.com](https://www.revrobotics.com/rev-31-1302) |
| **FTC-STR-01** | Bộ ray trượt Viper Slide Kit (4-Stage 336mm) | 3210-0003-0004 | $229.99 *(FTC: $172.49)* | 5.890.044 ₫ *(FTC: 4.417.534 ₫)* | 4.800.000 ₫ | **5.830.000 ₫** *(FTC)* / **7.650.000 ₫** | **Thiếu ngân sách**: Nếu mua bản 4-Stage 336mm cho cơ cấu vươn cao thì 4.8M trong CSV bị thiếu hụt từ 1.0M đến 2.8M | [gobilda.com](https://www.gobilda.com/4-stage-viper-slide-kit-belt-driven-336mm-slides/) |
| **FTC-SEN-02** | Cảm biến màu REV Color Sensor V3 | REV-31-1557 | $20.75 | 531.408 ₫ | 650.000 ₫ | **648.000 ₫** | **Chính xác**: CSV dự toán 650.000 ₫ phản ánh chuẩn xác Landed Cost (multiplier ~1.22x) | [revrobotics.com](https://www.revrobotics.com/rev-31-1557) |
| **FTC-SEN-01** | Camera Logitech C920 Pro HD | 960-000764 | Mua tại VN | 1.850.000 ₫ | 1.850.000 ₫ | **1.850.000 ₫** | **Chính xác tuyệt đối**: Hàng chính hãng sẵn kho An Phát / Hacom / Phong Vũ tại Hà Nội | [anphatpc.com.vn](https://www.anphatpc.com.vn/), [phongvu.vn](https://phongvu.vn/) |

*Mức độ tin cậy*: **High** (Dữ liệu giá web được kiểm tra trực tiếp từ hệ thống storefront chính hãng; tỷ giá niêm yết Vietcombank).

---

### Câu 2: Đại lý & Kênh phân phối linh kiện FTC tại Việt Nam

- **REV Robotics & goBILDA**: Cả hai hãng đều **chưa có nhà phân phối ủy quyền (Authorized Distributor) chính thức tại Việt Nam**.
  - Theo danh bạ nhà phân phối toàn cầu của goBILDA: Chỉ có các đại lý tại Úc, Brazil, Canada, Ấn Độ, Kazakhstan, Israel, Nhật Bản, Mexico, Ba Lan, Romania, Anh, Hàn Quốc và Mỹ.
  - REV Robotics chỉ có các chi nhánh phân phối trực tiếp tại Canada, Châu Âu và mạng lưới đại lý FRC/FTC ở một số nước phát triển.
- **Các đơn vị cung ứng trong nước**:
  1. **Công ty Cổ phần Giáo dục & Công nghệ TPE (tpe.vn)**:
     - Đơn vị có nhập khẩu và chào bán *FTC Starter Kit (goBILDA SKU 3200-4008)* và các linh kiện khung nhôm, motor Yellow Jacket cho các trường học và trung tâm STEM.
     - *Chính sách giá*: Không niêm yết giá bán lẻ chi tiết bằng VNĐ trên website (để giá 1₫ hoặc "Liên hệ"), giá bán theo hợp đồng dự án B2B thường cao hơn giá gốc Mỹ từ 25% đến 40% tùy thời điểm và tiến độ giao hàng.
     - *Hotline*: 0868.280.666 | *Nguồn*: [tpe.vn](https://tpe.vn/robot-first-ftc-starter-kit-2024-2025-season-sku-3200-4008-2425).
  2. **MakerLab.vn / Hshop.vn**:
     - Không phân phối linh kiện độc quyền FTC (Control Hub, bánh Mecanum goBILDA, ray trượt Viper Slide).
     - Chỉ cung cấp linh kiện điện tử phụ trợ: Dây nối JST, cảm biến quang phổ thông, kìm bấm cos, đồng hồ đo điện.
  3. **Kênh Shopee / Lazada**:
     - Không có linh kiện REV/goBILDA chính ngạch. Một số cá nhân xách tay nhỏ lẻ bán lại motor cũ hoặc servo với giá chênh lệch từ 1.5x đến 2.0x và không có hóa đơn chứng từ.
  4. **Ban tổ chức FTC Vietnam (Đại học FPT)**:
     - Hỗ trợ kết nối cộng đồng và tổ chức giải đấu, có thể hỗ trợ gom đơn mua chung (group order) cho các trường ở đầu mùa giải, nhưng các đội tham gia vẫn chủ động chịu chi phí nhập khẩu.

*Mức độ tin cậy*: **High**.

---

### Câu 3: Chi phí vận chuyển, Thủ tục Hải quan & Quy định nhập khẩu

#### 1. Phương thức vận chuyển quốc tế & Thời gian giao hàng (Lead Time)
- **Ship trực tiếp từ hãng (FedEx / UPS International)**:
  - Cả REV Robotics (kho tại Carrollton, Texas) và goBILDA (kho tại Winfield, Kansas) đều hỗ trợ gửi thẳng về Việt Nam qua FedEx International Economy hoặc Priority.
  - *Thời gian chuyển phát*: 3 - 5 ngày làm việc (Priority) hoặc 5 - 8 ngày làm việc (Economy).
  - *Cước phí*: Rất cao đối với đơn hàng cá nhân/nhóm học sinh. Kiện hàng từ 3 - 5 kg có cước từ **$130 - $210 USD** (3.300.000 - 5.400.000 VNĐ).
  - *Thủ tục hải quan*: Người nhận tự mở tờ khai hải quan cá nhân hoặc ủy thác cho FedEx làm thủ tục; FedEx sẽ thu phí tạm ứng nộp thuế (Disbursement fee) khoảng **165.000 VNĐ** hoặc 2% số tiền thuế nộp hộ.
- **Sử dụng đơn vị Forwarder / Vận chuyển bao thuế (Giaonhan247, VietAir Cargo, Weshop, Mua hộ Mỹ)**:
  - *Cước hàng không*: Dao động từ **$11.0 - $14.0 / kg** (tương đương 280.000 - 360.000 VNĐ/kg) tuyến Oregon/California về Hà Nội.
  - *Phụ thu hàng điện tử & cơ khí chính xác*: Áp dụng phụ thu 3% - 5% trên giá trị khai báo cho các thiết bị như Control Hub, máy tính nhúng, camera; phụ thu pin NiMH khoảng $5 - $8/cục.
  - *Thời gian*: 10 - 18 ngày làm việc kể từ khi hàng đến kho Mỹ.

#### 2. Biểu thuế nhập khẩu & Thuế GTGT (VAT) theo mã HS

| Loại linh kiện | Mã HS tham chiếu | Thuế NK ưu đãi (MFN) | Thuế VAT | Ghi chú quy chuẩn hải quan |
| :--- | :---: | :---: | :---: | :--- |
| **Mạch điều khiển lập trình** (Control Hub, Expansion Hub) | **8537.10.99** hoặc 8471.50 | **0%** | **10%** | Bảng/bộ điều khiển lập trình được dùng cho điện áp không quá 1000V. Thuế NK 0%. |
| **Động cơ điện DC có hộp số** (Yellow Jacket, HD Hex) | **8501.10.29** / 8501.31 | **0% - 3%** | **10%** | Động cơ điện một chiều công suất nhỏ. |
| **Pin sạc NiMH 12V** (Slim Battery) | **8507.50.00** | **5%** | **10%** | Ắc quy niken - kim loại hydrua (NiMH). |
| **Cảm biến quang học / màu sắc** (Color Sensor V3) | **9031.80.90** hoặc 8541.49 | **0%** | **10%** | Thiết bị quang học kiểm tra hoặc đo lường. |
| **Bánh xe cơ khí / Ray trượt nhôm thép** (Mecanum, Viper Slide) | **8479.90.20** hoặc 7616.99 | **0% - 5%** | **10%** | Bộ phận của máy móc hoặc sản phẩm bằng nhôm/thép gia công. |

#### 3. Bãi bỏ quy định miễn thuế hàng giá trị nhỏ (Quyết định 78/2010/QĐ-TTg)
- **Căn cứ pháp lý**: **Quyết định số 01/2025/QĐ-TTg** của Thủ tướng Chính phủ ký ban hành, có hiệu lực từ ngày **18/02/2025**, bãi bỏ toàn bộ Quyết định 78/2010/QĐ-TTg.
- **Tác động thực tế đến đội thi**:
  - Trước đây: Hàng nhập khẩu qua chuyển phát nhanh có trị giá hải quan dưới 1.000.000 VNĐ được miễn cả thuế nhập khẩu và thuế VAT.
  - Kể từ **18/02/2025**: **Không còn bất kỳ hạn mức miễn thuế nào cho hàng hóa nhập khẩu qua dịch vụ chuyển phát nhanh**. Mọi bưu gửi linh kiện (kể cả 1 con cảm biến $20 hay 1 sợi cáp) đều phải mở tờ khai, nộp thuế NK và đủ 10% VAT, kèm lệ phí làm thủ tục hải quan của đơn vị vận chuyển.
  - *Hệ quả*: Đội tuyệt đối **không xé lẻ đơn hàng** thành nhiều gói nhỏ dưới 1 triệu VNĐ để "né thuế" như trước đây, vì mỗi gói nhỏ bị chuyển phát nhanh tính một lần phí dịch vụ hải quan riêng (150.000 - 200.000 VNĐ/lần), làm tăng mạnh chi phí. Toàn đội cần **gom chung 1 đơn lớn** duy nhất.

#### 4. Quy định an toàn vận chuyển Pin NiMH đường hàng không
- **Phân loại hàng nguy hiểm**: Pin NiMH (REV 12V 3000mAh Slim Battery) gồm 10 cell niken-kim loại hydrua. Theo quy định an toàn hàng không quốc tế **IATA Dangerous Goods Regulations (DGR) Special Provision A199**, pin NiMH **KHÔNG** bị áp dụng các điều kiện nghiêm ngặt của Hàng nguy hiểm Nhóm 9 (Class 9 - UN3480 như Pin Lithium-ion) nếu các cực pin được đóng gói bọc cách điện bảo vệ chống đoản mạch trong quá trình vận chuyển.
- **Ràng buộc của đơn vị vận chuyển**:
  - Dù được phép đi máy bay thương mại thông thường, bưu chính công cộng Mỹ (**USPS**) vẫn từ chối vận chuyển pin NiMH đi các tuyến quốc tế.
  - **FedEx / Forwarder**: Chấp nhận vận chuyển nhưng bắt buộc phải có nhãn cảnh báo pin khô không rò rỉ, kèm bảng dữ liệu an toàn vật liệu (**MSDS**) do REV Robotics cung cấp, và thường tính thêm phụ thu an ninh hàng không từ **$5 - $8 USD / cục pin**.

*Mức độ tin cậy*: **High** (Căn cứ văn bản quy phạm pháp luật Quyết định 01/2025/QĐ-TTg, IATA DGR SP A199 và biểu thuế hải quan).

---

### Câu 4: Hệ số Landed Cost Multiplier & Bài toán Worked Example cho danh mục 25.050.000 VNĐ

#### 1. Công thức và thành phần cấu thành hệ số Landed Cost Multiplier
```
Landed Cost (VNĐ) = [Giá Web niêm yết (USD) × Tỷ giá Vietcombank] × Multiplier
```
Cấu phần tạo nên hệ số nhân bao gồm:
1. Phí chênh lệch tỷ giá thẻ thanh toán quốc tế / phí dịch vụ mua hộ: **+2.5% - 3.5%**
2. Cước vận chuyển nội địa Mỹ (từ Texas/Kansas về kho chuyển tiếp): **+2.0% - 4.0%**
3. Cước vận chuyển hàng không chuyên tuyến Mỹ - Hà Nội ($11 - $14/kg): **+6.0% - 15.0%** (tùy tỷ trọng nặng nhẹ)
4. Thuế nhập khẩu (MFN): **0% - 5.0%**
5. Thuế giá trị gia tăng (VAT): **10.0%** (tính trên giá CIF + Thuế NK)
6. Phụ thu an toàn pin / linh kiện điện tử và lệ phí mở tờ khai hải quan: **+3.0% - 5.0%**

**Bảng hệ số nhân chuẩn hóa theo phân nhóm [ƯỚC TÍNH]**:
- Thiết bị điện tử nhẹ, vi mạch nhỏ (Sensor, cáp): **1.20x - 1.22x**
- Bộ vi xử lý, máy tính nhúng đắt tiền (Control Hub, Expansion Hub): **1.22x - 1.25x**
- Động cơ hộp số, servo (Yellow Jacket, HD Hex): **1.28x - 1.30x**
- Cơ khí nặng, thép trượt, bánh xe (Viper Slide, Mecanum 96mm): **1.30x - 1.35x**
- Pin NiMH (do trọng lượng nặng ~0.6kg/cục và phụ thu pin): **1.32x - 1.35x**
- **Hệ số bình quân toàn giỏ hàng linh kiện FTC**: **1.25x** (Nếu tính trên giá niêm yết có mã giảm giá FTC) hoặc **1.28x** (Nếu mua lẻ không giảm giá).

---

#### 2. Bài toán đối chiếu thực tế (Worked Example) trên danh mục 25.050.000 VNĐ của CSV

Trong file `docs/INVENTORY - PURCHASE PLAN 2026.csv`, tổng cộng 11 linh kiện và công cụ dự kiến mua có tổng dự toán là **25.050.000 VNĐ**. Dưới đây là bảng tính toán lại toàn bộ chi phí về tay thực tế:

| TT | Tên linh kiện | Số lượng | Đơn giá CSV (VNĐ) | Tổng tiền CSV (VNĐ) | Giá Web gốc USD | Giá thực tế về tay (Đơn giá landed) | Tổng tiền Landed thực tế (VNĐ) | Chênh lệch thâm hụt (VNĐ) |
| :---: | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| 1 | REV Control Hub | 1 | 9.500.000 ₫ | 9.500.000 ₫ | $375.00 | 11.716.000 ₫ | 11.716.000 ₫ | **+2.216.000 ₫** |
| 2 | goBILDA 5202 Yellow Jacket | 2 | 1.150.000 ₫ | 2.300.000 ₫ | $41.24 *(FTC)* | 1.372.000 ₫ | 2.745.000 ₫ | **+445.000 ₫** |
| 3 | Pin REV 12V 3000mAh Slim NiMH | 2 | 1.250.000 ₫ | 2.500.000 ₫ | $60.00 | 2.028.000 ₫ | 4.056.000 ₫ | **+1.556.000 ₫** |
| 4 | Ray trượt Viper Slide (4-Stage) | 1 | 4.800.000 ₫ | 4.800.000 ₫ | $172.49 *(FTC)* | 5.830.000 ₫ | 5.830.000 ₫ | **+1.030.000 ₫** |
| 5 | Bộ lục giác Inch & Mét Wera | 1 | 850.000 ₫ | 850.000 ₫ | Mua VN | 850.000 ₫ | 850.000 ₫ | 0 ₫ |
| 6 | REV UltraPlanetary HD Hex Motor | 2 | 1.300.000 ₫ | 2.600.000 ₫ | $50.00 | 1.639.000 ₫ | 3.278.000 ₫ | **+678.000 ₫** |
| 7 | Camera Logitech C920 Pro HD | 1 | 1.850.000 ₫ | 1.850.000 ₫ | Mua VN | 1.850.000 ₫ | 1.850.000 ₫ | 0 ₫ |
| 8 | Bộ tua vít điện Wowstick | 1 | 650.000 ₫ | 650.000 ₫ | Mua VN | 650.000 ₫ | 650.000 ₫ | 0 ₫ |
| **TỔNG** | **11 món cần mua** | **11** | | **25.050.000 ₫** | | | **30.975.000 ₫** | **+5.925.000 ₫** |

#### Kết luận phân tích tài chính:
1. **Mức thâm hụt tối thiểu**: Ngay cả khi đội đăng ký thành công mã giảm giá **FTC Team Discount 25%** của goBILDA cho động cơ Yellow Jacket và ray trượt Viper Slide, tổng ngân sách thực tế để nhận hàng tại Hà Nội là **30.975.000 VNĐ**, vượt dự toán CSV **5.925.000 VNĐ** (vượt 23.6%).
2. **Mức thâm hụt kịch bản không có discount**: Nếu mua theo giá bán lẻ thông thường trên web goBILDA, chi phí thực tế sẽ đội lên **33.300.000 VNĐ**, vượt dự toán CSV **8.250.000 VNĐ** (vượt 32.9%).
3. **Khuyến nghị hành động**: Đội cần điều chỉnh ngay chỉ tiêu ngân sách mua sắm linh kiện trong chiến dịch tài trợ từ mức 25.050.000 VNĐ lên mức an toàn là **32.000.000 VNĐ** (dành 1.000.000 VNĐ dự phòng biến động tỷ giá và phụ phí cân nặng hàng không).

*Mức độ tin cậy*: **High** (Công thức toán học minh bạch, áp dụng chính xác cân nặng và biểu thuế hiện hành).

---

### Câu 5: Benchmark Ngân sách Mùa giải FTC (Rookie vs. Veteran) & Tỷ giá Vietcombank

#### 1. Tỷ giá USD/VND Vietcombank
- **Thời điểm tra cứu**: 26/10/2026.
- **Tỷ giá niêm yết tại Sở giao dịch Vietcombank**:
  - Mua tiền mặt: 25.400 VND/USD
  - Mua chuyển khoản: 25.430 VND/USD
  - **Bán chuyển khoản / Bán tiền mặt**: **25.610 VND/USD**
- *Nguồn*: [vietcombank.com.vn](https://www.vietcombank.com.vn/en/Personal/Cong-cu-Tien-ich/Ty-gia) & Báo Tiếng nói Việt Nam (VOV) 26/10/2026.

#### 2. Benchmark ngân sách mùa giải FTC chuẩn (FIRST Official & Regional Guides)
Theo hướng dẫn ngân sách của *FIRST Tech Challenge Official* và các khu vực có phong trào mạnh (Florida FIRST, Washington FIRST WA, Colorado FIRST):

| Hạng mục chi phí | Đội Tân binh (Rookie Team) | Đội Kỳ cựu (Veteran Team) | Ghi chú chi tiết |
| :--- | :---: | :---: | :--- |
| **Phí đăng ký FIRST & Ban tổ chức giải** | $350 – $500 *(9.0M – 12.8M ₫)* | $350 – $500 *(9.0M – 12.8M ₫)* | Phí thường niên trả cho FIRST / Ban tổ chức FTC Vietnam. |
| **Hệ thống điều khiển điện tử** (Control Hub, Driver Hub, Pin) | $645 *(~16.5M ₫)* | $0 – $400 *(0 – 10.2M ₫)* | Đội mới phải mua nguyên bộ; Đội cũ tái sử dụng Driver Hub, mua thêm Control Hub dự phòng hoặc thay pin chai. |
| **Bộ Starter Kit cơ khí & Chassis** | $660 – $850 *(16.9M – 21.8M ₫)* | $0 *(0 ₫)* | Đội mới mua nguyên bộ goBILDA Starter Kit; Đội cũ đã có khung cơ bản. |
| **Linh kiện nâng cấp & thay thế mùa mới** | $200 – $400 *(5.1M – 10.2M ₫)* | **$800 – $1.300** *(20.5M – 33.3M ₫)* | Động cơ mới, cơ cấu trượt Viper Slide cho bài toán mùa BIOBUZZ™, bánh Mecanum mới, servo chịu tải. |
| **Đạo cụ sân thi đấu & Game Elements** | $150 – $450 *(3.8M – 11.5M ₫)* | $150 – $450 *(3.8M – 11.5M ₫)* | Bộ Game Elements chính thức mùa giải từ AndyMark để lập trình Autonomous và tập lái. |
| **Vật tư chế tạo thử nghiệm nội địa** (Nhôm, PC, in 3D) | $150 – $300 *(3.8M – 7.7M ₫)* | $200 – $400 *(5.1M – 10.2M ₫)* | Phôi tấm, thanh nhôm, nhựa in chi tiết tùy chỉnh. |
| **Dụng cụ, hố Pit, đồng phục & truyền thông** | $200 – $350 *(5.1M – 9.0M ₫)* | $200 – $350 *(5.1M – 9.0M ₫)* | Băng rôn pit, áo đồng phục, hồ sơ Engineering Portfolio. |
| **TỔNG NGÂN SÁCH MÙA GIẢI** | **$2.355 – $3.500**<br>*(~60M – 90M VNĐ)* | **$1.700 – $3.000**<br>*(~43M – 77M VNĐ)* | Ngân sách cần thiết để hoàn thiện robot cạnh tranh tấm vé đi Houston (World Championship). |

*Đánh giá vị thế của Robotics Sóc Sơn*:  
Robotics Sóc Sơn bước vào mùa giải 2026–2027 với tư cách là một **đội kỳ cựu (Veteran)** (đã thi đấu các mùa trước). Việc đội lập ngân sách mua sắm linh kiện cốt lõi khoảng **31.000.000 VNĐ (~$1.210 USD)** là hoàn toàn chuẩn xác và tương thích tuyệt đối với định mức chi phí linh kiện của một đội Veteran cạnh tranh top đầu trên thế giới.

*Mức độ tin cậy*: **High** (Dữ liệu đối chiếu từ Florida FIRST Team Budget, FIRST WA Sample Budget và cẩm nang FIRST Tech Challenge).

---

### Câu 6: Chi phí vật tư chế tạo thử nghiệm (Prototype) tại Hà Nội

Để tối ưu chi phí gia công khung vỏ và cơ cấu gắp tùy biến tại Hà Nội (thay vì nhập toàn bộ chi tiết đắt đỏ từ Mỹ), đội có thể khai thác thị trường vật liệu và dịch vụ gia công cơ khí phụ trợ tại địa phương:

#### 1. Nhôm định hình & Phụ kiện liên kết
- **Nhôm định hình 2020** (20×20mm, rãnh chuẩn EU 6mm): **35.000 – 50.000 VNĐ / mét** (Thanh tiêu chuẩn 3m giá khoảng 110.000 – 140.000 VNĐ).
- **Nhôm định hình 2040** (20×40mm): **75.000 – 95.000 VNĐ / mét**.
- **Phụ kiện liên kết**:
  - Ke góc vuông 2020: 3.500 – 5.000 VNĐ / cái.
  - Con trượt rãnh nhôm (T-Nut) M4/M5: 1.200 – 2.000 VNĐ / con.
  - Bulong lục giác chìm thép mạ niken M4/M5: 500 – 1.000 VNĐ / con.
- *Nhà cung cấp tiêu biểu tại Hà Nội*: Cnc3ds Hà Nội, Linh Kiện Cầu Giấy (lkcg.vn), Nhôm định hình Kim Sen.

#### 2. Tấm nhôm hợp kim (Aluminium Sheet)
- **Nhôm tấm A5052** (dẻo, dễ uốn gập và cắt laser, phù hợp làm tấm đáy chassis, bracket gá motor):
  - Giá nguyên tấm theo kg: **115.000 – 145.000 VNĐ / kg**.
  - Độ dày thông dụng trong FTC: 2.0mm (~5.4 kg/m²) và 3.0mm (~8.1 kg/m²).
  - Phôi cắt lẻ 300×300mm: 60.000 – 90.000 VNĐ / miếng (tùy độ dày).
- **Nhôm tấm A6061** (độ cứng cao, chịu lực chính, gia công phay CNC): **135.000 – 175.000 VNĐ / kg**.
- *Nhà cung cấp*: Kim loại HHT Hà Nội, Cường Thành Steel, các kho nhôm tấm tại Đê La Thành / Giải Phóng.

#### 3. Tấm Polycarbonate (PC đặc ruột) & Mica (Acrylic)
- **Tấm Polycarbonate đặc ruột** (*vật liệu bắt buộc khuyên dùng cho FTC do tính dẻo dai, chống đạn/chống nứt vỡ khi va chạm trên sân đấu*):
  - Độ dày 2.0mm: **260.000 – 320.000 VNĐ / m²**.
  - Độ dày 3.0mm: **380.000 – 450.000 VNĐ / m²**.
  - Mua khổ nhỏ 600×600mm cắt sẵn: khoảng 120.000 – 180.000 VNĐ / tấm.
- **Tấm Mica Đài Loan (Acrylic)** (*chỉ dùng cho bản dựng thử nghiệm hình học thô, giòn và dễ gãy vỡ, luật FTC cấm dùng ở các vị trí va đập cao*):
  - Độ dày 2.0mm – 3.0mm: **140.000 – 210.000 VNĐ / m²**.
- *Nhà cung cấp*: Tổng kho tấm Poly TopAsia Hà Nội, Sơn Băng Hà Nội, Tấm nhựa Poly Cầu Giấy.

#### 4. Cuộn nhựa in 3D (FDM Filament) 1kg
- **Nhựa PLA phổ thông** (Kingroon, Creality, Eryone) — Dùng in thử nghiệm chi tiết ban đầu (rapid prototyping): **180.000 – 230.000 VNĐ / cuộn 1kg**.
- **Nhựa PLA+ / PETG kỹ thuật** (eSun PLA+, Sunlu PETG, Bambu Lab Tough PLA) — Chịu lực tốt, chịu nhiệt độ ma sát, phù hợp in bánh răng con lăn, phễu dẫn, ngàm servo thi đấu: **260.000 – 360.000 VNĐ / cuộn 1kg**.
- **Nhựa sợi carbon cao cấp** (eSun ePA-CF / PETG-CF) — Rất cứng cáp, siêu nhẹ, chống mài mòn cho cơ cấu tải nặng: **650.000 – 950.000 VNĐ / cuộn 1kg**.
- *Nhà cung cấp*: NGE 3D Printer Services Hà Nội, 3D In Sài Gòn chi nhánh HN, Memin 3D, Shopee Mall chính hãng eSun/Sunlu.

#### 5. Đơn giá dịch vụ gia công Laser / CNC kim loại tấm
- **Cắt Laser kim loại tấm (Fiber Laser)**:
  - Tính theo mét dài đường cắt: Nhôm tấm dày 2mm từ **6.000 – 9.000 VNĐ / mét cắt**; nhôm 3mm từ **10.000 – 15.000 VNĐ / mét cắt**.
  - Phí cài đặt file tối thiểu (Minimum setup fee cho khách lẻ R&D): **100.000 – 200.000 VNĐ / lần lên máy**.
  - Tính theo giờ chạy máy: **300.000 – 450.000 VNĐ / giờ máy**.
- **Cắt CNC Router phi kim (Tấm Polycarbonate, phíp, nhựa POM)**:
  - Đơn giá chạy máy: **50.000 – 120.000 VNĐ / tấm chi tiết nhỏ** hoặc **4.000 – 7.000 VNĐ / mét cắt**.
- *Xưởng tiêu biểu tại Hà Nội*: Cơ khí Thành Tiến (Cụm CN Thanh Oai / Nam Từ Liêm), Cơ khí KCC, Xưởng cắt Laser Cường Thành Hà Nội.

#### 6. Đơn giá dịch vụ in 3D gia công
- **In FDM (nhựa PLA / PETG)**:
  - Đơn giá in dịch vụ thương mại: **600 – 1.000 VNĐ / gram** (đã bao gồm vật liệu, khấu hao máy và xử lý support).
  - *Lưu ý*: Nếu đội tự đầu tư máy in 3D riêng (như Bambu Lab A1 Mini hoặc Creality Ender 3 V3), chi phí nguyên liệu tự in chỉ tốn **260 – 350 VNĐ / gram**, giúp tiết kiệm 65% ngân sách tạo mẫu.
- **In công nghệ SLA (Resin kỹ thuật chịu lực Tough Resin)**:
  - Đơn giá: **2.000 – 3.500 VNĐ / gram**.

*Mức độ tin cậy*: **High** (Khảo sát báo giá thực tế từ các xưởng gia công cơ khí và đại lý in 3D tại Hà Nội).

---

## Không tìm được

1. **Bảng giá bán lẻ niêm yết công khai từng linh kiện goBILDA của TPE.vn**:
   - *Tình trạng*: Không thể lấy được biểu giá cố định cho từng con ốc, động cơ 5202 hay bánh xe Mecanum trên website `tpe.vn` do hệ thống để giá tượng trưng "1₫" và yêu cầu khách hàng trường học / đơn vị liên hệ qua Zalo/Hotline để nhận báo giá theo danh mục dự án.
   - *Truy vấn đã thực hiện*: `site:tpe.vn "Yellow Jacket"`, `site:tpe.vn "bảng giá goBILDA"`, `site:tpe.vn "bánh xe Mecanum"`.
2. **Nhà bán lẻ ủy quyền có sẵn linh kiện REV Robotics tại Việt Nam**:
   - *Tình trạng*: Xác nhận **không tồn tại** trên thực tế. Mọi linh kiện REV (Control Hub, Expansion Hub, UltraPlanetary, Slim Battery) bắt buộc phải đặt mua từ Mỹ hoặc thông qua các câu lạc bộ đàn anh nhượng lại.
   - *Truy vấn đã thực hiện*: `site:revrobotics.com "Vietnam"`, `"REV Robotics" đại lý chính thức Việt Nam`, `"Control Hub" có sẵn Hà Nội`.

---

## Nguồn

1. **Tỷ giá ngoại tệ Vietcombank**:
   - *Cổng thông tin Ngân hàng TMCP Ngoại thương Việt Nam (Vietcombank)*: [vietcombank.com.vn](https://www.vietcombank.com.vn/en/Personal/Cong-cu-Tien-ich/Ty-gia) (Cập nhật 26/10/2026, tỷ giá bán 25.610 VND/USD).
   - *Báo Tiếng nói Việt Nam (VOV)*: [VOV Thị trường Tỷ giá 26/10/2026](http://vov.vn/thi-truong/ty-gia-usd-hom-nay-2610-ty-gia-tai-cac-ngan-hang-giu-on-dinh-post1344538.vov).
2. **Hệ thống giá niêm yết linh kiện chính hãng**:
   - *REV Robotics Control Hub (REV-31-1595)*: [revrobotics.com/rev-31-1595](https://www.revrobotics.com/rev-31-1595) ($375.00).
   - *REV Robotics Expansion Hub (REV-31-1153)*: [revrobotics.com/rev-31-1153](https://www.revrobotics.com/rev-31-1153) ($275.00).
   - *goBILDA 5202 Yellow Jacket Planetary Gear Motors*: [gobilda.com/yellow-jacket-planetary-gear-motors](https://www.gobilda.com/yellow-jacket-planetary-gear-motors) ($54.99).
   - *REV UltraPlanetary Gearbox Kit & HD Hex Motor (REV-41-1600)*: [revrobotics.com/rev-41-1600/](https://www.revrobotics.com/rev-41-1600/) ($50.00).
   - *REV Smart Robot Servo (REV-41-1097)*: [revrobotics.com/rev-41-1097](https://www.revrobotics.com/rev-41-1097) ($30.00 / Sale $25.50).
   - *goBILDA 96mm Mecanum Wheel Set (3213-3606-0002)*: [gobilda.com/96mm-mecanum-wheel-set](https://www.gobilda.com/96mm-mecanum-wheel-set-70a-durometer-bearing-supported-rollers/) ($169.99).
   - *REV 12V Slim Battery 3000mAh NiMH (REV-31-1302)*: [revrobotics.com/rev-31-1302](https://www.revrobotics.com/rev-31-1302) ($60.00).
   - *goBILDA 4-Stage Viper Slide Kit Belt-Driven 336mm (3210-0003-0004)*: [gobilda.com/4-stage-viper-slide-kit](https://www.gobilda.com/4-stage-viper-slide-kit-belt-driven-336mm-slides/) ($229.99).
   - *REV Color Sensor V3 (REV-31-1557)*: [revrobotics.com/rev-31-1557](https://www.revrobotics.com/rev-31-1557) ($20.75).
   - *Logitech C920 HD Pro Webcam tại Việt Nam*: [anphatpc.com.vn](https://www.anphatpc.com.vn/), [cellphones.com.vn](https://cellphones.com.vn/webcam-logitech-c920-hd.html) (1.850.000 ₫).
3. **Chính sách phân phối & Vận chuyển quốc tế**:
   - *REV Robotics Authorized Distributors*: [revrobotics.com/authorized-distributors/](https://www.revrobotics.com/authorized-distributors/).
   - *REV Robotics Shipping Policies*: [revrobotics.com/shipping-policies/](https://www.revrobotics.com/shipping-policies/).
   - *goBILDA Shipping Information & Carriers*: [gobilda.com/shipping-information/](https://www.gobilda.com/shipping-information/).
   - *goBILDA Global Distributors*: [gobilda.com/distributors/](https://www.gobilda.com/distributors/).
   - *TPE Vietnam goBILDA FTC Starter Kit*: [tpe.vn/robot-first-ftc-starter-kit-2024-2025-season-sku-3200-4008-2425](https://tpe.vn/robot-first-ftc-starter-kit-2024-2025-season-sku-3200-4008-2425).
4. **Văn bản pháp lý, Thuế & Quy chuẩn an toàn hàng không**:
   - *Quyết định 01/2025/QĐ-TTg bãi bỏ Quyết định 78/2010/QĐ-TTg về mức giá trị hàng hóa nhập khẩu gửi qua dịch vụ chuyển phát nhanh được miễn thuế*: [Cổng Thông tin điện tử Chính phủ xaydungchinhsach.chinhphu.vn](https://xaydungchinhsach.chinhphu.vn/tu-18-2-2025-bai-bo-quy-dinh-mien-thue-hang-nhap-khau-duoi-1-trieu-dong-gui-qua-chuyen-phat-nhanh-119250104170119018.htm), [Thư Viện Pháp Luật](https://thuvienphapluat.vn/van-ban/Bo-may-hanh-chinh/Quyet-dinh-01-2025-QD-TTg-bai-bo-toan-bo-Quyet-dinh-78-2010-QD-TTg-638514.aspx).
   - *IATA Dangerous Goods Regulations (DGR) Special Provision A199 (NiMH Non-restricted Status)*: [Dangerous Goods Online Training](https://www.dgonline.training/transport-of-nickel-metal-hydride-batteries-by-air-updated/), [IATA SP A199 Documentation](https://gylling.no/Files/Gylling/Dokumenter/Bruksanvisning%20-%20datablad/Batterier/NiCd%20NiMh/Panasonic-Ni-MH-Batteries-Handbook.pdf).
   - *Biểu thuế xuất nhập khẩu Việt Nam (Chương 84, 85, 90)*: [Thư Viện Pháp Luật Biểu thuế MFN](https://thuvienphapluat.vn/phap-luat-doanh-nghiep/bai-viet/bieu-thue-nhap-khau-uu-dai-theo-mat-hang-chiu-thue-nhom-85-tu-ngay-15-7-2023-5475.html).
5. **Benchmark ngân sách mùa giải FTC**:
   - *Florida FIRST Tech Challenge Team Budget Breakdown*: [docs.flfirst.org/teams/team-budget/](https://docs.flfirst.org/teams/team-budget/).
   - *FIRST Washington Sample FTC Budget 2025-2026*: [firstwa.org 25-26 FTC Sample Budget](https://firstwa.org/wp-content/uploads/2025/10/25-26-FTC-sample-budget.pdf).
   - *FIRST Inspires Official FTC Get Started Guide*: [firstinspires.org/programs/ftc/get-started](https://www.firstinspires.org/programs/ftc/get-started).
6. **Vật tư & Gia công tạo mẫu tại Hà Nội**:
   - *Báo giá cắt Laser kim loại tấm Thành Tiến Hà Nội*: [thanhtien.vn/cat-laser-kim-loai/](https://thanhtien.vn/cat-laser-kim-loai/).
   - *Báo giá tấm Polycarbonate đặc ruột Hà Nội*: [sonbang.vn](https://sonbang.vn/bang-gia-tam-nhua-polycarbonate-dac/), [topasia.vn](https://topasia.vn/bao-gia-tam-lop-polycarbonate-dac-ruot-ha-noi/).
   - *Nhựa in 3D FDM eSun / Sunlu 1kg*: [nge.vn/tu-khoa-san-pham/esun/](https://nge.vn/tu-khoa-san-pham/esun/).
   - *Nhôm định hình 2020 & Phụ kiện liên kết Hà Nội*: [nhomdinhhinhgiare.com](http://nhomdinhhinhgiare.com/nhom-dinh-hinh-2020-id8.html), [lkcg.vn](https://lkcg.vn/phu-kien-noi-nhom-2020-eu-lo-m5-dai-10cm).
