function buyVIP() {
    let confirmVIP = confirm("Gói VIP giá 50.000 đồng/tháng. Bạn có muốn mua không?");
    if (confirmVIP) {
        alert("Mua VIP thành công! Bạn nhận được x1.5 tiền thưởng.");
        points *= 1.5;
        document.getElementById("points").innerText = points;
    } else {
        alert("Bạn đã hủy giao dịch.");
    }
}
