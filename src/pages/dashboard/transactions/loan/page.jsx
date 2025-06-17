import { Breadcrumb } from "../../../../components/common/Breadcrumb";
import { LoanTable } from "../../../../components/loan"; // Assuming there's a LoanTable component

export default function LoanPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Loan", path: "/dashboard/transactions/loan" },
        ]}
      />
      <LoanTable /> {/* Displays loan data */}
    </>
  );
}
