// Khởi tạo biến
let points = localStorage.getItem("points") ? parseInt(localStorage.getItem("points")) : 0;
let clicksLeft = localStorage.getItem("clicksLeft") ? parseInt(localStorage.getItem("clicksLeft")) : 10;

// Chờ khi tài liệu được tải xong rồi mới gán sự kiện
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("clickButton").addEventListener("click", clickMoney);
    document.getElementById("watchAd").addEventListener("click", watchAd);
    document.getElementById("doubleClicks").addEventListener("click", watchDoubleAd);
    document.getElementById("redeemCard").addEventListener("click", redeemCard);

    // Cập nhật UI khi tải trang
    updateUI();
});

function clickMoney() {
    if (clicksLeft > 0) {
        points += 100;
        clicksLeft--;
        updateUI();
    } else {
        alert("Bạn đã hết lượt click, hãy xem quảng cáo để tiếp tục!");
    }
}

function watchAd() {
    alert("Bạn đã xem quảng cáo!");
    clicksLeft = 10;
    updateUI();
}

function watchDoubleAd() {
    alert("Bạn đã xem quảng cáo lần 1!");
    alert("Bạn đã xem quảng cáo lần 2!");
    clicksLeft = 20;
    updateUI();
}

function redeemCard() {
    if (points >= 10000) {
        points -= 10000;
        alert("Bạn đã đổi thẻ 20k thành công!");
        updateUI();
    } else {
        alert("Bạn không đủ điểm để đổi thẻ!");
    }
}

function updateUI() {
    document.getElementById("points").innerText = `Số điểm: ${points}`;
    document.getElementById("clicksLeft").innerText = `Lượt click còn lại: ${clicksLeft}`;

    // Lưu dữ liệu vào LocalStorage
    localStorage.setItem("points", points);
    localStorage.setItem("clicksLeft", clicksLeft);
}
