import Link from "next/link";
import React from "react";
import { FaStore } from "react-icons/fa";
const StoreLink = ({ data }) => {
  return (
    <div className="p-6 text-2xl mr-2 rounded-full shadow-md bg-white inline-block min-w-[50%]  text-[#38a169]  hover:bg-gray-200">
      <Link href={{pathname: "categories", query: {storeId : data.store_id} }} className="flex items-center gap-8 text-[#]">
        <FaStore className="inline-block"/>
        <span>{data.store_name}</span>
      </Link>
    </div>
  );
};

export default StoreLink;
