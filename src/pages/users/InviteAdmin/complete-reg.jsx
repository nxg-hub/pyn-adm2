import { useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import backgroundImage from '../../../assets/vector.png';
import dashboardImage from '../../../assets/dashboard.png';
import payinaLogo from '../../../assets/payina.png';
import blueCircleImage from '../../../assets/bluecircle.png';
import yellowCircle from '../../../assets/yellowcircle.png';
import eclipse93 from '../../../assets/eclipse93.png';
import eclipse92 from '../../../assets/eclipse92.png';
import yellowstripe from '../../../assets/yellowstripe.png';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { CompleteRegSchema } from './schema/complete-reg-schema';
import { useNavigate } from 'react-router-dom';
import apiService from '../../../services/apiService';


const CompleteRegForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (values) => {
    setIsLoading(true);
    setErrorMessage('');

    const requestData = {
      firstName: values.firstName,
      lastName: values.lastName,
      password: values.password,
      confirmPassword: values.confirmPassword,
      phoneNumber: values.phoneNumber,
    };

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token'); // Gets the token from url
  
    try {
      await apiService.completeRegistration(requestData, token);
      navigate("/")
   
  } catch (error) {
    console.error('Error completing registration:', error);
    setErrorMessage(`Error: ${error.message}`);
} finally {
  setIsLoading(false);
}
};


  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Elements */}
      <img src={yellowCircle} className="absolute top-16 left-14 h-36 z-0 pointer-events-none" alt="yellow circle" />
      <img src={blueCircleImage} className="absolute top-24 left-0 h-30 z-0 pointer-events-none" alt="blue circle" />
      <img src={eclipse93} className="absolute top-[21.25rem] left-20 h-36 z-0 pointer-events-none" alt="eclipse 93" />
      <img src={eclipse92} className="absolute top-[33.75rem] left-10 h-70 z-0 pointer-events-none" alt="eclipse 92" />
      <img src={yellowstripe} className="absolute top-0 right-0 h-50 z-0 pointer-events-none" alt="yellow stripe" />
      <img src={yellowCircle} className="absolute top-[27.5rem] right-10 h-36 z-0 pointer-events-none" alt="yellow circle" />

      {/* Main Container */}
      <div className="flex w-full max-w-6xl relative z-10">
        {/* Left Image Side */}
        <div className="hidden md:flex w-1/2 bg-black border border-black relative flex items-center justify-center overflow-hidden">
          <img src={payinaLogo} alt="Payina Logo" className="absolute top-6 left-6 h-8 z-10" />
          <img src={backgroundImage} alt="Background" className="absolute inset-0 object-cover w-full h-full" />
          <img src={dashboardImage} alt="Dashboard" className="absolute inset-0 object-contain max-w-full max-h-full" />
        </div>

        {/* Right Form Side */}
        <div className="w-full md:w-1/2 bg-[#161616] p-6 border border-black border-l-0 flex items-center justify-center relative">
          <div className="w-full max-w-md">
            <h1 className="text-[#006181] text-center  font-semibold text-3xl">
              Complete your registration
            </h1>

            <Formik
              initialValues={{ firstName: '', lastName: '', phoneNumber: '', password: '', confirmPassword: '' }}
              validationSchema={CompleteRegSchema}
              onSubmit={handleSubmit}
            >
              {() => (
                <Form>
                  {['firstName', 'lastName', 'email', 'phoneNumber'].map((field) => (
                    <div key={field} className="flex flex-col space-y-2">
                      <label htmlFor={field} className="text-md font-normal mt-2 text-white capitalize">
                        {field === 'phoneNumber' ? 'Phone Number' : field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </label>
                      <Field
                        id={field}
                        name={field}
                        type={field === 'email' ? 'email' : field === 'phoneNumber' ? 'tel' : 'text'}
                        placeholder={`Enter ${field === 'phoneNumber' ? 'Phone Number' : field}`}
                        className="w-full h-10 border border-[#9ca3af] rounded-[5px] px-3 py-2 text-base font-light text-gray outline-none"
                      />
                      <ErrorMessage name={field} component="span" className="text-[#db3a3a]" />
                    </div>
                  ))}

                  {/* Password Field */}
                  <div className="flex flex-col space-y-2 relative">
                    <label htmlFor="password" className="text-md font-normal text-white">
                      Password
                    </label>
                    <Field
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter Password"
                      className="w-full h-10 border border-[#9ca3af] rounded-[5px] px-3 py-2 text-base font-light text-gray outline-none"
                    />
                    <ErrorMessage name="password" component="span" className="text-[#db3a3a]" />
                    <span onClick={toggleShowPassword} className="absolute top-10 right-2 cursor-pointer">
                      {showPassword ? <BsEye /> : <BsEyeSlash />}
                    </span>
                  </div>

                  {/* Confirm Password */}
                  <div className="flex flex-col space-y-2 relative">
                    <label htmlFor="confirmPassword" className="text-md font-normal text-white">
                      Confirm Password
                    </label>
                    <Field
                      name="confirmPassword"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Re-enter Password"
                      className="w-full h-10 border border-[#9ca3af] rounded-[5px] px-3 py-2 text-base font-light text-gray outline-none"
                    />
                    <ErrorMessage name="confirmPassword" component="span" className="text-[#db3a3a]" />
                  </div>

                  {/* Error Message */}
                  {errorMessage && <div className="text-[#db3a3a] text-sm">{errorMessage}</div>}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#006181] hover:opacity-90 py-3 mt-4 rounded-md text-white font-bold text-lg disabled:opacity-50"
                  >
                    {isLoading ? 'Loading...' : 'Complete Registration'}
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

export default CompleteRegForm;