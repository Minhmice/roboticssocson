/**
 * Sponsorship Process Data
 * Contains all content for corporate & personal sponsorship flows
 * Bilingual support (Vietnamese & English)
 */

// ========== Step Interfaces ==========

export interface SponsorshipStep {
  readonly step: number;
  readonly title_vi: string;
  readonly title_en: string;
  readonly content_vi: string;
  readonly content_en: string;
  readonly details_vi: readonly string[];
  readonly details_en: readonly string[];
  readonly purpose_vi: string;
  readonly purpose_en: string;
}

// ========== Main Page Sections ==========

export interface SponsorshipMainSection {
  readonly id: string;
  readonly type: "corporate" | "personal" | "closing";
  readonly title_vi: string;
  readonly title_en: string;
  readonly content_vi: string;
  readonly content_en: string;
  readonly details_vi: readonly string[];
  readonly details_en: readonly string[];
  readonly purpose_vi: string;
  readonly purpose_en: string;
  readonly placeholder?: string;
  readonly cta?: {
    readonly text_vi: string;
    readonly text_en: string;
    readonly link: string;
  };
}

export const sponsorshipMainSections: readonly SponsorshipMainSection[] = [
  // Section A: Corporate Sponsorship
  {
    id: "corporate",
    type: "corporate",
    title_vi: "Tài trợ từ Doanh nghiệp",
    title_en: "Corporate Sponsorship",
    content_vi:
      "Tài trợ từ doanh nghiệp là hình thức đồng hành dành cho các tổ chức, công ty, đơn vị kinh doanh mong muốn hỗ trợ đội thi về tài chính, thiết bị hoặc dịch vụ. Khi tài trợ, doanh nghiệp không chỉ góp phần giúp học sinh hiện thực hóa các dự án robotics – STEM, mà còn xây dựng hình ảnh thương hiệu gắn với giáo dục, sáng tạo và trách nhiệm xã hội.",
    content_en:
      "Corporate sponsorship is a partnership opportunity for organizations, companies, and businesses looking to support our team financially, with equipment, or services. By sponsoring, corporations not only help students realize robotics and STEM projects but also build a brand image associated with education, innovation, and social responsibility.",
    details_vi: [
      "Logo xuất hiện trên robot thi đấu, áo đội, banner và các ấn phẩm truyền thông chính thức",
      "Được nhắc tên và giới thiệu trong các bài viết, video và sự kiện của đội",
      "Cơ hội giao lưu trực tiếp với học sinh, giáo viên, phụ huynh và cộng đồng công nghệ",
      "Gắn thương hiệu với các giá trị: đổi mới – sáng tạo – giáo dục STEM – phát triển cộng đồng",
    ],
    details_en: [
      "Logo placement on competition robot, team uniforms, banners, and official media",
      "Brand mentions in posts, videos, and team events",
      "Direct engagement opportunities with students, teachers, parents, and tech community",
      "Brand association with innovation, creativity, STEM education, and community development",
    ],
    purpose_vi:
      "Tạo một kênh làm việc rõ ràng – chuyên nghiệp – minh bạch giữa doanh nghiệp và đội thi. Giúp doanh nghiệp tăng nhận diện thương hiệu và thể hiện trách nhiệm xã hội, đồng thời giúp đội thi có nguồn lực ổn định để hoàn thiện robot, tham gia giải đấu và triển khai các hoạt động cộng đồng.",
    purpose_en:
      "Establish a clear, professional, and transparent partnership between corporations and our team. Help businesses enhance brand recognition and demonstrate social responsibility while providing our team with stable resources for robot development, competitions, and community activities.",
    placeholder: "{LINK_GOOGLE_FORM_DOANH_NGHIEP}",
  },

  // Section B: Personal Donation
  {
    id: "personal",
    type: "personal",
    title_vi: "Tài trợ cá nhân",
    title_en: "Personal Donation",
    content_vi:
      "Tài trợ cá nhân là hình thức mọi người có thể ủng hộ tự nguyện cho đội thi – dù là một khoản nhỏ hay lớn, theo tinh thần: 'Ai yêu mến đội đều có thể góp một phần vào hành trình này'. Đây có thể là ủng hộ của học sinh, cựu học sinh, phụ huynh, thầy cô, bạn bè hoặc bất kỳ ai muốn đồng hành.",
    content_en:
      "Personal donation is a way for everyone to support our team voluntarily – whether small or large, in the spirit of: 'Anyone who cares can contribute to this journey.' This can be support from students, alumni, parents, teachers, friends, or anyone who wants to be part of our story.",
    details_vi: [
      "Chuyển khoản trực tiếp qua QR code đơn giản và nhanh chóng",
      "Nội dung chuyển khoản gợi ý: 'Ho ten - Ung ho Robotics Soc Son'",
      "Có thể chọn công khai tên hoặc ủng hộ ẩn danh",
      "Mọi khoản ủng hộ đều được ghi nhận và báo cáo minh bạch",
    ],
    details_en: [
      "Direct bank transfer via simple and quick QR code",
      "Suggested transfer note: 'Full name - Support Robotics Soc Son'",
      "Option to be publicly acknowledged or remain anonymous",
      "All donations are recorded and reported transparently",
    ],
    purpose_vi:
      "Tạo cơ hội cho mọi cá nhân yêu mến đội đều có thể đóng góp, không bị giới hạn bởi thủ tục phức tạp. Biến mỗi khoản ủng hộ, dù nhỏ, thành nguồn động lực tinh thần để đội tiếp tục theo đuổi đam mê. Tăng sự gắn kết giữa đội và cộng đồng.",
    purpose_en:
      "Create opportunities for everyone who cares about our team to contribute without complex procedures. Turn every donation, no matter how small, into spiritual motivation for the team to continue pursuing our passion. Strengthen the bond between our team and the community.",
    placeholder: "{QR_IMAGE_PLACEHOLDER}",
  },

  // Section C: Closing
  {
    id: "closing",
    type: "closing",
    title_vi: "Cùng đồng hành",
    title_en: "Join Our Journey",
    content_vi:
      "Chúng tôi tin rằng với sự đồng hành từ doanh nghiệp và các cá nhân ủng hộ, đội Robotics Sóc Sơn sẽ có thêm sức mạnh để chinh phục những mục tiêu quan trọng trong mùa giải và lan tỏa tinh thần STEM đến nhiều bạn trẻ hơn.",
    content_en:
      "We believe that with support from businesses and individuals, Robotics Sóc Sơn will gain the strength to achieve important goals this season and spread the STEM spirit to more young people.",
    details_vi: [
      "Tất cả các hình thức đồng hành đều được ghi nhận và sử dụng minh bạch",
      "Đội thi trân trọng và cập nhật kết quả tới cộng đồng thường xuyên",
      "Mọi đóng góp đều tạo ra thay đổi thực sự cho học sinh và cộng đồng",
    ],
    details_en: [
      "All forms of support are acknowledged and used transparently",
      "The team values and regularly updates results to the community",
      "Every contribution creates real change for students and the community",
    ],
    purpose_vi:
      "Kết nối cảm xúc và niềm tin của nhà tài trợ với hành trình của đội. Giúp người đọc hiểu rằng mọi sự hỗ trợ, ở bất cứ hình thức nào, đều đáng quý và tạo ra thay đổi thực sự.",
    purpose_en:
      "Connect sponsors' emotions and trust with our team's journey. Help readers understand that every form of support, no matter what, is valuable and creates real change.",
    cta: {
      text_vi: "Tài trợ ngay",
      text_en: "Sponsor Now",
      link: "/sponsor",
    },
  },
] as const;

