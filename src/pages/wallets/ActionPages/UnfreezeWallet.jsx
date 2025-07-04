import { useState } from "react";
import { FormModal } from "../../../components/ui/modal";
import { Button } from "../../../components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { fetchWallets } from "../../../redux/fetchWalletsSlice";
import apiService from "../../../services/apiService";

const UnfreezeWallet = ({ isOpen, onClose }) => {  
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
    const { selectedWallet } = useSelector((state) => state.wallets);

       

  const handleUnfreeze = async () => {
    setLoading(true);
    setErrorMessage('');


   
    const walletId = selectedWallet?.walletId

    try {
      await apiService.unfreezeWallet(walletId);

      setSuccessMessage("You have successfully unfreezed this wallet");
       setTimeout(() => {
        setSuccessMessage('');
        dispatch(fetchWallets()); 
      onClose() 
    }, 2000)
    } catch (err) {
      console.error("Error:", err.message);
      setErrorMessage(`Error unfreezing wallet, ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title={`Unfreeze ${selectedWallet?.name } 's wallet`}

      
      footer={
        <>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleUnfreeze}
            disabled={loading}
            className="bg-green-700"
          >
            {loading ? "Please wait..." : "Confirm"}
          </Button>
        </>
      }
    >
        {errorMessage && (
            <div className="item-added-box border border-black bg-black rounded-lg p-4 mt-4 text-red-500 max-w-md mx-auto shadow-md">
              <p className="mt-2 text-red-500">{errorMessage}</p>
            </div>
          )}
        {successMessage && (
            <div className="item-added-box border border-black bg-black rounded-lg p-4 mt-4 text-white max-w-md mx-auto shadow-md">
              <p className="mt-2 text-white font-bold">{successMessage}</p>
            </div>
          )}
    </FormModal>
  );
};

export default UnfreezeWallet;
