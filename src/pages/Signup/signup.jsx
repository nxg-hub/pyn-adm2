import { ErrorMessage, Field, Form, Formik } from 'formik';
import logo from '../../../assets/images/logo.png'
import { SignUpSchema } from '../schema/schema';
import { useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // const dispatch = useDispatch();
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = async (values) => {
    setIsLoading(true);
    // dispatch(showLoading()); // Show Loader


    const requestData = {
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      password: values.password,
      confirmPassword: values.confirmPassword,
      phoneNumber: values.phoneNumber,
      userType: "SUPER_ADMIN"
    };
    setErrorMessage('');

    const url = `${import.meta.env.VITE_REGISTER_SUPER_ADMIN_ENDPOINT}?secretKey=${import.meta.env.VITE_API_KEY}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });


    const result = await response.json();

if (result.debugMessage === "User already exists") {
    setErrorMessage(`Failed to sign up: ${result.debugMessage}`);
  } else if (response.ok) {
    navigate("/");
  } else {
    const debugMessage = result.debugMessage || "An error occurred";
    setErrorMessage(`Failed to sign in: ${debugMessage}`);
  }
} catch (error) {
  setErrorMessage(`Error signing up: ${error.message}`);
} finally {
  setIsLoading(false);
}
};


  return (
   <div className="min-h-screen flex flex-col md:flex-row bg-white">
           <div className="md:hidden flex justify-center py-6">
             <img src={logo} alt="Company Logo" className="h-10"/>
           </div>
   
           <div
               className="hidden md:block md:w-1/2 relative bg-cover bg-no-repeat bg-center"
               style={{
                 backgroundImage: "url(src/assets/images/background.png)"
               }}
           >
             <div className="absolute inset-0 flex items-center justify-center">
               <img src={logo} alt="Company Logo" className="max-w-xs" />
             </div>
           </div>
   
           <div className="w-full md:w-1/2 flex flex-col justify-center p-6 md:p-8">
             <div className="max-w-md w-full mx-auto">
            
      </div>
      {/* <div className="hidden md:block absolute md:top-[-13.6rem] md:right-[1rem] xl:top-[-12.5rem] xl:right-[-38.5rem]">
        <img src={logo} alt="" />
      </div> */}
      <div className="bg-white flex flex-col justify-center items-start mx-auto py-6">
  <Formik
    initialValues={{
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
    }}
    validationSchema={SignUpSchema}
    onSubmit={handleSubmit}>
    {() => (
      <Form className="w-full space-y-4">
         <h1 className="text-[#006181]  font-bold text-2xl md:text-3xl xl:text-4xl">
             Sign Up As An Admin
             </h1>
        <div className="xl:py-16 p-4 pt-[2.2rem] xl:p-10 xl:w-auto w-full m-auto xl:space-y-8 space-y-4 pb-2 xl:pb-6">
       
          {/* Grid Layout for Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:w-[120%]">

            {/* Email */}
            <div className="flex flex-col space-y-2">
              
              <label htmlFor="email" className="text-sm font-normal text-[#006181]">
                Email Address
              </label>
              <Field
                name="email"
                type="email"
                placeholder="Enter Email Address"
                className="w-full h-[3.4rem] border border-[#9ca3af] outline-none font-light text-base text-gray rounded-[5px] py-2 px-[10px]"
              />
              <ErrorMessage name="email" component="span" className="text-[#db3a3a]" />
            </div>

            {/* First Name */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="firstName" className="text-sm font-normal text-[#006181]">
                First Name
              </label>
              <Field
                name="firstName"
                type="text"
                placeholder="Enter First Name"
                className="w-full h-[3.4rem] border border-[#9ca3af] outline-none font-light text-base text-gray rounded-[5px] py-2 px-[10px]"
              />
              <ErrorMessage name="firstName" component="span" className="text-[#db3a3a]" />
            </div>

            {/* Last Name */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="lastName" className="text-sm font-normal text-[#006181]">
                Last Name
              </label>
              <Field
                name="lastName"
                type="text"
                placeholder="Enter Last Name"
                className="w-full h-[3.4rem] border border-[#9ca3af] outline-none font-light text-base text-gray rounded-[5px] py-2 px-[10px]"
              />
              <ErrorMessage name="lastName" component="span" className="text-[#db3a3a]" />
            </div>

            {/* Phone Number */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="phoneNumber" className="text-sm font-normal text-[#006181]">
                Phone Number
              </label>
              <Field
                name="phoneNumber"
                type="text"
                placeholder="Enter Phone Number"
                className="w-full h-[3.4rem] border border-[#9ca3af] outline-none font-light text-base text-gray rounded-[5px] py-2 px-[10px]"
              />
              <ErrorMessage name="phoneNumber" component="span" className="text-[#db3a3a]" />
            </div>

            {/* Password */}
            <div className="flex flex-col space-y-2 relative">
              <label htmlFor="password" className="text-sm font-normal text-[#006181]">
                Password
              </label>
              <Field
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter Password"
                className="w-full h-[3.4rem] border border-[#9ca3af] outline-none font-light text-base text-gray rounded-[5px] py-2 px-[10px]"
              />
              <ErrorMessage name="password" component="span" className="text-[#db3a3a]" />
              {showPassword ? (
                <BsEye onClick={handleShowPassword} className="absolute top-10 right-3 cursor-pointer" />
              ) : (
                <BsEyeSlash onClick={handleShowPassword} className="absolute top-10 right-3 cursor-pointer" />
              )}
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col space-y-2 relative">
              <label htmlFor="confirmPassword" className="text-sm font-normal text-[#006181]">
                Confirm Password
              </label>
              <Field
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                placeholder="Re-enter Password"
                className="w-full h-[3.4rem] border border-[#9ca3af] outline-none font-light text-base text-gray rounded-[5px] py-2 px-[10px]"
              />
              <ErrorMessage name="confirmPassword" component="span" className="text-[#db3a3a]" />
            </div>

          </div> {/* End of Grid */}

          {errorMessage && <div className="text-[#db3a3a]">{errorMessage}</div>}

          {/* Submit Button */}
          <button
            type="submit"
            className="text-[#006181] mt-5 xl:text-2xl text-2xl flex justify-center items-center rounded-md bg-yellow-400 px-6 py-3 font-bold xl:w-[120%] mx-auto w-full !mb-12 xl:my-12 xl:mb-20 hover:cursor-pointer transition"
            disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Sign Up'}
          </button>
        </div>
      </Form>
    )}
  </Formik>
</div>

    </div>
    </div>
    
  );
};

export default SignUpForm;
