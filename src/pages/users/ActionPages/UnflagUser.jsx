import { useState } from "react";
import { FormModal } from "../../../components/ui/modal";
import { Button } from "../../../components/ui/button";
import { Textarea } from '../../../components/ui/textarea';
import { useSelector, useDispatch } from "react-redux";
import { fetchFlaggedUsers } from "../../../redux/flaggedAccounts";


const UnflagUserModal = ({ isOpen, onClose, }) => {
  const [reason, setReason] = useState("")
  const selected = useSelector((state) => state.flaggedUsers.selectedDetails);
  const user = selected?.userDetails;
  const super_admin = useSelector((state) => state.admin.admin);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
       

  const handleUnflag = async () => {
    setLoading(true);

  const id = super_admin?.id

    const requestData = {
      userId: user?.id,
      email: user?.email,
      phoneNumber: user?.phoneNumber,
      payinaUserName: user?.payinaUserName,
      accountNumber: user?.accountNumber,
      reason: reason
    }
    try {
      const response = await fetch(import.meta.env.VITE_UNFLAG_USER, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          'X-Admin-Id': id

        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Failed to unflag user");

      setSuccessMessage("Successful!");
       setTimeout(() => {
        setSuccessMessage('');
        dispatch(fetchFlaggedUsers()); 
      onClose() 
    }, 2000)
    } catch (err) {
      console.error("Error:", err.message);
      setErrorMessage(`Error unflagging user, ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title={`Unflag ${user?.firstName} ${user?.lastName}`}
      description="Please provide a reason for this action."

      
      footer={
        <>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleUnflag}
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

export default UnflagUserModal;
