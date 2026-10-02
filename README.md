# Ăn gì? — Food Drop Vol. 02

[Mở website](https://junndung.github.io/an-gi-food-gacha/)

Web gacha chọn đồ ăn tiếng Việt: 3 bữa, 24 món, ảnh chụp thật có ghi nguồn.

## Tính năng

- Mở hòm với dải thẻ giảm tốc, tiếng kim qua từng thẻ, âm mở khóa và hợp âm báo kết quả.
- Chế độ Ngẫu nhiên: xác suất bằng nhau giữa các món đang bật.
- Chế độ Khám phá: mỗi món chỉ xuất hiện một lần trong một vòng; vòng mới bắt đầu sau khi thử hết các món đang bật. Bộ sưu tập độc lập với vòng quay.
- Bỏ món không thích; luôn giữ ít nhất một món mỗi bữa. Xác suất lượt tiếp theo hiển thị trên từng thẻ.
- Quay nhanh, bỏ qua hiệu ứng (giữ nguyên kết quả), âm lượng và tắt/bật âm thanh.
- Bộ sưu tập 24 món và 4 danh hiệu; lịch sử giữ tối đa 20 lượt, hiển thị 6 lượt gần nhất.
- Sao chép món và link tìm quán; tìm trên Google Maps theo GPS hoặc khu vực nhập tay.
- Tôn trọng reduced motion; dùng bàn phím được; hiển thị trên điện thoại và máy tính.

## Chạy & triển khai

HTML/CSS/JavaScript thuần, không cần npm hay backend. Repository GitHub đặt các tệp web tại gốc; bản ZIP có thư mục `dist` chứa các tệp tương ứng. Mở `index.html` hoặc phục vụ qua localhost.

GitHub Pages đang dùng **Deploy from a branch → main → / (root)**. Commit thay đổi vào `main` sẽ tự xuất bản. Bản ZIP kèm workflow nếu muốn dùng GitHub Actions với thư mục `dist`.

## Dữ liệu & quyền riêng tư

`localStorage` lưu thiết lập, món loại bỏ, vòng khám phá, bộ sưu tập và lịch sử trên thiết bị. Nếu lưu trữ bị chặn, trang vẫn hoạt động trong phiên. Không đăng nhập, thanh toán hay tiền thật. Màu thẻ chỉ phân nhóm món, không làm thay đổi xác suất.

GPS yêu cầu HTTPS/localhost và chỉ hỏi sau khi bấm nút. Tọa độ chỉ ở trong bộ nhớ, không lưu; khi người dùng tìm quán hoặc sao chép link tìm quán, tọa độ nằm trong truy vấn Google Maps. Nhập khu vực sẽ ưu tiên khu vực đó. Không dùng API key, không tự tạo danh sách quán.

## Ảnh & âm thanh

24 ảnh chụp Wikimedia Commons được thu nhỏ, cắt khung và ghép vào `food-photos.jpg` (~590 KB). Tác giả, nguồn và giấy phép từng ảnh nằm trong [credits.html](./credits.html). Mỗi ảnh giữ giấy phép tương ứng; ảnh chỉ minh họa món ăn.

`audio.js` tổng hợp âm thanh riêng bằng Web Audio API, không dùng mẫu âm thanh của CS2. Chỉ phát sau tương tác của người dùng. Font Be Vietnam Pro tải từ Google Fonts, có font hệ thống dự phòng.

## Kiểm tra

Kiểm tra logic: 237 lượt quay, các vòng không lặp, loại món/giữ món cuối, khớp thẻ trúng, chống bấm kép, bỏ qua hiệu ứng, dữ liệu lưu lỗi hoặc bị chặn, bộ sưu tập/lịch sử, truy vấn Maps và đủ 24 nguồn ảnh.

Kiểm tra trình duyệt: quay thường/quay nhanh, bộ sưu tập, lưu sau reload, nguồn tìm quán; bố cục 390px và 1360px. Không có lỗi JavaScript trong các luồng đã thử. Quyền GPS thật phụ thuộc thiết bị và trình duyệt của người dùng.
