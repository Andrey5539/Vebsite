

function initBurgerMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    if (!menuToggle || !navMenu) return;

    // При загрузке всегда ставим иконку &#9776;
    menuToggle.innerHTML = '&#9776;';

    // Основная функция переключения
    function toggleMenu() {
        const isMenuOpen = navMenu.classList.contains('active');
        
        if (isMenuOpen) {
            // ЗАКРЫВАЕМ МЕНЮ
            navMenu.classList.remove('active');
            body.classList.remove('menu-open');
            
            // Возвращаем иконку бургера
            menuToggle.innerHTML = '&#9776;'; 
            menuToggle.setAttribute('aria-expanded', 'false');
        } else {
            // ОТКРЫВАЕМ МЕНЮ
            navMenu.classList.add('active');
            body.classList.add('menu-open'); 
            
            // Ставим крестик для закрытия
            menuToggle.innerHTML = '&times;'; 
            menuToggle.setAttribute('aria-expanded', 'true');
        }
    }

    // 1. Обработчик клика по кнопке
    menuToggle.addEventListener('click', toggleMenu);

    // 2. Закрытие при клике на ссылку в меню
    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            body.classList.remove('menu-open');
            menuToggle.innerHTML = '&#9776;';
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // 3. Закрытие при клике вне меню (на фон)
    body.addEventListener('click', (e) => {
        // Проверяем, что клик был не по меню и не по кнопке
        if (body.classList.contains('menu-open') && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            body.classList.remove('menu-open');
            menuToggle.innerHTML = '&#9776;';
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // 4. Закрытие при нажатии Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            body.classList.remove('menu-open');
            menuToggle.innerHTML = '&#9776;';
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

// Запускаем функцию после загрузки страницы
document.addEventListener('DOMContentLoaded', initBurgerMenu);
// ==========================================
// ДАННЫЕ С ПУТЯМИ К ИЗОБРАЖЕНИЯМ
// ==========================================
const AppState = {
  products: [
    { id: '1', category: 'health', name: 'Comprehensive Health Insurance', description: 'Complete health coverage for you and your family', price: 450, coverage: 2000000, features: ['Coverage for preventive care and wellness visits', 'Emergency and hospitalization services', 'Prescription drug coverage'], popular: true, image: 'img/17.jpg' },
    { id: '2', category: 'auto', name: 'Full Coverage Auto Insurance', description: 'Complete protection for your vehicle', price: 125, coverage: 500000, features: ['Collision and comprehensive coverage', 'Bodily injury and property damage liability', 'Uninsured/underinsured motorist protection'], popular: true, image: 'img/16.jpg' },
    { id: '3', category: 'health', name: 'Basic Health Insurance', description: 'Essential health coverage at affordable rates', price: 250, coverage: 500000, features: ['Emergency services coverage', 'Basic preventive care', 'Generic prescription drugs'], popular: false, image: 'img/15.jpg' },
    { id: '4', category: 'auto', name: 'Basic Auto Insurance', description: 'Affordable liability coverage', price: 65, coverage: 100000, features: ['Bodily injury liability', 'Property damage liability', 'State minimum coverage'], popular: false, image: 'img/14.jpg' },
    { id: '5', category: 'home', name: 'Standard Homeowners Insurance', description: 'Comprehensive protection for your home', price: 95, coverage: 350000, features: ['Property damage protection', 'Theft and vandalism coverage', 'Natural disaster protection'], popular: false, image: 'img/13.jpg' },
    { id: '6', category: 'life', name: 'Term Life Insurance', description: 'Financial protection for your family', price: 35, coverage: 5000000, features: ['Coverage for 10, 20, or 30 years', 'Guaranteed death benefit', 'Fixed premiums'], popular: true, image: 'img/12.jpg' },
    { id: '7', category: 'travel', name: 'International Travel Insurance', description: 'Travel worry-free with comprehensive coverage', price: 75, coverage: 500000, features: ['Emergency medical coverage abroad', 'Trip cancellation and interruption', 'Baggage loss and delay coverage'], popular: false, image: 'img/10.jpg' },
    { id: '8', category: 'business', name: 'Business Liability Insurance', description: 'Essential protection for your business', price: 200, coverage: 3000000, features: ['General liability protection', 'Professional liability coverage', 'Product liability insurance'], popular: false, image: 'img/11.jpg' }
  ],
  navItems: [],
  currentFilter: 'all',
  searchQuery: '',
  isMenuOpen: false
};

// ==========================================
// ОТОБРАЖЕНИЕ ПРОДУКТОВ С РЕАЛЬНЫМИ КАРТИНКАМИ
function renderProducts(products) {
    const grid = document.getElementById('productsGrid');
    const countEl = document.getElementById('productCount');
    
    if (!grid) return;
    
    // Очищаем сетку
    grid.innerHTML = '';

    // Если продуктов нет
    if (products.length === 0) {
        grid.innerHTML = '<p class="no-results" style="grid-column: 1/-1; text-align: center; padding: 2rem; color: var(--text-light);">No products found matching your criteria.</p>';
        if (countEl) countEl.textContent = '0';
        return;
    }

    // Рендерим каждую карточку
    products.forEach(product => {
        const card = document.createElement('article');
        card.className = 'product-card';
        card.dataset.category = product.category;
        card.dataset.price = product.price;
         
        // Бейдж Popular
        const badgeHTML = product.popular ? `
             <span class="product-badge">
                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                     <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                 </svg>
                Popular
             </span>
        ` : '';
        
        // Изображение (с фолбэком)
        const imageHTML = `
             <img src="${product.image}" alt="${product.name}" 
                 style="width:100%; height:100%; object-fit:cover;" 
                 onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
             <div class="image-fallback" style="width:100%; height:250px; background:#f0f9ff; display:none; align-items:center; justify-content:center;">
                 <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="1.5">
                     <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                 </svg>
             </div>
        `;
        
        // HTML карточки (Кнопка Learn More УДАЛЕНА)
        card.innerHTML = `
             <div class="product-image" style="height:250px; position:relative; overflow:hidden;">
                ${badgeHTML}
                ${imageHTML}
             </div>
             <div class="product-content">
                 <h3>${product.name}</h3>
                 <p>${product.description}</p>
                 <div class="product-price">
                     <span class="amount">$${product.price}</span>
                     <span class="period">/month</span>
                 </div>
                 <p class="coverage">Coverage: Up to $${product.coverage.toLocaleString()}</p>
                 <ul class="features-list">
                    ${product.features.map(f => `<li>${f}</li>`).join('')}
                 </ul>
                 <div class="product-actions">
                     <!-- Только одна кнопка -->
                     <button class="btn btn-primary" onclick="window.location.href='apply.html?product=${product.id}'">Get Quote →</button>
                 </div>
             </div>
        `;
        
        grid.appendChild(card);
    });
   if (countEl) {
        countEl.textContent = products.length;
    }
}
// 4. Фильтры
let currentCategory = 'all';
let searchQuery = '';
let maxPrice = 1000;

function setupFilters() {
    const searchInput = document.getElementById('searchInput');
    const categoryBtns = document.querySelectorAll('.category-btn');
    const priceSlider = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');
    const resetBtn = document.getElementById('resetFilters');

    // Поиск
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            searchQuery = e.target.value.toLowerCase();
            applyFilters();
        });
    }

    // Категории
    if (categoryBtns && categoryBtns.length > 0) {
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Убираем active у всех
                categoryBtns.forEach(b => b.classList.remove('active'));
                // Добавляем active нажатой
                this.classList.add('active');
                
                currentCategory = this.getAttribute('data-category');
                applyFilters();
            });
        });
    }

    // Слайдер цены
    if (priceSlider) {
        priceSlider.addEventListener('input', function(e) {
            maxPrice = parseInt(e.target.value);
            if (priceValue) priceValue.textContent = `$${maxPrice}`;
            applyFilters();
        });
    }

    // Сброс фильтров
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            if (searchInput) searchInput.value = '';
            searchQuery = '';
            currentCategory = 'all';
            
            // Сброс визуального состояния кнопок
            if (categoryBtns) {
                categoryBtns.forEach(btn => {
                    btn.classList.remove('active');
                    if (btn.getAttribute('data-category') === 'all') {
                        btn.classList.add('active');
                    }
                });
            }
            
            maxPrice = 1000;
            if (priceSlider) priceSlider.value = 1000;
            if (priceValue) priceValue.textContent = '$1000';
            
            applyFilters();
        });
    }
    
    // Применяем фильтр из URL при загрузке
    applyCategoryFilterFromURL();
}

