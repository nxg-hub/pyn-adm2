import { DetailsModal } from "../../components/ui/modal";
import { Button } from "../../components/ui/button";


const ViewSuspiciousActivities = ({isOpen, onClose, selectedActivity}) => {


    return (
        <DetailsModal
  isOpen={isOpen}
  onClose={onClose}
  title="Activity Details"
  description="View full details of this reported suspicious activity"
  footer={<Button onClick={onClose}>Close</Button>}
>
  {selectedActivity && (
    <table className="w-full text-sm">
      <tbody>
        <tr>
          <td className="font-medium py-2">Report ID</td>
          <td>{selectedActivity.id}</td>
        </tr>
        <tr>
          <td className="font-medium py-2">Customer Name</td>
          <td>{selectedActivity.customerName}</td>
        </tr>
        <tr>
          <td className="font-medium py-2">Customer Email</td>
          <td>{selectedActivity.customerEmail}</td>
        </tr>
        <tr>
          <td className="font-medium py-2">Customer ID</td>
          <td>{selectedActivity.customerId}</td>
        </tr>
        <tr>
          <td className="font-medium py-2">Created By:</td>
          <td>{selectedActivity.createdByAdminName}</td>
        </tr>
        <tr>
          <td className="font-medium py-2">Report Type</td>
          <td>{selectedActivity.reportType}</td>
        </tr>
        <tr>
          <td className="font-medium py-2">Severity</td>
          <td>{selectedActivity.severity}</td>
        </tr>
        <tr>
          <td className="font-medium py-2">Date</td>
          <td>{new Date(selectedActivity.createdAt).toLocaleString()}</td>
        </tr>
        {/* Add more details as needed */}
      </tbody>
    </table>
  )}
</DetailsModal>

    )



}

export default ViewSuspiciousActivities;