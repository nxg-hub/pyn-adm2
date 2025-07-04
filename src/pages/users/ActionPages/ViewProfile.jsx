import { React, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import ClientsListModal from "./ViewClientsListModal";
import { Users } from "lucide-react";

const UserProfile = () => {
  const user = useSelector((state) => state.users.selectedUser);
  const navigate = useNavigate();
  const location = useLocation();
  const selectedUser = location.state?.selectedUser;
  const [showClientsModal, setShowClientsModal] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };
  // console.log (user?.corporateCustomer.houseNumber)
  // console.log (selectedUser?.corporateCustomer.houseNumber)

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
          <CardTitle>
            {selectedUser?.firstName || user?.firstName}{" "}
            {selectedUser?.lastName || user?.lastName} 's Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Full Name</p>
              <p className="text-lg font-medium">
                {selectedUser?.firstName || user?.firstName}{" "}
                {selectedUser?.lastName || user?.lastName}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Username</p>
              <p className="text-lg font-medium">
                {selectedUser?.payinaUserName || user?.payinaUserName}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="text-lg font-medium">
                {selectedUser?.email || user?.email}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Phone Number</p>
              <p className="text-lg font-medium">
                {selectedUser?.phoneNumber || user?.phoneNumber}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Account Type</p>
              <p className="text-lg font-medium">
                {selectedUser?.userType || user?.userType}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Account Number</p>
              <p className="text-lg font-medium">
                {selectedUser?.accountNumber || user?.accountNumber}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tier Level</p>
              <p className="text-lg font-medium">
                {selectedUser?.tierLevel || user?.tierLevel}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <p
                className={`text-lg font-medium ${
                  selectedUser?.enabled || user?.enabled === true
                    ? "text-green-600"
                    : selectedUser?.enabled || user?.enabled === false
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}>
                {selectedUser?.enabled || user?.enabled === true
                  ? "Active"
                  : "Inactive"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      {user.userType === "CORPORATE" && (
        <Card className="mt-5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Business Details</CardTitle>
          </CardHeader>
          <CardContent className="mt-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Business Name</p>
                <p className="text-lg font-medium">
                  {user?.corporateCustomer.businessName}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Category</p>
                <p className="text-lg font-medium">
                  {user?.corporateCustomer.businessCategory}{" "}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Business Type</p>
                <p className="text-lg font-medium">
                  {user?.corporateCustomer.businessType}{" "}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Business Description
                </p>
                <p className="text-lg font-medium">
                  {user?.corporateCustomer.businessDescription}{" "}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Business Adress</p>
                <p className="text-lg font-medium">
                  {user?.corporateCustomer.businessHouseNumber},{" "}
                  {user?.corporateCustomer.businessStreetName},{" "}
                  {user?.corporateCustomer.businessLGA}{" "}
                  {user?.corporateCustomer.businessState} State
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Staff Number</p>
                <p className="text-lg font-medium">
                  {user?.corporateCustomer.staffNumber}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Annual Income</p>
                <p className="text-lg font-medium">
                  {user?.corporateCustomer.annualIncome}
                </p>
              </div>
              <Button
                onClick={() => setShowClientsModal(true)}
                variant="outline"
                className="w-fit px-3 py-1  text-sm font-medium flex items-center gap-2 hover:bg-[#006181]">
                <Users className="w-4 h-4" />
                View Clients List
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        {user?.corporateCustomer?.signatories?.map((signatory, index) => (
          <Card key={signatory.id || index} className="mt-4">
            <CardHeader>
              <CardTitle>Signatory {index + 1}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <p className="text-sm text-muted-foreground">ID</p>
                <p className="text-lg font-medium">{signatory.id}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="text-lg font-medium">{signatory.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="text-lg font-medium">{signatory.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone Number</p>
                <p className="text-lg font-medium">{signatory.phoneNumber}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="text-lg font-medium">{signatory.status}</p>
              </div>
              {/* Add more signatory details here if needed */}
            </CardContent>
          </Card>
        ))}
      </div>
      <ClientsListModal
        isOpen={showClientsModal}
        onClose={() => setShowClientsModal(false)}
      />
    </div>
  );
};

export default UserProfile;
