// // app/auth/page.tsx
// "use client"
// // app/auth/page.tsx
// import React, { useState } from 'react';
// import { useAuth } from '../providers/NextAuthProvider';
// import SignInForm from './components/SignIn';
// import SignUpForm from './components/SignUp';
// import AuthProviders from "../components/AuthProviders";

// const AuthPage = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const { session, loading } = useAuth();

//   // Debug logs
//   console.log('Loading:', loading);
//   console.log('Session:', session);

//   const toggleForm = () => setIsLogin(!isLogin);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (session?.user) {
//     return (
//       <div>
//         Signed in as {session.user.email} <br />
//         <button onClick={session.logout}>Sign out</button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             {isLogin ? "Sign in to your account" : "Create your account"}
//           </h2>
//         </div>
//         {isLogin ? <SignInForm /> : <SignUpForm />}
//         <AuthProviders />
//         <div className="mt-6 text-center">
//           <button 
//             type="button" 
//             className="font-medium text-indigo-600 hover:text-indigo-500"
//             onClick={toggleForm}
//           >
//             {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuthPage;
