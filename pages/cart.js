import {
  addOne,
 
  removeOne,
  removeToCart,
} from "@/services/LocalSlices/CartLocalSlice";
import React  from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
Link;
import { ImBin } from "react-icons/im";
import Link from "next/link";
import CheckoutForm from "@/components/User/CheckoutForm";
import { useForm } from "react-hook-form";

const Cart = () => {
  
  const {
    value: cart,
    totalPrice,
    totalQuantity,
  } = useSelector((state) => state.cart);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();
 

 
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  
  return (
    <div className="flex justify-between gap-1 flex-wrap  ">
      <div className="m-5 overflow-auto ">
        <h1 className="text-3xl p-5">Checkout Items</h1>
        {/* Table For Cart Items */}
        <TableContainer>
          <Table size="sm" className="border-2">
            <Thead className="bg-gray-200">
              <Tr>
                <Th>Item#</Th>
                <Th>Product-Title</Th>
                <Th>Product-Quantity</Th>
                <Th>Product-warranty</Th>
                <Th>Product-Price</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody className="bg-white">
              {cart.map((e, i) => {
                return (
                  <Tr key={i}>
                    <Td>{i + 1}</Td>
                    <Td className="text-gray-500 text-lg font-semibold">
                      {e.product_title}
                    </Td>
                    {/* Quantity Indicator */}
                    <Td className=" flex justify-center item-center  font-semibold">
                      <span className="self-center">Quantity: </span>{" "}
                      <button
                        className=" bg-[#38A169] text-xl text-white px-1  mx-2 rounded aspect-square"
                        onClick={() => dispatch(addOne(e.product_id))}
                      >
                        +
                      </button>
                      <input
                        type="number"
                        className=" border-2 outline-none text-center rounded "
                        name="qty"
                        onChange={() => ""}
                        value={e.product_qty}
                        readOnly
                      />
                      <button
                        className=" bg-[#38A169] text-xl text-white px-2 min-w-8 ml-3 rounded "
                        onClick={() => dispatch(removeOne(e.product_id))}
                      >
                        -
                      </button>
                    </Td>
                    {/* Product Warranty */}
                    <Td isNumeric>{e.product_warranty}</Td>
                    {/* Price of Product */}
                    <Td isNumeric>
                      <span className="text-gray-500">${e.product_price}</span>
                    </Td>
                    <Td>
                      <button
                        className=" bg-[#38A169]   text-white p-1  ml-3 rounded aspect-square text-xl"
                        onClick={() => dispatch(removeToCart(e.product_id))}
                      >
                        {" "}
                        <ImBin />
                      </button>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
            <Tfoot></Tfoot>
          </Table>
        </TableContainer>
      </div>
      <div className="p-4  self-center">
        {/* Table for Total Items & price */}
        <TableContainer>
          <Table size="md" className="border-2">
            <Thead className="bg-gray-200">
              <Tr>
                <Th isNumeric>Total Amount</Th>
                <Th isNumeric>Total Items</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody className="bg-white">
              <Tr>
                <Td isNumeric fontWeight={"semibold"}>
                  ${totalPrice}
                </Td>
                <Td isNumeric fontWeight={"semibold"}>
                  {totalQuantity}
                </Td>
                <Td isNumeric>
                  {" "}
                  {cart.length > 0 && isLoggedIn && (
                    <div className="flex justify-item items-center">
                      <Button
                        href={"cart"}
                        className=" bg-gray-400 text-md   text-white    rounded py-1 px-2 "
                        onClick={onOpen}
                        colorScheme="green"
                        variant={'solid'}
                      >
                        Checkout Cart
                      </Button>
                    </div>
                  )}
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </div>
      <CheckoutForm
      isOpen = {isOpen}
      onClose = {onClose}
      type={"product"}
      register={register}
      handleSubmit={handleSubmit}
      errors={errors}
      reset={reset} />
    </div>
  );
};

export default Cart;
