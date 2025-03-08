// Khởi tạo biến và lấy dữ liệu từ LocalStorage
let points = parseInt(localStorage.getItem("points")) || 0;
let clicksLeft = parseInt(localStorage.getItem("clicksLeft")) || 10;

// Chờ trang tải xong rồi mới gán sự kiện
document.addEventListener("DOMContentLoaded", function () {
    // Gán sự kiện cho các nút
    document.getElementById("clickButton").addEventListener("click", clickMoney);
    document.getElementById("watchAd").addEventListener("click", watchAd);
    document.getElementById("doubleClicks").addEventListener("click", watchDoubleAd);
    document.getElementById("redeemCard").addEventListener("click", redeemCard);

    // Cập nhật UI ngay khi tải trang
    updateUI();
});

// Hàm xử lý click kiếm tiền
function clickMoney() {
    if (clicksLeft > 0) {
        points += 100; // Mỗi click được 100 điểm
        clicksLeft--;
        updateUI();
    } else {
        alert("Bạn đã hết lượt click, hãy xem quảng cáo để tiếp tục!");
    }
}

// Hàm xử lý xem quảng cáo để nhận thêm lượt click
function watchAd() {
    alert("Bạn đã xem quảng cáo! Lượt click được reset lại 10.");
    clicksLeft = 10;
    updateUI();
}

// Hàm xử lý xem 2 quảng cáo để nhân đôi lượt click
function watchDoubleAd() {
    alert("Bạn đã xem quảng cáo lần 1!");
    alert("Bạn đã xem quảng cáo lần 2! Lượt click x2 thành 20.");
    clicksLeft = 20;
    updateUI();
}

// Hàm xử lý đổi điểm lấy thẻ cào
function redeemCard() {
    if (points >= 10000) {
        points -= 10000;
        alert("Bạn đã đổi thẻ 20k thành công!");
        updateUI();
    } else {
        alert("Bạn không đủ điểm để đổi thẻ!");
    }
}

// Hàm cập nhật UI và lưu dữ liệu vào LocalStorage
function updateUI() {
    document.getElementById("points").innerText = `Số điểm: ${points}`;
    document.getElementById("clicksLeft").innerText = `Lượt click còn lại: ${clicksLeft}`;

    // Lưu dữ liệu vào LocalStorage để không mất khi tải lại trang
    localStorage.setItem("points", points);
    localStorage.setItem("clicksLeft", clicksLeft);
}
