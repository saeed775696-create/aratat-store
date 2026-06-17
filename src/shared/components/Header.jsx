import { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingCart, FiSearch, FiPhone, FiGlobe, FiMenu, FiX, FiPackage } from 'react-icons/fi';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { useCartStore } from '../store/stores.js';
import { STORE_CONFIG } from '../../config.js';
import './Header.css';

export default function Header() {
  const { t, lang, toggleLang } = useLanguage();
  const cartItems = useCartStore(s => s.items);
  const totalItems = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchVal, setSearchVal]   = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile nav on route change
  useEffect(() => { setMobileOpen(false); }, [navigate]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/catalog?q=${encodeURIComponent(searchVal.trim())}`);
      setSearchVal('');
    }
  };

  const navLinks = [
    { to: '/',        label: t('nav.home')    },
    { to: '/catalog', label: t('nav.catalog') },
    { to: '/catalog?category=offers', label: t('nav.offers') },
    { to: '/contact', label: t('nav.contact') },
  ];

  return (
    <>
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container header-inner">
          {/* Logo */}
          <Link to="/" className="header-logo" aria-label={STORE_CONFIG.nameAr}>
            <div className="logo-text">
              <span className="logo-name">
                عرطات <span>للتسويق</span>
              </span>
              <span className="logo-tagline">
                {lang === 'ar' ? STORE_CONFIG.taglineAr : STORE_CONFIG.taglineEn}
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="header-nav" aria-label="main navigation">
            {navLinks.map(link => (
              <NavLink key={link.to} to={link.to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end={link.to === '/'}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Search */}
          <form className="header-search" onSubmit={handleSearch} role="search">
            <FiSearch className="search-icon" aria-hidden />
            <input
              type="search"
              placeholder={t('nav.search')}
              value={searchVal}
              onChange={e => setSearchVal(e.target.value)}
              aria-label={t('nav.search')}
            />
          </form>

          {/* Actions */}
          <div className="header-actions">
            {/* Phone */}
            <a
              href={`tel:+${STORE_CONFIG.whatsapp.primary}`}
              className="header-phone"
              aria-label="Call us"
            >
              <FiPhone aria-hidden />
              {STORE_CONFIG.whatsapp.displayPrimary}
            </a>

            {/* Language toggle */}
            <button className="lang-btn" onClick={toggleLang} aria-label="Switch language" id="lang-toggle">
              <FiGlobe aria-hidden />
              {lang === 'ar' ? 'EN' : 'عر'}
            </button>

            {/* Orders */}
            <Link to="/orders" className="btn btn-sm btn-outline" aria-label={t('nav.orders')} id="orders-link">
              <FiPackage aria-hidden />
            </Link>

            {/* Cart */}
            <Link to="/cart" className="cart-btn" aria-label={`${t('nav.cart')} (${totalItems})`} id="cart-link">
              <FiShoppingCart aria-hidden />
              <span>{t('nav.cart')}</span>
              {totalItems > 0 && (
                <motion.span
                  key={totalItems}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="cart-badge"
                  aria-live="polite"
                >
                  {totalItems}
                </motion.span>
              )}
            </Link>

            {/* Hamburger */}
            <button
              className={`hamburger ${mobileOpen ? 'open' : ''}`}
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              id="mobile-menu-btn"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            className="mobile-nav"
            initial={{ x: lang === 'ar' ? '100%' : '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: lang === 'ar' ? '100%' : '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            aria-label="mobile navigation"
          >
            {/* Mobile search */}
            <form onSubmit={handleSearch} role="search" style={{ position: 'relative' }}>
              <FiSearch style={{ position: 'absolute', insetInlineStart: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                className="field"
                style={{ paddingInlineStart: 36 }}
                type="search"
                placeholder={t('nav.search')}
                value={searchVal}
                onChange={e => setSearchVal(e.target.value)}
              />
            </form>

            {navLinks.map(link => (
              <NavLink key={link.to} to={link.to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>
                {link.label}
              </NavLink>
            ))}

            <a href={`tel:+${STORE_CONFIG.whatsapp.primary}`} className="header-phone" style={{ justifyContent: 'center' }}>
              <FiPhone /> {STORE_CONFIG.whatsapp.displayPrimary}
            </a>

            <button className="lang-btn" onClick={() => { toggleLang(); setMobileOpen(false); }} style={{ justifyContent: 'center' }}>
              <FiGlobe /> {lang === 'ar' ? 'English' : 'العربية'}
            </button>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
