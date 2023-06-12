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
  Button
} from "@chakra-ui/react";

const Scategory = () => {
  const { data, isLoading } = useSgetDispatchOrderQuery();
  return (
    <>
      <div className="flex flex-col  justify-center  gap-8 m-5">
        <h1 className="text-4xl self-start text-[#3ba33b] font-semibold">
          Category List
        </h1>
        <div className="flex justify-center gap-1 flex-wrap  ">
          <TableContainer>
            <Table size="sm">
              <Thead className="bg-gray-200">
                <Tr>
                  <Th>Category#</Th>
                  <Th>Category-Title</Th>
                  
                  
                  <Th isNumeric>
                    <Button
                    size={'sm'}
                      variant={'solid'} colorScheme="blackAlpha"
                      onClickCapture={() => onDispatchOrder(e.purchase_id)}
                    >
                      {" "}
                      Create New
                    </Button>
                  </Th>
                </Tr>
              </Thead>
              <Tbody bgColor={"white"}>
                {!isLoading &&
                  data.map((e, i) => {
                    return (
                      <Tr  key={i + 1}>
                        {/* Items# */}
                        <Td>{i + 1}</Td>
                        {/* Order Title */}
                        <Td className="text-gray-500 text-lg font-semibold">
                          {e.purchase_title}
                        </Td>
                        {/* Order Quantity  */}
                        
                        <Td className=" font-semibold" w={"96"} isNumeric>
                          <Button size={'sm'} variant={'solid'} colorScheme="green">
                             Update
                          </Button>
                          <Button ml={2} size={'sm'} variant={'ghost'} colorScheme="red">
                            Delete 
                          </Button>
                        </Td>
                        
                        
                        
                      </Tr>
                    );
                  })}
              </Tbody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
};

export default Scategory;
