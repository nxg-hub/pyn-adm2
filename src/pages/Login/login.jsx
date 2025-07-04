import { ErrorMessage, Field, Form, Formik } from 'formik';
import { LoginSchema } from './schema';
import { useState, useEffect } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchAdmin } from '../../redux/LoggedInAdminSlice';
import backgroundImage from "../../assets/vector.png";
import dashboardImage from "../../assets/dashboard.png";
import payinaLogo from "../../assets/payina.png";
import blueCircleImage from "../../assets/bluecircle.png";
import yellowCircle from "../../assets/yellowcircle.png";
import eclipse93 from "../../assets/eclipse93.png";
import eclipse92 from "../../assets/eclipse92.png";
import yellowstripe from "../../assets/yellowstripe.png";
import apiService from '../../services/apiService';

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (values) => {
    setIsLoading(true);
    setErrorMessage('');

    
    localStorage.setItem('email', values.email);

    try {
      const result = await apiService.login(values.email, values.password);

      const token = result?.data.token;
      const role = result?.data.role;

        if (token) {
          localStorage.setItem('token', token);
          localStorage.setItem('adminRole', role);

          dispatch(fetchAdmin(values.email));
          navigate("/dashboard");
        
      } else {
        const message = result.message;
        setErrorMessage(`Failed to log in: ${message}`);
      }
    } catch (error) {
      setErrorMessage(`Error logging in: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };
    
    useEffect(() => {       
      localStorage.getItem("adminRole")
    }
  ,);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
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

      <div className="flex w-full max-w-6xl relative z-10">
        {/* Left side with images - hidden on mobile and small screens */}
        <div className="hidden md:flex w-1/2 h-[600px] bg-black border border-black items-center justify-center relative overflow-hidden">
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
        <div className="w-full md:w-1/2 h-[600px] bg-[#161616] border border-black md:border-l-0 flex items-center justify-center relative p-6 md:p-6">
          <div className="w-full max-w-md">
            <h1 className="text-[#006181] text-center mb-6 md:mb-8 font-semibold text-2xl md:text-3xl xl:text-4xl">
              Payina Back Office
            </h1>
            <div className="text-white text-center font-semibold text-lg md:text-xl mb-6">
              Hi Admin, Please login to your Dashboard
            </div>

            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={LoginSchema}
              onSubmit={handleSubmit}
            >
              {() => (
                <Form className="space-y-4">
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

                  {errorMessage && (
                    <div className="text-red-500 text-sm bg-red-50 border border-red-200 rounded p-2">
                      {errorMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full text-base flex justify-center items-center rounded-md bg-[#006181] px-6 py-2 font-semibold text-white hover:bg-opacity-80 transition disabled:opacity-50"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Logging in...' : 'Login'}
                  </button>

                  <div className="pt-2 text-right">
                    <Link 
                      to="/forgot-password" 
                      className="text-white font-semibold text-md hover:text-[#006181] transition"
                    >
                      Forgot password?
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

export default LoginForm;