// ========== Corporate Stepper (6 Steps) ==========

export const corporateSteps: readonly SponsorshipStep[] = [
  {
    step: 1,
    title_vi: "Đăng ký thông tin tài trợ",
    title_en: "Register Sponsorship Information",
    content_vi: "Doanh nghiệp cung cấp thông tin sơ bộ qua Google Form.",
    content_en:
      "Company provides preliminary information through Google Form.",
    details_vi: [
      "Truy cập form đăng ký tài trợ doanh nghiệp",
      "Điền đầy đủ thông tin liên hệ: tên doanh nghiệp, người liên hệ, chức vụ",
      "Cung cấp email, số điện thoại để đội liên hệ",
      "Chọn hình thức tài trợ mong muốn (tiền mặt / hiện vật / dịch vụ / combo)",
      "Ghi rõ mức tài trợ dự kiến và các yêu cầu đặc biệt (nếu có)",
    ],
    details_en: [
      "Access corporate sponsorship registration form",
      "Fill in complete contact information: company name, contact person, position",
      "Provide email and phone number for team contact",
      "Select desired sponsorship type (cash / in-kind / services / combo)",
      "Specify expected sponsorship amount and special requirements (if any)",
    ],
    purpose_vi:
      "Giúp đội nắm được bức tranh tổng quan về doanh nghiệp và nhu cầu tài trợ để chuẩn bị nội dung trao đổi phù hợp và chuyên nghiệp.",
    purpose_en:
      "Help the team understand the overall picture of the company and sponsorship needs to prepare appropriate and professional discussion content.",
  },
  {
    step: 2,
    title_vi: "Đội liên hệ & gửi hồ sơ chi tiết",
    title_en: "Team Contacts & Sends Detailed Proposal",
    content_vi: "Đội Robotics Sóc Sơn chủ động liên hệ lại doanh nghiệp.",
    content_en: "Robotics Sóc Sơn team proactively contacts the company.",
    details_vi: [
      "Gửi email hoặc gọi điện cảm ơn doanh nghiệp đã quan tâm",
      "Gửi deck / proposal chi tiết về đội và kế hoạch mùa giải",
      "Trình bày các gói tài trợ và quyền lợi cụ thể cho từng mức",
      "Cung cấp thông tin về robot, thành tích, và hoạt động cộng đồng",
      "Đề xuất lịch gặp mặt hoặc trao đổi online",
    ],
    details_en: [
      "Send email or call to thank the company for their interest",
      "Send detailed deck/proposal about the team and season plans",
      "Present sponsorship packages and specific benefits for each level",
      "Provide information about robot, achievements, and community activities",
      "Propose meeting schedule or online discussion",
    ],
    purpose_vi:
      "Tạo bước kết nối đầu tiên, cung cấp đầy đủ thông tin để doanh nghiệp có thể cân nhắc và đưa ra quyết định tài trợ một cách thông minh.",
    purpose_en:
      "Create the first connection step, provide complete information so companies can consider and make informed sponsorship decisions.",
  },
  {
    step: 3,
    title_vi: "Trao đổi & thống nhất gói tài trợ",
    title_en: "Discussion & Agreement on Sponsorship Package",
    content_vi:
      "Hai bên trao đổi cụ thể về mức tài trợ, quyền lợi và mong muốn.",
    content_en:
      "Both parties discuss specifically about sponsorship level, benefits, and expectations.",
    details_vi: [
      "Hẹn lịch gặp trực tiếp hoặc online theo sự thuận tiện của doanh nghiệp",
      "Đội trình bày: Mục tiêu mùa giải, nhu cầu kinh phí, các mốc truyền thông",
      "Doanh nghiệp chia sẻ: Mong muốn về hình ảnh, kênh truyền thông, cách ghi nhận",
      "Thảo luận về vị trí logo, thời gian hiển thị, các hoạt động đồng tổ chức",
      "Trao đổi về báo cáo minh bạch và cập nhật định kỳ",
    ],
    details_en: [
      "Schedule in-person or online meeting according to company's convenience",
      "Team presents: Season goals, budget needs, media milestones",
      "Company shares: Image expectations, media channels, acknowledgment preferences",
      "Discuss logo placement, display duration, co-organized activities",
      "Exchange about transparent reporting and regular updates",
    ],
    purpose_vi:
      "Đảm bảo hai bên hiểu rõ, đồng thuận và cảm thấy thoải mái trước khi chính thức tài trợ. Xây dựng nền tảng tin cậy cho mối quan hệ đối tác lâu dài.",
    purpose_en:
      "Ensure both parties understand clearly, agree, and feel comfortable before official sponsorship. Build a foundation of trust for long-term partnership.",
  },
  {
    step: 4,
    title_vi: "Xác nhận tài trợ & thống nhất điều khoản",
    title_en: "Sponsorship Confirmation & Terms Agreement",
    content_vi: "Chốt lại nội dung hợp tác và cam kết chính thức.",
    content_en: "Finalize collaboration content and official commitments.",
    details_vi: [
      "Xác nhận qua biên bản ghi nhớ (MOU) hoặc email chính thức",
      "Ghi rõ: Mức tài trợ, hình thức (tiền mặt/hiện vật), thời gian thực hiện",
      "Liệt kê quyền lợi kèm theo: Logo placement, truyền thông, sự kiện",
      "Cam kết minh bạch: Báo cáo sử dụng nguồn tài trợ, cập nhật tiến độ",
      "Thời gian áp dụng: Trong mùa giải nào, hoạt động nào",
    ],
    details_en: [
      "Confirm via Memorandum of Understanding (MOU) or official email",
      "Clearly state: Sponsorship amount, form (cash/in-kind), implementation time",
      "List accompanying benefits: Logo placement, media, events",
      "Transparency commitment: Report on fund usage, progress updates",
      "Application period: Which season, which activities",
    ],
    purpose_vi:
      "Tạo cơ sở pháp lý rõ ràng, tránh hiểu nhầm về sau. Đảm bảo cả hai bên đều có tài liệu tham khảo chính thức về thỏa thuận tài trợ.",
    purpose_en:
      "Create clear legal basis, avoid future misunderstandings. Ensure both parties have official reference documents about the sponsorship agreement.",
  },
  {
    step: 5,
    title_vi: "Thực hiện tài trợ & bàn giao",
    title_en: "Execute Sponsorship & Handover",
    content_vi: "Doanh nghiệp tiến hành tài trợ theo thỏa thuận.",
    content_en: "Company proceeds with sponsorship according to agreement.",
    details_vi: [
      "Trao tài trợ trực tiếp (tiền mặt/hiện vật) hoặc chuyển khoản",
      "Chuyển khoản qua tài khoản của đội hoặc trường (nếu áp dụng)",
      "Đội gửi biên nhận hoặc xác nhận đã nhận tài trợ",
      "Lưu giữ chứng từ giao dịch để đảm bảo minh bạch",
      "Bắt đầu triển khai các hoạt động đã cam kết",
    ],
    details_en: [
      "Direct sponsorship handover (cash/in-kind) or bank transfer",
      "Transfer to team or school account (if applicable)",
      "Team sends receipt or confirmation of received sponsorship",
      "Keep transaction documents to ensure transparency",
      "Begin implementing committed activities",
    ],
    purpose_vi:
      "Hoàn tất giao dịch tài chính một cách rõ ràng, có chứng từ xác nhận. Đảm bảo quy trình chuyên nghiệp và minh bạch từ đầu đến cuối.",
    purpose_en:
      "Complete financial transaction clearly with confirmation documents. Ensure professional and transparent process from start to finish.",
  },
  {
    step: 6,
    title_vi: "Ghi nhận & triển khai quyền lợi truyền thông",
    title_en: "Acknowledgment & Media Benefits Implementation",
    content_vi: "Đội triển khai các quyền lợi đã cam kết với doanh nghiệp.",
    content_en: "Team implements committed benefits for the company.",
    details_vi: [
      "Cập nhật logo doanh nghiệp lên robot, áo đội, banner, website",
      "Thực hiện bài đăng cảm ơn, gắn logo, tag fanpage/website doanh nghiệp",
      "Nhắc tên doanh nghiệp tại các sự kiện, video recap, workshop",
      "Gửi báo cáo ngắn sau từng mốc quan trọng (thi đấu, hoạt động cộng đồng)",
      "Duy trì liên lạc thường xuyên và cập nhật thành tích",
    ],
    details_en: [
      "Update company logo on robot, team uniforms, banners, website",
      "Create thank you posts, attach logo, tag company fanpage/website",
      "Mention company at events, video recaps, workshops",
      "Send brief reports after important milestones (competitions, community activities)",
      "Maintain regular contact and achievement updates",
    ],
    purpose_vi:
      "Đảm bảo doanh nghiệp nhận được giá trị truyền thông tương xứng với phần tài trợ. Xây dựng mối quan hệ lâu dài, tạo cơ hội đồng hành cho các mùa giải tiếp theo.",
    purpose_en:
      "Ensure company receives media value commensurate with sponsorship. Build long-term relationships, create opportunities for partnership in future seasons.",
  },
] as const;

