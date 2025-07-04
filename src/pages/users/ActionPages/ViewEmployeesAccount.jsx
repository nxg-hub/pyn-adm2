import React from 'react'
import { DetailsModal } from '../../../components/ui/modal';
import { Button } from '../../../components/ui/button';
import { useSelector } from 'react-redux';


const ViewEmployeesAccount = ({isOpen, onClose, selectedEmployeeId}) => {

const employees = useSelector((state) => state.employees.employees);

  const selectedEmployee = employees.find(emp => emp.id === selectedEmployeeId);

  if (!selectedEmployee) return <p>Employee not found.</p>;

  const details = selectedEmployee.accountDetails || {};


  return (
        <DetailsModal
  isOpen={isOpen}
  onClose={onClose}
  title="Account Details"
description={`${selectedEmployee.employeeName}'s Account Details`}
  footer={<Button onClick={onClose}>Close</Button>}
>
  
    <table className="w-full text-sm mb-4">
      <tbody>
        <tr>
          <td className="font-medium py-2">Bank Name:</td>
          <td>{details.nameOfBank}</td>
        </tr>
         <tr>
          <td className="font-medium py-2">Acount Number:</td>
          <td>{details.accountNumber}</td>
        </tr>
        <tr>
          <td className="font-medium py-2">Payment Day:</td>
          <td>{details.paymentDay}</td>
        </tr>
         <tr>
          <td className="font-medium py-2">Payment Date:</td>
          <td>{details.paymentDayOfMonth}</td>
        </tr>
         <tr>
          <td className="font-medium py-2">Payment Frequency:</td>
          <td>{details.paymentFrequency}</td>
        </tr>
         <tr>
          <td className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${details.automaticPayment === true ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                        >
              Automatic Payment:            {details.automaticPayment === true ? "True" : "False"}</td>
         
        </tr>
      </tbody>
    </table>
  

</DetailsModal>

    )


 }

export default ViewEmployeesAccount