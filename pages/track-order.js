import React, { useEffect, useState } from "react";
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
import { useForm } from "react-hook-form";
import { useGetOrdersQuery } from "@/services/userApiSlice";

const TrackOrder = () => {
  // states and Hooks
  const customer_id = useSelector((state) => state.user.data.customer_id);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, isLoading } = useGetOrdersQuery(customer_id);

  return (
    <div className="flex justify-between gap-1 flex-wrap  ">
      <div className="m-5 overflow-auto ">
        <h1 className="text-3xl p-5">Track Orders</h1>
        {/* Table For Order Items */}
        <TableContainer className="flex gap-8">
          {!isLoading &&
            data.map((order, i) =>  (
                <Table size="sm" className="border-2" key={i}>
                  <Thead className="bg-gray-200">
                    <Tr>
                      <Th>Order#</Th>
                      <Th>Order-Title</Th>
                      <Th>Order-Quantity</Th>
                      <Th>Order-Status</Th>
                      <Th>Order-Date</Th>
                      <Th>Total-Price</Th>
                      <Th>
                        <button className=" bg-gray-400 hover:bg-gray-600  text-white py-2 px-2  ml-3 rounded  font-semibold text-[16px]">
                          {" "}
                          Cancel Order
                        </button>
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody className="bg-white">
                    {order.purchase_record.map((e, i) => (
                      <Tr key={i}>
                        {/* Items# */}
                        <Td>{i + 1}</Td>
                        {/* Order Title */}
                        <Td className="text-gray-500 text-lg font-semibold">
                          {e.purchase_title}
                        </Td>
                        {/* Order Quantity  */}
                        <Td className=" flex justify-center item-center  font-semibold">
                          {e.purchase_quantity}
                        </Td>
                        {/* Order Status*/}
                        <Td>{e.purchase_status}</Td>
                        {/* Order Date */}
                        <Td>{e.purchase_date.toString().split("T")[0]}</Td>
                        {/* Total Price */}
                        <Td isNumeric>
                          <span className="text-gray-500">
                            ${e.purchase_amount}
                          </span>
                        </Td>
                        {/* Cancellation Button */}
                      </Tr>
                    ))}
                  </Tbody>
                  <Tfoot></Tfoot>
                </Table>
              )
            )}
        </TableContainer>
      </div>
    </div>
  );
};

export default TrackOrder;
