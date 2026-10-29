/**
 * AUTOVAULT — LUXURY AUTOMOTIVE INTERACTIVE ENGINE
 * Features:
 * - Dynamic Floating Header on Scroll
 * - Interactive Car Filter Dropdown & Grid Transitions
 * - Wishlist Heart Toggle & Floating Toast System
 * - Test Drive Booking Modal
 * - Instant Valuation Calculator with Real-time Math
 * - Financing / EMI Calculator with Live Sliders
 * - 3D Tilt Perspective on Hero Media
 * - Number Counters with IntersectionObserver
 * - Car Detail Drawer View
 * - Carousel Controls for Featured Cars & Testimonials
 * - Mobile Navigation Menu Toggle
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initHeroAutoSlider();
  initHeroTilt();
  initScrollReveal();
  initCardTiltHover();
  initFeaturedCarsFilter();
  initWishlist();
  initModals();
  initValuationCalculator();
  initFinanceCalculator();
  initNumberCounters();
  initCarousels();
  initMobileMenu();
  initBrandClicks();
  initFaqAccordion();
  initInventoryPage();
  initBackToTop();
  initSmoothScrollLinks();
  initVideoPlayer();
  initFooterInteractions();
  initGlobalSearch();
});

/* ==========================================================================
   1. SITE HEADER ON SCROLL
   ========================================================================== */
function initHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* ==========================================================================
   2. HERO AUTO SLIDER ENGINE (3 SLIDES WITH SMOOTH CROSSFADE & PROGRESS BARS)
   ========================================================================== */
window.__currentHeroSlide = 0;
const HERO_SLIDES_DATA = [
  {
    title: 'Mercedes-AMG GT R Coupe',
    subtitle: '3.6s 0-100 · 577 HP · 4.0L Bi-Turbo V8',
    price: '₹ 2.71 Cr',
    img: 'assets/images/slide1.png'
  },
  {
    title: 'Lamborghini Huracán Tecnica',
    subtitle: '3.2s 0-100 · 631 HP · 5.2L Naturally Aspirated V10',
    price: '₹ 4.04 Cr',
    img: 'assets/images/slide2.png'
  },
  {
    title: 'Bentley Continental GT V8',
    subtitle: '3.9s 0-100 · 542 HP · Twin-Turbo V8',
    price: '₹ 3.95 Cr',
    img: 'assets/images/slide3.png'
  }
];

function initHeroAutoSlider() {
  const bgSlides = document.querySelectorAll('.hero-bg-slide');
  const copySlides = document.querySelectorAll('.hero-copy-slide');
  const indicators = document.querySelectorAll('.slide-indicator');
  const specTitle = document.getElementById('heroSpecTitle');
  const specSubtitle = document.getElementById('heroSpecSubtitle');
  const heroSection = document.getElementById('hero');

  if (!bgSlides.length || !copySlides.length) return;

  let currentIndex = 0;
  let autoTimer = null;
  const slideDuration = 5500;

  function switchSlide(targetIndex) {
    currentIndex = (targetIndex + bgSlides.length) % bgSlides.length;
    window.__currentHeroSlide = currentIndex;

    // Crossfade Background Slides
    bgSlides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx === currentIndex);
    });

    // Crossfade Copy Slides
    copySlides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx === currentIndex);
    });

    // Update Indicators & Restart Progress Fill
    indicators.forEach((indicator, idx) => {
      const isActive = idx === currentIndex;
      indicator.classList.toggle('active', isActive);

      const prog = indicator.querySelector('.indicator-progress');
      if (prog) {
        prog.style.animation = 'none';
        void prog.offsetWidth; // trigger reflow
        if (isActive) {
          prog.style.animation = `slideProgressAnim ${slideDuration}ms linear forwards`;
        }
      }
    });

    // Update Floating Spec Pill
    const data = HERO_SLIDES_DATA[currentIndex];
    if (data && specTitle && specSubtitle) {
      specTitle.style.opacity = '0';
      specSubtitle.style.opacity = '0';
      setTimeout(() => {
        specTitle.textContent = data.title;
        specSubtitle.textContent = data.subtitle;
        specTitle.style.opacity = '1';
        specSubtitle.style.opacity = '1';
      }, 250);
    }
  }

  function startAutoPlay() {
    stopAutoPlay();
    autoTimer = setInterval(() => {
      switchSlide(currentIndex + 1);
    }, slideDuration);
  }

  function stopAutoPlay() {
    if (autoTimer) {
      clearInterval(autoTimer);
      autoTimer = null;
    }
  }

  // Indicator Click Navigation
  indicators.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = parseInt(btn.dataset.to, 10);
      switchSlide(target);
      startAutoPlay();
    });
  });

  // Pause on Mouse Hover, Resume on Leave
  if (heroSection) {
    heroSection.addEventListener('mouseenter', stopAutoPlay);
    heroSection.addEventListener('mouseleave', startAutoPlay);
  }

  // Keyboard Navigation (Arrow Keys)
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      switchSlide(currentIndex + 1);
      startAutoPlay();
    } else if (e.key === 'ArrowLeft') {
      switchSlide(currentIndex - 1);
      startAutoPlay();
    }
  });

  // Initialize First Slide & Start Autoplay
  switchSlide(0);
  startAutoPlay();
}

