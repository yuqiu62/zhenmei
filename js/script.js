document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const items = Array.from(document.querySelectorAll('.carousel-item'));
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    let currentIndex = 0;
		const scrollableCarouselElement = document.getElementById('newScrollableCarousel');
    let isDragging = false;
    let initialX;
    let initialScrollLeft;
    const videoThumbnail = document.getElementById('video-thumbnail');
    const aboutUsVideo = document.getElementById('about-us-video'); 

    // 克隆第一个和最后一个轮播项
    const firstClone = items[0].cloneNode(true);
    const lastClone = items[items.length - 1].cloneNode(true);
    
    // 添加克隆项到轮播图
    track.appendChild(firstClone);
    track.insertBefore(lastClone, items[0]);

    // 设置初始位置（显示第一个真实项）
    track.style.transform = `translateX(-${100}%)`;

    // 创建指示器
    function createIndicators() {
        items.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToSlide(index));
            indicatorsContainer.appendChild(indicator);
        });
    }

    // 更新指示器状态
    function updateIndicators() {
        document.querySelectorAll('.indicator').forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }

    // 切换幻灯片
    function goToSlide(index) {
        currentIndex = index;
        track.style.transition = 'transform 0.5s ease-in-out';
        track.style.transform = `translateX(-${(index + 1) * 100}%)`;
        updateIndicators();
    }

    // 处理过渡结束事件
    track.addEventListener('transitionend', () => {
        // 当滑到最后一个克隆项时
        if (currentIndex === items.length) {
            track.style.transition = 'none';
            currentIndex = 0;
            track.style.transform = `translateX(-100%)`;
        }
        // 当滑到第一个克隆项时
        if (currentIndex === -1) {
            track.style.transition = 'none';
            currentIndex = items.length - 1;
            track.style.transform = `translateX(-${items.length * 100}%)`;
        }
        updateIndicators();
    });

    // 获取所有的下一页按钮
    const allNextButtons = document.querySelectorAll('.carousel-button.next');

    // 为所有下一页按钮添加点击事件
    allNextButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentIndex++;
            goToSlide(currentIndex);
        });
    });

    // 上一页按钮事件
    prevButton.addEventListener('click', () => {
        currentIndex--;
        goToSlide(currentIndex);
    });

    // 初始化指示器
    createIndicators();

    // 自动播放
    let autoPlay = setInterval(() => {
        currentIndex++;
        goToSlide(currentIndex);
    }, 3000);

    // 鼠标悬停暂停自动播放
    track.parentElement.addEventListener('mouseenter', () => clearInterval(autoPlay));
    track.parentElement.addEventListener('mouseleave', () => {
        autoPlay = setInterval(() => {
            currentIndex++;
            goToSlide(currentIndex);
        }, 3000);
    });

        // 触摸滑动支持
        let touchStartX = 0;
        track.addEventListener('touchstart', e => {
            touchStartX = e.touches[0].clientX;
        });

        track.addEventListener('touchend', e => {
            const touchEndX = e.changedTouches[0].clientX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                diff > 0 ? goToSlide(currentIndex + 1) : goToSlide(currentIndex - 1);
            }
        });

    // 鼠标拖动处理
    scrollableCarouselElement.addEventListener('mousedown', (e) => {
        isDragging = true;
        initialX = e.pageX - scrollableCarouselElement.offsetLeft;
        initialScrollLeft = scrollableCarouselElement.scrollLeft;
        scrollableCarouselElement.style.cursor = 'grabbing';
    });

scrollableCarouselElement.addEventListener('mouseleave', () => {
    isDragging = false;
    scrollableCarouselElement.style.cursor = 'grab';
});

scrollableCarouselElement.addEventListener('mouseup', () => {
    isDragging = false;
    scrollableCarouselElement.style.cursor = 'grab';
});

scrollableCarouselElement.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const currentX = e.pageX - scrollableCarouselElement.offsetLeft;
    const scrollDistance = (currentX - initialX) * 2;
    scrollableCarouselElement.scrollLeft = initialScrollLeft - scrollDistance;
});

// 滚轮滚动处理
scrollableCarouselElement.addEventListener('wheel', (e) => {
    e.preventDefault();
    scrollableCarouselElement.scrollLeft += e.deltaY;
});

// 获取导航栏
const navbar = document.querySelector('.navbar');

// 获取封面图片元素
const heroSection = document.querySelector('.hero-section');

// 监听滚动事件
window.addEventListener('scroll', function() {
    // 获取封面图片的高度
    const heroHeight = heroSection.offsetHeight;

    // 判断当前滚动的距离是否超过封面图片高度
    if (window.scrollY > heroHeight) {
        navbar.style.top = '0';  // 取消固定的 top: 48px, 让导航栏跟随滚动
        navbar.style.backgroundColor = '#fff';  // 改为不透明背景
        navbar.style.opacity = '1';  // 设置为完全不透明
        navbar.style.transition = 'top 0.3s, background-color 0.3s, opacity 0.3s';  // 添加平滑过渡效果
    } else {
        navbar.style.top = '48px';  // 恢复导航栏固定在顶部
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0)';  // 背景恢复透明
        navbar.style.opacity = '0.8';  // 恢复透明度为 0.8
    }
});
});
//视频暂停播放

videoThumbnail.addEventListener('click', () => {
    videoThumbnail.style.display = 'none';
    aboutUsVideo.style.display = 'block';
    aboutUsVideo.play();
});

aboutUsVideo.addEventListener('click', () => {
    if (aboutUsVideo.paused) {
        aboutUsVideo.play();
    } else {
        aboutUsVideo.pause();
    }
});
//专题培训切换美育科学
function switchTab(tab) {
    document.querySelectorAll('.bin3').forEach(el => el.classList.remove('active'));
    event.target.classList.add('active');
    
    if (tab === 'art') {
        document.getElementById('content-art').classList.remove('hidden');
        document.getElementById('content-science').classList.add('hidden');
    } else {
        document.getElementById('content-science').classList.remove('hidden');
        document.getElementById('content-art').classList.add('hidden');
    }
}