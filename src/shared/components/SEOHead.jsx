import { useEffect } from 'react';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { STORE_CONFIG } from '../../config.js';

export default function SEOHead({ titleAr, titleEn, descAr, descEn, image }) {
  const { lang } = useLanguage();

  useEffect(() => {
    const title = (lang === 'ar' ? titleAr : titleEn) || (lang === 'ar' ? STORE_CONFIG.seo.defaultTitleAr : STORE_CONFIG.seo.defaultTitleEn);
    const desc  = (lang === 'ar' ? descAr  : descEn)  || (lang === 'ar' ? STORE_CONFIG.seo.descriptionAr  : STORE_CONFIG.seo.descriptionEn);
    const img   = image || STORE_CONFIG.seo.ogImage;

    document.title = title;

    const setMeta = (name, content, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, name); document.head.appendChild(el); }
      el.content = content;
    };

    setMeta('description', desc);
    setMeta('og:title',       title, true);
    setMeta('og:description', desc,  true);
    setMeta('og:image',       img,   true);
    setMeta('og:type',        'website', true);
    setMeta('og:locale',      lang === 'ar' ? 'ar_YE' : 'en_US', true);
    setMeta('twitter:card',        'summary_large_image');
    setMeta('twitter:title',       title);
    setMeta('twitter:description', desc);
  }, [lang, titleAr, titleEn, descAr, descEn, image]);

  return null;
}