function applyFilters() {
    const filtered = AppState.products.filter(product => {
        const matchCategory = currentCategory === 'all' || product.category === currentCategory;
        const matchPrice = product.price <= maxPrice;
        const matchSearch = searchQuery === '' || 
                            product.name.toLowerCase().includes(searchQuery) || 
                            product.description.toLowerCase().includes(searchQuery);
        return matchCategory && matchPrice && matchSearch;
    });
    
    renderProducts(filtered);
}

function applyCategoryFilterFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get('category');
  if (categoryParam) {
    const categoryBtn = document.querySelector(`.category-btn[data-category="${categoryParam}"]`);
    if (categoryBtn) {
      document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
      categoryBtn.classList.add('active');
      currentCategory = categoryParam;
      applyFilters();
    }
  }
}

// ==========================================
// КАЛЬКУЛЯТОР
// ==========================================
function initCalculator() {
  const productSelect = document.getElementById('insuranceProduct');
  const coverageSlider = document.getElementById('coverageSlider');
  const coverageDisplay = document.getElementById('coverageValue');
  const deductibleSelect = document.getElementById('deductibleAmount');

  if (!productSelect) return;

  productSelect.innerHTML = '<option value="">Choose a product...</option>';
  AppState.products.forEach(p => {
    const option = document.createElement('option');
    option.value = p.id;
    option.dataset.price = p.price;
    option.dataset.coverage = p.coverage;
    option.dataset.name = p.name;
    option.textContent = `${p.name} - $${p.price}/month`;
    productSelect.appendChild(option);
  });

  productSelect.addEventListener('change', function() {
    const hasValue = this.value !== '';
    const coverageGroup = document.getElementById('coverageGroup');
    const deductibleGroup = document.getElementById('deductibleGroup');
    const zipGroup = document.getElementById('zipGroup');

    if (hasValue) {
      if (coverageGroup) coverageGroup.style.display = 'block';
      if (deductibleGroup) deductibleGroup.style.display = 'block';
      if (zipGroup) zipGroup.style.display = 'block';

      const selectedOption = this.options[this.selectedIndex];
      const baseCoverage = parseInt(selectedOption.dataset.coverage) || 50000;
      if (coverageSlider) {
        coverageSlider.value = baseCoverage;
        if (coverageDisplay) {
          coverageDisplay.textContent = '$' + baseCoverage.toLocaleString();
        }
      }
      calculatePremium();
    } else {
      if (coverageGroup) coverageGroup.style.display = 'none';
      if (deductibleGroup) deductibleGroup.style.display = 'none';
      if (zipGroup) zipGroup.style.display = 'none';
      hidePremiumDisplay();
    }
  });

  if (coverageSlider) {
    coverageSlider.addEventListener('input', function() {
      if (coverageDisplay) {
        coverageDisplay.textContent = '$' + parseInt(this.value).toLocaleString();
      }
      calculatePremium();
    });
  }

  if (deductibleSelect) {
    deductibleSelect.addEventListener('change', calculatePremium);
  }
}

