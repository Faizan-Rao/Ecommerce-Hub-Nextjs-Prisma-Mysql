import Link from "next/link";
import React from "react";


const LoginForm = ({ email, password, role, register, handleSubmit, errors }) => {
  
    const onSubmit = (data) => {
        switch(role)
        {
            case 'user':
                console.log("user")
                break
            case 'storeAdmin':
                console.log("storeAdmin")
                break
            case 'admin':
                console.log("admin")
                break
        }
        console.log(data)
    }
  return (
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
        <div className="flex items-center">
          <input
            type="submit"
            className="mr-3 py-1 px-3 bg-gray-200 rounded cursor-pointer hover:text-[#3ba33b]"
            value={"Login"}
          />
          <Link
            href={"#"}
            className="mr-3 py-1 px-3  rounded cursor-pointer hover:text-[#3ba33b]"
          >
            Signup
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
