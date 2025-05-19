import { useState } from "react";
import { FormModal } from "../../../components/ui/modal";
import { Button } from "../../../components/ui/button";
import { Textarea } from '../../../components/ui/textarea';
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../../../redux/UsersSlice";


const SuspendUserModal = ({ isOpen, onClose, selectedUser }) => {
  const [reason, setReason] = useState("")
  const selected = useSelector((state) => state.flaggedUsers.selectedDetails);
  const user = selected?.userDetails;
  const super_admin = useSelector((state) => state.admin.admin);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
 
       

  const handleSuspend = async () => {
    setLoading(true);

  const id = super_admin?.id

    const requestData = {
      userId: user?.id || selectedUser?.id,
      email: user?.email || selectedUser?.email,
      phoneNumber: user?.phoneNumber || selectedUser?.phoneNumber,
      payinaUserName: user?.payinaUserName || selectedUser?.payinaUserName,
      accountNumber: user?.accountNumber || selectedUser?.accountNumber,
      reason: reason
    }
    try {
      const response = await fetch(import.meta.env.VITE_SUSPEND_USER, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'X-Admin-Id': id

        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Failed to suspend user");

      setSuccessMessage("User suspended successfully!");
       setTimeout(() => {
        setSuccessMessage('');
        dispatch(fetchUsers()); 
      onClose() 
    }, 2000)
    } catch (err) {
      console.error("Error:", err.message);
      setErrorMessage(`Error suspending user, ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title={`Suspend ${selectedUser?.firstName || user?.firstName } ${selectedUser?.lastName || user?.lastName }`}
      description="Please provide a reason for suspending this account. This action can impact user access."

      
      footer={
        <>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleSuspend}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700"
          >
            {loading ? "Suspending..." : "Confirm Suspend"}
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

export default SuspendUserModal;
