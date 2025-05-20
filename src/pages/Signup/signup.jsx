import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { SignUpSchema } from '../Signup/schema';

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

    const url = `${import.meta.env.VITE_REGISTER_SUPER_ADMIN_ENDPOINT}?secretKey=${import.meta.env.VITE_API_KEY}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();

      if (result.debugMessage === "User already exists") {
        setErrorMessage(`Failed to sign up: ${result.debugMessage}`);
      } else if (response.ok) {
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
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-black text-white p-6 rounded-lg border border-gray-700 shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Create Account</h1>
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
            <Form className="space-y-5">
              {/* First Name */}
              <div>
                <label className="block text-sm mb-1">First Name</label>
                <Field
                  name="firstName"
                  type="text"
                  placeholder="Enter First Name"
                  className="w-full px-4 py-2 border border-gray-600 bg-black text-white placeholder-gray-400 rounded-md"
                />
                <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm" />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm mb-1">Last Name</label>
                <Field
                  name="lastName"
                  type="text"
                  placeholder="Enter Last Name"
                  className="w-full px-4 py-2 border border-gray-600 bg-black text-white placeholder-gray-400 rounded-md"
                />
                <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm" />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm mb-1">Email Address</label>
                <Field
                  name="email"
                  type="email"
                  placeholder="Enter Email Address"
                  className="w-full px-4 py-2 border border-gray-600 bg-black text-white placeholder-gray-400 rounded-md"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm mb-1">Phone Number</label>
                <Field
                  name="phoneNumber"
                  type="tel"
                  placeholder="Enter Phone Number"
                  className="w-full px-4 py-2 border border-gray-600 bg-black text-white placeholder-gray-400 rounded-md"
                />
                <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-sm" />
              </div>

              {/* Password */}
              <div className="relative">
                <label className="block text-sm mb-1">Password</label>
                <Field
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter Password"
                  className="w-full px-4 py-2 border border-gray-600 bg-black text-white placeholder-gray-400 rounded-md"
                />
                <div className="absolute right-3 top-9 cursor-pointer">
                  {showPassword ? (
                    <BsEye onClick={handleShowPassword} className="text-gray-500" />
                  ) : (
                    <BsEyeSlash onClick={handleShowPassword} className="text-gray-500" />
                  )}
                </div>
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm mb-1">Confirm Password</label>
                <Field
                  name="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  className="w-full px-4 py-2 border border-gray-600 bg-black text-white placeholder-gray-400 rounded-md"
                />
                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
              </div>

              {/* Error Message */}
              {errorMessage && <div className="text-red-500 text-sm">{errorMessage}</div>}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-white text-black font-bold py-2 px-4 rounded-md hover:bg-gray-200 transition"
              >
                {isLoading ? 'Creating Account...' : 'Sign Up'}
              </button>

              {/* Login Redirect */}
              <div className="text-center text-sm mt-4 text-gray-400">
                Already have an account?{' '}
                <Link to="/login" className="underline hover:text-white">
                  Log in
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUpForm;
