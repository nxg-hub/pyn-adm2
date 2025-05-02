import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { useSelector } from "react-redux";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";



const AdminProfile = ({}) => {
    const admin = useSelector((state) => state.admins.selectedAdmin);
    const navigate = useNavigate()

  if (!admin) {
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
          <CardTitle>{admin.firstName} {admin.lastName}'s Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Full Name</p>
              <p className="text-lg font-medium">{admin.firstName} {admin.lastName}</p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="text-lg font-medium">{admin.email}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Phone Number</p>
              <p className="text-lg font-medium">{admin.phoneNumber}</p>
            </div>
            

            <div>
              <p className="text-sm text-muted-foreground">Role</p>
              <p className="text-lg font-medium">{admin.adminUserType}</p>
            </div>
           
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <p
                className={`text-lg font-medium ${
                  admin.enabled === true
                    ? "text-green-600"
                    : admin.enabled === false
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
    {admin.enabled === true ? "Active" : "Inactive"} 
    </p>
            </div>

            {/* <div>
              <p className="text-sm text-muted-foreground">Date Joined</p>
              <p className="text-lg font-medium">
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div> */}
          </div>

          {/* You can expand below with more user data as needed */}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminProfile;
