import assert from "node:assert/strict";
import { parseEnum } from "./enum-parse.ts";

// 1. Data fact 1 (Vietnamese): Starts with A., nested roman numerals i. to iv.
{
  const text =
    "A. 40 POLLEN được chuẩn bị trên Sân thi đấu như sau: i. 4 POLLEN trong mỗi bông trong số 4 FLOWER (16) ii. 4 POLLEN trong GARDEN đỏ (4) iii. 4 POLLEN trong GARDEN xanh dương (4) iv. 4 POLLEN nạp sẵn (pre-load) trong mỗi robot (16) (Mục 10.3.4 ROBOTS)";
  const nodes = parseEnum(text);
  assert.equal(nodes.length, 1, "Should have 1 top-level node for A.");
  assert.equal(nodes[0].marker, "A.");
  assert.equal(
    nodes[0].text,
    "40 POLLEN được chuẩn bị trên Sân thi đấu như sau:"
  );
  assert.ok(nodes[0].children, "A. should have children");
  assert.equal(nodes[0].children.length, 4, "Should have 4 roman children");
  assert.equal(nodes[0].children[0].marker, "i.");
  assert.equal(
    nodes[0].children[0].text,
    "4 POLLEN trong mỗi bông trong số 4 FLOWER (16)"
  );
  assert.equal(nodes[0].children[1].marker, "ii.");
  assert.equal(nodes[0].children[2].marker, "iii.");
  assert.equal(nodes[0].children[3].marker, "iv.");
  assert.ok(
    nodes[0].children[3].text.includes("(Mục 10.3.4 ROBOTS)"),
    "Trailing sentence stays inside item"
  );
}

// 2. Data fact 1 (English): Same structure in English
{
  const text =
    "A. 40 POLLEN are staged on the FIELD as follows: i. 4 POLLEN in each of the 4 FLOWERS (16) ii. 4 POLLEN in the red GARDEN (4) iii. 4 POLLEN in the blue GARDEN (4) iv. 4 POLLEN pre-loaded in each ROBOT (16) (Section 10.3.4 ROBOTS)";
  const nodes = parseEnum(text);
  assert.equal(nodes.length, 1);
  assert.equal(nodes[0].marker, "A.");
  assert.equal(nodes[0].text, "40 POLLEN are staged on the FIELD as follows:");
  assert.equal(nodes[0].children?.length, 4);
  assert.equal(nodes[0].children?.[0].marker, "i.");
  assert.equal(nodes[0].children?.[3].marker, "iv.");
  assert.ok(nodes[0].children?.[3].text.includes("(Section 10.3.4 ROBOTS)"));
}

// 3. Data fact 2 (Vietnamese): Multi-item A. B. C. D. E. sequence with no children
{
  const text =
    "A. Chỉ thành viên Đội điều khiển (DRIVE TEAM) được chỉ định cho trận đấu (MATCH) sắp diễn ra mới có mặt. B. Chỉ thành viên Đội điều khiển (DRIVE TEAM) có robot đã qua kiểm định kỹ thuật ban đầu, hoàn chỉnh mới có mặt. C. Thành viên Đội điều khiển (DRIVE TEAM) tập kết trong KHU VỰC LIÊN MINH (ALLIANCE AREA) được chỉ định. D. Thành viên Đội điều khiển (DRIVE TEAM) đeo huy hiệu Đội điều khiển (DRIVE TEAM) được chỉ định rõ ràng trên thắt lưng. E. Nếu là trận đấu Playoff (Playoff MATCH), ĐỘI TRƯỞNG LIÊN MINH (ALLIANCE CAPTAIN) phải đeo dấu hiệu nhận diện ĐỘI TRƯỞNG LIÊN MINH (ALLIANCE CAPTAIN) được chỉ định một cách rõ ràng (ví dụ: mũ, băng tay).";
  const nodes = parseEnum(text);
  assert.equal(nodes.length, 5, "Should have 5 items A through E");
  assert.equal(nodes[0].marker, "A.");
  assert.ok(nodes[0].text.startsWith("Chỉ thành viên"));
  assert.equal(nodes[1].marker, "B.");
  assert.equal(nodes[2].marker, "C.");
  assert.equal(nodes[3].marker, "D.");
  assert.equal(nodes[4].marker, "E.");
  assert.ok(nodes[4].text.includes("mũ, băng tay"));
}