// ========== Personal Stepper (4 Steps) ==========

export const personalSteps: readonly SponsorshipStep[] = [
  {
    step: 1,
    title_vi: "Quét QR để ủng hộ",
    title_en: "Scan QR to Donate",
    content_vi:
      "Cá nhân chọn mức ủng hộ phù hợp với khả năng của mình.",
    content_en: "Individuals choose donation amount suitable to their ability.",
    details_vi: [
      "Mở app ngân hàng trên điện thoại",
      "Chọn chức năng quét QR code",
      "Quét mã QR hiển thị trên trang tài trợ",
      "Nhập số tiền muốn ủng hộ (không giới hạn mức tối thiểu)",
      "Kiểm tra thông tin tài khoản nhận",
    ],
    details_en: [
      "Open banking app on phone",
      "Select QR code scanning function",
      "Scan QR code displayed on sponsorship page",
      "Enter desired donation amount (no minimum limit)",
      "Verify recipient account information",
    ],
    purpose_vi:
      "Đơn giản hóa tối đa thao tác, để người ủng hộ chỉ cần vài chạm là có thể hoàn tất việc ủng hộ một cách nhanh chóng và tiện lợi.",
    purpose_en:
      "Maximize simplicity so donors can complete donation with just a few taps quickly and conveniently.",
  },
  {
    step: 2,
    title_vi: "Ghi nội dung chuyển khoản",
    title_en: "Enter Transfer Note",
    content_vi: "Ghi chú giúp đội nhận diện được người ủng hộ.",
    content_en: "Note helps team identify the donor.",
    details_vi: [
      "Nội dung gợi ý: 'Ho ten - Ung ho Robotics Soc Son'",
      "Ví dụ: 'Nguyen Van A - Ung ho Robotics Soc Son'",
      "Nếu muốn ẩn danh: 'An danh - Ung ho Robotics Soc Son'",
      "Xác nhận thông tin và hoàn tất chuyển khoản",
      "Lưu lại mã giao dịch để đối chiếu (nếu cần)",
    ],
    details_en: [
      "Suggested note: 'Full name - Support Robotics Soc Son'",
      "Example: 'Nguyen Van A - Support Robotics Soc Son'",
      "For anonymous: 'Anonymous - Support Robotics Soc Son'",
      "Confirm information and complete transfer",
      "Save transaction code for verification (if needed)",
    ],
    purpose_vi:
      "Giúp đội có thể ghi nhận chính xác và tôn trọng mong muốn riêng của từng người ủng hộ, dù là công khai tên hay giữ ẩn danh.",
    purpose_en:
      "Help team accurately acknowledge and respect each donor's preference, whether publicly named or anonymous.",
  },
  {
    step: 3,
    title_vi: "Đội xác nhận & ghi nhận ủng hộ",
    title_en: "Team Confirms & Acknowledges Donation",
    content_vi: "Đội kiểm tra giao dịch và cập nhật danh sách ủng hộ.",
    content_en: "Team verifies transaction and updates donor list.",
    details_vi: [
      "Đội đối chiếu sao kê ngân hàng định kỳ (1-2 lần/tuần)",
      "Ghi nhận số tiền, thời gian, nội dung chuyển khoản",
      "Cập nhật vào danh sách ủng hộ nội bộ",
      "Với các khoản lớn, đội có thể gửi lời cảm ơn trực tiếp (nếu có thông tin)",
      "Đảm bảo mọi khoản đều được ghi lại đầy đủ",
    ],
    details_en: [
      "Team checks bank statements periodically (1-2 times/week)",
      "Record amount, time, transfer note",
      "Update internal donor list",
      "For large donations, team may send direct thanks (if contact info available)",
      "Ensure all donations are fully recorded",
    ],
    purpose_vi:
      "Thể hiện sự trân trọng với mỗi khoản ủng hộ, đồng thời đảm bảo mọi đóng góp đều được ghi nhận chính xác và minh bạch.",
    purpose_en:
      "Show appreciation for each donation while ensuring all contributions are accurately and transparently recorded.",
  },
  {
    step: 4,
    title_vi: "Công khai tổng hợp & minh bạch sử dụng",
    title_en: "Public Summary & Transparent Usage",
    content_vi:
      "Công bố tổng quan về số tiền ủng hộ từ cộng đồng và cách sử dụng.",
    content_en:
      "Announce overview of community donations and how they're used.",
    details_vi: [
      "Định kỳ đăng bài công bố tổng số tiền ủng hộ đã nhận được",
      "Liệt kê các hạng mục đã/đang sử dụng (linh kiện, phí thi đấu, hoạt động STEM)",
      "Ghi tên những người đồng ý công khai trong danh sách 'Nhà ủng hộ'",
      "Giữ ẩn danh cho người không muốn xuất hiện",
      "Gửi báo cáo chi tiết khi được yêu cầu",
    ],
    details_en: [
      "Periodically post announcements of total donations received",
      "List items used/being used (components, competition fees, STEM activities)",
      "Acknowledge those who agree to be publicly listed as 'Supporters'",
      "Keep anonymous those who prefer not to appear",
      "Send detailed reports when requested",
    ],
    purpose_vi:
      "Giữ vững niềm tin và sự minh bạch, để cộng đồng thấy rằng mỗi khoản đóng góp đều thật sự được sử dụng đúng mục đích và tạo ra thay đổi tích cực.",
    purpose_en:
      "Maintain trust and transparency so the community sees that each contribution is truly used for its intended purpose and creates positive change.",
  },
] as const;

