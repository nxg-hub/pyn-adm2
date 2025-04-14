import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { ChartContainer } from "../ui/chart"

const ChartCard = ({ title, description, children, config, className }) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="h-[300px]">
          {children}
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default ChartCard
