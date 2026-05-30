// ==========================================
// 1. SLIDESHOW TỰ ĐỘNG CHUYỂN ẢNH MỖI 10 GIÂY
// ==========================================
const slides = document.querySelectorAll('.slide-item');
const progressBar = document.getElementById('slideProgress');
let currentSlideIndex = 0;
let slideInterval;

function startSlideshow() {
    // Reset thanh thời gian chạy ngầm
    progressBar.style.transition = 'none';
    progressBar.style.width = '0%';
    
    // Tạo hiệu ứng chạy đầy thanh trong 10s (10000ms)
    setTimeout(() => {
        progressBar.style.transition = 'width 10000ms linear';
        progressBar.style.width = '100%';
    }, 50);

    // Hết 10 giây tự động đổi lớp active qua slide kế tiếp
    slideInterval = setTimeout(() => {
        slides[currentSlideIndex].classList.remove('active');
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        slides[currentSlideIndex].classList.add('active');
        startSlideshow();
    }, 10000);
}
// Chạy hàm ngay khi tải trang
startSlideshow();


// ==========================================
// 2. LOGIC TÍNH TOÁN VÀ ĐIỀU KHIỂN GIỎ HÀNG
// ==========================================
let cartItems = [];

// Mở thanh trượt giỏ hàng bên phải
function openCartDrawer() {
    document.getElementById('cartDrawer').classList.add('open');
    document.getElementById('bodyOverlay').classList.add('active');
}

// Đóng thanh trượt giỏ hàng
function closeCartDrawer() {
    document.getElementById('cartDrawer').classList.remove('open');
    document.getElementById('bodyOverlay').classList.remove('active');
}

// Thêm sản phẩm vào mảng giỏ hàng
function insertToCart(name, price, img) {
    const existingItem = cartItems.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({ name, price, img, quantity: 1 });
    }
    renderCart();
    openCartDrawer();
}

// Xóa hẳn sản phẩm khỏi giỏ hàng
function removeFromCart(name) {
    cartItems = cartItems.filter(item => item.name !== name);
    renderCart();
}

// Cập nhật HTML giao diện của giỏ hàng trượt
function renderCart() {
    const contentBox = document.getElementById('cartDrawerContent');
    const counterText = document.getElementById('cart-counter-text');
    const totalText = document.getElementById('cartDrawerTotal');
    
    contentBox.innerHTML = '';
    let totalAmount = 0;
    let totalQuantity = 0;

    cartItems.forEach(item => {
        totalAmount += item.price * item.quantity;
        totalQuantity += item.quantity;

        contentBox.innerHTML += `
            <div class="drawer-item">
                <img src="${item.img}" alt="${item.name}">
                <div class="drawer-item-details">
                    <h5>${item.name}</h5>
                    <p>${item.price.toLocaleString('vi-VN')}₫ x ${item.quantity}</p>
                    <span onclick="removeFromCart('${item.name}')" style="color:#b83b26; font-size:11px; cursor:pointer; text-decoration:underline;">Xóa bỏ</span>
                </div>
            </div>
        `;
    });

    counterText.innerText = totalQuantity;
    totalText.innerText = totalAmount.toLocaleString('vi-VN') + '₫';
}


// ==========================================
// 3. XỬ LÝ LỌC DANH MỤC SẢN PHẨM KHÔNG TẢI LẠI TRANG
// ==========================================
function filterProducts(category) {
    const productCards = document.querySelectorAll('#danh-muc-vay .product-card');
    
    productCards.forEach(card => {
        const productName = card.querySelector('h3').innerText.toLowerCase();
        
        if (category === 'all') {
            card.style.display = 'block';
        } else if (category === 'dam' && (productName.includes('đầm') || productName.includes('midi'))) {
            card.style.display = 'block';
        } else if (category === 'bien' && productName.includes('biển')) {
            card.style.display = 'block';
        } else if (category === 'chanvay' && productName.includes('chân váy')) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}