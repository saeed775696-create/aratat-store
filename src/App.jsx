import { Routes, Route } from 'react-router-dom';
import Header from './shared/components/Header.jsx';
import Footer from './shared/components/Footer.jsx';
import FloatingWhatsApp from './shared/components/FloatingWhatsApp.jsx';

import Home from './features/home/Home.jsx';
import CatalogPage from './features/catalog/CatalogPage.jsx';
import ProductDetail from './features/catalog/ProductDetail.jsx';
import ContactPage from './features/contact/ContactPage.jsx';
import CartPage from './features/cart/CartPage.jsx';
import OrdersPage from './features/orders/OrdersPage.jsx';

export default function App() {
  return (
    <>
      <Header />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders" element={<OrdersPage />} />
      </Routes>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
