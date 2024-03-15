/** @format */

// /** @format */
// "use client";

// import { ChangeEvent, FormEvent, useEffect, useState } from "react";
// import { AiFillGithub } from "react-icons/ai";
// import { FcGoogle } from "react-icons/fc";
// import { signUp } from "next-auth-sanity/client";
// import { signIn, useSession } from "next-auth/react";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";

// const defaultFormData = {
//   email: "",
//   name: "",
//   password: "",
// };

// const Auth = () => {
//   const [formData, setFormData] = useState(defaultFormData);

//   const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const { data: session } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     if (session) router.push("/");
//   }, [router, session]);

//   const loginHandler = async () => {
//     try {
//       await signIn();
//       router.push("/");
//     } catch (error) {
//       // console.log(error);
//       toast.error("Something went wrong");
//     }
//   };

//   const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     try {
//       const user = await signUp(formData);
//       if (user) {
//         toast.success("Success. Please sign in");
//       }
//     } catch (error) {
//       // console.log(error);
//       toast.error("Something went wrong");
//     } finally {
//       setFormData(defaultFormData);
//     }
//   };

//   return (
//     <>
//       <div className='min-h-screen bg-gray-100 text-gray-900 flex justify-center'>
//         <div className='max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
//           <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
//             <div className='mt-12 flex flex-col items-center'>
//               <h1 className='text-2xl xl:text-3xl font-bold text-[#F89500]'>
//                 Sign up
//               </h1>
//               <div className='w-full flex-1 mt-6'>
//                 <div className='flex flex-col md:flex-row items-center gap-4'>
//                   <button
//                     className='w-full max-w-xs shadow-lg rounded-lg p-2 bg-indigo-100 text-gray-800 flex items-center justify-center gap-2'
//                     onClick={loginHandler}
//                   >
//                     <AiFillGithub className='text-2xl' />
//                     <span className='text-xs'>Login with Google</span>
//                   </button>

//                   <button
//                     className='w-full max-w-xs shadow-lg rounded-lg p-2 bg-indigo-100 text-gray-800 flex items-center justify-center gap-2'
//                     onClick={loginHandler}
//                   >
//                     <FcGoogle className='text-2xl' />
//                     <span className='text-xs'>Login with GitHub</span>
//                   </button>
//                 </div>

//                 <div className='my-12 border-b text-center'>
//                   <div className='leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2'>
//                     Or sign up with e-mail
//                   </div>
//                 </div>

//                 <form className='mx-auto max-w-xs' onSubmit={handleSubmit}>
//                   <input
//                     className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
//                     type='name'
//                     placeholder='Name'
//                     name='name'
//                     value={formData.name}
//                     onChange={handleInputChange}
//                   />
//                   <input
//                     className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
//                     type='email'
//                     placeholder='Email'
//                     name='email'
//                     value={formData.email}
//                     onChange={handleInputChange}
//                   />
//                   <input
//                     className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
//                     type='password'
//                     placeholder='Password'
//                     name='password'
//                     required
//                     minLength={6}
//                     value={formData.password}
//                     onChange={handleInputChange}
//                   />
//                   <button className='mt-5 tracking-wide font-semibold bg-[#F89500] hover:bg-[#D17E00] text-gray-100 w-full py-4 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'>
//                     <span className='ml-3'>Sign Up</span>
//                   </button>
//                   <p className='mt-6 text-xs text-gray-600 text-center mb-6'>
//                     Already have an account?{""}{" "}
//                     <button
//                       onClick={loginHandler}
//                       className='border-b border-gray-500 border-dotted'
//                     >
//                       Login
//                     </button>
//                   </p>
//                 </form>
//               </div>
//             </div>
//           </div>
//           <div className='flex-1 bg-indigo-100 text-center hidden lg:flex'>
//             <div className='m-12 xl:m-16 w-full h-full bg-contain bg-center bg-no-repeat'></div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Auth;
