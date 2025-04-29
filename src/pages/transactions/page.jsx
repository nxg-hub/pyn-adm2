import { Route, Routes } from "react-router-dom";
import TransactionsPage from "./TransactionsPage";
import MoneyTransfersPage from "./MoneyTransfersPage";
import BillsAndUtilitiesPage from "./BillsAndUtilitiesPage";
import AirtimeAndDataPage from "./AirtimeAndDataPage";
import TvSubPage from "./TvSubPage";
import ElectrictyPage from "./ElectricityPage";
import TransportAndTollPage from "./TransportAndTollPage";
import BettingAndLotteryPage from "./BettingAndLotteryPage";
import CollectionsPage from "./CollectionsPage";
import ChurchCollectionsPage from "./ChurchCollectionsPage";
import EventAndLifestylePage from "./EventsAndLifestylePage";
import InternationalAirtimePage from "./InternationalAirtimePage";
import VirtualCardsePage from "./VirtualCardsPage";
import PayrollPage from "./PayrollPage";
import ScanToPayPage from "./ScanToPayPage";

function Transactions() {
  return (
    <Routes>
      <Route index element={<TransactionsPage />} />
      <Route path="money-transfers" element={<MoneyTransfersPage />} />
      <Route path="bills" element={<BillsAndUtilitiesPage />} />
      <Route path="airtime" element={<AirtimeAndDataPage />} />
      <Route path="tv" element={<TvSubPage />} />
      <Route path="electricity" element={<ElectrictyPage />} />
      <Route path="transport" element={<TransportAndTollPage />} />
      <Route path="betting" element={<BettingAndLotteryPage />} />
      <Route path="collections" element={<CollectionsPage />} />
      <Route path="church" element={<ChurchCollectionsPage />} />
      <Route path="events" element={<EventAndLifestylePage />} />
      <Route path="international-airtime" element={<InternationalAirtimePage />} />
      <Route path="virtual-cards" element={<VirtualCardsePage />} />
      <Route path="payroll" element={<PayrollPage />} />
      <Route path="scan-to-pay" element={<ScanToPayPage />} />
      
    </Routes>
  );
}

export default Transactions;


