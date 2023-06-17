import StoreLink from '@/components/User/StoreLink'
import { useGetStoresQuery } from '@/services/userApiSlice'
import React from 'react'
import {motion} from "framer-motion"
const Store = () => {
    const {data, isLoading} = useGetStoresQuery()
  return (
    <motion.div
    initial={{ scale: 0 }}
    whileInView={{ scale: 1 }}
    viewport={{ once: true }}
    transition={{duration:0.5}} className="m-5 flex justify-center items-center flex-col">
        <h1 className="text-3xl p-5">Stores</h1>
        <div className="flex justify-center p-10 flex-wrap items-center gap-8 ">
          {
            isLoading ? <p>Loading</p> : 
            data?.data?.map(e =>{
                return <StoreLink key={e.store_id} data={e}/>
            })
          }
        </div>
      </motion.div>
  )
}

export default Store