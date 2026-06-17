import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiEye } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { useCartStore } from '../../shared/store/stores.js';
import { STORE_CONFIG, buildWhatsAppMessage, WHATSAPP_URL } from '../../config.js';
import LazyImage from '../../shared/components/LazyImage.jsx';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { t, lang } = useLanguage();
  const addItem = useCartStore(s => s.addItem);
  const [toastVisible, setToastVisible] = useState(false);

  const name = lang === 'ar' ? product.nameAr : product.nameEn;
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    addItem(product, 1);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2000);
  };

  const waMessage = buildWhatsAppMessage(product, lang);
  const waUrl = WHATSAPP_URL(STORE_CONFIG.whatsapp.primary, waMessage);

  return (
    <motion.article
      className="product-card"
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <Link to={`/product/${product.id}`} className="product-card-link" aria-label={name}>
        {/* Image Container */}
        <div className="product-card-img">
          <LazyImage
            src={product.images?.[0]}
            alt={name}
            aspectRatio="4/3"
            fallback={`https://placehold.co/400x300/f0f4f8/9aa3af?text=${encodeURIComponent(name)}`}
          />

          {/* Badges */}
          <div className="product-badges">
            {product.isNew && (
              <span className="badge badge-new">
                {lang === 'ar' ? 'جديد' : 'New'}
              </span>
            )}
            {discount >= 10 && (
              <span className="badge badge-sale">
                -{discount}%
              </span>
            )}
            {product.badge && (
              <span className="badge badge-orange">
                {lang === 'ar' ? product.badge.textAr : product.badge.textEn}
              </span>
            )}
          </div>

          {/* Quick actions overlay */}
          <div className="product-card-overlay">
            <span className="overlay-view">
              <FiEye />
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="product-card-body">
          <p className="product-card-name">{name}</p>

          <div className="price-wrap" style={{ marginBottom: 'var(--space-3)' }}>
            <span className="price-current">{product.price.toLocaleString()}</span>
            <span className="price-currency">{t('common.yer')}</span>
            {product.originalPrice && (
              <span className="price-original">{product.originalPrice.toLocaleString()}</span>
            )}
          </div>

          {/* Stock */}
          <div className="product-stock" aria-live="polite">
            <span className={`stock-dot ${product.inStock ? 'in' : 'out'}`} />
            <span>{product.inStock ? t('product.inStock') : t('product.outOfStock')}</span>
          </div>
        </div>
      </Link>

      {/* Actions */}
      <div className="product-card-actions">
        <button
          className="btn btn-sm btn-primary"
          onClick={handleAddToCart}
          disabled={!product.inStock}
          aria-label={`${t('product.addToCart')} — ${name}`}
          id={`add-cart-${product.id}`}
        >
          <FiShoppingCart aria-hidden />
          {t('product.addToCart')}
        </button>

        <a
          href={waUrl}
          target="_blank"
          rel="noreferrer"
          className="btn btn-sm btn-whatsapp"
          aria-label={`${t('product.orderWhatsapp')} — ${name}`}
          id={`wa-order-${product.id}`}
        >
          <FaWhatsapp aria-hidden />
        </a>
      </div>

      {/* Toast */}
      {toastVisible && (
        <div className="product-toast" role="status" aria-live="polite">
          ✓ {t('product.addedToCart')}
        </div>
      )}
    </motion.article>
  );
}
