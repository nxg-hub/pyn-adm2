import { ErrorMessage, Field, Form, Formik } from 'formik';
import { CompleteRegSchema } from './schema/complete-reg-schema';
import { useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';

const CompleteRegForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = async (values) => {
    setIsLoading(true);


    const requestData = {
      firstName: values.firstName,
      lastName: values.lastName,
      password: values.password,
      confirmPassword: values.confirmPassword,
      phoneNumber: values.phoneNumber,
    };
    setErrorMessage('');

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token'); // Gets the token from url
  
    if (!token) {
      setErrorMessage('Invalid or missing token.');
      setIsLoading(false);
      return;
    }
  
    // Append token to the API URL
    const url = `${import.meta.env.VITE_COMPLETE_REG}?token=${token}`;
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });


    const result = await response.json();

    if (response.ok) {
      navigate("/login")
    } else {
      setErrorMessage(result.debugMessage || 'An error occurred during registration.');
    }
  } catch (error) {
    console.error('Error completing registration:', error);
    setErrorMessage(`Error: ${error.message}`);
} finally {
  setIsLoading(false);
}
};


  return (
    <div className="md:w-[40%] mx-10 md:mx-auto md:py-10">
      <div className="text-center text-[#006181]  mt-3 xl:mt-0 font-bold xl:text-4xl text-2xl py-5">
        Complete your registration 
      </div>
      <div className="bg-black flex flex-col justify-center items-start mx-auto py-6">
        <Formik 
          initialValues={{ firstName: '', lastName: '' , password: '', confirmPassword: '', phoneNumber: '' }}
          validationSchema={CompleteRegSchema}
          onSubmit={handleSubmit}>
          {() => (
            <Form className="w-full space-y-4">
              <div className="xl:py-16 p-4 pt-[2.2rem] xl:p-10 xl:pl-[5rem] xl:pr-40 xl:w-auto w-full m-auto xl:space-y-8 space-y-4 pb-2 xl:pb-6">
                
                <div className="xl:w-[120%] flex flex-col space-y-2">
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
                <div className="xl:w-[120%] flex flex-col space-y-2">
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
                <div className="xl:w-[120%] flex flex-col space-y-2">
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
                <div className="xl:w-[120%] flex flex-col space-y-2 relative">
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
                    <BsEye onClick={handleShowPassword} className="absolute top-10 right-1" />
                  ) : (
                    <BsEyeSlash onClick={handleShowPassword} className="absolute top-10 right-1" />
                  )}
                
                  </div>
                  
                  <div className="xl:w-[120%] flex flex-col space-y-2 relative">
                  <label htmlFor="password2" className="text-sm font-normal text-[#006181]">
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
                

                {errorMessage && <div className="text-[#db3a3a]">{errorMessage}</div>}
                <button
                  type="submit"
                  className="w-full mt-4 md:mt-6 text-base md:text-lg flex justify-center items-center rounded-md bg-[#006181] px-6 py-3 font-bold text-black hover:bg- transition disabled:opacity-50"
                  disabled={isLoading}>
                  {isLoading ? 'Loading...' : 'Sign Up'}
                </button>
              </div>
              
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CompleteRegForm;