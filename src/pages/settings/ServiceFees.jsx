
import { useState } from "react"
import {AdminHeader} from "../../components/layout/AdminHeader"
import { useAdmin } from "../../contexts/AdminContext"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Switch } from "../../components/ui/switch"
import Separator from "../../components/ui/separator"
const ServiceFees = () => {
  const { currentRole, hasPermission } = useAdmin()
  

  
  const [serviceFees, setServiceFees] = useState({
    transferFee: "1.5",
    withdrawalFee: "2.0",
    internationalTransferFee: "3.5",
    cardIssuanceFee: "10.00",
    monthlyMaintenanceFee: "2.00",
  })

  return (
    <div className="flex flex-col">
 <header className="border-b">
        <div className="flex h-16 items-center px-4 gap-4">
          <h1 className="text-xl font-bold">Service Fees Settings</h1>
          
           
            </div>
            </header>
            <main className="flex-1 p-4 md:p-6 ">
             {hasPermission("setTransactionLimits") && (
                
                <Card>
                <CardHeader>
                  <CardTitle>Service Fees</CardTitle>
                  <CardDescription>Configure platform fees and charges</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="transferFee">Transfer Fee (%)</Label>
                      <Input
                        id="transferFee"
                        type="number"
                        step="0.1"
                        value={serviceFees.transferFee}
                        onChange={(e) => setServiceFees({ ...serviceFees, transferFee: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="withdrawalFee">Withdrawal Fee (%)</Label>
                      <Input
                        id="withdrawalFee"
                        type="number"
                        step="0.1"
                        value={serviceFees.withdrawalFee}
                        onChange={(e) => setServiceFees({ ...serviceFees, withdrawalFee: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="internationalTransferFee">International Transfer Fee (%)</Label>
                      <Input
                        id="internationalTransferFee"
                        type="number"
                        step="0.1"
                        value={serviceFees.internationalTransferFee}
                        onChange={(e) => setServiceFees({ ...serviceFees, internationalTransferFee: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardIssuanceFee">Card Issuance Fee ($)</Label>
                      <Input
                        id="cardIssuanceFee"
                        type="number"
                        step="0.01"
                        value={serviceFees.cardIssuanceFee}
                        onChange={(e) => setServiceFees({ ...serviceFees, cardIssuanceFee: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="monthlyMaintenanceFee">Monthly Maintenance Fee ($)</Label>
                      <Input
                        id="monthlyMaintenanceFee"
                        type="number"
                        step="0.01"
                        value={serviceFees.monthlyMaintenanceFee}
                        onChange={(e) => setServiceFees({ ...serviceFees, monthlyMaintenanceFee: e.target.value })}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Fees</Button>
                </CardFooter>
              </Card>
            
          )}
      </main>
    </div>
  )
}

export default ServiceFees;