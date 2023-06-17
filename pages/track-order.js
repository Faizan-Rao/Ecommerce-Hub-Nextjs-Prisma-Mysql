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

const TrackOrder = () => {
  // states and Hooks
  const customer_id = useSelector((state) => state.user.data.customer_id);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, isLoading } = useGetOrdersQuery(customer_id);
  const [removeOrder] = useRemoveOrderMutation();
  const [OrderID, setOrderID] = useState(null)
    const toast = useToast()
  return (
    <>
      <div className="m-5 overflow-auto flex flex-col justify-center items-center">
        <h1 className="text-3xl p-5">Track Orders</h1>
        {/* Table For Order Items */}
        <TableContainer>
          {!isLoading &&
            data.map((order, i) => {
              return (
               order.purchase_record.length > 0 && <Table size="sm" className="border-2" key={i}>
                  <Thead className="bg-gray-200">
                    <Tr>
                      <Th>Order#{i + 1}</Th>
                      <Th>Order-Title</Th>
                      <Th>Order-Quantity</Th>
                      <Th>Order-Status</Th>
                      <Th>Order-Date</Th>
                      <Th>Total-Price</Th>
                      <Th isNumeric>
                        <button className=" bg-gray-400 hover:bg-gray-600  text-white py-2 px-2  ml-3 rounded  font-semibold text-[16px]" onClick={onOpen} onClickCapture={()=>setOrderID(order.bill_id)}>
                          {" "}
                          Cancel Order
                        </button>
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody className="bg-white">
                    <TableRow order={order} />
                  </Tbody>
                  <Tfoot></Tfoot>
                </Table>
              );
            })}
        </TableContainer>
      </div>
     <OrderRemovalForm onClose={onClose} onOpen={onOpen} isOpen={isOpen} orderID={OrderID} removeOrder={removeOrder} toast = {toast}/>
    </>
  );
};

export default TrackOrder;

export const TableRow = ({ order }) => {
  return (
    <>
      {order.purchase_record.map((e, i) => (
        <Tr key={i + 1}>
          {/* Items# */}
          <Td>{i + 1}</Td>
          {/* Order Title */}
          <Td className="text-gray-500 text-lg font-semibold">
            {e.purchase_title}
          </Td>
          {/* Order Quantity  */}
          <Td className=" font-semibold" isNumeric >
            {e.purchase_quantity}
          </Td>
          {/* Order Status*/}
          <Td>{e.purchase_status}</Td>
          {/* Order Date */}
          <Td>{e.purchase_date.toString().split("T")[0]}</Td>
          {/* Total Price */}
          <Td isNumeric>
            <span className="text-gray-500">${e.purchase_amount}</span>
          </Td>
          {/* Cancellation Button */}
          <Td></Td>
        </Tr>
      ))}
    </>
  );
};

export const OrderRemovalForm = ({onOpen, onClose,isOpen, orderID, removeOrder, toast}) => {

    const onRemoveOrder = async () =>{
        try
        {
            const payload = await removeOrder({orderID}).unwrap()
            toast({
                title: `Order Cancelled Successfully!`,
                status: "success",
                isClosable: true,
                position: "top",
                duration: 4000,
              });
             
        }
        catch(err)
        {
            toast({
                title: `Order Cancellation failed!`,
                status: "warning",
                isClosable: true,
                position: "top",
                duration: 4000,
              });
        }
    }
  return (
    <>
      

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Order Cancellation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
           <p className="text-lg">Do you want to cancel order?</p>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" variant={'ghost'} mr={3} onClickCapture={onClose} onClick={onRemoveOrder}>
              Cancel Order
            </Button>
            <Button colorScheme="blackAlpha" variant={"ghost"} mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