function calculatePremium() {
    const productSelect = document.getElementById('insuranceProduct');
    const coverageSlider = document.getElementById('coverageSlider');
    const deductibleSelect = document.getElementById('deductibleAmount');
    
    if (!productSelect || !productSelect.value) return;
    
    const selectedOption = productSelect.options[productSelect.selectedIndex];
    const productName = selectedOption.dataset.name || selectedOption.text.split(' - ')[0];
    const basePrice = parseFloat(selectedOption.dataset.price) || 0;
    const baseCoverage = parseFloat(selectedOption.dataset.coverage) || 500000;
    
    const coverage = parseInt(coverageSlider?.value || baseCoverage);
    const deductible = parseInt(deductibleSelect?.value || 0);
    
    // Calculate coverage factor based on $500,000 base
    const coverageFactor = coverage / 500000;
    
    // Calculate deductible discount
    let deductibleDiscount = 1;
    if (deductible >= 5000) deductibleDiscount = 0.75;
    else if (deductible >= 2500) deductibleDiscount = 0.80;
    else if (deductible >= 1000) deductibleDiscount = 0.85;
    else if (deductible >= 500) deductibleDiscount = 0.90;
    else if (deductible >= 250) deductibleDiscount = 0.95;
    
    // Calculate premium: base price * coverage factor * deductible discount
    const monthlyPremium = basePrice * coverageFactor * deductibleDiscount;
    const annualPremium = monthlyPremium * 12;
    
    displayPremium(productName, coverage, deductible, monthlyPremium, annualPremium);
}

