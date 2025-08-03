import { Button } from './ui/button';
import { Card } from './ui/card';

interface LanguageSelectionProps {
  onLanguageSelect: (language: string) => void;
}

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
  { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
  { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
  { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
  { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
];

export function LanguageSelection({ onLanguageSelect }: LanguageSelectionProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-50 to-white p-6">
      <div className="flex-1 flex flex-col justify-center">
        <div className="text-center mb-8">
          <div className="mb-4">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🌐</span>
            </div>
          </div>
          <h1 className="text-2xl text-gray-800 mb-2">Choose Your Language</h1>
          <p className="text-gray-600">Select your preferred language to continue</p>
        </div>

        <div className="space-y-3">
          {languages.map((language) => (
            <Card key={language.code} className="p-0 overflow-hidden">
              <Button
                variant="ghost"
                className="w-full h-16 justify-start px-6 rounded-lg hover:bg-purple-50 transition-colors"
                onClick={() => onLanguageSelect(language.code)}
              >
                <span className="text-2xl mr-4">{language.flag}</span>
                <span className="text-lg text-gray-800">{language.name}</span>
              </Button>
            </Card>
          ))}
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 mt-6">
        MSME Support Platform
      </div>
    </div>
  );
}