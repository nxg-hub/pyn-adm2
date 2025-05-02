import React, {useState} from "react";
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useSelector } from 'react-redux';
import { X } from "lucide-react"; 


const AdminInvite = ({onClose}) => {
const [isLoading, setIsLoading] = useState(false);
const [errorMessage, setErrorMessage] = useState('');
const [successMessage, setSuccessMessage] = useState('');
const admin = useSelector((state) => state.admin.admin);

const handleInvite = async (values, {resetForm} ) => {
    setIsLoading(true);
    setErrorMessage('');

   const id = admin?.id;

    const requestData = {
      email: values.email,
      adminUserType: values.adminUserType
    };
  
    try {
      const response = await fetch(import.meta.env.VITE_ADMIN_INVITE, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-Inviting-Admin-Id': id
        },
        body: JSON.stringify(requestData),
      });
  
      const result = await response.json();
  
      if (response.ok && result.message === 'Admin invitation has been sent successfully') {
        setSuccessMessage('Admin invite sent.');
        setTimeout(() => {
            setSuccessMessage('');
          }, 3000);
          resetForm()
      } else {
        setErrorMessage(result.debugMessage || 'An error occurred while sending the invite.');
      }
    } catch (error) {
      console.error('Error sending invite:', error);
      setErrorMessage(`Error sending invite: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  

return (
    <div className="fixed inset-0 flex items-center justify-center border-2 border-[#a0a0a0] rounded-md overflow-y-auto p-2 z-50">
         
        
    <div className="relative bg-gray-800 p-11 rounded-[3%] shadow-lg w-[700px] max-h-[100%] overflow-y-auto">
    <button
          className="absolute top-3 border border-[#006181]  rounded-full p-2 right-2 text-[#006181] hover:text-red-500"
          onClick={onClose}
        >
          <X size={25} />
   </button>
    <div className="text-center mt-3 xl:mt-0 text-[#006181] font-bold xl:text-5xl text-2xl py-10">
      Invite an Admin
    </div>
          <Formik initialValues={{ email: '', adminUserType: '' }}
          onSubmit={handleInvite}>
            {() => (
              <Form className="w-full ">
                <div className="space-y-6">
                  {/* Email Field */}
                  <div className="flex flex-col xl:w-[120%]">
                    <label htmlFor="email" className="text-lg  font-normal text-[#006181]">
                      Email Address
                    </label>
                    <Field
                      name="email"
                      type="email"
                      placeholder="Enter Email Address"
                      className="w-full h-[3.4rem] border border-[#9ca3af] outline-none font-light text-base text-gray rounded-md py-2 px-4"
                    />
                    <ErrorMessage name="email" component="span" className="text-[#db3a3a] text-xs mt-1" />
                  </div>

                  {/* Admin Type Field */}
                  <div className="flex flex-col xl:w-[120%]">
                    <label htmlFor="adminUserType" className="text-lg font-normal text-[#006181]">
                      Admin Type
                    </label>
                    <Field
                      as="select"
                      name="adminUserType"
                      className="w-full h-[3.4rem] border border-[#9ca3af] outline-none font-light text-base text-black rounded-md py-2 px-4"
                    >
                      <option value="" disabled>Choose Admin Type</option>
                      <option value="GENERAL_MANAGER">General Manager</option>
                      <option value="CUSTOMER_CARE_REP">Customer Care Rep</option>
                      <option value="OPERATIONS_MANAGER">Operations Manager</option>
                      <option value="FINANCE_MANAGER">Finance Manager</option>
                    </Field>
                    <ErrorMessage name="adminUserType" component="span" className="text-[#db3a3a] text-xs mt-1" />
                  </div>
                </div>


                {successMessage && (
                          <div className="item-added-box border border-blue-100 bg-blue-100 rounded-lg p-4 mt-4 text-blue-700 max-w-md mx-auto shadow-md">
                            <p className="mt-2 text-lightBlue font-bold">{successMessage}</p>
                          </div>
                        )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="text-[#006181] mt-5 text-xl flex justify-center items-center rounded-md bg-[#CCDFE6] px-6 py-3 font-bold w-full xl:w-[120%] mx-auto transition hover:cursor-pointer"
                  disabled={isLoading}
                >
                  {isLoading ? 'Loading...' : 'Invite'}
                </button>
              </Form>
            )}
          </Formik>
      </div>
      </div>
    
    
  
    )
};

export default AdminInvite;

