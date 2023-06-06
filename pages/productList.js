import ProductCard from '@/components/User/ProductCard';
import { useGetProductQuery } from '@/services/userApiSlice';
import { useRouter } from 'next/router';
import React from 'react'
const ProductList = () => {
    const subCatId = useRouter().query.subCatId
    const{data,isLoading} = useGetProductQuery(subCatId)
  return (
    <div className="m-5 ">
        <h1 className="text-3xl p-5">All Products</h1>
        <div
          className={"flex items-center justify-around flex-wrap gap-4 my-4 "}
        >
          {isLoading ? (
            <p>Loading</p>
          ) : (
            data?.data?.map((e) => {
              return <ProductCard key={e.product_id} data={e} />;
            })
          )}
        </div>
      </div>
  )
}

export default ProductList