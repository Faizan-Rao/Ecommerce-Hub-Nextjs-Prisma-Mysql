import React from "react";
import { BsCurrencyDollar, BsFillBasketFill } from "react-icons/bs";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { FaProductHunt } from "react-icons/fa";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import {useForm} from "react-hook-form"

const StoreAdmin = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <div className="flex flex-col  justify-center items-center gap-8 m-5">
        <h1 className="text-4xl self-start text-[#3ba33b] font-semibold">
          Dashboard
        </h1>
        {/* Data ICONS */}
        <div className="flex justify-center items-center gap-8 flex-wrap m-5">
          <div className="text-2xl font-bold bg-white gap-5 text-[#3ba33b] min-h-[200px] rounded-xl shadow-lg px-9 flex justify-center items-center flex-col">
            <BsFillBasketFill /> <span>Orders</span>
          </div>
          <div className="text-2xl font-bold bg-white gap-5 text-[#3ba33b] min-h-[200px] rounded-xl shadow-lg px-9 flex justify-center items-center flex-col">
            <BsCurrencyDollar /> <span>Revenue</span>
          </div>
          <div className="text-2xl font-bold bg-white gap-5 text-[#3ba33b] min-h-[200px] rounded-xl shadow-lg px-9 flex justify-center items-center flex-col">
            <FaProductHunt /> <span>Products</span>
          </div>
          <div className="text-2xl font-bold bg-white gap-5 text-[#3ba33b] min-h-[200px] rounded-xl shadow-lg px-9 flex justify-center items-center flex-col">
            <BiCategory /> <span>Categories</span>
          </div>
        </div>
      </div>
      {/* Store and Profile */}
      <div className="flex flex-col  justify-center items-center gap-8 m-5">
        <h1 className="text-4xl self-start text-[#3ba33b] font-semibold">
          Your Store
        </h1>
        <div className="flex justify-center items-center gap-8 flex-wrap m-5">
          <Button
            onClick={onOpen}
            variant={"solid"}
            className="flex justify-center items-center gap-2"
            colorScheme={"green"}
          >
            <AiOutlinePlusCircle className="text-xl font-semibold" />
            <span>Create Store</span>
          </Button>
        </div>
        <StoreCheckoutForm isOpen={isOpen} onClose={onClose} onOpen={onOpen}/>
      </div>
    </>
  );
};

export default StoreAdmin;

export const StoreCheckoutForm = ({isOpen, onOpen, onClose}) => {

  const  {
    register  : register,
    handleSubmit : handleSubmit,
    reset: reset,
    formState: { errors : errors },
  } = useForm()

  const onSubmit = ()=>{
    console.log("SUBMITTED")
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Store Checkout</ModalHeader>
        <ModalCloseButton />
        <ModalBody p={8}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-8 justify-center "
          >
            <select
              type="text"
              className="outline-none text-md p-2  border-2 rounded-lg"
              {...register(`b_card`, { required: true })}
            >
              <option value="">---Select Card---</option>
              <option value="Master">Master</option>
              <option value="Visa">Visa</option>
              <option value="EasyPay">EasyPay</option>
              <option value="WesternUnion">WesternUnion</option>
            </select>
            {errors.email && <span>This field is required</span>}
            <input
              type="text"
              placeholder="Enter Your Account#"
              className="outline-none text-md p-2  border-2 rounded-lg"
              {...register(`b_cardNo`, { required: true })}
            />
            {errors.password && <span>This field is required</span>}
            <input
              type="text"
              placeholder="Enter Your Store Name"
              className="outline-none text-md p-2  border-2 rounded-lg"
              {...register(`s_name`, { required: true })}
            />
            {errors.password && <span>This field is required</span>}
            <div className="flex items-center justify-center">
              <input
                type="submit"
                className="mr-3 py-1 px-3 bg-gray-200 rounded cursor-pointer hover:text-[#3ba33b]"
                value={"Checkout"}
                onClick={onClose}
              />
            </div>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
