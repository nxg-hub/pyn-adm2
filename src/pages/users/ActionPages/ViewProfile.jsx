import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { useSelector } from "react-redux";


const UserProfile = ({}) => {
    const user = useSelector((state) => state.users.selectedUser);

  if (!user) {
    return <div className="text-center mt-10">No user data available.</div>;
  }

  return (
    <div className="max-w-8xl text-lg mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>{user.firstName} {user.lastName}'s Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Full Name</p>
              <p className="text-lg font-medium">{user.firstName} {user.lastName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Username</p>
              <p className="text-lg font-medium">{user.payinaUserName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="text-lg font-medium">{user.email}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Phone Number</p>
              <p className="text-lg font-medium">{user.phoneNumber}</p>
            </div>
            

            <div>
              <p className="text-sm text-muted-foreground">Account Type</p>
              <p className="text-lg font-medium">{user.userType}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Account Number</p>
              <p className="text-lg font-medium">{user.accountNumber}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tier Level</p>
              <p className="text-lg font-medium">{user.tierLevel}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <p
                className={`text-lg font-medium ${
                  user.enabled === true
                    ? "text-green-600"
                    : user.enabled === false
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
    {user.enabled === true ? "Active" : "Inactive"} 
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

export default UserProfile;
