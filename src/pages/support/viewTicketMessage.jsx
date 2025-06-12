import { DetailsModal } from "../../components/ui/modal";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardTitle, CardHeader } from "../../components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../../components/ui/table";
import { TableLoader } from "../../components/ui/loader";

import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from "react";
import apiService from "../../services/apiService";


const ViewTicketMessages = ({isOpen, onClose }) => {
  const { activeTicket } = useSelector((state) => state.supportTickets);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleViewMessages = async () => {
  setIsLoading(true);

  try {
    const id = activeTicket?.id

 const content = await apiService.getTicketMessages(id);
     setMessages(content || []);

  } catch (error) {
    const response = error.response;
    setErrorMessage(`Failed to load activities: ${response}`);
  } finally {
    setIsLoading(false);
  }
 };

 useEffect(() => {
  if (isOpen) {
    handleViewMessages();
  }
}, [isOpen]);

    return (
        
        <DetailsModal
  isOpen={isOpen}
  onClose={onClose}
  title="Ticket Messages"
description={`View Ticket Messages of ${activeTicket?.customerName}'s ticket`}
  footer={<Button onClick={onClose}>Close</Button>}
>
     <div>
      {isLoading ? (
        <TableLoader/>
      ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Sent By</TableHead>
                      <TableHead>Sender's Name</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {messages.map((message, index) => (
                      <TableRow key={message.id || index}>
                        {/* <TableCell>{message.id}</TableCell> */}
                        <TableCell>{message.senderType}</TableCell>
                        <TableCell>{message.senderName}</TableCell>
                        <TableCell>{message.message}</TableCell>
                       <TableCell>{new Date(message.timestamp).toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table> 
)}
</div>
</DetailsModal>


)}


export default ViewTicketMessages;