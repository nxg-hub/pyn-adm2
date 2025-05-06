import { useState } from "react";
import { FormModal } from "../../../components/ui/modal";
import { Button } from "../../../components/ui/button";
import { Textarea } from '../../../components/ui/textarea';
import { useSelector } from "react-redux";



const SuspendUserModal = ({ isOpen, onClose, }) => {
    const user = useSelector((state) => state.users.selectedUser);
console.log (user?.lastName)
  const [loading, setLoading] = useState(false);

  const handleSuspend = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/v1/user/suspend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user.email }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Failed to suspend user");

      // success handling
      alert("User suspended successfully!");
      onClose(); // close modal
    } catch (err) {
      console.error("Error:", err.message);
      alert("Error suspending user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title={`Suspend ${user?.firstName} ${user?.lastName}`}
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
                    // value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="e.g. User violated terms of service..."
                    rows={5}
                    required
                  />
    </FormModal>
  );
};

export default SuspendUserModal;
