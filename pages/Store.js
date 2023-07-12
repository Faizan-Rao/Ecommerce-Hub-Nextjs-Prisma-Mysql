import StoreLink from "@/components/User/StoreLink";
import { useGetStoresQuery } from "@/services/userApiSlice";
import React from "react";
import { motion } from "framer-motion";
const Store = () => {
  const { data, isLoading } = useGetStoresQuery();
  return (
    <motion.div
      // initial={{ scale: 0 , x:"-100%" }}
      initial={{ x: "-100%" }}
      whileInView={{ x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="m-5 flex justify-center items-center flex-col"
    >
      <h1 className="text-3xl px-5 py-3 bg-green-500 my-5 rounded-full text-white font-bold shadow-lg">
        Stores
      </h1>
      <div className="flex justify-center p-10 flex-wrap items-center gap-8 ">
        {isLoading ? (
          <p>Loading</p>
        ) : (
          data?.data?.map((e) => {
            return (
              <motion.div
                initial={{ x: "-100%", opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.7,ease: "easeOut" }}
                key={e.store_id}
              >
                <StoreLink data={e} />
              </motion.div>
            );
          })
        )}
      </div>
    </motion.div>
  );
};

export default Store;
