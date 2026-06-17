import SEOHead from '../../shared/components/SEOHead.jsx';
import HeroSlider from './HeroSlider.jsx';
import CategoryGrid from './CategoryGrid.jsx';
import FeaturedProducts from './FeaturedProducts.jsx';

export default function Home() {
  return (
    <main>
      <SEOHead />
      <HeroSlider />
      <CategoryGrid />
      <FeaturedProducts />
    </main>
  );
}
