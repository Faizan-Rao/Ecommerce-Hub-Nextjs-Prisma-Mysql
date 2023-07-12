import CategoryLink from "@/components/User/CategoryLink";
import { useGetCategoryQuery } from "@/services/userApiSlice";
import { useRouter } from "next/router";
import React from "react";
import { motion } from "framer-motion";
const Categories = () => {
  const storeId = useRouter().query.storeId;
  const { data: categories, isLoading } = useGetCategoryQuery(storeId);
  return (
    <motion.div
      initial={{ x: "-100%" }}
      whileInView={{ x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="m-5 flex justify-center items-center flex-col "
    >
      <h1 className="text-3xl px-5 py-3 bg-green-500 my-5 rounded-full text-white font-bold shadow-lg">
        Categories
      </h1>
      <div className="flex justify-center items-center  flex-wrap gap-8 p-8">
        {!isLoading  &&
          categories?.data?.map((e, i) => {
            return (
              <motion.div
                initial={{ x: "-100%", opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.7 }}
                key={i}
              >
                <CategoryLink data={e} />
              </motion.div>
            );
          })
        }
      </div>
    </motion.div>
  );
};

export default Categories;
