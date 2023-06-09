import { useUserLoginMutation } from "@/services/userApiSlice";
import Link from "next/link";
import React from "react";
import { useToast } from '@chakra-ui/react'
import { useDispatch } from "react-redux";
import { setUser } from "@/services/LocalSlices/UserLocalSlice";

const LoginForm = ({
  email,
  password,
  role,
  register,
  handleSubmit,
  errors,
  reset
}) => {

  const dispatch = useDispatch();
  const [UserLogin] = useUserLoginMutation();
  const toast = useToast()

  const onUserLoginCall = async (data) => {
    try
    {
      
      const response = await UserLogin(data).unwrap()
      toast({
        title: `You Have Been Logged in Sucessfull`,
        status: 'success',
        isClosable: true,
        position: 'top',
        duration: 4000,
      })
      dispatch(setUser(response.data))
      reset()
    }
    catch(e)
    {
      toast({
        title: `Invalid Credentials`,
        status: 'error',
        isClosable: true,
        position: 'top',
        duration: 4000,
      })
      
    }
  };

  const onSubmit = (data) => {
    switch (role) {
      case "user":
        onUserLoginCall(data)
        break;
      case "storeAdmin":
        console.log("storeAdmin");
        break;
      case "admin":
        console.log("admin");
        break;
    }
  };

  return (
    // Login Form
    <div className="flex justify-center flex-col gap-8 bg-gray-100 shadow-lg my-10  items-center min-h-[400px] p-20 rounded-lg">
      <h1 className="text-4xl font-semibold text-[#3ba33b]">Login</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-8 justify-center "
      >
        <input
          type="email"
          placeholder="Enter Your Email"
          className="outline-none text-md p-2  border-2 rounded-lg"
          {...register(`${email}`)}
        />
        {errors.email && <span>This field is required</span>}
        <input
          type="password"
          placeholder="Enter Your Password"
          className="outline-none text-md p-2  border-2 rounded-lg"
          {...register(`${password}`, { required: true })}
        />
        {errors.password && <span>This field is required</span>}
        <div className="flex items-center justify-center">
          <input
            type="submit"
            className="mr-3 py-1 px-3 bg-gray-200 rounded cursor-pointer hover:text-[#3ba33b]"
            value={"Login"}
          />
          
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
