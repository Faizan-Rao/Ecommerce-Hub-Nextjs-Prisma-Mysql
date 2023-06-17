import React from "react";
import { BsCurrencyDollar, BsFillBasketFill } from "react-icons/bs";

import { BiCategory } from "react-icons/bi";
import { FaProductHunt } from "react-icons/fa";
import Link from "next/link";
import { useGetStatsQuery } from "@/services/adminApiSlice";
import {motion} from "framer-motion"
const MainAdmin = () => {
  const {data} = useGetStatsQuery()
  return (
    <>
      <div className=" flex justify-center items-center flex-col  gap-5 m-5">
        
        {/* Data ICONS */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }} className="flex justify-center items-center  gap-8 flex-wrap my-5">
          <div className="text-2xl aspect-square font-bold  bg-white shadow-lg text-green-600 min-h-[200px] rounded-full  px-9 flex justify-center items-center flex-col">
            <BsFillBasketFill className="text-2xl" />{" "}
            <span className="aspect-[7/4] text-center font-semibold p-4 rounded-full ">
              {data?.totalStore}
            </span>{" "}
            <span>Stores</span>
          </div>
          <div className="text-2xl aspect-square font-bold  bg-white shadow-lg   text-green-600 min-h-[200px] rounded-full  px-9 flex justify-center items-center flex-col">
            <BsCurrencyDollar className="text-2xl" />
            <span className="  aspect-[7/4] text-center  font-semibold p-4 rounded-full ">
              {data?.totalRevenue}
            </span>{" "}
            <span>Revenue</span>
          </div>
          <div className="text-2xl aspect-square font-bold bg-white shadow-lg   text-green-600 min-h-[200px] rounded-full  px-9 flex justify-center items-center flex-col">
            <FaProductHunt className="text-2xl" />
            <span className="  aspect-[7/4] text-center  font-semibold p-4 rounded-full ">
              {data?.totalCustomers}
            </span>{" "}
            <span>Customers</span>
          </div>
          <div className="text-2xl aspect-square font-bold  bg-white shadow-lg text-green-600 min-h-[200px] rounded-full  px-9 flex justify-center items-center flex-col">
            <BiCategory className="text-2xl" />
            <span className="  aspect-[7/4] text-center  font-semibold p-4 rounded-full ">
              {data?.totalAdmins}
            </span>{" "}
            <span>Admins</span>
          </div>
        </motion.div>
          <h1 className="text-4xl  my-10 text-[#3ba33b] font-semibold">
          Admin Dashboard
        </h1>
      </div>
      <div className=" mt-6 flex items-center flex-col  gap-32 m-5">
        
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}>
          {/* Drawer Links */}
          <ul className="flex gap-8 flex-wrap p-8 rounded-full ">
            <li className="flex justify-center mx-auto gap-4  text-gray-500  hover:text-gray-200 bg-gray-200 hover:bg-green-600  rounded-full  py-2  px-6 font-semibold text-lg  mr-auto transition-all">
              <Link
                href={"main"}
                className="flex justify-between items-center gap-8"
              >
                <span>Main</span>
              </Link>
            </li>

            <li className="flex justify-center mx-auto gap-4  text-gray-500  hover:text-gray-200 bg-gray-200 hover:bg-green-600  rounded-full  py-2  px-6 font-semibold text-lg  mr-auto transition-all">
              <Link
                href={"a-profile"}
                className="flex justify-between items-center gap-8"
              >
                <span>Edit Profile </span>{" "}
              </Link>
            </li>
            <li className="flex justify-center mx-auto gap-4  text-gray-500  hover:text-gray-200 bg-gray-200 hover:bg-green-600  rounded-full  py-2  px-6 font-semibold text-lg  mr-auto transition-all">
              <Link
                href={"a-customer"}
                className="flex justify-between items-center gap-8"
              >
                <span>Customers</span>
              </Link>
            </li>

            <li className="flex justify-center mx-auto gap-4  text-gray-500  hover:text-gray-200 bg-gray-200 hover:bg-green-600  rounded-full  py-2  px-6 font-semibold text-lg  mr-auto transition-all">
              <Link
                href={"a-stores"}
                className="flex justify-between items-center gap-8"
              >
                {" "}
                <span>Stores & Admins </span>
              </Link>
            </li>
          </ul>
        </motion.div>
      </div>
    </>
  );
};

export default MainAdmin;
