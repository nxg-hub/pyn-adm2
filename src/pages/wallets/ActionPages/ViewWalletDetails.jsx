import { DetailsModal } from "../../../components/ui/modal"
import { Button } from "../../../components/ui/button"
import { useSelector } from "react-redux"

const ViewWalletDetails = ({isOpen, onClose}) => {
    const { selectedWallet } = useSelector((state) => state.wallets);
  return (
<DetailsModal
isOpen={isOpen}
  onClose={onClose}
  title="Wallet Details"
description={`View full details of ${selectedWallet?.name}`}
  footer={<Button onClick={onClose}>Close</Button>}
>
{selectedWallet && (
    <table className="w-full text-sm">
        <tbody>
            <tr>
                <td className="font-medium py-2">Wallet ID</td>
                <td>{selectedWallet.walletId}</td>
            </tr>
              <tr>
                <td className="font-medium py-2">Customer Name</td>
                <td>{selectedWallet.name}</td>
            </tr>
              <tr>
                <td className="font-medium py-2">Email</td>
                <td>{selectedWallet.email}</td>
            </tr>
              <tr>
                <td className="font-medium py-2">Account Number</td>
                <td>{selectedWallet.nombaBankAccountNumber}</td>
            </tr>
              <tr>
                <td className="font-medium py-2">Wallet Balance</td>
                <td>{selectedWallet.balance.currency} {selectedWallet.balance.amount.toLocaleString()}
                </td>
            </tr>
        </tbody>
    </table>
)}




</DetailsModal>
)
}

export default ViewWalletDetails