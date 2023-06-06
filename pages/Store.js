import StoreLink from '@/components/User/StoreLink'
import { useGetStoresQuery } from '@/services/userApiSlice'
import React from 'react'

const Store = () => {
    const {data, isLoading} = useGetStoresQuery()
  return (
    <div className="m-5 ">
        <h1 className="text-3xl p-5">All Stores</h1>
        <div className="flex  items-center  flex-wrap gap-8 p-8">
          {
            isLoading ? <p>Loading</p> : 
            data?.data?.map(e =>{
                return <StoreLink key={e.store_id} data={e}/>
            })
          }
        </div>
      </div>
  )
}

export default Store