import {
  useScreateSubCategoryMutation,
  useSdeleteSubCategoryMutation,
  useSgetCategoryQuery,
  useSgetDispatchOrderQuery,
  useSgetSubcategoryQuery,
  useSupdateSubCategoryMutation,
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
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {motion} from "framer-motion"
const Ssubcategory = () => {
  const id = useRouter().query.c_id;
  const { data, isLoading } = useSgetSubcategoryQuery(id);
  const [sID, setSID] = useState(0);
  const toast = useToast()
  // Mutations Subcategory
  const [createSubcategory] = useScreateSubCategoryMutation()
  const [updateSubcategory] = useSupdateSubCategoryMutation()
  const [deleteSubcategory] = useSdeleteSubCategoryMutation()

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
  const onCreateSUBC = async (data) => {
    try {
      const subcData = {
        category_id: id,
        subcategory_title: data.subcategory_title,
      };
        const payload = await createSubcategory(subcData).unwrap();
      toast({
        title: `Subcategory Creation Sucessfull`,
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
  const onUpdateSUBC = async (data) => {
    try {
      const subcData = {
        subcategory_id: sID,
        subcategory_title: data.subcategory_title || "",
      };

      const payload = await updateSubcategory(subcData).unwrap();
      toast({
        title: `Subcategory Updation Sucessfull`,
        status: "success",
        isClosable: true,
        position: "top",
        duration: 4000,
      });

      reset2();
    } catch (err) {
      console.log(err.message);
      toast({
        title: `Subcategory Updation Failed`,
        status: "error",
        isClosable: true,
        position: "top",
        duration: 4000,
      });
    }
  };
  const onDeleteSUBC = async () => {
    try {
      const subcData = {
        subcategory_id: sID,
      };

      const payload = await deleteSubcategory(subcData).unwrap();
      toast({
        title: `Subcategory Deletion Sucessfull`,
        status: "success",
        isClosable: true,
        position: "top",
        duration: 4000,
      });

      reset2();
    } catch (err) {
      console.log(err.message);
      toast({
        title: `Subcategory Deletion Failed`,
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
          Subcategory List
        </h1>
        <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }} className="flex justify-center gap-1 flex-wrap  ">
          {/* Subcategory Table */}
          <TableContainer>
            <Table size="sm">
              <Thead className="bg-gray-200">
                <Tr>
                  <Th>subcategory#</Th>
                  <Th>subcategory-Title</Th>
                  <Th></Th>
                  <Th isNumeric>
                    <Button
                      size={"sm"}
                      variant={"solid"}
                      colorScheme="blackAlpha"
                      onClick={onOpen1}
                    >
                      Create new
                    </Button>
                  </Th>
                </Tr>
              </Thead>
              <Tbody bgColor={"white"}>
                {!isLoading &&
                  data?.map((e, i) => {
                    return (
                      <Tr key={i + 1}>
                        {/* Items# */}
                        <Td>{i + 1}</Td>
                        {/* Order Title */}
                        <Td className="text-gray-500 text-lg font-semibold">
                          {e.subcategory_title}
                        </Td>
                        {/* Order Quantity  */}

                        <Td className=" font-semibold" w={"96"} isNumeric>
                          <Button
                            size={"sm"}
                            variant={"solid"}
                            colorScheme="green"
                            onClick={onOpen2}
                            onClickCapture={() => setSID(e.subcategory_id)}
                          >
                            Update
                          </Button>
                          <Button
                            ml={2}
                            size={"sm"}
                            variant={"solid"}
                            colorScheme="red"
                            onClick={onOpen3}
                            onClickCapture={() => setSID(e.subcategory_id)}
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
                                pathname: "s-product",
                                query: { s_id: e.subcategory_id },
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
              <ModalHeader>Create Subcategory</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <form
                  className="flex justify-center items-center gap-8 flex-col m-4"
                  onSubmit={handleSubmit1(onCreateSUBC)}
                >
                  <input
                    type="text"
                    className="border-2 p-1 outline-none rounded-lg "
                    placeholder="Enter Subcategory"
                    {...register1("subcategory_title", {
                      required: true,
                      min: 4,
                    })}
                  />
                  {errors1.subcategory_title && (
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
              <ModalHeader>Update Subcategory</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <form
                  className="flex justify-center items-center gap-8 flex-col m-4"
                  onSubmit={handleSubmit2(onUpdateSUBC)}
                >
                  <input
                    type="text"
                    className="border-2 p-1 outline-none rounded-lg "
                    placeholder={`Update Subcategory`}
                    {...register2("subcategory_title", {
                      required: true,
                      min: 4,
                    })}
                  />
                  {errors1.subcategory_title && (
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
                  Do you want to delete Subcategory? 
                </p>
              </ModalBody>

              <ModalFooter>
                <Button onClick={onClose3} onClickCapture={onDeleteSUBC} colorScheme="red" mr={3}>
                  Delete
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </motion.div>
      </div>
    </>
  );
};

export default Ssubcategory;
