import React, { useState } from 'react'
import { useData } from '../context/data-context.js'
import FilterSection from '../components/FilterSection'
import Loading from '../assets/Loading4.webm'
import ProductCard from '../components/ProductCard'

const PRODUCTS_PER_PAGE = 16;

const Products = () => {
  const {filteredData, loading, error, data} = useData();
  const [page, setPage] = useState(1);
  const products = filteredData?.length > 0 ? filteredData : data;
  const totalPages = Math.ceil((products?.length || 0) / PRODUCTS_PER_PAGE);
  const paginatedProducts = products?.slice((page - 1) * PRODUCTS_PER_PAGE, page * PRODUCTS_PER_PAGE);

  return (
    <div>
      <div className='max-w-6xl mx-auto px-4 mb-10'>
        {
          loading ? (
            <div className='flex items-center justify-center h-[400px]'>
              <video muted autoPlay loop>
                <source src={Loading} type='video/webm'/>
              </video>
            </div>
          ) : error ? (
            <div className='flex items-center justify-center h-[400px]'>
              <div className='text-center'>
                <h2 className='text-2xl font-bold text-red-500 mb-4'>Error Loading Products</h2>
                <p className='text-gray-600'>{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
                >
                  Retry
                </button>
              </div>
            </div>
          ) : (products?.length > 0) ? (
            <div className='flex gap-8'>
              <FilterSection/>
              <div className='flex-1'>
                <div className='mb-4 flex justify-between items-center'>
                  <h2 className='text-lg font-semibold text-gray-700'>
                    Showing {paginatedProducts.length} of {products.length} products
                  </h2>
                  <div className='flex gap-2'>
                    <button 
                      disabled={page === 1}
                      onClick={() => setPage(page - 1)}
                      className={`px-4 py-2 rounded bg-black text-white font-bold transition-all ${page === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'}`}
                    >Previous</button>
                    <button 
                      disabled={page === totalPages}
                      onClick={() => setPage(page + 1)}
                      className={`px-4 py-2 rounded bg-red-600 text-white font-bold transition-all ${page === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700'}`}
                    >Next</button>
                  </div>
                </div>
                <div className='grid grid-cols-4 gap-7 items-stretch justify-items-stretch'>
                  {
                    paginatedProducts?.map((product, index) => (
                      <div
                        key={product.id || index}
                        className="flex flex-col h-[350px] w-full min-w-[220px] max-w-[1fr] items-stretch justify-stretch"
                      >
                        <ProductCard product={product} />
                      </div>
                    ))
                  }
                </div>
                <div className='flex justify-center mt-8 gap-4'>
                  <button 
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className={`px-6 py-3 rounded-xl bg-black text-white font-bold text-lg transition-all ${page === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'}`}
                  >Previous</button>
                  <span className='text-lg font-semibold text-gray-700'>Page {page} of {totalPages}</span>
                  <button 
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                    className={`px-6 py-3 rounded-xl bg-red-600 text-white font-bold text-lg transition-all ${page === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700'}`}
                  >Next</button>
                </div>
              </div>
            </div>
          ) : (
            <div className='flex items-center justify-center h-[400px]'>
              <div className='text-center'>
                <h2 className='text-2xl font-bold text-gray-500 mb-4'>No Products Found</h2>
                <p className='text-gray-600'>Try refreshing the page or check your connection.</p>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Products;