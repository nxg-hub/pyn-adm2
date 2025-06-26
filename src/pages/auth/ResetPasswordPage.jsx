import { useState, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { Eye, EyeOff, Lock, ArrowLeft } from 'lucide-react'
import { ButtonLoader } from '../../components/ui/loader'
import dashboardImage from '../../assets/dashboard.png'
import payinaLogo from '../../assets/payina.png'
import blueCircleImage from '../../assets/bluecircle.png'
import yellowCircle from '../../assets/yellowcircle.png'
import eclipse93 from '../../assets/eclipse93.png'
import eclipse92 from '../../assets/eclipse92.png'
import yellowstripe from '../../assets/yellowstripe.png'
import backgroundImage from '../../assets/vector.png'
import apiService from '../../services/apiService'
import * as Yup from 'yup'

// Validation Schema
const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password')
})

const ResetPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  
  
  const email = location.state?.email || ''
  const otp = location.state?.otp || ''
  const token = location.state?.token || new URLSearchParams(location.search).get('token')
  const otpValidated = location.state?.otpValidated || false

  
  // useEffect(() => {
  //   if (!email || !otp || !otpValidated) {
  //     navigate('/forgot-password')
  //   }
  // }, [email, otp, otpValidated, navigate])

  const handleSubmit = async (values, { resetForm }) => {
    setIsLoading(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      const response = await apiService.resetPassword({
        email,
        otp,
        newPassword: values.password,
        confirmPassword: values.confirmPassword,
        token
      })

      setIsLoading(false)
      setIsSubmitted(true)
      setSuccessMessage('Password reset successful!')
      resetForm()

      // Redirect to login after success
      setTimeout(() => {
        navigate('/', { 
          state: { 
            message: 'Password reset successful! Please log in with your new password.',
            type: 'success'
          } 
        })
      }, 2000)
      
    } catch (error) {
      setIsLoading(false)
      setErrorMessage(error.message || 'Failed to reset password. Please try again.')
    }
  }

  // Success state
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background decorations */}
        <img src={yellowCircle} className="absolute top-16 left-14 h-36 z-0 pointer-events-none" alt="yellow circle" />
        <img src={blueCircleImage} className="absolute top-24 left-0 h-30 z-0 pointer-events-none" alt="blue circle" />
        <img src={eclipse93} className="absolute top-[21.25rem] left-20 h-36 z-0 pointer-events-none" alt="eclipse 93" />
        <img src={eclipse92} className="absolute top-[33.75rem] left-10 h-70 z-0 pointer-events-none" alt="eclipse 92" />
        <img src={yellowstripe} className="absolute top-0 right-0 h-50 z-0 pointer-events-none" alt="yellow stripe" />
        <img src={yellowCircle} className="absolute top-[27.5rem] right-10 h-36 z-0 pointer-events-none" alt="yellow circle" />

        <div className="flex w-full max-w-6xl relative z-10">
          {/* Left side with images - hidden on mobile and small screens */}
          <div className="hidden md:flex w-1/2 h-[600px] bg-black border border-black relative items-center justify-center overflow-hidden">
            <img src={payinaLogo} alt="Payina Logo" className="absolute top-6 left-6 h-8 z-10" />
            <img src={backgroundImage} alt="Background" className="absolute inset-0 object-cover w-full h-full" />
            <img src={dashboardImage} alt="Dashboard" className="absolute inset-0 object-contain max-w-full max-h-full" />
          </div>

          {/* Right side with success message - full width on mobile */}
          <div className="w-full md:w-1/2 h-[600px] bg-[#161616] p-6 md:p-10 border border-black md:border-l-0 flex items-center justify-center relative">
            <div className="w-full max-w-md text-center">
              <h1 className="text-[#006181] mb-4 font-semibold text-2xl md:text-3xl">
                Password Reset Successful
              </h1>
              
              <div className="bg-green-500/10 border border-green-500 text-green-500 px-4 py-3 rounded-md mb-6 text-sm">
                Your password has been reset successfully! You can now log in with your new password.
              </div>

              <div className="text-white text-center text-sm md:text-md mb-6">
                Redirecting you to login page...
              </div>

              <div className="text-center">
                <Link 
                  to="/" 
                  className="text-[#006181] hover:underline text-sm flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Go to Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Invalid access state
  // if (!email || !otp || !otpValidated) {
  //   return (
  //     <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
  //       {/* Background decorations */}
  //       <img src={yellowCircle} className="absolute top-16 left-14 h-36 z-0 pointer-events-none" alt="yellow circle" />
  //       <img src={blueCircleImage} className="absolute top-24 left-0 h-30 z-0 pointer-events-none" alt="blue circle" />
  //       <img src={eclipse93} className="absolute top-[21.25rem] left-20 h-36 z-0 pointer-events-none" alt="eclipse 93" />
  //       <img src={eclipse92} className="absolute top-[33.75rem] left-10 h-70 z-0 pointer-events-none" alt="eclipse 92" />
  //       <img src={yellowstripe} className="absolute top-0 right-0 h-50 z-0 pointer-events-none" alt="yellow stripe" />
  //       <img src={yellowCircle} className="absolute top-[27.5rem] right-10 h-36 z-0 pointer-events-none" alt="yellow circle" />

  //       <div className="flex w-full max-w-6xl relative z-10">
  //         {/* Left side with images - hidden on mobile and small screens */}
  //         <div className="hidden md:flex w-1/2 h-[600px] bg-black border border-black relative items-center justify-center overflow-hidden">
  //           <img src={payinaLogo} alt="Payina Logo" className="absolute top-6 left-6 h-8 z-10" />
  //           <img src={backgroundImage} alt="Background" className="absolute inset-0 object-cover w-full h-full" />
  //           <img src={dashboardImage} alt="Dashboard" className="absolute inset-0 object-contain max-w-full max-h-full" />
  //         </div>

  //         {/* Right side with error message - full width on mobile */}
  //         <div className="w-full md:w-1/2 h-[600px] bg-[#161616] p-6 md:p-10 border border-black md:border-l-0 flex items-center justify-center relative">
  //           <div className="w-full max-w-md text-center">
  //             <h1 className="text-red-500 mb-4 font-semibold text-2xl md:text-3xl">
  //               Invalid OTP
  //             </h1>
              
  //             <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-md mb-6 text-sm">
  //               The password reset OTP is invalid or has expired. Please request a new password OTP.
  //             </div>

  //             <div className="text-center space-y-4">
  //               <Link 
  //                 to="/forgot-password" 
  //                 className="inline-block bg-[#006181] hover:opacity-90 py-3 px-6 rounded-md text-white font-normal text-lg transition-opacity"
  //               >
  //                 Request New OTP
  //               </Link>
                
  //               <div>
  //                 <Link 
  //                   to="/" 
  //                   className="text-[#006181] hover:underline text-sm flex items-center justify-center gap-2"
  //                 >
  //                   <ArrowLeft className="w-4 h-4" />
  //                   Back to Login
  //                 </Link>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   )
  // }

  // Main form state
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <img src={yellowCircle} className="absolute top-16 left-14 h-36 z-0 pointer-events-none" alt="yellow circle" />
      <img src={blueCircleImage} className="absolute top-24 left-0 h-30 z-0 pointer-events-none" alt="blue circle" />
      <img src={eclipse93} className="absolute top-[21.25rem] left-20 h-36 z-0 pointer-events-none" alt="eclipse 93" />
      <img src={eclipse92} className="absolute top-[33.75rem] left-10 h-70 z-0 pointer-events-none" alt="eclipse 92" />
      <img src={yellowstripe} className="absolute top-0 right-0 h-50 z-0 pointer-events-none" alt="yellow stripe" />
      <img src={yellowCircle} className="absolute top-[27.5rem] right-10 h-36 z-0 pointer-events-none" alt="yellow circle" />

      <div className="flex w-full max-w-6xl relative z-10">
        {/* Left side with images - hidden on mobile and small screens */}
        <div className="hidden md:flex w-1/2 h-[600px] bg-black border border-black relative items-center justify-center overflow-hidden">
          <img src={payinaLogo} alt="Payina Logo" className="absolute top-6 left-6 h-8 z-10" />
          <img src={backgroundImage} alt="Background" className="absolute inset-0 object-cover w-full h-full" />
          <img src={dashboardImage} alt="Dashboard" className="absolute inset-0 object-contain max-w-full max-h-full" />
        </div>

        {/* Right side with form - full width on mobile */}
        <div className="w-full md:w-1/2 h-[600px] bg-[#161616] p-6 md:p-10 border border-black md:border-l-0 flex items-center justify-center relative">
          <div className="w-full max-w-md">
            <h1 className="text-[#006181] text-center mb-4 font-semibold text-2xl md:text-3xl">
              Set New Password
            </h1>
            <div className="text-white text-center text-sm md:text-md mb-6">
              Create a new password for your account
            </div>

            {errorMessage && (
              <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-md mb-4 text-sm">
                {errorMessage}
              </div>
            )}

            {successMessage && (
              <div className="bg-green-500/10 border border-green-500 text-green-500 px-4 py-2 rounded-md mb-4 text-sm">
                {successMessage}
              </div>
            )}

            <Formik
              initialValues={{ password: '', confirmPassword: '' }}
              validationSchema={ResetPasswordSchema}
              onSubmit={handleSubmit}
            >
              {({ isValid, dirty }) => (
                <Form>
                  {/* New Password Field */}
                  <div className="flex flex-col space-y-2 mb-4">
                    <label htmlFor="password" className="text-lg font-normal text-white">
                      New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Field
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter new password"
                        className="w-full h-10 border border-[#9ca3af] rounded-[5px] pl-10 pr-12 py-2 text-base font-light text-white outline-none focus:border-[#006181]"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    <ErrorMessage name="password" component="span" className="text-[#db3a3a] text-sm" />
                  </div>

                  {/* Confirm Password Field */}
                  <div className="flex flex-col space-y-2 mb-6">
                    <label htmlFor="confirmPassword" className="text-lg font-normal text-white">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Field
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm new password"
                        className="w-full h-10 border border-[#9ca3af] rounded-[5px] pl-10 pr-12 py-2 text-base font-light text-white outline-none focus:border-[#006181]"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    <ErrorMessage name="confirmPassword" component="span" className="text-[#db3a3a] text-sm" />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || !isValid || !dirty}
                    className="w-full bg-[#006181] hover:opacity-90 py-3 mb-4 rounded-md text-white font-normal text-lg disabled:opacity-50 transition-opacity flex items-center justify-center gap-2"
                  >
                    {isLoading && <ButtonLoader />}
                    {isLoading ? 'Resetting...' : 'Reset Password'}
                  </button>

                  <div className="text-white text-center text-sm md:text-md mb-4">
                    Password must contain at least 8 characters with uppercase, lowercase, number, and special character.
                  </div>

                  <div className="text-center">
                    <Link 
                      to="/forgot-password" 
                      className="text-[#006181] hover:underline text-sm flex items-center justify-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back to forgot password
                    </Link>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPasswordPage