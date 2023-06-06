import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { BsBasket } from "react-icons/bs";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartTotal, removeToCart } from "@/services/LocalSlices/CartLocalSlice";
import { addOne, removeOne } from "@/services/LocalSlices/CartLocalSlice";
import { ImBin } from "react-icons/im";
import Link from "next/link";

const CartDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    value: cart,
    totalPrice,
    totalQuantity,
  } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartTotal());
  }, [cart,dispatch]);

  return (
    <div >
      {/* Cart Button */}
      <button
        onClick={onOpen}
        className="fixed bottom-3 z-10 right-3 text-xl text-[white] p-2 bg-[#3ba33b] rounded-lg flex items-center hover:bg-[green]"
      >
        {" "}
        <BsBasket className="mx-2" /> <span> {cart.length}</span>{" "}
      </button>

      {/* Cart Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"md"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Your Cart</DrawerHeader>

          <DrawerBody overflow={"auto"}>
            {/* move to check out page */}
            {cart.length > 0 && (
              <div className="flex justify-between items-center">
                <Link
                  href={"cart"}
                  className=" bg-[#38A169]   text-white    rounded-lg py-1 px-2 "
                  onClick={onClose}
                >
                  Visit Cart
                </Link>
                <div className="font-semibold text-lg">
                  Total Amount:{" "}
                  <span className="text-gray-500">${totalPrice}</span>{" "}
                </div>
                <div className="font-semibold text-lg">
                  Total Items:{" "}
                  <span className="text-gray-500">{totalQuantity}</span>{" "}
                </div>
              </div>
            )}
            {/* Cart Items */}
            {cart &&
              cart.map((e, i) => {
                return (
                  <div key={i}>
                    <div className="flex flex-col gap-2 justify-between my-5 bg-gray-200 p-4 rounded-lg">
                      <div className="text-gray-500 text-lg font-semibold">
                        {e.product_title}
                      </div>
                      <div className="flex justify-between  items-center gap-8">
                        {/* Quantity Indicator */}
                        <div className=" flex item-center  w-[50%] my-4 font-semibold">
                          <span>Quantity: </span>{" "}
                          <button
                            className=" bg-[#38A169] text-xl text-white px-1  mx-2 rounded aspect-square"
                            onClick={() => dispatch(addOne(e.product_id))}
                          >
                            +
                          </button>
                          <input
                            type="number"
                            value={e.product_qty}
                            className="w-[20%] border-2 outline-none text-center rounded "
                            name="qty"
                            id="qty"
                            onChange={() => null}
                            defaultValue={0}
                            readOnly
                          />
                          <button
                            className=" bg-[#38A169] text-xl text-white px-2 min-w-8 ml-3 rounded "
                            onClick={() => dispatch(removeOne(e.product_id))}
                          >
                            -
                          </button>
                        </div>
                        {/* Price of Product */}
                        <span className="font-semibold text-lg block">
                          Price:{" "}
                          <span className="text-gray-500">
                            ${e.product_price}
                          </span>
                        </span>
                        <button
                          className=" bg-[#38A169]   text-white p-1  ml-3 rounded aspect-square text-xl"
                          onClick={() => dispatch(removeToCart(e.product_id))}
                        >
                          {" "}
                          <ImBin />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default CartDrawer;
