import { DetailsModal } from "../../../components/ui/modal"
import { Button } from "../../../components/ui/button"
import { useSelector } from "react-redux"

const ViewCardDetails = ({isOpen, onClose}) => {
    const { selectedCard } = useSelector((state) => state.virtualCards);
  return (
<DetailsModal
isOpen={isOpen}
  onClose={onClose}
  title="Wallet Details"
description={`View full details of ${selectedCard?.name_on_card}`}
  footer={<Button onClick={onClose}>Close</Button>}
>
{selectedCard && (
    <table className="w-full text-sm">
        <tbody>
            <tr>
                <td className="font-medium py-2">Account ID</td>
                <td>{selectedCard.account_id}</td>
            </tr>
              <tr>
                <td className="font-medium py-2">Card Holder</td>
                <td>{selectedCard.name_on_card}</td>
            </tr>
              <tr>
                <td className="font-medium py-2">Address</td>
                <td>{selectedCard.address_1}</td>
            </tr>
             <tr>
                <td className="font-medium py-2">City</td>
                <td>{selectedCard.city}</td>
            </tr>
             <tr>
                <td className="font-medium py-2">Zip code</td>
                <td>{selectedCard.zip_code}</td>
            </tr>
              <tr>
                <td className="font-medium py-2">Card Pan</td>
                <td>{selectedCard.card_pan}</td>
            </tr>
              <tr>
                <td className="font-medium py-2">CVV</td>
                <td>{selectedCard.cvv} </td>
            </tr>
        </tbody>
    </table>
)}




</DetailsModal>
)
}

export default ViewCardDetails;