# NOVA — Mini E-Commerce Storefront

A modern, editorial-style e-commerce storefront built with **React**, **Vite**, **React Router**, and **Context API**. Designed with a warm minimalist aesthetic, restrained lime accents, and a focus on UX details, responsiveness, and state resilience.

---

## 🌟 Overview & Design Philosophy

**NOVA** is a submission-ready Take-Home Assessment application crafted to showcase portfolio-quality frontend engineering. It features:

- **Warm Editorial Aesthetic**: Subtle warm off-white background (`#fcfbf9`), near-black typography (`#121316`), delicate borders (`#ece9e2`), and restrained lime-green accents (`#cbf228`).
- **Typography & Proportions**: Powered by Google Fonts (*Plus Jakarta Sans* and *Outfit*) with generous whitespace, subtle elevations, and clean micro-interactions.
- **Resilient State Architecture**: React Context API managing cart items and user feedback toasts, backed by `localStorage` persistence with safe error-handling for corrupt or malformed payloads.
- **Zero External API Dependencies**: Reads directly from a curated local dataset (`src/data/products.json`) with INR (`₹`) pricing formatted using `Intl.NumberFormat`.

---

## ✨ Features

### 1. Home & Catalog
- **Editorial Hero Section**: Bold headline with decorative highlights, Spring/Summer collection tag, signature product showcase, and a direct shopping CTA.
- **Value Proposition Bar**: Highlighting Free Shipping over ₹2,000, 2-Year Warranty, and 30-day returns.
- **Combined Search & Filtering**:
  - **Live Text Search**: Searches product titles, descriptions, and categories simultaneously.
  - **Category Filter Pills**: Interactive filters (*All*, *Electronics*, *Accessories*, *Home*, *Lifestyle*) with dynamic product count badges.
  - **Multi-criteria Sorting**: Sort by *Featured*, *Price: Low to High*, *Price: High to Low*, and *Highest Rated*.
  - **Active Filter State**: Live product counter and instant "Reset All Filters" button.
- **Product Cards**: High-resolution imagery with fallback handling, category tags, star ratings with review counts, formatted INR prices, and instant Add-to-Cart with dynamic in-cart counters.
- **State Handlers**: Skeleton loading placeholders, error retry states, and empty search result illustrations.

### 2. Product Detail Page (`/products/:id`)
- **Breadcrumb Navigation**: Seamless trail (`Home / Category / Product Name`).
- **Product Gallery**: High-resolution showcase with graceful fallback if the image fails.
- **Live Stock Status**: Distinct badges for *In Stock*, *Low Stock (<= 5 remaining)*, and *Sold Out*.
- **Specifications Checklist**: Curated feature bullets and material specifications.
- **Bounded Quantity Selector**: Respects available stock limits and items already in the user's cart.
- **Instant Add-to-Cart Feedback**: Toast notifications and button state transitions.
- **404 Handling**: Dedicated not-found view for invalid or non-existent product IDs.

### 3. Shopping Cart (`/cart`)
- **Context State Management**: Custom `useCart` hook driving cart actions across routes.
- **Line Items**: Image thumbnails, product metadata, unit price, bounded quantity adjustment buttons (+/-), and line subtotal.
- **Stock Upper & Lower Bounds**: Prevents decrements below 1 (requires explicit delete) and increments above stock limits.
- **Auto-Merging**: Adding the same product multiple times merges into a single line item.
- **Free Shipping Progress Tracker**: Visual progress meter calculating remaining spend needed to unlock free shipping (threshold: ₹2,000).
- **Derived Totals**: Subtotal, shipping fee, and GST calculations derived dynamically from current cart state.
- **LocalStorage Persistence**: Automatically saves and restores cart items with corrupt JSON handling.
- **Clear Cart**: Safe clear with user confirmation prompt.
- **Demo Checkout Flow**: Modal simulating checkout with order summary and generated demo confirmation receipt (`NOVA-DEMO-XXXXXX`).

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Framework & Build** | React 19 + Vite |
| **Routing** | React Router DOM v7 |
| **Styling** | Vanilla CSS with Design Tokens & CSS Variables |
| **Icons** | Lucide React |
| **State Management** | React Hooks (`useState`, `useMemo`, `useCallback`, `useEffect`) & Context API |
| **Storage** | Browser `localStorage` with safe wrapper utilities |
| **Data Format** | Local JSON (`src/data/products.json`) |
| **Currency** | `Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' })` |

---

## 📁 Project Structure

