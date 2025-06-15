import  { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormModal } from "../../components/ui/modal";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import apiService from "../../services/apiService";

const CreateSuspiciousReport = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [reportType, setReportType] = useState("")
  const [severity, setSeverity] = useState("")

const token = localStorage.getItem('token')
  const handleCreate = async (values) => {
    setIsLoading(true);
    setErrorMessage('');

    const requestData = {
      customerId: values.customerId,
      description: "string",
      reportType: reportType,
      severity: severity,
    };

    try {
        await apiService.CreateSuspiciousReport(token, requestData); 

        setSuccessMessage('Suspicious activity reported.');
        setTimeout(() => {
          setSuccessMessage('');
          onClose()
        }, 3000);
      
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage(`Error reporting activity: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title="Report suspicious activity"
    >
      <Formik
        initialValues={{ customerId: '', description: '' }}
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
                          <Label htmlFor="severity">Severity</Label>
                          <Field as="select" name="severity" className="w-full bg-black border p-2 rounded" required
                          value={severity}
                    onChange={(e) => setSeverity(e.target.value)}>
                            <option value="" disabled>Choose risk level</option>
                            <option value="High risk">High Risk</option>
                            <option value="Low risk">Low Risk</option>
                          
                          </Field>
                          <ErrorMessage name="severity" component="div" className="text-red-500" />
                        </div>
 <div>
              <Textarea
                    id="reportType"
                    name="reportType"
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                    placeholder="e.g. User violated terms of service..."
                    rows={2}
                    required
                  />
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
    </FormModal>
  );
};

export default CreateSuspiciousReport;
