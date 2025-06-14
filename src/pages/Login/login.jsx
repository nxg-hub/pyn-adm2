import { ErrorMessage, Field, Form, Formik } from 'formik';
import apiService from '../../services/apiService';
import { LoginSchema } from './schema';
import { useState, useEffect } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchAdmin } from '../../redux/LoggedInAdminSlice';

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
      <div className="min-h-screen flex flex-col md:flex-row bg-black">
       
       

        <div className="w-full  flex flex-col justify-center p-6 md:p-8">
          <div className="max-w-md w-full mx-auto">
            <div className="text-center mb-8 md:mb-10">
              <h1 className="text-[#006181] font-bold text-2xl md:text-3xl xl:text-4xl">
                Login to Admin
              </h1>
            </div>

            <div className="bg-black rounded-lg shadow-sm">
              <Formik
                  initialValues={{ email: '', password: '' }}
                  validationSchema={LoginSchema}
                  onSubmit={handleSubmit}
              >
                {() => (
                    <Form className="w-full space-y-4 md:space-y-6 p-4 md:p-6">
                      <div className="text-[#006181] text-start font-bold text-xl md:text-2xl">
                        Login
                      </div>

                      <div className="flex flex-col space-y-2">
                        <label htmlFor="email" className="text-sm font-normal text-[#006181]">
                          Email Address
                        </label>
                        <Field
                            name="email"
                            type="email"
                            placeholder="Enter Email Address"
                            className="w-full h-12 border border-gray-300 outline-none font-light text-base rounded px-3"
                        />
                        <ErrorMessage name="email" component="span" className="text-red-500 text-sm" />
                      </div>

                      <div className="flex flex-col space-y-2 relative">
                        <label htmlFor="password" className="text-sm font-normal text-[#006181]">
                          Password
                        </label>
                        <Field
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter Password"
                            className="w-full h-12 border border-gray-300 outline-none font-light text-base rounded px-3"
                        />
                        <div className="absolute right-3 top-10 cursor-pointer">
                          {showPassword ? (
                              <BsEye onClick={handleShowPassword} className="text-gray-500" />
                          ) : (
                              <BsEyeSlash onClick={handleShowPassword} className="text-gray-500" />
                          )}
                        </div>
                        <ErrorMessage name="password" component="span" className="text-red-500 text-sm" />
                      </div>

                      <div className="pt-1 md:pt-2">
                        <Link to="/forgot-password" className="text-[#006181] underline font-semibold text-sm">
                          Forgot password?
                        </Link>
                      </div>

                      {errorMessage && <div className="text-red-500">{errorMessage}</div>}

                      <button
                          type="submit"
                          className="w-full mt-4 md:mt-6 text-base md:text-lg flex justify-center items-center rounded-md bg-[#006181] px-6 py-3 font-bold text-black hover:bg- transition disabled:opacity-50"
                          disabled={isLoading}
                      >
                        {isLoading ? 'Logging in...' : 'Log in'}
                      </button>
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