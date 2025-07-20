import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { Shield, FileText, ExternalLink } from 'lucide-react-native';

import Colors from '@/constants/colors';
import { brandConfig } from '@/constants/brandConfig';

interface PrivacyConsentProps {
  onConsentsChange: (consents: any) => void;
  consents: any;
}

export default function PrivacyConsent({ onConsentsChange, consents }: PrivacyConsentProps) {
  const handleConsentChange = (type: string, value: boolean) => {
    const updatedConsents = {
      ...consents,
      [type]: value
    };
    onConsentsChange(updatedConsents);
  };

  const openPrivacyPolicy = () => {
    Linking.openURL(`https://${brandConfig.domain}/privacy`);
  };

  const openTermsOfService = () => {
    Linking.openURL(`https://${brandConfig.domain}/terms`);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Shield size={24} color={Colors.primary} />
        <Text style={styles.title}>Consensi e Autorizzazioni</Text>
      </View>
      
      <Text style={styles.subtitle}>
        Per procedere con la richiesta di cessione del credito fiscale, è necessario fornire i seguenti consensi:
      </Text>

      <View style={styles.consentSection}>
        <Text style={styles.sectionTitle}>Trattamento Dati Personali (GDPR)</Text>
        
        <CheckBox
          title={
            <View style={styles.checkboxContent}>
              <Text style={styles.checkboxText}>
                Acconsento al trattamento dei miei dati personali per le finalità di gestione della cessione del credito fiscale, 
                come descritto nell'informativa privacy.
              </Text>
              <TouchableOpacity onPress={openPrivacyPolicy} style={styles.linkButton}>
                <ExternalLink size={14} color={Colors.primary} />
                <Text style={styles.linkText}>Leggi Privacy Policy</Text>
              </TouchableOpacity>
            </View>
          }
          checked={consents.privacy || false}
          onPress={() => handleConsentChange('privacy', !consents.privacy)}
          containerStyle={styles.checkboxContainer}
          textStyle={styles.checkboxTextStyle}
        />

        <CheckBox
          title="Acconsento all'invio di comunicazioni commerciali e promozionali (facoltativo)"
          checked={consents.marketing || false}
          onPress={() => handleConsentChange('marketing', !consents.marketing)}
          containerStyle={styles.checkboxContainer}
          textStyle={styles.checkboxTextStyle}
        />
      </View>

      <View style={styles.consentSection}>
        <Text style={styles.sectionTitle}>Normativa Antiriciclaggio</Text>
        
        <View style={styles.amlContainer}>
          <Text style={styles.amlText}>
            In conformità al D.Lgs. 231/2007 (normativa antiriciclaggio), dichiaro:
          </Text>
          
          <View style={styles.amlDeclarations}>
            <Text style={styles.amlItem}>• Di non essere sottoposto a misure di prevenzione</Text>
            <Text style={styles.amlItem}>• Di non essere stato condannato per reati di riciclaggio</Text>
            <Text style={styles.amlItem}>• Di non essere inserito in liste di soggetti sanzionati</Text>
            <Text style={styles.amlItem}>• Che i fondi provengono da attività lecite</Text>
          </View>
        </View>

        <CheckBox
          title="Dichiaro di aver letto e compreso le disposizioni antiriciclaggio e confermo la veridicità delle dichiarazioni sopra riportate"
          checked={consents.antiMoney || false}
          onPress={() => handleConsentChange('antiMoney', !consents.antiMoney)}
          containerStyle={styles.checkboxContainer}
          textStyle={styles.checkboxTextStyle}
        />
      </View>

      <View style={styles.consentSection}>
        <Text style={styles.sectionTitle}>Termini di Servizio</Text>
        
        <CheckBox
          title={
            <View style={styles.checkboxContent}>
              <Text style={styles.checkboxText}>
                Accetto i termini e le condizioni del servizio di cessione crediti fiscali.
              </Text>
              <TouchableOpacity onPress={openTermsOfService} style={styles.linkButton}>
                <ExternalLink size={14} color={Colors.primary} />
                <Text style={styles.linkText}>Leggi Termini di Servizio</Text>
              </TouchableOpacity>
            </View>
          }
          checked={consents.terms || false}
          onPress={() => handleConsentChange('terms', !consents.terms)}
          containerStyle={styles.checkboxContainer}
          textStyle={styles.checkboxTextStyle}
        />
      </View>

      <View style={styles.consentSection}>
        <Text style={styles.sectionTitle}>Autorizzazioni Specifiche</Text>
        
        <CheckBox
          title="Autorizzo Creditly Global a rappresentarmi presso l'Agenzia delle Entrate per tutte le pratiche relative alla cessione del credito"
          checked={consents.representation || false}
          onPress={() => handleConsentChange('representation', !consents.representation)}
          containerStyle={styles.checkboxContainer}
          textStyle={styles.checkboxTextStyle}
        />

        <CheckBox
          title="Autorizzo la verifica dei dati presso banche dati pubbliche e registri camerali"
          checked={consents.dataVerification || false}
          onPress={() => handleConsentChange('dataVerification', !consents.dataVerification)}
          containerStyle={styles.checkboxContainer}
          textStyle={styles.checkboxTextStyle}
        />

        <CheckBox
          title="Accetto le condizioni economiche proposte e le modalità di pagamento"
          checked={consents.economicTerms || false}
          onPress={() => handleConsentChange('economicTerms', !consents.economicTerms)}
          containerStyle={styles.checkboxContainer}
          textStyle={styles.checkboxTextStyle}
        />
      </View>

      <View style={styles.legalNotice}>
        <FileText size={20} color={Colors.mediumGray} />
        <Text style={styles.legalText}>
          I consensi forniti hanno valore legale e possono essere revocati in qualsiasi momento 
          contattando il nostro servizio clienti. La revoca non pregiudica la liceità del trattamento 
          basata sul consenso prestato prima della revoca.
        </Text>
      </View>

      <View style={styles.contactInfo}>
        <Text style={styles.contactTitle}>Contatti per Privacy e Consensi</Text>
        <Text style={styles.contactText}>Email: {brandConfig.email}</Text>
        <Text style={styles.contactText}>Telefono: {brandConfig.phone}</Text>
        <Text style={styles.contactText}>
          Indirizzo: {brandConfig.address.street}, {brandConfig.address.city}, {brandConfig.address.country}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginLeft: 12,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.darkGray,
    marginBottom: 24,
    lineHeight: 20,
  },
  consentSection: {
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: 12,
  },
  checkboxContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 12,
  },
  checkboxTextStyle: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: 'normal',
    marginLeft: 8,
  },
  checkboxContent: {
    flex: 1,
    marginLeft: 8,
  },
  checkboxText: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
    marginBottom: 8,
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  linkText: {
    fontSize: 12,
    color: Colors.primary,
    marginLeft: 4,
    textDecorationLine: 'underline',
  },
  amlContainer: {
    backgroundColor: Colors.background,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  amlText: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 12,
    fontWeight: '500',
  },
  amlDeclarations: {
    marginLeft: 8,
  },
  amlItem: {
    fontSize: 13,
    color: Colors.darkGray,
    marginBottom: 4,
    lineHeight: 18,
  },
  legalNotice: {
    flexDirection: 'row',
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  legalText: {
    fontSize: 12,
    color: Colors.mediumGray,
    lineHeight: 18,
    marginLeft: 12,
    flex: 1,
  },
  contactInfo: {
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
  contactTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  contactText: {
    fontSize: 12,
    color: Colors.darkGray,
    marginBottom: 4,
  },
});