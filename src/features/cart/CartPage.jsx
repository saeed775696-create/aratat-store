import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiTrash2, FiMinus, FiPlus, FiArrowRight, FiArrowLeft, FiShoppingCart } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import SEOHead from '../../shared/components/SEOHead.jsx';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { useCartStore, useOrdersStore } from '../../shared/store/stores.js';
import { STORE_CONFIG, WHATSAPP_URL } from '../../config.js';
import './CartPage.css';

export default function CartPage() {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();
  const addOrder = useOrdersStore(s => s.addOrder);

  const [formData, setFormData] = useState({ name: '', phone: '', address: '', notes: '' });

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = (e) => {
    e.preventDefault();
    if (items.length === 0) return;

    // Create Order Record
    const orderId = `ORD-${Date.now().toString().slice(-6)}`;
    const newOrder = {
      id: orderId,
      date: new Date().toISOString(),
      items: [...items],
      total: totalPrice,
      customer: formData,
      status: 'pending' // pending whatsapp send
    };

    addOrder(newOrder);

    // Build WhatsApp Message
    const isAr = lang === 'ar';
    let msg = isAr ? `*طلب جديد #${orderId}*\n\n` : `*New Order #${orderId}*\n\n`;
    
    msg += isAr ? `*العميل:* ${formData.name}\n` : `*Customer:* ${formData.name}\n`;
    msg += isAr ? `*رقم الهاتف:* ${formData.phone}\n` : `*Phone:* ${formData.phone}\n`;
    msg += isAr ? `*العنوان:* ${formData.address}\n\n` : `*Address:* ${formData.address}\n\n`;
    
    msg += isAr ? `*المنتجات:*\n` : `*Products:*\n`;
    items.forEach((item, index) => {
      const name = isAr ? item.nameAr : item.nameEn;
      msg += `${index + 1}. ${name} - ${item.quantity}x (${item.price.toLocaleString()})\n`;
    });

    msg += `\n*الإجمالي:* ${totalPrice.toLocaleString()} ${t('common.yer')}`;
    
    if (formData.notes) {
      msg += isAr ? `\n\n*ملاحظات:* ${formData.notes}` : `\n\n*Notes:* ${formData.notes}`;
    }

    const waUrl = WHATSAPP_URL(STORE_CONFIG.whatsapp.primary, msg);
    
    clearCart();
    navigate('/orders');
    window.open(waUrl, '_blank');
  };

  if (items.length === 0) {
    return (
      <main className="page-wrapper container empty-cart-page">
        <SEOHead titleAr="عربة التسوق — عرطات" titleEn="Shopping Cart — Aratat" />
        <div className="empty-cart-content">
          <div className="empty-icon"><FiShoppingCart /></div>
          <h1>{t('nav.cart')}</h1>
          <p>{lang === 'ar' ? 'عربة التسوق فارغة حالياً' : 'Your cart is currently empty'}</p>
          <Link to="/catalog" className="btn btn-primary">
            {t('home.shopNow')}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page-wrapper container cart-page">
      <SEOHead titleAr="عربة التسوق — عرطات" titleEn="Shopping Cart — Aratat" />
      
      <h1 className="cart-title">{t('nav.cart')} ({totalItems})</h1>

      <div className="cart-layout">
        {/* Cart Items */}
        <div className="cart-items-section">
          <div className="cart-list">
            {items.map(item => {
              const name = lang === 'ar' ? item.nameAr : item.nameEn;
              return (
                <div key={item.id} className="cart-item">
                  <img src={item.images[0]} alt={name} className="cart-item-img" />
                  <div className="cart-item-info">
                    <Link to={`/product/${item.id}`} className="cart-item-name">{name}</Link>
                    <div className="cart-item-price">{item.price.toLocaleString()} {t('common.yer')}</div>
                  </div>
                  
                  <div className="cart-item-actions">
                    <div className="qty-selector">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}><FiMinus /></button>
                      <input type="number" value={item.quantity} readOnly />
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}><FiPlus /></button>
                    </div>
                    <button className="btn-icon remove-btn" onClick={() => removeItem(item.id)} aria-label="Remove">
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <button className="btn btn-ghost clear-cart-btn" onClick={clearCart}>
            <FiTrash2 /> {lang === 'ar' ? 'تفريغ السلة' : 'Clear Cart'}
          </button>
        </div>

        {/* Checkout Form */}
        <aside className="checkout-sidebar">
          <div className="checkout-summary">
            <h3>{lang === 'ar' ? 'ملخص الطلب' : 'Order Summary'}</h3>
            <div className="summary-row">
              <span>{lang === 'ar' ? 'عدد المنتجات' : 'Total Items'}</span>
              <span>{totalItems}</span>
            </div>
            <div className="summary-row total-row">
              <span>{lang === 'ar' ? 'الإجمالي' : 'Total Price'}</span>
              <span>{totalPrice.toLocaleString()} {t('common.yer')}</span>
            </div>
          </div>

          <form className="checkout-form" onSubmit={handleCheckout}>
            <h3>{lang === 'ar' ? 'بيانات التوصيل' : 'Delivery Details'}</h3>
            
            <div className="form-group">
              <label>{lang === 'ar' ? 'الاسم' : 'Name'} *</label>
              <input type="text" className="field" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
            
            <div className="form-group">
              <label>{lang === 'ar' ? 'رقم الهاتف (واتساب)' : 'Phone (WhatsApp)'} *</label>
              <input type="tel" className="field" required dir="ltr" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
            </div>
            
            <div className="form-group">
              <label>{lang === 'ar' ? 'العنوان بالتفصيل' : 'Full Address'} *</label>
              <textarea className="field" rows="2" required value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})}></textarea>
            </div>
            
            <div className="form-group">
              <label>{lang === 'ar' ? 'ملاحظات (اختياري)' : 'Notes (Optional)'}</label>
              <textarea className="field" rows="2" value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})}></textarea>
            </div>

            <button type="submit" className="btn btn-whatsapp checkout-btn">
              <FaWhatsapp /> 
              {lang === 'ar' ? 'إرسال الطلب عبر واتساب' : 'Send Order via WhatsApp'}
            </button>
            <p className="checkout-hint">
              {lang === 'ar' 
                ? 'سيتم تحويلك إلى واتساب لتأكيد الطلب مع خدمة العملاء.'
                : 'You will be redirected to WhatsApp to confirm your order with customer service.'}
            </p>
          </form>
        </aside>
      </div>
    </main>
  );
}
