import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { ArrowLeft, Mail, Phone, Shield } from 'lucide-react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from './ui/input-otp';

interface LoginPageProps {
  userType: 'msme' | 'local';
  onLoginSuccess: () => void;
  onBack: () => void;
}

export function LoginPage({ userType, onLoginSuccess, onBack }: LoginPageProps) {
  const [step, setStep] = useState<'contact' | 'otp'>('contact');
  const [contactMethod, setContactMethod] = useState<'email' | 'phone'>('phone');
  const [contactValue, setContactValue] = useState('');
  const [otp, setOtp] = useState('');

  const handleSendOTP = () => {
    if (contactValue) {
      setStep('otp');
    }
  };

  const handleVerifyOTP = () => {
    if (otp.length === 6) {
      onLoginSuccess();
    }
  };

  const userTypeConfig = {
    msme: { color: 'purple', title: 'MSME Worker Login' },
    local: { color: 'purple', title: 'Local User Login' }
  };

  const config = userTypeConfig[userType];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="flex items-center p-4 border-b bg-white">
        <Button variant="ghost" size="sm" onClick={onBack} className="mr-3">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg text-gray-800">{config.title}</h1>
      </div>

      <div className="flex-1 flex flex-col justify-center p-6">
        {step === 'contact' && (
          <>
            <div className="text-center mb-8">
              <div className={`w-16 h-16 bg-${config.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                <Shield className={`w-8 h-8 text-${config.color}-600`} />
              </div>
              <h2 className="text-xl text-gray-800 mb-2">Welcome Back</h2>
              <p className="text-gray-600">Enter your details to continue</p>
            </div>

            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex space-x-2 mb-4">
                  <Button
                    variant={contactMethod === 'phone' ? 'default' : 'outline'}
                    size="sm"
                    className="flex-1"
                    onClick={() => setContactMethod('phone')}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Phone
                  </Button>
                  <Button
                    variant={contactMethod === 'email' ? 'default' : 'outline'}
                    size="sm"
                    className="flex-1"
                    onClick={() => setContactMethod('email')}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Button>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    {contactMethod === 'phone' ? 'Phone Number' : 'Email Address'}
                  </label>
                  <Input
                    type={contactMethod === 'phone' ? 'tel' : 'email'}
                    placeholder={contactMethod === 'phone' ? '+91 98765 43210' : 'your@email.com'}
                    value={contactValue}
                    onChange={(e) => setContactValue(e.target.value)}
                    className="w-full"
                  />
                </div>

                <Button 
                  onClick={handleSendOTP}
                  className={`w-full bg-${config.color}-600 hover:bg-${config.color}-700 text-white`}
                  disabled={!contactValue}
                >
                  Send OTP
                </Button>
              </div>
            </Card>
          </>
        )}

        {step === 'otp' && (
          <>
            <div className="text-center mb-8">
              <div className={`w-16 h-16 bg-${config.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                <Shield className={`w-8 h-8 text-${config.color}-600`} />
              </div>
              <h2 className="text-xl text-gray-800 mb-2">Verify OTP</h2>
              <p className="text-gray-600">
                Enter the 6-digit code sent to<br />
                <span className="font-medium">{contactValue}</span>
              </p>
            </div>

            <Card className="p-6">
              <div className="space-y-6">
                <div className="flex justify-center">
                  <InputOTP value={otp} onChange={setOtp} maxLength={6}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                <Button 
                  onClick={handleVerifyOTP}
                  className={`w-full bg-${config.color}-600 hover:bg-${config.color}-700 text-white`}
                  disabled={otp.length !== 6}
                >
                  Verify & Continue
                </Button>

                <div className="text-center">
                  <Button variant="link" className="text-sm text-gray-600">
                    Didn't receive code? Resend
                  </Button>
                </div>
              </div>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}