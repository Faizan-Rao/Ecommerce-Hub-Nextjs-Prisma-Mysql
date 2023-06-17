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
import Link from "next/link";
import { useSelector } from "react-redux";
import { useGetStoreQuery } from "@/services/adminApiSlice";

const Stores = () => {
  
  const { data, isLoading } = useGetStoreQuery();
  
  return (
    <>
      <div className="flex flex-col  justify-center  gap-8 m-5">
        <h1 className="text-4xl self-start text-[#3ba33b] font-semibold">
          Stores & Admins
        </h1>
        <div className="flex justify-center gap-1 flex-wrap  ">
          <TableContainer>
            <Table size="sm">
              <Thead className="bg-gray-200" >
                <Tr>
                  <Th >#</Th>
                  <Th>Admin-name</Th>
                  <Th>Admin-login</Th>
                  <Th>Admin-role</Th>
                  <Th>Admin-Store</Th>
                  

                  
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
                        <Td w={'40'} className="text-gray-500 text-lg font-semibold">
                          {e.admin_name}
                        </Td>
                        {/* Admin-login  */}
                        <Td w={'80'} className="text-gray-500 text-lg font-semibold">
                          {e.admin_login}
                        </Td>
                       {/* Admin-Role */}
                       <Td w={'40'} className="text-gray-500 text-lg font-semibold">
                          {e.admin_role}
                        </Td>
                        {/* Admin-Store */}
                        <Td w={'40'}  className="text-gray-500 text-lg font-semibold">
                          {e.manages[0]?.stores.store_name}
                        </Td>
                       
                      </Tr>
                    );
                  })}
              </Tbody>
              <Tfoot bgColor={"white"} textAlign={"center"} >
                <Th fontSize={"xl"} h={"1.5"} >
                  Total Stores = {data?.length - 1}
                </Th>
  
                <Th colSpan={5} textAlign={'right'} p={'2'}>
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
         
          
         
        </div>
      </div>
    </>
  );
};

export default Stores;
