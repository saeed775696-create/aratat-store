import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import categories from '../../data/categories.json.js';
import './CategoryGrid.css';

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5, ease: [0.4, 0, 0.2, 1] } }),
};

export default function CategoryGrid() {
  const { t, lang } = useLanguage();

  return (
    <section className="categories-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">🛒 {t('home.categoriesTitle')}</span>
          <h2 className="section-title">{t('home.categoriesTitle')}</h2>
        </div>

        <div className="categories-grid">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={cardVariants}
            >
              <Link
                to={`/catalog?category=${cat.slug}`}
                className="category-card"
                id={`cat-${cat.id}`}
                style={{ '--cat-color': cat.color }}
                aria-label={lang === 'ar' ? cat.nameAr : cat.nameEn}
              >
                <div className="cat-icon">{cat.icon}</div>
                <div className="cat-info">
                  <h3 className="cat-name">{lang === 'ar' ? cat.nameAr : cat.nameEn}</h3>
                  <span className="cat-count">
                    {cat.subcategories.length} {lang === 'ar' ? 'فئة فرعية' : 'subcategories'}
                  </span>
                </div>
                <div className="cat-arrow">
                  {lang === 'ar' ? '\u2190' : '\u2192'}
                </div>
                <div className="cat-bg" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
