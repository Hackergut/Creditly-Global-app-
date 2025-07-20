import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Calculator } from 'lucide-react-native';

import Colors from '@/constants/colors';
import { creditTypes } from '@/constants/creditTypes';

interface CreditEvaluationFormProps {
  onSubmit: (data: any) => void;
  onCreditSelect?: (credit: any) => void;
}

export default function CreditEvaluationForm({ onSubmit, onCreditSelect }: CreditEvaluationFormProps) {
  const [selectedCreditId, setSelectedCreditId] = useState('');
  const [amount, setAmount] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');

  const selectedCredit = creditTypes.find(credit => credit.id === selectedCreditId);

  useEffect(() => {
    if (onCreditSelect) {
      onCreditSelect(selectedCredit);
    }
  }, [selectedCredit, onCreditSelect]);

  const calculateValues = () => {
    if (!amount || !selectedCredit) return null;

    const numericAmount = parseFloat(amount);
    const saleValue = numericAmount * 0.70; // 70% del valore nominale
    
    // Calcola la commissione basata sul tipo di credito
    const commissionRates = {
      'superbonus': 13, // 100% - 87% = 13%
      'bonus-edilizi': 15, // 100% - 85% = 15%
      'crediti-4-0': 20, // 100% - 80% = 20%
      'credito-iva': 25, // 100% - 75% = 25%
      'credito-pa': 22, // 100% - 78% = 22%
    };
    
    const commissionRate = commissionRates[selectedCredit.id] || 30;
    const commission = numericAmount * (commissionRate / 100);
    const netAmount = saleValue - commission;

    return {
      saleValue: saleValue.toFixed(2),
      commission: commission.toFixed(2),
      netAmount: netAmount.toFixed(2),
      commissionRate
    };
  };

  const calculatedValues = calculateValues();

  const handleSubmit = () => {
    if (!selectedCredit || !amount || !email) {
      return;
    }

    const evaluationData = {
      creditType: selectedCredit,
      amount: parseFloat(amount),
      email,
      phone,
      companyName,
      ...calculatedValues,
      timestamp: new Date().toISOString()
    };

    onSubmit(evaluationData);
  };

  const canSubmit = selectedCredit && amount && email;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Richiedi la tua valutazione</Text>
      
      <View style={styles.formContainer}>
        <Text style={styles.label}>Tipo di credito *</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedCreditId}
            onValueChange={setSelectedCreditId}
            style={styles.picker}
          >
            <Picker.Item label="Seleziona il tipo di credito" value="" />
            {creditTypes.map((credit) => (
              <Picker.Item 
                key={credit.id} 
                label={`${credit.name} (${credit.percentage})`} 
                value={credit.id} 
              />
            ))}
          </Picker>
        </View>

        {selectedCredit && (
          <View style={styles.creditInfo}>
            <Text style={styles.creditDescription}>{selectedCredit.description}</Text>
            <Text style={styles.creditDetails}>
              Scadenza: {selectedCredit.deadline} | Max: {selectedCredit.maxAmount}
            </Text>
          </View>
        )}

        <Text style={styles.label}>Importo del credito (€) *</Text>
        <TextInput
          style={styles.input}
          placeholder="Inserisci l'importo in euro"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Email *</Text>
        <TextInput
          style={styles.input}
          placeholder="La tua email per ricevere la valutazione"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Telefono</Text>
        <TextInput
          style={styles.input}
          placeholder="Numero di telefono (opzionale)"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Nome azienda</Text>
        <TextInput
          style={styles.input}
          placeholder="Ragione sociale (opzionale)"
          value={companyName}
          onChangeText={setCompanyName}
        />

        {calculatedValues && (
          <View style={styles.calculationContainer}>
            <Text style={styles.calculationTitle}>Valutazione Stimata</Text>
            
            <View style={styles.calculationRow}>
              <Text style={styles.calculationLabel}>Valore nominale:</Text>
              <Text style={styles.calculationValue}>€{parseFloat(amount).toLocaleString()}</Text>
            </View>
            
            <View style={styles.calculationRow}>
              <Text style={styles.calculationLabel}>Valore di cessione (70%):</Text>
              <Text style={[styles.calculationValue, styles.primaryValue]}>
                €{parseFloat(calculatedValues.saleValue).toLocaleString()}
              </Text>
            </View>
            
            <View style={styles.calculationRow}>
              <Text style={styles.calculationLabel}>
                Commissioni ({calculatedValues.commissionRate}%):
              </Text>
              <Text style={styles.calculationValue}>
                €{parseFloat(calculatedValues.commission).toLocaleString()}
              </Text>
            </View>
            
            <View style={[styles.calculationRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Importo netto stimato:</Text>
              <Text style={styles.totalValue}>
                €{parseFloat(calculatedValues.netAmount).toLocaleString()}
              </Text>
            </View>
            
            <Text style={styles.disclaimerText}>
              * Valutazione indicativa. L'importo finale sarà confermato dopo l'analisi della documentazione.
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={[
            styles.submitButton,
            !canSubmit && styles.submitButtonDisabled
          ]}
          onPress={handleSubmit}
          disabled={!canSubmit}
        >
          <Calculator size={20} color={Colors.white} />
          <Text style={styles.submitButtonText}>Richiedi Valutazione Gratuita</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 20,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  formContainer: {
    gap: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: 4,
  },
  pickerContainer: {
    backgroundColor: Colors.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  picker: {
    height: 50,
  },
  creditInfo: {
    backgroundColor: Colors.background,
    borderRadius: 8,
    padding: 12,
    marginTop: -8,
  },
  creditDescription: {
    fontSize: 14,
    color: Colors.darkGray,
    marginBottom: 4,
    lineHeight: 20,
  },
  creditDetails: {
    fontSize: 12,
    color: Colors.mediumGray,
  },
  input: {
    backgroundColor: Colors.background,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  calculationContainer: {
    backgroundColor: Colors.background,
    borderRadius: 8,
    padding: 16,
    marginTop: 8,
  },
  calculationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  calculationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  calculationLabel: {
    fontSize: 14,
    color: Colors.darkGray,
    flex: 1,
  },
  calculationValue: {
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
  disclaimerText: {
    fontSize: 12,
    color: Colors.mediumGray,
    marginTop: 12,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  submitButtonDisabled: {
    backgroundColor: Colors.mediumGray,
  },
  submitButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});