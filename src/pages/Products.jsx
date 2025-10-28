import React from 'react'
import { useData } from '../context/data-context.js'
import FilterSection from '../components/FilterSection'
import Loading from '../assets/Loading4.webm'
import ProductCard from '../components/ProductCard'

const Products = () => {
  const {filteredData, loading, error, data} = useData()
  console.log("Products component - data:", data);
  console.log("Products component - filteredData:", filteredData);
  console.log("Products component - loading:", loading);
  console.log("Products component - error:", error);
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
          ) : (filteredData?.length > 0 || data?.length > 0) ? (
            <div className='flex gap-8'>
              <FilterSection/>
              <div className='flex-1'>
                <div className='mb-4'>
                  <h2 className='text-lg font-semibold text-gray-700'>
                    Showing {(filteredData?.length || data?.length || 0)} products
                  </h2>
                </div>
                <div className='grid grid-cols-4 gap-7 items-stretch'>
                  {
                    (filteredData?.length > 0 ? filteredData : data)?.map((product, index)=>{
                      return <ProductCard key={index} product={product}/>
                    })
                  }
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

export default Products