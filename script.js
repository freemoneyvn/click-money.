let points = 0;
let clicksLeft = 10;
let withdrawAds = 0;
let vipMultiplier = 1;
let usedPromoCode = false;

document.getElementById("points").innerText = points;
document.getElementById("clicks").innerText = clicksLeft;

function clickMoney() {
    if (clicksLeft > 0) {
        points += 10 * vipMultiplier;
        clicksLeft--;
        updateUI();
    } else {
        alert("Hết lượt click! Xem quảng cáo để nhận thêm.");
    }
}

function watchAd() {
    alert("Xem quảng cáo xong, bạn nhận được 10 lượt click!");
    clicksLeft += 10;
    updateUI();
}

function enableAutoClick() {
    alert("Xem quảng cáo để kích hoạt auto click trong 30 phút!");
    let interval = setInterval(() => {
        if (clicksLeft > 0) {
            clickMoney();
        }
    }, 3000);

    setTimeout(() => {
        clearInterval(interval);
        alert("Auto click đã hết hiệu lực.");
    }, 1800000); // 30 phút
}

function watchAdForWithdraw() {
    if (withdrawAds < 5) {
        alert("Xem quảng cáo để đủ điều kiện rút tiền!");
        withdrawAds++;
        document.getElementById("withdraw-ads").innerText = withdrawAds;
        if (withdrawAds >= 5) {
            document.getElementById("withdraw-btn").disabled = false;
        }
    }
}

function withdrawMoney() {
    if (points >= 10000) {
        points -= 10000;
        alert("Bạn đã đổi thành công thẻ cào 20K!");
        updateUI();
    } else {
        alert("Bạn không đủ điểm để rút tiền!");
    }
}

function buyVip(price, multiplier) {
    let confirmPurchase = confirm(`Bạn có muốn mua gói VIP này với giá ${price} không?`);
    if (confirmPurchase) {
        vipMultiplier = multiplier;
        document.getElementById("vip-status").innerText = `VIP x${multiplier}`;
        alert("Bạn đã mua VIP thành công!");
    }
}

function redeemCode() {
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
}

function updateUI() {
    document.getElementById("points").innerText = points;
    document.getElementById("clicks").innerText = clicksLeft;
}
