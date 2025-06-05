import { DetailsModal } from "../../components/ui/modal";
import { Button } from "../../components/ui/button";
import { useDispatch, useSelector } from 'react-redux';
import { useState } from "react";


const ViewTicketDetails = ({isOpen, onClose }) => {
  const { activeTicket } = useSelector((state) => state.supportTickets);


    return (
        <DetailsModal
  isOpen={isOpen}
  onClose={onClose}
  title="Ticket Details"
description={`View full details of ${activeTicket?.customerName}'s ticket`}
  footer={<Button onClick={onClose}>Close</Button>}
>
  {activeTicket && (
    <table className="w-full text-sm">
      <tbody>
        <tr>
          <td className="font-medium py-2">Report ID</td>
          <td>{activeTicket?.id}</td>
        </tr>
        <tr>
          <td className="font-medium py-2">Customer Name</td>
          <td>{activeTicket?.customerName}</td>
        </tr>
        <tr>
          <td className="font-medium py-2">Customer Email</td>
          <td>{activeTicket?.customerEmail}</td>
        </tr>
        <tr>
          <td className="font-medium py-2">Description</td>
          <td>{activeTicket.description}</td>
        </tr>
        <tr>
          <td className="font-medium py-2">Priority</td>
          <td>{activeTicket.priority}</td>
        </tr>
        <tr>

          <td className="font-medium py-2">Customer ID</td>
          <td>{activeTicket.customerId}</td>
        </tr>
        <tr>
          <td className="font-medium py-2">Created By:</td>
          <td>{activeTicket.createdByAdminId}</td>
        </tr>
        <tr>
          <td className="font-medium py-2">Status</td>
          <td>{activeTicket.status}</td>
        </tr>
        
        <tr>
          <td className="font-medium py-2">Date</td>
          <td>{new Date(activeTicket?.createdAt).toLocaleString()}</td>
        </tr>
        {/* Add more details as needed */}
      </tbody>
    </table>
  )}
</DetailsModal>

    )



}

export default ViewTicketDetails;