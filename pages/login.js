import LoginForm from '@/components/LoginForm'
import React from 'react'
import { useForm } from 'react-hook-form';

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();


  return (
    <div className='flex justify-center items-center'>
      <LoginForm email={'userEmail'} role={'user'} password={'userPassword'} register={register} handleSubmit={handleSubmit} errors={errors} reset={reset} />
    </div>
  )
}

export default Login