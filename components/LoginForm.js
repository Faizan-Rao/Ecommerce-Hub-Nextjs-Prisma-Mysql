import { useUserLoginMutation } from "@/services/userApiSlice";
import Link from "next/link";
import React from "react";
import { useToast } from '@chakra-ui/react'
import { useDispatch } from "react-redux";
import { setStore, setUser } from "@/services/LocalSlices/UserLocalSlice";
import { useGetStoreMutation } from "@/services/sadminApiSlice";
import { useGetAdminMutation } from "@/services/adminApiSlice";
import { setAdmin } from "@/services/LocalSlices/AdminLocalSlice";
import { useRouter } from "next/router";

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
  const [GetStore] = useGetStoreMutation();
  const toast = useToast()
  const [AdminLogin] = useGetAdminMutation();
  const router = useRouter()
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
      const customer_login = response.data.customer_login
      const store = await GetStore({customer_login }).unwrap()
      dispatch(setStore(store))
      dispatch(setUser(response.data))
      reset()
      router.replace('/')
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

  const onAdminLoginCall = async (data) => {
    try
    {
      
      const response = await AdminLogin(data).unwrap()
      toast({
        title: `You Have Been Logged in Sucessfully`,
        status: 'success',
        isClosable: true,
        position: 'top',
        duration: 4000,
      })
  
      dispatch(setAdmin(response))
      router.replace('main')
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
        onAdminLoginCall(data)
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
