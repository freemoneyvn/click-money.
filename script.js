let clickCount = 50;
let moneyEarned = 0;

document.getElementById("click-btn").addEventListener("click", () => {
    if (clickCount > 0) {
        clickCount--;
        moneyEarned += 10;  // Mỗi click kiếm được 10 đồng
        document.getElementById("click-count").textContent = clickCount;
        document.getElementById("money-earned").textContent = moneyEarned;
    }
});

document.getElementById("watch-ad").addEventListener("click", () => {
    alert("Xem quảng cáo thành công! Bạn được thêm 50 lần bấm.");
    clickCount += 50;
    document.getElementById("click-count").textContent = clickCount;
});

document.getElementById("double-clicks").addEventListener("click", () => {
    alert("Xem quảng cáo thành công! Số tiền mỗi click x2 trong 1 giờ.");
});

