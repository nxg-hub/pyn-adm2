import React, { useState } from 'react';
import { FormModal } from "../../../components/ui/modal";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";

const InitiatePasswordReset = ({ isOpen, onClose, selectedUser }) => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const email = selectedUser?.email;
  const RESET_PASSWORD_URL = import.meta.env.VITE_REQUEST_PASSWORD_RESET || '/api/request-password-reset';

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      setErrorMessage('User email not found.');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await fetch(RESET_PASSWORD_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      let data = {};
      try {
        data = await response.json();
      } catch {
        // fail silently if not JSON
      }

      if (!response.ok) {
        throw new Error(data.message || 'Failed to initiate password reset');
      }

      setSuccessMessage('Reset token successfully sent to the user\'s email.');
      setTimeout(() => {
        setSuccessMessage('');
        onClose();
      }, 4000);
    } catch (error) {
      setErrorMessage(error.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title="Initiate Reset Password"
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
