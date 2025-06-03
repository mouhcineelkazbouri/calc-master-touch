
import React, { useState } from 'react';
import { Monitor, Type, Vibrate } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SettingsScreen = () => {
  const [theme, setTheme] = useState('system');
  const [fontSize, setFontSize] = useState('medium');
  const [hapticFeedback, setHapticFeedback] = useState(true);

  const SettingCard = ({ icon: Icon, title, children }: { icon: any, title: string, children: React.ReactNode }) => (
    <Card className="border-gray-200 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3 text-lg font-semibold text-gray-800">
          <div className="p-2 bg-gray-100 rounded-lg">
            <Icon className="w-5 h-5 text-gray-600" />
          </div>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {children}
      </CardContent>
    </Card>
  );

  const RadioOption = ({ value, id, label, description }: { value: string, id: string, label: string, description?: string }) => (
    <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
      <RadioGroupItem value={value} id={id} className="mt-1" />
      <div className="flex-1">
        <Label htmlFor={id} className="font-medium text-gray-800 cursor-pointer">
          {label}
        </Label>
        {description && (
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Settings</h2>
        
        <div className="space-y-6">
          {/* Theme Settings */}
          <SettingCard icon={Monitor} title="Appearance">
            <RadioGroup value={theme} onValueChange={setTheme} className="space-y-1">
              <RadioOption 
                value="light" 
                id="light" 
                label="Light" 
                description="Clean and bright interface"
              />
              <RadioOption 
                value="dark" 
                id="dark" 
                label="Dark" 
                description="Easy on the eyes in low light"
              />
              <RadioOption 
                value="system" 
                id="system" 
                label="System" 
                description="Follow your device settings"
              />
              <RadioOption 
                value="custom" 
                id="custom" 
                label="Custom" 
                description="Personalized color scheme"
              />
            </RadioGroup>
          </SettingCard>

          {/* Font Size Settings */}
          <SettingCard icon={Type} title="Font Size">
            <RadioGroup value={fontSize} onValueChange={setFontSize} className="space-y-1">
              <RadioOption 
                value="small" 
                id="small" 
                label="Small" 
                description="Compact text for more content"
              />
              <RadioOption 
                value="medium" 
                id="medium" 
                label="Medium" 
                description="Balanced and comfortable"
              />
              <RadioOption 
                value="large" 
                id="large" 
                label="Large" 
                description="Easier to read"
              />
              <RadioOption 
                value="extra-large" 
                id="extra-large" 
                label="Extra Large" 
                description="Maximum readability"
              />
            </RadioGroup>
          </SettingCard>

          {/* Haptic Feedback */}
          <SettingCard icon={Vibrate} title="Haptic Feedback">
            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div>
                <Label className="font-medium text-gray-800">Enable Haptic Feedback</Label>
                <p className="text-sm text-gray-500 mt-1">Feel vibrations when tapping buttons</p>
              </div>
              <Switch 
                checked={hapticFeedback} 
                onCheckedChange={setHapticFeedback}
              />
            </div>
          </SettingCard>

          {/* App Info */}
          <div className="text-center text-sm text-gray-500 pt-4">
            <p>CalcMaster Pro v1.0.0</p>
            <p className="mt-1">© 2024 CalcMaster. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;
