// 初始显示卡片的数量
const CARDS_PER_LOAD = 6;

// 初始化页面
document.addEventListener('DOMContentLoaded', function() {
  // 初始化两个内容区域
  initContentSection('art');
  initContentSection('science');
  
  // 默认显示美育内容
  switchTab('art');
});

// 初始化内容区域，隐藏超出数量的卡片
function initContentSection(sectionId) {
  const section = document.getElementById(`content-${sectionId}`);
  const cards = section.querySelectorAll('.card');
  const loadMoreBtn = section.querySelector('.load-more');
  
  // 隐藏所有卡片
  cards.forEach(card => card.classList.add('hidden'));
  
  // 显示前CARDS_PER_LOAD张卡片
  for (let i = 0; i < Math.min(CARDS_PER_LOAD, cards.length); i++) {
    cards[i].classList.remove('hidden');
  }
  
  // 如果卡片数量少于或等于初始显示数量，隐藏"加载更多"按钮
  if (cards.length <= CARDS_PER_LOAD) {
    loadMoreBtn.classList.add('hidden');
  } else {
    loadMoreBtn.classList.remove('hidden');
    loadMoreBtn.textContent = '加载更多';
    loadMoreBtn.classList.remove('disabled');
  }
  
  // 添加点击事件
  loadMoreBtn.addEventListener('click', function() {
    loadMoreCards(sectionId);
  });
}

// 加载更多卡片
function loadMoreCards(sectionId) {
  const section = document.getElementById(`content-${sectionId}`);
  const allCards = section.querySelectorAll('.card');
  const loadMoreBtn = section.querySelector('.load-more');
  
  // 准确计算当前可见数量
  let visibleCount = 0;
  allCards.forEach(card => {
    if (!card.classList.contains('hidden')) visibleCount++;
  });

  // 显示下一批卡片
  const nextBatch = visibleCount + CARDS_PER_LOAD;
  for (let i = visibleCount; i < Math.min(nextBatch, allCards.length); i++) {
    allCards[i].classList.remove('hidden');
  }

  // 精确判断按钮状态
  if (nextBatch >= allCards.length - 1) { // 考虑索引从0开始
    loadMoreBtn.textContent = '没有更多内容';
    loadMoreBtn.classList.add('disabled');
    loadMoreBtn.removeEventListener('click', loadMoreCards); // 移除点击事件
  }
}

// 切换标签页
function switchTab(tabName) {
  // 隐藏所有内容区域
  document.querySelectorAll('.Thematic-training-item1-content').forEach(section => {
    section.classList.add('hidden');
  });
  
  // 显示选中的内容区域
  document.getElementById(`content-${tabName}`).classList.remove('hidden');
  
  // 更新标签样式
  document.querySelectorAll('.bin3').forEach(tab => {
    tab.classList.remove('active');
  });
  document.querySelector(`.bin3[onclick="switchTab('${tabName}')"]`).classList.add('active');
  
  // 添加点击动画
  const activeTab = document.querySelector(`.bin3[onclick="switchTab('${tabName}')"]`);
  activeTab.style.transform = 'scale(0.95)';
  setTimeout(() => {
    activeTab.style.transform = 'scale(1)';
  }, 200);
}

// 新增搜索触发函数
function triggerSearch() {
    const searchInput = document.getElementById('search');
    searchContent(); // 执行原有搜索逻辑
    searchInput.focus(); // 保持输入框焦点
}

// 添加回车键支持
function handleSearchKey(event) {
    if (event.key === 'Enter') {
        searchContent();
    }
}

// 修改搜索函数
function searchContent() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const activeTab = document.querySelector('.bin3.active').getAttribute('onclick').replace("switchTab('", "").replace("')", "");
    const cards = document.querySelectorAll(`#content-${activeTab} .card`);
    
    cards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const date = card.querySelector('.Number-2').textContent.replace(/[^0-9]/g, ''); // 提取纯数字日期
        const content = card.querySelector('.Body-Copy3').textContent.toLowerCase();
        
        // 支持多种搜索方式
        const match = title.includes(searchTerm) || 
                     content.includes(searchTerm) ||
                     date.includes(searchTerm.replace(/[^0-9]/g, '')) || // 数字日期匹配
                     searchTerm.includes(date); // 完整日期匹配
        
        card.style.display = match ? 'block' : 'none';
    });

    // 更新加载更多按钮状态
    updateLoadMoreButton();
}

// 新增日期格式处理函数
function formatDateForSearch(dateString) {
    return dateString.replace(/[^0-9]/g, '');
}

// 修改加载更多按钮状态
function updateLoadMoreButton() {
    const activeTab = document.querySelector('.Thematic-training-item1-content:not(.hidden)');
    const visibleCards = activeTab.querySelectorAll('.card[style*="display: block"]').length;
    const loadMoreBtn = activeTab.querySelector('.load-more');
    
    if (visibleCards <= CARDS_PER_LOAD) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'block';
    }
}

