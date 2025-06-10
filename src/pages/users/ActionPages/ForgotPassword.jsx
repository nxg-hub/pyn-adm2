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
import { CompleteRegSchema } from '../InviteAdmin/schema/complete-reg-schema';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setIsLoading(true);
    setErrorMessage('');

    // const token = new URLSearchParams(window.location.search).get('token');

    // if (!token) {
    //   setErrorMessage('Invalid or missing token.');
    //   setIsLoading(false);
    //   return;
    // }

    // try {
    //   const response = await fetch(`${import.meta.env.VITE_COMPLETE_REG}?token=${token}`, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(requestData),
    //   });

    //   const result = await response.json();

    //   if (response.ok) {
    //     navigate('/login');
    //   } else {
    //     setErrorMessage(result.debugMessage || 'An error occurred during registration.');
    //   }
    // } catch (error) {
    //   setErrorMessage(`Error: ${error.message}`);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      <img src={yellowCircle} className="absolute top-16 left-14 h-36 z-0 pointer-events-none" alt="yellow circle" />
      <img src={blueCircleImage} className="absolute top-24 left-0 h-30 z-0 pointer-events-none" alt="blue circle" />
      <img src={eclipse93} className="absolute top-[21.25rem] left-20 h-36 z-0 pointer-events-none" alt="eclipse 93" />
      <img src={eclipse92} className="absolute top-[33.75rem] left-10 h-70 z-0 pointer-events-none" alt="eclipse 92" />
      <img src={yellowstripe} className="absolute top-0 right-0 h-50 z-0 pointer-events-none" alt="yellow stripe" />
      <img src={yellowCircle} className="absolute top-[27.5rem] right-10 h-36 z-0 pointer-events-none" alt="yellow circle" />

     
      <div className="flex w-full max-w-6xl relative z-10">
      
        <div className="w-1/2 h-[600px] bg-black border border-black relative flex items-center justify-center overflow-hidden">
          <img src={payinaLogo} alt="Payina Logo" className="absolute top-6 left-6 h-8 z-10" />
          <img src={backgroundImage} alt="Background" className="absolute inset-0 object-cover w-full h-full" />
          <img src={dashboardImage} alt="Dashboard" className="absolute inset-0 object-contain max-w-full max-h-full" />
        </div>

        <div className="w-1/2 h-[600px] bg-[#161616] p-10 border border-black border-l-0 flex items-center justify-center relative">
          <div className="w-full max-w-md">
            <h1 className="text-[#006181] text-center mb-4 font-semibold text-3xl">
              Request Token
            </h1>
            <div className="text-white text-center text-sm md:text-md mb-6">
              Enter your email address to request for token
            </div>

            <Formik
              initialValues={{ firstName: '', lastName: '', phoneNumber: '', password: '', confirmPassword: '' }}
              validationSchema={CompleteRegSchema}
              onSubmit={handleSubmit}
            >
              {() => (
                <Form>
                  {/* Password Field */}
                  <div className="flex flex-col space-y-2 relative">
                    <label htmlFor="password" className="text-lg font-normal text-white">
                      Email
                    </label>
                    <Field
                      name="email"
                      type={showPassword ? 'text' : 'email'}
                      placeholder="Enter Email Address"
                      className="w-full h-10 border border-[#9ca3af] rounded-[5px] px-3 py-2 text-base font-light text-gray outline-none"
                    />
                    <ErrorMessage name="email" component="span" className="text-[#db3a3a]" />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#006181] hover:opacity-90 py-3 mt-4 mb-2 rounded-md text-white font-normal text-lg disabled:opacity-50"
                  >
                    {isLoading ? 'Loading...' : 'Send Token'}
                  </button>
                  <div className="text-white text-left text-sm md:text-md">
                    A Token will be sent to your Email shortly
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

export default ForgotPasswordForm;
