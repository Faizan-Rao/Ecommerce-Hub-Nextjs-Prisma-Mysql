import { addToCart } from "@/services/LocalSlices/CartLocalSlice";
import { useGetProductDetailQuery } from "@/services/userApiSlice";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";

const Detail = () => {
  const prodId = useRouter().query.prodId;
  const dispatch = useDispatch();
  const { data, isLoading } = useGetProductDetailQuery(prodId);
  const sProduct = data?.data[0];
  return (
    <>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <section className="text-gray-600 body-font overflow-hidden">
          <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              {/* Product Image */}
              <Image
                alt="ecommerce"
                className="lg:w-1/2 w-full lg:h-auto h-64 aspect-square object-cover object-center rounded"
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                width={200}
                height={200}
              />
              {/* Product Brand and Name */}
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                  PRODUCT NAME
                </h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                  {sProduct.product_title}
                </h1>
                {/* Product Reviews */}
                <div>({data?.data?.length}) Reviews</div>
                <p className="leading-relaxed my-6">
                  {sProduct.product_desc} <br />
                </p>

                <p className="font-semibold text-md py-4">
                  Product Warranty : {sProduct.product_warranty} <br />
                </p>
                {/* Product Price and Add To Cart */}
                <div className="flex">
                  <span className="title-font font-medium text-2xl text-gray-900">
                    ${sProduct.product_price}.00
                  </span>
                  <button onClick={()=>dispatch(addToCart(sProduct))} className="flex ml-auto text-white bg-[#38a169] border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded">
                    Add to Cart
                  </button>
                  <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Detail;
