import { useSelector } from "react-redux";
import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const EditUser = () => {
  const user = useSelector((state) => state.users.selectedUser);
      const navigate = useNavigate()
  

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    payinaUserName: user?.payinaUserName || "",
    userType: user?.userType || "",
    status: user?.enabled || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch API update or redux action here
    console.log("Updated data:", formData);
  };
  const handleBack = () => {
    navigate (-1);
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.4)] backdrop-blur-sm z-50">
<div className="max-w-md w-full p-6 bg-[rgba(0,0,0,0.1)] rounded-xl shadow-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Edit User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={`${formData.firstName} ${formData.lastName}`}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Username</label>
          <input
            name="payinaUserName"
            value={formData.payinaUserName}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Phone Number</label>
          <input
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Account Type</label>
          <select
            name="userType"
            value={formData.userType}
            onChange={handleChange}
            className="w-full border bg-black px-3 py-2 rounded"
          >
            <option value="">Select</option>
            <option value="personal">Personal</option>
            <option value="business">Business</option>
          </select>
        </div>
       

        <div className="flex justify-end gap-3">
          <Button type="button"
          onClick={handleBack} 
          variant="outline">
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default EditUser;
