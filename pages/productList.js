import ProductCard from '@/components/User/ProductCard';
import { useGetProductQuery } from '@/services/userApiSlice';
import { useRouter } from 'next/router';
import React from 'react'
import {motion} from 'framer-motion'
const ProductList = () => {
    const subCatId = useRouter().query.subCatId
    const{data,isLoading} = useGetProductQuery(subCatId)
  return (
    <motion.div
    initial={{ scale: 0 }}
    whileInView={{ scale: 1 }}
    viewport={{ once: true }}
    transition={{duration:0.5}} className="m-5 flex items-center justify-center flex-col">
        <h1 className="text-3xl px-5 py-3 bg-green-500 my-5 rounded-full text-white font-bold shadow-lg">Product List</h1>
        <div
          className={"flex items-center  flex-wrap gap-4 my-4 "}
        >
          {isLoading ? (
            <p>Loading</p>
          ) : (
            data?.data?.map((e) => {
              return <ProductCard key={e.product_id} data={e} />;
            })
          )}
        </div>
      </motion.div>
  )
}

export default ProductList