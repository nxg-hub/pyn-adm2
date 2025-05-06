import React, { useState } from 'react';
import { FormModal } from "../../../components/ui/modal";

import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useSelector } from 'react-redux';

const InitiatePasswordReset = ({ isOpen, onClose, }) => {
      const navigate = useNavigate()
      const [loading, setLoading] = useState(false);
      const [successMessage, setSuccessMessage] = useState('')

      const user = useSelector((state) => state.users.selectedUser);
      console.log (user?.lastName)

      const handleBack = () => {
        navigate (-1);
      }
 
      const handleResetPassword = async (e) => {
        e.preventDefault(); // prevent the form from submitting

        if (!user.email) {
          console.error('No user email found.');
          return;
        }
    
        setLoading(true);
        try {
          const response = await fetch(`${import.meta.env.VITE_BASE_URL}/v1/auth/initiate-password-reset?email=${user.email}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          const data = await response.json();
    
          if (!response.ok) {
            throw new Error(data.message || 'Failed to initiate password reset');
          }
          setSuccessMessage('Token successfully sent!');
          setTimeout(() => {
            setSuccessMessage('');
             onClose();
          }, 4000);
          console.log('Password reset initiated successfully:', data);
        } catch (error) {
          console.error('Password reset failed:', error.message);
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
        <Button type="submit"
        onClick= {handleResetPassword}
        disabled={loading}
         className="w-full bg-[#3A859E]">
        {loading ? 'Sending...' : 'Send token'}
        </Button>
        </>
      }
    > 
     <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            name="email"
            value={user?.email}
            required
          />
          {successMessage && (
            <div className="item-added-box border border-black bg-black rounded-lg p-4 mt-4 text-white max-w-md mx-auto shadow-md">
              <p className="mt-2 text-white font-bold">{successMessage}</p>
            </div>
          )}</FormModal>
  );
};

export default InitiatePasswordReset;
