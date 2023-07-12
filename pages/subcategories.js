import CategoryLink from "@/components/User/CategoryLink";
import SubCategoryLink from "@/components/User/SubCategoryLink";
import { useGetSubCategoryQuery } from "@/services/userApiSlice";
import { useRouter } from "next/router";
import React from "react";
import { motion } from "framer-motion";
const SubCategory = () => {
  const catId = useRouter().query.catId;
  const { data, isLoading } = useGetSubCategoryQuery(catId);
  return (
    <motion.div
      initial={{ x: "-100%" }}
      whileInView={{ x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="m-5 flex justify-center items-center flex-col"
    >
      <h1 className="text-3xl px-5 py-3 bg-green-500 my-5 rounded-full text-white font-bold shadow-lg">
        Subcategory
      </h1>
      <div className="flex justify-center items-center  flex-wrap gap-8 p-8">
        {!isLoading  &&
          data?.data?.map((e, i) => {
            return (
              <motion.div
                initial={{ x: "-100%", opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.7 }}
                key={i}
              >
                <SubCategoryLink data={e} />
              </motion.div>
            );
          })
        }
      </div>
    </motion.div>
  );
};

export default SubCategory;
