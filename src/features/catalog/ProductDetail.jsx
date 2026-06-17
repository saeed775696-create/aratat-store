import { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiShare2, FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import SEOHead from '../../shared/components/SEOHead.jsx';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { useCartStore } from '../../shared/store/stores.js';
import { STORE_CONFIG, buildWhatsAppMessage, WHATSAPP_URL } from '../../config.js';
import productsData from '../../data/products.js';
import categoriesData from '../../data/categories.json.js';
import ProductCard from './ProductCard.jsx';
import './ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const addItem = useCartStore(s => s.addItem);
  
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [toastVisible, setToastVisible] = useState(false);

  const product = useMemo(() => productsData.find(p => p.id === Number(id)), [id]);
  const category = useMemo(() => categoriesData.find(c => c.slug === product?.categoryId), [product]);
  
  const related = useMemo(() => {
    if (!product) return [];
    return productsData
      .filter(p => p.categoryId === product.categoryId && p.id !== product.id)
      .slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <main className="page-wrapper container" style={{ padding: 'var(--space-20) 0', textAlign: 'center' }}>
        <h2>{t('common.notFound')}</h2>
        <button className="btn btn-primary" onClick={() => navigate('/catalog')} style={{ marginTop: 'var(--space-6)' }}>
          {t('common.goHome')}
        </button>
      </main>
    );
  }

  const name = lang === 'ar' ? product.nameAr : product.nameEn;
  const desc = lang === 'ar' ? product.descAr : product.descEn;
  const catName = lang === 'ar' ? category?.nameAr : category?.nameEn;
  
  const handleAddToCart = () => {
    addItem(product, qty);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: name,
        text: desc,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const waMessage = buildWhatsAppMessage(product, lang);
  const waUrl = WHATSAPP_URL(STORE_CONFIG.whatsapp.primary, waMessage);

  return (
    <main className="product-detail-page page-wrapper">
      <SEOHead 
        titleAr={`${product.nameAr} — عرطات للتسويق`}
        titleEn={`${product.nameEn} — Aratat`}
        descAr={product.descAr}
        descEn={product.descEn}
        image={product.images[0]}
      />
      
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">{t('nav.home')}</Link>
          <span className="bc-sep">{lang === 'ar' ? <FiChevronLeft /> : <FiChevronRight />}</span>
          <Link to={`/catalog?category=${product.categoryId}`}>{catName}</Link>
          <span className="bc-sep">{lang === 'ar' ? <FiChevronLeft /> : <FiChevronRight />}</span>
          <span className="bc-current">{name}</span>
        </nav>

        <div className="product-detail-grid">
          {/* Gallery */}
          <div className="product-gallery">
            <div className="gallery-main">
              <img src={product.images[activeImg]} alt={name} className="gallery-main-img" />
              {product.originalPrice && (
                <div className="gallery-badge badge-sale">
                  -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </div>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="gallery-thumbs">
                {product.images.map((img, i) => (
                  <button 
                    key={i} 
                    className={`thumb-btn ${i === activeImg ? 'active' : ''}`}
                    onClick={() => setActiveImg(i)}
                  >
                    <img src={img} alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="product-info">
            <h1 className="product-title">{name}</h1>
            
            <div className="product-meta">
              <div className="meta-item">
                <span className="meta-label">{t('product.productId')}:</span>
                <span className="meta-val">#{product.id}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">{t('product.category')}:</span>
                <span className="meta-val">{catName}</span>
              </div>
            </div>

            <div className="price-wrap" style={{ margin: 'var(--space-6) 0' }}>
              <span className="price-current" style={{ fontSize: 'var(--font-size-3xl)' }}>
                {product.price.toLocaleString()}
              </span>
              <span className="price-currency">{t('common.yer')}</span>
              {product.originalPrice && (
                <span className="price-original" style={{ fontSize: 'var(--font-size-lg)' }}>
                  {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <div className={`product-stock ${product.inStock ? 'in' : 'out'} detail-stock`}>
              <span className="stock-dot" />
              <span>{product.inStock ? t('product.inStock') : t('product.outOfStock')}</span>
            </div>

            <p className="product-desc">{desc}</p>

            <div className="product-actions-box">
              <div className="qty-selector">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} disabled={!product.inStock}>-</button>
                <input type="number" value={qty} readOnly />
                <button onClick={() => setQty(q => q + 1)} disabled={!product.inStock}>+</button>
              </div>

              <div className="action-buttons">
                <button 
                  className="btn btn-primary action-btn add-cart-btn" 
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <FiShoppingCart /> {t('product.addToCart')}
                </button>
                <a 
                  href={waUrl} 
                  target="_blank" rel="noreferrer"
                  className="btn btn-whatsapp action-btn wa-order-btn"
                >
                  <FaWhatsapp /> {t('product.orderWhatsapp')}
                </a>
              </div>
            </div>

            <button className="btn btn-ghost share-btn" onClick={handleShare}>
              <FiShare2 /> {t('product.shareProduct')}
            </button>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="related-section">
            <h3 className="section-title">{t('product.relatedTitle')}</h3>
            <div className="grid-4">
              {related.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      {toastVisible && (
        <div className="toast">
          ✓ {t('product.addedToCart')}
        </div>
      )}
    </main>
  );
}
