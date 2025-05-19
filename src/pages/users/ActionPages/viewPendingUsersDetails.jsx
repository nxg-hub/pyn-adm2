import { FormModal } from "../../../components/ui/modal";
import { Card, CardContent } from "../../../components/ui/card";
import React from "react";

const ViewPendingUser = ({ isOpen, onClose, selectedUser }) => {
  if (!selectedUser) return 
  <div>no user selected</div> // Prevent render if no user is selected
console.log (selectedUser.firstName)
  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title={` ${selectedUser.firstName} ${selectedUser.lastName}'s Profile`}
    >
          <div className="grid grid-cols-1 text-gray-100 sm:grid-cols-2 gap-4">
          <div>
              <p className="text-sm text-muted-foreground">User ID</p>
              <p className="text-lg font-medium">
                {selectedUser.id}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Full Name</p>
              <p className="text-lg font-medium">
                {selectedUser.firstName} {selectedUser.lastName}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tier level</p>
              <p className="text-lg font-medium">
                {selectedUser.tierLevel}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="text-lg font-medium">{selectedUser.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone number</p>
              <p className="text-lg font-medium">{selectedUser.phoneNumber}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Identity Verification Status</p>
              <p className="text-lg font-medium">{selectedUser.bvnverificationStatus
              }</p>
            </div>
            
          </div>
    </FormModal>
  );
};

export default ViewPendingUser;
