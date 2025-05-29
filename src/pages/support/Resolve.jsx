 import { Formik, Form, Field, ErrorMessage } from 'formik';
 import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormModal } from "../../components/ui/modal";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import apiService from "../../services/apiService";
import { fetchSupportTickets } from '../../redux/supportTicketsSlice';

const Resolve = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { activeTicket } = useSelector((state) => state.supportTickets);
  const dispatch = useDispatch();



const handleResolve = async (values) => {
  setIsLoading(true);

  const requestData = {
      resolutionNotes: values.resolutionNotes,
      resolution: values.resolution,
    };
  try {
        const id = activeTicket?.id

    await apiService.resolveTicket(id, requestData);
      console.log("Received ID in resolveTicket:", id); // <- Add this line

setSuccessMessage('Ticket resolved.');
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
  }
  

return (
 
 <FormModal
              isOpen={isOpen}
              onClose={onClose}
            >
              <Formik
                initialValues={{ resolutionNotes: '', resolution: '' }}
                 onSubmit={handleResolve}

                
              >
                {() => (
                  <Form className="space-y-4">
                    <div>
                      <Label htmlFor="resolutionNotes">Resolution Notes</Label>
                      <Field as={Input} name="resolutionNotes" type="text" required />
                      <ErrorMessage name="resolutionNotes" component="div" className="text-red-500" />
                    </div>
                    <div>
                      <Label htmlFor="resolution">Resolution</Label>
                      <Field as={Input} name="resolution" type="text" required />
                      <ErrorMessage name="resolution" component="div" className="text-red-500" />
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
                        {isLoading ? 'Please wait...' : 'Resolve'}
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </FormModal>
);
};
export default Resolve;