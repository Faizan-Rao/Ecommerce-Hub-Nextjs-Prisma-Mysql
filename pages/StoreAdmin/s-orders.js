import {
  useGetFilteredOrderMutation,
  useSgetDispatchOrderQuery,
  useSgetRevenueQuery,
} from "@/services/sadminApiSlice";
import React, { useState } from "react";
import {
  Input,
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
import { motion } from "framer-motion";
const Sorders = () => {
  const store_id = useSelector((state) => state.user.store.store_id);
  const { data, isLoading } = useSgetDispatchOrderQuery(store_id);
  const { data: revenue } = useSgetRevenueQuery({ store_id });
  const [dateFilter, setDateFilter] = useState({
    minDate : "",
    maxDate : new Date().toISOString().split('T')[0]
  });
  const [filterOrder] = useGetFilteredOrderMutation();
  const [filterData, setFilterData] = useState();
  const [filteredRevenue, setFilteredRevenue] = useState(0);
  const onChangeHandlerDate = (e) => {
    setDateFilter({ ...dateFilter, [e.target.name]: e.target.value });
  };
  const onSubmitDate = async () => {
    const dataPayload = {
      minDate: dateFilter.minDate,
      maxDate: dateFilter.maxDate,
      store_id,
    };
    console.log(dataPayload)
    const payload = await filterOrder(dataPayload).unwrap();
    if (payload) setFilterData(payload);
    let revenue = payload.reduce(
      (pre, e) => {
        pre += e.purchase_amount;
        return pre;
      },
      0
    );
    setFilteredRevenue(revenue)
  };
  const clearSearch = () => {
    setFilterData(null);
    document.getElementById("maxDate").value = "";
    document.getElementById("minDate").value = "";
  };
  return (
    <>
      <div className="flex flex-col  justify-center  gap-8 mx-20 my-5">
        <h1 className="text-3xl self-start px-5 py-3 bg-green-500 my-5 rounded-full text-white font-bold shadow-lg">
          Dispatched List
        </h1>
        <div className="flex  justify-center items-center flex-wrap gap-9 my-8">
          <label htmlFor="minDate">Min-Date</label>
          <Input
            size={"md"}
            onChange={onChangeHandlerDate}
            w={"60"}
            bg={"white"}
            type="date"
            name="minDate"
            id="minDate"
          />
          <label htmlFor="maxDate">Max-Date</label>
          <Input
            size={"md"}
            onChange={onChangeHandlerDate}
            w={"60"}
            bg={"white"}
            type="date"
            name="maxDate"
            id="maxDate"
          />
          <div className="flex gap-2">
            <Button
              colorScheme="green"
              variant={"solid"}
              onClick={onSubmitDate}
            >
              Filter
            </Button>
            <Button colorScheme="green" variant={"solid"} onClick={clearSearch}>
              Clear
            </Button>
          </div>
        </div>
        {/* all Orders  */}
        {!filterData && (
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex justify-center gap-1 flex-wrap  "
          >
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
        )}
        {/* filtered Orders */}
        {filterData && (
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex justify-center gap-1 flex-wrap  "
          >
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
                    filterData?.map((e, i) => {
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
                  <Th fontSize={"xl"}> = ${filteredRevenue}</Th>
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
        )}
      </div>
    </>
  );
};

export default Sorders;
