export const IMG = {
  hero: "/images/beach-aerial.jpg",
  panorama: "/images/city-panorama.jpg",
  ponagar: "/images/ponagar.jpg",
  snorkel: "/images/snorkeling.jpg",
  island: "/images/island-boat.png",
};

export const MEMBERS = ["Kỳ Anh", "Minh Nhật", "Anh Thư", "Thanh Nguyên"];

export const AGENDA = [
  { n: "01", t: "MỞ ĐẦU", d: "Giới thiệu điểm đến & lý do chọn đề tài" },
  { n: "02", t: "THỰC TRẠNG DU LỊCH NHA TRANG", d: "Tiềm năng nổi bật & thách thức hiện nay" },
  { n: "03", t: "THIẾT KẾ TOUR", d: "Lịch trình 3 ngày 2 đêm & chi phí" },
  { n: "04", t: "KẾT LUẬN", d: "Tổng kết đề tài & đề xuất" },
];

export const FACTS = [
  { icon: "map", t: "Thành phố biển tỉnh Khánh Hòa — miền Trung Việt Nam" },
  { icon: "waves", t: "Vịnh Nha Trang — một trong những vịnh đẹp nhất thế giới" },
  { icon: "sun", t: "Nắng ấm quanh năm — hơn 300 ngày nắng mỗi năm" },
];

export const REASONS = [
  "Điểm đến gần gũi, nổi tiếng bậc nhất Việt Nam",
  "Chi phí hợp lý với học sinh — sinh viên",
  "Nhiều trải nghiệm: biển đảo, văn hóa, ẩm thực",
];

export const GOALS = [
  "Thiết kế tour 3N2Đ hợp lý, chi tiết",
  "Rèn kỹ năng lập kế hoạch du lịch",
  "Rèn kỹ năng làm việc nhóm",
];

export const STATS: { v: string; l: string; hot?: boolean; pre?: string }[] = [
  { v: "23,7 triệu", l: "lượt khách du lịch tổng", hot: true },
  { v: "9,4 triệu", l: "lượt khách quốc tế", pre: "hơn" },
  { v: "80.200 tỷ", l: "đồng doanh thu du lịch dự kiến", pre: "hơn" },
];

export const STATS_NOTE =
  "Đây là số liệu dự báo cho cả năm 2026, chưa phải kết quả tổng kết cuối năm.";

export const CHALLENGES = [
  { icon: "users", t: "Mùa cao điểm quá tải", d: "Đông khách vào hè và dịp lễ" },
  { icon: "shuffle", t: "Cạnh tranh mạnh", d: "Nhiều điểm biển mới nổi lên" },
  { icon: "card", t: "Giá dịch vụ biến động", d: "Tăng cao vào mùa du lịch" },
  { icon: "grid", t: "Sản phẩm chưa đa dạng", d: "Cần làm mới trải nghiệm" },
];

export const OVERVIEW: { icon: string; l: string; v: string; d?: string }[] = [
  { icon: "clock", l: "THỜI GIAN", v: "3 ngày 2 đêm" },
  { icon: "bus", l: "DI CHUYỂN", v: "Xe giường nằm · Máy bay" },
  { icon: "team", l: "ĐỐI TƯỢNG", v: "Học sinh – SV · Gia đình trẻ", d: "Đoàn 20–30 khách — giá theo đoàn" },
  { icon: "umbrella", l: "TRẢI NGHIỆM", v: "Biển đảo · Văn hóa · Ẩm thực" },
];

export const DAYS = [
  {
    tag: "NGÀY 1",
    t: "KHÁM PHÁ THÀNH PHỐ",
    img: IMG.ponagar,
    alt: "Tháp Bà Ponagar",
    items: ["Đón đoàn, nhận phòng", "Tháp Bà Ponagar — Chùa Long Sơn", "Tắm biển · Hải sản tối"],
  },
  {
    tag: "NGÀY 2",
    t: "DU THUYỀN ĐẢO",
    img: IMG.snorkel,
    alt: "Lặn ngắm san hô Hòn Mun",
    items: ["Hòn Mun — ngắm san hô", "Hòn Tằm — thể thao biển", "Chiều: Vinpearl · phố đi bộ"],
  },
  {
    tag: "NGÀY 3",
    t: "BIỂN & TẠM BIỆT",
    img: IMG.island,
    alt: "Vịnh Nha Trang với những chiếc thuyền",
    items: ["Bãi Dài — biển hoang sơ", "Chợ Đầm — mua đặc sản", "Tiễn đoàn, kết thúc tour"],
  },
];

export const COSTS = [
  { icon: "bus", t: "Vận chuyển khứ hồi", v: "900.000đ" },
  { icon: "ticket", t: "Vé VinWonders cả ngày", v: "1.000.000đ" },
  { icon: "waves", t: "Tour 3 đảo cano (gồm trưa)", v: "850.000đ" },
  { icon: "hotel", t: "Lưu trú 2 đêm — KS 2–3★", v: "500.000đ" },
  { icon: "food", t: "Ăn uống & vé tham quan", v: "750.000đ" },
  { icon: "save", t: "Dự phòng phát sinh", v: "200.000đ" },
];

export const COST_INCLUDES =
  "Vé vào cửa · Cano/tàu đảo · Xe đưa đón · Khách sạn · Hướng dẫn viên";

export const COST_NOTE =
  "Giá tham khảo theo bảng giá công khai 2025–2026 (VinWonders, tour đảo, khách sạn) — có thể thay đổi theo mùa và ưu đãi đoàn.";

export const CONCLUSIONS = [
  { icon: "city", t: "Nha Trang: điểm đến giàu tiềm năng, hút hàng chục triệu lượt khách mỗi năm", hot: false },
  { icon: "route", t: "Tour 3N2Đ: hành trình đặc trưng — trọn gói ~4,2 triệu đồng/người, minh bạch từng khoản", hot: true },
  { icon: "heart", t: "Bài học: lập kế hoạch chi tiết và làm việc nhóm hiệu quả", hot: false },
];
