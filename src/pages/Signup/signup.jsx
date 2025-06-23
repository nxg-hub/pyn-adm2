import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { SignUpSchema } from '../Signup/schema';
import apiService from '../../services/apiService';
import backgroundImage from "../../assets/vector.png";
import dashboardImage from "../../assets/dashboard.png";
import payinaLogo from "../../assets/payina.png";
import blueCircleImage from "../../assets/bluecircle.png";
import yellowCircle from "../../assets/yellowcircle.png";
import eclipse93 from "../../assets/eclipse93.png";
import eclipse92 from "../../assets/eclipse92.png";
import yellowstripe from "../../assets/yellowstripe.png";

const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (values) => {
    setIsLoading(true);
    setErrorMessage('');

    const requestData = {
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      password: values.password,
      confirmPassword: values.confirmPassword,
      phoneNumber: values.phoneNumber,
      userType: "SUPER_ADMIN",
    };

    try {
      const result = await apiService.registerSuperAdmin(requestData);
      
      if (result.debugMessage === "User already exists") {
        setErrorMessage(`Failed to sign up: ${result.debugMessage}`);
      } else if (result.ok) {
        navigate("/login");
      } else {
        const debugMessage = result.debugMessage || "An error occurred";
        setErrorMessage(`Failed to sign up: ${debugMessage}`);
      }
    } catch (error) {
      setErrorMessage(`Error signing up: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen bg-black flex items-center justify-center pt-10 pb-10 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-16 left-14 z-0 pointer-events-none">
        <img src={yellowCircle} className="h-[8.75rem]" alt="decoration" />
      </div>
      <div className="absolute top-[6.25rem] left-0 z-0 pointer-events-none">
        <img src={blueCircleImage} className="h-[7.5rem]" alt="decoration" />
      </div>
      <div className="absolute top-[21.25rem] left-20 z-0 pointer-events-none">
        <img src={eclipse93} className="h-[8.75rem]" alt="decoration" />
      </div>
      <div className="absolute top-[33.75rem] left-10 z-0 pointer-events-none">
        <img src={eclipse92} className="h-[17.5rem]" alt="decoration" />
      </div>
      <div className="absolute top-0 right-0 z-0 pointer-events-none">
        <img src={yellowstripe} className="h-[12.5rem]" alt="decoration" />
      </div>
      <div className="absolute top-[27.5rem] right-10 z-0 pointer-events-none">
        <img src={yellowCircle} className="h-[8.75rem]" alt="decoration" />
      </div>

      <div className="flex w-full max-w-6xl h-full relative z-10">
        {/* Left side with images - hidden on mobile and small screens */}
        <div className="hidden md:flex w-1/2 h-full bg-black border border-black items-center justify-center relative overflow-hidden">
          <div className="absolute top-6 left-6 z-10">
            <img src={payinaLogo} alt="Payina Logo" className="h-8 w-auto" />
          </div>
          <div className="absolute inset-0">
            <img src={backgroundImage} alt="Background" className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <img src={dashboardImage} alt="Dashboard Preview" className="max-w-full max-h-full object-contain" />
          </div>
        </div>

        {/* Right side with form - full width on mobile */}
        <div className="w-full md:w-1/2 h-full bg-[#161616] border border-black md:border-l-0 flex items-center justify-center relative p-6 md:p-6">
          <div className="w-full max-w-md">
            <h1 className="text-[#006181] text-center  md:mb-2 font-semibold text-2xl md:text-3xl xl:text-4xl">
              Payina Back Office
            </h1>
            <div className="text-white text-center font-semibold text-lg md:text-xl mb-2">
              Create Your Admin Account
            </div>

            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
                password: '',
                confirmPassword: '',
              }}
              validationSchema={SignUpSchema}
              onSubmit={handleSubmit}
            >
              {() => (
                <Form className="space-y-">
                  {/* First Name */}
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="firstName" className="text-sm font-normal text-[#006181] text-left">
                      First Name
                    </label>
                    <Field
                      name="firstName"
                      type="text"
                      placeholder="Enter First Name"
                      className="w-full h-10 border border-gray-300 outline-none font-light text-base rounded px-3 text-black"
                    />
                    <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm" />
                  </div>

                  {/* Last Name */}
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="lastName" className="text-sm font-normal text-[#006181] text-left">
                      Last Name
                    </label>
                    <Field
                      name="lastName"
                      type="text"
                      placeholder="Enter Last Name"
                      className="w-full h-10 border border-gray-300 outline-none font-light text-base rounded px-3 text-black"
                    />
                    <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm" />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="email" className="text-sm font-normal text-[#006181] text-left">
                      Email Address
                    </label>
                    <Field
                      name="email"
                      type="email"
                      placeholder="Enter Email Address"
                      className="w-full h-10 border border-gray-300 outline-none font-light text-base rounded px-3 text-black"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                  </div>

                  {/* Phone Number */}
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="phoneNumber" className="text-sm font-normal text-[#006181] text-left">
                      Phone Number
                    </label>
                    <Field
                      name="phoneNumber"
                      type="tel"
                      placeholder="Enter Phone Number"
                      className="w-full h-10 border border-gray-300 outline-none font-light text-base rounded px-3 text-black"
                    />
                    <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-sm" />
                  </div>

                  {/* Password */}
                  <div className="flex flex-col space-y-2 relative">
                    <label htmlFor="password" className="text-sm font-normal text-[#006181] text-left">
                      Password
                    </label>
                    <Field
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter Password"
                      className="w-full h-10 border border-gray-300 outline-none font-light text-base rounded px-3 pr-10 text-black"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-8 cursor-pointer"
                      onClick={handleShowPassword}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? (
                        <BsEye className="text-gray-500" />
                      ) : (
                        <BsEyeSlash className="text-gray-500" />
                      )}
                    </button>
                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                  </div>

                  {/* Confirm Password */}
                  <div className="flex flex-col space-y-2 relative">
                    <label htmlFor="confirmPassword" className="text-sm font-normal text-[#006181] text-left">
                      Confirm Password
                    </label>
                    <Field
                      name="confirmPassword"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Confirm Password"
                      className="w-full h-10 border border-gray-300 outline-none font-light text-base rounded px-3 pr-10 text-black"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-8 cursor-pointer"
                      onClick={handleShowPassword}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? (
                        <BsEye className="text-gray-500" />
                      ) : (
                        <BsEyeSlash className="text-gray-500" />
                      )}
                    </button>
                    <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
                  </div>

                  {/* Error Message */}
                  {errorMessage && (
                    <div className="text-red-500 text-sm bg-red-50 border border-red-200 rounded p-2">
                      {errorMessage}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full text-base flex justify-center items-center rounded-md bg-[#006181] px-6 py-2 font-semibold text-white hover:bg-opacity-80 transition disabled:opacity-50"
                  >
                    {isLoading ? 'Creating Account...' : 'Sign Up'}
                  </button>

                  {/* Login Redirect */}
                  <div className="pt-2 text-right">
                    <Link 
                      to="/" 
                      className="text-white font-semibold text-md hover:text-[#006181] transition"
                    >
                      Already have an account? Log in
                    </Link>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;