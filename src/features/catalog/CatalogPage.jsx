import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { FiSliders } from 'react-icons/fi';
import SEOHead from '../../shared/components/SEOHead.jsx';
import FilterPanel from './FilterPanel.jsx';
import ProductCard from './ProductCard.jsx';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { useFilterStore } from '../../shared/store/stores.js';
import productsData from '../../data/products.js';
import './CatalogPage.css';

export default function CatalogPage() {
  const { t, lang } = useLanguage();
  const { category, subcategory, sort, minPrice, maxPrice, searchQuery, setSort } = useFilterStore();

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = productsData;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.nameAr.toLowerCase().includes(q) || 
        p.nameEn.toLowerCase().includes(q) ||
        p.tags.some(tag => tag.includes(q))
      );
    }

    if (category !== 'all') {
      result = result.filter(p => p.categoryId === category);
    }

    if (subcategory !== 'all') {
      result = result.filter(p => p.subcategoryId === subcategory);
    }

    result = result.filter(p => p.price >= minPrice && p.price <= maxPrice);

    switch (sort) {
      case 'priceLow':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'priceHigh':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
      default:
        // Mock newest sort by ID descending
        result.sort((a, b) => b.id - a.id);
        break;
    }

    return result;
  }, [category, subcategory, sort, minPrice, maxPrice, searchQuery]);

  return (
    <main className="catalog-page page-wrapper">
      <SEOHead titleAr="المتجر — عرطات للتسويق" titleEn="Store — Aratat" />
      
      <div className="container">
        <div className="catalog-header">
          <div>
            <h1 className="catalog-title">{t('catalog.title')}</h1>
            <p className="catalog-count">{t('catalog.showing')} {filteredProducts.length} {t('catalog.products')}</p>
          </div>

          <div className="catalog-sort">
            <FiSliders className="sort-icon" />
            <select className="field" value={sort} onChange={e => setSort(e.target.value)}>
              <option value="newest">{t('catalog.newest')}</option>
              <option value="priceLow">{t('catalog.priceLow')}</option>
              <option value="priceHigh">{t('catalog.priceHigh')}</option>
            </select>
          </div>
        </div>

        <div className="catalog-layout">
          <aside className="catalog-sidebar">
            <FilterPanel />
          </aside>

          <div className="catalog-main">
            {filteredProducts.length === 0 ? (
              <div className="catalog-empty">
                <div className="empty-icon">🔍</div>
                <h3>{t('catalog.noResults')}</h3>
                <p>{t('catalog.noResultsSub')}</p>
              </div>
            ) : (
              <div className="grid-auto catalog-grid">
                {filteredProducts.map(product => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
