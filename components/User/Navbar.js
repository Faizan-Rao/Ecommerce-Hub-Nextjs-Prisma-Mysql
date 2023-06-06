import { Button } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { AiOutlineLogin } from "react-icons/ai";

const Navbar = () => {
  return (
    <>
      {/* Navbar Header */}
      <div className="m-2 flex items-center justify-end ">
        {" "}
        <Link href={"Login"} className="flex items-center hover:text-[#3ba33b]  ">
          <AiOutlineLogin className="mx-1" /> <span>Signup | Login</span>
        </Link>
      </div>

      {/* Navbar */}
      <div className="flex justify-between items-center  p-4 bg-gray-100 flex-wrap">
        <div className="text-3xl">Bizworld</div>
        <div>
          <ul className="flex justify-between items-center  my-4  ">
            <li className="mr-3 ">
              <Link className="mx-3 hover:text-[#3ba33b]" href={"/"}>
                Home
              </Link>
            </li>
            <li className="mr-3 ">
              <Link className="mx-3 hover:text-[#3ba33b]" href={"Store"}>
                Store
              </Link>
            </li>
            <li className="mr-3 ">
              <Link className="mx-3 hover:text-[#3ba33b]" href={"product"}>
                Product
              </Link>
            </li>
            <li className="mr-3 ">
              <Link className="mx-3 hover:text-[#3ba33b]" href={"#"}>
                About
              </Link>
            </li>
            <li className="mr-3 ">
              <Link className="mx-3 hover:text-[#3ba33b]" href={"#"}>
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <Button variant="solid"  colorScheme="green">
            <Link href={"#"}> Your Store</Link> 
          </Button>
      </div>
    </>
  );
};

export default Navbar;
