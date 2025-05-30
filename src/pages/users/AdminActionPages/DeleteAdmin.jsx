import { useState } from "react";
import { FormModal } from "../../../components/ui/modal";
import { Button } from "../../../components/ui/button";
import { Textarea } from '../../../components/ui/textarea';
import { useSelector, useDispatch } from "react-redux";



const DeleteAdminModal = ({ isOpen, onClose, }) => {
  const admin = useSelector((state) => state.admins.selectedAdmin);
  const super_admin = useSelector((state) => state.admin.admin);

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch

  const handleDelete = async () => {
    setLoading(true);
    const id = super_admin?.id;
    const adminId = admin?.id;

    console.log('id:',id)

  try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/v1/admin/management/${adminId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          'X-Admin-Id': id

        },
        // body: JSON.stringify({ email:  }),
      });

      const result = await response.json();

      if (!response.ok) {
        const message = result.message || 'Unknown error';
        setErrorMessage(`Failed to delete: ${message}`);
      } else {
        setSuccessMessage('Admin deleted!');
  
        setTimeout(() => {
          setSuccessMessage('');
          dispatch(fetchAdmins());
          onClose(); // Navigate or go back
        }, 4000);
  
      }
    } catch (error) {
      const message = response.message || 'Unexpected error';
      setErrorMessage(`Failed to delete: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title={`Delete ${admin?.firstName ?? ''} ${admin?.lastName ?? ''}`}
      description="Please provide a reason for deleting this account."

      
      footer={
        <>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700"
          >
            {loading ? "Deleting..." : "Confirm Delete"}
          </Button>
        </>
      }
    >
         <Textarea
                    id="reason"
                    name="reason"
                    // value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="e.g. Admin violated terms of service..."
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

export default DeleteAdminModal;