/* ==========================================================================
   3. HERO PARALLAX & AMBIENT MOTION
   ========================================================================== */
function initHeroTilt() {
  const heroSection = document.getElementById('hero');
  const specPill = document.getElementById('heroSpecPill');
  if (!heroSection) return;

  heroSection.addEventListener('mousemove', (e) => {
    const activeBg = heroSection.querySelector('.hero-bg-slide.active .hero-bg-img');
    if (!activeBg) return;

    const rect = heroSection.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    activeBg.style.transform = `scale(1.03) translate(${x * -18}px, ${y * -12}px)`;
    if (specPill) {
      specPill.style.transform = `translate(${x * 8}px, ${y * 6}px)`;
    }
  });

  heroSection.addEventListener('mouseleave', () => {
    const activeBg = heroSection.querySelector('.hero-bg-slide.active .hero-bg-img');
    if (activeBg) {
      activeBg.style.transform = 'scale(1) translate(0px, 0px)';
    }
    if (specPill) {
      specPill.style.transform = 'translate(0px, 0px)';
    }
  });
}

/* ==========================================================================
   3. FEATURED CARS FILTER DROPDOWN & ANIMATED DISPLAY
   ========================================================================== */
function initFeaturedCarsFilter() {
  const selectBtn = document.getElementById('filterSelectBtn');
  const dropdownMenu = document.getElementById('filterDropdownMenu');
  const filterLabel = document.getElementById('filterLabel');
  const carCards = document.querySelectorAll('#carsGrid .car-card');

  if (!selectBtn || !dropdownMenu) return;

  // Toggle dropdown
  selectBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdownMenu.classList.toggle('show');
  });

  // Close when clicking outside
  document.addEventListener('click', () => {
    dropdownMenu.classList.remove('show');
  });

  // Select category
  dropdownMenu.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', () => {
      dropdownMenu.querySelectorAll('.dropdown-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      const filterValue = item.dataset.filter;
      filterLabel.textContent = item.textContent;
      dropdownMenu.classList.remove('show');

      // Filter car cards with smooth scale/fade
      carCards.forEach(card => {
        const categories = card.dataset.category || '';
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px) scale(0.96)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });

      const carsGrid = document.getElementById('carsGrid');
      if (carsGrid) {
        carsGrid.scrollTo({ left: 0, behavior: 'smooth' });
      }
    });
  });
}

/* ==========================================================================
   4. WISHLIST TOGGLE & TOAST NOTIFICATION
   ========================================================================== */
function initWishlist() {
  const heartButtons = document.querySelectorAll('.car-heart-btn');
  const wishlistCountEl = document.getElementById('wishlistCount');
  let count = 1; // BMW X7 starts saved

  heartButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isSaved = btn.classList.contains('active');
      const card = btn.closest('.car-card');
      const carName = card ? card.querySelector('.car-card-title').textContent : 'Vehicle';

      if (isSaved) {
        btn.classList.remove('active');
        btn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        `;
        count = Math.max(0, count - 1);
        showToast(`Removed ${carName} from wishlist`);
      } else {
        btn.classList.add('active');
        btn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#FF5722" stroke="#FF5722" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        `;
        count++;
        showToast(`Added ${carName} to your saved wishlist!`);
      }

      if (wishlistCountEl) {
        wishlistCountEl.textContent = count;
        wishlistCountEl.style.transform = 'scale(1.35)';
        setTimeout(() => {
          wishlistCountEl.style.transform = 'scale(1)';
        }, 200);
      }
    });
  });

  // Top Wishlist Trigger Button — Filters and toggles saved collection
  const wishlistTrigger = document.getElementById('wishlistTrigger');
  let isWishlistFilterActive = false;
  if (wishlistTrigger) {
    wishlistTrigger.addEventListener('click', () => {
      const activeHearts = document.querySelectorAll('.car-heart-btn.active');
      const searchTarget = document.getElementById('featured');
      if (searchTarget) {
        searchTarget.scrollIntoView({ behavior: 'smooth' });
      }

      if (activeHearts.length === 0) {
        showToast('Your saved vault is empty. Click the heart icon on any vehicle to add.');
        return;
      }

      const carCards = document.querySelectorAll('#carsGrid .car-card');
      const filterLabel = document.getElementById('filterLabel');

      if (!isWishlistFilterActive) {
        isWishlistFilterActive = true;
        wishlistTrigger.style.borderColor = '#FF5722';
        wishlistTrigger.style.background = 'rgba(255, 87, 34, 0.15)';
        if (filterLabel) filterLabel.textContent = `Saved Vault (${activeHearts.length})`;

        carCards.forEach(card => {
          const heart = card.querySelector('.car-heart-btn');
          if (heart && heart.classList.contains('active')) {
            card.style.display = 'flex';
            card.style.opacity = '1';
            card.classList.add('wishlist-highlight');
            setTimeout(() => card.classList.remove('wishlist-highlight'), 1200);
          } else {
            card.style.display = 'none';
          }
        });
        showToast(`Displaying ${activeHearts.length} saved luxury allocation${activeHearts.length > 1 ? 's' : ''}`);
      } else {
        isWishlistFilterActive = false;
        wishlistTrigger.style.borderColor = '';
        wishlistTrigger.style.background = '';
        if (filterLabel) filterLabel.textContent = 'All Allocations';

        carCards.forEach(card => {
          card.style.display = 'flex';
          card.style.opacity = '1';
        });
        showToast('Viewing all luxury allocations');
      }
    });
  }
}

