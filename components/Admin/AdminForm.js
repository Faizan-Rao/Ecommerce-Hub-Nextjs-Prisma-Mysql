
import React from "react";
import { useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useUpdateAdminMutation } from "@/services/adminApiSlice";


const AdminForm = ({}) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const admin = useSelector((state) => state.admin.data);
  const toast = useToast();
  const [updateAdmin] = useUpdateAdminMutation()
  const onSubmit = async (data) => {
    
      if (data.confirmPassword !== data.admin_password) {
          return toast({
              title: `Mismatched Passwords`,
              status: "warning",
              isClosable: true,
              position: "top",
              duration: 4000,
            });
        }
        const regData = {
          admin_login: data.admin_login || "",
          admin_password: data.admin_password || "",
          admin_name : data.admin_name || ""
        }
    try {
     
     const payload = await updateAdmin(regData).unwrap()
      toast({
        title: `Updation Successfull`,
        status: "success",
        isClosable: true,
        position: "top",
        duration: 4000,
      });
      reset()
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
      <h1 className="text-4xl font-semibold text-[#3ba33b]">Update Profile</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-8 justify-center "
      >
        <input
          type="text"
          placeholder="Enter Your Name"
          className="outline-none text-md p-2  border-2 rounded-lg"
          {...register(`admin_name`)}
        />
        {errors.admin_name && <span>This field is required</span>}
        <input
          type="email"
          placeholder="Enter Your Email"
          className="outline-none text-md p-2  border-2 rounded-lg"
          value={admin.admin_login}
          readOnly
          {...register(`admin_login`)}
        />
        {errors.admin_login && <span>This field is required</span>}
        <input
          type="password"
          placeholder="Enter Your Password"
          className="outline-none text-md p-2  border-2 rounded-lg"
          {...register(`admin_password`)}
        />
        {errors.admin_password && <span>This field is required</span>}
        <input
          type="password"
          placeholder="Enter confirm Password"
          className="outline-none text-md p-2  border-2 rounded-lg"
          {...register(`confirmPassword`)}
        />
        {errors.password && <span>This field is required</span>}
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

export default AdminForm;
