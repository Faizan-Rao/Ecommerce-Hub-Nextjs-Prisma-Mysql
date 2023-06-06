import CategoryLink from '@/components/User/CategoryLink'
import { useGetCategoryQuery } from '@/services/userApiSlice'
import { useRouter } from 'next/router'
import React from 'react'

const Categories = () => {
    const storeId = useRouter().query.storeId
    const {data: categories, isLoading} = useGetCategoryQuery(storeId)
    return (
      <div className="m-5 ">
          <h1 className="text-3xl p-5">All Categories</h1>
          <div className="flex  items-center  flex-wrap gap-8 p-8">
            {
              isLoading ? <p>Loading</p> : 
              categories?.data?.map((e,i )=>{
                  return <CategoryLink key={i} data={e}/>
              })
            }
          </div>
        </div>
    )
}

export default Categories