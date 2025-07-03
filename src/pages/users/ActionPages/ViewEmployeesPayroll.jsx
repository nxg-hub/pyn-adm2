import React from 'react'
import { DetailsModal } from '../../../components/ui/modal';
import { Button } from '../../../components/ui/button';
import { useSelector } from 'react-redux';
import apiService from '../../../services/apiService';
import { useState, useEffect } from 'react';


const ViewEmployeesPayroll = ({isOpen, onClose, selectedEmployeeId}) => {
const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [payrollData, setPayrollData] = useState([]);

const employees = useSelector((state) => state.employees.employees);

  const selectedEmployee = employees.find(emp => emp.id === selectedEmployeeId);

 const handleFetchPayroll = async () => {
    const customerId = localStorage.getItem("customerId");

    setIsLoading(true);
    setErrorMessage("");

    try {
      const payroll = await apiService.fetchEmployeesPayroll(customerId); // make sure this uses the ID
      console.log("payroll", payroll);
      setPayrollData(payroll)
    } catch (error) {
      const message = error.message || "Unexpected error";
      setErrorMessage(`Failed to load payroll: ${message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleFetchPayroll();
  }, []);

  if (!selectedEmployee) {
    return (
      <DetailsModal isOpen={isOpen} onClose={onClose} title="Payroll Details">
        <p>Employee not found.</p>
        <Button onClick={onClose}>Close</Button>
      </DetailsModal>
    );
  }

    const employeePayroll = payrollData.find((p) => p.id === selectedEmployeeId);



  return (
    <DetailsModal isOpen={isOpen} onClose={onClose} title={`Payroll for ${selectedEmployee.employeeName}`}>
      {isLoading && <p>Loading payroll...</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {!isLoading && !errorMessage && employeePayroll ? (
        <div>
          <table className="w-full text-sm mb-4">
            <tbody>
                <tr>
                <td className="font-medium py-2">Job Title:</td>
                <td>{employeePayroll.jobRoleTitle}</td>
              </tr>
              <tr>
                <td className="font-medium py-2">Basic Salary:</td>
                <td>₦{employeePayroll.basicSalary}</td>
              </tr>
              <tr>
                <td className="font-medium py-2">Allowances:</td>
                <td>
                  {employeePayroll.allowances.length > 0 ? (
                    <ul className="list-disc ml-5">
                      {employeePayroll.allowances.map((a, index) => (
                        <li key={index}>{a.allowancePackageName}: ₦{a.allowancePay}</li>
                      ))}
                    </ul>
                  ) : (
                    "None"
                  )}
                </td>
              </tr>
              <tr>
                <td className="font-medium py-2">Deductions:</td>
                <td>
                  {employeePayroll.deductions.length > 0 ? (
                    <ul className="list-disc ml-5">
                      {employeePayroll.deductions.map((d, index) => (
                        <li key={index}>{d.deductionPackageName}: ₦{d.deductionAmount}</li>
                      ))}
                    </ul>
                  ) : (
                    "None"
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        !isLoading && <p>No payroll data available for this employee.</p>
      )}

      <Button onClick={onClose}>Close</Button>
    </DetailsModal>
  
    )


 }

export default ViewEmployeesPayroll