// ハンバーガーメニュー
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// ナビゲーションリンククリック時にメニューを閉じる
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// スムーススクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// スクロールアニメーション
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// カルーセル
const carouselItems = document.querySelectorAll('.carousel-item');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
let currentIndex = 1;
let autoSlideInterval;

function updateCarousel() {
    carouselItems.forEach((item, index) => {
        item.classList.remove('active');
        if (index === currentIndex) {
            item.classList.add('active');
        }
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % carouselItems.length;
    updateCarousel();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
    updateCarousel();
}

// 自動送り
function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 3000);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

nextBtn.addEventListener('click', () => {
    nextSlide();
    stopAutoSlide();
    startAutoSlide();
});

prevBtn.addEventListener('click', () => {
    prevSlide();
    stopAutoSlide();
    startAutoSlide();
});

// カルーセルアイテムクリックで拡大表示（シンプル版）
carouselItems.forEach(item => {
    item.addEventListener('click', () => {
        if (item.classList.contains('active')) {
            alert('画像拡大機能のプレースホルダーです。実際の実装ではモーダルウィンドウで画像を表示します。');
        }
    });
});

// 自動送り開始
startAutoSlide();

// カルーセルエリアにマウスが入ったら自動送りを停止
const carousel = document.querySelector('.carousel');
carousel.addEventListener('mouseenter', stopAutoSlide);
carousel.addEventListener('mouseleave', startAutoSlide);

// 初期表示時にプロフィールセクションを表示
document.getElementById('profile').classList.add('visible');

// スクロールトップボタン
const scrollTopBtn = document.querySelector('.scroll-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
