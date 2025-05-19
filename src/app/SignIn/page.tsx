"use client";

import Link from "next/link"
import {useForm} from "react-hook-form"
import { UserBody } from "../types/page";
import axios from "axios"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SignIn = (req:Request) => {

  const {register,handleSubmit,formState:{errors}} = useForm<UserBody>()

  const router = useRouter()

  


  const submit = async(data:UserBody) => {
    const res= await axios.post("/api/signin",data,{withCredentials:true})
    console.log(res.data)
   if(res.data.success){
   router.push("/")
   }
  }


    return(
        <>
        <div className="h-screen w-screen flex items-center justify-center">
             <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
    <h2 className="text-2xl font-bold mb-6 text-center">Login To Your Account</h2>
    
    <form action="/signup" method="POST" className="space-y-4" onSubmit={handleSubmit(submit)}>
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input type="text" {...register("userName")}  required className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input type="password" {...register("password")} required className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>

      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">Sign IN</button>
    </form>

    <p className="mt-4 text-sm text-center text-gray-600">
      Don't have an account?
      <Link href="/SignUp" className="text-blue-600 hover:underline">SignUp</Link>
    </p>
  </div>
</div>
        </>
    )
}

export default SignIn