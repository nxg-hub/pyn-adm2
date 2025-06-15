 import { Formik, Form, Field, ErrorMessage } from 'formik';
 import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormModal } from "../../components/ui/modal";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import apiService from "../../services/apiService";
import { fetchSupportTickets } from '../../redux/supportTicketsSlice';

const AddMessage = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { activeTicket } = useSelector((state) => state.supportTickets);
  const dispatch = useDispatch();



const handleAddMessage = async (values) => {
  setIsLoading(true);

  const requestData = {
      ticketId: activeTicket?.id,
      message: values.message
    };
  try {
        const id = activeTicket?.id

    await apiService.addMessageToTicket(id, requestData);

setSuccessMessage(`Message added to ${activeTicket?.customerName}'s Ticket`);
        setTimeout(() => {
          setSuccessMessage('');
          onClose()
        dispatch(fetchSupportTickets());

        }, 3000); 
 }
  catch(error) {
console.error('Error:', error);
      (`Error adding message to ticket: ${error.message}`);
    } finally {
      setIsLoading(false);
    }  
  }
  

return (
 
 <FormModal
              isOpen={isOpen}
              onClose={onClose}
            >
              <Formik
                initialValues={{ message: '' }}
                 onSubmit={handleAddMessage}

                
              >
                {() => (
                  <Form className="space-y-4">
                    <div>
                      <Label htmlFor="resolutionNotes">Add Message to ticket</Label>
                      <Field as={Input} name="message" type="text" required />
                      <ErrorMessage name="message" component="div" className="text-red-500" />
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
                      <Button type="submit" disabled={isLoading} className="bg-[#3A859E]"
                      >
                        {isLoading ? 'Please wait...' : 'Add'}
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </FormModal>
);
};
export default AddMessage;