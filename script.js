// Kiểm tra và khởi tạo biến từ LocalStorage
let points = localStorage.getItem("points") ? parseInt(localStorage.getItem("points")) : 0;
let clicksLeft = localStorage.getItem("clicksLeft") ? parseInt(localStorage.getItem("clicksLeft")) : 10;

// Chờ trang tải xong rồi mới gán sự kiện
document.addEventListener("DOMContentLoaded", function () {
    // Gán sự kiện cho các nút
    document.getElementById("clickButton").addEventListener("click", clickMoney);
    document.getElementById("watchAd").addEventListener("click", watchAd);
    document.getElementById("doubleClicks").addEventListener("click", watchDoubleAd);
    document.getElementById("redeemCard").addEventListener("click", redeemCard);

    // Cập nhật giao diện
    updateUI();
});

// Hàm xử lý click kiếm tiền
function clickMoney() {
    if (clicksLeft > 0) {
        points += 100; // Mỗi lần click nhận 100 điểm
        clicksLeft--; // Giảm số lượt click
        updateUI();
    } else {
        alert("Bạn đã hết lượt click, hãy xem quảng cáo để tiếp tục!");
    }
}

// Hàm xem quảng cáo để nhận lại 10 lượt click
function watchAd() {
    alert("Bạn đã xem quảng cáo! Lượt click được reset lại 10.");
    clicksLeft = 10;
    updateUI();
}

// Hàm xem 2 quảng cáo để nhân đôi lượt click lên 20
function watchDoubleAd() {
    alert("Bạn đã xem quảng cáo lần 1!");
    alert("Bạn đã xem quảng cáo lần 2! Lượt click x2 thành 20.");
    clicksLeft = 20;
    updateUI();
}

// Hàm đổi điểm lấy thẻ cào 20k
function redeemCard() {
    if (points >= 10000) {
        points -= 10000;
        alert("Bạn đã đổi thẻ 20k thành công!");
        updateUI();
    } else {
        alert("Bạn không đủ điểm để đổi thẻ!");
    }
}

// Hàm cập nhật giao diện và lưu dữ liệu vào LocalStorage
function updateUI() {
    document.getElementById("points").innerText = `Số điểm: ${points}`;
    document.getElementById("clicksLeft").innerText = `Lượt click còn lại: ${clicksLeft}`;

    // Lưu vào LocalStorage để không bị mất khi tải lại trang
    localStorage.setItem("points", points);
    localStorage.setItem("clicksLeft", clicksLeft);

    // Nếu hết lượt click thì disable nút
    document.getElementById("clickButton").disabled = clicksLeft === 0;
}
