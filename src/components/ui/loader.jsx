import { Loader2 } from "lucide-react"

export const PageLoader = () => {
  return (
    <div className="flex h-[50vh] w-full items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  )
}

export const TableLoader = () => {
  return (
    <div className="flex h-40 w-full items-center justify-center">
      <Loader2 className="h-6 w-6 animate-spin text-primary" />
    </div>
  )
}

export const ButtonLoader = () => {
  return <Loader2 className="mr-2 h-4 w-4 animate-spin" />
}

export const CardLoader = () => {
  return (
    <div className="flex h-full min-h-[100px] w-full items-center justify-center rounded-md border p-4">
      <Loader2 className="h-6 w-6 animate-spin text-primary" />
    </div>
  )
}
