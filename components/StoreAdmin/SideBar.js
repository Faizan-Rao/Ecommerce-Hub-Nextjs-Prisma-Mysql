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
import { BsFillArrowUpCircleFill,BsFillPersonFill,BsFillBasketFill } from "react-icons/bs";
import {BiCategory} from 'react-icons/bi'
import {FaStore, FaProductHunt} from 'react-icons/fa'
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { removeUser } from "@/services/LocalSlices/UserLocalSlice";

const SideBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const store = useSelector(state => state.user.store)
  return (
    store.store_id && <div>
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
          <DrawerHeader fontSize={"xl"}>STORE-PANEL</DrawerHeader>

          <DrawerBody overflow={"auto"}>
            {/* Drawer Links */}
            <ul className="flex justify-center  flex-col min-h-[600px] gap-9">
             { !store ? <li className="flex mx-auto gap-4 items-center text-gray-500 w-[50%] hover:text-green-600  py-2  px-6 font-semibold text-lg  mr-auto">
                <Link href={"main"} onClick={onClose} className="flex justify-between items-center gap-8">
                  <FaStore className="text-2xl" />{" "}
                  <span>Store</span>
                </Link>
              </li>
              :
              <li className="flex mx-auto gap-4 items-center text-gray-500 w-[50%] hover:text-green-600  py-2  px-6 font-semibold text-lg  mr-auto">
                <Link href={"main"}  onClick={onClose} className="flex justify-between items-center gap-8">
                  <FaStore className="text-2xl" />{" "}
                  <span>{store.store_name}</span>
                </Link>
              </li>}
              <li className="flex mx-auto gap-4 items-center text-gray-500 w-[50%] hover:text-green-600  py-2  px-6 font-semibold text-lg  mr-auto">
                <Link href={"s-profile"} onClick={onClose} className="flex justify-between items-center gap-8">
                  <BsFillPersonFill className="text-2xl" />{" "}
                  <span>Edit Profile & Store</span>{" "}
                </Link>
              </li>
              <li className="flex mx-auto gap-4 items-center text-gray-500 w-[50%] hover:text-green-600  py-2  px-6 font-semibold text-lg  mr-auto">
                <Link href={"s-orders"} onClick={onClose} className="flex justify-between items-center gap-8">
                  <BsFillBasketFill className="text-2xl" />{" "}
                  <span>Orders</span>
                </Link>
              </li>
              
              <li className="flex mx-auto gap-4 items-center text-gray-500 w-[50%] hover:text-green-600  py-2  px-6 font-semibold text-lg  mr-auto">
                <Link href={"s-category"} onClick={onClose} className="flex justify-between items-center gap-8">
                  <FaProductHunt className="text-xl" />{" "}
                  <span>Products List</span>
                </Link>
              </li>
            </ul>
          </DrawerBody>
          <DrawerFooter>
            <Button colorScheme="green" onClick={()=>{
              dispatch(removeUser())
              window.location.replace('/')
              }}>Logout</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default SideBar;
