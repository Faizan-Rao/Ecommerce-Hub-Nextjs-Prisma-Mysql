import {
  useScreateCategoryMutation,
  useSdeleteCategoryMutation,
  useSgetCategoryQuery,
  useSupdateCategoryMutation,
} from "@/services/sadminApiSlice";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
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

import { useGetCustomersQuery} from "@/services/adminApiSlice";
import {motion} from "framer-motion"
const Stores = () => {
  
  const { data, isLoading } = useGetCustomersQuery();
  
  return (
    <>
      <div className="flex flex-col  justify-center  gap-8 m-5">
        <h1 className="text-4xl self-start text-[#3ba33b] font-semibold">
          Customers
        </h1>
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }} className="flex justify-center gap-1 flex-wrap  ">
          <TableContainer>
            <Table size="sm">
              <Thead className="bg-gray-200" >
                <Tr>
                  <Th >#</Th>
                  <Th>Customer-name</Th>
                  <Th>Customer-login</Th>
                 
                  

                  
                </Tr>
              </Thead>
              <Tbody bgColor={"white"}>
                {!isLoading &&
                  data.map((e, i) => {
                    return (
                      <Tr key={i + 1}>
                        {/* # */}
                        <Td  >{i + 1}</Td>
                        {/* Admin-Name */}
                        <Td w={'80'} className="text-gray-500 text-lg font-semibold">
                          {e.customer_name}
                        </Td>
                        {/* Admin-login  */}
                        <Td w={'80'} className="text-gray-500 text-lg font-semibold">
                          {e.customer_login}
                        </Td>
                      </Tr>
                    );
                  })}
              </Tbody>
              <Tfoot bgColor={"white"} textAlign={"center"} >
                <Th fontSize={"xl"} h={"1.5"} >
                  Total Customers = {data?.length}
                </Th>
  
                <Th colSpan={5} textAlign={'right'} p={'3'}>
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
                  
              </Tfoot>
            </Table>
          </TableContainer>
         
          
         
        </motion.div>
      </div>
    </>
  );
};

export default Stores;