function showToast(message) {
  const toast = document.getElementById('toastNotification');
  const toastMsg = document.getElementById('toastMessage');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.add('show');

  clearTimeout(window.__toastTimeout);
  window.__toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

/* ==========================================================================
   5. INTERACTIVE MODALS
   ========================================================================== */
function initModals() {
  const openButtons = [
    { btnId: 'openTestDriveBtn', modalId: 'testDriveModal' },
    { btnId: 'openTestDriveBtn2', modalId: 'testDriveModal' },
    { btnId: 'openValuationModalBtn', modalId: 'valuationModal' },
    { btnId: 'openFinanceCalcBtn', modalId: 'financeModal' },
    { btnId: 'watchStoryBtn', modalId: 'videoModal' },
    { btnId: 'openContactModalBtn', modalId: 'testDriveModal' },
    { btnId: 'bannerExploreBtn', action: () => document.getElementById('featured').scrollIntoView({ behavior: 'smooth' }) }
  ];

  openButtons.forEach(item => {
    const el = document.getElementById(item.btnId);
    if (!el) return;

    el.addEventListener('click', (e) => {
      e.preventDefault();
      if (item.action) {
        item.action();
      } else if (item.modalId) {
        openModal(item.modalId);
      }
    });
  });

  // Close buttons with data-close
  document.querySelectorAll('[data-close]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-close');
      closeModal(modalId);
    });
  });

  // Close when clicking modal backdrop
  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        backdrop.classList.remove('open');
      }
    });
  });

  // Test drive form submission
  const testDriveForm = document.getElementById('testDriveForm');
  if (testDriveForm) {
    // Set default date to tomorrow
    const dateInput = document.getElementById('tdDate');
    if (dateInput) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      dateInput.value = tomorrow.toISOString().split('T')[0];
    }

    testDriveForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const vehicle = document.getElementById('tdVehicle').value;
      const name = document.getElementById('tdName').value;
      closeModal('testDriveModal');
      showToast(`Thank you, ${name}! Your test drive for ${vehicle} is confirmed.`);
      testDriveForm.reset();
    });
  }

  // Experience button in split card
  document.querySelectorAll('.open-experience-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      openModal('testDriveModal');
    });
  });

  // Story video buttons
  document.querySelectorAll('.open-story-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('videoModal');
    });
  });

  // Car Details view buttons
  document.querySelectorAll('.view-car-detail-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const carName = btn.dataset.car;
      const carPrice = btn.dataset.price;
      const carImg = btn.dataset.img;
      const carSpecs = btn.dataset.specs;

      const titleEl = document.getElementById('detailModalTitle');
      const priceEl = document.getElementById('detailModalPrice');
      const imgEl = document.getElementById('detailModalImg');
      const specsEl = document.getElementById('detailModalSpecs');

      if (titleEl) titleEl.textContent = carName;
      if (priceEl) priceEl.textContent = carPrice;
      if (imgEl) imgEl.src = carImg;
      if (specsEl) specsEl.textContent = carSpecs;

      openModal('carDetailModal');
    });
  });

  // Hero detail button from current active slide
  const porscheBtn = document.getElementById('openPorscheDetail');
  if (porscheBtn) {
    porscheBtn.addEventListener('click', () => {
      const activeIdx = window.__currentHeroSlide || 0;
      const data = HERO_SLIDES_DATA[activeIdx] || HERO_SLIDES_DATA[0];

      const titleEl = document.getElementById('detailModalTitle');
      const priceEl = document.getElementById('detailModalPrice');
      const imgEl = document.getElementById('detailModalImg');
      const specsEl = document.getElementById('detailModalSpecs');

      if (titleEl) titleEl.textContent = data.title;
      if (priceEl) priceEl.textContent = data.price;
      if (imgEl) imgEl.src = data.img;
      if (specsEl) specsEl.textContent = data.subtitle;

      openModal('carDetailModal');
    });
  }

  // Open video modal when clicking any story button
  document.querySelectorAll('.open-story-btn, #watchStoryBtn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('videoModal');
    });
  });

  // Detail Modal Actions
  const detailBook = document.getElementById('detailModalBookBtn');
  if (detailBook) {
    detailBook.addEventListener('click', () => {
      closeModal('carDetailModal');
      openModal('testDriveModal');
    });
  }

  const detailFinance = document.getElementById('detailModalFinanceBtn');
  if (detailFinance) {
    detailFinance.addEventListener('click', () => {
      closeModal('carDetailModal');
      openModal('financeModal');
    });
  }
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

/* ==========================================================================
   6. VALUATION CALCULATOR
   ========================================================================== */
