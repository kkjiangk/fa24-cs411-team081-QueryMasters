// src/SearchProducts.js
import './SearchProducts.css';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function SearchProducts({ UserId }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    priceRange: '',
    brand: '',
    productType: '',
    rating: '',
  });
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   // Save UserId to localStorage if provided
  //   if (UserId) {
  //     localStorage.setItem('UserId', UserId);
  //   }
  // }, [UserId]);

  // Handle search input change
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSearch = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Build the query parameters
    const params = new URLSearchParams({
      search: searchQuery,
      priceRange: filters.priceRange,
      brand: filters.brand,
      productType: filters.productType,
      rating: filters.rating,
    });

    // Fetch products from the backend
    fetch(`http://localhost:5001/api/products?${params.toString()}`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        alert('An error occurred while fetching products.');
        setIsLoading(false);
      });
  };

  const handleAddToWishlist = (ProductId) => {
    const storedUserId = localStorage.getItem('UserId'); // Ensure key matches

    if (!storedUserId) {
      alert('User not logged in!');
      return;
    }

    fetch('http://localhost:5001/api/users/wishlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ UserId: storedUserId, ProductId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          alert('Item added to wishlist!');
        } else {
          alert('Failed to add item to wishlist.');
        }
      })
      .catch((error) => {
        console.error('Error adding to wishlist:', error);
        alert('An error occurred while adding the item to the wishlist.');
      });
  };

  return (
    <div className="search-container">
      {/* Welcome Section */}
      <div className="welcome-section">
        <h1>Welcome to GlowGuide!</h1>
        <p>Start to search what products is best for you!</p>
      </div>
      <h2>Find Products</h2>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleInputChange}
        />
        <div className="filter-row">
          <select name="priceRange" onChange={handleFilterChange}>
            <option value="">Price Range</option>
            <option value="under25">Under $25</option>
            <option value="25to50">$25 to $50</option>
            <option value="50to100">$50 to $100</option>
            <option value="100andAbove">$100 and above</option>
          </select>
          <select name="brand" onChange={handleFilterChange}>
            <option value="">Brand</option>
            <option value="brandA">Drunk Elephant</option>
            <option value="brandB">Laura Mercier</option>
            <option value="brandC">Natasha Denona</option>
            <option value="brandD">Ilia Beauty</option>
            <option value="brandE">Charlotte Tilbury</option>
            <option value="brandF">Danessa Myricks</option>
            <option value="brandG">Bourjois</option>
            <option value="brandH">IT Cosmetics</option>
            <option value="brandI">Fenty Beauty</option>
            <option value="brandJ">Sisley</option>
          </select>
          <select name="productType" onChange={handleFilterChange}>
            <option value="">Product Type</option>
            <option value="blush">Blush</option>
            <option value="makeupRemover">Makeup Remover</option>
            <option value="highlighter">Highlighter</option>
            <option value="faceMask">Face Mask</option>
            <option value="foundation">Foundation</option>
            <option value="powder">Powder</option>
            <option value="lipGloss">Lip Gloss</option>
            <option value="ccCream">CC Cream</option>
            <option value="eyeShadow">Eye Shadow</option>
            <option value="concealer">Concealer</option>
            <option value="eyeliner">Eyeliner</option>
            <option value="lipstick">Lipstick</option>
            <option value="settingSpray">Setting Spray</option>
            <option value="cleanser">Cleanser</option>
            <option value="bronzer">Bronzer</option>
            <option value="primer">Primer</option>
            <option value="faceOil">Face Oil</option>
            <option value="contour">Contour</option>
            <option value="mascara">Mascara</option>
            <option value="bbCream">BB Cream</option>
            <option value="lipLiner">Lip Liner</option>
            <option value="moisturizer">Moisturizer</option>
            <option value="exfoliator">Exfoliator</option>
          </select>
          <select name="rating" onChange={handleFilterChange}>
            <option value="">Rating</option>
            <option value="4">⭐⭐⭐⭐ 4 &amp; up</option>
            <option value="3">⭐⭐⭐ 3 &amp; up</option>
            <option value="2">⭐⭐ 2 &amp; up</option>
            <option value="1">⭐ 1 &amp; up</option>
          </select>
        </div>
        <button type="submit">Search</button>
      </form>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="results-container">
          <h3>Results</h3>
          <ul className="product-list">
            {products.length > 0 ? (
              products.map((product) => (
                <li key={product.ProductId} className="product-card">
                  <div className="product-header">
                    <h4 className="product-name">{product.ProductName}</h4>
                    <span className="product-price">${product.Price}</span>
                  </div>
                  <div className="product-details">
                    <p><strong>Category:</strong> {product.Category}</p>
                    <p><strong>Brand ID:</strong> {product.BrandId}</p>
                    <p><strong>Usage Frequency:</strong> {product.UsageFrequency}</p>
                    <p><strong>Skin Type:</strong> {product.SkinType}</p>
                    <p><strong>Number of Reviews:</strong> {product.NumberOfReviews}</p>
                    <p><strong>Rating:</strong> {product.Rating}</p>
                    <p><strong>Gender Target:</strong> {product.GenderTarget}</p>
                  </div>
                  <button
                    onClick={() => handleAddToWishlist(product.ProductId)}
                    className="wishlist-button"
                  >
                    Add to Wishlist
                  </button>
                  <Link to={`/product/${product.ProductId}`} className="detail-button">
                    View Details
                  </Link>
                </li>
              ))
            ) : (
              <li>No products found.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchProducts;
