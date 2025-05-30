import  { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {useDispatch, useSelector } from 'react-redux';
import { FormModal } from "../../components/ui/modal";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import apiService from "../../services/apiService";
import { fetchSupportTickets } from '../../redux/supportTicketsSlice';


const token = localStorage.getItem('token')

const AssignTicket = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { activeTicket } = useSelector((state) => state.supportTickets);
  const dispatch = useDispatch();


  const handleAssign = async (values) => {
  setIsLoading(true);

  const requestData = {
      adminId: values.adminId,
      notes: values.notes,
    };
  try {
        const id = activeTicket?.id

    await apiService.assignTicket(id, requestData);
      console.log("Received ID in resolveTicket:", id); // <- Add this line

setSuccessMessage('Ticket assigned.');
        setTimeout(() => {
          setSuccessMessage('');
          onClose()
        }, 3000); 
      dispatch(fetchSupportTickets());
 }
  catch(error) {
console.error('Error:', error);
      (`Error creating support ticket: ${error.message}`);
    } finally {
      setIsLoading(false);
    }  
  };


  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title="Assign Ticket to an admin"
    >
      <Formik
        initialValues={{ adminId: '', notes: '' }}
        onSubmit={handleAssign}
      >
        {() => (
          <Form className="space-y-4">
            <div>
              <Label htmlFor="adminId">Admin I.D</Label>
              <Field as={Input} name="adminId" type="text" required />
              <ErrorMessage name="adminId" component="div" className="text-red-500" />
            </div>
            <div>
              <Label htmlFor="notes">Notes</Label>
              <Field as={Input} name="notes" type="text" required />
              <ErrorMessage name="notes" component="div" className="text-red-500" />
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
              <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading} className="bg-[#3A859E]">
                {isLoading ? 'Please wait...' : 'Assign'}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </FormModal>
  );
};

export default AssignTicket;
