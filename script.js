let points = 0;
let dailyClicks = 200;
let adBonusClicks = 0;
let autoClickActive = false;

// Click để kiếm tiền
function clickToEarn() {
    if (dailyClicks > 0 || adBonusClicks > 0) {
        points += 5;
        document.getElementById("points").innerText = points;

        if (dailyClicks > 0) dailyClicks--;
        else if (adBonusClicks > 0) adBonusClicks--;

        document.getElementById("clicksLeft").innerText = dailyClicks;

        if ((dailyClicks + adBonusClicks) % 20 === 0) {
            showAd();
        }
    } else {
        alert("Hết lượt! Hãy xem quảng cáo.");
    }
}

// Xem quảng cáo để nhận click
function watchAdForClicks() {
    showAd();
    adBonusClicks += 10;
    alert("Bạn đã nhận thêm 10 click!");
}

// Bật Auto Click (tối đa 1 giờ/ngày)
function enableAutoClick() {
    showAd();
    if (!autoClickActive) {
        autoClickActive = true;
        let autoClicks = 360;
        let interval = setInterval(() => {
            if (autoClicks > 0) {
                points += 5;
                document.getElementById("points").innerText = points;
                autoClicks--;
            } else {
                clearInterval(interval);
                autoClickActive = false;
                alert("Auto click hết hạn! Xem quảng cáo để tiếp tục.");
            }
        }, 10000);
    }
}

// Rút tiền (phải xem 5 quảng cáo trước)
function withdraw() {
    let adCount = 0;
    let interval = setInterval(() => {
        if (adCount < 5) {
            showAd();
            adCount++;
        } else {
            clearInterval(interval);
            if (points >= 10000) {
                alert("Bạn đã đổi được 10.000 đồng!");
                points -= 10000;
                document.getElementById("points").innerText = points;
            } else {
                alert("Bạn chưa đủ điểm.");
            }
        }
    }, 5000);
}

// Nhập mã thưởng
function redeemCode() {
    let code = prompt("Nhập mã:");
    if (code === "vinhbosao") {
        points += 10000;
        alert("Bạn nhận được 10.000 điểm!");
        document.getElementById("points").innerText = points;
    } else {
        alert("Mã không hợp lệ!");
    }
}
