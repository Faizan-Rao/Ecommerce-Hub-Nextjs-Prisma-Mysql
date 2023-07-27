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
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import TrackOrder from "@/components/StoreAdmin/TrackOrder";
import {
  useCreateStoreMutation,
  useSgetCategoryQuery,
  useSgetOrdersQuery,
  useSgetRevenueQuery,
} from "@/services/sadminApiSlice";
import { setStore } from "@/services/LocalSlices/UserLocalSlice";
import { motion } from "framer-motion";
const StoreAdmin = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const store_id = useSelector((state) => state.user.store.store_id);
  const { data: revenue } = useSgetRevenueQuery({ store_id });
  const { data: orders } = useSgetOrdersQuery({ store_id });
  const { data: categories } = useSgetCategoryQuery(store_id);

  const store = useSelector((state) => state.user.store);

  return (
    <div>
      {store.store_id && (
        <div
          className=" flex justify-center items-center flex-col  gap-5 mx-20 my-5"
        >
          <h1 className="text-3xl self-start px-5 py-3 bg-green-500 my-5 rounded-full text-white font-bold shadow-lg">
            Dashboard
          </h1>
          {/* Data ICONS */}
          <motion.div
          initial={{ opacity: 0}}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }} className="flex justify-center items-center  gap-8 flex-wrap my-5">
            <div className="text-2xl aspect-square font-bold  bg-white shadow-lg text-green-600 min-h-[200px] rounded-xl  px-9 flex justify-center items-center flex-col">
              <BsFillBasketFill className="text-2xl" />{" "}
              <span className="aspect-[7/4] text-center font-semibold p-4 rounded-full ">
                {orders?.orders.length || 0}
              </span>{" "}
              <span>Orders</span>
            </div>
            <div className="text-2xl aspect-square font-bold  bg-white shadow-lg   text-green-600 min-h-[200px] rounded-xl  px-9 flex justify-center items-center flex-col">
              <p className="text-2xl" >Rs.</p>
              <span className="  aspect-[7/4] text-center  font-semibold p-4 rounded-full ">
                {revenue?.revenue || 0}
              </span>{" "}
              <span>Revenue</span>
            </div>

            <div className="text-2xl aspect-square font-bold  bg-white shadow-lg text-green-600 min-h-[200px] rounded-xl  px-9 flex justify-center items-center flex-col">
              <BiCategory className="text-2xl" />
              <span className="  aspect-[7/4] text-center  font-semibold p-4 rounded-full ">
                {categories?.length || 0}
              </span>{" "}
              <span>Categories</span>
            </div>
          </motion.div>
        </div>
      )}
      {/* Store and Profile */}
      {!store.store_id && (
        <motion.div
           initial={{ opacity: 0}}
        whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col shadow-lg p-5 justify-center items-center gap-8 mx-20 my-5 bg-white rounded-full"
        >
          <h1 className="text-3xl  px-5 py-3 bg-green-500 my-5 rounded-full text-white font-bold shadow-lg">Your Store</h1>
          <p>You dont have a Store Yet Create One </p>
          <div className="flex  justify-center items-center gap-8 flex-wrap m-5">
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
          <StoreCheckoutForm
            isOpen={isOpen}
            onClose={onClose}
            onOpen={onOpen}
          />
        </motion.div>
      )}
      {store.store_id && (
        <div
          className=" justify-center items-center flex flex-col gap-8 mx-20 my-5 "
        >
          <h1 className="text-3xl self-start px-5 py-3 bg-green-500 my-5 rounded-full text-white font-bold shadow-lg">
            Your Orders
          </h1>
          <motion.div
           initial={{ opacity: 0}}
           whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}>
          <TrackOrder />

          </motion.div>
        </div>
      )}
    </div>
  );
};

export default StoreAdmin;

export const StoreCheckoutForm = ({ isOpen, onOpen, onClose }) => {
  const {
    register: register,
    handleSubmit: handleSubmit,
    reset: reset,
    formState: { errors: errors },
  } = useForm();
  // User Data
  const user = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  const [createStore] = useCreateStoreMutation();
  const onSubmit = async (data) => {
    try {
      const storeData = {
        customerData: user,
        b_card: data.b_card,
        b_cardNo: data.b_cardNo,
        store_name: data.s_name,
      };
      const payload = await createStore(storeData).unwrap();
      dispatch(setStore(payload));
      reset();
    } catch (e) {
      console.log(e.message);
    }
  };
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
