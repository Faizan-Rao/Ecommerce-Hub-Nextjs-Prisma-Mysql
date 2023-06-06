import Link from "next/link";
import React from "react";
import { AiOutlineLogin } from "react-icons/ai";

const Navbar = () => {
  return (
    <>
      

      {/* Navbar Header */}
      <div className="m-2 flex items-center justify-end ">
        {" "}
        <Link href={"#"} className="flex items-center hover:text-[#3ba33b]  ">
          <AiOutlineLogin className="mx-1" /> <span>Signup / Login</span>
        </Link>
      </div>

      {/* Navbar */}
      <div className="flex justify-between items-center  p-4 bg-gray-100 flex-wrap">
        <div className="text-3xl">Bizworld</div>
        <div>
          <ul className="flex justify-between flex-wrap  ">
            <li className="mx-3 ">
              <Link className="mx-3 hover:text-[#3ba33b]" href={"/"}>
                Home
              </Link>
            </li>
            <li className="mx-3 ">
              <Link className="mx-3 hover:text-[#3ba33b]" href={"Store"}>
                Store
              </Link>
            </li>
            <li className="mx-3 ">
              <Link className="mx-3 hover:text-[#3ba33b]" href={"#"}>
                About
              </Link>
            </li>
            <li className="mx-3 ">
              <Link className="mx-3 hover:text-[#3ba33b]" href={"#"}>
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Search"
            className="border-2 px-2 py-1 rounded outline-none"
          />
          <button className="bg-[#38a169] hover:bg-[green]  text-[white] px-2 py-1  rounded shadow-lg ml-2">
            Search
          </button>
        </div>
      </div>

      
    </>
  );
};

export default Navbar;
