// Lấy ngày hiện tại
function getCurrentDate() {
    let today = new Date();
    return today.toISOString().split('T')[0]; // YYYY-MM-DD
}

// Lưu dữ liệu vào LocalStorage
let points = localStorage.getItem("points") ? parseInt(localStorage.getItem("points")) : 0;
let lastClaimDate = localStorage.getItem("lastClaimDate") || "";
let clicksLeft = localStorage.getItem("clicksLeft") ? parseInt(localStorage.getItem("clicksLeft")) : 0;
let vipLevel = localStorage.getItem("vipLevel") ? parseInt(localStorage.getItem("vipLevel")) : 0; 
let adWatchedForWithdraw = localStorage.getItem("adWatchedForWithdraw") ? parseInt(localStorage.getItem("adWatchedForWithdraw")) : 0;
let autoClickActive = false;

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
    document.getElementById("autoClick").addEventListener("click", startAutoClick);
    document.getElementById("watchAdsForWithdraw").addEventListener("click", watchAdsForWithdraw);
    document.getElementById("redeemCard").addEventListener("click", redeemCard);
    
    updateUI();
});

// Hàm click nhận tiền
function clickMoney() {
    if (clicksLeft > 0) {
        let earnAmount = 10; // Mặc định người thường nhận 10 đồng

        if (vipLevel === 1) earnAmount = 15; // VIP Cơ Bản
        if (vipLevel === 2) earnAmount = 20; // VIP Cao Cấp
        if (vipLevel === 3) earnAmount = 50; // VIP Đặc Biệt

        points += earnAmount;
        clicksLeft -= 1; 
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

    let autoClickDuration = vipLevel === 3 ? 60 : 30; // VIP Đặc Biệt có Auto Click 60 phút

    setTimeout(() => {
        autoClickActive = false;
        clearInterval(autoClickInterval);
        alert("Auto Click đã hết hạn!");
    }, autoClickDuration * 60 * 1000); // Dừng sau X phút
}

// Hàm xem 5 lần quảng cáo để rút tiền
function watchAdsForWithdraw() {
    if (vipLevel === 3) {
        alert("VIP Đặc Biệt không cần xem quảng cáo để rút tiền!");
        adWatchedForWithdraw = 5;
    } else {
        if (adWatchedForWithdraw < 5) {
            adWatchedForWithdraw++;
            localStorage.setItem("adWatchedForWithdraw", adWatchedForWithdraw);
            alert(`Bạn đã xem ${adWatchedForWithdraw}/5 quảng cáo. Xem đủ 5 lần để rút tiền.`);
        }
    }

    if (adWatchedForWithdraw >= 5) {
        alert("Bạn đã đủ điều kiện rút tiền!");
        document.getElementById("redeemCard").disabled = false;
    }
}

// Hàm đổi thẻ cào
function redeemCard() {
    if (points >= 10000) {
        points -= 10000;
        alert("Bạn đã đổi thành công thẻ 20k!");
        adWatchedForWithdraw = 0; 
        localStorage.setItem("adWatchedForWithdraw", adWatchedForWithdraw);
        updateUI();
    } else {
        alert("Bạn chưa đủ 10,000 điểm để đổi thẻ!");
    }
}

// Hàm mua VIP
function buyVip(level) {
    let cost = [0, 100000, 200000, 500000][level];
    if (confirm(`Bạn có chắc muốn mua gói VIP ${level} với giá ${cost} VNĐ không?`)) {
        vipLevel = level;
        localStorage.setItem("vipLevel", vipLevel);
        updateUI();
    }
}

// Hàm cập nhật giao diện và lưu dữ liệu
function updateUI() {
    document.getElementById("points").innerText = `Số điểm: ${points}`;
    document.getElementById("clicksLeft").innerText = `Lượt click còn lại: ${clicksLeft}`;
    document.getElementById("vipStatus").innerText = `Gói VIP: ${vipLevel}`;
}
