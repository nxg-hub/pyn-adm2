"use client"

import { createContext, useContext } from "react"
import { cn } from "../../lib/utils"

const ChartContext = createContext({})

const ChartContainer = ({ children, config = {}, className, ...props }) => {
  // Create CSS variables for chart colors
  const style = Object.entries(config).reduce((acc, [key, value]) => {
    acc[`--color-${key}`] = value.color
    return acc
  }, {})

  return (
    <ChartContext.Provider value={{ config }}>
      <div className={cn("w-full", className)} style={style} {...props}>
        {children}
      </div>
    </ChartContext.Provider>
  )
}

const ChartTooltipContent = ({ active, payload, label }) => {
  const { config } = useContext(ChartContext)

  if (!active || !payload || !payload.length) {
    return null
  }

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      <div className="text-sm font-medium">{label}</div>
      <div className="mt-1 flex flex-col gap-0.5">
        {payload.map((item, index) => {
          const dataKey = item.dataKey
          const name = config[dataKey]?.label || dataKey
          const color = config[dataKey]?.color || `var(--color-${dataKey})`

          return (
            <div key={index} className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-xs text-muted-foreground">{name}:</span>
              <span className="text-xs font-medium">{item.value}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export { ChartContainer, ChartTooltipContent }
