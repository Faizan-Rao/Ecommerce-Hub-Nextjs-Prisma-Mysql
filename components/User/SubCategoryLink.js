import Link from "next/link";
import React from "react";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
const SubCategoryLink = ({ data }) => {
   
  return (
    <div className="p-6 text-2xl mr-2 rounded-full shadow-md bg-white inline-block min-w-[50%]  text-[#38a169]  hover:bg-gray-200">
      <Link
        href={{ pathname: "productList", query: { subCatId: data.subcategory_id } }}
        className="flex items-center gap-8 text-[#]"
      >
        <BsFillArrowRightCircleFill className="inline-block" />
        <span>{data.subcategory_title}</span>
      </Link>
    </div>
  );
};

export default SubCategoryLink;
