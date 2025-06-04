import { useState } from "react";
import { FormModal } from "../../../components/ui/modal";
import { Button } from "../../../components/ui/button";
import { Textarea } from '../../../components/ui/textarea';
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../../../redux/UsersSlice";
import apiService from "../../../services/apiService";


const token = localStorage.getItem('token')

const FlagUser = ({ isOpen, onClose, selectedUser }) => {
  const [reason, setReason] = useState("")
  const user = useSelector((state) => state.users.selectedUser);
  const super_admin = useSelector((state) => state.admin.admin);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
       

  const handleFlag = async () => {
    setLoading(true);
    setErrorMessage('');

  const id = super_admin?.id

    const requestData = {
      id: user?.id || selectedUser.id,
      email: user?.email || selectedUser.email,
      phoneNumber: user?.phoneNumber || selectedUser.phoneNumber,
      payinaUserName: user?.payinaUserName || selectedUser.payinaUserName,
      accountNumber: user?.accountNumber || selectedUser.accountNumber,
      reason: reason
    }
    try {
     await apiService.flagUser(token, requestData);
       
        setSuccessMessage('New flag user created.');
        setTimeout(() => {
          setSuccessMessage('');
          onClose()
        }, 3000);
      } 
     catch (error) {
      console.error('Error:', error);
      setErrorMessage(`Error creating flag user: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title={`Flag ${selectedUser?.firstName || user?.firstName } ${selectedUser?.lastName || user?.lastName}`}
      description="Please provide a reason for this action. "

      
      footer={
        <>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleFlag}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700"
          >
            {loading ? "Please wait..." : "Confirm"}
          </Button>
        </>
      }
    >
         <Textarea
                    id="reason"
                    name="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="e.g. User violated terms of service..."
                    rows={5}
                    required
                  />
                   {errorMessage && (
            <div className="item-added-box border border-black bg-black rounded-lg p-4 mt-4 text-red-500 max-w-md mx-auto shadow-md">
              <p className="mt-2 text-red-500">{errorMessage}</p>
            </div>
          )}
        {successMessage && (
            <div className="item-added-box border border-black bg-black rounded-lg p-4 mt-4 text-white max-w-md mx-auto shadow-md">
              <p className="mt-2 text-white font-bold">{successMessage}</p>
            </div>
          )}
    </FormModal>
  );
};

export default FlagUser;
