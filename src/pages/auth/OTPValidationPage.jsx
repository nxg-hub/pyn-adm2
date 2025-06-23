import { useState, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { Shield, ArrowLeft, RefreshCw } from 'lucide-react'
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
import { OTPValidationSchema } from './schema/OTPValidationSchema'


const OTPValidationPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [countdown, setCountdown] = useState(0)
  const navigate = useNavigate()
  const location = useLocation()
  
  // Get email from navigation state
  const email = location.state?.email || ''

  // Redirect if no email provided
  useEffect(() => {
    if (!email) {
      navigate('/forgot-password')
    }
  }, [email, navigate])

  // Countdown timer for resend OTP
  useEffect(() => {
    let timer
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    }
    return () => clearTimeout(timer)
  }, [countdown])

  const handleSubmit = async (values, { resetForm }) => {
    setIsLoading(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      const response = await apiService.validateOTP(email, values.otp)
      
      setIsLoading(false)
      setSuccessMessage('OTP validated successfully!')
      
      // Navigate to complete registration page after a short delay
      setTimeout(() => {
        navigate('/complete-reg', { 
          state: { 
            email, 
            otpValidated: true,
            token: response.token || response.data?.token 
          } 
        })
      }, 1500)
      
      resetForm()
    } catch (error) {
      setIsLoading(false)
      setErrorMessage(error.message || 'Invalid OTP. Please try again.')
    }
  }

  // const handleResendOTP = async () => {
  //   if (countdown > 0) return
    
  //   setIsResending(true)
  //   setErrorMessage('')
  //   setSuccessMessage('')
    
  //   try {
  //     const response = await apiService.resendOTP(email)
  //     setSuccessMessage('OTP resent successfully!')
  //     setCountdown(60) // 60 seconds countdown
  //     setIsResending(false)
  //   } catch (error) {
  //     setErrorMessage(error.message || 'Failed to resend OTP. Please try again.')
  //     setIsResending(false)
  //   }
  // }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

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
              Verify OTP
            </h1>
            <div className="text-white text-center text-sm md:text-md mb-6">
              Enter the 6-digit code sent to <span className="text-[#006181] font-medium">{email}</span>
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
              initialValues={{ otp: '' }}
              validationSchema={OTPValidationSchema}
              onSubmit={handleSubmit}
            >
              {({ isValid, dirty, values, setFieldValue }) => (
                <Form>
                  <div className="flex flex-col space-y-2 mb-4">
                    <label htmlFor="otp" className="text-lg font-normal text-white">
                      OTP Code
                    </label>
                    <div className="relative">
                      <Shield className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Field
                        name="otp"
                        type="text"
                        placeholder="Enter 6-digit OTP"
                        maxLength="6"
                        className="w-full h-10 border border-[#9ca3af] rounded-[5px] pl-10 pr-3 py-2 text-base font-light text-gray-900 outline-none focus:border-[#006181] text-center tracking-widest"
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '') // Only allow digits
                          setFieldValue('otp', value)
                        }}
                      />
                    </div>
                    <ErrorMessage name="otp" component="span" className="text-[#db3a3a] text-sm" />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || !isValid || !dirty}
                    className="w-full bg-[#006181] hover:opacity-90 py-3 mb-4 rounded-md text-white font-normal text-lg disabled:opacity-50 transition-opacity flex items-center justify-center gap-2"
                  >
                    {isLoading && <ButtonLoader />}
                    {isLoading ? 'Verifying...' : 'Verify OTP'}
                  </button>

                  <div className="text-center mb-4">
                    <button
                      type="button"
                      // onClick={handleResendOTP}
                      disabled={countdown > 0 || isResending}
                      className="text-[#006181] hover:underline text-sm flex items-center justify-center gap-2 mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isResending ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          Resending...
                        </>
                      ) : countdown > 0 ? (
                        `Resend OTP in ${formatTime(countdown)}`
                      ) : (
                        'Resend OTP'
                      )}
                    </button>
                  </div>

                  <div className="text-white text-center text-sm md:text-md mb-4">
                    Didn't receive the OTP? Check your spam folder or contact support.
                  </div>

                  {/* Back to previous page link */}
                  <div className="text-center">
                    <Link
                      to="/forgot-password"
                      className="text-gray-400 hover:text-[#006181] text-sm flex items-center justify-center gap-2 transition-colors"
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

export default OTPValidationPage