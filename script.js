document.addEventListener("DOMContentLoaded", function() {
    let points = 0;
    let clicksLeft = 10;
    let withdrawAds = 0;
    let vipMultiplier = 1;
    let usedPromoCode = false;

    function updateUI() {
        document.getElementById("points").innerText = points;
        document.getElementById("clicks").innerText = clicksLeft;
        document.getElementById("withdraw-ads").innerText = withdrawAds;
        document.getElementById("withdraw-btn").disabled = withdrawAds < 5 || points < 10000;
    }

    document.getElementById("click-btn").addEventListener("click", function() {
        if (clicksLeft > 0) {
            points += 10 * vipMultiplier;
            clicksLeft--;
            updateUI();
        } else {
            alert("Hết lượt click! Xem quảng cáo để nhận thêm.");
        }
    });

    document.getElementById("watch-ad-btn").addEventListener("click", function() {
        alert("Xem quảng cáo xong, bạn nhận được 10 lượt click!");
        clicksLeft += 10;
        updateUI();
    });

    document.getElementById("auto-click-btn").addEventListener("click", function() {
        alert("Xem quảng cáo để kích hoạt auto click trong 30 phút!");
        let interval = setInterval(() => {
            if (clicksLeft > 0) {
                points += 10 * vipMultiplier;
                clicksLeft--;
                updateUI();
            }
        }, 3000);

        setTimeout(() => {
            clearInterval(interval);
            alert("Auto click đã hết hiệu lực.");
        }, 1800000); // 30 phút
    });

    document.getElementById("watch-ad-withdraw-btn").addEventListener("click", function() {
        if (withdrawAds < 5) {
            alert("Xem quảng cáo để đủ điều kiện rút tiền!");
            withdrawAds++;
            updateUI();
        }
    });

    document.getElementById("withdraw-btn").addEventListener("click", function() {
        if (points >= 10000) {
            points -= 10000;
            alert("Bạn đã đổi thành công thẻ cào 20K!");
            updateUI();
        } else {
            alert("Bạn không đủ điểm để rút tiền!");
        }
    });

    document.getElementById("vip-basic").addEventListener("click", function() {
        buyVip(100000, 1.5, "VIP Cơ Bản");
    });

    document.getElementById("vip-premium").addEventListener("click", function() {
        buyVip(200000, 2, "VIP Cao Cấp");
    });

    document.getElementById("vip-special").addEventListener("click", function() {
        buyVip(500000, 3, "VIP Đặc Biệt");
    });

    function buyVip(price, multiplier, name) {
        let confirmPurchase = confirm(`Bạn có muốn mua ${name} với giá ${price} không?`);
        if (confirmPurchase) {
            vipMultiplier = multiplier;
            document.getElementById("vip-status").innerText = `${name} (x${multiplier})`;
            alert(`Bạn đã mua ${name} thành công!`);
        }
    }

    document.getElementById("redeem-code-btn").addEventListener("click", function() {
        let codeInput = document.getElementById("promo-code").value;
        if (codeInput === "vinhbosao" && !usedPromoCode) {
            points += 10000;
            usedPromoCode = true;
            alert("Bạn đã nhận được 10.000 điểm!");
            updateUI();
        } else if (usedPromoCode) {
            alert("Bạn đã nhập code này rồi!");
        } else {
            alert("Mã code không hợp lệ!");
        }
    });

    updateUI();
});
let points = 0;
let dailyClicks = 200; // Giới hạn click miễn phí mỗi ngày
let adBonusClicks = 0; // Click kiếm từ xem quảng cáo
let autoClickActive = false;

// Hàm click kiếm tiền
function clickToEarn() {
    if (dailyClicks > 0 || adBonusClicks > 0) {
        points += 5;
        document.getElementById("points").innerText = points;

        if (dailyClicks > 0) dailyClicks--;
        else if (adBonusClicks > 0) adBonusClicks--;

        document.getElementById("clicksLeft").innerText = dailyClicks;

        if ((dailyClicks + adBonusClicks) % 20 === 0) {
            alert("Bạn phải xem quảng cáo để tiếp tục click!");
            watchAd();
        }
    } else {
        alert("Bạn đã hết lượt click! Hãy xem quảng cáo để nhận thêm.");
    }
}

// Hàm xem quảng cáo để nhận thêm click
function watchAdForClicks() {
    watchAd();
    adBonusClicks += 10;
    alert("Bạn đã nhận thêm 10 click!");
}

// Hàm bật Auto Click
function enableAutoClick() {
    watchAd();
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
                alert("Auto click kết thúc! Xem quảng cáo để tiếp tục.");
            }
        }, 10000);
    }
}

// Hàm xem quảng cáo
function watchAd() {
    alert("Đang xem quảng cáo...");
    setTimeout(() => {
        alert("Quảng cáo hoàn tất!");
    }, 5000);
}

// Hàm rút tiền (phải xem 5 quảng cáo trước khi rút)
function withdraw() {
    let adCount = 0;
    let interval = setInterval(() => {
        if (adCount < 5) {
            watchAd();
            adCount++;
        } else {
            clearInterval(interval);
            if (points >= 10000) {
                alert("Bạn đã đổi được 10.000 đồng!");
                points -= 10000;
                document.getElementById("points").innerText = points;
            } else {
                alert("Bạn chưa đủ điểm để rút tiền.");
            }
        }
    }, 5000);
}
