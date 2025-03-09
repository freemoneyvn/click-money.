let balance = 0;  // Số tiền hiện có
let clicks = 10;  // Lượt click còn lại
const clickSound = new Audio("/assets/audio/computer-keyboard-typing-290582.mp3");

document.getElementById("click-btn").addEventListener("click", function () {
    if (clicks > 0) {
        balance += 50; // Mỗi lần click nhận 50 đồng
        clicks--;
        clickSound.play(); // Phát âm thanh khi click
        updateUI();
    } else {
        alert("Hết lượt click! Hãy xem quảng cáo để nhận thêm.");
    }
});

document.getElementById("watch-ad-btn").addEventListener("click", function () {
    alert("Bạn phải xem quảng cáo để nhận thêm lượt click.");
    // Giả lập xem quảng cáo thành công
    setTimeout(() => {
        clicks += 10; // Xem quảng cáo nhận 10 lượt click
        updateUI();
        alert("Bạn đã nhận thêm 10 lượt click!");
    }, 3000); // Giả lập quảng cáo 3 giây
});

document.getElementById("withdraw-btn").addEventListener("click", function () {
    if (balance >= 10000) {
        alert("Bạn phải xem 5 quảng cáo trước khi rút tiền!");
        let adsWatched = 0;
        
        function watchAd() {
            if (adsWatched < 5) {
                alert(`Xem quảng cáo ${adsWatched + 1}/5`);
                setTimeout(() => {
                    adsWatched++;
                    watchAd();
                }, 3000);
            } else {
                alert("Bạn đã xem đủ quảng cáo! Chuyển đến trang rút tiền.");
                window.location.href = "/public/withdraw.html"; // Chuyển sang trang rút tiền
            }
        }
        
        watchAd();
    } else {
        alert("Bạn chưa đủ tiền để rút.");
    }
});

function updateUI() {
    document.getElementById("balance").innerText = balance;
    document.getElementById("clicks").innerText = clicks;
}
