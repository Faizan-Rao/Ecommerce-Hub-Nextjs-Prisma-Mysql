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
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
const Scategory = () => {
  const id = useSelector((state) => state.user.store.store_id);
  const { data, isLoading } = useSgetCategoryQuery(id);
  const [C_ID, setCID] = useState(0);
  const toast = useToast();
  // Mutation for Category
  const [createCategory] = useScreateCategoryMutation();
  const [updateCategory] = useSupdateCategoryMutation();
  const [deleteCategory] = useSdeleteCategoryMutation();

  // MultiForm Disclosure
  const MultiFormsD = () => {
    const Dform1 = useDisclosure();
    const Dform2 = useDisclosure();
    const Dform3 = useDisclosure();
    return [Dform1, Dform2, Dform3];
  };
  const [
    { onOpen: onOpen1, onClose: onClose1, isOpen: isOpen1 },
    { onOpen: onOpen2, onClose: onClose2, isOpen: isOpen2 },
    { onOpen: onOpen3, onClose: onClose3, isOpen: isOpen3 },
  ] = MultiFormsD();

  // MultiForms
  const MultiForms = () => {
    const form1 = useForm();
    const form2 = useForm();
    const form3 = useForm();
    return [form1, form2, form3];
  };
  const [
    {
      register: register1,
      handleSubmit: handleSubmit1,
      reset: reset1,
      formState: { errors: errors1 },
    },
    {
      register: register2,
      handleSubmit: handleSubmit2,
      reset: reset2,
      formState: { errors: errors2 },
    },
  ] = MultiForms();

  // Create Subcategory Function
  const onCreateC = async (data) => {
    try {
      const pData = {
        category_title: data.category_title,
        store_id: id,
      };
      const payload = await createCategory(pData).unwrap();
      toast({
        title: `Category Creation Sucessfull`,
        status: "success",
        isClosable: true,
        position: "top",
        duration: 4000,
      });

      reset1();
    } catch (err) {
      console.log(err.message);
      toast({
        title: `Category Creation Failed`,
        status: "error",
        isClosable: true,
        position: "top",
        duration: 4000,
      });
    }
  };
  // Update Subcategory Function
  const onUpdateC = async (data) => {
    try {
      const Data = {
        category_title: data.category_title || "",
        category_id: C_ID,
      };
     
      const payload = await updateCategory(Data).unwrap();
      toast({
        title: `Category Updation Sucessfull`,
        status: "success",
        isClosable: true,
        position: "top",
        duration: 4000,
      });

      reset2();
    } catch (err) {
      console.log(err.message);
      toast({
        title: `Category Creation Failed`,
        status: "error",
        isClosable: true,
        position: "top",
        duration: 4000,
      });
    }
  };
  const onDeleteC = async () => {
    try {
      const cData = {
        category_id: C_ID,
      };
      const payload = await deleteCategory(cData).unwrap();
      toast({
        title: `Category Deletion Sucessfull`,
        status: "success",
        isClosable: true,
        position: "top",
        duration: 4000,
      });
    } catch (err) {
      console.log(err.message);
      toast({
        title: `Category Deletion Failed`,
        status: "error",
        isClosable: true,
        position: "top",
        duration: 4000,
      });
    }
  };
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
                  <Th></Th>

                  <Th isNumeric>
                    <Button
                      size={"sm"}
                      variant={"solid"}
                      colorScheme="blackAlpha"
                      onClick={onOpen1}
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
                      <Tr key={i + 1}>
                        {/* Items# */}
                        <Td>{i + 1}</Td>
                        {/* Order Title */}
                        <Td className="text-gray-500 text-lg font-semibold">
                          {e.categories.category_title}
                        </Td>
                        {/* Order Quantity  */}

                        <Td className=" font-semibold" w={"96"} isNumeric>
                          <Button
                            size={"sm"}
                            variant={"solid"}
                            colorScheme="green"
                            onClick={onOpen2}
                            onClickCapture={() => setCID(e.categories.category_id)}
                          >
                            Update
                          </Button>
                          <Button
                            ml={2}
                            size={"sm"}
                            variant={"solid"}
                            colorScheme="red"
                            onClick={onOpen3}
                            onClickCapture={() => setCID(e.categories.category_id)}
                          >
                            Delete
                          </Button>
                        </Td>
                        <Td>
                          <Button
                            ml={2}
                            size={"sm"}
                            variant={"solid"}
                            colorScheme="linkedin"
                          >
                            <Link
                              href={{
                                pathname: "s-subcategory",
                                query: { c_id: e.categories.category_id },
                              }}
                            >
                              {" "}
                              View More{" "}
                            </Link>
                          </Button>
                        </Td>
                      </Tr>
                    );
                  })}
              </Tbody>
            </Table>
          </TableContainer>
          {/* Modal for Creating Sub Category */}
          <Modal isOpen={isOpen1} onClose={onClose1}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Create Category</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <form
                  className="flex justify-center items-center gap-8 flex-col m-4"
                  onSubmit={handleSubmit1(onCreateC)}
                >
                  <input
                    type="text"
                    className="border-2 p-1 outline-none rounded-lg "
                    placeholder="Enter category"
                    {...register1("category_title", {
                      required: true,
                      min: 4,
                    })}
                  />
                  {errors1.category_title && (
                    <span>This field is required</span>
                  )}

                  <Button
                    type="submit"
                    variant={"solid"}
                    colorScheme="blackAlpha"
                    onClick={onClose1}
                  >
                    Create New
                  </Button>
                </form>
              </ModalBody>
            </ModalContent>
          </Modal>
          {/* Modal for Updating Sub category */}
          <Modal isOpen={isOpen2} onClose={onClose2}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Update Category</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <form
                  className="flex justify-center items-center gap-8 flex-col m-4"
                  onSubmit={handleSubmit2(onUpdateC)}
                >
                  <input
                    type="text"
                    className="border-2 p-1 outline-none rounded-lg "
                    placeholder={`Update category`}
                    {...register2("category_title", {
                      min: 4,
                    })}
                  />
                  {errors2.subcategory_title && (
                    <span>This field is required</span>
                  )}

                  <Button
                    type="submit"
                    variant={"solid"}
                    colorScheme="green"
                    onClick={onClose2}
                  >
                    Update
                  </Button>
                </form>
              </ModalBody>
            </ModalContent>
          </Modal>
          {/* Modal for Deleting Sub category */}
          <Modal isOpen={isOpen3} onClose={onClose3}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Delete Subcategory</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <p>
                  Do you want to delete Category? 
                </p>
              </ModalBody>

              <ModalFooter>
                <Button
                  onClick={onClose3}
                  onClickCapture={onDeleteC}
                  colorScheme="red"
                  mr={3}
                >
                  Delete
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default Scategory;
