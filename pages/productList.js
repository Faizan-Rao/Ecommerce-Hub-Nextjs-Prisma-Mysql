import ProductCard from "@/components/User/ProductCard";
import { useGetProductQuery } from "@/services/userApiSlice";
import { useRouter } from "next/router";
import React from "react";
import { motion } from "framer-motion";
const ProductList = () => {
  const subCatId = useRouter().query.subCatId;
  const { data, isLoading } = useGetProductQuery(subCatId);
  return (
    <motion.div
      initial={{ x: "-100%" }}
      whileInView={{ x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="m-5 flex items-center justify-center flex-col"
    >
      <h1 className="text-3xl px-5 py-3 bg-green-500 my-5 rounded-full text-white font-bold shadow-lg">
        Product List
      </h1>
      <div className={"flex items-center  flex-wrap gap-20 my-4 "}>
        {!isLoading  &&
          data?.data?.map((e) => {
            return (
              <motion.div
                initial={{ x: "-100%", opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease:"easeInOut" }}
                viewport={{ once: true }}
                key={e.product_id}
              >
                <ProductCard data={e} />
              </motion.div>
            );
          })
        }
      </div>
    </motion.div>
  );
};

export default ProductList;
