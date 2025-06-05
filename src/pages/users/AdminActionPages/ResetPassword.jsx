import  { useState } from 'react';
import { FormModal } from "../../../components/ui/modal";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label";
import { useSelector } from 'react-redux';
import apiService from '../../../services/apiService';

const AdminPasswordReset = ({ isOpen, onClose, }) => {
      const [loading, setLoading] = useState(false);
      const [successMessage, setSuccessMessage] = useState('')
      const admin = useSelector((state) => state.admins.selectedAdmin);
 
      const handleResetPassword = async (e) => {
        e.preventDefault(); // prevent the form from submitting

        const requestData = {
          email: admin?.email,
          userType: "ADMIN"
        }

        if (!admin?.email) {
          console.error('No user email found.');
          return;
        }
    
        setLoading(true);
        try {
      await apiService.resetAdminPassword(requestData);
            
          setSuccessMessage('Token successfully sent!');
          setTimeout(() => {
            setSuccessMessage('');
             onClose();
          }, 4000);
          console.log('Password reset token sent successfully');
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
            value={admin?.email}
            required
          />
          {successMessage && (
            <div className="item-added-box border border-black bg-black rounded-lg p-4 mt-4 text-white max-w-md mx-auto shadow-md">
              <p className="mt-2 text-white font-bold">{successMessage}</p>
            </div>
          )}</FormModal>
  );
};

export default AdminPasswordReset;
