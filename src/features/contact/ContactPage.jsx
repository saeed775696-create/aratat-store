import { FaWhatsapp, FaInstagram, FaFacebook, FaPhone, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';
import SEOHead from '../../shared/components/SEOHead.jsx';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { STORE_CONFIG } from '../../config.js';
import './ContactPage.css';

export default function ContactPage() {
  const { t, lang } = useLanguage();

  return (
    <main className="contact-page page-wrapper">
      <SEOHead 
        titleAr="اتصل بنا — عرطات للتسويق" 
        titleEn="Contact Us — Aratat" 
      />

      <div className="container contact-container">
        <div className="contact-header">
          <h1 className="contact-title">{t('footer.contactUs')}</h1>
          <p className="contact-sub">
            {lang === 'ar' 
              ? 'نحن هنا لمساعدتك! تواصل معنا عبر القنوات التالية وسنقوم بالرد عليك في أقرب وقت.' 
              : 'We are here to help! Reach out through any of the channels below and we will get back to you ASAP.'}
          </p>
        </div>

        <div className="contact-grid">
          {/* Main WhatsApp Support */}
          <div className="contact-card primary-card">
            <div className="card-icon"><FaWhatsapp /></div>
            <h2>{lang === 'ar' ? 'الطلب والدعم السريع' : 'Fast Order & Support'}</h2>
            <p>{lang === 'ar' ? 'أسرع طريقة للوصول إلينا هي عبر واتساب.' : 'The fastest way to reach us is via WhatsApp.'}</p>
            
            <div className="contact-links">
              <a href={`https://wa.me/${STORE_CONFIG.whatsapp.primary}`} target="_blank" rel="noreferrer" className="btn btn-whatsapp">
                <FaWhatsapp /> {lang === 'ar' ? 'مراسلة الخط الرئيسي' : 'Message Main Line'}
              </a>
              <div className="other-lines">
                <span>{lang === 'ar' ? 'خطوط أخرى:' : 'Other Lines:'}</span>
                <a href={`https://wa.me/${STORE_CONFIG.whatsapp.secondary}`} target="_blank" rel="noreferrer" dir="ltr">{STORE_CONFIG.whatsapp.displaySecondary}</a>
                <a href={`https://wa.me/${STORE_CONFIG.whatsapp.tertiary}`} target="_blank" rel="noreferrer" dir="ltr">{STORE_CONFIG.whatsapp.displayTertiary}</a>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="contact-card">
            <div className="card-icon"><FaInstagram /></div>
            <h2>{lang === 'ar' ? 'تواصل اجتماعي' : 'Social Media'}</h2>
            <p>{lang === 'ar' ? 'تابعنا لمعرفة أحدث العروض والمنتجات.' : 'Follow us for the latest offers and products.'}</p>
            
            <div className="social-grid">
              <a href={STORE_CONFIG.social.instagram} target="_blank" rel="noreferrer" className="social-btn-large ig">
                <FaInstagram /> Instagram
              </a>
              <a href={STORE_CONFIG.social.facebook} target="_blank" rel="noreferrer" className="social-btn-large fb">
                <FaFacebook /> Facebook
              </a>
            </div>
          </div>

          {/* Location & Email */}
          <div className="contact-card">
            <div className="card-icon"><FaMapMarkerAlt /></div>
            <h2>{lang === 'ar' ? 'معلومات إضافية' : 'Additional Info'}</h2>
            
            <ul className="info-list">
              <li>
                <FaMapMarkerAlt className="info-icon" />
                <div>
                  <strong>{lang === 'ar' ? 'الموقع' : 'Location'}</strong>
                  <p>{lang === 'ar' ? 'اليمن' : 'Yemen'}</p>
                </div>
              </li>
              <li>
                <FaEnvelope className="info-icon" />
                <div>
                  <strong>{lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}</strong>
                  <p dir="ltr">info@aratat.com</p>
                </div>
              </li>
              <li>
                <FaPhone className="info-icon" />
                <div>
                  <strong>{lang === 'ar' ? 'اتصال هاتفي' : 'Phone Call'}</strong>
                  <p dir="ltr">{STORE_CONFIG.whatsapp.displayPrimary}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