// ========== Terms & Conditions ==========

export interface SponsorshipTerms {
  readonly team_commitments_vi: readonly string[];
  readonly team_commitments_en: readonly string[];
  readonly sponsor_notes_vi: readonly string[];
  readonly sponsor_notes_en: readonly string[];
}

export const sponsorshipTerms: SponsorshipTerms = {
  team_commitments_vi: [
    "Sử dụng mọi khoản tài trợ đúng mục đích, ưu tiên cho robot, phí thi đấu và các hoạt động STEM cộng đồng",
    "Không sử dụng nguồn tài trợ cho các hoạt động trái pháp luật, trái đạo đức hoặc không liên quan đến giáo dục",
    "Cung cấp thông tin minh bạch, báo cáo tổng hợp khi được yêu cầu hoặc theo từng giai đoạn",
    "Ghi nhận và tôn trọng mọi hình thức tài trợ, dù lớn hay nhỏ",
  ],
  team_commitments_en: [
    "Use all sponsorship funds properly, prioritizing robot, competition fees, and STEM community activities",
    "Not use sponsorship funds for illegal, unethical, or non-educational activities",
    "Provide transparent information and summary reports when requested or by phase",
    "Acknowledge and respect all forms of sponsorship, large or small",
  ],
  sponsor_notes_vi: [
    "Cung cấp thông tin chính xác khi đăng ký tài trợ doanh nghiệp",
    "Tôn trọng hình ảnh và nhân sự đội trong các nội dung truyền thông do mình tự sản xuất",
    "Liên hệ trực tiếp với đội nếu có thắc mắc về quy trình hoặc sử dụng nguồn tài trợ",
  ],
  sponsor_notes_en: [
    "Provide accurate information when registering corporate sponsorship",
    "Respect team's image and personnel in self-produced media content",
    "Contact team directly if there are questions about process or fund usage",
  ],
} as const;

// ========== Page Headers ==========
// Note: sponsorPageHeader is now defined in sponsorPage.ts

