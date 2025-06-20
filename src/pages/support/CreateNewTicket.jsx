import  { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {useDispatch, useSelector } from 'react-redux';
import { DetailsModal } from "../../components/ui/modal";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import apiService from "../../services/apiService";
import { fetchSupportTickets } from '../../redux/supportTicketsSlice';


const token = localStorage.getItem('token')

const CreateNewTicket = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [category, setCategory] = useState("")
  const [priority, setPriority] = useState("")
  const dispatch = useDispatch();



  const handleCreate = async (values) => {
    setIsLoading(true);
    setErrorMessage('');

    const requestData = {
      customerId: values.customerId,
      subject: values.subject,
      category: category,
      description: values.description,
      priority: priority,
      customerName: values.customerName
    };

    try {
        await apiService.CreateNewSupportTicket(token, requestData);
       
        setSuccessMessage('New support ticket created.');
        setTimeout(() => {
          setSuccessMessage('');
          onClose()
          dispatch(fetchSupportTickets());

        }, 3000);
      } 
     catch (error) {
      console.error('Error:', error);
      setErrorMessage(`Error creating support ticket: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DetailsModal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Support Ticket"
    >
      <Formik
        initialValues={{ customerId: '', subject: '', customerName: '', description: '' }}
        onSubmit={handleCreate}
      >
        {() => (
          <Form className="space-y-4">
            <div>
              <Label htmlFor="customerId">Customer I.D</Label>
              <Field as={Input} name="customerId" type="text" required />
              <ErrorMessage name="customerId" component="div" className="text-red-500" />
            </div>
            <div>
              <Label htmlFor="customerId">Customer Name</Label>
              <Field as={Input} name="customerName" type="text" required />
              <ErrorMessage name="customerName" component="div" className="text-red-500" />
            </div>
            <div>
                          <Label htmlFor="priority">Priority</Label>
                          <Field as="select" name="priority" className="w-full bg-black border p-2 rounded" required
                          value={priority}
                    onChange={(e) => setPriority(e.target.value)}>
                            <option value="" disabled>Choose priority</option>
                            <option value="HIGH">High</option>
                            <option value="MEDIUM">Medium</option>
                            <option value="LOW">Low</option>

                          
                          </Field>
                          <ErrorMessage name="priority" component="div" className="text-red-500" />
                        </div>
                        <div>
                          <Label htmlFor="category">Category</Label>
                          <Field as="select" name="category" className="w-full bg-black border p-2 rounded" required
                          value={category}
                    onChange={(e) => setCategory(e.target.value)}>
                            <option value="" disabled>Choose category</option>
                            <option value="General Inquiry">General Inquiry</option>
                            <option value="Login Issues">Login Issues</option>
                            <option value="Failed Transaction">Failed Transaction</option>
                            <option value="Account Verification">Account Verification</option>
                            <option value="Refund Request">Refund Request</option>
                            <option value="Fraud Alert">Fraud Alert</option>
                            <option value="KYC/AML Review">KYC/AML Review</option>

                          
                          </Field>
                          <ErrorMessage name="category" component="div" className="text-red-500" />
                        </div>
  <div>
              <Label htmlFor="subject">Subject</Label>
              <Field as={Input} name="subject" type="text" required />
              <ErrorMessage name="subject" component="div" className="text-red-500" />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Field as={Input} name="description" type="text" required />
              <ErrorMessage name="description" component="div" className="text-red-500" />
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
                {isLoading ? 'Please wait...' : 'Report'}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </DetailsModal>
  );
};

export default CreateNewTicket;
