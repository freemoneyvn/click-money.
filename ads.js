function showAd() {
    alert("Đang xem quảng cáo...");
    setTimeout(() => {
        alert("Quảng cáo hoàn tất!");
    }, 5000);
}

// Hiển thị quảng cáo banner
document.getElementById("top-ad").innerHTML = '<iframe src="https://your-ad-network.com/ad1" width="100%" height="100"></iframe>';
document.getElementById("middle-ad").innerHTML = '<iframe src="https://your-ad-network.com/ad2" width="100%" height="100"></iframe>';
document.getElementById("bottom-ad").innerHTML = '<iframe src="https://your-ad-network.com/ad3" width="100%" height="100"></iframe>';
