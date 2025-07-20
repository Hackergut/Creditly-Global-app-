import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { FileText, Upload, PenTool, CheckCircle } from 'lucide-react-native';

import Colors from '@/constants/colors';
import { creditTypes } from '@/constants/creditTypes';
import CreditRequestForm from '@/components/CreditRequestForm';
import DocumentUpload from '@/components/DocumentUpload';
import DigitalSignature from '@/components/DigitalSignature';
import PrivacyConsent from '@/components/PrivacyConsent';

export default function RequestCreditScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [documents, setDocuments] = useState([]);
  const [signature, setSignature] = useState(null);
  const [consents, setConsents] = useState({});

  const credit = creditTypes.find(c => c.id === id);

  if (!credit) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: 'Credito Non Trovato' }} />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Credito non trovato</Text>
        </View>
      </View>
    );
  }

  const steps = [
    { id: 1, title: 'Dati Richiesta', icon: FileText },
    { id: 2, title: 'Documenti', icon: Upload },
    { id: 3, title: 'Privacy & Consensi', icon: CheckCircle },
    { id: 4, title: 'Firma Digitale', icon: PenTool },
  ];

  const handleNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmitRequest = async () => {
    try {
      // Qui invieresti i dati al backend
      const requestData = {
        creditType: credit.id,
        formData,
        documents,
        signature,
        consents,
        timestamp: new Date().toISOString()
      };

      console.log('Invio richiesta credito:', requestData);
      
      Alert.alert(
        'Richiesta Inviata',
        'La tua richiesta è stata inviata con successo. Riceverai una conferma via email.',
        [
          {
            text: 'OK',
            onPress: () => router.push('/dashboard')
          }
        ]
      );
    } catch (error) {
      console.error('Errore invio richiesta:', error);
      Alert.alert('Errore', 'Si è verificato un errore durante l\'invio della richiesta.');
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <CreditRequestForm
            credit={credit}
            onDataChange={setFormData}
            initialData={formData}
          />
        );
      case 2:
        return (
          <DocumentUpload
            creditType={credit.id}
            onDocumentsChange={setDocuments}
            documents={documents}
          />
        );
      case 3:
        return (
          <PrivacyConsent
            onConsentsChange={setConsents}
            consents={consents}
          />
        );
      case 4:
        return (
          <DigitalSignature
            onSignatureChange={setSignature}
            signature={signature}
            requestData={{ credit, formData, documents, consents }}
          />
        );
      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.amount && formData.companyName;
      case 2:
        return documents.length > 0;
      case 3:
        return consents.privacy && consents.antiMoney;
      case 4:
        return signature !== null;
      default:
        return false;
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: `Richiesta ${credit.name}`,
          headerStyle: { backgroundColor: Colors.primary },
          headerTintColor: Colors.white,
        }} 
      />

      <View style={styles.progressContainer}>
        {steps.map((step, index) => (
          <View key={step.id} style={styles.stepContainer}>
            <View style={[
              styles.stepCircle,
              currentStep >= step.id && styles.stepCircleActive,
              currentStep > step.id && styles.stepCircleCompleted
            ]}>
              <step.icon 
                size={16} 
                color={currentStep >= step.id ? Colors.white : Colors.mediumGray} 
              />
            </View>
            <Text style={[
              styles.stepText,
              currentStep >= step.id && styles.stepTextActive
            ]}>
              {step.title}
            </Text>
            {index < steps.length - 1 && (
              <View style={[
                styles.stepLine,
                currentStep > step.id && styles.stepLineCompleted
              ]} />
            )}
          </View>
        ))}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.stepContent}>
          <Text style={styles.stepTitle}>
            Passo {currentStep}: {steps[currentStep - 1].title}
          </Text>
          {renderStepContent()}
        </View>
      </ScrollView>

      <View style={styles.navigationContainer}>
        {currentStep > 1 && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={handlePrevStep}
          >
            <Text style={styles.backButtonText}>Indietro</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity
          style={[
            styles.nextButton,
            !canProceed() && styles.nextButtonDisabled
          ]}
          onPress={currentStep === steps.length ? handleSubmitRequest : handleNextStep}
          disabled={!canProceed()}
        >
          <Text style={styles.nextButtonText}>
            {currentStep === steps.length ? 'Invia Richiesta' : 'Avanti'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: Colors.error,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  stepContainer: {
    alignItems: 'center',
    flex: 1,
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepCircleActive: {
    backgroundColor: Colors.primary,
  },
  stepCircleCompleted: {
    backgroundColor: Colors.success,
  },
  stepText: {
    fontSize: 12,
    color: Colors.mediumGray,
    textAlign: 'center',
  },
  stepTextActive: {
    color: Colors.primary,
    fontWeight: '600',
  },
  stepLine: {
    position: 'absolute',
    top: 16,
    left: '50%',
    right: '-50%',
    height: 2,
    backgroundColor: Colors.lightGray,
    zIndex: -1,
  },
  stepLineCompleted: {
    backgroundColor: Colors.success,
  },
  content: {
    flex: 1,
  },
  stepContent: {
    padding: 20,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 20,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
  },
  backButton: {
    flex: 1,
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginRight: 10,
  },
  backButtonText: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  nextButton: {
    flex: 2,
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  nextButtonDisabled: {
    backgroundColor: Colors.mediumGray,
  },
  nextButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});