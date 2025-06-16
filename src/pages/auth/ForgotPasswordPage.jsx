"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, Mail } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { ButtonLoader } from "../../components/ui/loader"

import { BsEye, BsEyeSlash } from 'react-icons/bs'
import backgroundImage from '../../assets/vector.png'
import dashboardImage from '../../assets/dashboard.png'
import payinaLogo from '../../assets/payina.png'
import blueCircleImage from '../../assets/bluecircle.png'
import yellowCircle from '../../assets/yellowcircle.png'
import eclipse93 from '../../assets/eclipse93.png'
import eclipse92 from '../../assets/eclipse92.png'
import yellowstripe from '../../assets/yellowstripe.png'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { ForgotPasswordSchema } from './schema/forgot-password-schema'
import { useNavigate } from 'react-router-dom'

const ForgotPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [submittedEmail, setSubmittedEmail] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (values) => {
    setIsLoading(true)
    setErrorMessage('')

    try {
      // Add your actual API call here
      // const response = await forgotPasswordAPI(values.email)
      
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false)
        setIsSubmitted(true)
        setSubmittedEmail(values.email)
      }, 1500)
    } catch (error) {
      setIsLoading(false)
      setErrorMessage('Failed to send token. Please try again.')
    }
  }

  // Success state - when token has been sent
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
          {/* Left side with images */}
          <div className="w-1/2 h-[600px] bg-black border border-black relative flex items-center justify-center overflow-hidden">
            <img src={payinaLogo} alt="Payina Logo" className="absolute top-6 left-6 h-8 z-10" />
            <img src={backgroundImage} alt="Background" className="absolute inset-0 object-cover w-full h-full" />
            <img src={dashboardImage} alt="Dashboard" className="absolute inset-0 object-contain max-w-full max-h-full" />
          </div>

          {/* Right side with success message */}
          <div className="w-1/2 h-[600px] bg-[#161616] p-10 border border-black border-l-0 flex items-center justify-center relative">
            <div className="w-full max-w-md text-center">
              <h1 className="text-[#006181] mb-4 font-semibold text-3xl">
                Token Sent Successfully
              </h1>
              <div className="text-white text-sm md:text-md mb-6">
                Check your email for reset instructions
              </div>

              <div className="bg-green-500/10 border border-green-500 text-green-500 px-4 py-3 rounded-md mb-6 text-sm">
                We've sent a password reset token to <strong>{submittedEmail}</strong>. Please check your email.
              </div>

              <div className="text-center">
                <Link 
                  to="/" 
                  className="text-[#006181] hover:underline text-sm flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

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
        {/* Left side with images */}
        <div className="w-1/2 h-[600px] bg-black border border-black relative flex items-center justify-center overflow-hidden">
          <img src={payinaLogo} alt="Payina Logo" className="absolute top-6 left-6 h-8 z-10" />
          <img src={backgroundImage} alt="Background" className="absolute inset-0 object-cover w-full h-full" />
          <img src={dashboardImage} alt="Dashboard" className="absolute inset-0 object-contain max-w-full max-h-full" />
        </div>

        {/* Right side with form */}
        <div className="w-1/2 h-[600px] bg-[#161616] p-10 border border-black border-l-0 flex items-center justify-center relative">
          <div className="w-full max-w-md">
            <h1 className="text-[#006181] text-center mb-4 font-semibold text-3xl">
              Request Token
            </h1>
            <div className="text-white text-center text-sm md:text-md mb-6">
              Enter your email address to request for token
            </div>

            {errorMessage && (
              <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-md mb-4 text-sm">
                {errorMessage}
              </div>
            )}

            <Formik
              initialValues={{ email: '' }}
              validationSchema={ForgotPasswordSchema}
              onSubmit={handleSubmit}
            >
              {() => (
                <Form>
                  <div className="flex flex-col space-y-2 mb-4">
                    <label htmlFor="email" className="text-lg font-normal text-white">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Field
                        name="email"
                        type="email"
                        placeholder="Enter Email Address"
                        className="w-full h-10 border border-[#9ca3af] rounded-[5px] pl-10 pr-3 py-2 text-base font-light text-gray-900 outline-none focus:border-[#006181]"
                      />
                    </div>
                    <ErrorMessage name="email" component="span" className="text-[#db3a3a] text-sm" />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#006181] hover:opacity-90 py-3 mb-4 rounded-md text-white font-normal text-lg disabled:opacity-50 transition-opacity flex items-center justify-center gap-2"
                  >
                    {isLoading && <ButtonLoader />}
                    {isLoading ? 'Sending...' : 'Send Token'}
                  </button>
                  
                  <div className="text-white text-center text-sm md:text-md mb-4">
                    A Token will be sent to your Email shortly
                  </div>

                  <div className="text-center">
                    <Link 
                      to="/login" 
                      className="text-[#006181] hover:underline text-sm flex items-center justify-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back to Login
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

export default ForgotPasswordPage