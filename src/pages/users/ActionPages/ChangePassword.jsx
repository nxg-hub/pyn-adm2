import React, { useState } from 'react';
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (formData.newPassword !== formData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }

    // Dispatch password update logic here
    console.log('Password change request:', formData);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-800 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-6">Change Password</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <Label htmlFor="currentPassword">Current Password</Label>
          <Input
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="newPassword">New Password</Label>
          <Input
            type="password"
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="confirmPassword">Confirm New Password</Label>
          <Input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit" className="w-full bg-[#3A859E]">
          Change Password
        </Button>
      </form>
    </div>
  );
};

export default ChangePassword;
