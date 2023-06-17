import { useUserSignupMutation } from "@/services/userApiSlice";
import Link from "next/link";
import React from "react";
import { useToast } from '@chakra-ui/react'

const SignUpForm = ({
  email,
  password,
  role,
  register,
  handleSubmit,
  errors,
  reset,
  name
}) => {

  
 
  const toast = useToast()
  const[UserSignup] = useUserSignupMutation()
  const onUserSignUpCall = async (data) => {
    try
    {
        if(data.confirmPassword !== data.userPassword)
        {
           return toast({
                title: `Mismatched Passwords`,
                status: 'warning',
                isClosable: true,
                position: 'top',
                duration: 4000,
              })
        }

      const response = await UserSignup(data).unwrap()
      
      toast({
        title: `You Have Been Signup Sucessfully`,
        status: 'success',
        isClosable: true,
        position: 'top',
        duration: 4000,
      })
      reset()
    }
    catch(e)
    {
      toast({
        title: `User Already Exist `,
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
        onUserSignUpCall(data)
        break;
      case "storeAdmin":
        
        break;
      case "admin":
     
        break;
    }
  };

  return (
    // Login Form
    <div className="flex justify-center flex-col gap-8 bg-gray-100 shadow-lg my-10  items-center min-h-[400px] p-20 rounded-lg">
      <h1 className="text-4xl font-semibold text-[#3ba33b]">Signup</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-8 justify-center "
      >
        <input
          type="text"
          placeholder="Enter Your Name"
          className="outline-none text-md p-2  border-2 rounded-lg"
          {...register(`${name}`, { required: true })}
        />
        {errors.email && <span>This field is required</span>}
        <input
          type="email"
          placeholder="Enter Your Email"
          className="outline-none text-md p-2  border-2 rounded-lg"
          {...register(`${email}`,{ required: true })}
        />
        {errors.email && <span>This field is required</span>}
        <input
          type="password"
          placeholder="Enter Your Password"
          className="outline-none text-md p-2  border-2 rounded-lg"
          {...register(`${password}`, { required: true })}
        />
        {errors.password && <span>This field is required</span>}
        <input
          type="password"
          placeholder="Enter confirm Password"
          className="outline-none text-md p-2  border-2 rounded-lg"
          {...register(`confirmPassword`, { required: true })}
        />
        {errors.password && <span>This field is required</span>}
        <div className="flex items-center justify-center">
          <input
            type="submit"
            className="mr-3 py-1 px-3 bg-gray-200 rounded cursor-pointer hover:text-[#3ba33b]"
            value={"Signup"}
          />
          
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
