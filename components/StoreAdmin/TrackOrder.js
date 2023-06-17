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

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
} from "@chakra-ui/react";
import { ImBin } from "react-icons/im";
import Link from "next/link";
import { useForm } from "react-hook-form";
import {
  useGetOrdersQuery,
  useRemoveOrderMutation,
} from "@/services/userApiSlice";
import { useDispatchOrderMutation, useSgetOrdersQuery } from "@/services/sadminApiSlice";

const TrackOrder = () => {
  // states and Hooks
  const customer_id = useSelector((state) => state.user.data.customer_id);
  const store_id = useSelector((state) => state.user.store.store_id);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, isLoading } = useSgetOrdersQuery({ customer_id, store_id },{
    pollingInterval:20000
  });
  const [dispatchOrder] = useDispatchOrderMutation()

  const toast = useToast();

  const onDispatchOrder = async (id) => {
    try {
      const payload = await dispatchOrder({ id }).unwrap();
      toast({
        title: `Order Dispatch Successfully!`,
        status: "success",
        isClosable: true,
        position: "top",
        duration: 4000,
      });
      console.log(payload);
    } catch (err) {
      toast({
        title: `Order Dispatch failed!`,
        status: "warning",
        isClosable: true,
        position: "top",
        duration: 4000,
      });
    }
  };
  return (
    
      <>
        <TableContainer>
         
                <Table size="sm" className="border-2" >
                  <Thead className="bg-gray-200">
                    <Tr>
                      <Th>Order#</Th>
                      <Th>Order-Title</Th>
                      <Th>Order-Quantity</Th>
                      <Th>Order-Status</Th>
                      <Th>Order-Date</Th>
                      <Th>Total-Price</Th>
                      <Th>Bill-ID</Th>
                      <Th></Th>
                    </Tr>
                  </Thead>
                  <Tbody overflow={'auto'} className="bg-white overflow-auto">
                  {!isLoading &&
            data.orders.map((e, i) => {
              return (  <Tr key={i + 1}>
                      {/* Items# */}
                      <Td>{i + 1}</Td>
                      {/* Order Title */}
                      <Td className="text-gray-500 text-lg font-semibold">
                        {e.purchase_title}
                      </Td>
                      {/* Order Quantity  */}
                      <Td className=" font-semibold" isNumeric>
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
                      <Td isNumeric>{e.bill_id}</Td>
                      {/* Dispatch Button */}
                      <Td><Th isNumeric>
                        <button
                          className=" bg-orange-500 hover:bg-gray-600  text-white py-2 px-2  ml-3 rounded  font-semibold text-[16px]"
                          onClick={onOpen}
                          onClickCapture={() => onDispatchOrder(e.purchase_id)}
                        >
                          {" "}
                          Dispatch
                        </button>
                      </Th></Td>
                    </Tr>)})}
                  </Tbody>
                  <Tfoot></Tfoot>
                </Table>
            
          </TableContainer>
              
                
   </>
  );
};

export default TrackOrder;

export const TableRow = ({ order }) => {
  return <></>;
};


