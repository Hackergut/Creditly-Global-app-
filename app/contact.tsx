import React from 'react';
import { StyleSheet, Text, View, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { Mail, MapPin, Phone } from 'lucide-react-native';

import ContactForm from '@/components/ContactForm';
import Colors from '@/constants/colors';
import { brandConfig } from '@/constants/brandConfig';

export default function ContactScreen() {
  const handleEmailPress = () => {
    Linking.openURL(`mailto:${brandConfig.email}`);
  };

  const handlePhonePress = () => {
    Linking.openURL(`tel:${brandConfig.phone}`);
  };

  const handleLocationPress = () => {
    Linking.openURL('https://maps.app.goo.gl/1234567890');
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Contatti',
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
        testID="contact-screen"
      >
        <View style={styles.content}>
          <Text style={styles.title}>Contattaci</Text>
          <Text style={styles.subtitle}>
            Hai domande o hai bisogno di assistenza? Contattaci e il nostro team ti risponderà il prima possibile.
          </Text>
          
          <View style={styles.contactInfoContainer}>
            <TouchableOpacity 
              style={styles.contactItem} 
              onPress={handleEmailPress}
              testID="email-contact"
            >
              <View style={styles.iconContainer}>
                <Mail size={24} color={Colors.primary} />
              </View>
              <View>
                <Text style={styles.contactLabel}>Email</Text>
                <Text style={styles.contactValue}>{brandConfig.email}</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.contactItem} 
              onPress={handlePhonePress}
              testID="phone-contact"
            >
              <View style={styles.iconContainer}>
                <Phone size={24} color={Colors.primary} />
              </View>
              <View>
                <Text style={styles.contactLabel}>Telefono</Text>
                <Text style={styles.contactValue}>{brandConfig.phone}</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.contactItem} 
              onPress={handleLocationPress}
              testID="location-contact"
            >
              <View style={styles.iconContainer}>
                <MapPin size={24} color={Colors.primary} />
              </View>
              <View>
                <Text style={styles.contactLabel}>Indirizzo</Text>
                <Text style={styles.contactValue}>{brandConfig.address.street}, {brandConfig.address.city}, {brandConfig.address.country}</Text>
              </View>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.formTitle}>Inviaci un Messaggio</Text>
          <ContactForm />
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
  contactInfoContainer: {
    marginBottom: 32,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  contactLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.mediumGray,
    marginBottom: 4,
  },
  contactValue: {
    fontSize: 16,
    color: Colors.text,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
});