// ─── ARATAT STORE — Central Configuration ─────────────────────────────────
// Single source of truth for all external links and store metadata

export const STORE_CONFIG = {
  nameAr: 'عرطات للتسويق',
  nameEn: 'Aratat Marketing',
  taglineAr: 'وفرة · جودة · سرعة',
  taglineEn: 'Abundance · Quality · Speed',

  whatsapp: {
    primary:   '967775234881',
    secondary: '967735464235',
    tertiary:  '967993030733',
    displayPrimary:   '775 234 881',
    displaySecondary: '735 464 235',
    displayTertiary:  '993 030 733',
  },

  social: {
    instagram: 'https://www.instagram.com/aratat200200',
    facebook:  'https://www.facebook.com/aratat200200',
    handle:    'aratat200200',
  },

  seo: {
    defaultTitleAr: 'عرطات للتسويق — أدوات المطبخ، هدايا، ومستلزمات المنزل',
    defaultTitleEn: 'Aratat Marketing — Kitchen Tools, Gifts & Home Essentials',
    descriptionAr:  'متجر عرطات للتسويق: أدوات مطبخ، توزيعات حفلات، هدايا، ومستلزمات المنزل. اطلب الآن عبر واتساب أو احجز طلبك أونلاين.',
    descriptionEn:  'Aratat Marketing: Kitchen tools, party favors, gifts & home essentials. Order via WhatsApp or place your order online.',
    ogImage: '/images/brand/og-image.jpg',
  },
};

// ─── WhatsApp message builder ──────────────────────────────────────────────
export const buildWhatsAppMessage = (product, lang = 'ar') => {
  if (lang === 'ar') {
    return `مرحباً، أريد طلب:\n🛒 المنتج: ${product.nameAr}\n💰 السعر: ${product.price} ريال\n🔗 رقم المنتج: #${product.id}`;
  }
  return `Hello, I'd like to order:\n🛒 Product: ${product.nameEn}\n💰 Price: ${product.price} YER\n🔗 Product #: #${product.id}`;
};

// ─── WhatsApp order summary builder ───────────────────────────────────────
export const buildOrderMessage = (order, lang = 'ar') => {
  const itemsList = order.items
    .map((item, i) => `${i + 1}. ${lang === 'ar' ? item.nameAr : item.nameEn} × ${item.quantity} = ${item.price * item.quantity} ريال`)
    .join('\n');

  if (lang === 'ar') {
    return `📦 *طلب جديد من متجر عرطات*\n━━━━━━━━━━━━━━━\n👤 الاسم: ${order.customerName}\n📱 الهاتف: ${order.phone}\n📍 العنوان: ${order.address}\n💳 الدفع: ${order.paymentMethod === 'cod' ? 'الدفع عند الاستلام' : 'تحويل بنكي'}\n━━━━━━━━━━━━━━━\n🛒 *المنتجات:*\n${itemsList}\n━━━━━━━━━━━━━━━\n💰 *الإجمالي: ${order.total} ريال*\n🔖 رقم الطلب: #${order.orderId}`;
  }
  return `📦 *New Order from Aratat Store*\n━━━━━━━━━━━━━━━\n👤 Name: ${order.customerName}\n📱 Phone: ${order.phone}\n📍 Address: ${order.address}\n💳 Payment: ${order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Bank Transfer'}\n━━━━━━━━━━━━━━━\n🛒 *Products:*\n${itemsList}\n━━━━━━━━━━━━━━━\n💰 *Total: ${order.total} YER*\n🔖 Order #: #${order.orderId}`;
};

export const WHATSAPP_URL = (number, message) =>
  `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
