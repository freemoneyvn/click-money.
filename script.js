let balance = 0;
let clicks = 10;

document.getElementById("click-btn").addEventListener("click", function () {
    if (clicks > 0) {
        balance += 50; // Mỗi lần click nhận 50 đồng
        clicks--;
        updateUI();
    } else {
        alert("Hết lượt click! Hãy xem quảng cáo để nhận thêm.");
    }
});

document.getElementById("watch-ad-btn").addEventListener("click", function () {
    clicks += 10; // Xem quảng cáo nhận thêm 10 lượt click
    updateUI();
});

document.getElementById("withdraw-btn").addEventListener("click", function () {
    if (balance >= 10000) {
        alert("Bạn đã đủ 10.000 đồng! Tiến hành rút tiền.");
        balance -= 10000; // Trừ số dư sau khi rút
        updateUI();
    } else {
        alert("Bạn chưa đủ tiền để rút.");
    }
});

function updateUI() {
    document.getElementById("balance").innerText = balance;
    document.getElementById("clicks").innerText = clicks;
}

