import { DetailsModal } from "../../../components/ui/modal"
import { Button } from "../../../components/ui/button"
import { useSelector } from "react-redux"

const ViewCorporateAccountWallet = ({isOpen, onClose}) => {
      const user = useSelector((state) => state.users.selectedUser);
      const wallets = useSelector((state) => state.wallets.all);

      const selectedWallet = wallets.find(wallet => wallet.walletId === user?.walletId)


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

export default ViewCorporateAccountWallet