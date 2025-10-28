import React, { useState, useEffect } from 'react'
import {useData} from '../context/data-context.js'

const FilterSection = () => {
  const{categoryonlyData, brandonlyData, filters, updateFilters} = useData()
  const [searchTerm, setSearchTerm] = useState('')
  const [priceRange, setPriceRange] = useState([0, 2000])
  // Update filters when local state changes
  useEffect(() => {
    updateFilters({ searchTerm, priceRange });
  }, [searchTerm, priceRange, updateFilters]);

  const handleCategoryChange = (category) => {
    updateFilters({ category });
  };

  const handleBrandChange = (brand) => {
    updateFilters({ brand });
  };

  const handlePriceRangeChange = (index, value) => {
    const newRange = [...priceRange];
    newRange[index] = parseFloat(value);
    setPriceRange(newRange);
  };

  return (
    <div className='bg-gray-100 mt-10 p-4 rounded-md h-max w-64'>
      {/* Search */}
      <div>
        <h1 className='font-semibold text-xl mb-2'>Search</h1>
        <input 
          type="text" 
          placeholder='Search products...' 
          className='bg-white p-2 rounded-md border-gray-400 border-2 w-full'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Category Filter */}
      <div className='mt-5'>
        <h1 className='font-semibold text-xl mb-3'>Category</h1>
        <div className='flex flex-col gap-2'>
          {
            categoryonlyData?.map((item, index) => {
              return (
                <div key={index} className='flex gap-2 items-center'>
                  <input 
                    type='radio' 
                    name="category" 
                    checked={filters.category === item} 
                    value={item} 
                    onChange={() => handleCategoryChange(item)}
                    className='cursor-pointer'
                  />
                  <label 
                    className='cursor-pointer uppercase text-sm'
                    onClick={() => handleCategoryChange(item)}
                  >
                    {item}
                  </label>
                </div>
              );
            })
          }
        </div>
      </div>

      {/* Brand Filter */}
      <div className='mt-5'>
        <h1 className='font-semibold text-xl mb-3'>Brand</h1>
        <select 
          name="brand" 
          id="brand"
          className='bg-white w-full p-2 border-gray-200 border-2 rounded-md'
          value={filters.brand}
          onChange={(e) => handleBrandChange(e.target.value)}
        >
          {
            brandonlyData?.map((item, index) => {
              return <option key={index} value={item}>{item.toUpperCase()}</option>
            })
          }
        </select>
      </div>

      {/* Price Range Filter */}
      <div className='mt-5'>
        <h1 className='font-semibold text-xl mb-3'>Price Range</h1>
        <div className='space-y-2'>
          <div className='flex gap-2'>
            <input 
              type="number" 
              placeholder='Min' 
              className='bg-white p-2 rounded-md border-gray-200 border-2 w-full'
              value={priceRange[0]}
              onChange={(e) => handlePriceRangeChange(0, e.target.value)}
              min="0"
            />
            <input 
              type="number" 
              placeholder='Max' 
              className='bg-white p-2 rounded-md border-gray-200 border-2 w-full'
              value={priceRange[1]}
              onChange={(e) => handlePriceRangeChange(1, e.target.value)}
              min="0"
            />
          </div>
          <div className='text-sm text-gray-600'>
            Range: ${priceRange[0]} - ${priceRange[1]}
          </div>
        </div>
      </div>

      {/* Clear Filters */}
      <div className='mt-5'>
        <button 
          onClick={() => {
            setSearchTerm('');
            setPriceRange([0, 2000]);
            updateFilters({ 
              category: 'All', 
              brand: 'All', 
              searchTerm: '', 
              priceRange: [0, 2000] 
            });
          }}
          className='bg-gray-500 text-white px-4 py-2 rounded-md w-full hover:bg-gray-600 transition-colors'
        >
          Clear All Filters
        </button>
      </div>
    </div>
  )
}

export default FilterSection