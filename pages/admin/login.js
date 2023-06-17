import LoginForm from "@/components/LoginForm";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
const AdminLogin = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
const isLoggedIn = useSelector(state => state.admin.isLoggedIn)
const router = useRouter()
useEffect(()=>{
  if(isLoggedIn)
  {
    router.replace('main')
  }

},[])
   

  

  return (
    <div className="min-h-[100vh] flex justify-center items-center">
      <LoginForm
        role={"admin"}
        email={"admin_login"}
        password={"admin_password"}
        register={register}
        handleSubmit={handleSubmit}
        reset={reset}
        errors={errors}
      />
    </div>
  );
};

export default AdminLogin;