// 4. Data fact 3 (Vietnamese): Two nesting levels with dangling 'và' before markers
{
  const text =
    "A. Bắc Mỹ - yêu cầu sẵn sàng thi đấu: i. hoàn tất quy trình đăng ký hàng năm qua bảng điều khiển FIRST, ii. nộp phí đăng ký hàng năm, iii. phải chỉ định 2 người lớn vào các vai trò Huấn luyện viên trưởng 1/Huấn luyện viên trưởng 2 (Lead Coach 1/Lead Coach 2) và đã vượt qua quy trình sàng lọc Chương trình Bảo vệ Thanh thiếu niên (YPP), iv. hoàn tất mọi yêu cầu sàng lọc Bảo vệ Thanh thiếu niên bổ sung (có thể khác nhau tùy khu vực), và v. đăng ký tất cả thành viên thanh thiếu niên của đội trên bảng điều khiển FIRST. B. ngoài Bắc Mỹ - yêu cầu sẵn sàng thi đấu: i. hoàn tất quy trình đăng ký hàng năm qua bảng điều khiển FIRST, và ii. hoàn tất mọi yêu cầu bổ sung của Đối tác Triển khai Chương trình FIRST (Program Delivery Partner) tại địa phương liên quan đến phí chương trình, đăng ký và sàng lọc bảo vệ thanh thiếu niên.";
  const nodes = parseEnum(text);
  assert.equal(nodes.length, 2, "Should have 2 top-level items A. and B.");
  assert.equal(nodes[0].marker, "A.");
  assert.equal(nodes[0].text, "Bắc Mỹ - yêu cầu sẵn sàng thi đấu:");
  assert.equal(nodes[0].children?.length, 5, "A. has 5 children i to v");
  assert.equal(nodes[0].children?.[0].marker, "i.");
  assert.equal(nodes[0].children?.[3].marker, "iv.");
  assert.ok(
    !nodes[0].children?.[3].text.endsWith("và"),
    "Dangling 'và' stripped from iv."
  );
  assert.ok(
    !nodes[0].children?.[3].text.endsWith(","),
    "Trailing comma stripped from iv."
  );
  assert.equal(nodes[0].children?.[4].marker, "v.");
  assert.ok(
    nodes[0].children?.[4].text.startsWith("đăng ký tất cả thành viên")
  );

  assert.equal(nodes[1].marker, "B.");
  assert.equal(nodes[1].text, "ngoài Bắc Mỹ - yêu cầu sẵn sàng thi đấu:");
  assert.equal(nodes[1].children?.length, 2, "B. has 2 children i to ii");
  assert.equal(nodes[1].children?.[0].marker, "i.");
  assert.ok(
    !nodes[1].children?.[0].text.endsWith("và"),
    "Dangling 'và' stripped from B.i"
  );
  assert.equal(nodes[1].children?.[1].marker, "ii.");
}

// 5. Data fact 3 (English): Two nesting levels with dangling 'and' before markers
{
  const text =
    "A. North America - competition ready requirements: i. complete annual registration process through the FIRST dashboard ii. pay annual registration fee iii. 2 adults must be assigned in the Lead Coach 1/Lead Coach 2 roles and have passed Youth Protection Program (YPP) screening, iv. complete any additional Youth Protection screening requirements (may vary from region to region), and v. register all youth team members on the FIRST dashboard. B. outside North America - competition ready requirements: i. complete annual registration process through the FIRST dashboard and ii. complete any additional requirements by the local FIRST Program Delivery Partner with regards to program fees, registrations and youth protection screening.";
  const nodes = parseEnum(text);
  assert.equal(nodes.length, 2);
  assert.equal(nodes[0].marker, "A.");
  assert.equal(nodes[0].children?.length, 5);
  assert.ok(!nodes[0].children?.[3].text.endsWith("and"));
  assert.equal(nodes[1].marker, "B.");
  assert.equal(nodes[1].children?.length, 2);
  assert.ok(!nodes[1].children?.[0].text.endsWith("and"));
}

// 6. Lead-in text followed by A. B. list
{
  const text =
    "Các ví dụ về nỗ lực thiện chí bao gồm nhưng không giới hạn ở: A. di chuyển an toàn về phía Sân thi đấu, B. hỗ trợ đội liên minh.";
  const nodes = parseEnum(text);
  assert.equal(nodes.length, 2);
  assert.equal(
    nodes[0].leadIn,
    "Các ví dụ về nỗ lực thiện chí bao gồm nhưng không giới hạn ở:"
  );
  assert.equal(nodes[0].marker, "A.");
  assert.equal(nodes[1].marker, "B.");
}

// 7. Negative: Lone A. with no subsequent marker and no children must NOT be split
{
  const text =
    "Các ví dụ về nỗ lực thiện chí bao gồm nhưng không giới hạn ở: A. di chuyển an toàn về phía Sân thi đấu với robot mà đội không chủ động chỉnh sửa,";
  const nodes = parseEnum(text);
  assert.equal(nodes.length, 0, "Lone A. should not split");
}

// 8. Negative: 'Phần B. Bắt đầu' must NOT be split
{
  const text = "Phần B. Bắt đầu quy trình kiểm tra robot tại khu vực kỹ thuật.";
  const nodes = parseEnum(text);
  assert.equal(nodes.length, 0, "Non-sequence prose must not split");
}

// 9. Negative: Bare URL must NOT be split
{
  const text = "TÌM HIỂU THÊM: https://www.firstinspires.org/first-canopy";
  const nodes = parseEnum(text);
  assert.equal(nodes.length, 0, "Bare URL must not split");
}

console.log("All enum-parse check assertions passed!");