function displayPremium(productName, coverage, deductible, monthlyPremium, annualPremium) {
  const premiumDisplay = document.getElementById('premiumDisplay');
  const resultPlaceholder = document.getElementById('resultPlaceholder');
  const monthlyAmount = document.getElementById('monthlyAmount');
  const annualPremiumEl = document.getElementById('annualPremium');
  const detailProduct = document.getElementById('detailProduct');
  const detailCoverage = document.getElementById('detailCoverage');
  const detailDeductible = document.getElementById('detailDeductible');

  if (!premiumDisplay || !resultPlaceholder) return;

  premiumDisplay.style.display = 'block';
  resultPlaceholder.style.display = 'none';
  if (monthlyAmount) monthlyAmount.textContent = monthlyPremium.toFixed(2);
  if (annualPremiumEl) annualPremiumEl.textContent = '$' + annualPremium.toFixed(2) + ' annually';
  if (detailProduct) detailProduct.textContent = productName;
  if (detailCoverage) detailCoverage.textContent = '$' + coverage.toLocaleString();
  if (detailDeductible) detailDeductible.textContent = '$' + deductible.toLocaleString();
}

function hidePremiumDisplay() {
  const premiumDisplay = document.getElementById('premiumDisplay');
  const resultPlaceholder = document.getElementById('resultPlaceholder');
  if (premiumDisplay) premiumDisplay.style.display = 'none';
  if (resultPlaceholder) resultPlaceholder.style.display = 'block';
}

// ==========================================
// СТРАНИЦА ЗАЯВКИ (APPLY)
// ==========================================
function initApplyPage() {
  const applyProduct = document.getElementById('applyProduct');
  const coverageSlider = document.getElementById('coverageSlider');
  const coverageValue = document.getElementById('coverageValue');
  const deductible = document.getElementById('deductible');
  const firstName = document.getElementById('firstName');
  const lastName = document.getElementById('lastName');
  const form = document.getElementById('insuranceApplication');

  if (!applyProduct) return;

  applyProduct.innerHTML = '<option value="">Choose a product...</option>';
  AppState.products.forEach(p => {
    const option = document.createElement('option');
    option.value = p.id;
    option.dataset.name = p.name;
    option.dataset.price = p.price;
    option.dataset.coverage = p.coverage;
    option.textContent = `${p.name} - $${p.price}/month`;
    applyProduct.appendChild(option);
  });

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('product');
  if (productId) {
    const product = AppState.products.find(p => p.id === productId);
    if (product) {
      applyProduct.value = productId;
      updateSummary();
    }
  }

  applyProduct.addEventListener('change', updateSummary);

  if (coverageSlider) {
    coverageSlider.addEventListener('input', function() {
      if (coverageValue) {
        coverageValue.textContent = '$' + parseInt(this.value).toLocaleString();
      }
      updateSummary();
    });
  }

  if (deductible) {
    deductible.addEventListener('change', updateSummary);
  }

  if (firstName && lastName) {
    firstName.addEventListener('input', updateSummary);
    lastName.addEventListener('input', updateSummary);
  }

  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const firstNameVal = document.getElementById('firstName').value;
      const lastNameVal = document.getElementById('lastName').value;
      const productSelect = document.getElementById('applyProduct');
      const productName = productSelect.options[productSelect.selectedIndex].text;
      const premiumText = document.getElementById('summaryPremium').textContent;

      const applicationData = {
        id: 'APP-' + Date.now(),
        date: new Date().toLocaleDateString('ru-RU'),
        applicant: firstNameVal + ' ' + lastNameVal,
        product: productName,
        premium: premiumText,
        status: 'Pending'
      };

      let applications = JSON.parse(sessionStorage.getItem('insuranceApplications')) || [];
      applications.push(applicationData);
      sessionStorage.setItem('insuranceApplications', JSON.stringify(applications));

      alert('Application submitted successfully! Redirecting to My Policies...');
      window.location.href = 'policies.html';
    });
  }
}

