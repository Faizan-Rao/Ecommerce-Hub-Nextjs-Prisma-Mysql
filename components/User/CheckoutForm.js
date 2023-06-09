import React from "react";
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
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useUserProductTranMutation } from "@/services/userApiSlice";

const CheckoutForm = ({
  isOpen,
  onClose,
  type,
  register,
  handleSubmit,
  errors,
  reset,
}) => {
  // State And Hooks
  const [productTransaction] = useUserProductTranMutation();
  const cart = useSelector((state) => state.cart.value);
  const toast = useToast();
  const user = useSelector((state) => state.user.data);
  // Checkout Product Procedure
  const CheckoutProduct = async (data) => {
    // calculate total Price for Each record
    let calculatedArr = cart.map(
      (e) => {
        if (e.product_qty >= 0) {
          return {
            purchase_amount: e.product_qty * e.product_price,
            purchase_quantity: e.product_qty,
            purchase_title: e.product_title,
            product_id: e.product_id,
            purchase_date: new Date(),
            purchase_status: "full-filled",
            purchase_type: "product",
          };
        }
        return {
          purchase_amount:  e.product_price,
          purchase_quantity: e.product_qty,
          purchase_title: e.product_title,
          product_id: e.product_id,
          purchase_date: new Date(),
          purchase_status: "full-filled",
          purchase_type: "product",
        };
      },
    );

    
    try {
      const { customer_id } = user;
      
      // product data
      const regData = {
        cart: calculatedArr,
        b_card: data.b_card,
        b_cardNo: data.b_cardNo,
        customer_id: customer_id,
      };
      const payload = await productTransaction(regData).unwrap();
      toast({
        title: `Transaction Successful!`,
        status: "success",
        isClosable: true,
        position: "top",
        duration: 4000,
      });
      
    } catch (err) {
      toast({
        title: `Transaction Failed!`,
        status: "error",
        isClosable: true,
        position: "top",
        duration: 4000,
      });
    }
  };

  const onSubmit = (data) => {
    switch (type) {
      case "product":
        CheckoutProduct(data);

        break;
      case "store":
        console.log("storeAdmin");
        break;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Checkout</ModalHeader>
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
            <div className="flex items-center justify-center">
              <input
                type="submit"
                className="mr-3 py-1 px-3 bg-gray-200 rounded cursor-pointer hover:text-[#3ba33b]"
                value={"Checkout"}
              />
            </div>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CheckoutForm;
