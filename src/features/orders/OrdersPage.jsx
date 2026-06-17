import { Link } from 'react-router-dom';
import { FiPackage, FiClock } from 'react-icons/fi';
import SEOHead from '../../shared/components/SEOHead.jsx';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { useOrdersStore } from '../../shared/store/stores.js';
import './OrdersPage.css';

export default function OrdersPage() {
  const { t, lang } = useLanguage();
  const orders = useOrdersStore(s => s.orders);

  if (orders.length === 0) {
    return (
      <main className="page-wrapper container empty-orders-page">
        <SEOHead titleAr="طلباتي — عرطات" titleEn="My Orders — Aratat" />
        <div className="empty-orders-content">
          <div className="empty-icon"><FiPackage /></div>
          <h1>{t('nav.orders')}</h1>
          <p>{lang === 'ar' ? 'لا توجد طلبات سابقة' : 'No previous orders found'}</p>
          <Link to="/catalog" className="btn btn-primary">
            {t('home.shopNow')}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page-wrapper container orders-page">
      <SEOHead titleAr="طلباتي — عرطات" titleEn="My Orders — Aratat" />
      
      <div className="orders-header">
        <h1 className="orders-title">{t('nav.orders')}</h1>
        <p className="orders-sub">
          {lang === 'ar' 
            ? 'سجل الطلبات التي قمت بإرسالها عبر المتجر' 
            : 'History of orders you have submitted through the store'}
        </p>
      </div>

      <div className="orders-list">
        {orders.map(order => (
          <div key={order.id} className="order-card">
            <div className="order-card-header">
              <div className="order-id-wrap">
                <span className="order-id">{order.id}</span>
                <span className="order-date">
                  <FiClock /> {new Date(order.date).toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
              </div>
              <div className="order-status pending">
                {lang === 'ar' ? 'تم الإرسال (قيد المراجعة)' : 'Sent (Pending Review)'}
              </div>
            </div>

            <div className="order-card-body">
              <div className="order-customer">
                <strong>{lang === 'ar' ? 'الاستلام:' : 'Delivery:'}</strong> {order.customer.name} — {order.customer.phone}
                <p className="order-address">{order.customer.address}</p>
              </div>

              <div className="order-items-list">
                {order.items.map((item, idx) => (
                  <div key={idx} className="order-item-row">
                    <span className="oi-name">{lang === 'ar' ? item.nameAr : item.nameEn}</span>
                    <span className="oi-qty">x{item.quantity}</span>
                    <span className="oi-price">{(item.price * item.quantity).toLocaleString()} {t('common.yer')}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="order-card-footer">
              <span className="order-total-label">{lang === 'ar' ? 'إجمالي الطلب:' : 'Order Total:'}</span>
              <span className="order-total-val">{order.total.toLocaleString()} {t('common.yer')}</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
