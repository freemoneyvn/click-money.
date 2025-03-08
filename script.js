// Lấy ngày hiện tại
function getCurrentDate() {
    let today = new Date();
    return today.toISOString().split('T')[0]; // YYYY-MM-DD
}

// Khởi tạo biến từ LocalStorage hoặc mặc định
let points = localStorage.getItem("points") ? parseInt(localStorage.getItem("points")) : 0;
let lastClaimDate = localStorage.getItem("lastClaimDate") || ""; // Ngày nhận lượt miễn phí
let clicksLeft = localStorage.getItem("clicksLeft") ? parseInt(localStorage.getItem("clicksLeft")) : 0;
let isDoubleCost = localStorage.getItem("isDoubleCost") === "true"; // Nếu true, mỗi click trừ 2 lượt
let autoClickActive = false;
let adWatchedForWithdraw = localStorage.getItem("adWatchedForWithdraw") ? parseInt(localStorage.getItem("adWatchedForWithdraw")) : 0;

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
    document.getElementById("doubleClickCost").addEventListener("click", watchDoubleAd);
    document.getElementById("autoClick").addEventListener("click", startAutoClick);
    document.getElementById("redeemCard").addEventListener("click", redeemCard);
    updateUI();
});

// Hàm click nhận tiền
function clickMoney() {
    if (clicksLeft > 0) {
        points += 50; // Mỗi lần click kiếm 50 điểm
        clicksLeft -= isDoubleCost ? 2 : 1; // Nếu chế độ X2 bật, mỗi click tốn 2 lượt
        if (clicksLeft < 0) clicksLeft = 0;
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

// Hàm xem 2 quảng cáo để bật chế độ mỗi lần click trừ 2 lượt
function watchDoubleAd() {
    alert("Bạn đã xem quảng cáo lần 1!");
    alert("Bạn đã xem quảng cáo lần 2! Từ giờ mỗi click sẽ tốn 2 lượt.");
    isDoubleCost = true;
    updateUI();
}

// Hàm xem quảng cáo để bật Auto Click trong 30 phút
function startAutoClick() {
    alert("Bạn đã xem quảng cáo! Auto Click sẽ chạy trong 30 phút.");
    autoClickActive = true;

    let autoClickInterval = setInterval(() => {
        if (autoClickActive && clicksLeft > 0) {
            clickMoney();
        } else {
            clearInterval(autoClickInterval);
            autoClickActive = false;
        }
    }, 1000); // Auto click mỗi giây

    setTimeout(() => {
        autoClickActive = false;
        clearInterval(autoClickInterval);
        alert("Auto Click đã hết hạn!");
    }, 30 * 60 * 1000); // Dừng sau 30 phút
}

// Hàm xem 5 lần quảng cáo để rút tiền
function watchAdsForWithdraw() {
    if (adWatchedForWithdraw < 5) {
        adWatchedForWithdraw++;
        localStorage.setItem("adWatchedForWithdraw", adWatchedForWithdraw);
        alert(`Bạn đã xem ${adWatchedForWithdraw}/5 quảng cáo. Xem đủ 5 lần để rút tiền.`);
    }

    if (adWatchedForWithdraw >= 5) {
        alert("Bạn đã đủ điều kiện rút tiền!");
        document.getElementById("redeemCard").disabled = false;
    }
}

// Hàm đổi thẻ cào
function redeemCard() {
    if (adWatchedForWithdraw < 5) {
        alert("Bạn cần xem đủ 5 quảng cáo trước khi rút tiền!");
        return;
    }

    if (points >= 10000) {
        points -= 10000;
        alert("Bạn đã đổi thành công thẻ 20k!");
        adWatchedForWithdraw = 0; // Reset số lần xem quảng cáo sau khi rút tiền
        localStorage.setItem("adWatchedForWithdraw", adWatchedForWithdraw);
        updateUI();
    } else {
        alert("Bạn chưa đủ 10,000 điểm để đổi thẻ!");
    }
}

// Hàm cập nhật giao diện và lưu dữ liệu
function updateUI() {
    document.getElementById("points").innerText = `Số điểm: ${points}`;
    document.getElementById("clicksLeft").innerText = `Lượt click còn lại: ${clicksLeft}`;
    document.getElementById("withdrawProgress").innerText = `Quảng cáo đã xem để rút tiền: ${adWatchedForWithdraw}/5`;

    // Lưu dữ liệu vào LocalStorage
    localStorage.setItem("points", points);
    localStorage.setItem("clicksLeft", clicksLeft);
    localStorage.setItem("isDoubleCost", isDoubleCost);
}
