import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';

import Colors from '@/constants/colors';
import { brandConfig } from '@/constants/brandConfig';
import { services } from '@/constants/services';

export default function ServicesScreen() {
  const router = useRouter();

  const handleServicePress = (serviceId: string) => {
    router.push(`/services/${serviceId}`);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Servizi',
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
        <View style={styles.content}>
          <Text style={styles.title}>I Nostri Servizi</Text>
          <Text style={styles.subtitle}>
            Gestiamo tutti i tipi di crediti fiscali con competenza e professionalità
          </Text>
          
          <View style={styles.servicesContainer}>
            {services.map((service) => (
              <TouchableOpacity
                key={service.id}
                style={styles.serviceCard}
                onPress={() => handleServicePress(service.id)}
                testID={`service-${service.id}`}
              >
                <View style={styles.serviceHeader}>
                  <Text style={styles.serviceTitle}>{service.title}</Text>
                  <ChevronRight size={20} color={Colors.primary} />
                </View>
                <Text style={styles.serviceDescription} numberOfLines={3}>
                  {service.description}
                </Text>
                <View style={styles.serviceFooter}>
                  <Text style={styles.servicePercentage}>
                    Percentuale: {service.percentage}%
                  </Text>
                  <Text style={styles.serviceAmount}>
                    Fino a €{service.maxAmount?.toLocaleString() || 'N/A'}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          
          <View style={styles.contactSection}>
            <Text style={styles.contactTitle}>Hai bisogno di assistenza?</Text>
            <Text style={styles.contactText}>
              Contatta il nostro team di esperti per una valutazione gratuita del tuo credito fiscale.
            </Text>
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
    paddingBottom: 40,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.darkGray,
    marginBottom: 24,
    lineHeight: 22,
  },
  servicesContainer: {
    marginBottom: 32,
  },
  serviceCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    flex: 1,
  },
  serviceDescription: {
    fontSize: 14,
    color: Colors.darkGray,
    lineHeight: 20,
    marginBottom: 12,
  },
  serviceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  servicePercentage: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  serviceAmount: {
    fontSize: 14,
    color: Colors.mediumGray,
  },
  contactSection: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.white,
    marginBottom: 8,
  },
  contactText: {
    fontSize: 14,
    color: Colors.white,
    textAlign: 'center',
    lineHeight: 20,
    opacity: 0.9,
  },
});