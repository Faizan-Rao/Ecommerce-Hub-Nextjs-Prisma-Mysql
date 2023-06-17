import { addToCart } from "@/services/LocalSlices/CartLocalSlice";
import {
  useGetProductDetailQuery,
  useUserFeedbackMutation,
} from "@/services/userApiSlice";
import { Button } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { BsStarFill } from "react-icons/bs";
import {motion} from "framer-motion"
const Detail = () => {
  const prodId = useRouter().query.prodId;
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const user = useSelector((state) => state.user.data);
  const { data, isLoading, isUninitialized } = useGetProductDetailQuery(prodId);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [Feedback, setFeedback] = useState(0);
  const [userFeedBack] = useUserFeedbackMutation();
  const toast = useToast();

  const onSubmitFeedBack = async () => {
    const feedbackBody = {
      customer_id: user.customer_id,
      product_id: data?.data[0]?.product_id,
      feedback_rating: Feedback,
    };
    try {
      const payload = await userFeedBack(feedbackBody).unwrap();
     
      toast({
        title: `Thanks for Your Feedback`,
        status: "success",
        isClosable: true,
        position: "top",
        duration: 4000,
      });
    } catch (err) {
      console.log("Error");
      toast({
        title: `You have already given the Feedback`,
        status: "info",
        isClosable: true,
        position: "top",
        duration: 4000,
      });
    }
  };
  return (
    <motion.div
    initial={{ scale: 0 }}
    whileInView={{ scale: 1 }}
    viewport={{ once: true }}
    transition={{duration:0.5}}>
      {isLoading ? (
        <p>Loading</p>
      ) : isUninitialized ? (
        <p>UnIntialized</p>
      ) : (
        <section className="text-gray-600 body-font overflow-hidden">
          <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              {/* Product Image */}
              <Image
                alt="ecommerce"
                className=" lg:w-1/2 w-full lg:h-auto overfolow-hidden h-24  object-cover object-center rounded-lg"
                src={
                  "/images/" + data?.data[0]?.product_image }
                width={300}
                height={150}
                
              />
              {/* Product Brand and Name */}
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                  PRODUCT NAME
                </h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                  {data?.data[0]?.product_title || "0"}
                </h1>
                {/* Product Reviews */}
                <div>
                  ({parseInt(data?.data[0]?.avg_rating) || "0"}) Total-Review{" "}
                  <BsStarFill className="text-yellow-500 inline-block" />
                </div>
                <p className="leading-relaxed my-6">
                  {data?.data[0]?.product_desc} <br />
                </p>

                <p className="font-semibold text-md py-4">
                  Product Warranty : {data?.data[0]?.product_warranty} <br />
                </p>
                {/* Product Price and Add To Cart */}
                <div className="flex justify-between items-center ">
                  <span className="title-font font-medium text-2xl text-gray-900">
                    ${data?.data[0]?.product_price}.00
                  </span>
                  <button
                    onClick={() => dispatch(addToCart(data?.data[0]))}
                    className="flex ml-auto text-white bg-[#38a169] border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded"
                  >
                    Add to Cart
                  </button>
                  {isLoggedIn && (
                    <Button
                      variant="ghost"
                      colorScheme="green"
                      onClick={onOpen}
                    >
                      Give Review
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      {/* Give Feedback Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="flex items-center gap-3">
            {" "}
            Feedback <BsStarFill className="text-yellow-500 inline-block" />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody className="flex items-center gap-5 flex-col">
            <p>Please Give Feedback About the Product</p>
            <select
              name="feedBack"
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Give Feedback"
              className="p-5 outline-none font-semibold"
              id="feedback"
            >
              <option>-- Select an Option </option>
              <option value={1}>Worst </option>
              <option value={2}>Normal</option>
              <option value={3}>Good</option>
              <option value={4}>Better</option>
              <option value={5}>Best</option>
            </select>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={onSubmitFeedBack}
              colorScheme="green"
              mr={3}
              onClickCapture={onClose}
            >
              Feedback
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </motion.div>
  );
};

export default Detail;
