import React from 'react';

export const CategoryFilter = ({
  categories = [],
  selectedCategory = 'All',
  onSelectCategory,
  categoryCounts = {},
}) => {
  return (
    <nav className="category-filter-row" aria-label="Filter products by category">
      {categories.map((category) => {
        const isActive = selectedCategory === category;
        const count = categoryCounts[category] || 0;

        return (
          <button
            key={category}
            type="button"
            className={`category-pill ${isActive ? 'active' : ''}`}
            onClick={() => onSelectCategory(category)}
            aria-pressed={isActive}
            aria-label={`Category ${category} (${count} products)`}
          >
            <span>{category}</span>
            <span className="category-count">({count})</span>
          </button>
        );
      })}
    </nav>
  );
};

export default CategoryFilter;
