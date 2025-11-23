import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { DataContext } from "./data-context.js";

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    category: 'All',
    brand: 'All',
    priceRange: [0, 2000],
    searchTerm: ''
  })
  const [cart, setCart] = useState([]);

  const fetchAllProducts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await axios.get('https://fakestoreapi.com/products?limit=150');
      console.log("API Response:", res.data);
      console.log("Data length:", res.data.length);
      setData(res.data);
      setFilteredData(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);
  const getUniqueCategory = (data, property) =>{
        let newVal = data?.map((curElem)=> {
            return curElem[property]
        })
        newVal = ["All",...new Set(newVal)]
        return newVal
    }

    // Process category and brand data from fake API
    const categoryonlyData = getUniqueCategory(data,"category")
    
    // Handle brand data - some APIs might not have brand field
    const brandonlyData = data?.map((item) => {
      // Extract brand from title if brand field doesn't exist
      if (item.brand) {
        return item.brand;
      } else {
        // Extract first word from title as brand
        const titleWords = item.title?.split(' ') || [];
        return titleWords[0] || 'Unknown';
      }
    }).filter(Boolean);
    const uniqueBrands = ["All", ...new Set(brandonlyData)]

  // Filter function
  const applyFilters = useCallback(() => {
    let filtered = [...data];
    console.log("Original data length:", data.length);
    console.log("Current filters:", filters);

    // Category filter
    if (filters.category !== 'All') {
      filtered = filtered.filter(product => product.category === filters.category);
      console.log("After category filter:", filtered.length);
    }

    // Brand filter
    if (filters.brand !== 'All') {
      filtered = filtered.filter(product => {
        const titleWords = product.title?.split(' ') || [];
        const firstWord = titleWords[0] || '';
        return firstWord.toLowerCase() === filters.brand.toLowerCase();
      });
      console.log("After brand filter:", filtered.length);
    }

    // Price range filter
    filtered = filtered.filter(product => 
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );
    console.log("After price filter:", filtered.length);

    // Search term filter
    if (filters.searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
      console.log("After search filter:", filtered.length);
    }

    console.log("Final filtered data length:", filtered.length);
    setFilteredData(filtered);
  }, [data, filters]);

  // Apply filters whenever data or filters change
  useEffect(() => {
    if (data.length > 0) {
      applyFilters();
    }
  }, [data, applyFilters]);

  // Update filters function
  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  const addToCart = (product) => {
    setCart(prevCart => {
      // Check if product already exists in cart
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        // Increment quantity if already in cart
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Add new product with quantity 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing && existing.quantity > 1) {
        // Decrease quantity
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        // Remove product from cart
        return prevCart.filter(item => item.id !== product.id);
      }
    });
  };

  return (
    <DataContext.Provider value={{ 
      data, 
      filteredData, 
      setData, 
      fetchAllProducts, 
      categoryonlyData, 
      brandonlyData: uniqueBrands, 
      loading, 
      error,
      filters,
      updateFilters,
      cart,
      addToCart,
      removeFromCart
    }}>
      {children}
    </DataContext.Provider>
  );
};

