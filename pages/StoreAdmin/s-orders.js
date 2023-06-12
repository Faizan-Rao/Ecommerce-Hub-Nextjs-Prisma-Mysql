import { useSgetDispatchOrderQuery } from "@/services/sadminApiSlice";
import React from "react";
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
} from "@chakra-ui/react";

const Sorders = () => {
  const { data, isLoading } = useSgetDispatchOrderQuery();
  return (
    <>
      <div className="flex flex-col  justify-center  gap-8 m-5">
        <h1 className="text-4xl self-start text-[#3ba33b] font-semibold">
          Dispatched List
        </h1>
        <div className="flex justify-center gap-1 flex-wrap  ">
      
        <TableContainer>
          <Table size="sm">
            <Thead className="bg-gray-200">
                    <Tr>
                      <Th>Order#</Th>
                      <Th>Order-Title</Th>
                      <Th>Order-Quantity</Th>
                      <Th>Order-Status</Th>
                      <Th>Order-Date</Th>
                      <Th>Total-Price</Th>
                      <Th>Bill-ID</Th>
                      <Th>
                      <button
                          className=" bg-gray-400 hover:bg-gray-600  text-white py-2 px-2  ml-3 rounded  font-semibold text-[16px]"
                         
                          onClickCapture={() => onDispatchOrder(e.purchase_id)}
                        >
                          {" "}
                          Clear ALL
                        </button>
                      </Th>
                    </Tr>
                  </Thead>
            <Tbody bgColor={'white'}>
           {!isLoading && data.map((e, i) => {
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
                      <Td></Td>
                    </Tr> )})}
             
            </Tbody>
            
          </Table>
        </TableContainer>
        
        </div>
      </div>
    </>
  );
};

export default Sorders;
