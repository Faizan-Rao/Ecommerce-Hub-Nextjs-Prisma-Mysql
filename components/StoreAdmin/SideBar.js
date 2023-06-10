import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  DrawerFooter,
  Button,
} from "@chakra-ui/react";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Link from "next/link";

const SideBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();

  return (
    <div>
      {/* Cart Button */}
      <button
        onClick={onOpen}
        className="fixed top-3 z-10 right-3 text-lg p-2 bg-green-600 text-white rounded-lg flex items-center hover:bg-green-700 hover:text-white"
      >
        {" "}
        <BsFillArrowUpCircleFill className="mx-2" /> <span>Menu</span>{" "}
      </button>

      {/* Cart Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"lg"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton color={"green.700"} mt={2} />
          <DrawerHeader fontSize={"xl"}>USER-PANEL</DrawerHeader>

          <DrawerBody overflow={"auto"}>
            {/* Drawer Links */}
            <ul className="flex justify-center items-center flex-col min-h-[600px] gap-9">
              <li className="flex mx-auto gap-4 items-center text-gray-500 w-[50% hover:text-green-600  py-2  px-6 font-semibold text-lg  mr-auto">
                <button href={"#"} className="flex justify-between items-center gap-8">
                  <BsFillArrowUpCircleFill className="text-xl" />{" "}
                  <span>Profile</span>{" "}
                </button>
              </li>
              <li className="flex mx-auto gap-4 items-center text-gray-500 w-[50% hover:text-green-600  py-2  px-6 font-semibold text-lg  mr-auto">
                <Link href={"#"} className="flex justify-between items-center gap-8">
                  <BsFillArrowUpCircleFill className="text-xl" />{" "}
                  <span>Stores</span>
                </Link>
              </li>
              <li className="flex mx-auto gap-4 items-center text-gray-500 w-[50% hover:text-green-600  py-2  px-6 font-semibold text-lg  mr-auto">
                <Link href={"#"} className="flex justify-between items-center gap-8">
                  <BsFillArrowUpCircleFill className="text-xl" />{" "}
                  <span>Orders</span>
                </Link>
              </li>
              <li className="flex mx-auto gap-4 items-center text-gray-500 w-[50% hover:text-green-600  py-2  px-6 font-semibold text-lg  mr-auto">
                <Link href={"#"} className="flex justify-between items-center gap-8">
                  <BsFillArrowUpCircleFill className="text-xl" />{" "}
                  <span>Categories</span>
                </Link>
              </li>
              <li className="flex mx-auto gap-4 items-center text-gray-500 w-[50% hover:text-green-600  py-2  px-6 font-semibold text-lg  mr-auto">
                <Link href={"#"} className="flex justify-between items-center gap-8">
                  <BsFillArrowUpCircleFill className="text-xl" />{" "}
                  <span>SubCategory</span>{" "}
                </Link>
              </li>
              <li className="flex mx-auto gap-4 items-center text-gray-500 w-[50% hover:text-green-600  py-2  px-6 font-semibold text-lg  mr-auto">
                <Link href={"#"} className="flex justify-between items-center gap-8">
                  <BsFillArrowUpCircleFill className="text-xl" />{" "}
                  <span>Products</span>
                </Link>
              </li>
            </ul>
          </DrawerBody>
          <DrawerFooter>
            <Button colorScheme="green">Logout</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default SideBar;
