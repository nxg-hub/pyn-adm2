import { useState } from "react";
import { FormModal } from "../../../components/ui/modal";
import { Button } from "../../../components/ui/button";
import { Textarea } from '../../../components/ui/textarea';
import { useSelector, useDispatch } from "react-redux";
import { fetchSuspendedUsers } from "../../../redux/suspendedAccounts";
import apiService from "../../../services/apiService";

const token = localStorage.getItem('token')



const UnsuspendUserModal = ({ isOpen, onClose, }) => {
  const [reason, setReason] = useState("")
  const selected = useSelector((state) => state.suspendedUsers.selectedDetails);
  const user = selected?.userDetails;
  const x_admin = useSelector((state) => state.admin.admin);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
       

  const handleUnsuspend = async () => {
    setLoading(true);


    const requestData = {
      userId: user?.id,
      email: user?.email,
      phoneNumber: user?.phoneNumber,
      payinaUserName: user?.payinaUserName,
      accountNumber: user?.accountNumber,
      reason: reason
    }
    const AdminId = x_admin?.id

    try {
       await apiService.unsuspendUser(requestData, AdminId);
       
        setSuccessMessage('User unsuspended.'); 
        setTimeout(() => {
          setSuccessMessage('');
          dispatch(fetchSuspendedUsers());  
          onClose()
        }, 3000);
      } 
     catch (error) {
      console.error('Error:', error);
      setErrorMessage(`Error creating unsuspended user: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title={`Unsuspend ${user?.firstName} ${user?.lastName}`}
      description="Please provide a reason for this action."

      
      footer={
        <>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleUnsuspend}
            disabled={loading}
            className="bg-green-400"
          >
            {loading ? "Hold on..." : "Confirm"}
          </Button>
        </>
      }
    >
         <Textarea
                    id="reason"
                    name="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="e.g. Suspicious activity resolved..."
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

export default UnsuspendUserModal;
