import AdminForm from '@/components/Admin/AdminForm'
import React from 'react'
import {motion} from "framer-motion"
const Profile = () => {
  return (
    <motion.div
    initial={{ scale: 0 }}
    whileInView={{ scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }} className='flex justify-center items-center flex-col mx-20 my-5'>
       <h1 className="text-3xl self-start  my-10 px-5 py-3 bg-green-500 rounded-full text-white font-bold shadow-lg">
          Admin Profile
        </h1>
      <AdminForm/>
    </motion.div>
  )
}

export default Profile