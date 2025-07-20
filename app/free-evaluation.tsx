import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Calculator, TrendingUp, FileText } from 'lucide-react-native';

import Colors from '@/constants/colors';
import { creditTypes } from '@/constants/creditTypes';
import CreditEvaluationForm from '@/components/CreditEvaluationForm';

export default function FreeEvaluationScreen() {
  const router = useRouter();
  const [selectedCredit, setSelectedCredit] = useState(null);
  const [evaluationData, setEvaluationData] = useState(null);

  const handleEvaluationSubmit = async (data) => {
    try {
      // Qui invieresti i dati al backend per la valutazione
      console.log('Richiesta valutazione:', data);
      
      setEvaluationData(data);
      
      Alert.alert(
        'Valutazione Inviata',
        'La tua richiesta di valutazione gratuita è stata inviata. Riceverai una risposta entro 24 ore.',
        [
          { text: 'OK' }
        ]
      );
    } catch (error) {
      console.error('Errore valutazione:', error);
      Alert.alert('Errore', 'Si è verificato un errore durante l\'invio della valutazione.');
    }
  };

  const handleRequestCredit = () => {
    if (selectedCredit) {
      router.push(`/request-credit/${selectedCredit.id}`);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Valutazione Gratuita',
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: Colors.white,
        }} 
      />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Calculator size={32} color={Colors.primary} />
          <Text style={styles.title}>Valutazione Gratuita del Credito</Text>
          <Text style={styles.subtitle}>
            Ottieni una stima immediata del valore di cessione del tuo credito fiscale
          </Text>
        </View>

        <View style={styles.benefitsContainer}>
          <Text style={styles.benefitsTitle}>Perché richiedere una valutazione?</Text>
          
          <View style={styles.benefitItem}>
            <TrendingUp size={20} color={Colors.success} />
            <Text style={styles.benefitText}>Conosci subito il valore di mercato del tuo credito</Text>
          </View>
          
          <View style={styles.benefitItem}>
            <FileText size={20} color={Colors.success} />
            <Text style={styles.benefitText}>Analisi professionale della documentazione</Text>
          </View>
          
          <View style={styles.benefitItem}>
            <Calculator size={20} color={Colors.success} />
            <Text style={styles.benefitText}>Calcolo preciso delle commissioni e tempi</Text>
          </View>
        </View>

        <CreditEvaluationForm
          onSubmit={handleEvaluationSubmit}
          onCreditSelect={setSelectedCredit}
        />

        {evaluationData && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>Risultato Valutazione</Text>
            
            <View style={styles.resultDetails}>
              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>Tipo di credito:</Text>
                <Text style={styles.resultValue}>{evaluationData.creditType?.name}</Text>
              </View>
              
              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>Importo nominale:</Text>
                <Text style={styles.resultValue}>€{evaluationData.amount}</Text>
              </View>
              
              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>Valore di cessione stimato:</Text>
                <Text style={[styles.resultValue, styles.primaryValue]}>
                  €{evaluationData.saleValue}
                </Text>
              </View>
              
              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>Commissioni stimate:</Text>
                <Text style={styles.resultValue}>€{evaluationData.commission}</Text>
              </View>
              
              <View style={[styles.resultRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>Importo netto stimato:</Text>
                <Text style={styles.totalValue}>€{evaluationData.netAmount}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.proceedButton}
              onPress={handleRequestCredit}
            >
              <Text style={styles.proceedButtonText}>Procedi con la Richiesta</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Come funziona?</Text>
          
          <View style={styles.stepContainer}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <Text style={styles.stepText}>Seleziona il tipo di credito e inserisci l'importo</Text>
          </View>
          
          <View style={styles.stepContainer}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <Text style={styles.stepText}>Ricevi una valutazione immediata e gratuita</Text>
          </View>
          
          <View style={styles.stepContainer}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <Text style={styles.stepText}>Se soddisfatto, procedi con la richiesta ufficiale</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.darkGray,
    textAlign: 'center',
    lineHeight: 22,
  },
  benefitsContainer: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  benefitsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  benefitText: {
    fontSize: 14,
    color: Colors.darkGray,
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
  resultContainer: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 20,
    marginTop: 24,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: 16,
    textAlign: 'center',
  },
  resultDetails: {
    marginBottom: 20,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  resultLabel: {
    fontSize: 14,
    color: Colors.darkGray,
    flex: 1,
  },
  resultValue: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '500',
  },
  primaryValue: {
    color: Colors.primary,
    fontWeight: '600',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
    paddingTop: 12,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.success,
  },
  proceedButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  proceedButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  infoContainer: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 20,
    marginTop: 24,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  stepText: {
    fontSize: 14,
    color: Colors.darkGray,
    flex: 1,
    lineHeight: 20,
  },
});