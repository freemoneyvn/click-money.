let points = 0;
let dailyClicks = 200;
let adBonusClicks = 0;
let autoClickActive = false;
const clickSound = document.getElementById("clickSound");

// Click để kiếm tiền
function clickToEarn() {
    if (dailyClicks > 0 || adBonusClicks > 0) {
        points += 10;
        clickSound.play(); // Phát âm thanh
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

// Bật Auto Click (tối đa 30 phút/ngày)
function enableAutoClick() {
    showAd();
    if (!autoClickActive) {
        autoClickActive = true;
        let autoClicks = 180;
        let interval = setInterval(() => {
            if (autoClicks > 0) {
                points += 10;
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
    let options = {
        "1": 10000,
        "2": 20000,
        "3": 50000,
        "4": 100000
    };

    let choice = prompt("Chọn số tiền muốn rút:\n1. Thẻ 10K (10.000 điểm)\n2. Thẻ 20K (20.000 điểm)\n3. Thẻ 50K (50.000 điểm)\n4. Thẻ 100K (100.000 điểm)");

    if (!options[choice]) {
        alert("Lựa chọn không hợp lệ!");
        return;
    }

    let pointsNeeded = options[choice];

    if (points < pointsNeeded) {
        alert("Bạn không đủ điểm để rút thẻ này!");
        return;
    }

    let adCount = 0;
    let interval = setInterval(() => {
        if (adCount < 5) {
            showAd();
            adCount++;
        } else {
            clearInterval(interval);
            points -= pointsNeeded;
            document.getElementById("points").innerText = points;
            alert(`Bạn đã rút thành công thẻ ${pointsNeeded / 1000}K!`);
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

// Hiển thị quảng cáo
function showAd() {
    alert("Đang xem quảng cáo...");
    setTimeout(() => {
        alert("Quảng cáo hoàn tất!");
    }, 5000);
}
