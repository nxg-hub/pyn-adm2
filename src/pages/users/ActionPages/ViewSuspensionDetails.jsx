import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";


const ViewSuspension = ({}) => {
    const selected = useSelector((state) => state.suspendedUsers.selectedDetails);
    const suspensionDetails = selected?.suspensionDetails;
        const navigate = useNavigate()

  if (!suspensionDetails) {
    return <div className="text-center mt-10">No user data available.</div>;
  }
const handleBack = () => {
  navigate (-1);
}

  return (
    <div className="max-w-8xl text-lg mx-auto p-6">
      <button
        onClick={handleBack}
        className="mb-9 text-white text-xl font-medium flex items-center gap-5 hover:underline hover:text-[#006181] group-hover:decoration-[#006181]">
        <ChevronLeft className="h-8 w-8" />
        Back
      </button>
      <Card>
        <CardHeader>
          <CardTitle>Suspension deatails for {suspensionDetails.customerEmail}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Suspension ID</p>
              <p className="text-lg font-medium">{suspensionDetails.id}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Reason for suspension</p>
              <p className="text-lg font-medium">{suspensionDetails.reason}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Suspended by:</p>
              <p className="text-lg font-medium">{suspensionDetails.suspendedByAdminName}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Time of Suspension</p>
              <p className="text-lg font-medium">{new Date(suspensionDetails.suspendedAt).toLocaleString()}</p>
            </div>
            
</div>
            
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewSuspension;
