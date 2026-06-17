import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { FiX, FiPhone } from 'react-icons/fi';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { STORE_CONFIG } from '../../config.js';
import './FloatingWhatsApp.css';

export default function FloatingWhatsApp() {
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);

  const phones = [
    { number: STORE_CONFIG.whatsapp.primary,   display: STORE_CONFIG.whatsapp.displayPrimary,   label: lang === 'ar' ? 'الخط الرئيسي' : 'Main Line' },
    { number: STORE_CONFIG.whatsapp.secondary, display: STORE_CONFIG.whatsapp.displaySecondary, label: lang === 'ar' ? 'خط المبيعات' : 'Sales Line' },
    { number: STORE_CONFIG.whatsapp.tertiary,  display: STORE_CONFIG.whatsapp.displayTertiary,  label: lang === 'ar' ? 'الدعم' : 'Support' },
  ];

  const greeting = lang === 'ar'
    ? 'مرحباً! كيف يمكننا مساعدتك؟'
    : 'Hello! How can we help you?';

  return (
    <div className="floating-wa" style={{ [lang === 'ar' ? 'left' : 'right']: 'var(--space-6)', right: lang === 'ar' ? 'auto' : 'var(--space-6)', left: lang === 'ar' ? 'var(--space-6)' : 'auto' }}>
      <AnimatePresence>
        {open && (
          <motion.div
            className="wa-popup"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <div className="wa-popup-header">
              <div className="wa-avatar">
                <FaWhatsapp />
              </div>
              <div>
                <div className="wa-popup-name">{lang === 'ar' ? STORE_CONFIG.nameAr : STORE_CONFIG.nameEn}</div>
                <div className="wa-popup-status">🟢 {lang === 'ar' ? 'متاح الآن' : 'Available now'}</div>
              </div>
              <button className="wa-close" onClick={() => setOpen(false)} aria-label="Close">
                <FiX />
              </button>
            </div>
            <div className="wa-popup-body">
              <div className="wa-bubble">{greeting}</div>
              <div className="wa-phones">
                {phones.map(p => (
                  <a
                    key={p.number}
                    href={`https://wa.me/${p.number}?text=${encodeURIComponent(lang === 'ar' ? 'مرحباً، أريد الاستفسار عن منتج' : 'Hello, I have a question about a product')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="wa-phone-btn"
                    aria-label={`WhatsApp ${p.display}`}
                  >
                    <div className="wa-phone-info">
                      <span className="wa-phone-label">{p.label}</span>
                      <span className="wa-phone-num" dir="ltr">{p.display}</span>
                    </div>
                    <FaWhatsapp className="wa-phone-icon" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className="wa-fab"
        onClick={() => setOpen(v => !v)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open WhatsApp chat"
        id="whatsapp-fab"
      >
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {open ? <FiX size={26} /> : <FaWhatsapp size={26} />}
        </motion.span>
        {!open && (
          <motion.span
            className="wa-ping"
            animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.button>
    </div>
  );
}
