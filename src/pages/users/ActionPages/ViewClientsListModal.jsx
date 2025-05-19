import { useState } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../../../components/ui/table";
import { Button } from "../../../components/ui/button";
import { FormModal } from "../../../components/ui/modal";
import { useSelector } from "react-redux";


const ClientsListModal = ({isOpen, onClose }) => {
    const user = useSelector((state) => state.users.selectedUser);


  const clientList = user?.corporateCustomer?.clientList || [];

  return (
    <>
   

      <FormModal
         isOpen={isOpen}
      onClose={onClose}
        title="Clients List"
        description="Below are the registered clients."
      >
        {clientList.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Phone</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clientList.map((client, index) => (
                <TableRow key={client.id || index}>
                  <TableCell>{client.firstName} {client.lastName}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.companyName}</TableCell>
                  <TableCell>{client.phone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-sm text-muted-foreground">No clients found.</p>
        )}
      </FormModal>
    </>
  );
};

export default ClientsListModal;
