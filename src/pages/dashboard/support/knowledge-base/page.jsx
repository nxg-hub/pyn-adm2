import { KnowledgeBaseTable } from "../../../components/SupportDashboard/knowledge-base-table"
import { Breadcrumb } from "../../../components/common/Breadcrumb"

export default function KnowledgePage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Support", path: "/dashboard/support/knowledge-base" },
        ]}
      />
      <KnowledgeBaseTable />
    </>
  )
}
