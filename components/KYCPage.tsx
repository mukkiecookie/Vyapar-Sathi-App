import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { ArrowLeft, Upload, Camera, CheckCircle, FileText } from 'lucide-react';

interface KYCPageProps {
  onKYCComplete: () => void;
  onBack: () => void;
}

interface Document {
  id: string;
  name: string;
  required: boolean;
  uploaded: boolean;
  icon: typeof FileText;
}

export function KYCPage({ onKYCComplete, onBack }: KYCPageProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [documents, setDocuments] = useState<Document[]>([
    { id: 'aadhaar', name: 'Aadhaar Card', required: true, uploaded: false, icon: FileText },
    { id: 'pan', name: 'PAN Card', required: true, uploaded: false, icon: FileText },
    { id: 'bank', name: 'Bank Statement', required: false, uploaded: false, icon: FileText },
  ]);

  const totalSteps = 3;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleDocumentUpload = (docId: string) => {
    setDocuments(docs => 
      docs.map(doc => 
        doc.id === docId ? { ...doc, uploaded: true } : doc
      )
    );
  };

  const requiredDocsUploaded = documents.filter(doc => doc.required).every(doc => doc.uploaded);

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onKYCComplete();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="flex items-center p-4 border-b bg-white">
        <Button variant="ghost" size="sm" onClick={onBack} className="mr-3">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-lg text-gray-800">KYC Verification</h1>
          <p className="text-sm text-gray-600">Step {currentStep + 1} of {totalSteps}</p>
        </div>
      </div>

      <div className="p-4">
        <Progress value={progress} className="mb-6" />
      </div>

      <div className="flex-1 p-6">
        {currentStep === 0 && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl text-gray-800 mb-2">Upload Documents</h2>
              <p className="text-gray-600">Please upload the required documents for verification</p>
            </div>

            <div className="space-y-4">
              {documents.map((doc) => (
                <Card key={doc.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        doc.uploaded ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        {doc.uploaded ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <doc.icon className="w-5 h-5 text-gray-600" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-gray-800">{doc.name}</h3>
                        <p className="text-sm text-gray-600">
                          {doc.required ? 'Required' : 'Optional'}
                        </p>
                      </div>
                    </div>
                    
                    {!doc.uploaded && (
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDocumentUpload(doc.id)}
                        >
                          <Camera className="w-4 h-4 mr-1" />
                          Scan
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDocumentUpload(doc.id)}
                        >
                          <Upload className="w-4 h-4 mr-1" />
                          Upload
                        </Button>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl text-gray-800 mb-2">Take a Selfie</h2>
              <p className="text-gray-600">Take a clear photo of yourself for identity verification</p>
            </div>

            <Card className="p-8">
              <div className="text-center space-y-4">
                <div className="w-32 h-32 bg-gray-100 rounded-full mx-auto flex items-center justify-center">
                  <Camera className="w-12 h-12 text-gray-400" />
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  <Camera className="w-4 h-4 mr-2" />
                  Take Photo
                </Button>
              </div>
            </Card>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-xl text-gray-800 mb-2">Verification Complete</h2>
              <p className="text-gray-600">Your documents have been submitted for review</p>
            </div>

            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-600">Documents Uploaded</span>
                  <span className="text-green-600">✓ Complete</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-600">Identity Verified</span>
                  <span className="text-green-600">✓ Complete</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-600">Review Status</span>
                  <span className="text-yellow-600">⏳ Pending</span>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>

      <div className="p-6 border-t bg-white">
        <Button 
          onClick={handleNext}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white"
          disabled={currentStep === 0 && !requiredDocsUploaded}
        >
          {currentStep === totalSteps - 1 ? 'Complete Setup' : 'Continue'}
        </Button>
      </div>
    </div>
  );
}