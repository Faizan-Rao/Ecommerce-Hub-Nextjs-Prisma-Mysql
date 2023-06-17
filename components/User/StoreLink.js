import Link from "next/link";
import React from "react";
import { FaStore } from "react-icons/fa";
const StoreLink = ({ data }) => {
  return (
    <div className=" flex p-10   text-2xl  aspect-square rounded-xl shadow-md bg-white   text-[#38a169]  hover:bg-gray-200">
      <Link
        href={{ pathname: "categories", query: { storeId: data.store_id } }}
        className="flex justify-center items-center flex-col gap-8 text-[#]"
      >
        <FaStore className="inline-block" />
        <span>{data.store_name}</span>
      </Link>
    </div>
  );
};

export default StoreLink;
