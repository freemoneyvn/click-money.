// Lấy dữ liệu từ LocalStorage
let points = localStorage.getItem("points") ? parseInt(localStorage.getItem("points")) : 0;
let clicksLeft = localStorage.getItem("clicksLeft") ? parseInt(localStorage.getItem("clicksLeft")) : 10;

document.getElementById("clickButton").addEventListener("click", () => {
    if (clicksLeft > 0) {
        points += 100;
        clicksLeft--;
        updateUI();
    } else {
        alert("Bạn đã hết lượt click, hãy xem quảng cáo để tiếp tục!");
    }
});

document.getElementById("watchAd").addEventListener("click", () => {
    alert("Bạn đã xem quảng cáo!");
    clicksLeft = 10;
    updateUI();
});

document.getElementById("doubleClicks").addEventListener("click", () => {
    alert("Bạn đã xem quảng cáo lần 1!");
    alert("Bạn đã xem quảng cáo lần 2!");
    clicksLeft = 20;
    updateUI();
});

document.getElementById("redeemCard").addEventListener("click", () => {
    if (points >= 10000) {
        points -= 10000;
        alert("Bạn đã đổi thẻ 20k thành công!");
        updateUI();
    } else {
        alert("Bạn không đủ điểm để đổi thẻ!");
    }
});

function updateUI() {
    document.getElementById("points").innerText = `Số điểm: ${points}`;
    document.getElementById("clicksLeft").innerText = `Lượt click còn lại: ${clicksLeft}`;
    
    // Lưu dữ liệu vào LocalStorage
    localStorage.setItem("points", points);
    localStorage.setItem("clicksLeft", clicksLeft);
}

// Cập nhật giao diện khi tải lại trang
updateUI();
