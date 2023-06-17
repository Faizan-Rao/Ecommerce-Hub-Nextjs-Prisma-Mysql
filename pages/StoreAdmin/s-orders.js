import {
  useSgetDispatchOrderQuery,
  useSgetRevenueQuery,
} from "@/services/sadminApiSlice";
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
  Button,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import {motion} from "framer-motion"
const Sorders = () => {
  const store_id = useSelector((state) => state.user.store.store_id);
  const { data, isLoading } = useSgetDispatchOrderQuery(store_id);
  const { data: revenue } = useSgetRevenueQuery({ store_id });
  return (
    <>
      <div className="flex flex-col  justify-center  gap-8 m-5">
        <h1 className="text-4xl self-start text-[#3ba33b] font-semibold">
          Dispatched List
        </h1>
        <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }} className="flex justify-center gap-1 flex-wrap  ">
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
                  <Th colSpan={3}>Bill-ID</Th>
                  
                  
                </Tr>
              </Thead>
              <Tbody bgColor={"white"}>
                {!isLoading &&
                  data.map((e, i) => {
                    return (
                      <Tr key={i + 1}>
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
                        <Td></Td>
                      </Tr>
                    );
                  })}
              </Tbody>
              <Tfoot bgColor={"white"} textAlign={"center"}>
                <Th fontSize={"xl"} h={"1.5"}>
                  Total Revenue
                </Th>
                <Th fontSize={"xl"}> = ${revenue?.revenue}</Th>
                <Th>
                    <Button
                      variant={"solid"}
                      colorScheme="blackAlpha"
                      size={"sm"}
                      className=" bg-gray-400 hover:bg-gray-600  text-white py-2 px-2  ml-3 rounded  font-semibold text-[16px]"
                      onClickCapture={() => window.print()}
                    >
                      {" "}
                      Generate Report
                    </Button>
                  </Th>
                  <Th colSpan={6}>
                    <Button
                      variant={"solid"}
                      colorScheme="blackAlpha"
                      size={"sm"}
                      className=" bg-gray-400 hover:bg-gray-600  text-white py-2 px-2  ml-3 rounded  font-semibold text-[16px]"
                      
                    >
                      {" "}
                      Clear ALL
                    </Button>
                  </Th>
              </Tfoot>
            </Table>
          </TableContainer>
        </motion.div>
      
      </div>
    </>
  );
};

export default Sorders;