function initValuationCalculator() {
  const valForm = document.getElementById('valuationForm');
  const resultBox = document.getElementById('valuationResult');
  const resultAmount = document.getElementById('valResultAmount');

  if (!valForm || !resultBox || !resultAmount) return;

  valForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const km = parseFloat(document.getElementById('valKm').value) || 15000;
    const year = parseInt(document.getElementById('valYear').value) || 2023;
    const condition = document.getElementById('valCondition').value;

    let baseEstimate = 1.35; // base 1.35 Cr
    if (year === 2024) baseEstimate += 0.25;
    if (year === 2023) baseEstimate += 0.15;
    if (year === 2021 || year === 2020) baseEstimate -= 0.2;

    if (km < 10000) baseEstimate += 0.1;
    if (km > 30000) baseEstimate -= 0.15;

    if (condition === 'pristine') baseEstimate *= 1.1;
    if (condition === 'good') baseEstimate *= 0.9;

    const lowEst = (baseEstimate * 0.96).toFixed(2);
    const highEst = (baseEstimate * 1.05).toFixed(2);

    resultAmount.textContent = `₹ ${lowEst} Cr — ₹ ${highEst} Cr`;
    resultBox.style.display = 'block';
    showToast('Instant valuation generated based on live verified auction sales!');
  });
}

/* ==========================================================================
   7. FINANCE & EMI CALCULATOR WITH LIVE SLIDERS
   ========================================================================== */
function initFinanceCalculator() {
  const priceRange = document.getElementById('priceRange');
  const downRange = document.getElementById('downRange');
  const tenureRange = document.getElementById('tenureRange');

  const priceDisplay = document.getElementById('priceDisplay');
  const downDisplay = document.getElementById('downDisplay');
  const tenureDisplay = document.getElementById('tenureDisplay');
  const monthlyEmiDisplay = document.getElementById('monthlyEmiDisplay');
  const loanPrincipalDisplay = document.getElementById('loanPrincipalDisplay');

  if (!priceRange || !downRange || !tenureRange) return;

  function updateEMI() {
    const price = parseFloat(priceRange.value);
    const downPercent = parseFloat(downRange.value);
    const tenureYears = parseInt(tenureRange.value);
    const annualInterestRate = 0.0799; // 7.99%

    const downPayment = price * (downPercent / 100);
    const principal = price - downPayment;
    const monthlyRate = annualInterestRate / 12;
    const numberOfMonths = tenureYears * 12;

    // EMI formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths)) / (Math.pow(1 + monthlyRate, numberOfMonths) - 1);

    if (priceDisplay) priceDisplay.textContent = formatINR(price);
    if (downDisplay) downDisplay.textContent = `${formatINR(downPayment)} (${downPercent}%)`;
    if (tenureDisplay) tenureDisplay.textContent = `${tenureYears} Year${tenureYears > 1 ? 's' : ''}`;
    if (loanPrincipalDisplay) loanPrincipalDisplay.textContent = formatINR(principal);
    if (monthlyEmiDisplay) monthlyEmiDisplay.textContent = `${formatINR(Math.round(emi))} / mo`;
  }

  function formatINR(number) {
    return '₹ ' + number.toLocaleString('en-IN');
  }

  priceRange.addEventListener('input', updateEMI);
  downRange.addEventListener('input', updateEMI);
  tenureRange.addEventListener('input', updateEMI);

  updateEMI();

  const applyBtn = document.getElementById('applyLoanBtn');
  if (applyBtn) {
    applyBtn.addEventListener('click', () => {
      closeModal('financeModal');
      showToast('Pre-approval application initialized. A finance advisor will reach out.');
    });
  }
}

/* ==========================================================================
   8. ANIMATED NUMBER COUNTERS (INTERSECTION OBSERVER)
   ========================================================================== */
function initNumberCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        statNumbers.forEach(el => {
          const target = parseInt(el.dataset.target) || 0;
          const suffix = el.dataset.suffix || '';
          animateCounter(el, target, suffix, 1800);
        });
      }
    });
  }, { threshold: 0.3 });

  const perfSection = document.getElementById('performance');
  if (perfSection) {
    observer.observe(perfSection);
  }
}

function animateCounter(el, target, suffix, duration) {
  const start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Smooth easeOutExpo curve
    const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    const current = Math.floor(start + (target - start) * ease);

    el.textContent = current + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target + suffix;
    }
  }

  requestAnimationFrame(update);
}

/* ==========================================================================
   9. CAROUSEL ARROW NAVIGATION
   ========================================================================== */
function initCarousels() {
  // Featured cars carousel arrow navigation
  const featPrev = document.getElementById('featuredPrev');
  const featNext = document.getElementById('featuredNext');
  const carsGrid = document.getElementById('carsGrid');

  if (featPrev && featNext && carsGrid) {
    featNext.addEventListener('click', () => {
      const visibleCard = carsGrid.querySelector('.car-card:not([style*="display: none"])');
      const cardWidth = visibleCard ? visibleCard.offsetWidth + 24 : 340;
      carsGrid.scrollBy({ left: cardWidth, behavior: 'smooth' });
    });

    featPrev.addEventListener('click', () => {
      const visibleCard = carsGrid.querySelector('.car-card:not([style*="display: none"])');
      const cardWidth = visibleCard ? visibleCard.offsetWidth + 24 : 340;
      carsGrid.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    });
  }

  // Testimonials carousel
  const testPrev = document.getElementById('testimonialPrev');
  const testNext = document.getElementById('testimonialNext');
  const testimonialsGrid = document.getElementById('testimonialsGrid');

  if (testPrev && testNext && testimonialsGrid) {
    testNext.addEventListener('click', () => {
      const card = testimonialsGrid.querySelector('.testimonial-card');
      const step = card ? card.offsetWidth + 28 : 360;
      testimonialsGrid.scrollBy({ left: step, behavior: 'smooth' });
    });

    testPrev.addEventListener('click', () => {
      const card = testimonialsGrid.querySelector('.testimonial-card');
      const step = card ? card.offsetWidth + 28 : 360;
      testimonialsGrid.scrollBy({ left: -step, behavior: 'smooth' });
    });
  }
}

