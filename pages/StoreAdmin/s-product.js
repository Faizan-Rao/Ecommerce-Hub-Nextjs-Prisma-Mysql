import {
  useScreateProductMutation,
  useSdeleteProductMutation,
  useSgetCategoryQuery,
  useSgetDispatchOrderQuery,
  useSgetProductQuery,
  useSgetSubcategoryQuery,
  useSupdateProductMutation,
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
import Image from "next/image";

const Sproduct = () => {
  const id = useRouter().query.s_id;
  const { data, isLoading } = useSgetProductQuery(id);
  const [PID, setPID] = useState(0);
  const store_id = useSelector(state => state.user.store.store_id)
  const toast = useToast()
  // image uploading states
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  // Mutation API
  const [createProduct] = useScreateProductMutation()
  const [updateProduct] = useSupdateProductMutation()
  const [deleteProduct] = useSdeleteProductMutation()
  // Upload File handler
  // handler
  const onFileUploadChange = (e) => {
    const fileInput = e.target;

    if (!fileInput.files) {
      alert("No file was chosen");
      return;
    }

    if (!fileInput.files || fileInput.files.length === 0) {
      alert("Files list is empty");
      return;
    }

    const file = fileInput.files[0];

    /** File validation */
    if (!file.type.startsWith("image")) {
      alert("Please select a valide image");
      return;
    }

    setFile(file);
    setPreviewUrl(URL.createObjectURL(file));

    /** Reset file input */
    e.currentTarget.type = "text";
    e.currentTarget.type = "file";
  };

  const onCancelFile = (e) => {
    e.preventDefault();
    if (!previewUrl && !file) {
      return;
    }
    setFile(null);
    setPreviewUrl(null);
  };

  const onUploadFile = async (e) => {
    const formData = new FormData();
    formData.append("image", file);
    console.log(file);
    try
    {

      let response = await fetch("/api/upload", { method: "POST", body:formData })
       let filedata = await response.json();
      return filedata
    }
    catch(err)
    {
      console.log(err.message)
    }
      
    
  };

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
    return [form1, form2];
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
  console.log(errors1);

  // Create Subcategory Function
  const onCreateProduct = async (data) => {
    try {
      
     let file =  await onUploadFile();
        
      const pData = {
        product_title: data.product_title,
        product_desc: data.product_desc,
        product_price: data.product_price,
        product_warranty: data.product_warranty,
        product_stock_status: data.product_stock_status,
        product_image: file.data.image.newFilename ,
        subcategory_id: id,
        store_id 
      };
      const payload = await createProduct(pData).unwrap()
      toast({
        title: `Product Creation Sucessfull`,
        status: 'success',
        isClosable: true,
        position: 'top',
        duration: 4000,
      })
      
      reset1();
    } catch (err) {
      console.log(err.message);
      toast({
        title: `Product Creation Failed`,
        status: 'error',
        isClosable: true,
        position: 'top',
        duration: 4000,
      })
    }
  };
  // Update Subcategory Function
  const onUpdateP = async (data) => {
    try {
      
      let file =  await onUploadFile();
         
       const pData = {
         product_title: data.product_title || "",
         product_desc: data.product_desc || "",
         product_price: data.product_price || null,
         product_warranty: data.product_warranty || "",
         product_stock_status: data.product_stock_status || null,
         product_image: file?.data?.image?.newFilename || "" ,
         product_id : PID
       };
       const payload = await updateProduct(pData).unwrap()
       toast({
         title: `Product Updation Sucessfull`,
         status: 'success',
         isClosable: true,
         position: 'top',
         duration: 4000,
       })
      
       reset2();
     } catch (err) {
       console.log(err.message);
       toast({
         title: `Product Updation Failed`,
         status: 'error',
         isClosable: true,
         position: 'top',
         duration: 4000,
       })
     }
  };
  const onDeleteP = async () => {
    try {
      
      
       const payload = await deleteProduct({product_id: PID}).unwrap()
       toast({
         title: `Product Deletion Sucessfull`,
         status: 'success',
         isClosable: true,
         position: 'top',
         duration: 4000,
       })
      
       reset2();
     } catch (err) {
       console.log(err.message);
       toast({
         title: `Product Deletion Failed`,
         status: 'error',
         isClosable: true,
         position: 'top',
         duration: 4000,
       })
     }
  };
  return (
    <>
      <div className="flex flex-col  justify-center  gap-8 m-5">
        <h1 className="text-4xl self-start text-[#3ba33b] font-semibold">
          Product List
        </h1>
        <div className="flex justify-center gap-1 flex-wrap  ">
          {/* Subcategory Table */}
          <TableContainer>
            <Table size="sm">
              <Thead className="bg-gray-200">
                <Tr>
                  <Th>product#</Th>
                  <Th>product-image</Th>
                  <Th>product-Title</Th>
                  <Th>product-desc</Th>
                  <Th>product-price</Th>
                  <Th>product-stock</Th>
                  <Th>product-warranty</Th>

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
                        <Td isNumeric>{i + 1}</Td>

                        <Td className="text-gray-500 text-lg font-semibold">
                          <Image
                            src={`/images/${e.product_image}`}
                            alt="Green double couch with wooden legs"
                            borderRadius="lg"
                            width={150}
                            height={150}
                            className="rounded-xl aspect-square object-cover"
                          />
                        </Td>
                        <Td className="text-gray-500 text-lg font-semibold">
                          {e.product_title}
                        </Td>
                        <Td
                          wordBreak={"break-word"}
                          className="text-gray-500 text-lg font-semibold"
                          
                        >
                          <textarea
                          value={e.product_desc}
                          className="p-2 outline-none border-2 line-clamp-3"
                          rows={6}
                          readOnly
                          />
                         
                        </Td>
                        <Td
                          w={"1"}
                          textAlign={"center"}
                          className="text-gray-500 text-lg font-semibold"
                        >
                          ${e.product_price}
                        </Td>
                        <Td
                          w={"1"}
                          textAlign={"center"}
                          className="text-gray-500 text-lg font-semibold"
                        >
                          {e.product_stock_status}
                        </Td>
                        <Td
                          w={"1"}
                          textAlign={"center"}
                          className="text-gray-500 text-lg font-semibold"
                        >
                          {e.product_warranty}
                        </Td>

                        <Td className=" font-semibold" isNumeric>
                          <Button
                            size={"sm"}
                            variant={"solid"}
                            colorScheme="green"
                            onClick={onOpen2}
                            onClickCapture={() => setPID(e.product_id)}
                          >
                            Update
                          </Button>
                          <Button
                            ml={2}
                            size={"sm"}
                            variant={"solid"}
                            colorScheme="red"
                            onClick={onOpen3}
                            onClickCapture={() => setPID(e.product_id)}
                          >
                            Delete
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
              <ModalHeader>Create product</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <form
                  className="flex justify-center items-center gap-8 flex-col m-4"
                  onSubmit={handleSubmit1(onCreateProduct)}
                >
                  <input
                    type="text"
                    className="border-2 p-1 outline-none rounded-lg w-80"
                    placeholder="Enter Title"
                    {...register1("product_title", {
                      required: true,
                      min: 4,
                    })}
                  />
                  {errors1.product_title && <span>This field is required</span>}
                  <textarea
                    className="border-2 p-1 outline-none rounded-lg w-80 "
                    placeholder="Enter product description"
                    {...register1("product_desc", {
                      required: true,
                      min: 4,
                    })}
                  />
                  {errors1.product_desc && <span>This field is required</span>}
                  <input
                    type="number"
                    className="border-2 p-1 outline-none rounded-lg w-80 "
                    placeholder="product price"
                    {...register1("product_price", {
                      required: true,
                    })}
                  />
                  {errors1.product_price && <span>This field is required</span>}
                  <input
                    type="text"
                    className="border-2 p-1 outline-none rounded-lg w-80 "
                    placeholder="Enter warranty"
                    {...register1("product_warranty", {
                      required: true,
                    })}
                  />
                  {errors1.product_warranty && (
                    <span>This field is required</span>
                  )}
                  <input
                    type="number"
                    className="border-2 p-1 outline-none rounded-lg w-80 "
                    placeholder="product stock"
                    {...register1("product_stock_status", {
                      required: true,
                    })}
                  />
                  {errors1.product_stock && <span>This field is required</span>}
                  {/* Image Preview Modal and File Uploader */}

                 {
                  previewUrl && <div>
                    <Image
                    src={previewUrl}
                    height={200}
                    width={200}
                    alt="preview"
                    />
                  </div>
                 }

                  <input
                    type="file"
                    name= "file"
                    className="border-2 p-1 outline-none rounded-lg w-80"
                    onChange={onFileUploadChange}
                  />
                  <input
                    type="text"
                    className="border-2 p-1 outline-none rounded-lg w-80"
                    value={"null"}
                    hidden
                    {...register1("product_image")}
                  />
                  <div className="flex gap-5">
                  <Button
                    type="submit"
                    variant={"solid"}
                    colorScheme="blackAlpha"
                    onClick={onClose1}
                  >
                    Create New
                  </Button>
                  <Button
                    type="button"
                    variant={"solid"}
                    colorScheme="blackAlpha"
                    onClick={onCancelFile}
                  >
                    Cancel File
                  </Button>

                  </div>
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
                  onSubmit={handleSubmit2(onUpdateP)}
                >
                  <input
                    type="text"
                    className="border-2 p-1 outline-none rounded-lg w-80"
                    placeholder="Enter Title"
                    {...register2("product_title", {
                      
                      min: 4,
                    })}
                  />
                  {errors2.product_title && <span>This field is required</span>}
                  <textarea
                    className="border-2 p-1 outline-none rounded-lg w-80 "
                    placeholder="Enter product description"
                    {...register2("product_desc", {
                     
                      min: 4,
                    })}
                  />
                  {errors2.product_desc && <span>This field is required</span>}
                  <input
                    type="number"
                    className="border-2 p-1 outline-none rounded-lg w-80 "
                    placeholder="product price"
                    {...register2("product_price",)}
                  />
                  {errors2.product_price && <span>This field is required</span>}
                  <input
                    type="text"
                    className="border-2 p-1 outline-none rounded-lg w-80 "
                    placeholder="Enter warranty"
                    {...register2("product_price")}
                  />
                  {errors2.product_title && <span>This field is required</span>}
                  <input
                    type="number"
                    className="border-2 p-1 outline-none rounded-lg w-80 "
                    placeholder="product stock"
                    {...register2("product_stock_status")}
                  />
                  {errors2.product_stock_status && (
                    <span>This field is required</span>
                  )}
                  {
                  previewUrl && <div>
                    <Image
                    src={previewUrl}
                    height={200}
                    width={200}
                    alt="preview"
                    />
                  </div>
                 }

                  <input
                    type="file"
                    name= "file"
                    className="border-2 p-1 outline-none rounded-lg w-80"
                    onChange={onFileUploadChange}
                  />
                  <input
                    type="text"
                    className="border-2 p-1 outline-none rounded-lg w-80"
                    value={"null"}
                    hidden
                    {...register2("product_image")}
                  />
                  <div className="flex gap-5">
                  <Button
                    type="submit"
                    variant={"solid"}
                    colorScheme="green"
                    onClick={onClose1}
                  >
                    Update
                  </Button>
                  <Button
                    type="button"
                    variant={"solid"}
                    colorScheme="blackAlpha"
                    onClick={onCancelFile}
                  >
                    Cancel File
                  </Button>

                  </div>
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
                  Do you want to delete Subcategory? <br /> <b>NOTE</b> <br />{" "}
                  This May also delete products.
                </p>
              </ModalBody>

              <ModalFooter>
                <Button onClick={onClose3} onClickCapture={onDeleteP} colorScheme="red" mr={3}>
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

export default Sproduct;
