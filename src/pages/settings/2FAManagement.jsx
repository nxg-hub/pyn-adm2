import { useState } from "react";
import Toggle from "../../components/ui/toggle";
import { Button } from "../../components/ui/button";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Label } from "../../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

export default function TwoFactorSettings() {
  const [require2FA, setRequire2FA] = useState(true);
  const [allowSkip, setAllowSkip] = useState(false);
  const [allowDisable, setAllowDisable] = useState(false);
  const [trustedDevices, setTrustedDevices] = useState(true);
  const [supportReset, setSupportReset] = useState(true);
  const [backupCodes, setBackupCodes] = useState(true);
  const [defaultMethod, setDefaultMethod] = useState("authenticator");

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>🔐 Two-Factor Authentication Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">

          <div>
            <Label className="font-semibold">Global 2FA Enforcement</Label>
            <div className="space-y-2 mt-2">
              <Toggle pressed={require2FA} onPressedChange={setRequire2FA}>
                Require 2FA for all users
              </Toggle>
              <Toggle pressed={allowSkip} onPressedChange={setAllowSkip}>
                Allow users to skip setup for 24 hours
              </Toggle>
              <Toggle pressed={allowDisable} onPressedChange={setAllowDisable}>
                Allow users to disable 2FA
              </Toggle>
            </div>
          </div>

          <div>
            <Label className="font-semibold">Default 2FA Method</Label>
            <RadioGroup value={defaultMethod} onValueChange={setDefaultMethod} className="mt-2 space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="authenticator" id="authenticator" />
                <Label htmlFor="authenticator">Authenticator App</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sms" id="sms" />
                <Label htmlFor="sms">SMS Verification</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="email" id="email" />
                <Label htmlFor="email">Email Verification</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label className="font-semibold">Advanced Settings</Label>
            <div className="space-y-2 mt-2 text-white">
              <Toggle pressed={trustedDevices} onPressedChange={setTrustedDevices}>
                Allow trusted device sessions (7-day expiry)
              </Toggle>
              <Toggle pressed={supportReset} onPressedChange={setSupportReset}>
                Enable 2FA reset via support
              </Toggle>
              <Toggle pressed={backupCodes} onPressedChange={setBackupCodes}>
                Enable backup code generation
              </Toggle>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            <Button variant="destructive">Reset 2FA for All Users</Button>
            <Button className="ml-auto">Save Changes</Button>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
