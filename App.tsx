import { useState } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { LanguageSelection } from './components/LanguageSelection';
import { UserTypeSelection } from './components/UserTypeSelection';
import { LoginPage } from './components/LoginPage';
import { KYCPage } from './components/KYCPage';
import { MSMEDashboard } from './components/MSMEDashboard';
import { LocalUserDashboard } from './components/LocalUserDashboard';

export type Screen = 'welcome' | 'language' | 'userType' | 'login' | 'kyc' | 'dashboard';
export type UserType = 'msme' | 'local' | null;

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [userType, setUserType] = useState<UserType>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');

  const handleWelcomeContinue = () => {
    setCurrentScreen('language');
  };

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    setCurrentScreen('userType');
  };

  const handleUserTypeSelect = (type: UserType) => {
    setUserType(type);
    setCurrentScreen('login');
  };

  const handleLoginSuccess = () => {
    setCurrentScreen('kyc');
  };

  const handleKYCComplete = () => {
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setCurrentScreen('welcome');
    setUserType(null);
    setSelectedLanguage('');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-lg">
        {currentScreen === 'welcome' && (
          <WelcomeScreen onContinue={handleWelcomeContinue} />
        )}

        {currentScreen === 'language' && (
          <LanguageSelection onLanguageSelect={handleLanguageSelect} />
        )}
        
        {currentScreen === 'userType' && (
          <UserTypeSelection 
            onUserTypeSelect={handleUserTypeSelect}
            onBack={() => setCurrentScreen('language')}
          />
        )}
        
        {currentScreen === 'login' && (
          <LoginPage 
            userType={userType!}
            onLoginSuccess={handleLoginSuccess}
            onBack={() => setCurrentScreen('userType')}
          />
        )}
        
        {currentScreen === 'kyc' && (
          <KYCPage 
            onKYCComplete={handleKYCComplete}
            onBack={() => setCurrentScreen('login')}
          />
        )}
        
        {currentScreen === 'dashboard' && userType === 'msme' && (
          <MSMEDashboard onLogout={handleLogout} />
        )}
        
        {currentScreen === 'dashboard' && userType === 'local' && (
          <LocalUserDashboard onLogout={handleLogout} />
        )}
      </div>
    </div>
  );
}