function updateSummary() {
    const applyProduct = document.getElementById('applyProduct');
    const coverageSlider = document.getElementById('coverageSlider');
    const deductible = document.getElementById('deductible');
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const summaryContent = document.getElementById('summaryContent');
    const summaryDetails = document.getElementById('summaryDetails');
    const summaryProduct = document.getElementById('summaryProduct');
    const summaryPremium = document.getElementById('summaryPremium');
    const summaryCoverage = document.getElementById('summaryCoverage');
    const summaryDeductible = document.getElementById('summaryDeductible');
    const summaryApplicant = document.getElementById('summaryApplicant');
    
    if (!applyProduct || !summaryContent || !summaryDetails) return;

    const selectedOption = applyProduct.options[applyProduct.selectedIndex];
    const hasProduct = applyProduct.value !== '';

    if (hasProduct) {
        const productName = selectedOption.dataset.name || selectedOption.text;
        const price = parseFloat(selectedOption.dataset.price) || 0;
        const coverage = parseInt(coverageSlider?.value || 10000);
        const dedAmount = parseInt(deductible?.value || 0);
        
        // Use $500,000 as base coverage (same as calculator.html)
        const baseCoverage = 500000;
        
        const coverageFactor = coverage / baseCoverage;
        let deductibleDiscount = 1;
        if (dedAmount >= 5000) deductibleDiscount = 0.75;
        else if (dedAmount >= 2500) deductibleDiscount = 0.80;
        else if (dedAmount >= 1000) deductibleDiscount = 0.85;
        else if (dedAmount >= 500) deductibleDiscount = 0.90;
        else if (dedAmount >= 250) deductibleDiscount = 0.95;

        const monthlyPremium = price * coverageFactor * deductibleDiscount;
        const fullName = `${firstName?.value || ''} ${lastName?.value || ''}`.trim();

        if (summaryProduct) summaryProduct.textContent = productName;
        if (summaryPremium) summaryPremium.textContent = '$' + monthlyPremium.toFixed(2);
        if (summaryCoverage) summaryCoverage.textContent = '$' + coverage.toLocaleString();
        if (summaryDeductible) summaryDeductible.textContent = '$' + dedAmount.toLocaleString();
        if (summaryApplicant) summaryApplicant.textContent = fullName || '-';

        summaryContent.style.display = 'none';
        summaryDetails.style.display = 'block';
    } else {
        summaryContent.style.display = 'block';
        summaryDetails.style.display = 'none';
    }
}
// ==========================================
// СТРАНИЦА ПОЛИСОВ
// ==========================================
function initPolicies() {
    updatePolicyStats();
    setupTabSwitching();
    loadApplications();
}
function updatePolicyStats() {
 const applications = JSON.parse(sessionStorage.getItem('insuranceApplications')) || [];  // localStorage → sessionStorage
    const pendingCount = applications.length;
  const totalPremium = applications.reduce((sum, app) => {
    const match = app.premium.match(/\$([\d.]+)/);
    if (match) sum += parseFloat(match[1]);
    return sum;
  }, 0);
  const activeEl = document.getElementById('activePoliciesCount');
  const pendingEl = document.getElementById('pendingApplicationsCount');
  const premiumEl = document.getElementById('totalPremium');
  if (activeEl) activeEl.textContent = '0';
  if (pendingEl) pendingEl.textContent = pendingCount;
  if (premiumEl) premiumEl.textContent = '$' + totalPremium.toFixed(2);
}

