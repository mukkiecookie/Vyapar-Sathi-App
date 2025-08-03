import { Button } from './ui/button';
import { Card } from './ui/card';
import { ArrowLeft, Building2, Users } from 'lucide-react';

interface UserTypeSelectionProps {
  onUserTypeSelect: (type: 'msme' | 'local') => void;
  onBack: () => void;
}

export function UserTypeSelection({ onUserTypeSelect, onBack }: UserTypeSelectionProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="flex items-center p-4 border-b bg-white">
        <Button variant="ghost" size="sm" onClick={onBack} className="mr-3">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg text-gray-800">Select User Type</h1>
      </div>

      <div className="flex-1 flex flex-col justify-center p-6">
        <div className="text-center mb-8">
          <h2 className="text-xl text-gray-800 mb-2">Who are you?</h2>
          <p className="text-gray-600">Choose your role to get started</p>
        </div>

        <div className="space-y-4">
          <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer" 
                onClick={() => onUserTypeSelect('msme')}>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg text-gray-800 mb-1">MSME Worker</h3>
                <p className="text-gray-600 text-sm">Manage inventory, products, and warehouse operations</p>
              </div>
            </div>
            <div className="mt-4">
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                Continue as MSME Worker
              </Button>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => onUserTypeSelect('local')}>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg text-gray-800 mb-1">Local User</h3>
                <p className="text-gray-600 text-sm">Track deliveries, earn rewards, and connect with services</p>
              </div>
            </div>
            <div className="mt-4">
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                Continue as Local User
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}