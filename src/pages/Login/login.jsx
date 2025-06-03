import { useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import backgroundImage from "../../assets/vector.png";
import dashboardImage from "../../assets/dashboard.png";
import payinaLogo from "../../assets/payina.png";
import blueCircleImage from "../../assets/bluecircle.png";
import yellowCircle from "../../assets/yellowcircle.png";
import eclipse93 from "../../assets/eclipse93.png";
import eclipse92 from "../../assets/eclipse92.png";
import yellowstripe from "../../assets/yellowstripe.png"

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    // Simulate API call
    setTimeout(() => {
      if (formData.email && formData.password) {
        console.log('Login successful');
        // Handle successful login
      } else {
        setErrorMessage('Please fill in all fields');
      }
      setIsLoading(false);
    }, 1000);
  };

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
        {/* Left Border Box */}
        <div className="w-1/2 h-[500px] bg-black border border-black flex items-center justify-center relative overflow-hidden">
          <div className="absolute top-6 left-6 z-10">
            <img src={payinaLogo} alt="logo" className="h-8 w-auto" />
          </div>
          <div className="absolute inset-0">
            <img src={backgroundImage} alt="Background" className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <img src={dashboardImage} alt="Dashboard" className="max-w-full max-h-full object-contain" />
          </div>
        </div>

        {/* Right Border Box */}
        <div className="w-1/2 h-[500px] bg-[#161616] border border-black border-l-0 flex items-center justify-center relative p-6">
          <div className="w-full max-w-md">
            <h1 className="text-[#006181] text-center mb-8 font-semibold text-2xl md:text-3xl xl:text-4xl">
              Payina Back Office
            </h1>
            <div className="text-white text-center font-semibold text-lg md:text-xl mb-6">
              Hi Admin, Please login to your Dashboard
            </div>

            <div className="space-y-4">
              <div className="flex flex-col space-y-2">
                <label htmlFor="email" className="text-sm font-normal text-[#006181] text-left">
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="Enter Email Address"
                  className="w-full h-10 border border-gray-300 outline-none font-light text-base rounded px-3 text-black"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col space-y-2 relative">
                <label htmlFor="password" className="text-sm font-normal text-[#006181] text-left">
                  Password
                </label>
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter Password"
                  className="w-full h-10 border border-gray-300 outline-none font-light text-base rounded px-3 pr-10 text-black"
                  value={formData.password}
                  onChange={handleChange}
                />
                <div className="absolute right-3 top-8 cursor-pointer">
                  {showPassword ? (
                    <BsEye onClick={handleShowPassword} className="text-gray-500" />
                  ) : (
                    <BsEyeSlash onClick={handleShowPassword} className="text-gray-500" />
                  )}
                </div>
              </div>

              {errorMessage && <div className="text-red-500 text-sm">{errorMessage}</div>}

              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full text-base flex  justify-center items-center rounded-md bg-[#006181] px-6 py-2 font-semibold text-white hover:bg-opacity-80 transition disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>

              <div className="pt-2  text-right">
                <button className="text-white font-semibold text-md hover:text-[#006181] transition">
                  Forgot password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;