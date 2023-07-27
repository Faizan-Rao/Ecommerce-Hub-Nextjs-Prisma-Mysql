import Image from "next/image";
import { Inter } from "next/font/google";
import { useGetRecommendedQuery } from "@/services/userApiSlice";
import ProductCard from "@/components/User/ProductCard";
import Link from "next/link";
import { motion } from "framer-motion";
import FeaturedProducts from "@/components/User/FeaturedProducts";
const inter = Inter({ subsets: ["latin"] });
// Home Entry Point User
export default function Home() {
  const { data, isLoading } = useGetRecommendedQuery();
  return (
    <>
      {/* Popular Products */}
      <motion.div
        // initial={{ scale: 0 , x:"-100%" }}
        initial={{ opacity: 0, y: "20%" }}
        // whileInView={{ scale: 1, x:0 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className="mx-20 my-5 flex  flex-col"
      >
        <h1 className="text-3xl sm:text-center self-center px-5 py-3 bg-green-500 my-5 rounded-full text-white font-bold shadow-lg">
          Product Recommendation
        </h1>
        <div
          className={
            "flex justify-center items-center  flex-wrap gap-20 bg-gray-200 rounded-xl overflow-hidden p-5  my-4 "
          }
        >
          {!isLoading  &&
            data?.data?.map((e) => {
              return (
                <motion.div
                  initial={{ x: "-100%", opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.7 }}
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
      {/* Featured Products */}
      <div className="lg:block md:block sm:hidden">
        <FeaturedProducts />
      </div>
      {/* Call To Action */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="m-6 flex justify-center items-center flex-col  bg-white  rounded-full  p-8"
      >
        <h1 className="text-3xl p-5">Call To Action</h1>
        <div className="flex justify-center items-center flex-col gap-8 p-4">
          <p>For More Information Click the Buttons Below</p>
          <ul className="flex justify-around flex-wrap">
            <li>
              {" "}
              <Link
                href={"/Store"}
                className="bg-[#38a169] hover:bg-[green]  text-[white] px-4 py-2  rounded shadow-lg m-4"
              >
                Store
              </Link>{" "}
            </li>
            <li>
              {" "}
              <Link
                href={"#"}
                className="bg-[#38a169] hover:bg-[green]  text-[white] px-4 py-2  rounded shadow-lg m-4"
              >
                About
              </Link>{" "}
            </li>
            <li>
              {" "}
              <Link
                href={"#"}
                className="bg-[#38a169] hover:bg-[green]  text-[white] px-4 py-2  rounded shadow-lg m-4"
              >
                Contact
              </Link>{" "}
            </li>
          </ul>
        </div>
      </motion.div>
      {/* Our Partner */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="m-5 flex justify-center items-center flex-col "
      >
        <h1 className="text-3xl  self-center px-5 py-3 bg-green-500 my-5 rounded-full text-white font-bold shadow-lg">Our Partner</h1>
        <div className="flex justify-center items-center flex-col  gap-8 aspect-[8/2] p-8">
          <ul className="flex justify-center items-center  gap-8 flex-wrap">
            <motion.li
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex gap-3 items-center  aspect-square p-4 bg-white overflow-hidden rounded-full shadow-lg"
            >
              {" "}
              <Image
                src={"/brandLogo/apple.png"}
                className="object-cover h-20 "
                height={200}
                width={200}
                alt="Apple"
              />
            </motion.li>
            <motion.li
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex gap-3 items-center aspect-square p-4 bg-white bg-blend-darken overflow-hidden rounded-full shadow-lg"
            >
              {" "}
              <Image
                src={"/brandLogo/samsung.png"}
                className="object-cover h-20 "
                height={200}
                width={200}
                alt="Samsung"
              />
            </motion.li>
            <motion.li
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex gap-3 items-center aspect-square p-4 bg-white bg-blend-darken overflow-hidden rounded-full shadow-lg"
            >
              {" "}
              <Image
                src={"/brandLogo/sony.png"}
                className="object-cover h-20 "
                height={200}
                width={200}
                alt="Sony"
              />
            </motion.li>
          </ul>
        </div>
      </motion.div>
    </>
  );
}
