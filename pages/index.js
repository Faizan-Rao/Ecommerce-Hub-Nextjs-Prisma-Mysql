import Image from "next/image";
import { Inter } from "next/font/google";
import { useGetRecommendedQuery } from "@/services/userApiSlice";
import ProductCard from "@/components/User/ProductCard";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });
// Home Entry Point User
export default function Home() {
  const { data, isLoading } = useGetRecommendedQuery();
  return (
    <>
      {/* Popular Products */}
      <div className="m-5 flex justify-center items-center flex-col">
        <h1 className="text-3xl p-5">Product Recommendation</h1>
        <div
          className={"flex items-center justify-center flex-wrap gap-8 my-4 "}
        >
          {isLoading ? (
            <p>Loading</p>
          ) : (
            data?.data?.map((e) => {
              return <ProductCard key={e.product_id} data={e} />;
            })
          )}
        </div>
      </div>
      {/* Call To Action */}
      <div className="m-5 flex justify-center items-center flex-col  bg-[#F3F4F6] rounded-full  p-8">
        <h1 className="text-3xl p-5">Call To Action</h1>
        <div className="flex justify-center items-center flex-col gap-8 p-4">
          <p>For More Information Click the Buttons Below</p>
          <ul className="flex justify-around flex-wrap">
            <li>
              {" "}
              <Link
                href={"#"}
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
      </div>
      {/* Our Partner */}
      <div className="m-5 flex justify-center items-center flex-col ">
        <h1 className="text-3xl p-5">Our Partner</h1>
        <div className="flex justify-center items-center flex-col  gap-8 aspect-[8/2] p-8">
          <ul className="flex justify-center items-center  gap-8 flex-wrap">
            <li className="flex gap-3 items-center  aspect-square p-4 bg-white overflow-hidden rounded-full shadow-lg">
              {" "}
              <Image
                src={"/brandLogo/apple.png"}
                className="object-cover h-20 "
                height={200}
                width={200}
                alt="Apple"
              />
            </li>
            <li className="flex gap-3 items-center aspect-square p-4 bg-white bg-blend-darken overflow-hidden rounded-full shadow-lg">
              {" "}
              <Image
                src={"/brandLogo/samsung.png"}
                className="object-cover h-20 "
                height={200}
                width={200}
                alt="Samsung"
              />
            </li>
            <li className="flex gap-3 items-center aspect-square p-4 bg-white bg-blend-darken overflow-hidden rounded-full shadow-lg">
              {" "}
              <Image
                src={"/brandLogo/sony.png"}
                className="object-cover h-20 "
                height={200}
                width={200}
                alt="Sony"
              />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
