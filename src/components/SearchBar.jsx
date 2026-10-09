import React from 'react';
import { Search, X } from 'lucide-react';

export const SearchBar = ({ searchQuery, onSearchChange, onClear }) => {
  return (
    <div className="search-box-wrapper">
      <Search className="search-icon-left" size={17} aria-hidden="true" />
      <input
        type="text"
        id="catalog-search"
        className="search-input"
        placeholder="Search products by title, description..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        aria-label="Search products"
      />
      {searchQuery && (
        <button
          type="button"
          onClick={onClear}
          className="search-clear-btn"
          aria-label="Clear search query"
          title="Clear search"
        >
          <X size={15} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
