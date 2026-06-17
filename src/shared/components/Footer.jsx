import { Link } from 'react-router-dom';
import { FaWhatsapp, FaInstagram, FaFacebook, FaPhone } from 'react-icons/fa';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { STORE_CONFIG } from '../../config.js';
import './Footer.css';

export default function Footer() {
  const { t, lang } = useLanguage();
  const year = new Date().getFullYear();

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/catalog', label: t('nav.catalog') },
    { to: '/catalog?category=offers', label: t('nav.offers') },
    { to: '/orders', label: t('nav.orders') },
    { to: '/contact', label: t('nav.contact') },
  ];

  const phones = [
    { number: STORE_CONFIG.whatsapp.primary, display: STORE_CONFIG.whatsapp.displayPrimary },
    { number: STORE_CONFIG.whatsapp.secondary, display: STORE_CONFIG.whatsapp.displaySecondary },
    { number: STORE_CONFIG.whatsapp.tertiary, display: STORE_CONFIG.whatsapp.displayTertiary },
  ];

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-top">
        <div className="container footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="footer-logo-name">عرطات <span>للتسويق</span></span>
            </div>
            <p className="footer-desc">{t('footer.desc')}</p>
            <div className="footer-socials">
              <a href={STORE_CONFIG.social.instagram} target="_blank" rel="noreferrer" className="social-btn social-ig" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href={STORE_CONFIG.social.facebook} target="_blank" rel="noreferrer" className="social-btn social-fb" aria-label="Facebook">
                <FaFacebook />
              </a>
              <a href={`https://wa.me/${STORE_CONFIG.whatsapp.primary}`} target="_blank" rel="noreferrer" className="social-btn social-wa" aria-label="WhatsApp">
                <FaWhatsapp />
              </a>
            </div>
            <div className="footer-followers">
              <span className="followers-count">+142,000</span>
              <span className="followers-label">{t('home.followersLabel')}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h3 className="footer-col-title">{t('footer.quickLinks')}</h3>
            <ul className="footer-links">
              {navLinks.map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="footer-link">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h3 className="footer-col-title">{t('footer.contactUs')}</h3>
            <ul className="footer-phones">
              {phones.map(p => (
                <li key={p.number}>
                  <a href={`tel:+${p.number}`} className="footer-phone">
                    <FaPhone className="phone-icon" />
                    <span dir="ltr">{p.display}</span>
                  </a>
                  <a
                    href={`https://wa.me/${p.number}`}
                    target="_blank" rel="noreferrer"
                    className="wa-inline"
                    aria-label={`WhatsApp ${p.display}`}
                  >
                    <FaWhatsapp /> {lang === 'ar' ? 'واتساب' : 'WhatsApp'}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow */}
          <div className="footer-col">
            <h3 className="footer-col-title">{t('footer.followUs')}</h3>
            <div className="footer-follow-links">
              <a href={STORE_CONFIG.social.instagram} target="_blank" rel="noreferrer" className="follow-card">
                <FaInstagram className="follow-icon" style={{ color: '#E1306C' }} />
                <div>
                  <div className="follow-name">Instagram</div>
                  <div className="follow-handle">@{STORE_CONFIG.social.handle}</div>
                </div>
              </a>
              <a href={STORE_CONFIG.social.facebook} target="_blank" rel="noreferrer" className="follow-card">
                <FaFacebook className="follow-icon" style={{ color: '#1877F2' }} />
                <div>
                  <div className="follow-name">Facebook</div>
                  <div className="follow-handle">@{STORE_CONFIG.social.handle}</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p className="footer-copy">
            © {year} {t('footer.store')} — {t('footer.rights')}
          </p>
          <p className="footer-copy" style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-xs)' }}>
            {lang === 'ar' ? 'اليمن 🇾🇪' : 'Yemen 🇾🇪'}
          </p>
        </div>
      </div>
    </footer>
  );
}
