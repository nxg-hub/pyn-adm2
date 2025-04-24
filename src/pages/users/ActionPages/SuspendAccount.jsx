import React, { useState } from 'react';
import { Button } from "../../../components/ui/button";
import { Textarea } from '../../../components/ui/textarea';
import { Label } from "../../../components/ui/label";

const SuspendAccount = () => {
  const [reason, setReason] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!reason.trim()) {
      alert('Please provide a reason for suspension.');
      return;
    }

    // Send `reason` to backend for suspension logic
    console.log('Suspending account for reason:', reason);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-gray-800 shadow-md rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4 text-red-500">Suspend User Account</h2>
      <p className="text-gray-100 mb-6">
        Please provide a reason for suspending this account. This action can impact user access.
      </p>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <Label htmlFor="reason" className="block mb-1 font-medium">
            Reason for Suspension
          </Label>
          <Textarea
            id="reason"
            name="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="e.g. User violated terms of service..."
            rows={5}
            required
          />
        </div>
        <Button type="submit" className="bg-red-500 hover:bg-red-700 w-full">
          Proceed to Suspend
        </Button>
      </form>
    </div>
  );
};

export default SuspendAccount;
