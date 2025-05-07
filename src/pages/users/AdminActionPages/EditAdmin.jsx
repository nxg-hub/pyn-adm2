import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { fetchAdmins } from "../../../redux/adminsSlice";


const EditAdmin = () => {
    const admin = useSelector((state) => state.admins.selectedAdmin);
    const super_admin = useSelector((state) => state.admin.admin);
    const [loading, setLoading] = useState(false);
          const [successMessage, setSuccessMessage] = useState('')
          const [errorMessage, setErrorMessage] = useState('');       
    const dispatch = useDispatch();
    const navigate = useNavigate();
  

  const [formData, setFormData] = useState({
    firstName: admin?.firstName || "",
    lastName: admin?.lastName || "",
    email: admin?.email || "",
    phoneNumber: admin?.phoneNumber || "",
    userType: admin?.adminUserType || "",
    status: admin?.enabled || "",
    password: admin?.password,
    // confirmPassword: "$2a$10$/Bq27rcz.kOVLepW5LkA0uyX.vEoffEqpr4FSFO1XrXaUgl2hsOzO",




  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = super_admin?.id;
    const adminId = admin?.id; // Or get this from props, state, etc.
    setLoading(true);

  
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/v1/admin/management/${adminId}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Id': id
        },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json(); // Always parse the response

    if (!response.ok) {
      const message = result.message || 'Unknown error';
      setErrorMessage(`Failed to update: ${message}`);
    } else {
      console.log("Updated data:", result);
      setSuccessMessage('Details updated!');

      setTimeout(() => {
        setSuccessMessage('');
        dispatch(fetchAdmins()); 

        handleBack();
      }, 2000);

    }
  } catch (error) {
    const message = response.message || 'Unexpected error';
    setErrorMessage(`Failed to update: ${message}`);
  } finally {
    setLoading(false);
  }
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
 <option value=''>{admin.adminUserType
    ?.toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())}</option>            <option value="CUSTOMER_CARE_REP">Customer Care Rep</option>
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
        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline"
          onClick={handleBack}>
            Cancel
          </Button>
          <Button type="submit"
          disabled={loading}
          onChange={handleSubmit}>
        {loading ? 'Saving...' : 'Save changes'}
        </Button>
        </div>
      </form>
     </div>
    </div>
  );
};

export default EditAdmin;
