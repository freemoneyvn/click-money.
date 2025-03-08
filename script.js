// Lấy ngày hiện tại
function getCurrentDate() {
    let today = new Date();
    return today.toISOString().split('T')[0]; // YYYY-MM-DD
}

// Khởi tạo biến từ LocalStorage hoặc mặc định
let points = localStorage.getItem("points") ? parseInt(localStorage.getItem("points")) : 0;
let lastClaimDate = localStorage.getItem("lastClaimDate") || ""; // Ngày nhận lượt miễn phí
let clicksLeft = localStorage.getItem("clicksLeft") ? parseInt(localStorage.getItem("clicksLeft")) : 0;

// Nếu sang ngày mới, reset lượt miễn phí
if (lastClaimDate !== getCurrentDate()) {
    clicksLeft += 10; // Thêm 10 lượt miễn phí mỗi ngày
    lastClaimDate = getCurrentDate();
    localStorage.setItem("lastClaimDate", lastClaimDate);
}

// Chờ trang tải xong
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("clickButton").addEventListener("click", clickMoney);
    document.getElementById("watchAd").addEventListener("click", watchAd);
    document.getElementById("redeemCard").addEventListener("click", redeemCard);
    updateUI();
});

// Hàm click nhận tiền
function clickMoney() {
    if (clicksLeft > 0) {
        points += 50; // Mỗi lần click kiếm 50 đồng
        clicksLeft--;
        updateUI();
    } else {
        alert("Hết lượt click! Hãy xem quảng cáo để nhận thêm.");
    }
}

// Hàm xem quảng cáo để nhận thêm 10 lượt click
function watchAd() {
    alert("Bạn đã xem quảng cáo! +10 lượt click.");
    clicksLeft += 10;
    updateUI();
}

// Hàm đổi thẻ cào
function redeemCard() {
    if (points >= 10000) {
        points -= 10000;
        alert("Bạn đã đổi thành công thẻ 20k!");
        updateUI();
    } else {
        alert("Bạn chưa đủ 10,000 đồng để đổi thẻ!");
    }
}

// Hàm cập nhật giao diện và lưu dữ liệu
function updateUI() {
    document.getElementById("points").innerText = `Số điểm: ${points}`;
    document.getElementById("clicksLeft").innerText = `Lượt click còn lại: ${clicksLeft}`;

    // Lưu dữ liệu vào LocalStorage
    localStorage.setItem("points", points);
    localStorage.setItem("clicksLeft", clicksLeft);
}
