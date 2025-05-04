import { Download, Printer } from "lucide-react"
import { Button } from "../../components/ui/button"

export const ReportTable = ({ reports, searchQuery, filterType }) => {
  const filteredReports = reports.filter((report) => {
    const matchesSearch = report.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType ? report.type === filterType : true
    return matchesSearch && matchesType
  })

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Report Name</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Type</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Last Generated</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Format</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredReports.length > 0 ? (
            filteredReports.map((report) => (
              <tr key={report.id} className="border-b">
                <td className="px-4 py-3 text-sm">
                  <div>
                    <div className="font-medium">{report.name}</div>
                    <div className="text-xs text-muted-foreground">{report.description}</div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm">{report.type}</td>
                <td className="px-4 py-3 text-sm">{report.lastGenerated}</td>
                <td className="px-4 py-3 text-sm">{report.format}</td>
                <td className="px-4 py-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Printer className="mr-2 h-4 w-4" />
                      Print
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="px-4 py-6 text-center text-sm text-muted-foreground">
                No reports found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
