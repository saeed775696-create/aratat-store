import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { FiChevronRight, FiChevronLeft, FiShoppingBag } from 'react-icons/fi';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { STORE_CONFIG } from '../../config.js';
import './HeroSlider.css';

const slides = [
  {
    id: 1,
    titleAr: 'وفرة بلا حدود',
    titleEn: 'Abundance Without Limits',
    subAr: 'آلاف المنتجات لكل احتياجات منزلك وعائلتك بأفضل الأسعار',
    subEn: 'Thousands of products for all your home & family needs at the best prices',
    tagAr: '🏆 الأكثر ثقة في اليمن',
    tagEn: '🏆 Most Trusted in Yemen',
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    accent: 'var(--red)',
    image: '/images/brand/hero-1.jpg',
    ctaLink: '/catalog',
  },
  {
    id: 2,
    titleAr: 'أدوات المطبخ الاحترافية',
    titleEn: 'Professional Kitchen Tools',
    subAr: 'أحدث عصارات وخلاطات وأواني الطبخ من أفضل الماركات العالمية',
    subEn: 'Latest juicers, blenders, and cookware from top international brands',
    tagAr: '🍳 جديد في المتجر',
    tagEn: '🍳 New in Store',
    gradient: 'linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1a2840 100%)',
    accent: 'var(--orange)',
    image: '/images/brand/hero-2.jpg',
    ctaLink: '/catalog?category=kitchen',
  },
  {
    id: 3,
    titleAr: 'توزيعات الحفلات والمناسبات',
    titleEn: 'Party Favors & Occasions',
    subAr: 'كل ما تحتاجه لحفلة لا تُنسى من زينة وتوزيعات وهدايا',
    subEn: 'Everything you need for an unforgettable party — decor, favors & gifts',
    tagAr: '🎉 عروض موسمية',
    tagEn: '🎉 Seasonal Offers',
    gradient: 'linear-gradient(135deg, #1a0a2e 0%, #2d1650 50%, #1a1040 100%)',
    accent: 'var(--teal)',
    image: '/images/brand/hero-3.jpg',
    ctaLink: '/catalog?category=party',
  },
  {
    id: 4,
    titleAr: 'عروض حصرية لا تفوّت',
    titleEn: 'Exclusive Deals You Cannot Miss',
    subAr: 'خصومات تصل إلى 50% على منتجات مختارة — عروض محدودة المدة!',
    subEn: 'Up to 50% off on selected products — limited time offers!',
    tagAr: '🔥 تخفيضات اليوم',
    tagEn: '🔥 Today\'s Deals',
    gradient: 'linear-gradient(135deg, #2a0a0a 0%, #3d1010 50%, #1a0808 100%)',
    accent: 'var(--pink)',
    image: '/images/brand/hero-4.jpg',
    ctaLink: '/catalog?category=offers',
  },
];

export default function HeroSlider() {
  const { t, lang } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent(c => (c + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent(c => (c - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, isPaused]);

  const slide = slides[current];

  const variants = {
    enter: d => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: d => ({ x: d > 0 ? '-100%' : '100%', opacity: 0 }),
  };

  return (
    <section
      className="hero"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Hero slider"
    >
      <AnimatePresence custom={direction} mode="popLayout">
        <motion.div
          key={slide.id}
          className="hero-slide"
          style={{ background: slide.gradient }}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Background image with parallax-like overlay */}
          <div className="hero-bg-img" style={{ backgroundImage: `url(${slide.image})` }} />
          <div className="hero-overlay" />

          {/* Content */}
          <div className="container hero-content">
            <motion.div
              className="hero-text"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <span className="hero-tag" style={{ background: `${slide.accent}22`, color: slide.accent, border: `1px solid ${slide.accent}44` }}>
                {lang === 'ar' ? slide.tagAr : slide.tagEn}
              </span>
              <h1 className="hero-title">
                {lang === 'ar' ? slide.titleAr : slide.titleEn}
              </h1>
              <p className="hero-sub">
                {lang === 'ar' ? slide.subAr : slide.subEn}
              </p>
              <div className="hero-ctas">
                <Link to={slide.ctaLink} className="btn btn-lg btn-primary" id={`hero-shop-${slide.id}`}>
                  <FiShoppingBag aria-hidden />
                  {t('home.shopNow')}
                </Link>
                <a
                  href={`https://wa.me/${STORE_CONFIG.whatsapp.primary}?text=${encodeURIComponent(lang === 'ar' ? 'مرحباً، أريد الاستفسار عن المنتجات' : 'Hello, I want to inquire about products')}`}
                  target="_blank" rel="noreferrer"
                  className="btn btn-lg btn-ghost"
                  id="hero-whatsapp"
                >
                  <FaWhatsapp aria-hidden />
                  {t('home.whatsappOrder')}
                </a>
              </div>

              {/* Trust badges */}
              <div className="hero-trust">
                <div className="trust-item">
                  <span className="trust-num">+142K</span>
                  <span className="trust-label">{t('home.followers')}</span>
                </div>
                <div className="trust-divider" />
                <div className="trust-item">
                  <span className="trust-num">+5000</span>
                  <span className="trust-label">{lang === 'ar' ? 'منتج' : 'Products'}</span>
                </div>
                <div className="trust-divider" />
                <div className="trust-item">
                  <span className="trust-num">100%</span>
                  <span className="trust-label">{lang === 'ar' ? 'ضمان الجودة' : 'Quality Guarantee'}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <button className="hero-ctrl hero-prev" onClick={prev} aria-label="Previous slide" id="hero-prev">
        {lang === 'ar' ? <FiChevronRight /> : <FiChevronLeft />}
      </button>
      <button className="hero-ctrl hero-next" onClick={next} aria-label="Next slide" id="hero-next">
        {lang === 'ar' ? <FiChevronLeft /> : <FiChevronRight />}
      </button>

      {/* Dots */}
      <div className="hero-dots" role="tablist" aria-label="Slide indicators">
        {slides.map((s, i) => (
          <button
            key={s.id}
            className={`hero-dot ${i === current ? 'active' : ''}`}
            onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
            aria-label={`Go to slide ${i + 1}`}
            aria-selected={i === current}
            role="tab"
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="hero-progress">
        <motion.div
          className="hero-progress-bar"
          key={current}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isPaused ? undefined : 1 }}
          transition={{ duration: 5, ease: 'linear' }}
        />
      </div>
    </section>
  );
}
