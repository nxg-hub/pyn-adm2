// components/charts/UserSegmentPieChart.jsx

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"

function UserSegmentPieChart({
  data = [], 
  title = "",
  description = "",
  innerRadius = 60,
  outerRadius = 80,
  paddingAngle=5,
  className = "",
}) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="h-[300px] flex items-center justify-center">
          <div className="w-[200px] h-[200px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={innerRadius}
                  outerRadius={outerRadius}
                  paddingAngle={paddingAngle}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="flex justify-center gap-4 mt-4">
          {data.map((segment) => (
            <div key={segment.name} className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: segment.color }}></div>
              <span className="text-xs">
                {segment.name} ({segment.value}%)
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default UserSegmentPieChart;
