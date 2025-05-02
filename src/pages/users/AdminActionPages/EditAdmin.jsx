import { useSelector } from "react-redux";
import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const EditAdmin = () => {
    const admin = useSelector((state) => state.admins.selectedAdmin);
      const navigate = useNavigate()
  

  const [formData, setFormData] = useState({
    firstName: admin?.firstName || "",
    lastName: admin?.lastName || "",
    email: admin?.email || "",
    phoneNumber: admin?.phoneNumber || "",
    Role: admin?.adminUserType || "",
    status: admin?.enabled || "",
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
    <div className="max-w-2xl mx-auto p-6 bg-gray-800 rounded-xl shadow">
       <button
              onClick={handleBack}
              className="mb-9 text-white text-xl font-medium flex items-center gap-5 hover:underline hover:text-[#006181] group-hover:decoration-[#006181]">
              <ChevronLeft className="h-8 w-8" />
              Back
            </button>
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
          <label className="block text-sm font-medium">Phone Number</label>
          <input
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Role</label>
          <select
            name="Role"
            value={formData.adminUserType}
            onChange={handleChange}
            className="w-full border bg-black px-3 py-2 rounded"
          >
            <option value="">Select</option>
            <option value="CUSTOMER_CARE_REP">Customer Care Rep</option>
            <option value="GENERAL_MANAGER">General Manager</option>
            <option value="FINANCE_MANAGER">Finance Manager</option>
            <option value="OPERATIONS_MANAGER">Operations Manager</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border bg-black px-3 py-2 rounded"
          >
            <option value="Active">Active</option>
            <option value="Suspended">Suspended</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </div>
  );
};

export default EditAdmin;