function setupTabSwitching() {
  const tabs = document.querySelectorAll('.tab');
  const panels = document.querySelectorAll('.tab-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const onclickAttr = this.getAttribute('onclick');
      let targetPanel = '';
      if (onclickAttr) {
        const match = onclickAttr.match(/'([^']+)'/);
        if (match) targetPanel = match[1];
      }
      tabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');

      panels.forEach(panel => {
        panel.classList.remove('active');
        if (panel.id === targetPanel + '-panel') {
          panel.classList.add('active');
        }
      });
    });
  });
}
function updateStats() {
  const applications = JSON.parse(sessionStorage.getItem('insuranceApplications')) || [];
  const pendingCount = applications.length;
  const countElement = document.getElementById('pendingApplicationsCount');
  if (countElement) {
    countElement.textContent = pendingCount;
  }
  loadApplications();
}

window.switchTab = function(tabName) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  const activeTab = document.getElementById('tab-' + tabName);
  if (activeTab) activeTab.classList.add('active');
  const activePanel = document.getElementById(tabName + '-panel');
  if (activePanel) activePanel.classList.add('active');
  if (tabName === 'applications') {
    updateStats();
  }
};

// ==========================================
// ФУТЕР
// ==========================================
function setupFooterLinks() {
  const categoryLinks = document.querySelectorAll('.footer-links a[href*="#"]');
  const categoryMap = {
    '#health': 'health',
    '#auto': 'auto',
    '#home': 'home',
    '#life': 'life',
    '#travel': 'travel',
    '#business': 'business'
  };
  categoryLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (categoryMap[href]) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const category = categoryMap[href];
        window.location.href = `products.html?category=${category}`;
      });
    }
  });
}

// ==========================================
// ЗАПУСК ПРИЛОЖЕНИЯ
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  console.log('SecureLife Insurance App Initialized');

  // Инициализация бургер-меню
  initBurgerMenu();

  const currentPage = window.location.pathname.split('/').pop();

  if (currentPage === 'products.html' || currentPage === '' || currentPage === 'index.html') {
    renderProducts(AppState.products);
    setupFilters();
  }
  if (currentPage === 'calculator.html') {
    initCalculator();
  }
  if (currentPage === 'policies.html') {
    initPolicies();
    loadApplications();
  }
  if (currentPage === 'apply.html') {
    initApplyPage();
  }
  setupFooterLinks();
});

function loadApplications() {
    // Ищем контейнер для списка внутри панели Applications
    const applicationsList = document.getElementById('applicationsList');
    // Находим элемент пустого состояния, если он существует (чтобы не дублировать)
    let emptyContainer = document.getElementById('emptyAppContainer');

    if (!applicationsList) return;

    // Получаем данные
    const applications = JSON.parse(sessionStorage.getItem('insuranceApplications')) || [];

    // Если заявок нет - показываем красивое "Empty State" как на картинке 2
    if (applications.length === 0) {
        applicationsList.innerHTML = `
            <div id="emptyAppContainer" class="empty-state">
                <!-- Иконка документа (серая) -->
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 1.5rem;">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                
                <h3 style="margin: 0 0 0.5rem; font-size: 1.5rem; color: #1e293b;">No Applications</h3>
                <p style="color: #64748b; margin-bottom: 2rem; font-size: 1rem;">You haven't submitted any insurance applications yet.</p>
                
                <!-- Темная кнопка -->
                <a href="apply.html" class="btn btn-start">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 0.5rem;">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    Start New Application
                </a>
            </div>
        `;
    } else {
        // Если заявки есть, рендерим их списком
        applicationsList.innerHTML = '';
        applications.forEach(app => {
            const card = document.createElement('div');
            card.className = 'application-card';
            card.innerHTML = `
                 <div class="app-header">
                     <div class="app-title">
                         <h3>${app.product}</h3>
                         <span class="status-badge pending">${app.status}</span>
                     </div>
                     <div class="app-price">
                         <span class="amount">${app.premium}</span>
                         <span class="period">/month</span>
                     </div>
                 </div>
                 <div class="app-details">
                     <div class="detail-row">
                         <span class="label">Application ID:</span>
                         <span class="value">${app.id}</span>
                     </div>
                     <div class="detail-row">
                         <span class="label">Submitted:</span>
                         <span class="value">${app.date}</span>
                     </div>
                     <div class="detail-row">
                         <span class="label">Applicant:</span>
                         <span class="value">${app.applicant}</span>
                     </div>
                 </div>
            `;
            applicationsList.appendChild(card);
        });
    }
}