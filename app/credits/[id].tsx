import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { CheckCircle, FileText, Calendar, Euro } from 'lucide-react-native';

import { creditTypes } from '@/constants/creditTypes';
import Colors from '@/constants/colors';
import { brandAssets } from '@/constants/brandAssets';

export default function CreditDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  
  const credit = creditTypes.find(c => c.id === id);
  
  if (!credit) {
    return (
      <View style={styles.container}>
        <Stack.Screen 
          options={{
            title: 'Credito Non Trovato',
            headerStyle: {
              backgroundColor: Colors.primary,
            },
            headerTintColor: Colors.white,
          }} 
        />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Credito non trovato</Text>
        </View>
      </View>
    );
  }

  const handleRequestCredit = () => {
    router.push(`/request-credit/${credit.id}`);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: credit.name,
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
        testID={`credit-detail-${id}`}
      >
        <Image
          source={brandAssets.technology.analytics}
          style={styles.headerImage}
          contentFit="cover"
        />
        
        <View style={styles.content}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>{credit.name}</Text>
            <View style={styles.percentageContainer}>
              <Text style={styles.percentage}>{credit.percentage}</Text>
            </View>
          </View>
          
          <Text style={styles.description}>{credit.description}</Text>
          
          <View style={styles.infoGrid}>
            <View style={styles.infoCard}>
              <Euro size={24} color={Colors.primary} />
              <Text style={styles.infoLabel}>Importo Massimo</Text>
              <Text style={styles.infoValue}>{credit.maxAmount}</Text>
            </View>
            
            <View style={styles.infoCard}>
              <Calendar size={24} color={Colors.primary} />
              <Text style={styles.infoLabel}>Scadenza</Text>
              <Text style={styles.infoValue}>{credit.deadline}</Text>
            </View>
          </View>
          
          <View style={styles.requirementsContainer}>
            <Text style={styles.requirementsTitle}>Requisiti Necessari</Text>
            
            {credit.requirements.map((requirement, index) => (
              <View key={index} style={styles.requirementItem}>
                <CheckCircle size={20} color={Colors.success} />
                <Text style={styles.requirementText}>{requirement}</Text>
              </View>
            ))}
          </View>

          <View style={styles.processContainer}>
            <Text style={styles.processTitle}>Come Funziona</Text>
            
            <View style={styles.processStep}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Richiesta Valutazione</Text>
                <Text style={styles.stepDescription}>
                  Compila il form con i tuoi dati e carica la documentazione necessaria
                </Text>
              </View>
            </View>

            <View style={styles.processStep}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Analisi Tecnica</Text>
                <Text style={styles.stepDescription}>
                  I nostri esperti analizzano la tua situazione e verificano i requisiti
                </Text>
              </View>
            </View>

            <View style={styles.processStep}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Proposta Commerciale</Text>
                <Text style={styles.stepDescription}>
                  Ricevi una proposta dettagliata per l'acquisizione del tuo credito
                </Text>
              </View>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.requestButton}
            onPress={handleRequestCredit}
            testID="request-credit-button"
          >
            <FileText size={20} color={Colors.white} />
            <Text style={styles.requestButtonText}>Richiedi Valutazione Gratuita</Text>
          </TouchableOpacity>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  headerImage: {
    width: '100%',
    height: 220,
  },
  content: {
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.text,
    flex: 1,
  },
  percentageContainer: {
    backgroundColor: Colors.accent,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  percentage: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    color: Colors.darkGray,
    marginBottom: 24,
    lineHeight: 24,
  },
  infoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  infoCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 6,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoLabel: {
    fontSize: 12,
    color: Colors.mediumGray,
    marginTop: 8,
    marginBottom: 4,
    textAlign: 'center',
  },
  infoValue: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '600',
    textAlign: 'center',
  },
  requirementsContainer: {
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
  requirementsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  requirementText: {
    fontSize: 16,
    color: Colors.darkGray,
    marginLeft: 12,
    flex: 1,
    lineHeight: 22,
  },
  processContainer: {
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
  processTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 20,
  },
  processStep: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  stepNumberText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    color: Colors.darkGray,
    lineHeight: 20,
  },
  requestButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  requestButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});