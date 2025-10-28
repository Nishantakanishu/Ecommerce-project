import React from 'react'
import { useData } from '../context/data-context.js'

const Category = () => {
    const {categoryonlyData} = useData()

    

    // useEffect(()=>{
    //     fetchAllProducts()
    // },[fetchAllProducts])
  return (
    <div className='bg-[#101829]'>
        <div className='max-w-7xl mx-auto flex gap-4 items-center justify-around py-7 px-4'>
            {
                categoryonlyData?.map((item, index)=>{
                    return <div key={index}>
                        <button className='uppercase bg-gradient-to-r from-red-500 to-purple-500 text-white px-3 py-1 rounded-md cursor-pointer'>{item}</button>
                    </div>
                })
            }
        </div>
        
        </div>
  )
}

export default Category