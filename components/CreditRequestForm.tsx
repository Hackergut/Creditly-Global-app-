import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Calculator, Building, Euro } from 'lucide-react-native';

import Colors from '@/constants/colors';
import { CreditType } from '@/constants/creditTypes';

interface CreditRequestFormProps {
  credit: CreditType;
  onDataChange: (data: any) => void;
  initialData: any;
}

export default function CreditRequestForm({ credit, onDataChange, initialData }: CreditRequestFormProps) {
  const [formData, setFormData] = useState({
    companyName: '',
    vatNumber: '',
    fiscalCode: '',
    legalRepresentative: '',
    email: '',
    phone: '',
    amount: '',
    description: '',
    interventionType: '',
    ...initialData
  });

  const [calculatedValues, setCalculatedValues] = useState({
    saleValue: 0,
    commission: 0,
    netAmount: 0
  });

  useEffect(() => {
    if (formData.amount) {
      const amount = parseFloat(formData.amount) || 0;
      const saleValue = amount * 0.70; // 70% del valore nominale
      const commissionRate = getCommissionRate(credit.id);
      const commission = amount * (commissionRate / 100);
      const netAmount = saleValue - commission;

      setCalculatedValues({
        saleValue,
        commission,
        netAmount
      });
    }
  }, [formData.amount, credit.id]);

  useEffect(() => {
    onDataChange({ ...formData, calculatedValues });
  }, [formData, calculatedValues]);

  const getCommissionRate = (creditType: string) => {
    const rates = {
      'superbonus': 13, // 100% - 87% = 13%
      'bonus-edilizi': 15, // 100% - 85% = 15%
      'crediti-4-0': 20, // 100% - 80% = 20%
      'credito-iva': 25, // 100% - 75% = 25%
      'credito-pa': 22, // 100% - 78% = 22%
    };
    return rates[creditType] || 30;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const interventionTypes = {
    'superbonus': [
      'Isolamento termico (cappotto)',
      'Sostituzione impianti di climatizzazione',
      'Interventi antisismici',
      'Installazione impianti fotovoltaici',
      'Installazione colonnine di ricarica'
    ],
    'bonus-edilizi': [
      'Ristrutturazione edilizia',
      'Efficientamento energetico',
      'Bonus facciate',
      'Bonus verde',
      'Bonus mobili'
    ],
    'crediti-4-0': [
      'Beni strumentali materiali',
      'Beni strumentali immateriali (software)',
      'Formazione 4.0',
      'Ricerca e sviluppo'
    ]
  };

  return (
    <View style={styles.container}>
      <View style={styles.creditInfo}>
        <Text style={styles.creditTitle}>{credit.name}</Text>
        <Text style={styles.creditDescription}>{credit.description}</Text>
        <View style={styles.creditDetails}>
          <Text style={styles.detailText}>Percentuale: {credit.percentage}</Text>
          <Text style={styles.detailText}>Scadenza: {credit.deadline}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dati Azienda</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Ragione sociale *"
          value={formData.companyName}
          onChangeText={(value) => handleInputChange('companyName', value)}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Partita IVA *"
          value={formData.vatNumber}
          onChangeText={(value) => handleInputChange('vatNumber', value)}
          keyboardType="numeric"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Codice Fiscale"
          value={formData.fiscalCode}
          onChangeText={(value) => handleInputChange('fiscalCode', value)}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Rappresentante Legale *"
          value={formData.legalRepresentative}
          onChangeText={(value) => handleInputChange('legalRepresentative', value)}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Email *"
          value={formData.email}
          onChangeText={(value) => handleInputChange('email', value)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Telefono *"
          value={formData.phone}
          onChangeText={(value) => handleInputChange('phone', value)}
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dettagli Credito</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Importo del credito (€) *"
          value={formData.amount}
          onChangeText={(value) => handleInputChange('amount', value)}
          keyboardType="numeric"
        />

        {interventionTypes[credit.id] && (
          <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>Tipo di intervento</Text>
            <Picker
              selectedValue={formData.interventionType}
              onValueChange={(value) => handleInputChange('interventionType', value)}
              style={styles.picker}
            >
              <Picker.Item label="Seleziona tipo intervento" value="" />
              {interventionTypes[credit.id].map((type, index) => (
                <Picker.Item key={index} label={type} value={type} />
              ))}
            </Picker>
          </View>
        )}
        
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Descrizione dettagliata dell'intervento"
          value={formData.description}
          onChangeText={(value) => handleInputChange('description', value)}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
      </View>

      {formData.amount && (
        <View style={styles.calculationContainer}>
          <Text style={styles.calculationTitle}>Calcolo Valutazione</Text>
          
          <View style={styles.calculationRow}>
            <Text style={styles.calculationLabel}>Valore nominale credito:</Text>
            <Text style={styles.calculationValue}>€{parseFloat(formData.amount).toLocaleString()}</Text>
          </View>
          
          <View style={styles.calculationRow}>
            <Text style={styles.calculationLabel}>Valore di cessione (70%):</Text>
            <Text style={[styles.calculationValue, styles.primaryValue]}>
              €{calculatedValues.saleValue.toLocaleString()}
            </Text>
          </View>
          
          <View style={styles.calculationRow}>
            <Text style={styles.calculationLabel}>Commissione ({getCommissionRate(credit.id)}%):</Text>
            <Text style={styles.calculationValue}>€{calculatedValues.commission.toLocaleString()}</Text>
          </View>
          
          <View style={[styles.calculationRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Importo netto stimato:</Text>
            <Text style={styles.totalValue}>€{calculatedValues.netAmount.toLocaleString()}</Text>
          </View>
          
          <Text style={styles.disclaimerText}>
            * Valutazione indicativa. L'importo finale sarà confermato dopo l'analisi della documentazione.
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  creditInfo: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  creditTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: 8,
  },
  creditDescription: {
    fontSize: 14,
    color: Colors.darkGray,
    marginBottom: 12,
    lineHeight: 20,
  },
  creditDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailText: {
    fontSize: 12,
    color: Colors.mediumGray,
    fontWeight: '500',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
  input: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  textArea: {
    height: 100,
  },
  pickerContainer: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    marginBottom: 12,
  },
  pickerLabel: {
    fontSize: 14,
    color: Colors.text,
    paddingHorizontal: 12,
    paddingTop: 8,
    fontWeight: '500',
  },
  picker: {
    height: 50,
  },
  calculationContainer: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  calculationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
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
});