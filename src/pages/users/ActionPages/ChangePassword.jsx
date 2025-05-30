import React, { useState } from 'react';
import { FormModal } from "../../../components/ui/modal";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { useSelector } from "react-redux";

const InitiatePasswordReset = ({ isOpen, onClose, selectedUser }) => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const reduxUser = useSelector((state) => state.users.selectedUser);
  const targetUser = selectedUser || reduxUser;
  const email = targetUser?.email || '';
  const token = useSelector((state) => state.auth?.token) || localStorage.getItem('token');

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      setErrorMessage('No user email found. Please select a valid user.');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      console.log('Initiating password reset for:', email);
      console.log('Using endpoint:', import.meta.env.VITE_REQUEST_PASSWORD_RESET);

      const response =  await fetch(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_REQUEST_PASSWORD_RESET}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
           Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email }),
      });

      let data = {};
      const contentType = response.headers.get('content-type');

      if (contentType && contentType.includes('application/json')) {
        try {
          data = await response.json();
        } catch (parseError) {
          console.warn('Failed to parse JSON response:', parseError);
        }
      } else {
        const textResponse = await response.text();
        if (textResponse) {
          data = { message: textResponse };
        }
      }

      if (!response.ok) {
        const errorMessage = data?.message || data?.error || `HTTP ${response.status}: ${response.statusText}`;
        throw new Error(errorMessage);
      }

      console.log("Password reset initiated:", data);
      setSuccessMessage(
        data?.message || 
        `Password reset link has been sent to ${email}. The user will receive an email with instructions to reset their password.`
      );
      
    } catch (error) {
      console.error('Password Reset Initiation Error:', error);
      
      // Handle specific error cases
      if (error.message.includes('404')) {
        setErrorMessage('User not found. Please verify the email address.');
      } else if (error.message.includes('429')) {
        setErrorMessage('Too many reset requests. Please try again later.');
      } else if (error.message.includes('403')) {
        setErrorMessage('You do not have permission to reset passwords for this user.');
      } else {
        setErrorMessage(error.message || "Failed to send reset link. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title="Initiate Reset Password"
      description="This will send a password reset link to the user's email address."
      footer={
        <>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            type="submit"
            form="initiate-reset-form"
            disabled={loading}
            className="w-full bg-[#3A859E]"
          >
            {loading ? 'Sending...' : 'Send Token'}
          </Button>
        </>
      }
    >
      <form id="initiate-reset-form" onSubmit={handleResetPassword} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={email || ''}
            readOnly
            required
          />
        </div>

        {successMessage && (
          <div className="border border-green-500 bg-green-600 rounded-lg p-4 text-white shadow-md">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="border border-red-500 bg-red-600 rounded-lg p-4 text-white shadow-md">
            {errorMessage}
          </div>
        )}
      </form>
    </FormModal>
  );
};

export default InitiatePasswordReset;
