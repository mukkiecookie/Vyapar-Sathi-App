import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Building2, HandHeart, Users } from 'lucide-react';

interface WelcomeScreenProps {
  onContinue: () => void;
}

export function WelcomeScreen({ onContinue }: WelcomeScreenProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl" />
        <div className="absolute top-40 right-16 w-16 h-16 bg-white/10 rounded-full blur-lg" />
        <div className="absolute bottom-32 left-8 w-24 h-24 bg-white/10 rounded-full blur-xl" />
        <div className="absolute bottom-60 right-12 w-12 h-12 bg-white/10 rounded-full blur-md" />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 relative z-10">
        <div className={`text-center transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          {/* Logo */}
          <div className="mb-8">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
              <div className="relative">
                <Building2 className="w-12 h-12 text-white" />
                <div className="absolute -top-1 -right-1">
                  <HandHeart className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* App Name */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-2 tracking-wide">
              Vyapar Sathi
            </h1>
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-0.5 bg-white/60" />
              <Users className="w-5 h-5 text-white/80" />
              <div className="w-8 h-0.5 bg-white/60" />
            </div>
            <p className="text-white/90 text-lg max-w-xs mx-auto leading-relaxed">
              Empowering MSMEs & Local Communities
            </p>
          </div>

          {/* Features highlight */}
          <div className={`grid grid-cols-1 gap-4 mb-12 transition-all duration-1000 delay-300 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-white text-sm font-medium">MSME Management</p>
                  <p className="text-white/70 text-xs">Inventory & Operations</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-white text-sm font-medium">Local Users</p>
                  <p className="text-white/70 text-xs">Rewards & Delivery</p>
                </div>
              </div>
            </div>
          </div>

          {/* Continue button */}
          <div className={`transition-all duration-1000 delay-500 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <Button 
              onClick={onContinue}
              className="bg-white text-purple-700 hover:bg-white/90 px-8 py-3 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              size="lg"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={`text-center pb-8 transition-all duration-1000 delay-700 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}>
        <p className="text-white/60 text-xs">
          Connecting businesses with communities
        </p>
      </div>
    </div>
  );
}