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
