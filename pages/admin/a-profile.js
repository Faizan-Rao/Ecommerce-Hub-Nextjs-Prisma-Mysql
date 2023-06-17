import AdminForm from '@/components/Admin/AdminForm'
import React from 'react'
import {motion} from "framer-motion"
const Profile = () => {
  return (
    <motion.div
    initial={{ scale: 0 }}
    whileInView={{ scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }} className='flex justify-center items-center m-5'>
      <AdminForm/>
    </motion.div>
  )
}

export default Profile