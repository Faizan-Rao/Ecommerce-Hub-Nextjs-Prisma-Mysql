import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import React from "react";
import Image from "next/image";

const Carousel = () => {
//   SwiperCore.use([Autoplay]);
  
  return (
    <Swiper
    modules={[Navigation, Pagination, Scrollbar, A11y]}
    spaceBetween={50}
    slidesPerView={1}
    navigation
    pagination={{ clickable: true }}
    scrollbar={{ draggable: true }}
    onSwiper={(swiper) => console.log(swiper)}
    onSlideChange={() => console.log('slide change')}
    autoplay={{ delay: 4000, disableOnInteraction: true }}
    width={100}
    >
      <SwiperSlide>
      <Image src={"https://cdn.pixabay.com/photo/2015/03/30/12/43/bananas-698608_1280.jpg"}
      alt={"slide1"}
      width={400}
      height={400}
      className="w-[100%] aspect-[1/4] object-cover"/>          
      </SwiperSlide>
      
    </Swiper>
  );
};

export default Carousel;
