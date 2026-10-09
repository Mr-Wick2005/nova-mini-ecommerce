import React, { useState, useMemo, useEffect } from 'react';
import { ArrowDown, Sparkles, Shield, Truck, RefreshCw } from 'lucide-react';
import productsData from '../data/products.json';
import { ProductGrid } from '../components/ProductGrid';
import { SearchBar } from '../components/SearchBar';
import { CategoryFilter } from '../components/CategoryFilter';
import { SortControl } from '../components/SortControl';
import { EmptyState } from '../components/EmptyState';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { ImageWithFallback } from '../components/ImageWithFallback';

export const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter & Sort State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  // Load products data
  const loadData = () => {
    try {
      setIsLoading(true);
      setError(null);
      // Synchronous local JSON read wrapped in state
      if (!Array.isArray(productsData) || productsData.length === 0) {
        throw new Error('No product data available');
      }
      setProducts(productsData);
      setIsLoading(false);
    } catch (err) {
      console.error('Error loading products:', err);
      setError('Unable to load product catalog. Please try reloading.');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Compute available categories and item counts
  const { categories, categoryCounts } = useMemo(() => {
    const counts = { All: products.length };
    const uniqueCats = new Set();

    products.forEach((p) => {
      if (p.category) {
        uniqueCats.add(p.category);
        counts[p.category] = (counts[p.category] || 0) + 1;
      }
    });

    return {
      categories: ['All', ...Array.from(uniqueCats)],
      categoryCounts: counts,
    };
  }, [products]);

  // Combined Search + Category + Sort filtering
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category Filter
    if (selectedCategory !== 'All') {
      result = result.filter(
        (p) => p.category && p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Search Query (matches name and description)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          (p.name && p.name.toLowerCase().includes(q)) ||
          (p.shortDescription && p.shortDescription.toLowerCase().includes(q)) ||
          (p.description && p.description.toLowerCase().includes(q)) ||
          (p.category && p.category.toLowerCase().includes(q))
      );
    }

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        // Prioritize featured flag, then rating
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return result;
  }, [products, selectedCategory, searchQuery, sortBy]);

  // Reset all filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSortBy('featured');
  };

  const isFilterActive = searchQuery.trim() !== '' || selectedCategory !== 'All' || sortBy !== 'featured';

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section" aria-label="Hero Introduction">
        <div className="container">
          <div className="hero-grid">
            <div>
              <div className="hero-tag">
                <Sparkles size={14} />
                <span>Spring / Summer 2026 Collection</span>
              </div>
              <h1 className="hero-headline">
                Curated Design &amp; <span className="highlight">Daily Essentials.</span>
              </h1>
              <p className="hero-description">
                Engineered for discerning modern lifestyles. Explore our refined selection of minimalist tech, precision accessories, and artisan home goods.
              </p>
              <div className="hero-cta-group">
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  onClick={scrollToCatalog}
                >
                  <span>Explore Catalog</span>
                  <ArrowDown size={18} />
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                  <Shield size={16} color="var(--accent-lime-text)" />
                  <span>2-Year Full Warranty</span>
                </div>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-collage-card">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80"
                  alt="NOVA Flagship Aura Studio Headphones"
                  className="hero-collage-img"
                  loading="eager"
                />
                <div className="hero-floating-badge">
                  <div className="badge-icon">
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <div className="badge-text-primary">NOVA Aura Studio</div>
                    <div className="badge-text-secondary">Signature Acoustic Design</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Strip */}
      <section style={{ borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)', background: 'var(--bg-surface)', padding: '24px 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Truck size={20} color="var(--text-secondary)" />
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>Free Express Shipping</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)' }}>On all orders above ₹2,000</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Shield size={20} color="var(--text-secondary)" />
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>Authentic &amp; Tested</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)' }}>100% verified materials</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <RefreshCw size={20} color="var(--text-secondary)" />
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>30-Day Effortless Returns</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)' }}>Hassle-free guarantee</div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog & Filter Section */}
      <section id="catalog" className="catalog-section" aria-label="Product Catalog">
        <div className="container">
          <div className="catalog-header">
            <div className="section-title-wrapper">
              <div>
                <h2 className="section-title">The Collection</h2>
                <p className="section-subtitle">
                  Browse our full range of curated products
                </p>
              </div>
            </div>

            {/* Controls Box */}
            <div className="controls-card">
              <div className="search-and-sort-row">
                <SearchBar
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  onClear={() => setSearchQuery('')}
                />
                <SortControl
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                />
              </div>

              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                categoryCounts={categoryCounts}
              />
            </div>

            {/* Results counter and clear filter option */}
            <div className="results-status-bar">
              <div>
                Showing <strong>{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'product' : 'products'}
                {selectedCategory !== 'All' && <span> in <strong>{selectedCategory}</strong></span>}
                {searchQuery.trim() && <span> matching "<strong>{searchQuery}</strong>"</span>}
              </div>

              {isFilterActive && (
                <button
                  type="button"
                  className="clear-filters-link"
                  onClick={handleClearFilters}
                >
                  Reset All Filters
                </button>
              )}
            </div>
          </div>

          {/* Body content based on state */}
          {isLoading ? (
            <LoadingState count={8} />
          ) : error ? (
            <ErrorState message={error} onRetry={loadData} />
          ) : filteredProducts.length === 0 ? (
            <EmptyState
              type="search"
              onAction={handleClearFilters}
              actionText="Reset Filters"
            />
          ) : (
            <ProductGrid products={filteredProducts} />
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