/* ==========================================================================
   10. MOBILE MENU TOGGLE
   ========================================================================== */
function initMobileMenu() {
  const toggle = document.getElementById('mobileMenuToggle');
  const navPill = document.getElementById('navPill');
  if (!toggle || !navPill) return;

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = navPill.classList.toggle('mobile-open');
    toggle.classList.toggle('active', isOpen);
  });

  // Close menu when tapping any navigation link
  navPill.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navPill.classList.remove('mobile-open');
      toggle.classList.remove('active');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navPill.contains(e.target) && !toggle.contains(e.target)) {
      navPill.classList.remove('mobile-open');
      toggle.classList.remove('active');
    }
  });

  // Automatically reset menu when expanding window to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 960) {
      navPill.classList.remove('mobile-open');
      toggle.classList.remove('active');
    }
  });
}

/* ==========================================================================
   11. BRAND LOGO INTERACTION
   ========================================================================== */
function initBrandClicks() {
  document.querySelectorAll('.brand-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const brand = btn.dataset.brand;
      const featuredSec = document.getElementById('featured');
      if (featuredSec) {
        featuredSec.scrollIntoView({ behavior: 'smooth' });
        showToast(`Filtered collection for ${brand}`);
      }
    });
  });

  // Category card interactions
  document.querySelectorAll('.cat-card').forEach(card => {
    card.addEventListener('click', () => {
      const cat = card.dataset.cat;
      const catName = card.querySelector('.cat-name')?.textContent || cat;
      const featuredSec = document.getElementById('featured');
      if (featuredSec) {
        featuredSec.scrollIntoView({ behavior: 'smooth' });
        const dropdownItem = document.querySelector(`.dropdown-item[data-filter="${cat}"]`);
        if (dropdownItem) {
          dropdownItem.click();
        } else {
          showToast(`Browsing ${catName} allocations`);
        }
      }
    });
  });

  // Newsletter subscribe form
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Thank you for subscribing to AutoVault VIP Concierge!');
      newsletterForm.reset();
    });
  }
}

/* ==========================================================================
   12. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (!revealElements.length) return;

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }
}

/* ==========================================================================
   13. 3D CARD TILT & HOVER MICRO-ANIMATIONS
   ========================================================================== */
function initCardTiltHover() {
  const cards = document.querySelectorAll('.car-card, .service-card-item');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ==========================================================================
   14. FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    if (trigger) {
      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        faqItems.forEach(i => i.classList.remove('open'));
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    }
  });
}

/* ==========================================================================
   15. INVENTORY PAGE SEARCH & FILTER SYSTEM
   ========================================================================== */
function initInventoryPage() {
  const searchInput = document.getElementById('inventorySearch');
  const filterPills = document.querySelectorAll('.inventory-toolbar .filter-pill');
  const inventoryCards = document.querySelectorAll('.inventory-car-card');

  if (!inventoryCards.length) return;

  function filterCars() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const activePill = document.querySelector('.inventory-toolbar .filter-pill.active');
    const category = activePill ? activePill.dataset.category : 'all';

    let matchCount = 0;
    inventoryCards.forEach(card => {
      const cardTitle = (card.dataset.title || '').toLowerCase();
      const cardCat = (card.dataset.category || '').toLowerCase();
      const cardBrand = (card.dataset.brand || '').toLowerCase();

      const matchesSearch = !query || cardTitle.includes(query) || cardBrand.includes(query);
      const matchesCategory = category === 'all' || cardCat === category || cardBrand === category;

      if (matchesSearch && matchesCategory) {
        card.style.display = '';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
        matchCount++;
      } else {
        card.style.display = 'none';
      }
    });

    const countEl = document.getElementById('inventoryCount');
    if (countEl) {
      countEl.textContent = `${matchCount} Vehicles Available`;
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', filterCars);
  }

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      filterCars();
    });
  });

  // Fast-filter buttons in hero telemetry HUD
  document.querySelectorAll('.t-tag-btn[data-quick-filter]').forEach(tagBtn => {
    tagBtn.addEventListener('click', () => {
      const brand = tagBtn.dataset.quickFilter;
      if (searchInput && brand) {
        searchInput.value = brand;
        filterCars();
        document.querySelector('.inventory-toolbar')?.scrollIntoView({ behavior: 'smooth' });
        showToast(`Filtered for ${brand} allocations`);
      }
    });
  });

  // Contact Page Form
  const contactForm = document.getElementById('contactPageForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('VIP Appointment confirmed! Our Mayfair officer will contact you shortly.');
      contactForm.reset();
    });
  }

  // Service Inquiry Form
  const serviceForm = document.getElementById('serviceInquiryForm');
  if (serviceForm) {
    serviceForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal('testDriveModal');
      showToast('Concierge inquiry received! We will reach out within 60 minutes.');
      serviceForm.reset();
    });
  }

  // Showroom Card selection
  const showroomCards = document.querySelectorAll('.showroom-card');
  showroomCards.forEach(sc => {
    sc.addEventListener('click', () => {
      showroomCards.forEach(c => c.classList.remove('active'));
      sc.classList.add('active');
    });
  });
}

