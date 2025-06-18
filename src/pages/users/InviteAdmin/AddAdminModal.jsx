import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useSelector } from 'react-redux';
import { FormModal } from "../../../components/ui/modal";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label"; 
import apiService from "../../../services/apiService";


const AdminInvite = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const x_admin = useSelector((state) => state.admin.admin);

  const handleInvite = async (values, { resetForm }) => {
    setIsLoading(true);
    setErrorMessage('');

    const AdminId = x_admin?.id;

    const requestData = {
      email: values.email,
      adminUserType: values.adminUserType
    };

    try {
      const result = await apiService.inviteAdmin( requestData, AdminId)
      if ( result?.message === 'Admin invitation has been sent successfully') {
        setSuccessMessage('Admin invite sent.');
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
        onClose();
      } else {
        setErrorMessage(result?.message || 'An error occurred while sending the invite.');
      }
    } catch (error) {
      console.error('Error sending invite:', error);
      setErrorMessage(`Error sending invite: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title="Invite An Admin"
    >
      <Formik
        initialValues={{ email: '', adminUserType: '' }}
        onSubmit={handleInvite}
      >
        {() => (
          <Form className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Field as={Input} name="email" type="email" required />
              <ErrorMessage name="email" component="div" className="text-red-500" />
            </div>

            <div>
              <Label htmlFor="adminUserType">Role</Label>
              <Field as="select" name="adminUserType" className="w-full bg-black border p-2 rounded" required>
                <option value="" disabled>Choose Admin Type</option>
                <option value="GENERAL_MANAGER">General Manager</option>
                <option value="CUSTOMER_CARE_REP">Customer Care Rep</option>
                <option value="OPERATIONS_MANAGER">Operations Manager</option>
                <option value="FINANCE_MANAGER">Finance Manager</option>
              </Field>
              <ErrorMessage name="adminUserType" component="div" className="text-red-500" />
            </div>

            {successMessage && (
              <div className="border border-black bg-black rounded-lg p-4 mt-4 text-white">
                <p className="font-bold">{successMessage}</p>
              </div>
            )}

            {errorMessage && (
              <div className="border border-red-500 bg-red-100 rounded-lg p-4 mt-4 text-red-700">
                <p>{errorMessage}</p>
              </div>
            )}

            <div className="flex justify-end space-x-2 mt-4">
              <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading} className="bg-[#3A859E]">
                {isLoading ? 'Sending...' : 'Send Invite'}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </FormModal>
  );
};

export default AdminInvite;
