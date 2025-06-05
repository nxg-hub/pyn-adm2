import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { FormModal } from "../../../components/ui/modal";
import { Button } from "../../../components/ui/button";
import { Label } from "../../../components/ui/label"; // Make sure you have this component
import { fetchAdmins } from "../../../redux/adminsSlice";
import apiService from "../../../services/apiService";

const UpdatePermission = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const admin = useSelector((state) => state.admins.selectedAdmin);
  const x_admin = useSelector((state) => state.admin.admin);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    adminUserType: admin?.adminUserType || "",
    "canCreateUsers": true,
    "canFlagUsers": true,
    "canSuspendUsers": true,
    "canManageAdmins": true,
    "canViewReports": true
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErrorMessage('');

    const adminId = admin?.id;
    const XAdminId= x_admin?.id;
    

    try {
      await apiService.updateAdminPermission(formData, XAdminId, adminId);
         
        setSuccessMessage('Permission updated!');
  
        setTimeout(() => {
          setSuccessMessage('');
          dispatch(fetchAdmins()); 

          onClose();
        }, 2000);
  
      }
    catch (error) {
      const message = error.message || 'Unexpected error';
      setErrorMessage(`Failed to update: ${message}`);
    } finally {
      setLoading(false);
    }
  };
    
  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title="Update Permission"
    >
       <Formik
              
            >
              {() => (
        
          <Form className="space-y-4">

            <div>
              <Label htmlFor="adminUserType">Role</Label>
              <Field as="select" name="adminUserType"
                     onChange={handleChange}
                     className="w-full bg-black border p-2 rounded" required>
                <option value=''>{admin.adminUserType
    ?.toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())}</option>
                <option value="SUPER_ADMIN">Super Admin</option>
                <option value="GENERAL_MANAGER">General Manager</option>
                <option value="CUSTOMER_CARE_REP">Customer Care Rep</option>
                <option value="OPERATIONS_MANAGER">Operations Manager</option>
                <option value="FINANCE_MANAGER">Finance Manager</option>
              </Field>
              <ErrorMessage name="adminUserType" component="div" className="text-red-500" />
            </div>

            {successMessage && (
              <div className="border border-black bg-black rounded-lg p-4 mt-4 text-white">
                <p className="font-bold">{successMessage}</p>
              </div>
            )}

            {errorMessage && (
              <div className="border border-red-500 bg-red-100 rounded-lg p-4 mt-4 text-red-700">
                <p>{errorMessage}</p>
              </div>
            )}

            <div className="flex justify-end space-x-2 mt-4">
              <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
                Cancel
              </Button>
              <Button type="button" disabled={loading} onClick={handleUpdate} className="bg-[#3A859E]">
                {loading ? 'Updating...' : 'Update'}
              </Button>
            </div>
          </Form>
              )}
              </Formik>
       
    </FormModal>
  );
};

export default UpdatePermission;
