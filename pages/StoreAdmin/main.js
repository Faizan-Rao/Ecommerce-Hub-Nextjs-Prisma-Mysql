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
import { useSelector } from "react-redux";
import TrackOrder from "@/components/StoreAdmin/TrackOrder";
import { useSgetOrdersQuery, useSgetRevenueQuery } from "@/services/sadminApiSlice";

const StoreAdmin = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const store_id = useSelector((state) => state.user.store.store_id);
  const { data:revenue } = useSgetRevenueQuery({  store_id });
  const { data:orders, } = useSgetOrdersQuery({  store_id });
  const store = useSelector(state => state.user.store) 
  console.log(orders)
  return (
    <>
      <div className="flex flex-col  justify-center items-center gap-8 m-5">
        <h1 className="text-4xl self-start text-[#3ba33b] font-semibold">
          Dashboard
        </h1>
        {/* Data ICONS */}
        <div className="flex justify-center items-center gap-8 flex-wrap m-5">
          <div className="text-2xl font-bold bg-gray-500 gap-2 text-gray-100 min-h-[200px] rounded-xl shadow-lg px-9 flex justify-center items-center flex-col">
            <BsFillBasketFill /> <span className="bg-slate-200 text-gray-600 font-semibold p-4 rounded-full shadow-md">{orders?.orders.length || 0}</span> <span>Orders</span>
          </div>
          <div className="text-2xl font-bold bg-green-500 gap-2 text-gray-100 min-h-[200px] rounded-xl shadow-lg px-9 flex justify-center items-center flex-col">
            <BsCurrencyDollar /><span className="bg-slate-200 text-gray-600 font-semibold p-4 rounded-full shadow-md">{revenue?.revenue || 0}</span> <span>Revenue</span>
          </div>
          <div className="text-2xl font-bold bg-green-500 gap-2 text-gray-100 min-h-[200px] rounded-xl shadow-lg px-9 flex justify-center items-center flex-col">
            <FaProductHunt /><span className="bg-slate-200 text-gray-600 font-semibold p-4 rounded-full shadow-md">{revenue?.revenue || 0}</span> <span >Products</span>
          </div>
          <div className="text-2xl font-bold bg-green-500 gap-2 text-gray-100 min-h-[200px] rounded-xl shadow-lg px-9 flex justify-center items-center flex-col">
            <BiCategory /><span className="bg-slate-200 text-gray-600 font-semibold p-4 rounded-full shadow-md">{revenue?.revenue || 0}</span> <span>Categories</span>
          </div>
        </div>
      </div>
      {/* Store and Profile */}
      { !store && 
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
      }
      {
        store && <div className="flex flex-col  justify-center items-center gap-8 m-5">
        <h1 className="text-4xl self-start text-[#3ba33b] font-semibold">
          Your Orders
        </h1>
        <TrackOrder/>
        </div>
      }
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