/* ==========================================================================
   16. FLOATING BACK-TO-TOP BUTTON
   ========================================================================== */
function initBackToTop() {
  const btn = document.getElementById('backToTopBtn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   17. SMOOTH SCROLLING FOR ALL INTERNAL ANCHORS
   ========================================================================== */
function initSmoothScrollLinks() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

/* ==========================================================================
   18. CINEMATIC VIDEO MODAL PLAYER INTERACTION
   ========================================================================== */
function initVideoPlayer() {
  const videoOverlay = document.querySelector('.video-play-overlay');
  const playBtn = document.querySelector('.glowing-play-btn');
  if (!videoOverlay) return;

  let isPlaying = false;
  videoOverlay.addEventListener('click', () => {
    isPlaying = !isPlaying;
    const titleEl = document.querySelector('.video-preview-title');
    const descEl = document.querySelector('.video-preview-desc');

    if (isPlaying) {
      if (playBtn) {
        playBtn.innerHTML = `
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#FF5722">
            <rect x="6" y="4" width="4" height="16"></rect>
            <rect x="14" y="4" width="4" height="16"></rect>
          </svg>
        `;
        playBtn.style.transform = 'scale(1.2)';
      }
      if (titleEl) titleEl.textContent = 'Now Streaming: The AutoVault Legacy (4K UHD)';
      if (descEl) descEl.textContent = 'Dolby Vision · High Bitrate Master · Immersive Audio';
      showToast('Cinematic 4K stream initiated.');
    } else {
      if (playBtn) {
        playBtn.innerHTML = `
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#FF5722">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        `;
        playBtn.style.transform = '';
      }
      if (titleEl) titleEl.textContent = 'The AutoVault Legacy: Engineering & Passion';
      if (descEl) descEl.textContent = 'Curating world-class automotive mastery since 2014.';
      showToast('Stream paused.');
    }
  });
}

/* ==========================================================================
   19. FOOTER SOCIAL & LEGAL LINKS
   ========================================================================== */
function initFooterInteractions() {
  // Social icons feedback
  document.querySelectorAll('.social-icon-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const label = btn.getAttribute('aria-label') || 'Social channel';
      if (btn.getAttribute('href') === '#') {
        e.preventDefault();
        showToast(`Connecting to AutoVault official ${label}...`);
      }
    });
  });

  // Footer policy links
  document.querySelectorAll('.footer-bottom-links a').forEach(link => {
    if (link.getAttribute('href') === '#') {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        showToast(`${link.textContent} documentation verified (AutoVault Compliance 2026).`);
      });
    }
  });

  // Brand logos smooth scroll top
  document.querySelectorAll('a.brand-logo').forEach(logo => {
    logo.addEventListener('click', (e) => {
      if (logo.getAttribute('href') === '#' || logo.getAttribute('href') === '') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });
}

/* ==========================================================================
   20. GLOBAL LIVE SEARCH ENGINE & INVENTORY DISCOVERY
   ========================================================================== */
const AUTOVAULT_CATALOG = [
  {
    title: 'Mercedes-AMG GT R Coupe',
    brand: 'Mercedes-AMG',
    category: 'supercar',
    engine: '4.0L Bi-Turbo V8',
    hp: '577 HP',
    sprint: '3.6s',
    price: '₹ 2.71 Cr',
    year: '2024',
    badge: 'Vault Allocation',
    badgeColor: '#FF5722',
    img: 'assets/images/slide1.png'
  },
  {
    title: 'Lamborghini Huracán Tecnica',
    brand: 'Lamborghini',
    category: 'supercar',
    engine: '5.2L Naturally Aspirated V10',
    hp: '631 HP',
    sprint: '3.2s',
    price: '₹ 4.04 Cr',
    year: '2024',
    badge: 'V10 Pure',
    badgeColor: '#FFA07A',
    img: 'assets/images/slide2.png'
  },
  {
    title: 'Bentley Continental GT V8',
    brand: 'Bentley',
    category: 'grand-tourer',
    engine: '4.0L Twin-Turbo V8',
    hp: '542 HP',
    sprint: '3.9s',
    price: '₹ 3.95 Cr',
    year: '2024',
    badge: 'Mulliner Spec',
    badgeColor: '#00E5FF',
    img: 'assets/images/slide3.png'
  },
  {
    title: 'Porsche 718 Cayman GT4',
    brand: 'Porsche',
    category: 'supercar',
    engine: '4.0L Flat-6 Atmospheric',
    hp: '414 HP',
    sprint: '3.9s',
    price: '₹ 1.65 Cr',
    year: '2023',
    badge: '6-Speed Manual',
    badgeColor: '#FFD700',
    img: 'assets/images/hero_autovault_porsche.jpg'
  },
  {
    title: 'Porsche 911 GT3 RS',
    brand: 'Porsche',
    category: 'supercar',
    engine: '4.0L Naturally Aspirated Flat-6',
    hp: '518 HP',
    sprint: '3.2s',
    price: '₹ 3.52 Cr',
    year: '2024',
    badge: 'Weissach Spec',
    badgeColor: '#FF5722',
    img: 'assets/images/cand_porsche_gt3.jpg'
  },
  {
    title: 'Mercedes-Benz S-Class S580',
    brand: 'Mercedes-Benz',
    category: 'sedan electric',
    engine: '4.0L Bi-Turbo Hybrid V8',
    hp: '496 HP',
    sprint: '4.4s',
    price: '₹ 1.28 Cr',
    year: '2024',
    badge: 'Hybrid VIP',
    badgeColor: '#00E5FF',
    img: 'assets/images/cars_mercedes_s_class.jpg'
  },
  {
    title: 'BMW X7 M60i xDrive',
    brand: 'BMW',
    category: 'suv',
    engine: '4.4L Twin-Turbo V8',
    hp: '523 HP',
    sprint: '4.5s',
    price: '₹ 1.32 Cr',
    year: '2024',
    badge: 'M-Performance',
    badgeColor: '#FF5722',
    img: 'assets/images/cars_bmw_x7.jpg'
  },
  {
    title: 'Audi RS e-tron GT Quattro',
    brand: 'Audi',
    category: 'electric supercar',
    engine: '800V Dual Electric Motor',
    hp: '637 HP',
    sprint: '3.1s',
    price: '₹ 1.89 Cr',
    year: '2024',
    badge: 'Dual Electric',
    badgeColor: '#00E5FF',
    img: 'assets/images/cars_audi_etron_gt.jpg'
  },
  {
    title: 'Range Rover SV Bespoke',
    brand: 'Land Rover',
    category: 'suv',
    engine: '4.4L Twin-Turbo V8',
    hp: '606 HP',
    sprint: '4.3s',
    price: '₹ 2.45 Cr',
    year: '2024',
    badge: 'SV Bespoke',
    badgeColor: '#FFA07A',
    img: 'assets/images/cars_range_rover_sport.jpg'
  },
  {
    title: 'Apex Valkyrie Hypercar',
    brand: 'Apex McLaren',
    category: 'supercar electric',
    engine: 'Hybrid Quad-Turbo V8',
    hp: '1,100 HP',
    sprint: '2.4s',
    price: '₹ 3.85 Cr',
    year: '2024',
    badge: '1 of 15 Worldwide',
    badgeColor: '#FF5722',
    img: 'assets/images/hero_hypercar.jpg'
  },
  {
    title: 'BMW M3 Competition xDrive',
    brand: 'BMW',
    category: 'sedan supercar',
    engine: '3.0L TwinPower Turbo I6',
    hp: '503 HP',
    sprint: '3.4s',
    price: '₹ 1.48 Cr',
    year: '2024',
    badge: 'M xDrive',
    badgeColor: '#FFA07A',
    img: 'assets/images/blue_bmw_villa.jpg'
  }
];

function initGlobalSearch() {
  const searchModal = document.getElementById('globalSearchModal');
  const searchInput = document.getElementById('globalSearchInput');
  const searchClear = document.getElementById('globalSearchClear');
  const searchResultsGrid = document.getElementById('globalSearchResults');
  const searchCountEl = document.getElementById('searchResultsCount');
  const pillButtons = document.querySelectorAll('.search-pill');
  const searchTriggers = document.querySelectorAll('#searchTrigger, .search-trigger-btn, [data-open="globalSearchModal"]');

  if (!searchModal) return;

  let currentFilter = 'all';

  function openSearchModal() {
    openModal('globalSearchModal');
    if (searchInput) {
      setTimeout(() => {
        searchInput.focus();
        searchInput.select();
      }, 150);
    }
    renderResults();
  }

  // Trigger buttons
  searchTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openSearchModal();
    });
  });

  // Keyboard shortcut listener (Cmd/Ctrl + K or '/')
  document.addEventListener('keydown', (e) => {
    const isSearchModalOpen = searchModal.classList.contains('open');

    // Escape to close
    if (e.key === 'Escape' && isSearchModalOpen) {
      closeModal('globalSearchModal');
      return;
    }

    // Ctrl/Cmd + K
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (isSearchModalOpen) {
        closeModal('globalSearchModal');
      } else {
        openSearchModal();
      }
      return;
    }

    // Forward Slash '/' when not focusing another input
    if (e.key === '/' && !isSearchModalOpen) {
      const activeTagName = (document.activeElement?.tagName || '').toLowerCase();
      if (activeTagName !== 'input' && activeTagName !== 'textarea') {
        e.preventDefault();
        openSearchModal();
      }
    }
  });

  // Real-time input filtering
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const val = searchInput.value.trim();
      if (searchClear) {
        searchClear.style.display = val ? 'flex' : 'none';
      }
      renderResults();
    });
  }

  // Clear button
  if (searchClear) {
    searchClear.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        searchInput.focus();
      }
      searchClear.style.display = 'none';
      renderResults();
    });
  }

  // Quick filter pills
  pillButtons.forEach(pill => {
    pill.addEventListener('click', () => {
      pillButtons.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentFilter = pill.dataset.searchFilter || 'all';
      renderResults();
    });
  });

  // Render search results
  function renderResults() {
    if (!searchResultsGrid) return;

    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

    const filtered = AUTOVAULT_CATALOG.filter(car => {
      // Check pill filter
      let matchesPill = true;
      if (currentFilter !== 'all') {
        const cf = currentFilter.toLowerCase();
        const brandMatch = car.brand.toLowerCase().includes(cf);
        const catMatch = car.category.toLowerCase().includes(cf);
        const engineMatch = car.engine.toLowerCase().includes(cf);
        matchesPill = brandMatch || catMatch || engineMatch;
      }

      // Check text query
      let matchesQuery = true;
      if (query) {
        const titleMatch = car.title.toLowerCase().includes(query);
        const brandMatch = car.brand.toLowerCase().includes(query);
        const engineMatch = car.engine.toLowerCase().includes(query);
        const catMatch = car.category.toLowerCase().includes(query);
        const hpMatch = car.hp.toLowerCase().includes(query);
        const badgeMatch = car.badge.toLowerCase().includes(query);
        matchesQuery = titleMatch || brandMatch || engineMatch || catMatch || hpMatch || badgeMatch;
      }

      return matchesPill && matchesQuery;
    });

    // Update result count header
    if (searchCountEl) {
      if (query) {
        searchCountEl.textContent = `Found ${filtered.length} verified allocation${filtered.length === 1 ? '' : 's'} matching "${query}"`;
      } else if (currentFilter !== 'all') {
        searchCountEl.textContent = `Showing ${filtered.length} allocation${filtered.length === 1 ? '' : 's'} filtered by ${currentFilter}`;
      } else {
        searchCountEl.textContent = `Showing all ${filtered.length} verified vault allocations`;
      }
    }

    // Render cards or empty state
    if (filtered.length === 0) {
      searchResultsGrid.innerHTML = `
        <div class="search-empty-state">
          <svg class="search-empty-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <line x1="8" y1="11" x2="14" y2="11"></line>
          </svg>
          <div class="search-empty-title">No allocations matched your search</div>
          <p class="search-empty-desc">We couldn't find any vehicles matching "${query || currentFilter}". Try searching for popular marques like Porsche, AMG, Lamborghini, or V8 Bi-Turbo.</p>
          <button type="button" class="search-pill active" id="resetSearchFiltersBtn" style="margin-top: 1rem; padding: 8px 22px;">Reset All Filters</button>
        </div>
      `;

      const resetBtn = document.getElementById('resetSearchFiltersBtn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          if (searchInput) searchInput.value = '';
          if (searchClear) searchClear.style.display = 'none';
          currentFilter = 'all';
          pillButtons.forEach(p => p.classList.toggle('active', p.dataset.searchFilter === 'all'));
          renderResults();
        });
      }
      return;
    }

    searchResultsGrid.innerHTML = filtered.map(car => `
      <div class="search-result-card" data-title="${car.title}">
        <div class="search-result-media">
          <img src="${car.img}" alt="${car.title}" loading="lazy">
          <span class="search-result-badge" style="background:${car.badgeColor}; color:#fff;">${car.badge}</span>
        </div>
        <div class="search-result-info">
          <div class="search-result-brand">${car.brand} · ${car.year}</div>
          <h4 class="search-result-title">${car.title}</h4>
          <div class="search-result-specs">${car.sprint} 0-100 · ${car.hp} · ${car.engine}</div>
        </div>
        <div class="search-result-right">
          <div class="search-result-price">${car.price}</div>
          <button type="button" class="search-result-btn" data-car-name="${car.title}">
            <span>View Dossier</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
      </div>
    `).join('');

    // Attach click handlers to cards and view dossier buttons
    searchResultsGrid.querySelectorAll('.search-result-card').forEach(card => {
      card.addEventListener('click', () => {
        const carTitle = card.dataset.title;
        const selectedCar = AUTOVAULT_CATALOG.find(c => c.title === carTitle);
        if (selectedCar) {
          handleSelectSearchResult(selectedCar);
        }
      });
    });
  }

  function handleSelectSearchResult(car) {
    closeModal('globalSearchModal');

    // If car detail modal exists on this page (index.html or cars.html)
    const detailModal = document.getElementById('carDetailModal');
    if (detailModal) {
      const titleEl = document.getElementById('detailModalTitle');
      const priceEl = document.getElementById('detailModalPrice');
      const imgEl = document.getElementById('detailModalImg');
      const specsEl = document.getElementById('detailModalSpecs');

      if (titleEl) titleEl.textContent = car.title;
      if (priceEl) priceEl.textContent = car.price;
      if (imgEl) imgEl.src = car.img;
      if (specsEl) specsEl.textContent = `${car.sprint} 0-100 · ${car.hp} · ${car.engine}`;

      openModal('carDetailModal');
      showToast(`Loaded dossier for ${car.title}`);
    } else {
      // On inner pages like services, about, contact: navigate to cars.html
      window.location.href = `cars.html?search=${encodeURIComponent(car.title)}`;
    }
  }

  // Initial render when script loads
  renderResults();
}