```
mini/
├── public/
├── src/
│   ├── components/
│   │   ├── CartItem.jsx            # Cart item row with quantity & remove controls
│   │   ├── CategoryFilter.jsx      # Filter pills with counts
│   │   ├── DemoCheckoutModal.jsx   # Simulated checkout modal & order receipt
│   │   ├── EmptyState.jsx          # Illustrated empty states (cart & search)
│   │   ├── ErrorState.jsx          # Error feedback with retry action
│   │   ├── Footer.jsx              # Brand footer & newsletter mockup
│   │   ├── ImageWithFallback.jsx   # Image component with graceful error fallback
│   │   ├── LoadingState.jsx        # Skeleton loaders for grid & detail
│   │   ├── Navbar.jsx              # Sticky header with live cart badge
│   │   ├── ProductCard.jsx         # Product card with dynamic cart actions
│   │   ├── ProductGrid.jsx         # Responsive grid container
│   │   ├── QuantitySelector.jsx    # Accessible + / - counter control
│   │   ├── ScrollToTop.jsx         # Route scroll restoration helper
│   │   ├── SearchBar.jsx           # Live search input with clear button
│   │   ├── SortControl.jsx         # Sort dropdown options
│   │   └── Toast.jsx               # Floating toast notifications
│   ├── context/
│   │   └── CartContext.jsx         # Cart state, derived totals, toast system
│   ├── data/
│   │   └── products.json           # 16 curated products across 4 categories
│   ├── hooks/
│   │   └── useCart.js              # Custom hook for consuming CartContext
│   ├── pages/
│   │   ├── Cart.jsx                # Full shopping cart page
│   │   ├── Home.jsx                # Hero + catalog with search, filter, sort
│   │   ├── NotFound.jsx            # 404 error page
│   │   └── ProductDetails.jsx      # Product detail view with gallery & specs
│   ├── utils/
│   │   ├── currency.js             # INR currency formatting helper
│   │   └── storage.js              # Safe localStorage wrapper with try/catch
│   ├── App.jsx                     # Root application with router & providers
│   ├── index.css                   # Complete design system & responsive styling
│   └── main.jsx                    # Entry point
├── index.html                      # HTML template with Google Fonts & SEO tags
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher (or pnpm / yarn)

### Installation

1. Clone or open the project directory:
   ```bash
   cd mini
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development Server

Start the local Vite development server:
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### Production Build

Create an optimized production bundle:
```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview
```

---

## 🗄️ Data & Persistence

### 1. Product Data (`src/data/products.json`)
Contains 16 curated items across `Electronics`, `Accessories`, `Home`, and `Lifestyle`.
Every product entry adheres to this schema:
```json
{
  "id": "nova-101",
  "name": "Aura Studio Hi-Fi Wireless Headphones",
  "category": "Electronics",
  "price": 14999,
  "rating": 4.9,
  "reviewCount": 184,
  "imageUrl": "https://images.unsplash.com/...",
  "shortDescription": "Precision-tuned acoustic architecture...",
  "description": "Engineered for pure sonic immersion...",
  "stock": 14,
  "features": ["Custom 45mm drivers", "Hybrid ANC", "40h battery"],
  "badge": "Best Seller",
  "featured": true
}
```

### 2. LocalStorage Persistence (`src/utils/storage.js`)
- The cart items are synchronized to `localStorage` under the key `nova_cart_items_v1`.
- Any malformed or corrupted JSON stored in `localStorage` is caught gracefully with a fallback to `[]`, preventing application crashes.

---

## 🗺️ Application Routes

| Route | View | Description |
| :--- | :--- | :--- |
| `/` | `Home.jsx` | Landing hero, trust badges, search, category filter, sorting, product catalog |
| `/products/:id` | `ProductDetails.jsx` | Product gallery, specifications, stock indicator, quantity picker, add-to-cart |
| `/cart` | `Cart.jsx` | Item list, line subtotals, quantity adjustments, shipping meter, demo checkout |
| `*` | `NotFound.jsx` | 404 Not Found fallback with navigation CTA |

---

## ⚠️ Scope & Known Limitations

- **Demo Checkout**: Payment gateways (e.g., Stripe/Razorpay) and live order dispatch are intentionally out of scope. The checkout modal simulates order placement and displays a demo receipt.
- **No Backend**: All product data is bundled statically in `src/data/products.json`.
- **Authentication**: User accounts, login, and order history databases are not implemented.

---

## 📤 Publishing to GitHub

To push this project to your GitHub account:

1. Initialize git (if not already initialized):
   ```bash
   git init
   ```

2. Stage all files:
   ```bash
   git add .
   ```

3. Commit your changes:
   ```bash
   git commit -m "feat: complete NOVA mini e-commerce assessment"
   ```

4. Link to your GitHub repository and push:
   ```bash
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git branch -M main
   git push -u origin main
   ```
