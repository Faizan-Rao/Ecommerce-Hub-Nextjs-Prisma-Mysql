import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
// import required modules
import { FreeMode, Pagination } from "swiper";

import { motion } from "framer-motion";
import { useGetFeaturedQuery } from "@/services/userApiSlice";
import ProductCard from "./ProductCard";
const FeaturedProducts = () => {
  const { data, isLoading } = useGetFeaturedQuery();
  console.log(data);
  return data?.map((e) => {
    return (
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="m-20 flex  flex-col  rounded-xl"
        key={e.subcategory_id}
      >
        <h1 className="text-3xl px-5 py-3 bg-green-500 mb-8 rounded-full text-white font-bold shadow-lg self-start">{e.subcategory_title}</h1>
        
          <Swiper
            slidesPerView={4}
            
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            modules={[FreeMode, Pagination]}
            className="w-[100%] h-[100%] my-4 rounded-xl flex flex-wrap  "
          >
            {e?.products?.map((e) => {
              return (
                <SwiperSlide key={e.product_id} className="mr-5" >
                  <ProductCard  data={e}  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        
      </motion.div>
    );
  });
};

export default FeaturedProducts;
