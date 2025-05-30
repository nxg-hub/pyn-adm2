
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
const TransactionLimits = () => {
  const { currentRole, hasPermission } = useAdmin()
  const [isLoading, setIsLoading] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  

  const [transactionLimits, setTransactionLimits] = useState({
    dailyTransferLimit: "10000",
    singleTransferLimit: "5000",
    dailyWithdrawalLimit: "5000",
    singleWithdrawalLimit: "2000",
    newUserLimit: "1000",
    verifiedUserLimit: "5000",
    personalAccountLimit: "500000",

    businessAccountLimit: "5000000",
  })

  const handleSaveLimits = async () => {
    setIsLoading(true)
    setIsSaved(false)
  }

  return (
    <div className="flex flex-col">
      <header className="border-b">
        <div className="flex h-16 items-center px-4 gap-4">
          <h1 className="text-xl font-bold">Transaction Settings</h1>
         
           
            </div>
            </header>
            <main className="flex-1 p-4 md:p-6 ">
             {hasPermission("setTransactionLimits") && (
                
                          <Card>
                            <CardHeader>
                              <CardTitle>Transaction Limits</CardTitle>
                              <CardDescription>Configure maximum transaction amounts for different user types</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="dailyTransferLimit">Daily Transfer Limit ($)</Label>
                                  <Input
                                    id="dailyTransferLimit"
                                    type="number"
                                    value={transactionLimits.dailyTransferLimit}
                                    onChange={(e) =>
                                      setTransactionLimits({ ...transactionLimits, dailyTransferLimit: e.target.value })
                                    }
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="singleTransferLimit">Single Transfer Limit ($)</Label>
                                  <Input
                                    id="singleTransferLimit"
                                    type="number"
                                    value={transactionLimits.singleTransferLimit}
                                    onChange={(e) =>
                                      setTransactionLimits({ ...transactionLimits, singleTransferLimit: e.target.value })
                                    }
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="dailyWithdrawalLimit">Daily Withdrawal Limit ($)</Label>
                                  <Input
                                    id="dailyWithdrawalLimit"
                                    type="number"
                                    value={transactionLimits.dailyWithdrawalLimit}
                                    onChange={(e) =>
                                      setTransactionLimits({ ...transactionLimits, dailyWithdrawalLimit: e.target.value })
                                    }
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="singleWithdrawalLimit">Single Withdrawal Limit ($)</Label>
                                  <Input
                                    id="singleWithdrawalLimit"
                                    type="number"
                                    value={transactionLimits.singleWithdrawalLimit}
                                    onChange={(e) =>
                                      setTransactionLimits({ ...transactionLimits, singleWithdrawalLimit: e.target.value })
                                    }
                                  />
                                </div>
                              </div>
            
                              <Separator />
            
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="newUserLimit">New User Limit ($)</Label>
                                  <Input
                        id="newUserLimit"
                        type="number"
                        value={transactionLimits.newUserLimit}
                        onChange={(e) => setTransactionLimits({ ...transactionLimits, newUserLimit: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="verifiedUserLimit">Verified User Limit ($)</Label>
                      <Input
                        id="verifiedUserLimit"
                        type="number"
                        value={transactionLimits.verifiedUserLimit}
                        onChange={(e) =>
                          setTransactionLimits({ ...transactionLimits, verifiedUserLimit: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="personalAccountLimit">Personal Account Limit ($)</Label>
                      <Input
                        id="personalAccountLimit"
                        type="number"
                        value={transactionLimits.personalAccountLimit}
                        onChange={(e) =>
                          setTransactionLimits({ ...transactionLimits, personalAccountLimit: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="businessAccountLimit">Business Account Limit ($)</Label>
                      <Input
                        id="businessAccountLimit"
                        type="number"
                        value={transactionLimits.businessAccountLimit}
                        onChange={(e) =>
                          setTransactionLimits({ ...transactionLimits, businessAccountLimit: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center gap-3">
                  <Button 
                    onClick={handleSaveLimits}
                    disabled={isLoading}
                    className="min-w-[140px] hover:scale-105 cursor:pointer"
                    variant="outline"
                    size="lg"
                  >
                    Save Limits
                  </Button>
                </CardFooter>  
              </Card>
          )}
      </main>
    </div>
  )
}

export default TransactionLimits;