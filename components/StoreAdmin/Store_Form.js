import { useUserSignupMutation } from "@/services/userApiSlice";
import Link from "next/link";
import React from "react";
import { useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useUpdateStoreMutation } from "@/services/sadminApiSlice";
const StoreForm = ({}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [updateStore] = useUpdateStoreMutation()
  const toast = useToast();
  const store = useSelector(state => state.user.store)
  const onSubmit = async (data) => {
    let regData = {
        store_id : store.store_id,
        store_name : data.store_name
    }
    try {
      
        const payload = await updateStore(regData).unwrap()
        console.log(payload)
      toast({
        title: `Updation Successful`,
        status: "success",
        isClosable: true,
        position: "top",
        duration: 4000,
      });
    } catch (e) {
      toast({
        title: `Updation Failed `,
        status: "error",
        isClosable: true,
        position: "top",
        duration: 4000,
      });
    }
  };

  return (
    // Login Form
    <div className="flex justify-center flex-col gap-10 bg-gray-100 shadow-lg my-10  items-center min-h-[400px] p-20 rounded-lg">
      <h1 className="text-4xl font-semibold text-[#3ba33b]">Update Store</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-8 justify-center "
      >
         <input
          type="text"
          
          className="outline-none text-md p-2  border-2 rounded-lg"
         value={store.store_name}
          onChange={()=>""}
         
        />
        {errors.customer_name && <span>This field is required</span>}
        <input
          type="text"
          placeholder="Update Your Store Name "
          className="outline-none text-md p-2  border-2 rounded-lg"
         
          
          {...register(`store_name`, { required: true })}
        />
        {errors.customer_name && <span>This field is required</span>}
        
        <div className="flex items-center justify-center">
          <input
            type="submit"
            className="mr-3 py-1 px-3 bg-gray-200 rounded cursor-pointer hover:text-[#3ba33b]"
            value={"Update"}
          />
        </div>
      </form>
    </div>
  );
};

export default StoreForm;
