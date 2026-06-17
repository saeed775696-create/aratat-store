import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiX, FiFilter } from 'react-icons/fi';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { useFilterStore } from '../../shared/store/stores.js';
import categoriesData from '../../data/categories.json.js';
import './FilterPanel.css';

export default function FilterPanel() {
  const { t, lang } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const {
    category, subcategory, sort, minPrice, maxPrice,
    setCategory, setSubcategory, setSort, setPriceRange, clearFilters
  } = useFilterStore();

  const [localMin, setLocalMin] = useState(minPrice);
  const [localMax, setLocalMax] = useState(maxPrice);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Sync with URL on mount
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setCategory(cat);
  }, [searchParams, setCategory]);

  const handlePriceApply = () => setPriceRange(localMin, localMax);

  const activeCategoryObj = categoriesData.find(c => c.slug === category);
  
  return (
    <>
      <button className="mobile-filter-toggle btn btn-outline" onClick={() => setIsMobileOpen(true)}>
        <FiFilter /> {t('catalog.filterBy')}
      </button>

      <aside className={`filter-panel ${isMobileOpen ? 'open' : ''}`}>
        <div className="filter-header">
          <h3>{t('catalog.filterBy')}</h3>
          <button className="close-filter" onClick={() => setIsMobileOpen(false)}><FiX /></button>
        </div>

        <div className="filter-content">
          {/* Categories */}
          <div className="filter-group">
            <h4 className="filter-title">{t('catalog.category')}</h4>
            <div className="filter-options">
              <label className="radio-label">
                <input
                  type="radio"
                  name="category"
                  checked={category === 'all'}
                  onChange={() => { setCategory('all'); setSearchParams({}); }}
                />
                <span>{t('catalog.allCategories')}</span>
              </label>
              {categoriesData.map(c => (
                <label key={c.id} className="radio-label">
                  <input
                    type="radio"
                    name="category"
                    checked={category === c.slug}
                    onChange={() => { setCategory(c.slug); setSearchParams({ category: c.slug }); }}
                  />
                  <span>{lang === 'ar' ? c.nameAr : c.nameEn}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Subcategories (if category selected) */}
          {activeCategoryObj && activeCategoryObj.subcategories.length > 0 && (
            <div className="filter-group">
              <h4 className="filter-title">{lang === 'ar' ? 'الفئة الفرعية' : 'Subcategory'}</h4>
              <div className="filter-options">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="subcategory"
                    checked={subcategory === 'all'}
                    onChange={() => setSubcategory('all')}
                  />
                  <span>{t('catalog.allCategories')}</span>
                </label>
                {activeCategoryObj.subcategories.map(sub => (
                  <label key={sub.id} className="radio-label">
                    <input
                      type="radio"
                      name="subcategory"
                      checked={subcategory === sub.id}
                      onChange={() => setSubcategory(sub.id)}
                    />
                    <span>{lang === 'ar' ? sub.nameAr : sub.nameEn}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Price Range */}
          <div className="filter-group">
            <h4 className="filter-title">{t('catalog.priceRange')}</h4>
            <div className="price-inputs">
              <input
                type="number"
                min="0"
                value={localMin}
                onChange={e => setLocalMin(Number(e.target.value))}
                className="field"
              />
              <span>-</span>
              <input
                type="number"
                min="0"
                value={localMax}
                onChange={e => setLocalMax(Number(e.target.value))}
                className="field"
              />
            </div>
            <button className="btn btn-sm btn-outline" style={{ marginTop: 'var(--space-3)', width: '100%' }} onClick={handlePriceApply}>
              {lang === 'ar' ? 'تطبيق السعر' : 'Apply Price'}
            </button>
          </div>

          <button className="btn btn-ghost" style={{ width: '100%', color: 'var(--text-sec)', border: '1px solid var(--border)' }} onClick={() => { clearFilters(); setSearchParams({}); setLocalMin(0); setLocalMax(50000); }}>
            {t('catalog.clearFilters')}
          </button>
        </div>
      </aside>
      
      {isMobileOpen && <div className="filter-overlay" onClick={() => setIsMobileOpen(false)} />  }
    </>
  );
}
