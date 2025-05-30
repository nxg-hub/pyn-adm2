import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

const StatCard = ({ title, value, icon: Icon, subtitle, trend, trendValue }) => {
  return (
    <Card className="min-h-[120px]"> {/* Ensures consistent card height */}
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium truncate max-w-[75%]">
          {title}
        </CardTitle>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground shrink-0" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold truncate">{value}</div>
        {subtitle && (
          <p
            className={`text-xs mt-1 truncate ${
              trend === "up"
                ? "text-green-500"
                : trend === "down"
                ? "text-red-500"
                : "text-muted-foreground"
            }`}
          >
            {trendValue && `${trend === "up" ? "+" : ""}${trendValue} `}
            {subtitle}
          </p>
        )}
      </CardContent>
    </Card>
  )
}

export default StatCard
