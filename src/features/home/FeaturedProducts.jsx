import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import products from '../../data/products.js';
import ProductCard from '../catalog/ProductCard.jsx';
import './FeaturedProducts.css';

export default function FeaturedProducts() {
  const { t, lang } = useLanguage();
  const featured = products.filter(p => p.isFeatured).slice(0, 8);

  return (
    <section className="featured-section">
      <div className="container">
        <div className="featured-header">
          <div className="section-header" style={{ textAlign: 'start', marginBottom: 0 }}>
            <span className="section-tag">⭐ {t('home.featuredTitle')}</span>
            <h2 className="section-title">{t('home.featuredTitle')}</h2>
            <p className="section-sub" style={{ marginInline: 0 }}>{t('home.featuredSub')}</p>
          </div>
          <Link
            to="/catalog"
            className="btn btn-outline"
            id="view-all-featured"
          >
            {t('home.viewAll')}
            {lang === 'ar' ? <FiArrowLeft aria-hidden /> : <FiArrowRight aria-hidden />}
          </Link>
        </div>

        <div className="grid-auto featured-grid">
          {featured.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: (i % 4) * 0.08, duration: 0.5 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
